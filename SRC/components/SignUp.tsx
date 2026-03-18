import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '../assets/logo.png'

type FormState = {
  fullName: string
  dob: string
  gender: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postal: string
  country: string
  interests: string[]
  availability: string[]
  experience: string
  skills: string
  conduct: boolean
  terms: boolean
}

const SignUp = () => {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      // Show navbar when scrolling up or at top; hide when scrolling down
      if (currentY <= 10 || currentY < lastScrollY.current) {
        setNavVisible(true)
      } else if (currentY > lastScrollY.current) {
        setNavVisible(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [form, setForm] = useState<FormState>({
    fullName: '', dob: '', gender: '', email: '', phone: '',
    street: '', city: '', state: '', postal: '', country: '',
    interests: [], availability: [], experience: '', skills: '',
    conduct: false, terms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(err => { const n = { ...err }; delete n[name]; return n })
  }

  const toggleCheck = (group: 'interests' | 'availability', value: string) => {
    setForm(f => {
      const arr = f[group]
      return { ...f, [group]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
    setErrors(err => { const n = { ...err }; delete n[group]; return n })
  }

  const handleCheckbox = (name: 'conduct' | 'terms') => {
    setForm(f => ({ ...f, [name]: !f[name] }))
    setErrors(err => { const n = { ...err }; delete n[name]; return n })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name'
    if (!form.dob) e.dob = 'Please select your date of birth'
    if (!form.gender) e.gender = 'Please select your gender'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number'
    if (!form.street.trim()) e.street = 'Please enter your street address'
    if (!form.city.trim()) e.city = 'Please enter your city'
    if (!form.state.trim()) e.state = 'Please enter your state/province'
    if (!form.postal.trim()) e.postal = 'Please enter your postal code'
    if (!form.country.trim()) e.country = 'Please enter your country'
    if (form.interests.length === 0) e.interests = 'Please select at least one area of interest'
    if (form.availability.length === 0) e.availability = 'Please select your availability'
    if (!form.experience) e.experience = 'Please select your experience level'
    if (!form.conduct) e.conduct = 'You must agree to the Code of Conduct'
    if (!form.terms) e.terms = 'You must accept the Terms and Conditions'
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

  const handleReset = () => {
    setForm({
      fullName: '', dob: '', gender: '', email: '', phone: '',
      street: '', city: '', state: '', postal: '', country: '',
      interests: [], availability: [], experience: '', skills: '',
      conduct: false, terms: false
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1abc9c 0%, #16a085 40%, #148f77 70%, #1a7a6e 100%)', padding: '80px 1rem 3rem', position: 'relative', overflow: 'hidden' }}>
      {/* Blobs */}
      <div style={{ position: 'fixed', top: '-100px', left: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-100px', width: '450px', height: '450px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

      {/* Fixed Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1abc9c', boxShadow: '0 2px 10px rgba(0,0,0,0.15)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem', transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.25s ease' }}>
        <img src={logoImg} alt="Sarthi" onClick={() => navigate('/')} style={{ height: '58px', width: 'auto', cursor: 'pointer' }} />
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Home', 'About', 'Contact'].map(l => (
            <a key={l} href={l === 'Home' ? '/' : `#${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500', fontSize: '1rem' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigate('/signup')} style={{ padding: '0.5rem 1.5rem', borderRadius: '999px', border: 'none', background: '#f39c12', color: 'white', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 8px rgba(243,156,18,0.4)' }}>Sign Up</button>
          {/* Profile Avatar */}
          <button
            onClick={() => navigate('/signin')}
            title="Your Profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', padding: 0, overflow: 'hidden' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '0.5rem' }}>
            🫱🏻‍🫲🏽 Sarthi Portal Registration
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>Join us in making a difference in people's lives</p>
        </div>

        {/* Success Banner */}
        {submitted && (
          <div style={{ background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white', padding: '1.25rem', borderRadius: '14px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', animation: 'slideDown 0.4s ease' }}>
            ✓ Registration Successful! Thank you for volunteering with Sarthi. We will contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
          {/* ── 1. Personal Information ── */}
          <Section title="Personal Information">
            <Field label="Full Name" required error={errors.fullName}>
              <input name="fullName" value={form.fullName} onChange={handleInput} placeholder="Your full name" style={inputStyle(!!errors.fullName)} />
            </Field>
            <div style={rowStyle}>
              <Field label="Date of Birth" required error={errors.dob}>
                <input type="date" name="dob" value={form.dob} onChange={handleInput} style={inputStyle(!!errors.dob)} />
              </Field>
              <Field label="Gender" required error={errors.gender}>
                <select name="gender" value={form.gender} onChange={handleInput} style={inputStyle(!!errors.gender)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>
            </div>
            <div style={rowStyle}>
              <Field label="Email" required error={errors.email}>
                <input type="email" name="email" value={form.email} onChange={handleInput} placeholder="you@example.com" style={inputStyle(!!errors.email)} />
              </Field>
              <Field label="Phone Number" required error={errors.phone}>
                <input type="tel" name="phone" value={form.phone} onChange={handleInput} placeholder="+91 XXXXX XXXXX" style={inputStyle(!!errors.phone)} />
              </Field>
            </div>
          </Section>

          {/* ── 2. Address ── */}
          <Section title="Address">
            <Field label="Street Address" required error={errors.street}>
              <input name="street" value={form.street} onChange={handleInput} placeholder="House no., Street, Area" style={inputStyle(!!errors.street)} />
            </Field>
            <div style={rowStyle}>
              <Field label="City" required error={errors.city}>
                <input name="city" value={form.city} onChange={handleInput} placeholder="City" style={inputStyle(!!errors.city)} />
              </Field>
              <Field label="State / Province" required error={errors.state}>
                <input name="state" value={form.state} onChange={handleInput} placeholder="State" style={inputStyle(!!errors.state)} />
              </Field>
            </div>
            <div style={rowStyle}>
              <Field label="Postal Code" required error={errors.postal}>
                <input name="postal" value={form.postal} onChange={handleInput} placeholder="Postal Code" style={inputStyle(!!errors.postal)} />
              </Field>
              <Field label="Country" required error={errors.country}>
                <input name="country" value={form.country} onChange={handleInput} placeholder="Country" style={inputStyle(!!errors.country)} />
              </Field>
            </div>
          </Section>

          {/* ── 3. Volunteer Information ── */}
          <Section title="Volunteer Information">
            <Field label="Areas of Interest" required error={errors.interests}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.25rem' }}>
                {[['medical', 'Medical Support'], ['community', 'Community Support'], ['disaster', 'Disaster Relief'], ['training', 'Training'], ['administrative', 'Administrative']].map(([val, lbl]) => (
                  <CheckItem key={val} id={`int-${val}`} checked={form.interests.includes(val)} onChange={() => toggleCheck('interests', val)} label={lbl} />
                ))}
              </div>
            </Field>

            <Field label="Availability" required error={errors.availability}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.25rem' }}>
                {[['weekdays', 'Weekdays'], ['weekends', 'Weekends'], ['fulltime', 'Full-time']].map(([val, lbl]) => (
                  <CheckItem key={val} id={`av-${val}`} checked={form.availability.includes(val)} onChange={() => toggleCheck('availability', val)} label={lbl} />
                ))}
              </div>
            </Field>

            <Field label="Experience Level" required error={errors.experience}>
              <select name="experience" value={form.experience} onChange={handleInput} style={inputStyle(!!errors.experience)}>
                <option value="">Select Experience</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </Field>

            <Field label="Skills & Qualifications">
              <textarea name="skills" value={form.skills} onChange={handleInput} placeholder="Tell us about your relevant skills, qualifications, and experience..." rows={4} style={{ ...inputStyle(false), resize: 'vertical' }} />
            </Field>
          </Section>

          {/* ── 4. Consent & Agreement ── */}
          <Section title="Consent & Agreement">
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <CheckItem id="conduct" checked={form.conduct} onChange={() => handleCheckbox('conduct')} label="I agree to the Sarthi Code of Conduct *" />
                {errors.conduct && <p style={errorStyle}>{errors.conduct}</p>}
              </div>
              <div>
                <CheckItem id="terms" checked={form.terms} onChange={() => handleCheckbox('terms')} label="I have read and accept the Terms and Conditions *" />
                {errors.terms && <p style={errorStyle}>{errors.terms}</p>}
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <button type="submit" style={{ padding: '0.9rem 2.5rem', borderRadius: '999px', background: '#f39c12', color: 'white', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(243,156,18,0.4)', transition: 'all 0.2s', letterSpacing: '0.3px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e67e22'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f39c12'; e.currentTarget.style.transform = 'translateY(0)' }}>
              Submit Registration
            </button>
            <button type="reset" style={{ padding: '0.9rem 2.5rem', borderRadius: '999px', background: 'transparent', color: 'white', fontWeight: '700', fontSize: '1rem', border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.3px' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              Reset Form
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/signin')} style={{ background: 'none', border: 'none', color: '#f39c12', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
              Sign In
            </button>
          </p>
        </form>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; }
        select option { background: #148f77; color: white; }
      `}</style>
    </div>
  )
}

/* ── Sub-components ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
    <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid rgba(243,156,18,0.5)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{ width: '5px', height: '20px', background: '#f39c12', borderRadius: '3px', display: 'inline-block', flexShrink: 0 }} />
      {title}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {children}
    </div>
  </div>
)

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div>
    <label style={{ display: 'block', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.4rem' }}>
      {label}{required && <span style={{ color: '#f39c12', marginLeft: '3px' }}>*</span>}
    </label>
    {children}
    {error && <p style={errorStyle}>{error}</p>}
  </div>
)

const CheckItem = ({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: () => void; label: string }) => (
  <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} style={{ width: '18px', height: '18px', accentColor: '#f39c12', cursor: 'pointer', flexShrink: 0 }} />
    {label}
  </label>
)

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: `1.5px solid ${hasError ? '#e74c3c' : 'rgba(255,255,255,0.25)'}`,
  background: 'rgba(255,255,255,0.12)',
  color: 'white',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'inherit',
})

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
}

const errorStyle: React.CSSProperties = {
  color: '#fca5a5',
  fontSize: '0.8rem',
  marginTop: '0.3rem'
}

export default SignUp
