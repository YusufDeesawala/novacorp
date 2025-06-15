"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface GlowingButtonProps extends ButtonProps {}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative group">
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 opacity-70 blur-lg group-hover:opacity-100 transition-all duration-500"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <Button
          ref={ref}
          className={cn("relative bg-black border-0 text-white hover:bg-zinc-900", className)}
          {...props}
        >
          {children}
        </Button>
      </div>
    )
  },
)
GlowingButton.displayName = "GlowingButton"
