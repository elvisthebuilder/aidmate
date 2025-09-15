'use client'

import { useState, useEffect, useRef } from 'react'
import DockSidebar from '@/components/DockSidebar'
import MobileMenu from '@/components/MobileMenu'
import AuthModal from '@/components/AuthModal'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import LoadingIndicator from '@/components/LoadingIndicator'
import HealthAvatar from '@/components/HealthAvatar'
import { useTheme } from '@/contexts/ThemeContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const { theme, toggleTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dockExpanded, setDockExpanded] = useState(false)
  const [fullSidebar, setFullSidebar] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const messageParam = urlParams.get('message')
    if (messageParam) {
      setInput(messageParam)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleRegenerate = async (messageIndex: number) => {
    const lastUserMessage = messages.slice(0, messageIndex).reverse().find(m => m.role === 'user')
    if (lastUserMessage && !isLoading) {
      setMessages(prev => prev.slice(0, messageIndex))
      setIsLoading(true)
      try {
        const aiResponse = await generateResponse(lastUserMessage.content)
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
      } catch (error) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const aiResponse = await generateResponse(userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateResponse = async (message: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      
      const data = await response.json()
      return data.message
    } catch (error) {
      return 'I apologize, but I encountered an error. Please try again.'
    }
  }

  return (
    <div className={`h-screen flex overflow-hidden relative transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-800 text-white' 
        : 'bg-gradient-to-br from-navy-50 via-white to-navy-100'
    }`}>
      {/* Header */}
<div className={`w-full h-16 flex items-center justify-between px-6 sm:px-8 fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
  theme === 'dark'
    ? 'bg-slate-800 backdrop-blur-sm border-b border-gray-700 shadow-sm md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none'
    : 'bg-gray-50/60 backdrop-blur-sm border-b border-gray-200 shadow-sm md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none'
}`}>      {/* Side Panel Menu - Fixed to left edge (mobile only) */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className={`lg:hidden fixed top-3 left-4 z-40 p-2 transition-colors backdrop-blur-xl rounded-lg shadow-lg hover:shadow-xl ${
          theme === 'dark'
            ? 'text-gray-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60'
            : 'text-gray-600 hover:text-gray-900 bg-white/30 hover:bg-white/40'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
      
      {/* Theme Toggle - Fixed to screen edge (desktop only) */}
      <button 
        onClick={toggleTheme}
        className={`hidden lg:block fixed top-3 right-32 z-40 p-2.5 backdrop-blur-xl rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
          theme === 'dark'
            ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white'
            : 'bg-white/30 hover:bg-white/40 text-gray-600 hover:text-gray-900'
        }`}
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      
      {/* Sign In Button - Fixed to screen edge */}
      <button onClick={() => setShowAuth(true)} className="fixed top-3 right-4 z-40 px-6 py-2.5 bg-navy-600  dark:bg-blue-600/60 hover:bg-navy-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
        Sign In
      </button>
      </div>
      <DockSidebar 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col max-w-6xl mx-auto w-full transition-all duration-500 ${
        fullSidebar ? 'lg:ml-80' : ''
      }`}>
        {/* Header */}
        <div className="px-6 sm:px-8 py-3">
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-6 sm:px-8 py-12 space-y-4 scrollbar-hide transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {messages.length === 0 && (
            <div className="text-center py-3">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-navy-600 to-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <HealthAvatar className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className={`text-lg md:text-3xl font-light mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>Welcome to AidMate</h2>
              <p className={`text-sm md:text-lg max-w-lg mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your intelligent health companion. Ask me anything about symptoms, treatments, or general health guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <button className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-700/70 text-gray-200 border-slate-600/30 hover:border-slate-500/50'
                    : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20 hover:border-white/40'
                }`}>
                  💊 Medications
                </button>
                <button className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-700/70 text-gray-200 border-slate-600/30 hover:border-slate-500/50'
                    : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20 hover:border-white/40'
                }`}>
                  🤒 Symptoms
                </button>
                <button className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-700/70 text-gray-200 border-slate-600/30 hover:border-slate-500/50'
                    : 'bg-white/40 hover:bg-white/60 text-gray-700 border-white/20 hover:border-white/40'
                }`}>
                  🚨 First Aid
                </button>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <ChatMessage 
                message={message}
                index={index}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
              />
            </div>
          ))}

          {isLoading && <LoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        <ChatInput 
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
        
        {/* Medical Disclaimer */}
        <div className="px-6 sm:px-8 pb-6">
          <div className={`text-center text-xs rounded-2xl px-4 py-2 transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-gray-400 md:bg-transparent bg-slate-800/30'
              : 'text-gray-500 md:bg-transparent bg-white/20'
          }`}>
            🚨 For medical emergencies, call 911 immediately • AI responses are for informational purposes only
          </div>
        </div>
      </div>

      <MobileMenu 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  )
}