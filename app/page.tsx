"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Globe2, Code2, Layers3, CheckCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { AnimatedCard } from "@/components/animated-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { ParallaxSection } from "@/components/parallax-section"
import { TextScramble } from "@/components/text-scramble"
import { HeroBackground } from "@/components/hero-background"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

        {/* Interactive particle background */}
        <HeroBackground intensity={1.5} color="mixed" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        <motion.div className="container px-4 text-center relative z-10" style={{ y: heroY, opacity: heroOpacity }}>
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm font-medium text-zinc-300 backdrop-blur-sm">
              Digital Innovation Studio
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-heading text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-white">NOVA</span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <TextScramble text="CORP" />
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We craft exceptional digital experiences that drive results. From cutting-edge websites to powerful SaaS
            platforms, we turn your vision into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <MagneticButton
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              strength={40}
              glowColor="rgba(168, 85, 247, 0.4)"
              onClick={() => (window.location.href = "/portfolio")}
            >
              View Our Work <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              strength={40}
              glowColor="rgba(6, 182, 212, 0.4)"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Started
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: "100+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  whileHover={{
                    color: ["#ffffff", "#a855f7", "#06b6d4", "#ffffff"],
                    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-zinc-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }}
            whileHover={{ y: 5 }}
          >
            <p className="text-zinc-400 text-sm">Scroll to explore</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="h-6 w-6 text-purple-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <ParallaxSection baseVelocity={3} className="py-32 bg-zinc-950/50">
        <div className="container px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              What We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Create</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              We specialize in building digital solutions that combine beautiful design with powerful functionality.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="h-8 w-8 text-purple-400" />,
                title: "Website Development",
                description:
                  "Custom websites built with modern technologies, optimized for performance and user experience.",
                features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
                color: "purple",
              },
              {
                icon: <Code2 className="h-8 w-8 text-cyan-400" />,
                title: "SaaS Development",
                description: "Scalable software solutions that grow with your business and delight your users.",
                features: ["Cloud Architecture", "API Development", "User Analytics", "Security First"],
                color: "cyan",
              },
              {
                icon: <Layers3 className="h-8 w-8 text-pink-400" />,
                title: "Digital Strategy",
                description: "Comprehensive digital strategies that align technology with your business goals.",
                features: ["Tech Consulting", "UX/UI Design", "Performance Optimization", "Growth Planning"],
                color: "pink",
              },
            ].map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <AnimatedCard
                  glowColor={service.color as "purple" | "cyan" | "pink"}
                  className="h-full"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <Card className="p-8 bg-zinc-900/50 border-zinc-800 h-full relative overflow-hidden group">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon with animation */}
                    <motion.div
                      className="mb-6 relative z-10"
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.5 },
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title with hover effect */}
                    <motion.h3
                      className="text-2xl font-bold mb-4 text-white relative z-10"
                      whileHover={{
                        x: 5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      {service.title}
                    </motion.h3>

                    <p className="text-zinc-300 mb-6 leading-relaxed relative z-10">{service.description}</p>

                    <ul className="space-y-2 relative z-10">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center text-sm text-zinc-400"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Featured Work */}
      <section className="py-32">
        <div className="container px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Work</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              A selection of our recent projects that showcase our expertise and creativity.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Quantum Analytics",
                category: "SaaS Platform",
                description: "Real-time analytics dashboard with AI-powered insights for enterprise clients.",
                image: "/placeholder.svg?height=400&width=600",
                color: "purple",
              },
              {
                title: "Ethereal Fashion",
                category: "E-commerce",
                description: "Luxury fashion platform with immersive product visualization and seamless checkout.",
                image: "/placeholder.svg?height=400&width=600",
                color: "cyan",
              },
            ].map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
                <AnimatedCard glowColor={project.color as "purple" | "cyan"}>
                  <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 transition-all duration-300 group">
                    <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                      {/* Project image would go here */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
                        whileHover={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      />

                      <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-sm text-purple-400 font-medium">{project.category}</span>
                        <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-300 mb-4">{project.description}</p>
                      <Link
                        href="/portfolio"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
                      >
                        View Project
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </Link>
                    </div>
                  </Card>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center" delay={0.4}>
            <MagneticButton
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => (window.location.href = "/portfolio")}
            >
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <ParallaxSection baseVelocity={2} direction="down" className="py-32 bg-zinc-950/50">
        <div className="container px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              Client{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Success
              </span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Hear what our clients have to say about working with Nova Corp.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Nova Corp transformed our digital presence completely. The results exceeded our expectations.",
                author: "Sarah Chen",
                role: "CEO, TechFlow",
                color: "purple",
              },
              {
                quote: "Professional, creative, and delivered on time. Couldn't ask for a better development partner.",
                author: "Marcus Rodriguez",
                role: "Founder, DataViz Pro",
                color: "cyan",
              },
              {
                quote:
                  "The attention to detail and user experience is outstanding. Our customers love the new platform.",
                author: "Elena Vasquez",
                role: "CTO, CloudSync",
                color: "pink",
              },
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <AnimatedCard
                  glowColor={testimonial.color as "purple" | "cyan" | "pink"}
                  className="h-full"
                  hoverScale={1.05}
                >
                  <Card className="p-6 bg-zinc-900/50 border-zinc-800 h-full group">
                    <motion.p
                      className="text-zinc-300 mb-6 italic"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      "{testimonial.quote}"
                    </motion.p>
                    <div>
                      <motion.div
                        className="font-medium text-white"
                        whileHover={{
                          color: ["#ffffff", "#a855f7", "#06b6d4", "#ffffff"],
                          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                        }}
                      >
                        {testimonial.author}
                      </motion.div>
                      <div className="text-sm text-zinc-400">{testimonial.role}</div>
                    </div>
                  </Card>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
              Ready to build something
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                extraordinary?
              </motion.span>
            </h2>

            <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12">
              Let's discuss your project and create a digital solution that drives real results for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <MagneticButton
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                strength={50}
                onClick={() => (window.location.href = "/contact")}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Project
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                strength={50}
                glowColor="rgba(6, 182, 212, 0.3)"
                onClick={() => (window.location.href = "/about")}
              >
                Learn More About Us
              </MagneticButton>
            </div>

            {/* Added content under the CTA section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <ScrollReveal delay={0.1}>
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
                  <h3 className="text-xl font-bold text-white mb-3">Consultation</h3>
                  <p className="text-zinc-300">
                    Schedule a free consultation with our experts to discuss your project requirements and goals.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
                  <h3 className="text-xl font-bold text-white mb-3">Strategy</h3>
                  <p className="text-zinc-300">
                    We'll develop a comprehensive strategy tailored to your specific business needs and objectives.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30">
                  <h3 className="text-xl font-bold text-white mb-3">Execution</h3>
                  <p className="text-zinc-300">
                    Our team will bring your vision to life with cutting-edge technology and exceptional design.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
