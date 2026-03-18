import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#1abc9c',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
    }}>
      <div style={{
        width: '100%',
        padding: '0.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo — flush to left edge */}
        <img
          src={logoImg}
          alt="Sarthi - The Helping Hand"
          onClick={() => navigate('/')}
          style={{
            height: '58px',
            width: 'auto',
            objectFit: 'contain',
            cursor: 'pointer',
            flexShrink: 0
          }}
        />

        {/* Center Nav Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Home', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href={link === 'Home' ? '/' : `#${link.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: hoveredLink === link ? 'white' : 'rgba(255,255,255,0.9)',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              fontWeight: '600',
              fontSize: '0.9rem',
              border: '1.5px solid rgba(255,255,255,0.7)',
              backgroundColor: 'transparent',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              fontWeight: '600',
              fontSize: '0.9rem',
              border: 'none',
              backgroundColor: '#f39c12',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(243,156,18,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e67e22'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f39c12'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar