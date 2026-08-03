import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

function CharSpan({
  char,
  scrollYProgress,
  index,
  total,
}: {
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')
  const total = characters.length

  return (
    <p ref={ref} className={className} style={style}>
      {characters.map((char, i) => (
        <CharSpan
          key={`${char}-${i}`}
          char={char}
          scrollYProgress={scrollYProgress}
          index={i}
          total={total}
        />
      ))}
    </p>
  )
}
