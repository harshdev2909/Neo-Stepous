"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, Layers, Shield, Zap, Coins, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
              NeoStepous AI: Your All-in-One Crypto & AI Platform
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Revolutionizing the way you interact with blockchain and artificial intelligence. Seamlessly explore,
              analyze, and trade with cutting-edge tools.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <Button
                size="lg"
                
                className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA] transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20"
              >
                <span className="text-sm font-medium">Coming Soon</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Crypto Experience?</h2>
            <p className="text-gray-300 mb-8">
              Join the waitlist today and be the first to access NeoStepous AI when we launch.
            </p>
            <Dialog>
              
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA] transition-all duration-300 hover:scale-105"
                >
                  Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              
              <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
                    NeoStepous AI - Site Map
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Explore all the features of our platform
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  <SiteMap />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const features = [
  {
    title: "Unified Interface",
    description: "Access all your crypto and AI tools in one seamless platform.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Market Insights",
    description: "Real-time analytics and AI-powered market predictions.",
    icon: <BarChart2 className="h-6 w-6" />,
  },
  {
    title: "Blockchain Exploration",
    description: "Explore projects across Solana, Base, and other chains with natural language queries.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Flexible Subscriptions",
    description: "Pay-per-day options from 1 to 30 days for maximum flexibility.",
    icon: <Coins className="h-6 w-6" />,
  },
  {
    title: "Trading Tools",
    description: "Verify contracts, execute trades, and monitor your portfolio.",
    icon: <Shield className="h-6 w-6" />,
  },
]

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="transition-all duration-300"
    >
      <Card className="bg-gray-800/50 border-gray-700 overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
        <CardHeader className="relative">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mb-3">
            {feature.icon}
          </div>
          <CardTitle className="text-xl">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <CardDescription className="text-gray-300">{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SiteMap() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-lg border border-gray-800 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="mr-3 p-2 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                  {route.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{route.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{route.description}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-gray-500" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-white mb-3">Navigation Flowchart</h3>
        <div className="p-4 rounded-lg border border-gray-800 bg-gray-800/50">
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 mb-2 text-center">
              Home (/)
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col items-center">
                <div className="h-6 w-px bg-gray-700"></div>
                <div className="p-2 rounded-lg bg-gray-800 text-center text-sm">Chat (/chat)</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-6 w-px bg-gray-700"></div>
                <div className="p-2 rounded-lg bg-gray-800 text-center text-sm">Dashboard (/dashboard)</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-6 w-px bg-gray-700"></div>
                <div className="p-2 rounded-lg bg-gray-800 text-center text-sm">Explorer (/explorer)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const routes = [
  {
    name: "Chat Interface",
    path: "/chat",
    description: "Interact with NeoStepous AI through natural language",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    name: "Market Insights",
    path: "/dashboard",
    description: "Real-time analytics and market trends",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    name: "Blockchain Explorer",
    path: "/explorer",
    description: "Explore projects across different blockchains",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    name: "Subscription",
    path: "/subscription",
    description: "Manage your subscription plans",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    name: "Trading Tools",
    path: "/tools",
    description: "Verify contracts and execute trades",
    icon: <Bell className="h-5 w-5" />,
  },
]
