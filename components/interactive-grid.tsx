"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function InteractiveGrid() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const gridSize = 20
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div
        className="grid gap-1 p-8"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: "100vw",
          height: "100vh",
        }}
      >
        {cells.map((cell) => {
          const row = Math.floor(cell / gridSize)
          const col = cell % gridSize
          const distance = Math.sqrt(
            Math.pow(col * (window.innerWidth / gridSize) - mousePosition.x, 2) +
              Math.pow(row * (window.innerHeight / gridSize) - mousePosition.y, 2),
          )
          const maxDistance = 200
          const intensity = Math.max(0, 1 - distance / maxDistance)

          return (
            <motion.div
              key={cell}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `rgba(168, 85, 247, ${intensity * 0.3})`,
                boxShadow: intensity > 0.5 ? `0 0 10px rgba(168, 85, 247, ${intensity * 0.5})` : "none",
              }}
              animate={{
                scale: 1 + intensity * 0.5,
                rotate: intensity * 45,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
            />
          )
        })}
      </div>
    </div>
  )
}
