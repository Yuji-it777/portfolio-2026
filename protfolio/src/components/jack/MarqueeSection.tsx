import { useRef, useEffect } from 'react'

const IMAGES_ROW1 = [
  '/marquee/1poster11.jpg',
  '/marquee/2poster11.jpg',
  '/marquee/banner-mason.jpg',
  '/marquee/flayer-mason.jpg',
  '/marquee/rollup.jpg',
  '/marquee/servis-flayer.jpg',
  '/marquee/stander.jpg',
  '/marquee/packaging.jpg',
]

const IMAGES_ROW2 = [
  '/marquee/logo1.jpg',
  '/marquee/logo2.jpg',
  '/marquee/pen-mockup.jpg',
  '/marquee/pem.jpg',
  '/marquee/rollup.jpg',
  '/marquee/servis-flayer.jpg',
  '/marquee/banner-mason.jpg',
  '/marquee/stander.jpg',
]

function doubled<T>(arr: T[]): T[] {
  return [...arr, ...arr]
}

function toWebp(src: string) {
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
}

function ImageTile({ src }: { src: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl flex-shrink-0">
      <picture>
        <source srcSet={toWebp(src)} type="image/webp" />
        <img
          src={src}
          alt=""
          className="w-[420px] h-[270px] object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </picture>
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
    </div>
  )
}

export default function MarqueeSection() {
  const row1Images = doubled(IMAGES_ROW1)
  const row2Images = doubled(IMAGES_ROW2)
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    if (!row1 || !row2) return

    let isPaused = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPaused) {
          row1.style.animationPlayState = 'running'
          row2.style.animationPlayState = 'running'
          isPaused = false
        } else if (!entry.isIntersecting && !isPaused) {
          row1.style.animationPlayState = 'paused'
          row2.style.animationPlayState = 'paused'
          isPaused = true
        }
      },
      { threshold: 0 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          animation: marquee-left 30s linear infinite;
          willChange: transform;
          transform: translateZ(0);
        }
        .marquee-track-right {
          animation: marquee-right 30s linear infinite;
          willChange: transform;
          transform: translateZ(0);
        }
      `}</style>

      <div ref={row1Ref} className="marquee-track-left flex gap-3 mb-3 w-max">
        {row1Images.map((src, i) => (
          <ImageTile key={`r1-${i}`} src={src} />
        ))}
      </div>

      <div ref={row2Ref} className="marquee-track-right flex gap-3 w-max">
        {row2Images.map((src, i) => (
          <ImageTile key={`r2-${i}`} src={src} />
        ))}
      </div>
    </section>
  )
}
