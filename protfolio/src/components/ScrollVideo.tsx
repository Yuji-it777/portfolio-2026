import { useRef, useEffect, useState } from 'react'

const FPS = 24

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastTargetRef = useRef(-1)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const video = videoRef.current
    if (!video) return

    video.load()

    const getProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      return docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0
    }

    const showFrame = (target: number) => {
      if (target === lastTargetRef.current) return
      lastTargetRef.current = target
      const seekTo = target / FPS
      video.currentTime = seekTo
      video.play().then(() => video.pause()).catch(() => {})
    }

    const syncFrame = () => {
      if (!video.duration) return
      const total = Math.round(video.duration * FPS)
      const frame = Math.round(total * getProgress())
      showFrame(Math.min(Math.max(frame, 0), total - 1))
    }

    const handleScroll = () => {
      requestAnimationFrame(syncFrame)
    }

    const handleReady = () => {
      lastTargetRef.current = -1
      syncFrame()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    video.addEventListener('durationchange', handleReady, { once: true })

    if (video.readyState >= 2 && video.duration) {
      handleReady()
    } else {
      video.addEventListener('canplay', handleReady, { once: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const video = videoRef.current
    if (!video) return

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      video.style.transform = `translate(${x * 8}px, ${y * 8}px)`
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reducedMotion])

  if (reducedMotion) {
    return <div className="fixed inset-0 z-0 bg-black pointer-events-none" />
  }

  return (
    <video
      ref={videoRef}
      src="/videos/marble-bust.mp4"
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ transition: 'transform 0.1s ease-out' }}
    />
  )
}
