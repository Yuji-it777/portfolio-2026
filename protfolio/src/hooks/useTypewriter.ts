import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  phrases: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseAfterType?: number
  pauseAfterDelete?: number
  startDelay?: number
}

export function useTypewriter({
  phrases,
  typeSpeed = 38,
  deleteSpeed = 20,
  pauseAfterType = 2000,
  pauseAfterDelete = 300,
  startDelay = 600,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delayTimer)
  }, [startDelay])

  const cycle = useCallback(async () => {
    for (let i = 0; ; i = (i + 1) % phrases.length) {
      const phrase = phrases[i]

      for (let j = 1; j <= phrase.length; j++) {
        setDisplayed(phrase.slice(0, j))
        await new Promise((r) => setTimeout(r, typeSpeed))
      }

      if (i === phrases.length - 1) setDone(true)

      await new Promise((r) => setTimeout(r, pauseAfterType))

      for (let j = phrase.length - 1; j >= 0; j--) {
        setDisplayed(phrase.slice(0, j))
        await new Promise((r) => setTimeout(r, deleteSpeed))
      }

      await new Promise((r) => setTimeout(r, pauseAfterDelete))
    }
  }, [phrases, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])

  useEffect(() => {
    if (!started || phrases.length === 0) return
    const controller = { active: true }
    ;(async () => {
      await cycle()
    })()
    return () => { controller.active = false }
  }, [started, cycle])

  return { displayed, done }
}