"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

interface TeamMemberProps {
  name: string
  role: string
  image: string
  delay?: number
}

export function TeamMember({ name, role, image, delay = 0 }: TeamMemberProps) {
  return (
    <FadeIn delay={delay}>
      <motion.div className="group relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-square relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </motion.div>

          <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-purple-400">{role}</p>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}
