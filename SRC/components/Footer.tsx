import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: 'white',
      padding: '3rem 1rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top section with free message */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#1e3a8a',
          borderRadius: '0.375rem'
        }}>
          <p style={{ color: 'white', fontWeight: '500' }}>
            No credit card required • Free forever • Join in 2 minutes
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Logo and tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>SARTHI</span>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', letterSpacing: '1px' }}>THE HELPING HAND</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="#home" style={footerLinkStyle}>Home</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#about" style={footerLinkStyle}>About Us</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#opportunities" style={footerLinkStyle}>Find Opportunities</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#ngos" style={footerLinkStyle}>For NGOs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>hello@sarthi.in</li>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>+91 9818 ***34</li>
              <li style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>NOIDA, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          <p>© 2026 Sarthi - The Helping Hand. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" style={footerLinkStyle}>Privacy Policy</a>
            <a href="#terms" style={footerLinkStyle}>Terms of Service</a>
            <a href="#cookies" style={footerLinkStyle}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const footerLinkStyle = {
  color: '#9ca3af',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer'
}

export default Footer