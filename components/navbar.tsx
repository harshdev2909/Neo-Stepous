"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
              NeoStepous AI
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />

            <div className="flex items-center space-x-3">
              <Link href="/chat">
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Chat
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA] transition-all duration-300">
                  Dashboard
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 border-b border-gray-800"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />

            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-gray-700">
                  Chat
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7]">Dashboard</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

function NavLinks({
  mobile = false,
  setIsMenuOpen = () => {},
}: { mobile?: boolean; setIsMenuOpen?: (value: boolean) => void }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/explorer", label: "Explorer" },
    { href: "/subscription", label: "Subscription" },
    { href: "/tools", label: "Tools" },
  ]

  return (
    <div className={`${mobile ? "flex flex-col space-y-3" : "flex items-center space-x-6"}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-300 hover:text-white transition-colors"
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
