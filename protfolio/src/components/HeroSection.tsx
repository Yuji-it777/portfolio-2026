import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import { useTypewriter } from '../hooks/useTypewriter'
import { ArrowDown } from 'lucide-react'
import { useTranslation } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function HeroButton({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] rounded-full no-underline border transition-all duration-300 ${
        primary
          ? 'text-amber-400 border-amber-600/50 hover:bg-amber-600 hover:text-black'
          : 'text-white/60 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30'
      }`}
    >
      {children}
    </a>
  )
}

export default function HeroSection() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const phrases = useMemo(() => [
    t('hero.phrase.0'),
    t('hero.phrase.1'),
    t('hero.phrase.2'),
    t('hero.phrase.3'),
  ], [t])

  const { displayed, done } = useTypewriter({
    phrases,
    typeSpeed: 38,
    deleteSpeed: 20,
    pauseAfterType: 2000,
    startDelay: 600,
  })

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' })
      gsap.fromTo('.hero-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' })
      gsap.fromTo('.hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.4, ease: 'power2.out' })

      gsap.to('.hero-parallax', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [visible])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end md:justify-center pb-16 md:pb-0 px-6 md:px-10 snap-start overflow-hidden">
      <Navbar />

      <div ref={contentRef} className="max-w-6xl mx-auto w-full hero-parallax">
        <p className="select-none mb-4 text-white/30 text-xs uppercase tracking-[0.3em] hero-label" style={{ fontFamily: 'var(--font-body)' }}>
          {t('hero.portfolio')} {new Date().getFullYear()}
        </p>

        <h1 className="font-heading text-white text-[clamp(3.5rem,12vw,8rem)] leading-[0.9] tracking-tight mb-6 hero-name">
          Mouad
        </h1>

        <p className="text-white/60 max-w-xl text-sm md:text-base leading-relaxed min-h-[1.5em]">
          {displayed}
          {!done && (
            <span className="inline-block w-[1.5px] h-[1em] bg-white/80 align-middle ml-[2px] animate-pulse" />
          )}
        </p>

        <div className="flex flex-wrap gap-3 mt-8 hero-buttons">
          <HeroButton href="#work" primary>{t('hero.view_work')}</HeroButton>
          <HeroButton href="#contact">{t('hero.get_in_touch')}</HeroButton>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 1.5s',
        }}
      >
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] animate-pulse">{t('hero.scroll')}</span>
        <ArrowDown className="w-4 h-4 text-white/20 animate-bounce" />
      </div>
    </section>
  )
}