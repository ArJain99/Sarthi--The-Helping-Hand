import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0f1f2e',
      color: 'white',
      padding: '3.5rem 1.5rem 2rem'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top banner */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          padding: '1rem',
          background: 'linear-gradient(90deg, #1abc9c22 0%, #1abc9c44 50%, #1abc9c22 100%)',
          border: '1px solid #1abc9c44',
          borderRadius: '12px'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '500', fontSize: '0.95rem' }}>
            No credit card required &bull; Free forever &bull; Join in 2 minutes
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1abc9c' }}>SARTHI</span>
              <span style={{ fontSize: '0.6rem', color: '#9ca3af', letterSpacing: '2px', fontWeight: '500' }}>THE HELPING HAND</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: '1.7' }}>
              Connecting volunteers with meaningful opportunities across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'About Us', 'Find Opportunities', 'For NGOs'].map((link) => (
                <li key={link} style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={footerLinkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1abc9c')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['hello@sarthi.in', '+91 9818 ***34', 'NOIDA, India'].map((info) => (
                <li key={info} style={{ marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>{info}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1f3347',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#6b7280',
          fontSize: '0.875rem',
          gap: '1rem'
        }}>
          <p>© 2026 Sarthi - The Helping Hand. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" style={footerLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1abc9c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

const footerLinkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
  fontSize: '0.875rem'
}

export default Footer