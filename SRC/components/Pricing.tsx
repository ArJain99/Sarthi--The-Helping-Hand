import React from 'react'

const Pricing = () => {
  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Simple Pricing
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Basic Plan */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>Basic</h3>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              $29<span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>/month</span>
            </p>
            <ul style={{ marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ 5 Projects</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ 10GB Storage</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Basic Support</li>
            </ul>
            <button style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Get Started
            </button>
          </div>
          
          {/* Pro Plan */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '2px solid #2563eb'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>Pro</h3>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              $79<span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>/month</span>
            </p>
            <ul style={{ marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Unlimited Projects</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ 100GB Storage</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Priority Support</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Advanced Analytics</li>
            </ul>
            <button style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing