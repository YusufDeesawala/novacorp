"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50" : "py-6 bg-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <Sparkles className="h-6 w-6 text-purple-500" />
            </motion.div>
            <motion.span
              className="text-xl font-heading text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-purple-500">NOVA</span> CORP
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2",
                    pathname === item.path ? "text-purple-400" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {item.name}

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: pathname === item.path || hoveredItem === item.name ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />

                  {/* Hover glow */}
                  {hoveredItem === item.name && (
                    <motion.div
                      className="absolute inset-0 rounded-md -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            className="md:hidden text-white p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container px-4 py-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Sparkles className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-heading text-white">
                  <span className="text-purple-500">NOVA</span> CORP
                </span>
              </Link>

              <motion.button
                className="text-white p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "text-2xl font-heading transition-colors relative",
                      pathname === item.path ? "text-purple-500" : "text-white hover:text-purple-400",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}

                    {/* Underline effect */}
                    {pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                        layoutId="mobileActiveTab"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
