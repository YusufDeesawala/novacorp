"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      life: number
      maxLife: number
      pulse: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
        this.pulse = Math.random() * Math.PI * 2

        const colors = ["rgba(168, 85, 247, ", "rgba(6, 182, 212, ", "rgba(236, 72, 153, "]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        this.pulse += 0.02

        // Boundary wrapping
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Respawn if life exceeded
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw() {
        const opacity = Math.sin(this.pulse) * 0.5 + 0.5
        const lifeRatio = 1 - this.life / this.maxLife

        ctx.save()
        ctx.globalAlpha = opacity * lifeRatio * 0.8
        ctx.fillStyle = this.color + opacity * lifeRatio * 0.8 + ")"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * (1 + Math.sin(this.pulse) * 0.3), 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 20
        ctx.shadowColor = this.color + "0.5)"
        ctx.fill()
        ctx.restore()
      }
    }

    function initParticles() {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = "rgba(168, 85, 247, " + opacity + ")"
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
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

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      aria-hidden="true"
    />
  )
}
