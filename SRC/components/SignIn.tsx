import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

      {/* Logo — clickable, goes to home */}
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
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.35rem', textAlign: 'center' }}>
          Welcome Back
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign in to continue your impact journey
        </p>

        {/* Email */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }}>
            Email Address
          </label>
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
        <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }}>
            Password
          </label>
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
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

        {/* Forgot */}
        <div style={{ textAlign: 'right', marginBottom: '1.75rem' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          >Forgot password?</a>
        </div>

        {/* Submit */}
        <button
          onClick={() => navigate('/dashboard')}
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
          Sign In →
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Sign up redirect */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            style={{ background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
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

export default Login
