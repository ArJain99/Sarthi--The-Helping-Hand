import React from 'react'

const Hero = () => {
  return (
    <section id="home" style={{
      paddingTop: '74px',
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1abc9c 0%, #16a085 40%, #148f77 70%, #1a7a6e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 1.5rem 4rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background circles */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none'
      }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '999px',
        padding: '0.4rem 1.2rem',
        marginBottom: '2rem',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        <span style={{ color: '#f39c12', fontSize: '0.7rem' }}>●</span>
        Join 1,247+ Active Volunteers
      </div>

      {/* Main Heading */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: '800',
        color: 'white',
        marginBottom: '1.5rem',
        lineHeight: '1.15',
        maxWidth: '700px'
      }}>
        The <span style={{ color: '#f39c12' }}>Helping Hand</span>
      </h1>

      {/* Description */}
      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.85)',
        maxWidth: '620px',
        margin: '0 auto 3rem',
        lineHeight: '1.7'
      }}>
        Connect with meaningful volunteer opportunities and make a real difference in your
        community. AI-powered matching between volunteers and NGOs across India.
      </p>

      {/* Stats Card */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '20px',
        padding: '2rem 3rem',
        display: 'flex',
        gap: '0',
        marginBottom: '2.5rem',
        width: '100%',
        maxWidth: '700px'
      }}>
        {[
          { number: '1247+', label: 'Active Volunteers' },
          { number: '89+', label: 'NGO Partners' },
          { number: '18567+', label: 'Impact Hours' }
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            padding: '0 1rem'
          }}>
            <div style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              color: '#f39c12',
              lineHeight: '1.1',
              marginBottom: '0.35rem'
            }}>{stat.number}</div>
            <div style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button style={{
        backgroundColor: '#f39c12',
        color: 'white',
        padding: '0.9rem 2.5rem',
        borderRadius: '999px',
        fontSize: '1.05rem',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.25s',
        boxShadow: '0 4px 20px rgba(243,156,18,0.45)',
        letterSpacing: '0.3px'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e67e22'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(243,156,18,0.55)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f39c12'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(243,156,18,0.45)'
        }}
      >
        Start Your Journey →
      </button>
    </section>
  )
}

export default Hero