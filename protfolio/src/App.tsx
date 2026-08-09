import { useState, useEffect } from 'react'
import HeroSection from './components/jack/HeroSection'
import MarqueeSection from './components/jack/MarqueeSection'
import AboutSection from './components/jack/AboutSection'
import ServicesSection from './components/jack/ServicesSection'
import ProjectsSection from './components/jack/ProjectsSection'
import ContactSection from './components/jack/ContactSection'
import Footer from './components/jack/Footer'
import WhatsAppButton from './components/jack/WhatsAppButton'
import BackToTop from './components/jack/BackToTop'
import CustomCursor from './components/jack/CustomCursor'
import LoadingScreen from './components/jack/LoadingScreen'

export default function App() {
  const [loading, setLoading] = useState(() => sessionStorage.getItem('visited') !== '1')

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('visited', '1')
    }, 800)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen />}
      <div style={{ overflowX: 'clip', opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <CustomCursor />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  )
}
