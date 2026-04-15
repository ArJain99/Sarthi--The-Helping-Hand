"""
Sarthi Backend — FastAPI Application
All API endpoints consumed by the React frontend.
"""

from fastapi import FastAPI, HTTPException, Query, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
import jwt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from database import get_db, init_db, hash_password, verify_password, create_access_token, SECRET_KEY, ALGORITHM

# ── Initialize ─────────────────────────────────────────────
init_db()

app = FastAPI(title="Sarthi API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")

def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid auth credentials")
        return int(user_id)
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid auth credentials")


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Return the full user dict (id, name, role) from the JWT."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid auth credentials")
        conn = get_db()
        try:
            user = conn.execute("SELECT id, name, role FROM users WHERE id=?", (int(user_id),)).fetchone()
            if not user:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
            return dict(user)
        finally:
            conn.close()
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid auth credentials")


# ── Pydantic Models ────────────────────────────────────────
class ProfileCreate(BaseModel):
    name: str
    email: str
    role: str
    bio: str = ""
    skills_or_needs: str = ""
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str


class TaskCreate(BaseModel):
    ngo_id: int
    title: str
    category: str = ""
    location: str = ""
    date: str = ""
    duration: str = ""
    spots: int = 0
    urgent: bool = False
    description: str = ""
    tags: str = ""


class StatusUpdate(BaseModel):
    status: str


class ReviewCreate(BaseModel):
    user_id: int
    ngo_id: int
    rating: int
    comment: str = ""


class ProfileUpdate(BaseModel):
    name: str
    bio: str = ""
    skills_or_needs: str = ""


# ══════════════════════════════════════════════════════════
#  AUTH ENDPOINTS
# ══════════════════════════════════════════════════════════

@app.post("/api/profiles/")
def register_user(data: ProfileCreate):
    """Register a new Volunteer or NGO."""
    conn = get_db()
    try:
        pw_hash = hash_password(data.password)
        conn.execute(
            "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
            (data.name, data.email, pw_hash, data.role, data.bio, data.skills_or_needs))
        conn.commit()
        user = conn.execute("SELECT id FROM users WHERE email = ?", (data.email,)).fetchone()
        return {"user_id": user["id"], "name": data.name, "message": "Registration successful"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email already registered")
    finally:
        conn.close()


@app.post("/api/login/")
def login_user(data: LoginRequest):
    """Authenticate user by email + password."""
    conn = get_db()
    try:
        user = conn.execute("SELECT * FROM users WHERE email = ?", (data.email,)).fetchone()
        if not user or not verify_password(data.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        access_token = create_access_token(data={"sub": str(user["id"])})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user["id"],
            "name": user["name"],
            "role": user["role"],
            "email": user["email"]
        }
    finally:
        conn.close()


@app.post("/api/reset-password/")
def reset_password(data: ResetPasswordRequest):
    """Reset a user's password by email."""
    conn = get_db()
    try:
        user = conn.execute("SELECT id FROM users WHERE email = ?", (data.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="Email not found")
        pw_hash = hash_password(data.new_password)
        conn.execute("UPDATE users SET password_hash = ? WHERE id = ?", (pw_hash, user["id"]))
        conn.commit()
        return {"message": "Password updated successfully"}
    finally:
        conn.close()


@app.get("/api/ngos/")
def list_ngos():
    """Return all NGOs."""
    conn = get_db()
    try:
        rows = conn.execute("SELECT id, name FROM users WHERE role = 'NGO'").fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


# ══════════════════════════════════════════════════════════
#  TASK ENDPOINTS
# ══════════════════════════════════════════════════════════

@app.get("/api/tasks/")
def list_all_tasks():
    """Return all tasks (for volunteer browse view)."""
    conn = get_db()
    try:
        rows = conn.execute("""
            SELECT t.*, u.name AS ngo_name
            FROM tasks t JOIN users u ON t.ngo_id = u.id
            ORDER BY t.created_at DESC
        """).fetchall()
        return [_task_dict(r) for r in rows]
    finally:
        conn.close()


@app.post("/api/tasks/")
def create_task(data: TaskCreate):
    """NGO posts a new task."""
    conn = get_db()
    try:
        cur = conn.execute(
            """INSERT INTO tasks (ngo_id, title, category, location, date, duration, spots, urgent, description, tags, status)
               VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
            (data.ngo_id, data.title, data.category, data.location, data.date,
             data.duration, data.spots, int(data.urgent), data.description, data.tags, "Active"))
        conn.commit()
        return {"task_id": cur.lastrowid, "message": "Task created"}
    finally:
        conn.close()


@app.put("/api/tasks/{task_id}")
def edit_task(task_id: int, data: TaskCreate):
    conn = get_db()
    try:
        conn.execute(
            """UPDATE tasks SET title=?, category=?, location=?, date=?, duration=?, spots=?, urgent=?, description=?, tags=?
               WHERE id=?""",
            (data.title, data.category, data.location, data.date, data.duration, data.spots, int(data.urgent), data.description, data.tags, task_id))
        conn.commit()
        return {"message": "Task updated"}
    finally:
        conn.close()


@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_db()
    try:
        conn.execute("DELETE FROM applications WHERE task_id=?", (task_id,))
        conn.execute("DELETE FROM tasks WHERE id=?", (task_id,))
        conn.commit()
        return {"message": "Task deleted"}
    finally:
        conn.close()


@app.post("/api/tasks/{task_id}/apply")
def apply_for_task(task_id: int, user_id: int = Query(...), current_user_id: int = Depends(get_current_user_id)):
    """Volunteer applies for a task."""
    if current_user_id != user_id:
         raise HTTPException(status_code=403, detail="Not authorized to apply with this user_id")
    conn = get_db()
    try:
        task = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        existing = conn.execute(
            "SELECT id FROM applications WHERE task_id = ? AND user_id = ?",
            (task_id, user_id)).fetchone()
        if existing:
            raise HTTPException(status_code=409, detail="Already applied")
        conn.execute("INSERT INTO applications (task_id, user_id, status) VALUES (?,?,?)",
                     (task_id, user_id, "Pending"))
        conn.execute("UPDATE tasks SET applicants = applicants + 1 WHERE id = ?", (task_id,))
        conn.commit()
        return {"message": "Application submitted"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Already applied")
    finally:
        conn.close()


@app.put("/api/applications/{app_id}/status")
def update_application_status(app_id: int, data: StatusUpdate):
    """NGO approves or rejects a volunteer application."""
    conn = get_db()
    try:
        app_row = conn.execute("SELECT * FROM applications WHERE id = ?", (app_id,)).fetchone()
        if not app_row:
            raise HTTPException(status_code=404, detail="Application not found")
        conn.execute("UPDATE applications SET status = ? WHERE id = ?", (data.status, app_id))
        if data.status == "Approved":
            conn.execute("UPDATE tasks SET filled = filled + 1 WHERE id = ?", (app_row["task_id"],))
        conn.commit()
        return {"message": f"Application {data.status}"}
    finally:
        conn.close()


@app.post("/api/reviews/")
def submit_review(data: ReviewCreate):
    """Submit a review for an NGO."""
    conn = get_db()
    try:
        conn.execute("INSERT INTO reviews (user_id, ngo_id, rating, comment) VALUES (?,?,?,?)",
                     (data.user_id, data.ngo_id, data.rating, data.comment))
        conn.commit()
        return {"message": "Review submitted successfully"}
    finally:
        conn.close()


# ══════════════════════════════════════════════════════════
#  VOLUNTEER ENDPOINTS
# ══════════════════════════════════════════════════════════

@app.get("/api/profile/{user_id}")
def get_profile(user_id: int):
    """Get user profile details."""
    conn = get_db()
    try:
        user = conn.execute("SELECT id, name, email, role, bio, skills_or_needs, created_at FROM users WHERE id=?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return dict(user)
    finally:
        conn.close()


@app.put("/api/profile/{user_id}")
def update_profile(user_id: int, data: ProfileUpdate, current_user_id: int = Depends(get_current_user_id)):
    """Update user profile."""
    if current_user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this profile")
    conn = get_db()
    try:
        conn.execute("UPDATE users SET name=?, bio=?, skills_or_needs=? WHERE id=?", (data.name, data.bio, data.skills_or_needs, user_id))
        conn.commit()
        return {"message": "Profile updated"}
    finally:
        conn.close()


@app.post("/api/likes/")
def toggle_like(user_id: int = Query(...), activity_id: int = Query(...)):
    """Toggle like on community activity."""
    conn = get_db()
    try:
        existing = conn.execute("SELECT id FROM likes WHERE user_id=? AND activity_id=?", (user_id, activity_id)).fetchone()
        if existing:
            conn.execute("DELETE FROM likes WHERE id=?", (existing["id"],))
            conn.commit()
            return {"liked": False}
        else:
            conn.execute("INSERT INTO likes (user_id, activity_id) VALUES (?,?)", (user_id, activity_id))
            conn.commit()
            return {"liked": True}
    finally:
        conn.close()


@app.get("/api/volunteer/{user_id}/applications/")
def get_volunteer_applications(user_id: int):
    """Get tasks a volunteer has applied for."""
    conn = get_db()
    try:
        rows = conn.execute("""
            SELECT a.id AS app_id, a.status, a.applied_on,
                   t.id AS task_id, t.title, t.category, t.location, t.duration, t.spots, t.urgent, t.tags,
                   u.name AS ngo_name
            FROM applications a
            JOIN tasks t ON a.task_id = t.id
            JOIN users u ON t.ngo_id = u.id
            WHERE a.user_id = ?
            ORDER BY a.applied_on DESC
        """, (user_id,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


@app.get("/api/volunteer/{user_id}/dashboard_data/")
def get_volunteer_dashboard(user_id: int):
    """Return all widget data for the volunteer dashboard."""
    conn = get_db()
    try:
        # Impact stats
        completed = conn.execute(
            "SELECT COUNT(*) FROM applications WHERE user_id = ? AND status = 'Completed'",
            (user_id,)).fetchone()[0]
        approved = conn.execute(
            "SELECT COUNT(*) FROM applications WHERE user_id = ? AND status = 'Approved'",
            (user_id,)).fetchone()[0]

        # Top volunteers (by completed tasks)
        top_vols = conn.execute("""
            SELECT u.name, COUNT(a.id) AS tasks
            FROM users u LEFT JOIN applications a ON u.id = a.user_id AND a.status IN ('Completed','Approved')
            WHERE u.role = 'Volunteer'
            GROUP BY u.id ORDER BY tasks DESC LIMIT 5
        """).fetchall()

        # Recent activity
        recent = conn.execute("""
            SELECT t.title AS task, a.status, a.applied_on AS date
            FROM applications a JOIN tasks t ON a.task_id = t.id
            WHERE a.user_id = ?
            ORDER BY a.applied_on DESC LIMIT 5
        """, (user_id,)).fetchall()

        # Dynamic AI Recommendations
        user_skills = conn.execute("SELECT skills_or_needs FROM users WHERE id = ?", (user_id,)).fetchone()[0] or ""
        all_active_tasks = conn.execute("SELECT id, title, description, tags FROM tasks WHERE status = 'Active'").fetchall()
        
        recommendations = []
        if user_skills and all_active_tasks:
            task_docs = [f"{t['title']} {t['description']} {t['tags']}" for t in all_active_tasks]
            vectorizer = TfidfVectorizer(stop_words='english')
            # Fit and transform all documents including the user skills
            tfidf_matrix = vectorizer.fit_transform([user_skills] + task_docs)
            
            # First row is user_skills, the rest are tasks
            cosine_sims = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
            
            # Sort by highest match
            task_scores = [(all_active_tasks[i], score * 100) for i, score in enumerate(cosine_sims)]
            task_scores.sort(key=lambda x: x[1], reverse=True)
            
            for task, score in task_scores[:3]:
                if score > 5: # Only show somewhat relevant tasks
                    tags = task["tags"].split(",") if task["tags"] else []
                    recommendations.append({
                        "title": task["title"],
                        "desc": task["description"][:60] + "..." if len(task["description"]) > 60 else task["description"],
                        "match": int(score),
                        "tags": tags
                    })

        # Fallback recommendations if ML finds no match
        if not recommendations:
            recommendations = [
                {"title": "Explore Local Charities", "desc": "Check out some random active tasks from the Tasks tab", "match": 50, "tags": ["#Volunteer"]}
            ]

        return {
            "impactStats": {
                "tasksCompleted": completed,
                "hoursContributed": completed * 4,
                "peopleHelped": completed * 50
            },
            "topVolunteers": [{"name": r["name"], "tasks": r["tasks"]} for r in top_vols],
            "recentActivity": [{"task": r["task"], "status": r["status"], "date": r["date"]} for r in recent],
            "upcomingEvents": [
                {"title": "Volunteer Orientation", "date": "Apr 24", "location": "Online — Zoom"},
                {"title": "Community Clean-Up", "date": "May 02", "location": "Yamuna Banks, Delhi"},
                {"title": "Blood Donation Camp", "date": "May 10", "location": "Red Cross Center, Mumbai"}
            ],
            "achievements": [
                {"icon": "🌟", "label": "First Task", "desc": "Complete your first task", "unlocked": completed >= 1},
                {"icon": "🔥", "label": "3-Day Streak", "desc": "Volunteer 3 days in a row", "unlocked": True},
                {"icon": "🏅", "label": "Super Helper", "desc": "Complete 20 tasks", "unlocked": completed >= 20},
                {"icon": "🤝", "label": "Team Player", "desc": "Work with 3 different NGOs", "unlocked": False},
                {"icon": "📚", "label": "Educator", "desc": "5 education tasks", "unlocked": False},
                {"icon": "🌿", "label": "Eco Warrior", "desc": "5 environment tasks", "unlocked": False},
                {"icon": "❤️", "label": "Big Heart", "desc": "Help 500+ people", "unlocked": False},
                {"icon": "🎯", "label": "Consistent", "desc": "30-day streak", "unlocked": False}
            ],
            "weeklyChallenges": [
                {"title": "Help 3 NGOs", "desc": "Apply to tasks from 3 different organisations", "reward": "+50 XP", "current": min(approved + completed, 3), "goal": 3},
                {"title": "5 Hours of Service", "desc": "Contribute 5 hours of volunteer work", "reward": "Helper Badge", "current": min(completed * 4, 5), "goal": 5}
            ],
            "recommendations": recommendations,
            "communityFeed": [
                {"name": "Priya Patel", "action": "completed Teaching English in Dharavi", "time": "2 hours ago", "icon": "📚", "initials": "PP", "color": "#e91e8c"},
                {"name": "Amit Kumar", "action": "joined Community Kitchen Setup", "time": "5 hours ago", "icon": "🍲", "initials": "AK", "color": "#0ea5e9"},
                {"name": "Sneha Joshi", "action": "earned the Eco Warrior badge", "time": "1 day ago", "icon": "🌿", "initials": "SJ", "color": "#1abc9c"}
            ],
            "notifications": [
                {"id": 1, "title": "Application Approved", "body": "Your application for Food Distribution Drive has been approved!", "time": "2h ago", "icon": "✅", "color": "#1abc9c", "urgent": False},
                {"id": 2, "title": "New Task Available", "body": "Digital Literacy Workshop is looking for volunteers near you.", "time": "5h ago", "icon": "📋", "color": "#0ea5e9", "urgent": False},
                {"id": 3, "title": "Urgent Help Needed", "body": "Food Distribution Drive needs 5 more volunteers urgently!", "time": "1d ago", "icon": "🚨", "color": "#e74c3c", "urgent": True}
            ]
        }
    finally:
        conn.close()


# ══════════════════════════════════════════════════════════
#  NGO ENDPOINTS
# ══════════════════════════════════════════════════════════

@app.get("/api/ngo/{ngo_id}/tasks/")
def get_ngo_tasks(ngo_id: int):
    """Get all tasks posted by a specific NGO."""
    conn = get_db()
    try:
        rows = conn.execute("""
            SELECT t.*, u.name AS ngo_name
            FROM tasks t JOIN users u ON t.ngo_id = u.id
            WHERE t.ngo_id = ?
            ORDER BY t.created_at DESC
        """, (ngo_id,)).fetchall()
        return [_task_dict(r) for r in rows]
    finally:
        conn.close()


@app.get("/api/ngo/{ngo_id}/applications/")
def get_ngo_applications(ngo_id: int):
    """Get all volunteer applications for an NGO's tasks."""
    conn = get_db()
    try:
        rows = conn.execute("""
            SELECT a.id AS app_id, a.status, a.applied_on,
                   u.name AS applicant_name, u.skills_or_needs,
                   t.title AS task_title
            FROM applications a
            JOIN users u ON a.user_id = u.id
            JOIN tasks t ON a.task_id = t.id
            WHERE t.ngo_id = ?
            ORDER BY a.applied_on DESC
        """, (ngo_id,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


@app.get("/api/ngo/{ngo_id}/dashboard_data/")
def get_ngo_dashboard(ngo_id: int):
    """Return all widget data for the NGO dashboard."""
    conn = get_db()
    try:
        total_tasks = conn.execute("SELECT COUNT(*) FROM tasks WHERE ngo_id = ?", (ngo_id,)).fetchone()[0]
        active_tasks = conn.execute("SELECT COUNT(*) FROM tasks WHERE ngo_id = ? AND status = 'Active'", (ngo_id,)).fetchone()[0]
        total_apps = conn.execute("""
            SELECT COUNT(*) FROM applications a JOIN tasks t ON a.task_id = t.id WHERE t.ngo_id = ?
        """, (ngo_id,)).fetchone()[0]
        total_vols = conn.execute("""
            SELECT COUNT(DISTINCT a.user_id) FROM applications a JOIN tasks t ON a.task_id = t.id
            WHERE t.ngo_id = ? AND a.status = 'Approved'
        """, (ngo_id,)).fetchone()[0]

        recent = conn.execute("""
            SELECT 'New application from ' || u.name || ' for ' || t.title AS text,
                   a.applied_on AS time, '#0ea5e9' AS color
            FROM applications a
            JOIN users u ON a.user_id = u.id
            JOIN tasks t ON a.task_id = t.id
            WHERE t.ngo_id = ?
            ORDER BY a.applied_on DESC LIMIT 5
        """, (ngo_id,)).fetchall()

        return {
            "ngoStats": [
                {"icon": "📋", "value": str(total_tasks), "label": "Total Tasks", "badge": f"{active_tasks} active", "badgeColor": "#0ea5e9"},
                {"icon": "👥", "value": str(total_vols), "label": "Active Volunteers", "badge": "verified", "badgeColor": "#1abc9c"},
                {"icon": "📩", "value": str(total_apps), "label": "Applications", "badge": "all time", "badgeColor": "#f39c12"},
                {"icon": "⭐", "value": "4.9", "label": "Avg. Rating", "badge": "excellent", "badgeColor": "#e91e8c"}
            ],
            "recentActivity": [dict(r) for r in recent] if recent else [
                {"text": "No recent activity yet", "time": "—", "color": "#888"}
            ],
            "notifications": [
                {"id": 1, "title": "New Volunteer", "body": "Rahul Sharma applied for your Food Distribution Drive", "time": "1h ago", "icon": "👤", "color": "#0ea5e9", "urgent": False},
                {"id": 2, "title": "Task Filling Up", "body": "Community Kitchen Setup is 60% filled!", "time": "3h ago", "icon": "📊", "color": "#f39c12", "urgent": False},
                {"id": 3, "title": "Urgent: Volunteers Needed", "body": "Food Distribution Drive needs 5 more volunteers by tomorrow!", "time": "6h ago", "icon": "🚨", "color": "#e74c3c", "urgent": True}
            ]
        }
    finally:
        conn.close()


# ══════════════════════════════════════════════════════════
#  ADMIN ENDPOINTS
# ══════════════════════════════════════════════════════════

@app.get("/api/admin/stats/")
def get_admin_stats(current_user: dict = Depends(get_current_user)):
    """Return platform-wide stats. Admin role required."""
    if current_user["role"] != "Admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    conn = get_db()
    try:
        total_volunteers = conn.execute("SELECT COUNT(*) FROM users WHERE role='Volunteer'").fetchone()[0]
        total_ngos       = conn.execute("SELECT COUNT(*) FROM users WHERE role='NGO'").fetchone()[0]
        total_tasks      = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        total_apps       = conn.execute("SELECT COUNT(*) FROM applications").fetchone()[0]

        users = conn.execute(
            "SELECT id, name, email, role, created_at FROM users WHERE role != 'Admin' ORDER BY created_at DESC"
        ).fetchall()

        tasks = conn.execute("""
            SELECT t.id, t.title, t.category, t.status, t.location, t.urgent, t.spots, t.filled,
                   t.applicants, t.created_at, u.name AS ngo_name
            FROM tasks t JOIN users u ON t.ngo_id = u.id
            ORDER BY t.created_at DESC
        """).fetchall()

        return {
            "stats": [
                {"icon": "🙋", "value": str(total_volunteers), "label": "Total Volunteers", "badge": "registered",  "badgeColor": "#1abc9c"},
                {"icon": "🏢", "value": str(total_ngos),       "label": "Total NGOs",       "badge": "verified",    "badgeColor": "#0ea5e9"},
                {"icon": "📋", "value": str(total_tasks),      "label": "Total Tasks",       "badge": "all time",   "badgeColor": "#f39c12"},
                {"icon": "📩", "value": str(total_apps),       "label": "Applications",      "badge": "all time",   "badgeColor": "#e91e8c"},
            ],
            "users": [dict(u) for u in users],
            "tasks": [_task_dict(t) for t in tasks],
        }
    finally:
        conn.close()


# ── Helpers ─────────────────────────────────────────────────
def _task_dict(row) -> dict:
    """Convert a sqlite3.Row for a task into a JSON-friendly dict."""
    d = dict(row)
    d["urgent"] = bool(d.get("urgent", 0))
    return d


# ── Run ─────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
