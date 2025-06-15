"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface TextScrambleProps {
  text: string
  className?: string
  scrambleDuration?: number
  staggerDelay?: number
  charSet?: string
}

export function TextScramble({
  text,
  className,
  scrambleDuration = 1.5,
  staggerDelay = 0.04,
  charSet = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz0123456789",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const controls = useAnimation()

  useEffect(() => {
    let iteration = 0
    let interval: NodeJS.Timeout

    const scramble = () => {
      const nextText = text
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return text[index]
          }

          return charSet[Math.floor(Math.random() * charSet.length)]
        })
        .join("")

      setDisplayText(nextText)

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }

    setDisplayText("")
    iteration = 0
    interval = setInterval(scramble, 30)

    return () => clearInterval(interval)
  }, [text, charSet])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {displayText}
    </motion.span>
  )
}
