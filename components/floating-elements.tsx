"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  const elements = [
    { size: 4, delay: 0, duration: 8, x: "10%", y: "20%" },
    { size: 6, delay: 1, duration: 12, x: "80%", y: "10%" },
    { size: 3, delay: 2, duration: 10, x: "20%", y: "80%" },
    { size: 5, delay: 0.5, duration: 15, x: "90%", y: "70%" },
    { size: 2, delay: 3, duration: 6, x: "60%", y: "30%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm"
          style={{
            width: element.size * 4,
            height: element.size * 4,
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
