'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dockExpanded, setDockExpanded] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (message.toLowerCase().includes('emergency')) {
      return `🚨 Emergency Response\n\nIf this is a life-threatening emergency, call 911 immediately.\n\nFor "${message}":\n• Assess the situation\n• Check responsiveness\n• Call for help\n• Provide basic care\n\nThis is general guidance. Always seek professional medical help for emergencies.`
    }
    
    return `Thank you for your question about "${message}". I'm here to help with health guidance and first aid information.\n\nPlease remember that I provide general information only and cannot replace professional medical advice. If you're experiencing a medical emergency, please call 911 immediately.\n\nHow can I assist you further?`
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-navy-50 via-white to-navy-100 flex overflow-hidden">
      {/* Dock Sidebar */}
      <div className={`hidden fixed left-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out ${dockExpanded ? 'w-72' : 'w-14'}`}>
        <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
          {!dockExpanded ? (
            <div className="p-3 space-y-3">
              <div className="w-8 h-8 bg-navy-600 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <button onClick={() => setDockExpanded(true)} className="w-8 h-8 bg-navy-500/15 hover:bg-navy-500/25 rounded-2xl flex items-center justify-center transition-all duration-200 group">
                <svg className="w-4 h-4 text-navy-700 group-hover:text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-light text-gray-900">AidMate</span>
                <button onClick={() => setDockExpanded(false)} className="w-8 h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 bg-teal-500/10 hover:bg-teal-500/20 rounded-xl transition-colors">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">Chat</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-700/50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm">Dashboard</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-700/50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm">Discover</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-500/20 rounded-xl transition-colors">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-red-400">Emergency</span>
                </button>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-700/50 rounded-xl transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Health Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-sm">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button onClick={() => setShowAuth(true)} className="px-6 py-2.5 bg-navy-600 hover:bg-navy-700 text-white rounded-2xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
            Sign In
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-3">
              <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Welcome to AidMate</h2>
              <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
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
                <div className="flex items-start space-x-4 max-w-3xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-navy-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl rounded-tl-md px-4 py-3 shadow-xl">
                    <div className="text-gray-900 whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              )}
              
              {message.role === 'user' && (
                <div className="bg-gradient-to-r from-navy-600 to-navy-900 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-lg shadow-xl">
                  {message.content}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl rounded-tl-md px-4 py-3 shadow-xl">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  <span className="text-gray-400 text-sm ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="bg-white/30 backdrop-blur-2xl w-full border border-white/40 rounded-[100px] shadow-2xl p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-white/30 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-white/30 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask me about your health concerns..."
                className="flex-1 bg-transparent border-none focus:outline-none resize-none text-gray-900 placeholder-gray-500 text-base sm:text-lg leading-relaxed max-h-32"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                rows={1}
              />
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
        
        {/* Medical Disclaimer */}
        <div className="px-6 sm:px-8 pb-6">
          <div className="text-center text-xs text-gray-500 bg-white/20 rounded-2xl px-4 py-2">
            🚨 For medical emergencies, call 911 immediately • AI responses are for informational purposes only
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white/30 backdrop-blur-2xl border-r border-white/40 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-navy-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-900">AidMate</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 bg-white/30 hover:bg-white/40 rounded-2xl flex items-center justify-center transition-all duration-200">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-4 px-4 py-3 bg-navy-500/10 hover:bg-navy-500/15 rounded-2xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium text-gray-800">Chat</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 hover:bg-white/25 rounded-2xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-gray-800">Dashboard</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 hover:bg-white/25 rounded-2xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-gray-800">Discover</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 hover:bg-red-500/10 rounded-2xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-red-600 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-medium text-red-600 group-hover:text-red-700">Emergency</span>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-white/30">
                <button className="w-full flex items-center space-x-4 px-4 py-3 hover:bg-white/25 rounded-2xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium text-gray-700 group-hover:text-gray-800">Health Records</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Sign In</h3>
              <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
              <input type="password" placeholder="Password" className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500" />
              <button className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white py-3 rounded-xl transition-all duration-200">
                Sign In
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors border border-gray-600/50">
                Continue with Google
              </button>
              <p className="text-center text-sm text-gray-400">
                Don't have an account? <button className="text-teal-400 hover:text-teal-300">Sign up</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}