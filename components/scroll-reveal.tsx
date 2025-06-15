"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.8,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: distance }, animate: { y: 0 } }
      case "down":
        return { initial: { y: -distance }, animate: { y: 0 } }
      case "left":
        return { initial: { x: distance }, animate: { x: 0 } }
      case "right":
        return { initial: { x: -distance }, animate: { x: 0 } }
      case "none":
        return { initial: {}, animate: {} }
      default:
        return { initial: { y: distance }, animate: { y: 0 } }
    }
  }

  const { initial, animate } = getDirectionValues()

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ ...initial, opacity: 0 }}
        animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
