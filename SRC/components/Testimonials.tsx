import React from 'react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Volunteer',
    content: 'Sarthi connected me with amazing NGOs in my city. I\'ve been volunteering for 6 months now and it\'s incredibly rewarding!',
    rating: 5
  },
  {
    name: 'Rahul Verma',
    role: 'NGO Coordinator',
    content: 'Finding dedicated volunteers was always a challenge. Sarthi made it so much easier to connect with people who truly care.',
    rating: 5
  },
  {
    name: 'Ananya Patel',
    role: 'Community Leader',
    content: 'The platform is user-friendly and the matching system is brilliant. It saves us so much time in recruitment!',
    rating: 5
  }
]

const Testimonials = () => {
  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          Testimonials
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: '#4b5563',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Loved by Thousands
        </p>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Hear from our community of volunteers and NGO partners
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map((t, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ color: '#fbbf24', fontSize: '1.25rem', marginBottom: '1rem' }}>
                {'★'.repeat(t.rating)}
              </div>
              <p style={{ color: '#374151', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.content}"
              </p>
              <div>
                <p style={{ fontWeight: '700', color: '#111827' }}>{t.name}</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials