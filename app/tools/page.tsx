"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TradingTools() {
  const [contractAddress, setContractAddress] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    status: "safe" | "warning" | "danger"
    name: string
    details: string
  }>(null)

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contractAddress.trim()) return

    setIsVerifying(true)
    setVerificationResult(null)

    // Simulate verification process
    setTimeout(() => {
      // Mock verification logic based on input
      let result
      if (contractAddress.toLowerCase().includes("safe")) {
        result = {
          status: "safe",
          name: "SafeToken",
          details: "Verified contract with audits by CertiK and Hacken. No suspicious functions detected.",
        }
      } else if (contractAddress.toLowerCase().includes("warn")) {
        result = {
          status: "warning",
          name: "WarnToken",
          details: "Contract has unusual functions that could potentially be used maliciously. Exercise caution.",
        }
      } else if (contractAddress.toLowerCase().includes("scam")) {
        result = {
          status: "danger",
          name: "ScamToken",
          details: "High-risk contract with known malicious functions. Avoid interaction.",
        }
      } else {
        // Default to random result for demo purposes
        const statuses = ["safe", "warning", "danger"] as const
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        const names = ["RandomToken", "CryptoProject", "NewLaunch", "MoonCoin"]
        const randomName = names[Math.floor(Math.random() * names.length)]

        let details = ""
        if (randomStatus === "safe") {
          details = "Contract verified with no suspicious functions detected."
        } else if (randomStatus === "warning") {
          details = "Contract has some unusual functions. Exercise caution."
        } else {
          details = "High-risk contract with potential malicious functions. Avoid interaction."
        }

        result = {
          status: randomStatus,
          name: randomName,
          details,
        }
      }

      setVerificationResult(result as any)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
            Trading & Verification Tools
          </h1>
          <p className="text-gray-400 mt-2">Verify contracts, execute trades, and monitor your portfolio</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="verify" className="mb-8">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="verify">Contract Verification</TabsTrigger>
              <TabsTrigger value="trade">Quick Trade</TabsTrigger>
              <TabsTrigger value="history">Trade History</TabsTrigger>
            </TabsList>

            <TabsContent value="verify" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Verify Contract Address</CardTitle>
                  <CardDescription className="text-gray-400">
                    Check if a contract is safe before interacting with it
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVerify} className="space-y-6">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter contract address or token name..."
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                      <Button
                        type="submit"
                        disabled={isVerifying || !contractAddress.trim()}
                        className="absolute right-0 top-0 h-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]"
                      >
                        {isVerifying ? (
                          <div className="flex items-center">
                            <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2"></div>
                            Verifying
                          </div>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" /> Verify
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-sm text-gray-400">
                      <p>Try these examples:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>
                          <button
                            type="button"
                            className="text-blue-400 hover:underline"
                            onClick={() => setContractAddress("0x1234...safe")}
                          >
                            0x1234...safe
                          </button>{" "}
                          (Safe contract)
                        </li>
                        <li>
                          <button
                            type="button"
                            className="text-blue-400 hover:underline"
                            onClick={() => setContractAddress("0x5678...warn")}
                          >
                            0x5678...warn
                          </button>{" "}
                          (Warning contract)
                        </li>
                        <li>
                          <button
                            type="button"
                            className="text-blue-400 hover:underline"
                            onClick={() => setContractAddress("0x9012...scam")}
                          >
                            0x9012...scam
                          </button>{" "}
                          (Dangerous contract)
                        </li>
                      </ul>
                    </div>

                    {verificationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-lg border ${
                          verificationResult.status === "safe"
                            ? "bg-green-900/20 border-green-700"
                            : verificationResult.status === "warning"
                              ? "bg-yellow-900/20 border-yellow-700"
                              : "bg-red-900/20 border-red-700"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            {verificationResult.status === "safe" ? (
                              <CheckCircle className="h-6 w-6 text-green-400" />
                            ) : verificationResult.status === "warning" ? (
                              <AlertTriangle className="h-6 w-6 text-yellow-400" />
                            ) : (
                              <AlertTriangle className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">
                              {verificationResult.status === "safe"
                                ? "Verified: Safe"
                                : verificationResult.status === "warning"
                                  ? "Warning: Exercise Caution"
                                  : "Danger: Avoid Interaction"}
                            </h3>
                            <p className="text-gray-300 mb-2">
                              <span className="font-medium">Contract Name:</span> {verificationResult.name}
                            </p>
                            <p className="text-gray-300">{verificationResult.details}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trade" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Quick Trade</CardTitle>
                  <CardDescription className="text-gray-400">
                    Quickly buy or sell tokens on Solana and Base DEXs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <QuickTradeCard
                      title="Solana DEX"
                      tokens={[
                        { symbol: "SOL", name: "Solana", price: 125.42, change: "+3.2%" },
                        { symbol: "JUP", name: "Jupiter", price: 1.24, change: "+15.4%" },
                        { symbol: "BONK", name: "Bonk", price: 0.00002341, change: "-2.1%" },
                      ]}
                    />
                    <QuickTradeCard
                      title="Base DEX"
                      tokens={[
                        { symbol: "ETH", name: "Ethereum", price: 3450.18, change: "+1.8%" },
                        { symbol: "AERO", name: "Aerodrome", price: 1.56, change: "+4.1%" },
                        { symbol: "BSWAP", name: "BaseSwap", price: 0.87, change: "-0.5%" },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Trade History</CardTitle>
                  <CardDescription className="text-gray-400">View your recent trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-gray-800 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-800">
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tradeHistory.map((trade, index) => (
                          <TableRow key={index} className="border-gray-800">
                            <TableCell className="font-medium">{trade.asset}</TableCell>
                            <TableCell className={trade.type === "Buy" ? "text-green-400" : "text-red-400"}>
                              {trade.type}
                            </TableCell>
                            <TableCell>{trade.amount}</TableCell>
                            <TableCell>${trade.price}</TableCell>
                            <TableCell>{trade.date}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  trade.status === "Completed"
                                    ? "bg-green-900/30 text-green-400"
                                    : trade.status === "Pending"
                                      ? "bg-yellow-900/30 text-yellow-400"
                                      : "bg-red-900/30 text-red-400"
                                }`}
                              >
                                {trade.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function QuickTradeCard({ title, tokens }: { title: string; tokens: any[] }) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-900 border border-gray-700"
            >
              <div>
                <div className="font-medium">{token.symbol}</div>
                <div className="text-xs text-gray-400">{token.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.price}</div>
                <div
                  className={`text-xs flex items-center ${
                    token.change.startsWith("+") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {token.change.startsWith("+") ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {token.change}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8 px-3">
                  Buy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-900/20 h-8 px-3"
                >
                  Sell
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const tradeHistory = [
  {
    asset: "SOL",
    type: "Buy",
    amount: "2.5 SOL",
    price: "125.42",
    date: "2023-04-25 14:32",
    status: "Completed",
  },
  {
    asset: "JUP",
    type: "Buy",
    amount: "100 JUP",
    price: "1.24",
    date: "2023-04-24 09:15",
    status: "Completed",
  },
  {
    asset: "ETH",
    type: "Sell",
    amount: "0.5 ETH",
    price: "3450.18",
    date: "2023-04-23 18:45",
    status: "Completed",
  },
  {
    asset: "BONK",
    type: "Buy",
    amount: "1,000,000 BONK",
    price: "0.00002341",
    date: "2023-04-22 11:20",
    status: "Pending",
  },
  {
    asset: "AERO",
    type: "Sell",
    amount: "50 AERO",
    price: "1.56",
    date: "2023-04-21 15:10",
    status: "Failed",
  },
]
