"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant("default")

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1,
      opacity: 0.3,
    },
    click: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.8,
      opacity: 0.5,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full bg-purple-500/10 pointer-events-none z-40 backdrop-blur-sm"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorVariant === "click" ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      />
    </>
  )
}
