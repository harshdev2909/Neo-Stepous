"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart2, TrendingUp, Filter, Settings, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import MarketTrendsChart from "@/components/market-trends-chart"

export default function MarketInsightsDashboard() {
  const [selectedChain, setSelectedChain] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
              Market Insights Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Real-time analytics and AI-powered market predictions</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Chain" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Chains</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="nft">NFT</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-gray-700 bg-gray-800">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>

            <Button className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]">
              <Settings className="h-4 w-4 mr-2" /> Customize
            </Button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MarketCard
            title="Market Sentiment"
            value="Bullish"
            change="+5.2%"
            isPositive={true}
            description="Overall market sentiment is positive in the last 24h"
            icon={<TrendingUp className="h-5 w-5" />}
          />

          <MarketCard
            title="Total Market Cap"
            value="$2.34T"
            change="+1.8%"
            isPositive={true}
            description="Global crypto market capitalization"
            icon={<BarChart2 className="h-5 w-5" />}
          />

          <MarketCard
            title="24h Volume"
            value="$86.5B"
            change="-3.1%"
            isPositive={false}
            description="Total trading volume across all markets"
            icon={<BarChart2 className="h-5 w-5" />}
          />
        </div>

        {/* Tabs for different insights */}
        <Tabs defaultValue="trends" className="mb-8">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="kol">KOL Rankings</TabsTrigger>
            <TabsTrigger value="projects">Project Rankings</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription className="text-gray-400">7-day price movement for top assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <MarketTrendsChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kol" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>KOL Rankings</CardTitle>
                <CardDescription className="text-gray-400">
                  Top Key Opinion Leaders in crypto by influence score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kolRankings.map((kol, index) => (
                    <motion.div
                      key={kol.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{kol.name}</h4>
                          <p className="text-sm text-gray-400">{kol.platform}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{kol.score}</div>
                        <div className={`text-sm ${kol.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {kol.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Project Rankings</CardTitle>
                <CardDescription className="text-gray-400">
                  Top blockchain projects by performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectRankings.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-gray-400">{project.chain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{project.price}</div>
                        <div
                          className={`text-sm ${project.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                        >
                          {project.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MarketCard({ title, value, change, isPositive, description, icon }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="transition-all duration-300"
    >
      <Card className="bg-gray-900 border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">{icon}</div>
          </div>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold">{value}</div>
            <div className={`flex items-center ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {change}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const kolRankings = [
  { id: 1, name: "Crypto Guru", platform: "Twitter", score: "98/100", change: "+2" },
  { id: 2, name: "Blockchain Insider", platform: "YouTube", score: "95/100", change: "+5" },
  { id: 3, name: "DeFi Expert", platform: "Twitter", score: "92/100", change: "-1" },
  { id: 4, name: "Token Analyst", platform: "Substack", score: "89/100", change: "+3" },
  { id: 5, name: "NFT Collector", platform: "Instagram", score: "86/100", change: "-2" },
]

const projectRankings = [
  { id: 1, name: "Jupiter", chain: "Solana", price: "$1.24", change: "+15.4%" },
  { id: 2, name: "Marinade Finance", chain: "Solana", price: "$0.87", change: "+8.2%" },
  { id: 3, name: "Base Bridge", chain: "Base", price: "$3.45", change: "+5.7%" },
  { id: 4, name: "Kamino Finance", chain: "Solana", price: "$2.18", change: "-2.3%" },
  { id: 5, name: "Aerodrome", chain: "Base", price: "$1.56", change: "+4.1%" },
]
