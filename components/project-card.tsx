"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
}

interface ProjectCardProps {
  project: Project
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export function ProjectCard({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className="overflow-hidden rounded-xl border border-zinc-800 aspect-[4/3] relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: isHovered ? 0.7 : 0.4 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </motion.div>

          <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-sm text-purple-400 mb-2 inline-block">{project.category}</span>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{project.description}</p>

              <motion.div
                className="flex items-center gap-2 text-purple-500 text-sm font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                View Project <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
