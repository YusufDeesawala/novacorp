"use client"

import { useEffect, useRef } from "react"

export function FluidBackground() {
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

    const drawFluidBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create multiple layers of flowing gradients
      for (let layer = 0; layer < 3; layer++) {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width + Math.sin(time * 0.01 + layer) * 200,
          canvas.height + Math.cos(time * 0.008 + layer) * 150,
        )

        const colors = [
          ["rgba(168, 85, 247, 0.03)", "rgba(6, 182, 212, 0.02)", "rgba(236, 72, 153, 0.01)"],
          ["rgba(6, 182, 212, 0.02)", "rgba(236, 72, 153, 0.03)", "rgba(168, 85, 247, 0.01)"],
          ["rgba(236, 72, 153, 0.01)", "rgba(168, 85, 247, 0.02)", "rgba(6, 182, 212, 0.03)"],
        ]

        gradient.addColorStop(0, colors[layer][0])
        gradient.addColorStop(0.5, colors[layer][1])
        gradient.addColorStop(1, colors[layer][2])

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    const animate = () => {
      time++
      drawFluidBackground()
      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
}
