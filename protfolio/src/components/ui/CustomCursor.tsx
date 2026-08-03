import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    document.body.style.cursor = 'none'

    const pos = { x: 0, y: 0 }
    const trailPos = { x: 0, y: 0 }

    const onMouse = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const onHover = () => gsap.to(cursor, { scale: 1.8, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
    const onUnhover = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })

    document.addEventListener('mousemove', onMouse)

    const hoverTargets = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])')
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onHover)
      el.addEventListener('mouseleave', onUnhover)
    })

    gsap.ticker.add(() => {
      trailPos.x += (pos.x - trailPos.x) * 0.1
      trailPos.y += (pos.y - trailPos.y) * 0.1
      gsap.set(cursor, { x: pos.x, y: pos.y })
      gsap.set(trail, { x: trailPos.x - 15, y: trailPos.y - 15 })
    })

    return () => {
      document.removeEventListener('mousemove', onMouse)
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onHover)
        el.removeEventListener('mouseleave', onUnhover)
      })
      gsap.ticker.lagSmoothing(0)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: '30px',
          height: '30px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)',
          transform: 'translate(0, 0)',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          width: '8px',
          height: '8px',
          background: '#fff',
          transform: 'translate(-4px, -4px)',
        }}
      />
    </>
  )
}