"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export function SoundManager() {
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    // Add subtle ambient sound effects here if desired
    // This is a placeholder for future sound implementation
  }, [])

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/50 transition-all duration-300 z-40"
      onClick={() => setIsMuted(!isMuted)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </motion.button>
  )
}
