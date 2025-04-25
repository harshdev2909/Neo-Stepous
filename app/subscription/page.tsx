"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CreditCard, Wallet, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SubscriptionManagement() {
  const [selectedDays, setSelectedDays] = useState(7)
  const [activeSubscription, setActiveSubscription] = useState<null | { days: number; remaining: number }>(null)

  const handleDaysChange = (value: number[]) => {
    setSelectedDays(value[0])
  }

  const handlePurchase = () => {
    // Simulate subscription purchase
    setActiveSubscription({
      days: selectedDays,
      remaining: selectedDays,
    })
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
            Subscription Management
          </h1>
          <p className="text-gray-400 mt-2">Flexible pay-per-day subscriptions for maximum control</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Active Subscription */}
          {activeSubscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
                <CardHeader className="relative">
                  <CardTitle>Active Subscription</CardTitle>
                  <CardDescription className="text-gray-400">Your current subscription status</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Subscription Plan</p>
                      <p className="text-xl font-bold">{activeSubscription.days}-Day Access</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Days Remaining</p>
                      <p className="text-xl font-bold">{activeSubscription.remaining} days</p>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]"
                      onClick={() => setSelectedDays(7)}
                    >
                      Extend Subscription
                    </Button>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          ((activeSubscription.days - activeSubscription.remaining) / activeSubscription.days) * 100,
                        )}
                        % used
                      </span>
                    </div>
                    <Progress
                      value={((activeSubscription.days - activeSubscription.remaining) / activeSubscription.days) * 100}
                      className="h-2 bg-gray-800"
                      indicatorClassName="bg-gradient-to-r from-[#3B82F6] to-[#A855F7]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Subscription Plans */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Choose Your Subscription</h2>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
              <CardHeader className="relative">
                <CardTitle>Pay-Per-Day Subscription</CardTitle>
                <CardDescription className="text-gray-400">
                  Select the number of days you want to subscribe for
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">1 Day</span>
                    <span className="text-sm text-gray-400">30 Days</span>
                  </div>
                  <Slider
                    defaultValue={[7]}
                    max={30}
                    min={1}
                    step={1}
                    value={[selectedDays]}
                    onValueChange={handleDaysChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold">{selectedDays}</span>
                      <span className="text-gray-400 ml-2">days</span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold">${(selectedDays * 0.99).toFixed(2)}</span>
                      <span className="text-gray-400 ml-2">USD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-400" />
                    What's included:
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]">
                      Purchase {selectedDays}-Day Subscription
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Complete Your Purchase</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Choose your preferred payment method
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="crypto" className="mt-4">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                        <TabsTrigger
                          value="crypto"
                          className="data-[state=active]:bg-gradient-to-r from-[#3B82F6]/20 to-[#A855F7]/20"
                        >
                          <Wallet className="h-4 w-4 mr-2" /> Crypto
                        </TabsTrigger>
                        <TabsTrigger
                          value="card"
                          className="data-[state=active]:bg-gradient-to-r from-[#3B82F6]/20 to-[#A855F7]/20"
                        >
                          <CreditCard className="h-4 w-4 mr-2" /> Card
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="crypto" className="mt-4 space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="border-gray-700 bg-gray-800/50 hover:bg-gray-800">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] mr-2"></div>
                              Solana
                            </Button>
                            <Button variant="outline" className="border-gray-700 bg-gray-800/50 hover:bg-gray-800">
                              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                              Base
                            </Button>
                          </div>
                          <div className="p-4 bg-gray-800 rounded-lg text-center">
                            <p className="text-sm text-gray-400 mb-2">Send exactly</p>
                            <p className="text-xl font-bold">{(selectedDays * 0.05).toFixed(2)} SOL</p>
                            <p className="text-xs text-gray-500 mt-1">≈ ${(selectedDays * 0.99).toFixed(2)} USD</p>
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7]"
                            onClick={handlePurchase}
                          >
                            Complete Purchase
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="card" className="mt-4 space-y-4">
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-800 rounded-lg">
                            <p className="text-sm text-gray-400 mb-2">Credit card payment coming soon</p>
                            <p className="text-xs text-gray-500">
                              We're currently working on integrating credit card payments. Please use crypto for now.
                            </p>
                          </div>
                          <Button disabled className="w-full">
                            Coming Soon
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Popular Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularPlans.map((plan, index) => (
                <PlanCard key={index} plan={plan} index={index} onSelect={() => setSelectedDays(plan.days)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function PlanCard({ plan, index, onSelect }: { plan: any; index: number; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="transition-all duration-300"
    >
      <Card
        className={`h-full border-gray-800 overflow-hidden ${plan.popular ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30" : "bg-gray-900"}`}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
          </div>
        )}
        <CardHeader className="relative">
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription className="text-gray-400">{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="mb-4">
            <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
            <span className="text-gray-400 ml-2">USD</span>
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="relative">
          <Button
            className={`w-full ${
              plan.popular
                ? "bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA]"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={onSelect}
          >
            Select Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const features = [
  "Full access to NeoStepous AI chat interface",
  "Real-time market insights and analytics",
  "Blockchain explorer with natural language search",
  "Contract verification and trading tools",
  "Priority customer support",
]

const popularPlans = [
  {
    name: "Weekend Pass",
    days: 3,
    price: 2.97,
    description: "Perfect for weekend trading sessions",
    popular: false,
    features: ["3 days of full platform access", "All premium features included", "Weekend market analysis"],
  },
  {
    name: "Weekly Access",
    days: 7,
    price: 6.93,
    description: "Our most popular subscription option",
    popular: true,
    features: [
      "7 days of full platform access",
      "All premium features included",
      "Weekly market reports",
      "Trading signals",
    ],
  },
  {
    name: "Monthly Premium",
    days: 30,
    price: 29.7,
    description: "Best value for active traders",
    popular: false,
    features: [
      "30 days of full platform access",
      "All premium features included",
      "Monthly market deep dives",
      "Trading signals",
      "1-on-1 strategy session",
    ],
  },
]
