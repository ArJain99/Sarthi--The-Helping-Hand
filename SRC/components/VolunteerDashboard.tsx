import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

/* ─── Static Data ─── */
const user = { name: 'Rahul Sharma', initials: 'RS', role: 'Active Volunteer', tasksCompleted: 15, rating: '4/5', badges: 3, progress: 15, progressGoal: 20 }

const availableTasks = [
  { title: 'Food Distribution Drive', org: 'Delhi Food Bank', tags: ['#Food', '#Community', '#Weekend'], location: 'Delhi', duration: '4 hours', spots: 5, urgent: true },
  { title: 'Teach English to Kids', org: 'Education for All', tags: ['#Teaching', '#Children', '#Education'], location: 'Mumbai', duration: '2 weeks', spots: 3, urgent: false },
  { title: 'Beach Cleanup Initiative', org: 'Clean Shores NGO', tags: ['#Environment', '#Outdoors', '#Weekend'], location: 'Goa', duration: '3 hours', spots: 10, urgent: false },
  { title: 'Elderly Care Support', org: 'Golden Years Foundation', tags: ['#Healthcare', '#Seniors', '#Compassion'], location: 'Bangalore', duration: '1 day/week', spots: 2, urgent: true },
]

const recentActivity = [
  { color: '#2ecc71', text: 'Completed "Food Distribution Drive"', time: '2 hours ago' },
  { color: '#1abc9c', text: 'Applied for "Teaching English"', time: '5 hours ago' },
  { color: '#e91e8c', text: 'Earned "Kind Heart" badge', time: '1 day ago' },
  { color: '#f39c12', text: 'Received 5-star review', time: '2 days ago' },
  { color: '#16a085', text: 'Updated profile', time: '3 days ago' },
]

const topVolunteers = [
  { rank: '🥇', initials: 'PP', name: 'Priya Patel', tasks: 42, color: '#f39c12', you: false },
  { rank: '🥈', initials: 'AK', name: 'Amit Kumar', tasks: 38, color: '#95a5a6', you: false },
  { rank: '🥉', initials: 'RS', name: 'Rahul Sharma', tasks: 15, color: '#e67e22', you: true },
  { rank: '#4', initials: 'SR', name: 'Sneha Reddy', tasks: 31, color: '#1abc9c', you: false },
  { rank: '#5', initials: 'VS', name: 'Vikram Singh', tasks: 28, color: '#16a085', you: false },
]

const achievements = [
  { icon: '⭐', label: 'First Steps', desc: 'Complete your first task', unlocked: true },
  { icon: '❤️', label: 'Kind Heart', desc: 'Help 5 people in need', unlocked: true },
  { icon: '⚡', label: 'Speed Demon', desc: 'Complete a task in record time', unlocked: true },
  { icon: '👑', label: 'Super Helper', desc: 'Reach 20 tasks', unlocked: false },
  { icon: '🏆', label: 'Champion', desc: 'Rank #1 on the leaderboard', unlocked: false },
  { icon: '🌟', label: 'Rising Star', desc: 'Complete 5 tasks this month', unlocked: false },
  { icon: '🌍', label: 'Consistent', desc: 'Volunteer 4 weeks in a row', unlocked: false },
  { icon: '🎓', label: 'Legend', desc: '100 tasks completed', unlocked: false },
]

const impactStats = [
  { icon: '👥', value: '127', label: 'People Helped', badge: '+23 this month', badgeColor: '#1abc9c' },
  { icon: '🕐', value: '68', label: 'Hours Contributed', badge: '+12 this week', badgeColor: '#1abc9c' },
  { icon: '❤️', value: '45', label: 'Lives Impacted', badge: '+8 this month', badgeColor: '#e91e8c' },
  { icon: '📈', value: '892', label: 'Impact Score', badge: 'Top 10%', badgeColor: '#1abc9c' },
]

const weeklyChallenges = [
  { title: 'Weekend Warrior', desc: 'Complete 3 tasks this weekend', reward: '50 points', current: 2, goal: 3 },
  { title: 'Community Hero', desc: 'Help 10 different people', reward: '100 points', current: 7, goal: 10 },
  { title: 'Week Streak', desc: 'Volunteer 5 days in a row', reward: 'Consistent badge', current: 3, goal: 5 },
]

const upcomingEvents = [
  { date: '22', month: 'Mar', title: 'Community Blood Donation Drive', time: '9:00 AM - 2:00 PM', location: 'City Hospital, Delhi', volunteers: 15, registered: true },
  { date: '25', month: 'Mar', title: 'Tree Plantation Campaign', time: '6:00 AM - 10:00 AM', location: 'Central Park, Mumbai', volunteers: null, registered: false },
  { date: '28', month: 'Mar', title: 'Skill Development Workshop', time: '3:00 PM - 6:00 PM', location: 'NGO Office, Bangalore', volunteers: null, registered: false },
]

const recommendations = [
  { title: 'Mentor Young Entrepreneurs', desc: 'Based on your teaching and communication skills', tags: ['Teaching', 'Communication'], match: 95 },
  { title: 'Event Coordinator Assistant', desc: 'Perfect for your event planning experience', tags: ['Event Planning'], match: 88 },
  { title: 'Digital Literacy Teacher', desc: 'Combines teaching with tech knowledge', tags: ['Teaching', 'Technology'], match: 82 },
]

const communityFeed = [
  { initials: 'PP', color: '#f39c12', name: 'Priya Patel', action: 'earned the "Champion" badge for completing 50 tasks! 🏆', time: '2 hours ago', icon: '🏅' },
  { initials: 'AK', color: '#1abc9c', name: 'Amit Kumar', action: 'joined the Tree Plantation Campaign event', time: '4 hours ago', icon: '📅' },
  { initials: 'SR', color: '#e91e8c', name: 'Sneha Reddy', action: 'completed "Food Distribution Drive" and helped 30 families', time: '6 hours ago', icon: '❤️' },
  { initials: 'VS', color: '#9b59b6', name: 'Vikram Singh', action: 'started a 5-day volunteering streak! 🔥', time: '8 hours ago', icon: '🏅' },
]

const taskTabs = ['Available', 'Assigned', 'Completed']

const VolunteerDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Available')
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [review, setReview] = useState({ ngo: '', rating: 0, hoverRating: 0, comment: '' })
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const taskList = activeTab === 'Available' ? availableTasks : []
  const emptyMsg = activeTab === 'Completed' ? ['✅', 'No Completed Tasks Yet', 'Complete your first task!']
    : activeTab === 'Assigned' ? ['📋', 'No Assigned Tasks', 'Browse available tasks to get started.']
    : ['🔍', 'No Available Tasks', 'Check back soon for new opportunities.']

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setReviewSubmitted(true)
    setTimeout(() => { setReviewSubmitted(false); setReview({ ngo: '', rating: 0, hoverRating: 0, comment: '' }) }, 4000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg, #1a0533 0%, #2d1060 35%, #3d1580 60%, #2a0d6e 100%)', color: 'white', fontFamily: 'Inter, Segoe UI, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 2rem', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logoImg} alt="Sarthi" style={{ height: '46px', width: 'auto' }} />
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5px' }}>Volunteer Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: '1.25rem' }}>🔔</span>
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#e74c3c', color: 'white', borderRadius: '999px', fontSize: '0.6rem', fontWeight: '700', padding: '1px 5px' }}>3</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f39c12, #e67e22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '2px solid rgba(255,255,255,0.3)' }}>{user.initials}</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.87rem', lineHeight: '1.1' }}>{user.name}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)' }}>{user.role}</div>
            </div>
          </div>
          <button onClick={() => navigate('/signin')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', color: 'white', padding: '0.35rem 1rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: '600' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: '800', marginBottom: '0.3rem' }}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>Ready to make an impact today?</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '☑️', bg: 'rgba(255,255,255,0.15)', label: 'Tasks Completed', value: user.tasksCompleted },
            { icon: '⭐', bg: 'rgba(243,156,18,0.25)', label: 'Average Rating', value: user.rating },
            { icon: '🏅', bg: 'rgba(255,255,255,0.15)', label: 'Badges Earned', value: user.badges, progress: true },
          ].map((s, i) => (
            <div key={i} style={card}>
              <div style={{ ...iconBox, background: s.bg }}>{s.icon}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '1.5rem', marginBottom: '0.3rem' }}>{s.label}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800' }}>{s.value}</div>
              {s.progress && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.3rem' }}><span>Progress to Super Helper</span><span>{user.progress}/{user.progressGoal}</span></div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(user.progress / user.progressGoal) * 100}%`, background: 'linear-gradient(90deg,#f39c12,#e91e8c)', borderRadius: '999px' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* My Tasks */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '1rem' }}>My Tasks</h2>
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
                {taskTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.2s', background: activeTab === tab ? 'linear-gradient(90deg,#f39c12,#e91e8c)' : 'transparent', color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.55)' }}>{tab}</button>
                ))}
              </div>
              {taskList.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {taskList.map((t, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1.1rem 1.25rem', position: 'relative' }}>
                      {t.urgent && <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'linear-gradient(90deg,#f39c12,#e74c3c)', color: 'white', fontSize: '0.68rem', fontWeight: '700', padding: '2px 8px', borderRadius: '999px' }}>URGENT</span>}
                      <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.15rem' }}>{t.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.6rem' }}>{t.org}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        {t.tags.map(tag => <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: '600', color: 'rgba(255,255,255,0.75)' }}>{tag}</span>)}
                      </div>
                      <div style={{ display: 'flex', gap: '1.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginBottom: '0.9rem' }}>
                        <span>📍 {t.location}</span><span>🕐 {t.duration}</span><span>👥 {t.spots} spots</span>
                      </div>
                      <button style={{ width: '100%', padding: '0.6rem', borderRadius: '999px', background: 'linear-gradient(90deg,#f39c12,#e91e8c)', border: 'none', color: 'white', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Quick Apply →</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{emptyMsg[0]}</div>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.4rem' }}>{emptyMsg[1]}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{emptyMsg[2]}</div>
                </div>
              )}
            </div>

            {/* Achievement Gallery */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Achievement Gallery</h2>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>3/8 Unlocked</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem' }}>
                {achievements.map(a => (
                  <div key={a.label} style={{ position: 'relative' }} onMouseEnter={() => setTooltip(a.label)} onMouseLeave={() => setTooltip(null)}>
                    {tooltip === a.label && (
                      <div style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', borderRadius: '8px', padding: '0.4rem 0.7rem', zIndex: 10, whiteSpace: 'nowrap', pointerEvents: 'none', fontSize: '0.72rem' }}>
                        <div style={{ fontWeight: '700', color: 'white' }}>{a.label}</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)' }}>{a.desc}</div>
                      </div>
                    )}
                    <div style={{ borderRadius: '14px', background: a.unlocked ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${a.unlocked ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`, padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: a.unlocked ? 1 : 0.4, transition: 'transform 0.2s', cursor: 'default' }}
                      onMouseEnter={e => { if (a.unlocked) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}>
                      <span style={{ fontSize: '1.6rem' }}>{a.unlocked ? a.icon : '🔒'}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600', textAlign: 'center', color: a.unlocked ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)' }}>{a.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Impact */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Your Impact</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Making a difference, one task at a time</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                {impactStats.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '14px', padding: '1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                    <div style={{ fontSize: '1.85rem', fontWeight: '800', lineHeight: '1' }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{s.label}</div>
                    <span style={{ color: s.badgeColor, fontSize: '0.75rem', fontWeight: '600' }}>{s.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenges */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
                <div>
                  <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.2rem' }}>🎯 Weekly Challenges</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>Complete challenges to earn rewards</p>
                </div>
                <span style={{ background: 'rgba(243,156,18,0.2)', border: '1px solid rgba(243,156,18,0.4)', color: '#f39c12', borderRadius: '999px', padding: '0.3rem 0.75rem', fontSize: '0.78rem', fontWeight: '700', whiteSpace: 'nowrap' }}>🔥 3 day streak!</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {weeklyChallenges.map((c, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '12px', padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{c.title}</span>
                      <span style={{ color: '#f39c12', fontSize: '0.8rem', fontWeight: '600' }}>{c.reward}</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '0.6rem' }}>{c.desc}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.3rem' }}><span>Progress</span><span>{c.current}/{c.goal}</span></div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(c.current / c.goal) * 100}%`, background: 'linear-gradient(90deg,#f39c12,#e91e8c)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>COMPLETED THIS WEEK</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#2ecc71' }}>✅</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Early Bird</span>
                    </div>
                    <span style={{ color: '#1abc9c', fontSize: '0.78rem', fontWeight: '600' }}>Early Bird badge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>📅 Upcoming Events</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>Mark your calendar</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.5px', fontWeight: '600' }}>YOU'RE REGISTERED</div>
                {upcomingEvents.map((e, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '14px', padding: '1rem 1.1rem', border: `1px solid ${e.registered ? 'rgba(26,188,156,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ textAlign: 'center', background: e.registered ? '#e74c3c' : 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.35rem 0.6rem', minWidth: '44px', flexShrink: 0 }}>
                        <div style={{ fontWeight: '800', fontSize: '1.1rem', lineHeight: '1' }}>{e.date}</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>{e.month}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{e.title}</div>
                        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>🕐 {e.time}</div>
                        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>📍 {e.location}</div>
                        {e.volunteers && <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>👥 {e.volunteers} volunteers going</div>}
                      </div>
                    </div>
                    {e.registered ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', alignItems: 'center' }}>
                        <span style={{ color: '#1abc9c', fontSize: '0.8rem', fontWeight: '600' }}>✓ Registered</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', cursor: 'pointer' }}>View Details →</span>
                      </div>
                    ) : (
                      <button style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}>Register Interest</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended For You */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>💡 Recommended For You</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>Based on your skills &amp; interests</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recommendations.map((r, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '12px', padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{r.title}</span>
                      <span style={{ background: 'rgba(26,188,156,0.2)', border: '1px solid rgba(26,188,156,0.35)', color: '#1abc9c', padding: '2px 8px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: '700', flexShrink: 0, marginLeft: '0.5rem' }}>✦ {r.match}%</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{r.desc}</div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {r.tags.map(t => <span key={t} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', marginTop: '1rem', background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' }}>See More Recommendations →</button>
            </div>

            {/* Community Feed */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>💬 Community Feed</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>See what others are doing</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {communityFeed.map((f, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '12px', padding: '0.9rem 1rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.78rem', flexShrink: 0 }}>{f.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem' }}><strong>{f.name}</strong> {f.action}</div>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.73rem' }}>{f.time}</span>
                        <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.73rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', padding: 0 }}>🤍 Like</button>
                      </div>
                    </div>
                    <span style={{ fontSize: '1.1rem', opacity: 0.5 }}>{f.icon}</span>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', marginTop: '1rem', background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer' }}>View All Activity →</button>
            </div>

            {/* ── Leave a Review ── */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>✍️ Leave a Review</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Share your experience with an NGO you worked with</p>

              {reviewSubmitted ? (
                <div style={{ background: 'rgba(26,188,156,0.2)', border: '1px solid rgba(26,188,156,0.4)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🙌</div>
                  <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>Review Submitted!</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Thank you for your feedback.</div>
                </div>
              ) : (
                <form onSubmit={submitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* NGO select */}
                  <div>
                    <label style={lbl}>Select NGO / Organisation</label>
                    <select value={review.ngo} onChange={e => setReview(r => ({ ...r, ngo: e.target.value }))} required style={inp(false)}>
                      <option value="">Choose an organisation you worked with…</option>
                      <option value="Delhi Food Bank">Delhi Food Bank</option>
                      <option value="Education for All">Education for All</option>
                      <option value="Clean Shores NGO">Clean Shores NGO</option>
                      <option value="Golden Years Foundation">Golden Years Foundation</option>
                    </select>
                  </div>

                  {/* Star rating */}
                  <div>
                    <label style={lbl}>Your Rating</label>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {[1,2,3,4,5].map(star => (
                        <span key={star} onClick={() => setReview(r => ({ ...r, rating: star }))}
                          onMouseEnter={() => setReview(r => ({ ...r, hoverRating: star }))}
                          onMouseLeave={() => setReview(r => ({ ...r, hoverRating: 0 }))}
                          style={{ fontSize: '1.8rem', cursor: 'pointer', color: star <= (review.hoverRating || review.rating) ? '#f39c12' : 'rgba(255,255,255,0.2)', transition: 'color 0.15s' }}>★</span>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label style={lbl}>Your Experience</label>
                    <textarea value={review.comment} onChange={e => setReview(r => ({ ...r, comment: e.target.value }))} required placeholder="Describe your volunteering experience, what you learned, and how the NGO supported you…" rows={4}
                      style={{ ...inp(false), resize: 'vertical' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(26,188,156,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                    />
                  </div>

                  <button type="submit" style={{ padding: '0.8rem', borderRadius: '999px', background: 'linear-gradient(90deg,#f39c12,#e91e8c)', border: 'none', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Submit Review →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Recent Activity */}
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span>🕐</span><h2 style={{ fontWeight: '700', fontSize: '1.05rem' }}>Recent Activity</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: a.color, flexShrink: 0, marginTop: '4px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'rgba(255,255,255,0.85)' }}>{a.text}</div>
                      <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.4)' }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Volunteers */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>🏆</span><h2 style={{ fontWeight: '700', fontSize: '1.05rem' }}>Top Volunteers</h2></div>
                <span style={{ color: '#1abc9c', fontSize: '1rem' }}>↗</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {topVolunteers.map((v, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: '10px', background: v.you ? 'rgba(243,156,18,0.15)' : 'rgba(255,255,255,0.05)', border: v.you ? '1px solid rgba(243,156,18,0.4)' : '1px solid transparent' }}>
                    <span style={{ fontSize: '1rem', width: '1.5rem', textAlign: 'center' }}>{v.rank}</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${v.color},${v.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '700', flexShrink: 0 }}>{v.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{v.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.73rem' }}>{v.tasks} tasks</div>
                    </div>
                    {v.you && <span style={{ background: '#f39c12', color: 'white', fontSize: '0.62rem', fontWeight: '700', padding: '2px 8px', borderRadius: '999px' }}>You</span>}
                  </div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.76rem', marginTop: '0.75rem', textAlign: 'center' }}>
                Complete <span style={{ color: '#f39c12', fontWeight: '700' }}>5 more tasks</span> to reach rank #2! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`select option { background:#2d1060; color:white; }`}</style>
    </div>
  )
}

const card: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }
const iconBox: React.CSSProperties = { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }
const lbl: React.CSSProperties = { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }
const inp = (_err: boolean): React.CSSProperties => ({ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit' })

export default VolunteerDashboard
