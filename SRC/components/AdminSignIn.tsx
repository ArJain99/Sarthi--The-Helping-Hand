import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const AdminSignIn = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const resp = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      })

      if (!resp.ok) {
        setError('Invalid email or password')
        return
      }

      const data = await resp.json()
      if (data.role !== 'Admin') {
        setError('This account does not have Admin privileges')
        return
      }

      localStorage.setItem('sarthi_jwt', data.access_token)
      localStorage.setItem('sarthi_admin_id', data.user_id.toString())
      localStorage.setItem('sarthi_admin_name', data.name)
      navigate('/admin-dashboard')
    } catch {
      setError('Failed to connect to backend server')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const lastY = { current: 0 }
    const handleScroll = () => {
      const y = window.scrollY
      setNavVisible(y <= 10 || y < lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a2e44 0%, #1e3a5f 45%, #22406e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 1.5rem 3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background blobs */}
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(243,156,18,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(243,156,18,0.05)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1a2e44', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem', transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.25s ease' }}>
        <img src={logoImg} alt="Sarthi" onClick={() => navigate('/')} style={{ height: '58px', width: 'auto', cursor: 'pointer' }} />
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[{ label: 'Home', href: '/' }, { label: 'Volunteer Login', href: '/signin' }, { label: 'NGO Login', href: '/ngo-signin' }].map(({ label, href }) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>{label}</a>
          ))}
        </div>
        <div style={{ width: '40px' }} />
      </nav>

      {/* Admin Badge */}
      <div style={{ background: 'rgba(243,156,18,0.15)', border: '1px solid rgba(243,156,18,0.4)', borderRadius: '999px', padding: '0.35rem 1.2rem', color: '#f39c12', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '1.75rem', textTransform: 'uppercase' }}>
        🛡️ Admin Portal
      </div>

      {/* Card */}
      <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.35rem', textAlign: 'center' }}>
          Admin Sign In
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Access the Sarthi platform control panel
        </p>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.4)', color: '#fc8a8a', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Admin Email</label>
            <input type="email" required name="email" placeholder="admin@sarthi.com" value={form.email} onChange={handleChange} style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(243,156,18,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
            <label style={labelStyle}>Password</label>
            <input type={showPass ? 'text' : 'password'} required name="password" placeholder="Enter admin password" value={form.password} onChange={handleChange} style={{ ...inputStyle, paddingRight: '3.5rem' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(243,156,18,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.75rem', top: '2.1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: '600' }}>
              {showPass ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          <div style={{ marginBottom: '1.75rem' }} />

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.85rem', borderRadius: '999px', backgroundColor: loading ? '#b8860b' : '#f39c12', color: 'white', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(243,156,18,0.35)', marginBottom: '1.5rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#e67e22'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#f39c12'; e.currentTarget.style.transform = 'translateY(0)' } }}>
            {loading ? 'Signing in…' : 'Sign In to Admin Panel →'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>restricted access</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit' }

export default AdminSignIn
