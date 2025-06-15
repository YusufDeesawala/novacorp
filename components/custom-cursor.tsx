"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorTrail {
  x: number
  y: number
  id: number
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<CursorTrail[]>([])
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailIdRef = useRef(0)

  useEffect(() => {
    let animationFrameId: number

    const mouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add trail point
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            id: trailIdRef.current++,
          },
        ]
        return newTrail.slice(-15) // Keep only last 15 points
      })
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    const mouseDown = () => {
      setIsClicking(true)
      setCursorVariant("click")
    }

    const mouseUp = () => {
      setIsClicking(false)
      setCursorVariant("default")
    }

    // Handle hover states for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.role === "button"
      ) {
        setCursorVariant("hover")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorVariant("text")
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        !target.closest("button") &&
        !target.closest("a") &&
        target.tagName !== "INPUT" &&
        target.tagName !== "TEXTAREA"
      ) {
        setCursorVariant("default")
      }
    }

    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseenter", mouseEnter)
    document.addEventListener("mouseleave", mouseLeave)
    document.addEventListener("mousedown", mouseDown)
    document.addEventListener("mouseup", mouseUp)

    // Add event listeners for interactive elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "button, a, input, textarea, [role='button'], .cursor-pointer",
      )
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    addListeners()

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseenter", mouseEnter)
      document.removeEventListener("mouseleave", mouseLeave)
      document.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("mouseup", mouseUp)
      observer.disconnect()

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: 0.8,
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8,
      opacity: 1,
    },
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `linear-gradient(45deg, 
              rgba(168, 85, 247, ${0.8 - index * 0.05}), 
              rgba(6, 182, 212, ${0.6 - index * 0.04})
            )`,
            left: point.x - 2,
            top: point.y - 2,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Inner Dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: "linear-gradient(45deg, #a855f7, #06b6d4)",
            left: -4,
            top: -4,
            boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
          }}
          animate={{
            scale: cursorVariant === "click" ? 0.5 : cursorVariant === "hover" ? 1.5 : 1,
            rotate: [0, 360],
          }}
          transition={{
            scale: { type: "spring", stiffness: 500, damping: 30 },
            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute border-2 rounded-full"
          style={{
            borderImage: "linear-gradient(45deg, #a855f7, #06b6d4, #ec4899) 1",
            left: -16,
            top: -16,
          }}
          animate={{
            width: cursorVariant === "hover" ? 48 : cursorVariant === "text" ? 24 : cursorVariant === "click" ? 20 : 32,
            height:
              cursorVariant === "hover" ? 48 : cursorVariant === "text" ? 24 : cursorVariant === "click" ? 20 : 32,
            borderColor: cursorVariant === "hover" ? "#a855f7" : cursorVariant === "text" ? "#06b6d4" : "#ffffff",
            opacity: cursorVariant === "click" ? 0.5 : 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        />

        {/* Hover Effect Ring */}
        {cursorVariant === "hover" && (
          <motion.div
            className="absolute border rounded-full"
            style={{
              borderColor: "rgba(168, 85, 247, 0.3)",
              left: -24,
              top: -24,
            }}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: 64,
              height: 64,
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 1.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        )}

        {/* Click Ripple Effect */}
        {isClicking && (
          <motion.div
            className="absolute border-2 rounded-full"
            style={{
              borderColor: "rgba(6, 182, 212, 0.6)",
              left: -16,
              top: -16,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: 80,
              height: 80,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        )}

        {/* Magnetic Field Visualization for Hover */}
        {cursorVariant === "hover" && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400"
                style={{
                  left: -2,
                  top: -2,
                }}
                animate={{
                  x: [0, Math.cos((i * 60 * Math.PI) / 180) * 30],
                  y: [0, Math.sin((i * 60 * Math.PI) / 180) * 30],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}

        {/* Text Cursor Indicator */}
        {cursorVariant === "text" && (
          <motion.div
            className="absolute w-0.5 h-6 bg-cyan-400"
            style={{
              left: -1,
              top: -12,
            }}
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
          x: cursorXSpring,
          y: cursorYSpring,
          left: -64,
          top: -64,
        }}
        animate={{
          scale: cursorVariant === "hover" ? 1.5 : 1,
          opacity: cursorVariant === "hover" ? 0.8 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      />
    </div>
  )
}
