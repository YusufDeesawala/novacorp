"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: 40 }, animate: { y: 0 } }
      case "down":
        return { initial: { y: -40 }, animate: { y: 0 } }
      case "left":
        return { initial: { x: 40 }, animate: { x: 0 } }
      case "right":
        return { initial: { x: -40 }, animate: { x: 0 } }
      case "none":
        return { initial: {}, animate: {} }
      default:
        return { initial: { y: 40 }, animate: { y: 0 } }
    }
  }

  const { initial, animate } = getDirectionValues()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ ...initial, opacity: 0 }}
        animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
        transition={{
          duration: 0.7,
          delay: delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
