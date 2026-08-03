import { useRef, useEffect, useState, useCallback } from 'react'

const PAD = (n: number) => String(n).padStart(4, '0')

export default function ScrollFrameSequence({ frameCount = 216, scrollLength = 4 }) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const rafRef = useRef(0)
  const [loaded, setLoaded] = useState(false)

  const currentFrameRef = useRef(-1)

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[index]
    if (!canvas || !ctx || !img) return

    const dpr = window.devicePixelRatio || 1
    const cw = window.innerWidth
    const ch = window.innerHeight
    canvas.width = cw * dpr
    canvas.height = ch * dpr
    canvas.style.width = `${cw}px`
    canvas.style.height = `${ch}px`

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const sw = img.naturalWidth * scale
    const sh = img.naturalHeight * scale
    const sx = (sw - cw) / 2
    const sy = (sh - ch) / 2

    ctx.drawImage(img, sx, sy, cw, ch, 0, 0, cw, ch)
  }, [])

  const syncFrame = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const totalScroll = section.offsetHeight - window.innerHeight
    const progress = totalScroll > 0 ? Math.min(Math.max(-rect.top / totalScroll, 0), 1) : 0

    const index = Math.round(progress * (frameCount - 1))
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index
      drawFrame(index)
    }
  }, [frameCount, drawFrame])

  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === frameCount) {
          imagesRef.current = imgs
          setLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === frameCount) {
          imagesRef.current = imgs
          setLoaded(true)
        }
      }
      img.src = `/frames/frame_${PAD(i)}.jpg`
      imgs.push(img)
    }

    return () => {
      imgs.forEach((img) => { img.onload = null; img.onerror = null })
    }
  }, [frameCount])

  useEffect(() => {
    if (!loaded) return

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(syncFrame)
    }

    const handleResize = () => {
      currentFrameRef.current = -1
      syncFrame()
    }

    syncFrame()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [loaded, syncFrame])

  useEffect(() => {
    if (!loaded) return
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      canvas.style.transform = `translate(${x * 8}px, ${y * 8}px)`
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [loaded])

  return (
    <section
      id="frames"
      ref={sectionRef}
      className="relative"
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transition: 'transform 0.1s ease-out' }}
        />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </section>
  )
}
