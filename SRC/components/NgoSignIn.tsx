import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const NgoLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [navVisible, setNavVisible] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/ngo-dashboard')
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
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(26,188,156,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(26,188,156,0.06)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1a2e44', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem', transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.25s ease' }}>
        <img src={logoImg} alt="Sarthi" onClick={() => navigate('/')} style={{ height: '58px', width: 'auto', cursor: 'pointer' }} />
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[{ label: 'Home', href: '/' }, { label: 'About', href: '#about' }, { label: 'NGO Sign In', href: '/ngo-signin' }].map(({ label, href }) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>{label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigate('/signup')} style={{ padding: '0.5rem 1.5rem', borderRadius: '999px', border: 'none', background: '#f39c12', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Sign Up</button>
          <button onClick={() => navigate('/signin')} title="Your Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </nav>

      {/* NGO Badge */}
      <div style={{ background: 'rgba(26,188,156,0.15)', border: '1px solid rgba(26,188,156,0.4)', borderRadius: '999px', padding: '0.35rem 1.2rem', color: '#1abc9c', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '1.75rem', textTransform: 'uppercase' }}>
        NGO Portal
      </div>

      {/* Card */}
      <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.35rem', textAlign: 'center' }}>
          NGO Sign In
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign in to access your organisation's dashboard
        </p>

        <form onSubmit={handleLogin}>

        {/* Email */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Organisation Email</label>
          <input type="email" required name="email" placeholder="org@example.com" value={form.email} onChange={handleChange} style={inputStyle}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(26,188,156,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
          <label style={labelStyle}>Password</label>
          <input type={showPass ? 'text' : 'password'} required name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} style={{ ...inputStyle, paddingRight: '3.5rem' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(26,188,156,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          />
          <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.75rem', top: '2.1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: '600' }}>
            {showPass ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        <div style={{ textAlign: 'right', marginBottom: '1.75rem' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1abc9c')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >Forgot password?</a>
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.85rem', borderRadius: '999px', backgroundColor: '#1abc9c', color: 'white', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,188,156,0.35)', marginBottom: '1.5rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#16a085'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1abc9c'; e.currentTarget.style.transform = 'translateY(0)' }}>
          Sign In to NGO Portal →
        </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Register your NGO?{' '}
          <button onClick={() => navigate('/ngo-signup')} style={{ background: 'none', border: 'none', color: '#1abc9c', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>
            Register Here
          </button>
        </p>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
          Volunteer?{' '}
          <button onClick={() => navigate('/signin')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontWeight: '600', cursor: 'pointer', fontSize: '0.82rem', padding: 0 }}>
            Sign up here →
          </button>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit' }

export default NgoLogin
