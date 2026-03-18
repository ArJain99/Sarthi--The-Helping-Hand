import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY <= 10 || currentY < lastScrollY.current) {
        setNavVisible(true)
      } else if (currentY > lastScrollY.current) {
        setNavVisible(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#1abc9c',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.25s ease'
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
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'NGO Sign In', href: '/ngo-signin' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                textDecoration: 'none',
                color: hoveredLink === label ? 'white' : 'rgba(255,255,255,0.9)',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e67e22'; e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f39c12'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Sign Up
          </button>
          {/* Profile Avatar */}
          <button
            onClick={() => navigate('/signin')}
            title="Your Profile"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.7)',
              backgroundColor: 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              padding: 0,
              overflow: 'hidden',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)'
              e.currentTarget.style.borderColor = 'white'
              e.currentTarget.style.transform = 'scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {/* Default user silhouette */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar