"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"
import { ParallaxSection } from "@/components/parallax-section"
import { TextScramble } from "@/components/text-scramble"
import { GradientText } from "@/components/gradient-text"

const projects = [
  {
    id: 1,
    title: "Quantum Analytics Dashboard",
    category: "SaaS Platform",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A comprehensive analytics platform with real-time data visualization and AI-powered insights for enterprise clients.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    year: "2024",
    featured: true,
    color: "purple",
  },
  {
    id: 2,
    title: "Ethereal Fashion",
    category: "E-commerce",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A luxury fashion e-commerce platform with immersive product visualization and seamless checkout experience.",
    tech: ["Next.js", "Three.js", "Stripe", "Sanity"],
    year: "2024",
    featured: true,
    color: "cyan",
  },
  {
    id: 3,
    title: "Nebula Travel App",
    category: "Mobile App",
    image: "/placeholder.svg?height=600&width=800",
    description: "A travel companion app with AI-powered recommendations and integrated booking system.",
    tech: ["React Native", "Firebase", "Maps API"],
    year: "2023",
    featured: false,
    color: "pink",
  },
  {
    id: 4,
    title: "Pulse Financial",
    category: "Fintech",
    image: "/placeholder.svg?height=600&width=800",
    description: "A modern banking platform with advanced security features and intuitive user experience.",
    tech: ["Vue.js", "Express", "MongoDB", "Blockchain"],
    year: "2023",
    featured: false,
    color: "purple",
  },
  {
    id: 5,
    title: "Spectrum CRM",
    category: "Enterprise SaaS",
    image: "/placeholder.svg?height=600&width=800",
    description: "A customer relationship management system with advanced analytics and automation capabilities.",
    tech: ["Angular", "Python", "Redis", "Docker"],
    year: "2023",
    featured: false,
    color: "cyan",
  },
  {
    id: 6,
    title: "Horizon Media",
    category: "Media Platform",
    image: "/placeholder.svg?height=600&width=800",
    description: "A media company website with dynamic content presentation and real-time streaming capabilities.",
    tech: ["Svelte", "WebRTC", "AWS", "GraphQL"],
    year: "2022",
    featured: false,
    color: "pink",
  },
]

export default function PortfolioPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

        <motion.div className="container px-4 relative z-10" style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm font-medium text-zinc-300 backdrop-blur-sm mb-6">
              Our Work
            </span>

            <motion.h1
              className="text-5xl md:text-7xl font-heading mb-6 leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className="text-white">Our</span>{" "}
              <motion.span whileHover={{ scale: 1.05 }}>
                <GradientText>
                  <TextScramble text="Portfolio" />
                </GradientText>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-zinc-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Explore our collection of innovative digital solutions that have helped businesses achieve their goals and
              exceed expectations.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <ParallaxSection baseVelocity={3} className="pb-32">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                delay={index * 0.1}
                direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
              >
                <AnimatedCard
                  glowColor={project.color as "purple" | "cyan" | "pink"}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 rounded-xl">
                    <div className="aspect-video relative overflow-hidden bg-zinc-800">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Year badge */}
                      <motion.div
                        className="absolute top-4 right-4 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-xs text-zinc-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.year}
                      </motion.div>

                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 left-4 px-2 py-1 rounded bg-gradient-to-r from-purple-500 to-cyan-500 text-xs text-white font-medium"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(168, 85, 247, 0)",
                              "0 0 10px rgba(168, 85, 247, 0.5)",
                              "0 0 0px rgba(168, 85, 247, 0)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Featured
                        </motion.div>
                      )}
                    </div>

                    <div className="p-6">
                      <motion.span
                        className="text-sm text-purple-400 font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.category}
                      </motion.span>

                      <motion.h3
                        className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-purple-400 transition-colors"
                        whileHover={{ x: 5, color: "#a855f7" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className="text-zinc-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <motion.span
                            key={i}
                            className="px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                            whileHover={{
                              y: -5,
                              backgroundColor: "rgba(168, 85, 247, 0.2)",
                              borderColor: "rgba(168, 85, 247, 0.5)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.tech.length > 3 && (
                          <motion.span
                            className="px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
                            whileHover={{
                              y: -5,
                              backgroundColor: "rgba(168, 85, 247, 0.2)",
                              borderColor: "rgba(168, 85, 247, 0.5)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            +{project.tech.length - 3}
                          </motion.span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Link
                            href={`/portfolio/${project.id}`}
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                          >
                            View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </motion.div>

                        <div className="flex gap-2">
                          <motion.button
                            className="p-1 text-zinc-400 hover:text-zinc-300 transition-colors"
                            whileHover={{
                              scale: 1.2,
                              rotate: 5,
                              color: "#06b6d4",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            className="p-1 text-zinc-400 hover:text-zinc-300 transition-colors"
                            whileHover={{
                              scale: 1.2,
                              rotate: -5,
                              color: "#a855f7",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Github className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-32 bg-zinc-950/50">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <motion.h2
              className="text-4xl md:text-5xl font-heading mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Ready to start your
              <br />
              <motion.span whileHover={{ scale: 1.05 }}>
                <GradientText>next project?</GradientText>
              </motion.span>
            </motion.h2>

            <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12">
              Let's collaborate and bring your vision to life with cutting-edge technology and exceptional design.
            </p>

            <Link href="/contact">
              <AnimatedButton
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                Start Your Project <ArrowUpRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
