import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TechTag {
  label: string
}

interface Project {
  number: string
  name: string
  category: string
  image: string
  description: string
  tags: TechTag[]
  link?: string
  linkLabel?: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Maison Tislit',
    category: 'E-commerce',
    image: '/assets/project-screenshot.png',
    description:
      'A traditional Moroccan fashion e-commerce platform showcasing handcrafted attire and cultural clothing for global customers.',
    tags: [
      { label: 'React' },
      { label: 'Node.js' },
      { label: 'Vite' },
      { label: 'Figma' },
    ],
    link: 'https://maison-tislit-demo.netlify.app/',
    linkLabel: 'Live Project',
  },
  {
    number: '02',
    name: 'HananCare',
    category: 'Healthcare',
    image: '/assets/health-app.png',
    description:
      'A healthcare platform connecting patients with medical professionals in Morocco, featuring appointment booking and health tracking tools.',
    tags: [
      { label: 'JavaScript' },
      { label: 'CSS3' },
      { label: 'Figma' },
      { label: 'Photoshop' },
    ],
    link: 'https://hanancare.ma',
    linkLabel: 'Live Project',
  },
  {
    number: '03',
    name: 'A-Mayzayn',
    category: 'Food & Dining',
    image: '/assets/greentech.png',
    description:
      'A restaurant discovery and ordering platform celebrating authentic Moroccan cuisine in the heart of Marrakech.',
    tags: [
      { label: 'Figma' },
      { label: 'Illustrator' },
      { label: 'Photoshop' },
      { label: 'HTML' },
      { label: 'CSS' },
      { label: 'JavaScript' },
    ],
    link: 'https://amayzayn.netlify.app/',
    linkLabel: 'Website',
  },
  {
    number: '04',
    name: 'AI Job Hunter',
    category: 'Automation',
    image: '/assets/job-hunter.png',
    description:
      'Built an automated pipeline that fetches remote job listings daily, scores them 1-10 using AI based on my skill profile, filters top matches, generates personalized cover letters, and delivers everything to Telegram instantly \u2014 reducing job searching time by 90%.',
    tags: [
      { label: 'n8n' },
      { label: 'OpenRouter AI' },
      { label: 'Qwen3' },
      { label: 'Google Sheets API' },
      { label: 'Telegram Bot API' },
      { label: 'JavaScript' },
      { label: 'REST APIs' },
    ],
    link: 'https://aijobhunter.dev',
    linkLabel: 'Live Project',
  },
  {
    number: '05',
    name: 'A-Mayzayn POS System',
    category: 'Restaurant / POS',
    image: '/assets/image.png',
    description:
      'A production React + Tailwind point-of-sale and cash register app for A-Mayzayn, a mocktail bar and restaurant in Marrakech\u2019s Guiliz district. Order management (dine-in / takeaway), live inventory tracking, automatic 10% TVA calculations, and a sales dashboard.',
    tags: [
      { label: 'React' },
      { label: 'TypeScript' },
      { label: 'Vite' },
      { label: 'Tailwind CSS' },
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/20 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col transition-all duration-500 hover:border-[#D7E2EA]/50 hover:shadow-[0_0_40px_rgba(215,226,234,0.06)] hover:-translate-y-1"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
          <span
            className="text-[#D7E2EA] font-black leading-none flex-shrink-0 transition-opacity duration-500 group-hover:opacity-50"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col pt-2 sm:pt-3 md:pt-4">
            <span className="text-[#D7E2EA] text-xs sm:text-sm uppercase tracking-widest opacity-60">
              {project.category}
            </span>
            <span
              className="text-[#D7E2EA] font-medium uppercase leading-tight"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
            >
              {project.name}
            </span>
          </div>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all duration-200 flex-shrink-0"
          >
            {project.linkLabel || 'Live Project'}
          </a>
        )}
      </div>

      {/* Image + Description + Tags */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-full sm:w-[55%] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-[clamp(180px,25vw,380px)] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="w-full sm:w-[45%] flex flex-col justify-between">
          <p
            className="text-[#D7E2EA] font-light leading-relaxed opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)' }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className="px-3 py-1 text-xs uppercase tracking-wider rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/70 transition-colors duration-300 group-hover:border-[#D7E2EA]/50 group-hover:text-[#D7E2EA]"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14 md:gap-20">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
