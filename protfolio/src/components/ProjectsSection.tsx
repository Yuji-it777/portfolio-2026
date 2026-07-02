import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiveProjectButton from './LiveProjectButton'

type ProjectData = {
  id: string
  name: string
  category: string
  description: string
  img: string
  tags: string[]
}

const projects: ProjectData[] = [
  {
    id: '01',
    name: 'Maison Tislit',
    category: 'Client',
    description: 'A traditional Moroccan fashion e-commerce platform showcasing handcrafted attire and cultural clothing for global customers.',
    img: '/assets/project-screenshot.png',
    tags: ['React', 'Node.js', 'Vite', 'Figma'],
  },
  {
    id: '02',
    name: 'HananCare',
    category: 'Personal',
    description: 'A French-language healthcare platform connecting patients with medical professionals, featuring appointment booking and health tracking tools.',
    img: '/assets/health-app.png',
    tags: ['JavaScript', 'CSS3', 'Figma', 'Photoshop'],
  },
  {
    id: '03',
    name: 'A-Mayzayn',
    category: 'Client',
    description: 'A restaurant discovery and ordering platform celebrating authentic Surinamese cuisine in the heart of Marrakech.',
    img: '/assets/greentech.png',
    tags: ['Figma', 'Illustrator', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: '04',
    name: 'AI Job Hunter',
    category: 'Personal',
    description: 'An automated pipeline that fetches remote job listings daily, scores them with AI, generates cover letters, and delivers to Telegram.',
    img: '/assets/job-hunter.png',
    tags: ['n8n', 'OpenRouter AI', 'Telegram API', 'JavaScript'],
  },
]

function ProjectCard({ project, index, total }: { project: ProjectData; index: number; total: number }) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.5', 'end 0.5'],
  })

  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={container} className="h-[85vh] sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 h-full origin-top relative"
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <span className="font-black text-[#D7E2EA] leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
            {project.id}
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm">
              {project.category}
            </span>
            <h3
              className="text-[#D7E2EA] font-medium uppercase tracking-wider"
              style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
            >
              {project.name}
            </h3>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex gap-3 sm:gap-4 h-[calc(100%-80px)]">
          <div className="w-1/2 flex flex-col gap-2 justify-center">
            <p className="text-[#D7E2EA] text-sm sm:text-base leading-relaxed opacity-80">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D7E2EA] border border-[#D7E2EA]/30 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const total = projects.length

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <h2
        className="hero-heading font-black uppercase text-center mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={total} />
        ))}
      </div>
    </section>
  )
}
