"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Menu, X, Plus, History, Settings, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useMobile } from "@/hooks/use-mobile"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm NeoStepous AI. How can I assist you with crypto and AI today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("swap") || input.toLowerCase().includes("exchange")) {
        response =
          "I can help you swap tokens. Based on current market rates, 1 ETH is approximately 3,450 USDC. Would you like to proceed with this swap?"
      } else if (input.toLowerCase().includes("market") || input.toLowerCase().includes("price")) {
        response =
          "The current market is showing a bullish trend for ETH and SOL. BTC is consolidating around $60,000. Would you like more detailed market insights?"
      } else if (input.toLowerCase().includes("project") || input.toLowerCase().includes("solana")) {
        response =
          "There are several promising Solana projects in the DeFi space. The top performers this week are Jupiter, Marinade Finance, and Kamino Finance. Would you like to explore any of these?"
      } else {
        response =
          "I understand you're interested in crypto and AI. Could you provide more details about what you'd like to know or do?"
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-[#1A1A1A] text-white overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 z-50 md:relative"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="font-bold text-lg bg-gradient-to-r from-[#3B82F6] to-[#A855F7] bg-clip-text text-transparent">
                NeoStepous AI
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start mb-4 bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 border-gray-700"
              >
                <Plus className="mr-2 h-4 w-4" /> New Chat
              </Button>

              <Separator className="my-4 bg-gray-800" />

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <History className="mr-2 h-4 w-4" /> View History
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="p-4 border-b border-gray-800 flex items-center">
          {!sidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <h1 className="font-bold">Chat with NeoStepous AI</h1>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 rounded-lg flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-gray-800">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crypto, AI, or trading..."
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-[#3B82F6] to-[#A855F7] hover:from-[#2563EB] hover:to-[#9333EA] transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
