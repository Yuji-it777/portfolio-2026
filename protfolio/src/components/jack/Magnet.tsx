import { useRef, useState, ReactNode, MouseEvent as ReactMouseEvent } from 'react'

interface MagnetProps {
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  children: ReactNode
}

export default function Magnet({
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  children,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)')
  const [transition, setTransition] = useState(inactiveTransition)

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDist = Math.max(rect.width, rect.height) / 2 + padding

    if (dist < maxDist) {
      setTransition(activeTransition)
      setTransform(`translate3d(${deltaX / strength}px, ${deltaY / strength}px, 0px)`)
    } else {
      setTransition(inactiveTransition)
      setTransform('translate3d(0px, 0px, 0px)')
    }
  }

  const handleMouseLeave = () => {
    setTransition(inactiveTransition)
    setTransform('translate3d(0px, 0px, 0px)')
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
