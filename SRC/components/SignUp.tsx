import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const SignUp = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'volunteer' })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1abc9c 0%, #16a085 40%, #148f77 70%, #1a7a6e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

      {/* Logo */}
      <img
        src={logoImg}
        alt="Sarthi"
        onClick={() => navigate('/')}
        style={{ height: '60px', width: 'auto', objectFit: 'contain', marginBottom: '2rem', cursor: 'pointer' }}
      />

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.35rem', textAlign: 'center' }}>
          Join Sarthi
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Start making a difference in your community today
        </p>

        {/* Stats badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          marginBottom: '1.75rem'
        }}>
          {[['1247+', 'Volunteers'], ['89+', 'NGOs'], ['18567+', 'Hours']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ color: '#f39c12', fontWeight: '800', fontSize: '1rem' }}>{num}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Full Name */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1.1rem', position: 'relative' }}>
          <label style={labelStyle}>Password</label>
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            style={{ ...inputStyle, paddingRight: '3rem' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: '0.75rem', top: '2.1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: '600' }}
          >
            {showPass ? 'HIDE' : 'SHOW'}
          </button>
        </div>

        {/* Role */}
        <div style={{ marginBottom: '1.75rem' }}>
          <label style={labelStyle}>I am a...</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[['volunteer', '🙋 Volunteer'], ['ngo', '🏢 NGO / Organisation']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setForm({ ...form, role: val })}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: form.role === val ? '2px solid #f39c12' : '1px solid rgba(255,255,255,0.25)',
                  background: form.role === val ? 'rgba(243,156,18,0.2)' : 'rgba(255,255,255,0.08)',
                  color: form.role === val ? '#f39c12' : 'rgba(255,255,255,0.7)',
                  fontWeight: '600',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '999px',
            backgroundColor: '#f39c12',
            color: 'white',
            fontWeight: '700',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(243,156,18,0.45)',
            marginBottom: '1.5rem'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e67e22'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f39c12'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Create Account →
        </button>

        {/* Terms */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '1rem' }}>
          By signing up you agree to our{' '}
          <a href="#" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline' }}>Terms</a> and{' '}
          <a href="#" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline' }}>Privacy Policy</a>
        </p>

        {/* Login redirect */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'rgba(255,255,255,0.85)',
  fontSize: '0.875rem',
  fontWeight: '600',
  marginBottom: '0.4rem'
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'rgba(255,255,255,0.12)',
  color: 'white',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'all 0.2s',
}

export default SignUp
