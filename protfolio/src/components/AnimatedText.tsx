import { useRef, type CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const total = text.length

  return (
    <p ref={ref} className={className} style={style}>
      {text.split('').map((char, i) => {
        const start = i / total
        const end = (i + 1) / total
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
        return (
          <motion.span key={i} style={{ opacity }}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </p>
  )
}
