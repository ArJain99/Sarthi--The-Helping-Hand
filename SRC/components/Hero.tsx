import React from 'react'

const Hero = () => {
  return (
    <section id="home" style={{
      paddingTop: '120px', // to account for fixed navbar
      paddingBottom: '4rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Stats line */}
        <p style={{ color: '#1e3a8a', fontWeight: '600', marginBottom: '1rem' }}>
          Join 1,247+ Active Volunteers
        </p>

        {/* Main heading */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: '#111827',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          The Helping Hand
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '1.25rem',
          color: '#4b5563',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Connect with meaningful volunteer opportunities and make a real difference in your community.
          AI-powered matching between volunteers and NGOs across India.
        </p>

        {/* Stats numbers */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}>
          <Stat number="1247+" label="Active Volunteers" />
          <Stat number="89+" label="NGO Partners" />
          <Stat number="18567+" label="Impact Hours" />
        </div>

        {/* CTA Button */}
        <button style={{
          backgroundColor: '#1e3a8a',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '0.375rem',
          fontSize: '1.125rem',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '2rem'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1e3a8a'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Start Your Journey →
        </button>

        {/* Platform Features heading */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          marginTop: '2rem'
        }}>
          Platform Features
        </h2>
      </div>
    </section>
  )
}

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e3a8a' }}>{number}</div>
    <div style={{ fontSize: '1rem', color: '#6b7280' }}>{label}</div>
  </div>
)

export default Hero