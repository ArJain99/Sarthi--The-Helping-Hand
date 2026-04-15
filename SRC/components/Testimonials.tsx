import React, { useState } from 'react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Volunteer',
    content: "Sarthi connected me with amazing NGOs in my city. I've been volunteering for 6 months now and it's incredibly rewarding!",
    rating: 5,
    avatar: '🚌'
  },
  {
    name: 'Rahul Verma',
    role: 'NGO Coordinator',
    content: "Finding dedicated volunteers was always a challenge. Sarthi made it so much easier to connect with people who truly care.",
    rating: 5,
    avatar: '🤝'
  },
  {
    name: 'Ananya Patel',
    role: 'Community Leader',
    content: "The platform is user-friendly and the matching system is brilliant. It saves us so much time in recruitment!",
    rating: 5,
    avatar: '🍎'
  }
]

const Testimonials = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{
      padding: '5rem 1.5rem',
      background: 'linear-gradient(180deg, #f0fdf9 0%, #f8fffe 100%)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#fef3e2',
            border: '1px solid #fde0a8',
            borderRadius: '999px',
            padding: '0.35rem 1.1rem',
            marginBottom: '1.25rem',
            color: '#d97706',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            💬 Testimonials
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '800',
            color: '#1a2e44',
            marginBottom: '0.75rem',
            lineHeight: '1.2'
          }}>
            Loved by <span style={{ color: '#1abc9c' }}>Thousands</span>
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1.05rem',
            maxWidth: '450px',
            margin: '0 auto'
          }}>
            Hear from our community of volunteers and NGO partners
          </p>
        </div>

        {/* Testimonial Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {testimonials.map((t, index) => (
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
                transform: hovered === index ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'default'
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Stars */}
              <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '2px' }}>
                {'★'.repeat(t.rating)}
              </div>

              {/* Big Quote mark */}
              <div style={{
                color: '#1abc9c',
                fontSize: '3rem',
                lineHeight: '1',
                marginBottom: '0.25rem',
                fontFamily: 'Georgia, serif',
                opacity: 0.7
              }}>
                "
              </div>

              {/* Quote text */}
              <p style={{
                color: '#374151',
                fontStyle: 'italic',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                "{t.content}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e0faf4, #b2edd8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1a2e44', fontSize: '0.95rem' }}>{t.name}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials