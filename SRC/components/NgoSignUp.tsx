import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

const NgoSignUp = () => {
  const navigate = useNavigate()
  const [navVisible, setNavVisible] = useState(true)
  const [form, setForm] = useState({
    orgName: '', regNumber: '', orgType: '', website: '',
    contactName: '', email: '', phone: '', password: '',
    address: '', city: '', state: '', country: '',
    mission: '',
    terms: false, conduct: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  React.useEffect(() => {
    const lastY = { current: 0 }
    const handleScroll = () => {
      const y = window.scrollY
      setNavVisible(y <= 10 || y < lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(err => { const n = { ...err }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.orgName.trim()) e.orgName = 'Organisation name is required'
    if (!form.regNumber.trim()) e.regNumber = 'Registration number is required'
    if (!form.orgType) e.orgType = 'Please select organisation type'
    if (!form.contactName.trim()) e.contactName = 'Contact person name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!form.country.trim()) e.country = 'Country is required'
    if (!form.mission.trim()) e.mission = 'Please describe your mission'
    if (!form.terms) e.terms = 'You must accept the Terms and Conditions'
    if (!form.conduct) e.conduct = 'You must agree to the Code of Conduct'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1a2e44 0%, #1e3a5f 45%, #22406e 100%)', padding: '88px 1rem 3rem', position: 'relative', overflow: 'hidden' }}>
      {/* blobs */}
      <div style={{ position: 'fixed', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(26,188,156,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(26,188,156,0.05)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1a2e44', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem', transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.25s ease' }}>
        <img src={logoImg} alt="Sarthi" onClick={() => navigate('/')} style={{ height: '58px', width: 'auto', cursor: 'pointer' }} />
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[{ label: 'Home', href: '/' }, { label: 'About', href: '#about' }, { label: 'NGO Sign In', href: '/ngo-signin' }].map(({ label, href }) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>{label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigate('/signup')} style={{ padding: '0.5rem 1.5rem', borderRadius: '999px', border: 'none', background: '#f39c12', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Sign Up</button>
          <button onClick={() => navigate('/signin')} title="Your Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(26,188,156,0.15)', border: '1px solid rgba(26,188,156,0.4)', borderRadius: '999px', padding: '0.35rem 1.2rem', color: '#1abc9c', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', display: 'inline-block', marginBottom: '1rem', textTransform: 'uppercase' }}>
            NGO Portal
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.4rem)', fontWeight: '800', marginBottom: '0.5rem' }}>
            🏢 Register Your Organisation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
            Partner with Sarthi to connect with volunteers across India
          </p>
        </div>

        {/* Success */}
        {submitted && (
          <div style={{ background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white', padding: '1.25rem', borderRadius: '14px', textAlign: 'center', fontSize: '1.05rem', fontWeight: '600', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            ✓ Registration Submitted! Our team will verify and contact you within 2 business days.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Organisation Details */}
          <Section title="Organisation Details">
            <Field label="Organisation Name" required error={errors.orgName}>
              <input name="orgName" value={form.orgName} onChange={handleInput} placeholder="Full legal name of your NGO" style={iStyle(!!errors.orgName)} />
            </Field>
            <div style={row}>
              <Field label="Registration Number" required error={errors.regNumber}>
                <input name="regNumber" value={form.regNumber} onChange={handleInput} placeholder="Govt. registration / 80G number" style={iStyle(!!errors.regNumber)} />
              </Field>
              <Field label="Organisation Type" required error={errors.orgType}>
                <select name="orgType" value={form.orgType} onChange={handleInput} style={iStyle(!!errors.orgType)}>
                  <option value="">Select Type</option>
                  <option value="trust">Trust</option>
                  <option value="society">Society</option>
                  <option value="section8">Section 8 Company</option>
                  <option value="foundation">Foundation</option>
                  <option value="other">Other</option>
                </select>
              </Field>
            </div>
            <Field label="Website (optional)">
              <input name="website" value={form.website} onChange={handleInput} placeholder="https://yourorg.org" style={iStyle(false)} />
            </Field>
          </Section>

          {/* Contact Person */}
          <Section title="Primary Contact">
            <Field label="Contact Person Name" required error={errors.contactName}>
              <input name="contactName" value={form.contactName} onChange={handleInput} placeholder="Name of authorised representative" style={iStyle(!!errors.contactName)} />
            </Field>
            <div style={row}>
              <Field label="Email" required error={errors.email}>
                <input type="email" name="email" value={form.email} onChange={handleInput} placeholder="contact@org.com" style={iStyle(!!errors.email)} />
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <input type="tel" name="phone" value={form.phone} onChange={handleInput} placeholder="+91 XXXXX XXXXX" style={iStyle(!!errors.phone)} />
              </Field>
            </div>
            <Field label="Password" required error={errors.password}>
              <input type="password" name="password" value={form.password} onChange={handleInput} placeholder="Create a secure password (min. 6 chars)" style={iStyle(!!errors.password)} />
            </Field>
          </Section>

          {/* Address */}
          <Section title="Organisation Address">
            <Field label="Street Address" required error={errors.address}>
              <input name="address" value={form.address} onChange={handleInput} placeholder="Building, Street, Area" style={iStyle(!!errors.address)} />
            </Field>
            <div style={row}>
              <Field label="City" required error={errors.city}>
                <input name="city" value={form.city} onChange={handleInput} placeholder="City" style={iStyle(!!errors.city)} />
              </Field>
              <Field label="State" required error={errors.state}>
                <input name="state" value={form.state} onChange={handleInput} placeholder="State" style={iStyle(!!errors.state)} />
              </Field>
            </div>
            <Field label="Country" required error={errors.country}>
              <input name="country" value={form.country} onChange={handleInput} placeholder="Country" style={iStyle(!!errors.country)} />
            </Field>
          </Section>

          {/* Mission */}
          <Section title="Mission & Activities">
            <Field label="Organisation Mission" required error={errors.mission}>
              <textarea name="mission" value={form.mission} onChange={handleInput} rows={4} placeholder="Describe your organisation's mission, goals, and the kind of volunteers you are looking for..." style={{ ...iStyle(!!errors.mission), resize: 'vertical' }} />
            </Field>
          </Section>

          {/* Consent */}
          <Section title="Consent & Agreement">
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  <input type="checkbox" checked={form.conduct} onChange={() => { setForm(f => ({ ...f, conduct: !f.conduct })); setErrors(e => { const n = {...e}; delete n.conduct; return n }) }} style={{ width: '18px', height: '18px', accentColor: '#1abc9c', cursor: 'pointer' }} />
                  I agree to the Sarthi NGO Partner Code of Conduct *
                </label>
                {errors.conduct && <p style={errStyle}>{errors.conduct}</p>}
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  <input type="checkbox" checked={form.terms} onChange={() => { setForm(f => ({ ...f, terms: !f.terms })); setErrors(e => { const n = {...e}; delete n.terms; return n }) }} style={{ width: '18px', height: '18px', accentColor: '#1abc9c', cursor: 'pointer' }} />
                  I have read and accept the Terms and Conditions *
                </label>
                {errors.terms && <p style={errStyle}>{errors.terms}</p>}
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button type="submit" style={{ padding: '0.9rem 2.5rem', borderRadius: '999px', background: '#1abc9c', color: 'white', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,188,156,0.35)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#16a085'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1abc9c'; e.currentTarget.style.transform = 'translateY(0)' }}>
              Submit Registration
            </button>
            <button type="reset" style={{ padding: '0.9rem 2.5rem', borderRadius: '999px', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: '1rem', border: '2px solid rgba(255,255,255,0.25)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Reset Form
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Already registered?{' '}
            <button type="button" onClick={() => navigate('/ngo-signin')} style={{ background: 'none', border: 'none', color: '#1abc9c', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
              Sign In
            </button>
          </p>
        </form>
      </div>

      <style>{`
        select option { background: #1e3a5f; color: white; }
      `}</style>
    </div>
  )
}

/* Sub-components */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
    <h2 style={{ color: 'white', fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid rgba(26,188,156,0.35)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{ width: '5px', height: '20px', background: '#1abc9c', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }} />
      {title}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{children}</div>
  </div>
)

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div>
    <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }}>
      {label}{required && <span style={{ color: '#1abc9c', marginLeft: '3px' }}>*</span>}
    </label>
    {children}
    {error && <p style={errStyle}>{error}</p>}
  </div>
)

const iStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
  border: `1.5px solid ${hasError ? '#e74c3c' : 'rgba(255,255,255,0.12)'}`,
  background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: '0.95rem',
  outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit'
})

const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }
const errStyle: React.CSSProperties = { color: '#fc8a8a', fontSize: '0.8rem', marginTop: '0.3rem' }

export default NgoSignUp
