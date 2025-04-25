"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Zap, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlockchainExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isGuidedMode, setIsGuidedMode] = useState(false)
  const [selectedChain, setSelectedChain] = useState("solana")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate search results based on query and selected chain
    setTimeout(() => {
      let results = []

      if (selectedChain === "solana") {
        if (searchQuery.toLowerCase().includes("defi")) {
          results = solanaDefiProjects
        } else if (searchQuery.toLowerCase().includes("nft")) {
          results = solanaNftProjects
        } else {
          results = [...solanaDefiProjects.slice(0, 2), ...solanaNftProjects.slice(0, 2)]
        }
      } else if (selectedChain === "base") {
        if (searchQuery.toLowerCase().includes("defi")) {
          results = baseDefiProjects
        } else if (searchQuery.toLowerCase().includes("nft")) {
          results = baseNftProjects
        } else {
          results = [...baseDefiProjects.slice(0, 2), ...baseNftProjects.slice(0, 2)]
        }
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
              Blockchain Explorer
            </h1>
            <p className="text-gray-400 mt-2">
              Discover projects and insights across different blockchains using natural language
            </p>
          </motion.div>

          {/* Chain Selector */}
          <div className="mb-6">
            <Tabs defaultValue="solana" value={selectedChain} onValueChange={setSelectedChain} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                <TabsTrigger
                  value="solana"
                  className="data-[state=active]:bg-gradient-to-r from-[#3B82F6]/20 to-[#A855F7]/20"
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] mr-2"></div>
                    Solana
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="base"
                  className="data-[state=active]:bg-gradient-to-r from-[#3B82F6]/20 to-[#A855F7]/20"
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    Base
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Guided Mode Toggle */}
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center space-x-2">
              <Switch id="guided-mode" checked={isGuidedMode} onCheckedChange={setIsGuidedMode} />
              <Label htmlFor="guided-mode" className="text-sm text-gray-300">
                Guided Mode
              </Label>
              <Info className="h-4 w-4 text-gray-500 cursor-help" title="Get beginner-friendly recommendations" />
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="relative mb-8">
              <Input
                type="text"
                placeholder={
                  isGuidedMode ? "Try: Show me Solana DeFi projects" : "Search projects, tokens, or addresses..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 pr-24"
              />
              <Button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-0 top-0 h-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2"></div>
                    Searching
                  </div>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" /> Search
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Guided Suggestions */}
          {isGuidedMode && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium mb-3">Try these searches:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {guidedSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start border-gray-700 bg-gray-800/50 hover:bg-gray-800"
                    onClick={() => setSearchQuery(suggestion.query)}
                  >
                    <Zap className="h-4 w-4 mr-2 text-blue-400" />
                    {suggestion.query}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="transition-all duration-300"
    >
      <Card className="bg-gray-800/50 border-gray-700 overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-gray-400">{project.category}</CardDescription>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              {project.chain === "solana" ? (
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7]"></div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-gray-300 mb-3">{project.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {project.tags.map((tag: string, i: number) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 h-8 w-8"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const guidedSuggestions = [
  { query: "Show me Solana DeFi projects" },
  { query: "Find Base NFT marketplaces" },
  { query: "Top gaming projects on Solana" },
  { query: "New projects on Base" },
]

const solanaDefiProjects = [
  {
    name: "Jupiter",
    category: "DEX Aggregator",
    chain: "solana",
    description: "Leading Solana DEX aggregator with the best prices across all major liquidity sources.",
    tags: ["DEX", "Swap"],
  },
  {
    name: "Marinade Finance",
    category: "Liquid Staking",
    chain: "solana",
    description: "Liquid staking solution that lets you earn staking rewards while maintaining liquidity.",
    tags: ["Staking", "Yield"],
  },
  {
    name: "Kamino Finance",
    category: "Yield Farming",
    chain: "solana",
    description: "Automated concentrated liquidity manager for efficient yield generation.",
    tags: ["Yield", "Liquidity"],
  },
  {
    name: "Drift Protocol",
    category: "Derivatives",
    chain: "solana",
    description: "Decentralized exchange for perpetual futures trading with up to 10x leverage.",
    tags: ["Perpetuals", "Trading"],
  },
]

const solanaNftProjects = [
  {
    name: "Magic Eden",
    category: "NFT Marketplace",
    chain: "solana",
    description: "Leading NFT marketplace on Solana with the largest collection of digital collectibles.",
    tags: ["Marketplace", "NFT"],
  },
  {
    name: "Tensor",
    category: "NFT Trading",
    chain: "solana",
    description: "Advanced NFT trading platform with real-time analytics and portfolio management.",
    tags: ["Trading", "Analytics"],
  },
]

const baseDefiProjects = [
  {
    name: "Aerodrome",
    category: "DEX",
    chain: "base",
    description: "Decentralized exchange on Base with vote-escrowed tokenomics and deep liquidity.",
    tags: ["DEX", "Swap"],
  },
  {
    name: "BaseSwap",
    category: "DEX",
    chain: "base",
    description: "Multi-chain DEX with a focus on the Base ecosystem and cross-chain swaps.",
    tags: ["DEX", "Swap"],
  },
]

const baseNftProjects = [
  {
    name: "Base Punks",
    category: "NFT Collection",
    chain: "base",
    description: "Iconic pixel art collection on the Base blockchain with unique traits and rarity.",
    tags: ["Collection", "Art"],
  },
  {
    name: "Mint Square",
    category: "NFT Marketplace",
    chain: "base",
    description: "Curated NFT marketplace on Base focusing on digital art and collectibles.",
    tags: ["Marketplace", "Curation"],
  },
]
