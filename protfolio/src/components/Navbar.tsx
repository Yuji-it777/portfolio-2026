import { useState, useEffect } from 'react'
import { Moon, Sun, Languages } from 'lucide-react'
import { navLinks, siteConfig } from '../data/socials'
import { useTranslation } from '../context/LanguageContext'

function NavLinks({ links, activeSection }: { links: typeof navLinks; activeSection: string }) {
  const { t } = useTranslation()

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] rounded-full no-underline transition-all duration-300 ${
            activeSection === link.href.slice(1)
              ? 'text-white bg-white/10'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
        >
          {t(`nav.${link.label.toLowerCase()}`)}
        </a>
      ))}
    </nav>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dark, setDark] = useState(true)
  const { locale, setLocale, t } = useTranslation()

  useEffect(() => {
    const isDark = !document.documentElement.classList.contains('light')
    setDark(isDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)

      const sections = document.querySelectorAll('section[id]')
      let current = 'home'
      sections.forEach((section) => {
        const element = section as HTMLElement
        const rect = element.getBoundingClientRect()
        if (rect.top <= 200) {
          current = element.id
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    if (newDark) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('color-theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('color-theme', 'light')
    }
  }

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'fr' : 'en')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.03]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-lg font-heading tracking-wide text-white/90 no-underline hover:text-white transition-colors"
          >
            {siteConfig.name}
          </a>

          <div className="flex items-center gap-2">
            <NavLinks links={navLinks} activeSection={activeSection} />

            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label={t(dark ? 'theme.light' : 'theme.dark')}
            >
              {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 text-[11px] font-medium uppercase tracking-[0.1em]"
              aria-label={t('lang.switch')}
            >
              <Languages className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[4px] items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`w-5 h-[1.5px] bg-white/70 block transition-transform duration-300 ${menuOpen ? 'translate-y-[5.5px] rotate-45' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white/70 block transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[1.5px] bg-white/70 block transition-transform duration-300 ${menuOpen ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[-1] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10 md:hidden transition-opacity duration-300 ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-3xl font-heading text-white/80 no-underline hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${link.label.toLowerCase()}`)}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/40 hover:text-white transition-colors"
              aria-label={t(dark ? 'theme.light' : 'theme.dark')}
            >
              {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs uppercase tracking-[0.1em] hover:text-white transition-colors"
            >
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.03]">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #d4a843, #e8c56d)',
          }}
        />
      </div>
    </header>
  )
}