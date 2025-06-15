"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { FloatingText } from "@/components/floating-text"
import { TeamMember } from "@/components/team-member"
import { ParallaxText } from "@/components/parallax-text"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-4">
          <FadeIn>
            <h1 className="font-heading text-5xl md:text-7xl mb-6 tracking-tighter">
              About <span className="text-purple-500">Nova Corp</span>
            </h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <p className="text-xl text-zinc-400">
                  Founded with a vision to redefine digital experiences, Nova Corp has evolved into a powerhouse of
                  innovation and creativity.
                </p>
                <p className="text-zinc-400">
                  We're not just developers; we're digital architects crafting the future of web and SaaS solutions. Our
                  team combines technical expertise with artistic vision to create digital experiences that captivate,
                  engage, and convert.
                </p>
                <p className="text-zinc-400">
                  With a client-first approach and an unwavering commitment to excellence, we've helped businesses
                  across all industries establish powerful digital presences and build transformative SaaS solutions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-800">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Nova Corp Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-zinc-950 relative">
        <div className="container px-4">
          <FloatingText>
            <h2 className="font-heading text-3xl md:text-5xl mb-16 text-center">
              Our Core <span className="text-purple-500">Values</span>
            </h2>
          </FloatingText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pushing boundaries and exploring new frontiers in digital experiences.",
              },
              {
                title: "Excellence",
                description: "Committing to the highest standards in every project we undertake.",
              },
              { title: "Collaboration", description: "Working closely with clients to bring their vision to life." },
              { title: "Impact", description: "Creating solutions that drive meaningful results for our clients." },
            ].map((value, index) => (
              <FadeIn key={index} delay={0.2 * index}>
                <motion.div
                  className="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 h-full"
                  whileHover={{ y: -10, borderColor: "rgba(168, 85, 247, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-zinc-400">{value.description}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-black relative">
        <div className="container px-4">
          <FloatingText>
            <h2 className="font-heading text-3xl md:text-5xl mb-16 text-center">
              Meet Our <span className="text-purple-500">Team</span>
            </h2>
          </FloatingText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Alex Chen"
              role="Founder & Creative Director"
              image="/placeholder.svg?height=400&width=400"
              delay={0.2}
            />
            <TeamMember
              name="Sarah Johnson"
              role="Lead Developer"
              image="/placeholder.svg?height=400&width=400"
              delay={0.4}
            />
            <TeamMember
              name="Michael Rodriguez"
              role="UX/UI Designer"
              image="/placeholder.svg?height=400&width=400"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-zinc-950 overflow-hidden">
        <ParallaxText baseVelocity={-2}>INNOVATION • CREATIVITY • EXCELLENCE • </ParallaxText>
        <ParallaxText baseVelocity={2}>• PASSION • DEDICATION • EXPERTISE • </ParallaxText>
      </section>
    </div>
  )
}
