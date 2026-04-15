import React, { useState } from 'react'

// Icon components using inline SVG with colored rounded square backgrounds
const iconData = [
  {
    title: 'Find Opportunities',
    description: 'Discover volunteer tasks that match your skills and interests with AI-powered recommendations.',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    )
  },
  {
    title: 'Make Impact',
    description: 'Track your contribution and see the real-world impact you create in your community.',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    title: 'Connect with NGOs',
    description: 'Build relationships with trusted organizations across India working for social change.',
    bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    title: 'Nationwide Network',
    description: 'Access opportunities from metros to rural areas, making impact wherever you are.',
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  {
    title: 'Earn Recognition',
    description: 'Get certified for your volunteer work and showcase your social contribution.',
    bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    )
  },
  {
    title: 'Track Progress',
    description: 'Monitor your volunteer journey with detailed analytics and milestone achievements.',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    )
  }
]

const Features = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="about" style={{
      padding: '5rem 1.5rem',
      backgroundColor: '#f8fffe',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#e0faf4',
            border: '1px solid #b2edd8',
            borderRadius: '999px',
            padding: '0.35rem 1.1rem',
            marginBottom: '1.25rem',
            color: '#16a085',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            ✨ Platform Features
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '800',
            color: '#1a2e44',
            marginBottom: '0.75rem',
            lineHeight: '1.2'
          }}>
            Why Choose <span style={{ color: '#1abc9c' }}>Sarthi?</span>
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1.05rem',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Everything you need to start your volunteering journey and make a lasting impact
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {iconData.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: hovered === index
                  ? '0 16px 40px rgba(0,0,0,0.12)'
                  : '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.25s ease',
                transform: hovered === index ? 'translateY(-6px)' : 'translateY(0)',
                cursor: 'default',
                border: '1px solid rgba(0,0,0,0.04)'
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: feature.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: '700',
                color: '#1a2e44',
                marginBottom: '0.6rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.65',
                fontSize: '0.95rem',
                textAlign: 'center'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features