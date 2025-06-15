"use client"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-4">
          <FadeIn>
            <h1 className="font-heading text-5xl md:text-7xl mb-6 tracking-tighter">
              Get in <span className="text-purple-500">Touch</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-zinc-400 max-w-3xl mb-12">
              Ready to start your next digital project? We'd love to hear from you. Reach out and let's create something
              extraordinary together.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-32 relative">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn delay={0.2}>
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-zinc-400">hello@novacorp.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-zinc-400">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-purple-500/10 text-purple-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p className="text-zinc-400">123 Innovation Drive, Tech City, TC 12345</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                  <div className="flex gap-4">
                    {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="p-3 rounded-full bg-zinc-900 hover:bg-purple-500/20 text-zinc-400 hover:text-purple-500 transition-colors"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-32 relative">
        <div className="container px-4">
          <FadeIn>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-zinc-800 relative">
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <p className="text-zinc-500">Interactive map would be displayed here</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
