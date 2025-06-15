"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "purple" | "cyan" | "pink" | "none"
  hoverScale?: number
  rotateEffect?: boolean
}

export function AnimatedCard({
  children,
  className,
  glowColor = "purple",
  hoverScale = 1.02,
  rotateEffect = true,
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rotateEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const rotateX = rotateEffect ? (mousePosition.y / (cardRef.current?.offsetHeight || 1) - 0.5) * 10 : 0
  const rotateY = rotateEffect ? (mousePosition.x / (cardRef.current?.offsetWidth || 1) - 0.5) * -10 : 0

  const glowColors = {
    purple: "rgba(168, 85, 247, 0.3)",
    cyan: "rgba(6, 182, 212, 0.3)",
    pink: "rgba(236, 72, 153, 0.3)",
    none: "transparent",
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative group overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        transform:
          isHovered && rotateEffect ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : "none",
      }}
      whileHover={{ scale: hoverScale }}
    >
      {/* Glow effect */}
      {glowColor !== "none" && (
        <motion.div
          className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]} 0%, transparent 70%)`,
            zIndex: -1,
          }}
          animate={{
            boxShadow: isHovered ? `0 0 20px 5px ${glowColors[glowColor]}` : "none",
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {children}
    </motion.div>
  )
}
