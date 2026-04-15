import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, Save, User as UserIcon } from 'lucide-react'

const ProfilePage = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('sarthi_vol_id') || localStorage.getItem('sarthi_ngo_id')
  const userRole = localStorage.getItem('sarthi_vol_id') ? 'Volunteer' : localStorage.getItem('sarthi_ngo_id') ? 'NGO' : null

  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')

  useEffect(() => {
    if (!userId) {
      navigate('/signin')
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/profile/${userId}`)
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
          setName(data.name || '')
          setBio(data.bio || '')
          setSkills(data.skills_or_needs || '')
        }
      } catch (err) {
        console.error('Error fetching profile', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [userId, navigate])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch(`http://localhost:8000/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sarthi_jwt')}`
        },
        body: JSON.stringify({ name, bio, skills_or_needs: skills })
      })
      alert('Profile updated successfully!')
      if (userRole === 'Volunteer') localStorage.setItem('sarthi_vol_name', name)
    } catch (err) {
      alert('Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profile...</div>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fffe', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ padding: '1rem 2rem', backgroundColor: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#666' }}>
          <ArrowLeft size={20} /> <span style={{ marginLeft: '0.5rem' }}>Back to Dashboard</span>
        </button>
      </nav>

      <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e0faf4', color: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={32} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#1a2e44' }}>Edit Profile</h1>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{profile?.email} • {profile?.role}</p>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Name / Organization Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} 
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>Bio / Description</label>
              <textarea 
                value={bio} 
                onChange={e => setBio(e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', resize: 'vertical' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                {userRole === 'Volunteer' ? 'Skills & Interests' : 'Focus Areas / Needs'}
              </label>
              <input 
                type="text" 
                value={skills} 
                onChange={e => setSkills(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', borderRadius: '8px', backgroundColor: '#1abc9c', color: 'white', border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
