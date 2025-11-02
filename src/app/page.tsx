'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import Program from '@/components/Program'
import Testimonials from '@/components/Testimonials'
import Calendar from '@/components/Calendar'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import MobileMenu from '@/components/MobileMenu'

export default function Home() {
  const [selectedTerm, setSelectedTerm] = useState('');

  return (
    <main className="min-h-screen relative">
      <ThemeToggle />
      <MobileMenu />
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-brand-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-brand-gold/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-brand-amethyst/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <Benefits />
        <Program />
        <Testimonials />
        <Calendar setSelectedTerm={setSelectedTerm} />
        <ContactForm selectedTerm={selectedTerm} />
        <Footer />
      </div>
    </main>
  )
}
