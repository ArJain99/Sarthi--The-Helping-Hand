import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [status, setStatus] = useState<{type: 'error'|'success', msg: string} | null>(null)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    try {
      const resp = await fetch('http://localhost:8000/api/reset-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: newPassword })
      })
      const data = await resp.json()
      if (!resp.ok) {
        setStatus({ type: 'error', msg: data.detail || 'Email not found' })
      } else {
        setStatus({ type: 'success', msg: 'Password updated successfully! Redirecting...' })
        setTimeout(() => navigate('/signin'), 2000)
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error or backend not running' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(160deg, #1a2e44 0%, #1e3a5f 45%, #1abc9c 100%)', zIndex: -1 }} />

      <nav style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <img src={logoImg} alt="Sarthi" style={{ height: '60px', cursor: 'pointer' }} onClick={() => navigate('/')} />
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', padding: '2.5rem', borderRadius: '24px', width: '100%', maxWidth: '420px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', color: 'white' }}>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>Reset Password</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Enter your email and a new password.
          </p>

          {status && (
            <div style={{ padding: '0.75rem', backgroundColor: status.type === 'error' ? 'rgba(231,76,60,0.2)' : 'rgba(46, 204, 113, 0.2)', border: `1px solid ${status.type === 'error' ? '#e74c3c' : '#2ecc71'}`, borderRadius: '8px', color: status.type === 'error' ? '#e74c3c' : '#2ecc71', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your registered email" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', outline: 'none' }}/>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="Enter new password" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', outline: 'none' }}/>
            </div>

            <button type="submit" style={{ marginTop: '0.5rem', padding: '0.9rem', borderRadius: '999px', background: 'linear-gradient(90deg, #f39c12, #e91e8c)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
              Reset Password
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Remember your password? </span>
            <button onClick={() => navigate('/signin')} style={{ background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>Sign in instead</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
