"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Clock, Users, Award, Zap } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { ContactForm } from "@/components/contact-form"
import { AnimatedCard } from "@/components/animated-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { GradientText } from "@/components/gradient-text"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

        <div className="container px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm font-medium text-zinc-300 backdrop-blur-sm mb-6">
                Let's Connect
              </span>

              <h1 className="font-heading text-5xl md:text-7xl mb-6 tracking-tighter">
                Get in <GradientText>Touch</GradientText>
              </h1>

              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Ready to start your next digital project? We'd love to hear from you. Reach out and let's create
                something extraordinary together.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 relative">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email Us",
                description: "Drop us a line anytime",
                contact: "hello@novacorp.com",
                color: "purple",
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Call Us",
                description: "Mon-Fri from 8am to 5pm",
                contact: "+1 (555) 123-4567",
                color: "cyan",
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Visit Us",
                description: "Come say hello at our office",
                contact: "123 Innovation Drive, Tech City",
                color: "pink",
              },
            ].map((method, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard glowColor={method.color as "purple" | "cyan" | "pink"}>
                  <motion.div
                    className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center h-full"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`inline-flex p-4 rounded-full mb-6 ${
                        method.color === "purple"
                          ? "bg-purple-500/10 text-purple-400"
                          : method.color === "cyan"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-pink-500/10 text-pink-400"
                      }`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {method.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{method.description}</p>
                    <p className="text-zinc-300 font-medium">{method.contact}</p>
                  </motion.div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="pb-32 relative">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-20 blur-xl"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                      "linear-gradient(45deg, #06b6d4, #ec4899)",
                      "linear-gradient(45deg, #ec4899, #8b5cf6)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </div>
              </div>
            </FadeIn>

            {/* Additional Info */}
            <FadeIn delay={0.4}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Why Choose <GradientText>Nova Corp?</GradientText>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: <Clock className="h-5 w-5" />,
                        title: "Fast Response",
                        description: "We respond to all inquiries within 24 hours",
                      },
                      {
                        icon: <Users className="h-5 w-5" />,
                        title: "Expert Team",
                        description: "Work with experienced professionals who understand your needs",
                      },
                      {
                        icon: <Award className="h-5 w-5" />,
                        title: "Proven Results",
                        description: "100+ successful projects delivered on time and on budget",
                      },
                      {
                        icon: <Zap className="h-5 w-5" />,
                        title: "Cutting-edge Tech",
                        description: "We use the latest technologies to build future-proof solutions",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
                        whileHover={{ x: 5, borderColor: "rgba(168, 85, 247, 0.3)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0">{item.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-zinc-400 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Follow Our <GradientText>Journey</GradientText>
                  </h2>
                  <div className="flex gap-4">
                    {[
                      { name: "Twitter", handle: "@novacorp" },
                      { name: "LinkedIn", handle: "/company/nova-corp" },
                      { name: "Instagram", handle: "@novacorp.studio" },
                      { name: "Dribbble", handle: "/novacorp" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="p-3 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-sm font-medium">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                  <h3 className="text-lg font-bold text-white mb-2">Free Consultation</h3>
                  <p className="text-zinc-300 text-sm mb-4">
                    Book a 30-minute discovery call to discuss your project and get expert advice on the best approach.
                  </p>
                  <motion.div
                    className="inline-flex items-center text-purple-400 text-sm font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Schedule Now →
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-zinc-950/50">
        <div className="container px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading mb-6">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Get answers to common questions about our services and process.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on complexity, but most websites take 4-8 weeks and SaaS platforms take 3-6 months.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes, we offer comprehensive maintenance packages and ongoing support to ensure your project continues to perform optimally.",
              },
              {
                question: "What technologies do you work with?",
                answer:
                  "We specialize in modern web technologies including React, Next.js, Node.js, and various cloud platforms.",
              },
              {
                question: "Can you help with existing projects?",
                answer:
                  "We can audit, optimize, and enhance existing projects or take over development from other teams.",
              },
              {
                question: "What's your pricing structure?",
                answer:
                  "We offer flexible pricing models including fixed-price projects and ongoing retainers based on your specific needs.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "Yes, we work with clients worldwide and have experience managing projects across different time zones.",
              },
            ].map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                  whileHover={{ borderColor: "rgba(168, 85, 247, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-zinc-400">{faq.answer}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
