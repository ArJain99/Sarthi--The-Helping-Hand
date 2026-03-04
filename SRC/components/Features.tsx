import React from 'react'

const features = [
  {
    title: 'Find Opportunities',
    description: 'Discover volunteer tasks that match your skills and interests with AI-powered recommendations.'
  },
  {
    title: 'Make Impact',
    description: 'Track your contribution and see the real-world impact you create in your community.'
  },
  {
    title: 'Connect with NGOs',
    description: 'Build relationships with trusted organizations across India working for social change.'
  },
  {
    title: 'Nationwide Network',
    description: 'Access opportunities from metros to rural areas, making impact wherever you are.'
  },
  {
    title: 'Earn Recognition',
    description: 'Get certified for your volunteer work and showcase your social contribution.'
  },
  {
    title: 'Track Progress',
    description: 'Monitor your volunteer journey with detailed analytics and milestone achievements.'
  }
]

const Features = () => {
  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundColor: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#f9fafb',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features