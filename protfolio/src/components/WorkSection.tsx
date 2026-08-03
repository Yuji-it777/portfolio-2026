import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, X, ArrowUpRight, Clock, User, Code } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../types'
import FilterBar from './FilterBar'
import { useTranslation } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useTranslation()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[16/10] relative overflow-hidden rounded-t-2xl bg-white/[0.02]">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a0f 0%, transparent 50%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-amber-400/60 text-[10px] uppercase tracking-[0.2em] mb-1">{project.category}</p>
            <h2 className="font-heading text-2xl md:text-4xl text-white tracking-tight">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <p className="text-white/70 leading-relaxed">{project.longDescription}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            {project.role && (
              <div className="flex items-center gap-2 text-white/50">
                <User className="w-4 h-4 text-amber-400/60" />
                <span>{project.role}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2 text-white/50">
                <Clock className="w-4 h-4 text-amber-400/60" />
                <span>{project.duration}</span>
              </div>
            )}
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm text-white/50 mb-3">
              <Code className="w-4 h-4 text-amber-400/60" />
              {t('work.tech_stack')}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs uppercase tracking-[0.15em] border border-white/10 rounded-full px-3 py-1.5 text-white/40">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.link || project.github) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-amber-600/50 text-amber-400 text-xs uppercase tracking-[0.2em] rounded-full px-5 py-2.5 hover:bg-amber-600 hover:text-black transition-all duration-300 no-underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t('work.visit_site')}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/10 text-white/60 text-xs uppercase tracking-[0.2em] rounded-full px-5 py-2.5 hover:bg-white/10 hover:text-white transition-all duration-300 no-underline"
                >
                  <GithubIcon />
                  {t('work.view_source')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 40 })

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -8, scale: 1.02, duration: 0.5, ease: 'power2.out' })
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.08, opacity: 0.9, duration: 0.7, ease: 'power2.out' })
    }
    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    if (descRef.current) gsap.to(descRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
    if (arrowRef.current) {
      arrowRef.current.classList.add('bg-amber-600/10', 'border-amber-600/50', 'text-white')
      arrowRef.current.classList.remove('border-white/10', 'text-white/30')
      gsap.to(arrowRef.current.querySelector('svg'), {
        rotate: -45,
        scale: 1.15,
        duration: 0.4,
        ease: 'back.out(1.5)',
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
    if (imageRef.current) gsap.to(imageRef.current, { scale: 1, opacity: 0.6, duration: 0.6, ease: 'power2.out' })
    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    if (descRef.current) gsap.to(descRef.current, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.out' })
    if (arrowRef.current) {
      arrowRef.current.classList.remove('bg-amber-600/10', 'border-amber-600/50', 'text-white')
      arrowRef.current.classList.add('border-white/10', 'text-white/30')
      gsap.to(arrowRef.current.querySelector('svg'), { rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' })
    }
  }

  return (
    <div
      ref={cardRef}
      className="cursor-pointer rounded-lg overflow-hidden border border-white/[0.03]"
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
      aria-label={`View ${project.title} - ${project.category}`}
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-white/[0.02] relative">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ willChange: 'transform', opacity: 0.6, scale: 1 }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" style={{ opacity: 0 }} />
        <div ref={descRef} className="absolute bottom-0 left-0 right-0 p-4" style={{ y: 16, opacity: 0 }}>
          <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{project.description}</p>
        </div>
      </div>

      <div className="p-4 border-t border-white/[0.03]">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">{project.category}</p>
            <h3 className="font-heading text-white text-lg tracking-tight">{project.title}</h3>
          </div>
          <span
            ref={arrowRef}
            className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center border-white/10 text-white/30"
          >
            <ArrowUpRight className="w-4 h-4" style={{ willChange: 'transform' }} />
          </span>
        </div>
      </div>
    </div>
  )
}

const allCategories = ['All', ...new Set(projects.map((p) => p.category))]

export default function WorkSection() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)),
    [activeFilter],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#work',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      tl.fromTo('.work-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll(':scope > div')
    if (cards.length === 0) return

    gsap.fromTo(cards, { opacity: 0, y: 30, scale: 0.95 }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
    })
  }, [activeFilter])

  const translatedCategories = allCategories.map((cat) =>
    cat === 'All' ? t('work.filter_all') : cat,
  )

  return (
    <section id="work" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 py-20 snap-start">
      <div className="max-w-6xl mx-auto w-full">
        <p className="section-label work-label">{t('work.label')}</p>

        <h2
          ref={titleRef}
          className="font-heading text-white text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-tight max-w-3xl mb-6"
        >
          {t('work.heading')}
        </h2>

        <FilterBar
          categories={translatedCategories}
          active={activeFilter === 'All' ? t('work.filter_all') : activeFilter}
          onSelect={(cat) => setActiveFilter(cat === t('work.filter_all') ? 'All' : cat)}
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}