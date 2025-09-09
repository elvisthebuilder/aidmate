'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { marked } from 'marked'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session) {
          setUser(session.user)
        }
      }
    })
    
    // Check for message parameter from landing page
    const urlParams = new URLSearchParams(window.location.search)
    const messageParam = urlParams.get('message')
    if (messageParam) {
      setInput(messageParam)
      // Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname)
    }
    
    return () => subscription.unsubscribe()
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
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateResponse = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (message.toLowerCase().includes('emergency')) {
      return `## Emergency Response

If this is a life-threatening emergency, **call 911 immediately**.

For your query about "${message}", here's what you should know:

1. **Assess the situation** - Ensure the area is safe
2. **Check responsiveness** - Try to get a response from the person
3. **Call for help** - Don't hesitate to call emergency services
4. **Provide basic care** - Follow basic first aid principles

Remember: This is general guidance. Always seek professional medical help for emergencies.`
    }
    
    return `Thank you for your question about "${message}". I'm here to help with health guidance and first aid information. 

Please remember that I provide general information only and cannot replace professional medical advice. If you're experiencing a medical emergency, please call 911 immediately.

How can I assist you further with your health concerns?`
  }

  const showHealthDashboard = () => {
    if (!user) {
      setShowAuth(true)
      return
    }
    // Health dashboard logic here
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-lg shadow-md md:hidden"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`floating-dock ${sidebarExpanded ? 'expanded' : ''} ${mobileMenuOpen ? 'mobile-open' : ''} hidden md:block transition-transform duration-300`}>
        {/* Dock Icons (collapsed state) */}
        <div className="dock-icons">
          <button 
            onClick={() => setSidebarExpanded(true)}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-colors"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-colors">
            <i className="fas fa-plus text-sm"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-colors">
            <i className="fas fa-compass text-sm"></i>
          </button>
          <button 
            onClick={showHealthDashboard}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-colors"
          >
            <i className="fas fa-chart-line text-sm"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-colors">
            <i className="fas fa-first-aid text-sm"></i>
          </button>
        </div>
        
        {/* Dock Content (expanded state) */}
        <div className="dock-content flex flex-col h-full opacity-0 pointer-events-none">
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold text-lg">AidMate</span>
              <button 
                onClick={() => setSidebarExpanded(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 w-full transition-colors">
              <i className="fas fa-plus text-xs"></i>
              <span>New chat</span>
            </button>
            
            <div className="mt-4 space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors">
                <i className="fas fa-compass text-gray-400"></i>
                <span>Discover</span>
              </button>
              <button 
                onClick={showHealthDashboard}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
              >
                <i className="fas fa-chart-line text-gray-400"></i>
                <span>Health Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors">
                <i className="fas fa-first-aid text-gray-400"></i>
                <span>Emergency Guide</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3">
            <div className="text-center py-8">
              <p className="text-sm text-gray-400">No conversations yet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`floating-dock ${mobileMenuOpen ? 'mobile-open' : ''} md:hidden`}>
        <div className="dock-content flex flex-col h-full opacity-100 pointer-events-auto">
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold text-lg">AidMate</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 w-full transition-colors">
              <i className="fas fa-plus text-xs"></i>
              <span>New chat</span>
            </button>
            
            <div className="mt-4 space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors">
                <i className="fas fa-compass text-gray-400"></i>
                <span>Discover</span>
              </button>
              <button 
                onClick={showHealthDashboard}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
              >
                <i className="fas fa-chart-line text-gray-400"></i>
                <span>Health Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md transition-colors">
                <i className="fas fa-first-aid text-gray-400"></i>
                <span>Emergency Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Health Assistant</h1>
            {!user && (
              <button 
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heartbeat text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Welcome to AidMate</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your AI health assistant for medical guidance and first aid support.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="flex items-start space-x-4 max-w-4xl">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-heartbeat text-white text-sm"></i>
                  </div>
                  <div 
                    className="prose prose-sm max-w-none text-gray-900 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                  />
                </div>
              )}
              
              {message.role === 'user' && (
                <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-lg">
                  {message.content}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <i className="fas fa-heartbeat text-white text-sm animate-pulse"></i>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Message AidMate..."
                className="w-full px-4 py-4 pr-12 bg-transparent border-none focus:outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500"
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full"
              >
                <i className="fas fa-arrow-up text-sm"></i>
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-gray-500">
              For emergencies, call 911 immediately
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sign In Required</h3>
              <button 
                onClick={() => setShowAuth(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please sign in to access the Health Dashboard and save your chat history.
            </p>
            <button 
              onClick={() => setShowAuth(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </div>
  )
}