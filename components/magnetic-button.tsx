"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends Omit<ButtonProps, "asChild"> {
  strength?: number
  radius?: number
  children: React.ReactNode
  glowOnHover?: boolean
  glowColor?: string
  href?: string
  asChild?: boolean
}

export function MagneticButton({
  strength = 30,
  radius = 400,
  children,
  glowOnHover = true,
  glowColor = "rgba(168, 85, 247, 0.4)",
  className,
  href,
  asChild,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    const distance = Math.sqrt(x * x + y * y)

    if (distance < radius) {
      const strengthFactor = 1 - distance / radius
      setPosition({
        x: x * strengthFactor * (strength / 10),
        y: y * strengthFactor * (strength / 10),
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      style={{ position: "relative" }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          glowOnHover && "hover:shadow-lg",
          className,
        )}
        style={{
          boxShadow: glowOnHover ? `0 0 0 rgba(0, 0, 0, 0)` : undefined,
        }}
        {...props}
      >
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
              zIndex: -1,
            }}
          />
        )}
        {children}
      </Button>
    </motion.div>
  )
}
