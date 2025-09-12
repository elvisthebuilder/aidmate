'use client'

import { useState, useEffect, useRef } from 'react'
import DockSidebar from '@/components/DockSidebar'
import MobileMenu from '@/components/MobileMenu'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import AuthModal from '@/components/AuthModal'
import HealthAvatar from '@/components/HealthAvatar'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dockExpanded, setDockExpanded] = useState(false)
  const [fullSidebar, setFullSidebar] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

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
    <div className="h-screen bg-gradient-to-br from-navy-50 via-white to-navy-100 flex overflow-hidden relative">
      {/* Header */}
<div
  className="
    bg-gray-50/60 backdrop-blur-sm w-full h-16 flex items-center justify-between 
    px-6 sm:px-8 border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-30
    md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none
  "
>      {/* Side Panel Menu - Fixed to left edge (mobile only) */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-3 left-4 z-40 p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/30 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
      
      {/* Theme Toggle - Fixed to screen edge (desktop only) */}
      <button className="hidden lg:block fixed top-3 right-32 z-40 p-2.5 bg-white/30 backdrop-blur-xl hover:bg-white/40 text-gray-600 hover:text-gray-900 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
      
      {/* Sign In Button - Fixed to screen edge */}
      <button onClick={() => setShowAuth(true)} className="fixed top-3 right-4 z-40 px-6 py-2.5 bg-navy-600 hover:bg-navy-700 text-white rounded-2xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
        Sign In
      </button>
      </div>
      <DockSidebar 
        dockExpanded={dockExpanded}
        setDockExpanded={setDockExpanded}
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm">
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-12 space-y-4  scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {messages.length === 0 && (
            <div className="text-center py-3">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-navy-600 to-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <HealthAvatar className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className=" text-lg md:text-3xl font-light text-gray-900 mb-4">Welcome to AidMate</h2>
              <p className="text-sm md:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                Your intelligent health companion. Ask me anything about symptoms, treatments, or general health guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <button className="px-4 py-2 bg-white/40 hover:bg-white/60 rounded-2xl text-sm font-medium text-gray-700 transition-all duration-200">
                  💊 Medications
                </button>
                <button className="px-4 py-2 bg-white/40 hover:bg-white/60 rounded-2xl text-sm font-medium text-gray-700 transition-all duration-200">
                  🤒 Symptoms
                </button>
                <button className="px-4 py-2 bg-white/40 hover:bg-white/60 rounded-2xl text-sm font-medium text-gray-700 transition-all duration-200">
                  🚨 First Aid
                </button>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="w-full">
                  <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl border border-navy-500/20">
                      <HealthAvatar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-gray-800 leading-relaxed min-w-0 flex-1">
                      <MarkdownRenderer content={message.content} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 ml-16">
                    <button 
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(message.content)
                          console.log('✅ Message copied to clipboard')
                        } catch (err) {
                          console.error('❌ Failed to copy message:', err)
                        }
                      }} 
                      className="p-2 text-navy-400 hover:text-navy-600 hover:bg-white/40 rounded-xl transition-all duration-200"
                      title="Copy message"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button 
                      onClick={async () => {
                        const shareData = {
                          title: 'AidMate Health Response',
                          text: message.content
                        }
                        
                        if (navigator.share) {
                          try {
                            await navigator.share(shareData)
                            console.log('✅ Message shared successfully')
                          } catch (err) {
                            console.log('❌ Share cancelled or failed:', err)
                          }
                        } else if (navigator.clipboard) {
                          try {
                            await navigator.clipboard.writeText(message.content)
                            console.log('✅ Message copied for sharing')
                          } catch (err) {
                            console.error('❌ Failed to copy for sharing:', err)
                          }
                        } else {
                          console.log('❌ Share and clipboard not supported')
                        }
                      }}
                      className="p-2 text-navy-400 hover:text-navy-600 hover:bg-white/40 rounded-xl transition-all duration-200"
                      title="Share message"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                    <button 
                      onClick={async () => {
                        const lastUserMessage = messages.slice(0, index).reverse().find(m => m.role === 'user')
                        if (lastUserMessage && !isLoading) {
                          setMessages(prev => prev.slice(0, index))
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
                      }} 
                      disabled={isLoading}
                      className="p-2 text-navy-400 hover:text-navy-600 hover:bg-white/40 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Regenerate response"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {message.role === 'user' && (
                <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900 text-white rounded-2xl rounded-br-md px-5 py-4 max-w-lg shadow-xl border border-navy-500/20 backdrop-blur-sm">
                  {message.content}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                <HealthAvatar className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white/30">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="bg-white/30 backdrop-blur-2xl m-auto md:w-5/6 w-full border border-white/40 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col -space-y-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask me about your health concerns..."
                className="w-full bg-transparent border-none focus:outline-none resize-none text-gray-900 placeholder-gray-500 text-base sm:text-lg leading-relaxed overflow-y-auto min-h-[60px] max-h-[300px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-white/30 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-white/30 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-navy-600 to-navy-900 hover:from-navy-700 hover:to-navy-900 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center flex-shrink-0"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Medical Disclaimer */}
        <div className="px-6 sm:px-8 pb-6">
          <div className="text-center text-xs text-gray-500 md:bg-transparent bg-white/20 rounded-2xl px-4 py-2">
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