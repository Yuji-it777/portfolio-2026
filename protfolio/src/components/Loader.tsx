import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [ready, setReady] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (video.readyState >= 1) {
      setReady(true)
    } else {
      const onReady = () => setReady(true)
      video.addEventListener('canplaythrough', onReady)
      return () => video.removeEventListener('canplaythrough', onReady)
    }
  }, [])

  useEffect(() => {
    if (!ready) return

    const tl = gsap.timeline()

    tl.fromTo(textRef.current, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' })
      .fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .to({}, { duration: 1.5 })
      .to(overlayRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut', onComplete })
  }, [ready, onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/videos/marble-bust.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div ref={textRef} className="relative z-10 text-center">
        <h1 className="font-heading text-white text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight">
          Mouad
        </h1>
      </div>

      <p
        ref={subRef}
        className="relative z-10 mt-4 text-white/40 text-[11px] uppercase tracking-[0.35em]"
      >
        Creative Developer
      </p>
    </div>
  )
}