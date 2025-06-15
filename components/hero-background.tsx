"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface HeroBackgroundProps {
  intensity?: number
  color?: "purple" | "cyan" | "mixed"
}

export function HeroBackground({ intensity = 1, color = "mixed" }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const getColor = () => {
      if (color === "purple") return `rgba(168, 85, 247, ${Math.random() * 0.3 + 0.1})`
      if (color === "cyan") return `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`

      // Mixed colors
      const colors = [
        `rgba(168, 85, 247, ${Math.random() * 0.3 + 0.1})`,
        `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`,
        `rgba(236, 72, 153, ${Math.random() * 0.3 + 0.1})`,
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      vx: number
      vy: number
      force: number
      angle: number
      distance: number
      friction: number
      ease: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = getColor()

        // For mouse interaction
        this.vx = 0
        this.vy = 0
        this.force = 0
        this.angle = 0
        this.distance = 0
        this.friction = Math.random() * 0.03 + 0.01
        this.ease = Math.random() * 0.1 + 0.02
      }

      update() {
        // Regular movement
        this.x += this.speedX
        this.y += this.speedY

        // Boundary wrapping
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Mouse interaction
        this.distance = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))

        this.force = Math.max(100, Math.min(400, 400 * intensity)) / this.distance

        if (this.distance < 100) {
          this.angle = Math.atan2(this.y - mouseY, this.x - mouseX)
          this.vx += this.force * Math.cos(this.angle)
          this.vy += this.force * Math.sin(this.angle)
        }

        this.x += this.vx
        this.y += this.vy
        this.vx *= this.friction
        this.vy *= this.friction
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function initParticles() {
      particles = []
      const particlesCount = Math.floor((canvas.width * canvas.height) / 10000) * intensity

      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.5
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * intensity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [intensity, color])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      aria-hidden="true"
    />
  )
}
