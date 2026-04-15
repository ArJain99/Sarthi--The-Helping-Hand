import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NgoSignIn from './components/NgoSignIn'
import NgoSignUp from './components/NgoSignUp'
import VolunteerDashboard from './components/VolunteerDashboard'
import NgoDashboard from './components/NgoDashboard'
import AdminSignIn from './components/AdminSignIn'
import AdminDashboard from './components/AdminDashboard'

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

import ForgotPassword from './components/ForgotPassword'
import ProfilePage from './components/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ngo-signin" element={<NgoSignIn />} />
      <Route path="/ngo-signup" element={<NgoSignUp />} />
      <Route path="/dashboard" element={<VolunteerDashboard />} />
      <Route path="/ngo-dashboard" element={<NgoDashboard />} />
      <Route path="/admin-signin" element={<AdminSignIn />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App