import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, getSkillsByCategory, skillCategories } from '../data/skills'
import type { Skill } from '../types'
import { useTranslation } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const numEl = numRef.current
    if (!el || !numEl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        numEl,
        { textContent: 0 },
        {
          textContent: value,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [value])

  return (
    <div ref={ref} className="text-center opacity-0">
      <span
        ref={numRef}
        className="font-heading text-white text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight block"
      >
        0
      </span>
      {suffix && <span className="font-heading text-amber-400/60 text-[clamp(1.5rem,3vw,2rem)]">{suffix}</span>}
      <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-2">{label}</p>
    </div>
  )
}

function SkillPill({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  const handleEnter = () => {
    if (!ref.current) return
    gsap.to(ref.current, {
      scale: 1.12,
      borderColor: 'rgba(212,168,67,0.4)',
      color: '#fff',
      duration: 0.3,
      ease: 'back.out(2)',
    })
    if (dotRef.current) {
      gsap.set(dotRef.current, { display: 'inline-block' })
      gsap.fromTo(dotRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
    }
  }

  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, {
      scale: 1,
      borderColor: 'var(--color-border)',
      color: 'var(--color-fg-muted)',
      duration: 0.3,
      ease: 'power2.out',
    })
    if (dotRef.current) {
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => { if (dotRef.current) dotRef.current.style.display = 'none' } })
    }
  }

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] rounded-full px-3 py-1.5 border cursor-default"
      style={{
        borderColor: 'var(--color-border)',
        color: 'var(--color-fg-muted)',
        willChange: 'transform',
      }}
    >
      <span>{skill.name}</span>
      <span
        ref={dotRef}
        className="w-1.5 h-1.5 rounded-full"
        style={{
          display: 'none',
          background: skill.proficiency >= 90
            ? '#22c55e'
            : skill.proficiency >= 80
            ? '#eab308'
            : skill.proficiency >= 70
            ? '#f97316'
            : '#ef4444',
        }}
      />
    </span>
  )
}

function SkillCategory({ category, index }: { category: { key: Skill['category']; label: string; icon: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const categorySkills = getSkillsByCategory(category.key)
  if (categorySkills.length === 0) return null

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 30 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      }).fromTo(
        el.querySelectorAll('.skill-pill'),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(1.5)' },
        '-=0.2',
      )
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="glass rounded-xl p-4 md:p-5">
      <p className="text-amber-400/50 text-[10px] uppercase tracking-[0.25em] mb-3">{category.label}</p>
      <div className="flex flex-wrap gap-1.5">
        {categorySkills.map((skill) => (
          <span key={skill.name} className="skill-pill">
            <SkillPill skill={skill} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { t } = useTranslation()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo('.about-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 py-20 snap-start">
      <div className="max-w-6xl mx-auto w-full">
        <p className="section-label about-label">{t('about.label')}</p>

        <h2
          ref={titleRef}
          className="font-heading text-white text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-tight max-w-3xl mb-8"
        >
          {t('about.heading')}
        </h2>

        <p
          ref={textRef}
          className="text-white/50 max-w-xl text-sm leading-relaxed mb-10"
        >
          {t('about.body')}
        </p>

        <div className="grid grid-cols-3 gap-8 mb-16 max-w-xl">
          <StatCounter value={5} label={t('about.stat.years')} suffix="+" />
          <StatCounter value={50} label={t('about.stat.projects')} suffix="+" />
          <StatCounter value={20} label={t('about.stat.clients')} suffix="+" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
          {skillCategories.map((cat, i) => (
            <SkillCategory key={cat.key} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}