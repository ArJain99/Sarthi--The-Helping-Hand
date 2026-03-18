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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ngo-signin" element={<NgoSignIn />} />
      <Route path="/ngo-signup" element={<NgoSignUp />} />
    </Routes>
  )
}

export default App