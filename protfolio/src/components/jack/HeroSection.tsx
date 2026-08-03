import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

const NAV_LINKS = ['About', 'Skills', 'Services', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex flex-col overflow-x-clip">
      {/* Navbar */}
      <FadeIn as="nav" delay={0} y={-20} className="flex items-center justify-between px-4 md:px-10 pt-4 md:pt-8">
        <div />
        <div className="flex items-center gap-4 md:gap-10 lg:gap-14">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </div>
        <div />
      </FadeIn>

      {/* Hero Heading */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden px-4 md:px-10">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.9] w-full text-[14vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw]">
            <span className="sm:hidden">MOUAD EL</span>
            <span className="sm:hidden">/ GHAZI</span>
            <span className="hidden sm:inline whitespace-nowrap">MOUAD EL / GHAZI</span>
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 sm:pb-8 md:pb-10 px-4 md:px-10 gap-4 sm:gap-0">
        <FadeIn delay={0.35} y={20} className="w-full sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px]">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-xs sm:text-base" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 1.5rem)' }}>
            Developer &amp; Graphic Designer crafting creative digital experiences
          </p>
          <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm tracking-wide mt-2">
            Currently building: <span className="text-[#D7E2EA]/70 border-b border-[#D7E2EA]/30">Local Artisans E-commerce Platform</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="self-end sm:self-auto">
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[180px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[35%] sm:top-auto sm:bottom-0 sm:translate-y-0"
      >
          <Magnet padding={150} strength={3}>
            <motion.img
              src="/3d-character.webp"
              alt="Mouad 3D character"
              className="w-full h-auto"
              loading="lazy"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Magnet>
      </FadeIn>
    </section>
  )
}
