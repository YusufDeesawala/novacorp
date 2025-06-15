import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navigation from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Nova Corp | Digital Innovation Studio",
  description: "Creating exceptional websites and SaaS solutions with cutting-edge technology and design.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased overflow-x-hidden text-zinc-100 cursor-none",
          inter.variable,
          outfit.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <CustomCursor />
          <Navigation />
          <PageTransition>
            <main className="relative">{children}</main>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
