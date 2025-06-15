"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  baseVelocity?: number
  direction?: "up" | "down"
  overflow?: boolean
}

export function ParallaxSection({
  children,
  className,
  baseVelocity = 5,
  direction = "up",
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${baseVelocity * 10 * factor}%`])

  return (
    <div ref={ref} className={cn("relative", overflow ? "overflow-visible" : "overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
