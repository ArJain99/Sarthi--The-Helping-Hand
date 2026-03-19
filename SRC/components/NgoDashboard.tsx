import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

/* ─── Static Data ─── */
const ngo = {
  name: 'Delhi Food Bank',
  initials: 'DF',
  type: 'Food & Nutrition NGO',
  verified: true,
  tasksPosted: 24,
  volunteersTotal: 142,
  peopleServed: 3800,
  rating: '4.8/5',
}

const postedTasks = [
  {
    id: 1, title: 'Food Distribution Drive', category: 'Food & Nutrition', location: 'Delhi',
    date: '22 Mar 2025', duration: '4 hours', spots: 5, filled: 12, urgent: true, status: 'Active',
    tags: ['#Food', '#Community', '#Weekend'], applicants: 17,
    description: 'Help distribute meals to underprivileged families across the Delhi area.',
  },
  {
    id: 2, title: 'Awareness Campaign – Malnutrition', category: 'Health', location: 'Noida',
    date: '25 Mar 2025', duration: '6 hours', spots: 8, filled: 3, urgent: false, status: 'Active',
    tags: ['#Health', '#Awareness', '#Children'], applicants: 5,
    description: 'Raise awareness about malnutrition among children in underserved communities.',
  },
  {
    id: 3, title: 'Warehouse Sorting & Packaging', category: 'Logistics', location: 'Delhi',
    date: '18 Mar 2025', duration: '3 hours', spots: 10, filled: 10, urgent: false, status: 'Completed',
    tags: ['#Logistics', '#Indoor'], applicants: 10,
    description: 'Sort and package food items at the central warehouse for upcoming distributions.',
  },
  {
    id: 4, title: 'Community Kitchen Volunteers', category: 'Food & Nutrition', location: 'Gurugram',
    date: '30 Mar 2025', duration: '5 hours', spots: 6, filled: 0, urgent: false, status: 'Draft',
    tags: ['#Cooking', '#Community'], applicants: 0,
    description: 'Assist with cooking and serving at the community kitchen for migrant workers.',
  },
]

const volunteerApplicants = [
  { id: 1, name: 'Rahul Sharma', initials: 'RS', color: '#e67e22', task: 'Food Distribution Drive', appliedOn: '2 hours ago', skills: ['Leadership', 'Communication'], tasks: 15, rating: 4.8, status: 'Pending' },
  { id: 2, name: 'Priya Patel', initials: 'PP', color: '#f39c12', task: 'Food Distribution Drive', appliedOn: '4 hours ago', skills: ['Cooking', 'First Aid'], tasks: 42, rating: 5.0, status: 'Pending' },
  { id: 3, name: 'Sneha Reddy', initials: 'SR', color: '#e91e8c', task: 'Awareness Campaign', appliedOn: '1 day ago', skills: ['Teaching', 'Communication'], tasks: 31, rating: 4.6, status: 'Approved' },
  { id: 4, name: 'Amit Kumar', initials: 'AK', color: '#1abc9c', task: 'Food Distribution Drive', appliedOn: '1 day ago', skills: ['Logistics', 'Driving'], tasks: 38, rating: 4.9, status: 'Approved' },
  { id: 5, name: 'Vikram Singh', initials: 'VS', color: '#9b59b6', task: 'Awareness Campaign', appliedOn: '2 days ago', skills: ['Public Speaking'], tasks: 28, rating: 4.7, status: 'Rejected' },
  { id: 6, name: 'Anjali Mehta', initials: 'AM', color: '#3498db', task: 'Food Distribution Drive', appliedOn: '3 days ago', skills: ['Medical', 'Organization'], tasks: 20, rating: 4.5, status: 'Pending' },
]

const recentActivity = [
  { color: '#1abc9c', text: 'Priya Patel applied for "Food Distribution Drive"', time: '2 hours ago' },
  { color: '#f39c12', text: 'Task "Warehouse Sorting" marked as Completed', time: '5 hours ago' },
  { color: '#e91e8c', text: 'Sneha Reddy was approved for "Awareness Campaign"', time: '1 day ago' },
  { color: '#2ecc71', text: 'New task "Community Kitchen" created as Draft', time: '2 days ago' },
  { color: '#3498db', text: 'Amit Kumar approved for Food Distribution', time: '2 days ago' },
]

const ngoStats = [
  { icon: '📋', label: 'Tasks Posted', value: ngo.tasksPosted, badge: '+3 this month', badgeColor: '#1abc9c' },
  { icon: '👥', label: 'Total Volunteers', value: ngo.volunteersTotal, badge: '+18 this month', badgeColor: '#1abc9c' },
  { icon: '🍽️', label: 'People Served', value: ngo.peopleServed.toLocaleString(), badge: '+420 this month', badgeColor: '#e91e8c' },
  { icon: '⭐', label: 'Avg. Rating', value: ngo.rating, badge: 'Top 5% NGOs', badgeColor: '#f39c12' },
]

const taskStatusTabs = ['All', 'Active', 'Draft', 'Completed']
const volunteerFilterTabs = ['All', 'Pending', 'Approved', 'Rejected']

/* ─── New Task Form Initial State ─── */
const emptyForm = { title: '', category: '', location: '', date: '', duration: '', spots: '', description: '', urgent: false }

/* ─── Component ─── */
const NgoDashboard = () => {
  const navigate = useNavigate()
  const [taskTab, setTaskTab] = useState('All')
  const [volTab, setVolTab] = useState('All')
  const [showPostForm, setShowPostForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [applicants, setApplicants] = useState(volunteerApplicants)
  const [tasks, setTasks] = useState(postedTasks)
  const [expandedTask, setExpandedTask] = useState<number | null>(null)
  const [showNotifs, setShowNotifs] = useState(false)
  const [readNotifs, setReadNotifs] = useState<number[]>([])
  const ngoId = localStorage.getItem('sarthi_ngo_id') || 'NGO-DEMO0001'

  /* Filter tasks */
  const filteredTasks = taskTab === 'All' ? tasks : tasks.filter(t => t.status === taskTab)

  /* Filter volunteers */
  const filteredVols = volTab === 'All' ? applicants : applicants.filter(v => v.status === volTab)

  /* Approve / Reject volunteer */
  const updateVolStatus = (id: number, status: 'Approved' | 'Rejected') => {
    setApplicants(prev => prev.map(v => v.id === id ? { ...v, status } : v))
  }

  /* Submit new task */
  const handlePostTask = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask = {
      id: tasks.length + 1,
      title: form.title,
      category: form.category,
      location: form.location,
      date: form.date,
      duration: form.duration,
      spots: parseInt(form.spots) || 0,
      filled: 0,
      urgent: form.urgent,
      status: 'Active' as const,
      tags: [`#${form.category}`],
      applicants: 0,
      description: form.description,
    }
    setTasks(prev => [newTask, ...prev])
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setShowPostForm(false)
      setForm(emptyForm)
    }, 2500)
  }

  const pendingCount = applicants.filter(v => v.status === 'Pending').length

  const notifications = [
    { id: 1, icon: '🙋', color: '#f39c12', title: 'New Applicant', body: 'Rahul Sharma applied for "Food Distribution Drive"', time: '2 hrs ago', urgent: false },
    { id: 2, icon: '🙋', color: '#f39c12', title: 'New Applicant', body: 'Priya Patel applied for "Food Distribution Drive"', time: '4 hrs ago', urgent: false },
    { id: 3, icon: '🙋', color: '#3498db', title: 'New Applicant', body: 'Anjali Mehta applied for "Food Distribution Drive"', time: '3 days ago', urgent: false },
    { id: 4, icon: '🚨', color: '#e74c3c', title: 'Urgent Task Nearly Full', body: '"Food Distribution Drive" is over capacity – review applicants', time: '1 hr ago', urgent: true },
    { id: 5, icon: '✅', color: '#1abc9c', title: 'Task Completed', body: '"Warehouse Sorting & Packaging" was marked complete', time: '5 hrs ago', urgent: false },
    { id: 6, icon: '⭐', color: '#f39c12', title: 'New Review', body: 'Sneha Reddy left a 5-star review for your NGO', time: '1 day ago', urgent: false },
  ]
  const unreadCount = notifications.filter(n => !readNotifs.includes(n.id)).length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg, #001a2e 0%, #003355 35%, #004475 60%, #002244 100%)', color: 'white', fontFamily: 'Inter, Segoe UI, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 2rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logoImg} alt="Sarthi" style={{ height: '46px', width: 'auto' }} />
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5px' }}>NGO Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => { setShowNotifs(v => !v); setReadNotifs(notifications.map(n => n.id)) }}>
            <span style={{ fontSize: '1.25rem' }}>🔔</span>
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#e74c3c', color: 'white', borderRadius: '999px', fontSize: '0.6rem', fontWeight: '700', padding: '1px 5px' }}>{unreadCount}</span>
            )}
            {/* ── Notification Dropdown ── */}
            {showNotifs && (
              <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 'calc(100% + 14px)', right: '-8px', width: '340px', background: 'linear-gradient(160deg,#002244,#003355)', border: '1px solid rgba(14,165,233,0.35)', borderRadius: '18px', boxShadow: '0 16px 50px rgba(0,0,0,0.5)', zIndex: 200, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem 0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>🔔 Notifications</span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{notifications.length} total</span>
                </div>
                <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.85rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: n.urgent ? 'rgba(231,76,60,0.07)' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
                      onMouseEnter={e => (e.currentTarget.style.background = n.urgent ? 'rgba(231,76,60,0.14)' : 'rgba(255,255,255,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = n.urgent ? 'rgba(231,76,60,0.07)' : 'transparent')}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${n.color}22`, border: `1px solid ${n.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{n.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.8rem', color: n.urgent ? '#e74c3c' : 'rgba(255,255,255,0.9)' }}>{n.title}{n.urgent && ' 🚨'}</span>
                          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>{n.time}</span>
                        </div>
                        <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>{n.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0.65rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                  <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', color: '#38bdf8', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Close ✕</button>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '2px solid rgba(255,255,255,0.3)' }}>{ngo.initials}</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.87rem', lineHeight: '1.1', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {ngo.name}
                {ngo.verified && <span style={{ fontSize: '0.75rem', background: 'rgba(14,165,233,0.25)', border: '1px solid rgba(14,165,233,0.5)', color: '#38bdf8', borderRadius: '999px', padding: '1px 6px' }}>✓ Verified</span>}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)' }}>{ngo.type}</div>
              <div style={{ fontSize: '0.62rem', color: '#0ea5e9', fontWeight: '700', letterSpacing: '0.5px', marginTop: '0.1rem' }}>{ngoId}</div>
            </div>
          </div>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', color: 'white', padding: '0.35rem 1rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: '600' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── Welcome ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: '800', marginBottom: '0.3rem' }}>Welcome back, {ngo.name}! 🏢</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>Manage your tasks, track volunteers, and grow your impact.</p>
          </div>
          <button onClick={() => setShowPostForm(true)} style={{ background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)', border: 'none', borderRadius: '12px', color: 'white', padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(14,165,233,0.4)', transition: 'transform 0.2s, opacity 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}>
            <span style={{ fontSize: '1.1rem' }}>＋</span> Post New Task
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {ngoStats.map((s, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.9rem', fontWeight: '800', lineHeight: '1' }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: '0.3rem 0 0.4rem' }}>{s.label}</div>
              <span style={{ color: s.badgeColor, fontSize: '0.75rem', fontWeight: '600' }}>{s.badge}</span>
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* ── Post New Task Form (Modal-like card) ── */}
            {showPostForm && (
              <div style={{ ...card, border: '1px solid rgba(14,165,233,0.4)', boxShadow: '0 8px 40px rgba(14,165,233,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontWeight: '700', fontSize: '1.15rem' }}>📝 Post a New Task</h2>
                  <button onClick={() => { setShowPostForm(false); setForm(emptyForm); setFormSubmitted(false) }}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                </div>
                {formSubmitted ? (
                  <div style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.4)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                    <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>Task Posted Successfully!</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Your task is now live and accepting applicants.</div>
                  </div>
                ) : (
                  <form onSubmit={handlePostTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={lbl}>Task Title *</label>
                        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                          placeholder="e.g. Food Distribution Drive" style={inp}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                      </div>
                      <div>
                        <label style={lbl}>Category *</label>
                        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required style={{ ...inp, appearance: 'none' }}>
                          <option value="">Select a category…</option>
                          <option>Food & Nutrition</option>
                          <option>Education</option>
                          <option>Health</option>
                          <option>Environment</option>
                          <option>Logistics</option>
                          <option>Community</option>
                          <option>Technology</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={lbl}>Location *</label>
                        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required
                          placeholder="City or Address" style={inp}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                      </div>
                      <div>
                        <label style={lbl}>Date *</label>
                        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required style={{ ...inp, colorScheme: 'dark' }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                      </div>
                      <div>
                        <label style={lbl}>Duration *</label>
                        <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required
                          placeholder="e.g. 4 hours" style={inp}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', alignItems: 'flex-end' }}>
                      <div>
                        <label style={lbl}>Volunteer Spots *</label>
                        <input type="number" min="1" value={form.spots} onChange={e => setForm(f => ({ ...f, spots: e.target.value }))} required
                          placeholder="e.g. 10" style={inp}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} onClick={() => setForm(f => ({ ...f, urgent: !f.urgent }))}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: form.urgent ? 'linear-gradient(135deg,#f39c12,#e74c3c)' : 'rgba(255,255,255,0.1)', border: `1px solid ${form.urgent ? 'transparent' : 'rgba(255,255,255,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', transition: 'all 0.2s' }}>{form.urgent ? '✓' : ''}</div>
                        <span style={{ fontSize: '0.88rem', fontWeight: '600', color: form.urgent ? '#f39c12' : 'rgba(255,255,255,0.65)' }}>Mark as Urgent</span>
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Description *</label>
                      <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required
                        placeholder="Describe the task, requirements, and what volunteers will be doing…" rows={3}
                        style={{ ...inp, resize: 'vertical' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="button" onClick={() => { setShowPostForm(false); setForm(emptyForm) }} style={{ flex: 1, padding: '0.75rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" style={{ flex: 2, padding: '0.75rem', borderRadius: '999px', background: 'linear-gradient(90deg,#0ea5e9,#06b6d4)', border: 'none', color: 'white', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(14,165,233,0.4)', transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        Publish Task →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ── My Tasks ── */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>📋 Posted Tasks</h2>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{tasks.length} tasks total</span>
              </div>
              {/* Tab Bar */}
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
                {taskStatusTabs.map(tab => (
                  <button key={tab} onClick={() => setTaskTab(tab)} style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem', transition: 'all 0.2s', background: taskTab === tab ? 'linear-gradient(90deg,#0ea5e9,#06b6d4)' : 'transparent', color: taskTab === tab ? 'white' : 'rgba(255,255,255,0.5)' }}>{tab}</button>
                ))}
              </div>
              {/* Task Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredTasks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'rgba(255,255,255,0.4)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: '700' }}>No {taskTab} Tasks</div>
                  </div>
                ) : filteredTasks.map(t => (
                  <div key={t.id} style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${t.status === 'Active' ? 'rgba(14,165,233,0.3)' : t.status === 'Completed' ? 'rgba(26,188,156,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '14px', overflow: 'hidden' }}>
                    <div style={{ padding: '1.1rem 1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '1rem' }}>{t.title}</div>
                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0, marginLeft: '0.75rem' }}>
                          {t.urgent && <span style={{ background: 'linear-gradient(90deg,#f39c12,#e74c3c)', color: 'white', fontSize: '0.62rem', fontWeight: '700', padding: '2px 8px', borderRadius: '999px' }}>URGENT</span>}
                          <span style={{ fontSize: '0.72rem', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', background: t.status === 'Active' ? 'rgba(14,165,233,0.2)' : t.status === 'Completed' ? 'rgba(26,188,156,0.2)' : 'rgba(255,255,255,0.1)', color: t.status === 'Active' ? '#38bdf8' : t.status === 'Completed' ? '#1abc9c' : 'rgba(255,255,255,0.55)', border: `1px solid ${t.status === 'Active' ? 'rgba(14,165,233,0.35)' : t.status === 'Completed' ? 'rgba(26,188,156,0.35)' : 'rgba(255,255,255,0.15)'}` }}>{t.status}</span>
                        </div>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{t.category} · {t.location}</div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        {t.tags.map(tag => <span key={tag} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.7rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' }}>{tag}</span>)}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                        <span>📅 {t.date}</span>
                        <span>🕐 {t.duration}</span>
                        <span>👥 {t.filled}/{t.spots} filled</span>
                        <span>📩 {t.applicants} applicants</span>
                      </div>
                      {/* Capacity bar */}
                      <div style={{ marginBottom: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.3rem' }}>
                          <span>Capacity</span><span>{Math.round((t.filled / (t.spots || 1)) * 100)}%</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${Math.min((t.filled / (t.spots || 1)) * 100, 100)}%`, background: 'linear-gradient(90deg,#0ea5e9,#06b6d4)', borderRadius: '999px' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button onClick={() => setExpandedTask(expandedTask === t.id ? null : t.id)}
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: '600', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                          {expandedTask === t.id ? 'Hide Details ↑' : 'View Details ↓'}
                        </button>
                        {t.status !== 'Completed' && (
                          <button style={{ flex: 1, padding: '0.5rem', borderRadius: '999px', background: 'linear-gradient(90deg,#0ea5e9,#06b6d4)', border: 'none', color: 'white', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                            Edit Task ✎
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Expandable description */}
                    {expandedTask === t.id && (
                      <div style={{ padding: '0.9rem 1.25rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}>
                        <div style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6' }}>{t.description}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Volunteer Applicants ── */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>🙋 Volunteer Applicants</h2>
                {pendingCount > 0 && (
                  <span style={{ background: 'rgba(231,76,60,0.2)', border: '1px solid rgba(231,76,60,0.4)', color: '#e74c3c', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '0.78rem', fontWeight: '700' }}>
                    {pendingCount} Pending Review
                  </span>
                )}
              </div>
              {/* Filter tabs */}
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
                {volunteerFilterTabs.map(tab => (
                  <button key={tab} onClick={() => setVolTab(tab)} style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem', transition: 'all 0.2s', background: volTab === tab ? 'linear-gradient(90deg,#0ea5e9,#06b6d4)' : 'transparent', color: volTab === tab ? 'white' : 'rgba(255,255,255,0.5)' }}>{tab}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {filteredVols.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'rgba(255,255,255,0.4)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👤</div>
                    <div style={{ fontWeight: '700' }}>No {volTab} Applications</div>
                  </div>
                ) : filteredVols.map(v => (
                  <div key={v.id} style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '14px', padding: '1rem 1.15rem', border: `1px solid ${v.status === 'Pending' ? 'rgba(243,156,18,0.3)' : v.status === 'Approved' ? 'rgba(26,188,156,0.3)' : 'rgba(231,76,60,0.2)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>{v.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.3rem' }}>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{v.name}</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.1rem' }}>Applied for: <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '600' }}>{v.task}</span></div>
                          </div>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', flexShrink: 0, background: v.status === 'Pending' ? 'rgba(243,156,18,0.2)' : v.status === 'Approved' ? 'rgba(26,188,156,0.2)' : 'rgba(231,76,60,0.2)', color: v.status === 'Pending' ? '#f39c12' : v.status === 'Approved' ? '#1abc9c' : '#e74c3c', border: `1px solid ${v.status === 'Pending' ? 'rgba(243,156,18,0.4)' : v.status === 'Approved' ? 'rgba(26,188,156,0.4)' : 'rgba(231,76,60,0.4)'}` }}>{v.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>⭐ {v.rating}</span>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>✅ {v.tasks} tasks done</span>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>· {v.appliedOn}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                          {v.skills.map(s => <span key={s} style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '999px', padding: '2px 10px', fontSize: '0.7rem', color: '#38bdf8', fontWeight: '600' }}>{s}</span>)}
                        </div>
                        {v.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
                            <button onClick={() => updateVolStatus(v.id, 'Approved')}
                              style={{ flex: 1, padding: '0.45rem', borderRadius: '999px', background: 'linear-gradient(90deg,#1abc9c,#16a085)', border: 'none', color: 'white', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                              ✓ Approve
                            </button>
                            <button onClick={() => updateVolStatus(v.id, 'Rejected')}
                              style={{ flex: 1, padding: '0.45rem', borderRadius: '999px', background: 'rgba(231,76,60,0.2)', border: '1px solid rgba(231,76,60,0.4)', color: '#e74c3c', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.opacity = '0.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                              ✕ Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* ── Organisation Overview ── */}
            <div style={{ ...card, background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(6,182,212,0.08))', border: '1px solid rgba(14,165,233,0.3)' }}>
              <h2 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '1rem' }}>🏢 Organisation Profile</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg,#0ea5e9,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem', border: '2px solid rgba(255,255,255,0.2)' }}>{ngo.initials}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem' }}>{ngo.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem' }}>{ngo.type}</div>
                  <span style={{ fontSize: '0.68rem', background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)', color: '#38bdf8', borderRadius: '999px', padding: '1px 8px', marginTop: '0.2rem', display: 'inline-block' }}>✓ Verified NGO</span>
                  <div style={{ fontSize: '0.7rem', color: '#0ea5e9', fontWeight: '700', letterSpacing: '0.5px', marginTop: '0.35rem' }}>{ngoId}</div>
                </div>
              </div>
              {[
                { label: 'Impact Score', value: '9,240', icon: '📈' },
                { label: 'Completion Rate', value: '94%', icon: '✅' },
                { label: 'Response Time', value: '< 2 hrs', icon: '⚡' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>{item.icon} {item.label}</span>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* ── Recent Activity ── */}
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span>🕐</span><h2 style={{ fontWeight: '700', fontSize: '1.05rem' }}>Recent Activity</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: a.color, flexShrink: 0, marginTop: '4px' }} />
                    <div>
                      <div style={{ fontSize: '0.83rem', fontWeight: '500', color: 'rgba(255,255,255,0.85)' }}>{a.text}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.1rem' }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Quick Stats ── */}
            <div style={card}>
              <h2 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '1rem' }}>📊 Task Overview</h2>
              {[
                { label: 'Active Tasks', count: tasks.filter(t => t.status === 'Active').length, color: '#0ea5e9' },
                { label: 'Draft Tasks', count: tasks.filter(t => t.status === 'Draft').length, color: '#f39c12' },
                { label: 'Completed Tasks', count: tasks.filter(t => t.status === 'Completed').length, color: '#1abc9c' },
                { label: 'Pending Approvals', count: applicants.filter(v => v.status === 'Pending').length, color: '#e74c3c' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i < 3 ? '0.75rem' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: '800', fontSize: '1.1rem', color: item.color }}>{item.count}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden', display: 'flex' }}>
                {[
                  { pct: (tasks.filter(t => t.status === 'Active').length / tasks.length) * 100, color: '#0ea5e9' },
                  { pct: (tasks.filter(t => t.status === 'Draft').length / tasks.length) * 100, color: '#f39c12' },
                  { pct: (tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100, color: '#1abc9c' },
                ].map((seg, i) => (
                  <div key={i} style={{ height: '100%', width: `${seg.pct}%`, background: seg.color }} />
                ))}
              </div>
            </div>

            {/* ── Top Volunteers for this NGO ── */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>🏆</span><h2 style={{ fontWeight: '700', fontSize: '1.05rem' }}>Top Volunteers</h2></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {applicants.filter(v => v.status === 'Approved').slice(0, 5).map((v, i) => (
                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '0.9rem', width: '1.5rem', textAlign: 'center' }}>{['🥇', '🥈', '🥉', '#4', '#5'][i]}</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '700', flexShrink: 0 }}>{v.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.83rem' }}>{v.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>⭐ {v.rating} · {v.tasks} tasks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`select option, input[type="date"]::-webkit-calendar-picker-indicator { background: #003355; color: white; } * { box-sizing: border-box; }`}</style>
    </div>
  )
}

const card: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }
const lbl: React.CSSProperties = { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }
const inp: React.CSSProperties = { width: '100%', padding: '0.7rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit' }

export default NgoDashboard
