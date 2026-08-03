import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Send, Check, Download } from 'lucide-react'
import { socialLinks, siteConfig } from '../data/socials'
import { Button } from './ui/Button'
import { useTranslation } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const socialIcons: Record<string, React.ReactNode> = {
  twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  dribbble: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>
  ),
  mail: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
}

function EmailCopyButton({ email, onCopy }: { email: string; onCopy: () => void }) {
  return (
    <div className="rounded-xl transition-all duration-300 hover:border-amber-600/30 hover:bg-amber-600/[0.04] group" style={{ border: '1px solid var(--color-border)' }}>
      <button
        onClick={onCopy}
        className="flex items-center gap-3 w-full text-left p-5 rounded-xl"
        aria-label="Copy email address"
      >
        <Mail className="w-5 h-5 text-amber-400/60 flex-shrink-0" />
        <div>
          <p className="text-white/80 text-sm group-hover:text-amber-400 transition-colors duration-300">{email}</p>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mt-0.5">Click to copy</p>
        </div>
      </button>
    </div>
  )
}

function SocialButton({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.2em] rounded-lg no-underline text-white/40 border border-white/5 hover:text-white hover:border-white/30 hover:bg-white/[0.06] hover:scale-105 transition-all duration-300"
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}

export default function ContactSection() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      tl.fromTo('.contact-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo('.contact-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .fromTo(formRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .fromTo(infoRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    })
    return () => ctx.revert()
  }, [])

  const handleCopy = () => navigator.clipboard.writeText(siteConfig.email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(t('contact.email_error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 py-20 snap-start">
      <div className="max-w-6xl mx-auto w-full">
        <p className="section-label contact-label">{t('contact.label')}</p>

        <h2 className="font-heading text-white text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-tight max-w-3xl mb-8 contact-title">
          {t('contact.heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">{t('contact.name')}</label>
                <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-600/50 transition-colors placeholder:text-white/20"
                  placeholder={t('contact.name_placeholder')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">{t('contact.email')}</label>
                <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-600/50 transition-colors placeholder:text-white/20"
                  placeholder={t('contact.email_placeholder')} />
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">{t('contact.message')}</label>
                <textarea id="message" required rows={4} value={formState.message} onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-600/50 transition-colors placeholder:text-white/20 resize-none"
                  placeholder={t('contact.message_placeholder')} />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <Button type="submit" variant="primary" loading={sending}
                leftIcon={sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                className={sent ? 'bg-green-600 border-green-600' : ''} disabled={sent}>
                {sending ? t('contact.sending') : sent ? t('contact.sent') : t('contact.send')}
              </Button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-6">
            <EmailCopyButton email={siteConfig.email} onCopy={handleCopy} />

            <div className="rounded-xl p-5" style={{ border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400/60 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-sm">{siteConfig.location}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mt-0.5">{t('contact.based_in')}</p>
                </div>
              </div>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-5 no-underline transition-all duration-300 hover:border-amber-600/30 hover:bg-amber-600/[0.04]"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <Download className="w-5 h-5 text-amber-400/60 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm">{t('contact.resume')}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] mt-0.5">{t('contact.resume_hint')}</p>
              </div>
            </a>

            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-4">{t('contact.find_me_on')}</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <SocialButton key={s.label} label={s.label} href={s.href} icon={socialIcons[s.icon]} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/10 text-[10px] uppercase tracking-[0.2em] mt-20 text-center">
          &copy; {new Date().getFullYear()} {siteConfig.name}. {t('footer.copyright')}
        </p>
      </div>
    </section>
  )
}