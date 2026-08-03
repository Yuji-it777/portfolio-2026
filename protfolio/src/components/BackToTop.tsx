import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300
      if (shouldShow !== visible) setVisible(shouldShow)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (visible) {
      gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', pointerEvents: 'auto' })
    } else {
      gsap.to(el, { opacity: 0, y: 20, scale: 0.8, duration: 0.3, ease: 'power2.out', pointerEvents: 'none' })
    }
  }, [visible])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
      style={{
        borderColor: 'rgba(212,168,67,0.4)',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        opacity: 0,
        y: 20,
        scale: 0.8,
        pointerEvents: 'none',
      }}
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4 text-amber-400/80" />
    </button>
  )
}