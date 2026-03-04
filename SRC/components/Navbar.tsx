import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>SARTHI</span>
          <span style={{ fontSize: '0.75rem', color: '#4b5563', letterSpacing: '1px' }}>THE HELPING HAND</span>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#home" style={linkStyle}>Home</a>
            <a href="#about" style={linkStyle}>About</a>
            <a href="#contact" style={linkStyle}>Contact</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#1e3a8a', border: '1px solid #1e3a8a' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e7ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Login
            </button>
            <button style={{ ...buttonStyle, backgroundColor: '#1e3a8a', color: 'white' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e3a8a')}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile menu button (simplified) */}
        <button style={{ display: 'none' }} onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
      </div>
    </nav>
  )
}

const linkStyle = {
  textDecoration: 'none',
  color: '#374151',
  fontWeight: '500',
  padding: '0.5rem 0',
  borderBottom: '2px solid transparent',
  transition: 'border-color 0.2s',
  cursor: 'pointer'
}

const buttonStyle = {
  padding: '0.5rem 1.5rem',
  borderRadius: '0.375rem',
  fontWeight: '600',
  fontSize: '0.875rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s'
}

export default Navbar