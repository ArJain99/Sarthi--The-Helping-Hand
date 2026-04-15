import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const userTabs = ['All', 'Volunteer', 'NGO']
const taskTabs = ['All', 'Active', 'Draft', 'Completed']

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<any>({ stats: [], users: [], tasks: [] })
  const [userTab, setUserTab] = useState('All')
  const [taskTab, setTaskTab] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const adminName = localStorage.getItem('sarthi_admin_name') || 'Admin'
  const adminInitials = adminName.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || 'SA'
  const token = localStorage.getItem('sarthi_jwt') || ''

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admin/stats/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 403) { navigate('/admin-signin'); return }
      if (!res.ok) throw new Error('Failed to fetch')
      setData(await res.json())
    } catch {
      setError('Could not load dashboard data. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const filteredUsers = userTab === 'All' ? data.users : data.users.filter((u: any) => u.role === userTab)
  const filteredTasks = taskTab === 'All' ? data.tasks : data.tasks.filter((t: any) => t.status === taskTab)

  const handleSignOut = () => {
    localStorage.removeItem('sarthi_jwt')
    localStorage.removeItem('sarthi_admin_id')
    localStorage.removeItem('sarthi_admin_name')
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(150deg, #001a2e 0%, #003355 35%, #004475 60%, #002244 100%)', color: 'white', fontFamily: 'Inter, Segoe UI, sans-serif' }}>

      {/* ── Navbar ── */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 2rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logoImg} alt="Sarthi" style={{ height: '46px', width: 'auto' }} />
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.5px' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Admin badge */}
          <span style={{ background: 'rgba(243,156,18,0.2)', border: '1px solid rgba(243,156,18,0.4)', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: '700', color: '#f39c12' }}>🛡️ Admin</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f39c12, #e67e22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', border: '2px solid rgba(255,255,255,0.3)' }}>{adminInitials}</div>
            <span style={{ fontWeight: '700', fontSize: '0.87rem' }}>{adminName}</span>
          </div>
          <button onClick={handleSignOut} style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.35)', color: '#e74c3c', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── Welcome ── */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: '800', marginBottom: '0.3rem' }}>
            Platform Overview 🛡️
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
            Read-only view of all users, NGOs, and tasks across Sarthi.
          </p>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div style={{ padding: '1rem 1.5rem', background: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.4)', borderRadius: '14px', color: '#fc8a8a', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* ── Stat Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ ...card, opacity: 0.4 }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>—</div>
                  <div style={{ fontSize: '1.9rem', fontWeight: '800' }}>…</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '0.3rem' }}>Loading</div>
                </div>
              ))
            : (data.stats || []).map((s: any, i: number) => (
                <div key={i} style={card}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                  <div style={{ fontSize: '1.9rem', fontWeight: '800', lineHeight: '1' }}>{s.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', margin: '0.3rem 0 0.4rem' }}>{s.label}</div>
                  <span style={{ color: s.badgeColor, fontSize: '0.75rem', fontWeight: '600' }}>{s.badge}</span>
                </div>
              ))
          }
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

          {/* ── Left: Users Table ── */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>👥 All Users</h2>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{data.users?.length || 0} total</span>
            </div>
            {/* Tab bar */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
              {userTabs.map(tab => (
                <button key={tab} onClick={() => setUserTab(tab)} style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem', transition: 'all 0.2s', background: userTab === tab ? 'linear-gradient(90deg,#f39c12,#e67e22)' : 'transparent', color: userTab === tab ? 'white' : 'rgba(255,255,255,0.5)' }}>{tab}</button>
              ))}
            </div>
            {/* User rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredUsers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                  <div style={{ fontWeight: '700' }}>No {userTab} users</div>
                </div>
              ) : filteredUsers.map((u: any) => {
                const initials = u.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
                const roleColor = u.role === 'Volunteer' ? '#1abc9c' : '#0ea5e9'
                const roleBg = u.role === 'Volunteer' ? 'rgba(26,188,156,0.15)' : 'rgba(14,165,233,0.15)'
                return (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: roleBg, border: `1px solid ${roleColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', color: roleColor, flexShrink: 0 }}>{initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '1px 8px', borderRadius: '999px', background: roleBg, color: roleColor, border: `1px solid ${roleColor}44` }}>{u.role}</span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Right: Tasks Table ── */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontWeight: '700', fontSize: '1.1rem' }}>📋 All Tasks</h2>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{data.tasks?.length || 0} total</span>
            </div>
            {/* Tab bar */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '3px', marginBottom: '1.25rem' }}>
              {taskTabs.map(tab => (
                <button key={tab} onClick={() => setTaskTab(tab)} style={{ flex: 1, padding: '0.45rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.82rem', transition: 'all 0.2s', background: taskTab === tab ? 'linear-gradient(90deg,#f39c12,#e67e22)' : 'transparent', color: taskTab === tab ? 'white' : 'rgba(255,255,255,0.5)' }}>{tab}</button>
              ))}
            </div>
            {/* Task rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                  <div style={{ fontWeight: '700' }}>No {taskTab} tasks</div>
                </div>
              ) : filteredTasks.map((t: any) => {
                const statusColor = t.status === 'Active' ? '#38bdf8' : t.status === 'Completed' ? '#1abc9c' : 'rgba(255,255,255,0.5)'
                const statusBg   = t.status === 'Active' ? 'rgba(14,165,233,0.15)' : t.status === 'Completed' ? 'rgba(26,188,156,0.15)' : 'rgba(255,255,255,0.07)'
                return (
                  <div key={t.id} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '0.85rem 1rem', border: `1px solid ${t.status === 'Active' ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem', gap: '0.5rem' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', flex: 1 }}>{t.title}</div>
                      <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                        {t.urgent && <span style={{ background: 'linear-gradient(90deg,#f39c12,#e74c3c)', color: 'white', fontSize: '0.6rem', fontWeight: '700', padding: '1px 6px', borderRadius: '999px' }}>URGENT</span>}
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '1px 8px', borderRadius: '999px', background: statusBg, color: statusColor, border: `1px solid ${statusColor}44` }}>{t.status}</span>
                      </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                      {t.category} · {t.location}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>
                      <span>🏢 {t.ngo_name}</span>
                      <span>👥 {t.filled}/{t.spots} · 📩 {t.applicants}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 999px; } ::-webkit-scrollbar-thumb { background: rgba(243,156,18,0.4); border-radius: 999px; }`}</style>
    </div>
  )
}

const card: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }

export default AdminDashboard
