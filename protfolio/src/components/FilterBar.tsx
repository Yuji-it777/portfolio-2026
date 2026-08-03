import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface FilterBarProps {
  categories: string[]
  active: string
  onSelect: (category: string) => void
}

export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
  const activeRef = useRef<HTMLButtonElement>(null)
  const chipsRef = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    chipsRef.current = chipsRef.current.slice(0, categories.length)
  }, [categories])

  return (
    <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects">
      {categories.map((cat, i) => {
        const isActive = cat === active
        return (
          <button
            key={cat}
            ref={(el) => { chipsRef.current[i] = el }}
            onClick={() => onSelect(cat)}
            role="tab"
            aria-selected={isActive}
            className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
              isActive
                ? 'text-black'
                : 'text-white/40 hover:text-white/70 border border-white/10'
            }`}
            style={isActive ? { background: '#d4a843', border: '1px solid #d4a843' } : { background: 'transparent' }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}