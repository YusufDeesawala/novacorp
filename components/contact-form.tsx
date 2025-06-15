"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormState {
  name: string
  email: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateForm()

    // Mark all fields as touched on submit
    setTouched({
      name: true,
      email: true,
      message: true,
    })

    if (Object.keys(errors).length > 0) {
      return
    }

    setFormStatus({ type: "loading" })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success response
      setFormStatus({
        type: "success",
        message: "Your message has been sent successfully! We'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setTouched({})
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      })
    }
  }

  const errors = validateForm()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {formStatus.type === "success" ? (
        <motion.div
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mx-auto w-fit mb-4"
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-zinc-300">{formStatus.message}</p>
          <Button className="mt-6 bg-green-600 hover:bg-green-700" onClick={() => setFormStatus({ type: "idle" })}>
            Send Another Message
          </Button>
        </motion.div>
      ) : formStatus.type === "error" ? (
        <motion.div
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="mx-auto w-fit mb-4"
          >
            <AlertCircle className="h-12 w-12 text-red-500" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-zinc-300">{formStatus.message}</p>
          <Button className="mt-6 bg-red-600 hover:bg-red-700" onClick={() => setFormStatus({ type: "idle" })}>
            Try Again
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  "bg-zinc-900/50 border-zinc-800 focus:border-purple-500 text-zinc-100",
                  touched.name && errors.name && "border-red-500 focus:border-red-500",
                )}
                placeholder="Your name"
                disabled={formStatus.type === "loading"}
              />
              {touched.name && errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  "bg-zinc-900/50 border-zinc-800 focus:border-purple-500 text-zinc-100",
                  touched.email && errors.email && "border-red-500 focus:border-red-500",
                )}
                placeholder="your.email@example.com"
                disabled={formStatus.type === "loading"}
              />
              {touched.email && errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  "bg-zinc-900/50 border-zinc-800 focus:border-purple-500 text-zinc-100 min-h-[150px]",
                  touched.message && errors.message && "border-red-500 focus:border-red-500",
                )}
                placeholder="Tell us about your project..."
                disabled={formStatus.type === "loading"}
              />
              {touched.message && errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              disabled={formStatus.type === "loading"}
            >
              {formStatus.type === "loading" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </motion.div>
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {formStatus.type === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </form>
      )}
    </motion.div>
  )
}
