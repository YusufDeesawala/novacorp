"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  glowColor?: string
  pulseEffect?: boolean
}

export function AnimatedButton({
  children,
  className,
  glowColor = "rgba(168, 85, 247, 0.4)",
  pulseEffect = true,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div className="relative group">
      {/* Animated background */}
      <motion.div
        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            "linear-gradient(45deg, #8b5cf6, #06b6d4)",
            "linear-gradient(45deg, #06b6d4, #ec4899)",
            "linear-gradient(45deg, #ec4899, #8b5cf6)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ filter: "blur(8px)" }}
      />

      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300 transform",
          "hover:scale-105 active:scale-95",
          "backdrop-blur-sm border-0",
          className,
        )}
        {...props}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: ["100%", "-100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />

        {/* Pulse effect */}
        {pulseEffect && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [`0 0 0 0 ${glowColor}`, `0 0 0 10px transparent`],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        )}

        <motion.div
          className="relative z-10 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {children}
        </motion.div>
      </Button>
    </motion.div>
  )
}
