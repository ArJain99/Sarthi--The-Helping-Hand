"""
Sarthi Backend — SQLite Database Initialization & Seed Data
"""

import sqlite3
import os
import bcrypt
import jwt
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "sarthi.db")
SECRET_KEY = "sarthi_super_advanced_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

def get_db():
    """Return a new connection to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def init_db():
    """Create tables if they don't exist and seed demo data."""
    conn = get_db()
    cur = conn.cursor()

    # ── Tables ──────────────────────────────────────────────
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            name            TEXT    NOT NULL,
            email           TEXT    NOT NULL UNIQUE,
            password_hash   TEXT    NOT NULL,
            role            TEXT    NOT NULL,
            bio             TEXT    DEFAULT '',
            skills_or_needs TEXT    DEFAULT '',
            created_at      TEXT    DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            ngo_id      INTEGER NOT NULL REFERENCES users(id),
            title       TEXT    NOT NULL,
            category    TEXT    DEFAULT '',
            location    TEXT    DEFAULT '',
            date        TEXT    DEFAULT '',
            duration    TEXT    DEFAULT '',
            spots       INTEGER DEFAULT 0,
            filled      INTEGER DEFAULT 0,
            applicants  INTEGER DEFAULT 0,
            urgent      INTEGER DEFAULT 0,
            description TEXT    DEFAULT '',
            tags        TEXT    DEFAULT '',
            status      TEXT    DEFAULT 'Active',
            created_at  TEXT    DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS applications (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id     INTEGER NOT NULL REFERENCES tasks(id),
            user_id     INTEGER NOT NULL REFERENCES users(id),
            status      TEXT    DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Completed')),
            applied_on  TEXT    DEFAULT (datetime('now')),
            UNIQUE(task_id, user_id)
        );

        CREATE TABLE IF NOT EXISTS reviews (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL REFERENCES users(id),
            ngo_id      INTEGER NOT NULL REFERENCES users(id),
            rating      INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
            comment     TEXT    DEFAULT '',
            created_at  TEXT    DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS likes (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL REFERENCES users(id),
            activity_id INTEGER NOT NULL, -- normally references an activity table, keeping it simple
            created_at  TEXT    DEFAULT (datetime('now')),
            UNIQUE(user_id, activity_id)
        );
    """)

    # ── Migration: ensure role column has no restrictive CHECK ──
    schema_row = conn.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='users'").fetchone()
    if schema_row and "CHECK" in schema_row[0] and "'Admin'" not in schema_row[0]:
        cur.executescript("""
            PRAGMA foreign_keys=OFF;
            CREATE TABLE users_new (
                id              INTEGER PRIMARY KEY AUTOINCREMENT,
                name            TEXT    NOT NULL,
                email           TEXT    NOT NULL UNIQUE,
                password_hash   TEXT    NOT NULL,
                role            TEXT    NOT NULL,
                bio             TEXT    DEFAULT '',
                skills_or_needs TEXT    DEFAULT '',
                created_at      TEXT    DEFAULT (datetime('now'))
            );
            INSERT INTO users_new SELECT * FROM users;
            DROP TABLE users;
            ALTER TABLE users_new RENAME TO users;
            PRAGMA foreign_keys=ON;
        """)
        conn.commit()

    # ── Seed only if the users table is empty ───────────────
    row = cur.execute("SELECT COUNT(*) FROM users").fetchone()
    if row[0] == 0:
        _seed(cur)

    # ── Always ensure admin account exists ──────────────────
    admin_exists = cur.execute("SELECT COUNT(*) FROM users WHERE role='Admin'").fetchone()[0]
    if admin_exists == 0:
        _seed_admin(cur)

    conn.commit()
    conn.close()


def _seed(cur):
    """Insert demo users, tasks, and applications."""
    pw = hash_password("password123")

    # Demo Volunteers
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Rahul Sharma", "rahul@example.com", pw, "Volunteer",
         "DOB: 2000-05-15, Gender: male, Phone: +91 98765 43210",
         "Experience: intermediate, Skills: First Aid, CPR, Interests: medical, community"))
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Priya Patel", "priya@example.com", pw, "Volunteer",
         "DOB: 1998-11-22, Gender: female, Phone: +91 91234 56789",
         "Experience: advanced, Skills: Teaching, Mentoring, Interests: community, training"))
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Amit Kumar", "amit@example.com", pw, "Volunteer",
         "DOB: 2001-03-10, Gender: male, Phone: +91 99887 76655",
         "Experience: beginner, Skills: Driving, Logistics, Interests: disaster, administrative"))

    # Demo NGOs
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Delhi Food Bank", "delhi.foodbank@example.com", pw, "NGO",
         "Type: trust, RegNo: TR-2019-1234, Contact: Anita Verma, Phone: +91 11 2345 6789",
         "Website: https://delhifoodbank.org, Address: 45 Connaught Place, Delhi, Delhi, India. Mission: Eliminating hunger in Delhi NCR"))
    cur.execute(
        "INSERT INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Education For All", "edu4all@example.com", pw, "NGO",
         "Type: society, RegNo: SOC-2020-5678, Contact: Rajesh Gupta, Phone: +91 22 8765 4321",
         "Website: https://edu4all.org, Address: 12 MG Road, Mumbai, Maharashtra, India. Mission: Quality education for underprivileged children"))

    # Demo Tasks (ngo_id 4 = Delhi Food Bank, ngo_id 5 = Education For All)
    tasks = [
        (4, "Food Distribution Drive", "Food & Nutrition", "Connaught Place, Delhi", "2026-04-20", "4 hours", 15, 6, 9, 1,
         "Help distribute food packets to 500+ homeless people in central Delhi. Volunteers will help with packing, sorting, and distribution.",
         "#Food,#Community", "Active"),
        (4, "Community Kitchen Setup", "Food & Nutrition", "Dwarka, Delhi", "2026-04-25", "6 hours", 10, 3, 5, 0,
         "Set up and operate a community kitchen to serve meals to underprivileged families. Tasks include cooking, serving, and cleanup.",
         "#Food,#Cooking", "Active"),
        (5, "Teach English to Kids", "Education", "Dharavi, Mumbai", "2026-04-22", "3 hours", 8, 4, 6, 0,
         "Conduct interactive English classes for children aged 8-14 in community centers. Creative teaching methods encouraged.",
         "#Education,#Teaching", "Active"),
        (5, "Digital Literacy Workshop", "Technology", "Andheri, Mumbai", "2026-04-28", "5 hours", 12, 2, 4, 1,
         "Teach basic computer skills and internet safety to senior citizens. Patience and clear communication are essential.",
         "#Technology,#Education", "Active"),
        (4, "Diwali Food Camp", "Food & Nutrition", "Chandni Chowk, Delhi", "2026-03-15", "8 hours", 20, 20, 25, 0,
         "Special Diwali food distribution camp — completed successfully with 2000+ meals served!",
         "#Food,#Festival", "Completed"),
        (5, "Summer Reading Program", "Education", "Bandra, Mumbai", "2026-05-01", "2 hours", 6, 0, 0, 0,
         "A 4-week summer reading program for kids. Volunteers will guide children through age-appropriate books and activities.",
         "#Education,#Reading", "Draft"),
    ]
    for t in tasks:
        cur.execute(
            """INSERT INTO tasks (ngo_id, title, category, location, date, duration, spots, filled, applicants, urgent,
               description, tags, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)""", t)

    # Demo Applications
    apps = [
        (1, 1, "Approved"),   # Rahul approved for Food Distribution
        (3, 1, "Pending"),    # Amit pending for Food Distribution
        (2, 3, "Approved"),   # Priya approved for Teach English
        (4, 2, "Pending"),    # Priya pending for Digital Literacy
        (5, 1, "Completed"),  # Rahul completed Diwali Food Camp
    ]
    for task_id, user_id, status in apps:
        cur.execute(
            "INSERT INTO applications (task_id, user_id, status) VALUES (?,?,?)",
            (task_id, user_id, status))


def _seed_admin(cur):
    """Insert the platform admin account."""
    pw = hash_password("admin123")
    cur.execute(
        "INSERT OR IGNORE INTO users (name, email, password_hash, role, bio, skills_or_needs) VALUES (?,?,?,?,?,?)",
        ("Sarthi Admin", "admin@sarthi.com", pw, "Admin", "Platform administrator", ""))


if __name__ == "__main__":
    init_db()
    print(f"✅ Database initialized at {DB_PATH}")
