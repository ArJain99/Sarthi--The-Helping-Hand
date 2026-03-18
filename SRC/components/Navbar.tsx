import React, { useState } from 'react'

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#1abc9c',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {/* Circular logo placeholder with hand icon */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#e0f7f4"/>
              <circle cx="24" cy="24" r="20" fill="none" stroke="#1abc9c" strokeWidth="2"/>
              {/* Sunray lines */}
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
                <line
                  key={i}
                  x1={24 + 18 * Math.cos(angle * Math.PI / 180)}
                  y1={24 + 18 * Math.sin(angle * Math.PI / 180)}
                  x2={24 + 22 * Math.cos(angle * Math.PI / 180)}
                  y2={24 + 22 * Math.sin(angle * Math.PI / 180)}
                  stroke="#1abc9c"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
              {/* Hand icon */}
              <text x="24" y="29" textAnchor="middle" fontSize="16">🤝</text>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a2e44', letterSpacing: '1px' }}>SARTHI</span>
            <span style={{ fontSize: '0.6rem', color: '#1a2e44', letterSpacing: '2px', fontWeight: '500' }}>THE HELPING HAND</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Home', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Login
          </button>
          <button
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