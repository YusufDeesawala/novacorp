"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function GradientText({ children, className, animate = true }: GradientTextProps) {
  return (
    <motion.span
      className={cn("text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400", className)}
      animate={
        animate
          ? {
              backgroundImage: [
                "linear-gradient(90deg, #a855f7, #06b6d4)",
                "linear-gradient(90deg, #06b6d4, #ec4899)",
                "linear-gradient(90deg, #ec4899, #a855f7)",
              ],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  )
}
