"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  color?: "purple" | "cyan" | "pink"
  className?: string
}

export function HolographicCard({
  icon,
  title,
  description,
  delay = 0,
  color = "purple",
  className,
}: HolographicCardProps) {
  const colorClasses = {
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className={cn("group relative", className)}
    >
      <div
        className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"
        style={{
          background: `linear-gradient(45deg, ${color === "purple" ? "#8b5cf6" : color === "cyan" ? "#06b6d4" : "#ec4899"}, transparent, ${color === "purple" ? "#8b5cf6" : color === "cyan" ? "#06b6d4" : "#ec4899"})`,
        }}
      />

      <div
        className={cn(
          "relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500",
          "bg-gradient-to-br from-zinc-900/50 to-zinc-800/30",
          "group-hover:border-opacity-60",
          colorClasses[color].split(" ").slice(2).join(" "),
        )}
      >
        <motion.div
          className={cn(
            "mb-6 p-4 rounded-full w-fit bg-gradient-to-br",
            colorClasses[color].split(" ").slice(0, 2).join(" "),
          )}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={colorClasses[color].split(" ")[3]}>{icon}</div>
        </motion.div>

        <motion.h3
          className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
          style={{
            backgroundImage:
              color === "purple"
                ? "linear-gradient(45deg, #8b5cf6, #a855f7)"
                : color === "cyan"
                  ? "linear-gradient(45deg, #06b6d4, #0891b2)"
                  : "linear-gradient(45deg, #ec4899, #db2777)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
          {description}
        </p>

        <motion.div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r opacity-60"
          style={{
            backgroundImage:
              color === "purple"
                ? "linear-gradient(45deg, #8b5cf6, #a855f7)"
                : color === "cyan"
                  ? "linear-gradient(45deg, #06b6d4, #0891b2)"
                  : "linear-gradient(45deg, #ec4899, #db2777)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay * 0.5,
          }}
        />
      </div>
    </motion.div>
  )
}
