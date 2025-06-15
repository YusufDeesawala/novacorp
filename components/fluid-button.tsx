"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FluidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary" | "ghost"
  asChild?: boolean
  children: React.ReactNode
}

export const FluidButton = forwardRef<HTMLButtonElement, FluidButtonProps>(
  ({ className, size = "md", variant = "primary", children, asChild, ...props }, ref) => {
    const Component = asChild ? motion.div : motion.button

    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-12 py-6 text-xl",
    }

    const variantClasses = {
      primary: "bg-gradient-to-r from-purple-600 to-cyan-600 text-white",
      secondary: "bg-zinc-900 border border-zinc-700 text-white",
      ghost: "bg-transparent border border-zinc-600 text-zinc-300",
    }

    return (
      <div className="relative group">
        <motion.div
          className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            background: [
              "linear-gradient(45deg, #8b5cf6, #06b6d4)",
              "linear-gradient(45deg, #06b6d4, #ec4899)",
              "linear-gradient(45deg, #ec4899, #8b5cf6)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          style={{ filter: "blur(8px)" }}
        />

        <Component
          ref={ref}
          className={cn(
            "relative rounded-full font-medium transition-all duration-300 transform",
            "hover:scale-105 active:scale-95",
            "backdrop-blur-sm border-0",
            sizeClasses[size],
            variantClasses[variant],
            className,
          )}
          whileHover={{
            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...props}
        >
          <motion.div
            className="flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {children}
          </motion.div>
        </Component>
      </div>
    )
  },
)

FluidButton.displayName = "FluidButton"
