"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface LiquidShapeProps {
  mousePosition: { x: number; y: number }
}

export function LiquidShape({ mousePosition }: LiquidShapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawLiquidShape = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Mouse influence
      const mouseInfluenceX = (mousePosition.x - centerX) * 0.0001
      const mouseInfluenceY = (mousePosition.y - centerY) * 0.0001

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) * 0.6,
      )
      gradient.addColorStop(0, "rgba(168, 85, 247, 0.15)")
      gradient.addColorStop(0.3, "rgba(6, 182, 212, 0.1)")
      gradient.addColorStop(0.6, "rgba(236, 72, 153, 0.05)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient

      // Draw morphing blob
      ctx.beginPath()

      const points = 8
      const radius = Math.min(canvas.width, canvas.height) * 0.3

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2
        const wave1 = Math.sin(time * 0.02 + angle * 3) * 50
        const wave2 = Math.cos(time * 0.015 + angle * 2) * 30
        const wave3 = Math.sin(time * 0.01 + angle * 4) * 20

        const r = radius + wave1 + wave2 + wave3
        const x = centerX + Math.cos(angle + mouseInfluenceX) * r
        const y = centerY + Math.sin(angle + mouseInfluenceY) * r

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2
          const prevWave1 = Math.sin(time * 0.02 + prevAngle * 3) * 50
          const prevWave2 = Math.cos(time * 0.015 + prevAngle * 2) * 30
          const prevWave3 = Math.sin(time * 0.01 + prevAngle * 4) * 20
          const prevR = radius + prevWave1 + prevWave2 + prevWave3
          const prevX = centerX + Math.cos(prevAngle + mouseInfluenceX) * prevR
          const prevY = centerY + Math.sin(prevAngle + mouseInfluenceY) * prevR

          const cpX = (prevX + x) / 2 + Math.sin(time * 0.03 + i) * 20
          const cpY = (prevY + y) / 2 + Math.cos(time * 0.025 + i) * 20

          ctx.quadraticCurveTo(cpX, cpY, x, y)
        }
      }

      ctx.closePath()
      ctx.fill()

      // Add secondary shapes
      for (let i = 0; i < 3; i++) {
        const offsetX = Math.sin(time * 0.01 + i * 2) * 100
        const offsetY = Math.cos(time * 0.008 + i * 2) * 80
        const size = 50 + Math.sin(time * 0.02 + i) * 20

        const smallGradient = ctx.createRadialGradient(
          centerX + offsetX,
          centerY + offsetY,
          0,
          centerX + offsetX,
          centerY + offsetY,
          size,
        )

        const colors = [
          ["rgba(168, 85, 247, 0.1)", "rgba(168, 85, 247, 0)"],
          ["rgba(6, 182, 212, 0.08)", "rgba(6, 182, 212, 0)"],
          ["rgba(236, 72, 153, 0.06)", "rgba(236, 72, 153, 0)"],
        ]

        smallGradient.addColorStop(0, colors[i][0])
        smallGradient.addColorStop(1, colors[i][1])

        ctx.fillStyle = smallGradient
        ctx.beginPath()
        ctx.arc(centerX + offsetX, centerY + offsetY, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      time++
      drawLiquidShape()
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      aria-hidden="true"
    />
  )
}
