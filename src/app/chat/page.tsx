'use client'

import { useState, useEffect, useRef } from 'react'
import DockSidebar from '@/components/DockSidebar'
import MobileMenu from '@/components/MobileMenu'
import AuthModal from '@/components/AuthModal'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import LoadingIndicator from '@/components/LoadingIndicator'
import HealthAvatar from '@/components/HealthAvatar'
import DiscoverView from '@/components/DiscoverView'
import HealthDashboard from '@/components/HealthDashboard'
import UserSettings from '@/components/UserSettings'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'

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
  const [currentView, setCurrentView] = useState<'chat' | 'discover'>('chat')
  const [showHealthDashboard, setShowHealthDashboard] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [recentChats, setRecentChats] = useState<any[]>([])
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const messageParam = urlParams.get('message')
    const chatIdParam = urlParams.get('id')
    
    if (messageParam) {
      setInput(messageParam)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
    
    if (chatIdParam) {
      // Load specific chat when ID is provided
      loadExistingChat(chatIdParam)
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Get initial user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setUserProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      setUserProfile(data)
      fetchRecentChats(userId)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchRecentChats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('id, user_message, created_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(10)
      
      if (error) {
        console.log('No chats found or table access issue:', error.message || 'Unknown error')
        setRecentChats([])
        return
      }
      
      setRecentChats(data || [])
    } catch (error) {
      console.log('Chat fetch failed, continuing without history')
      setRecentChats([])
    }
  }

  const generateChatTitle = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `Generate a short, descriptive title (max 4 words) for a health chat that starts with: "${userMessage}". Only return the title, nothing else.`
        }),
      })
      
      const data = await response.json()
      return data.message.replace(/["']/g, '').trim()
    } catch (error) {
      return userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : '')
    }
  }

  const createNewChat = async (userMessage: string, aiResponse: string) => {
    if (!user) return
    
    try {
      const chatId = crypto.randomUUID()
      
      const { data, error } = await supabase
        .from('chat_history')
        .insert({
          id: chatId,
          user_id: user.id,
          user_message: userMessage,
          ai_response: aiResponse,
          messages: JSON.stringify([
            { role: 'user', content: userMessage },
            { role: 'assistant', content: aiResponse }
          ])
        })
        .select('id, user_message, created_at')
        .single()
      
      if (error) {
        console.log('Chat not saved to database:', error.message || 'Database unavailable')
        return
      }
      
      if (data) {
        setCurrentChatId(chatId)
        setRecentChats(prev => [data, ...prev])
      }
    } catch (error) {
      console.log('Chat storage failed, continuing without saving')
    }
  }

  const startNewChat = () => {
    setMessages([])
    setCurrentChatId(null)
    setInput('')
  }

  const loadExistingChat = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('id', chatId)
        .single()
      
      if (error || !data) {
        console.log('Error loading chat:', error?.message)
        return
      }
      
      // Parse the messages JSON string
      const chatMessages = JSON.parse(data.messages || '[]')
      setMessages(chatMessages)
      setCurrentChatId(chatId)
      setCurrentView('chat') // Ensure we're in chat view when loading a chat
    } catch (error) {
      console.log('Failed to load chat:', error)
    }
  }

  const renameChat = async (chatId: string, newTitle: string) => {
    if (!user || !newTitle.trim()) return
    
    try {
      const { error } = await supabase
        .from('chat_history')
        .update({ user_message: newTitle.trim() })
        .eq('id', chatId)
        .eq('user_id', user.id)
      
      if (!error) {
        setRecentChats(prev => 
          prev.map(chat => 
            chat.id === chatId 
              ? { ...chat, user_message: newTitle.trim() }
              : chat
          )
        )
      }
    } catch (error) {
      console.log('Failed to rename chat:', error)
    }
  }

  const deleteChat = async (chatId: string) => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('id', chatId)
        .eq('user_id', user.id)
      
      if (!error) {
        setRecentChats(prev => prev.filter(chat => chat.id !== chatId))
        
        // If the deleted chat is currently active, start a new chat
        if (currentChatId === chatId) {
          startNewChat()
        }
      }
    } catch (error) {
      console.log('Failed to delete chat:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleClickOutside = () => setShowUserDropdown(false)
    if (showUserDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showUserDropdown])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

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
      
      // Create new chat if this is the first message
      if (messages.length === 0 && !currentChatId) {
        await createNewChat(userMessage, aiResponse)
      }
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
      {/* Header - Hidden when discover is active */}
      {currentView !== 'discover' && (
        <div className={`w-full h-16 fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-slate-800 backdrop-blur-sm border-b border-gray-700 shadow-sm md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none'
            : 'bg-gray-50/60 backdrop-blur-sm border-b border-gray-200 shadow-sm md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none'
        }`}>
          {/* Side Panel Menu - Fixed to left edge (mobile only) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden absolute top-3 left-4 z-40 p-2 transition-colors backdrop-blur-xl rounded-lg shadow-lg hover:shadow-xl ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60'
                : 'text-gray-600 hover:text-gray-900 bg-white/30 hover:bg-white/40'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          
          {/* User Profile / Sign In Button - Fixed to screen edge */}
          {user ? (
            <div className="absolute top-3 right-4 z-50">
              <div className={`flex items-center gap-3 font-medium cursor-pointer ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } md:px-4 md:py-2.5 md:rounded-lg md:backdrop-blur-xl md:shadow-lg ${
                theme === 'dark' ? 'md:bg-slate-800/50' : 'md:bg-white/30'
              }`} onClick={() => setShowUserDropdown(!showUserDropdown)}>
                <div className="w-10 h-10 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-base md:text-sm font-bold">
                  {((userProfile?.display_name || userProfile?.first_name || user.email?.split('@')[0] || 'User')
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase())}
                </div>
                <span className="hidden md:inline">
                  {userProfile?.display_name || userProfile?.first_name || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              
              {showUserDropdown && (
                <div className={`absolute right-0 top-14 w-72 rounded-xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/95 border-slate-600/50 shadow-black/20' 
                    : 'bg-white/95 border-gray-200/50 shadow-gray-900/10'
                }`}>
                  {/* Arrow */}
                  <div className={`absolute -top-2 right-6 w-4 h-4 rotate-45 border-l border-t ${
                    theme === 'dark' 
                      ? 'bg-slate-800/95 border-slate-600/50' 
                      : 'bg-white/95 border-gray-200/50'
                  }`}></div>
                  
                  <div className="p-5">
                    {/* User Info Section */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200/20">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {((userProfile?.display_name || userProfile?.first_name || user.email?.split('@')[0] || 'User')
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase())}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white transition-colors ${
                          isOnline ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-base truncate ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {userProfile?.display_name || userProfile?.first_name || 'User'}
                        </p>
                        <p className={`text-sm truncate ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`w-2 h-2 rounded-full transition-colors ${
                            isOnline ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}>{isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sign Out Button */}
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut()
                        setShowUserDropdown(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm rounded-lg transition-all duration-200 group ${
                        theme === 'dark'
                          ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300 hover:shadow-lg'
                          : 'hover:bg-red-50 text-red-600 hover:text-red-700 hover:shadow-md'
                      }`}
                    >
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="absolute top-3 right-4 z-50 px-6 py-2.5 bg-navy-600 dark:bg-blue-600/60 hover:bg-navy-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
              Sign In
            </button>
          )}
          
          {/* Theme Toggle - Fixed to screen edge (desktop only) */}
          <button 
            onClick={toggleTheme}
            className={`hidden lg:block absolute top-3 right-32 z-40 p-2.5 backdrop-blur-xl rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl ${
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
        </div>
      )}
      <DockSidebar 
        fullSidebar={fullSidebar}
        setFullSidebar={setFullSidebar}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view)
          if (view === 'discover') {
            // Clear current chat when switching to discover
            setMessages([])
            setCurrentChatId(null)
          }
        }}
        onOpenHealthDashboard={() => setShowHealthDashboard(true)}
        onOpenSettings={() => setShowSettings(true)}
        recentChats={recentChats}
        onNewChat={startNewChat}
        onRefreshChats={() => user && fetchRecentChats(user.id)}
        onLoadChat={(chatId: string) => {
          loadExistingChat(chatId)
          setCurrentView('chat')
        }}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
      />

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ${
        currentView === 'chat' ? 'max-w-6xl mx-auto' : 'w-full'
      } ${
        fullSidebar ? 'lg:pl-80' : 'lg:pl-20'
      }`}>
        {/* Header */}
        <div className="px-6 sm:px-8 py-3">
        </div>

        {currentView === 'chat' ? (
          <>
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
          </>
        ) : (
          <DiscoverView />
        )}
        
        {/* Medical Disclaimer - Hidden when discover is active */}
        {currentView === 'chat' && (
          <div className="px-6 sm:px-8 pb-6">
            <div className={`text-center text-xs rounded-2xl px-4 py-2 transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-400 md:bg-transparent bg-slate-800/30'
                : 'text-gray-500 md:bg-transparent bg-white/20'
            }`}>
              🚨 For medical emergencies, call 911 immediately • AI responses are for informational purposes only
            </div>
          </div>
        )}
      </div>

      <MobileMenu 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view)
          setMobileMenuOpen(false)
          if (view === 'discover') {
            // Clear current chat when switching to discover
            setMessages([])
            setCurrentChatId(null)
          }
        }}
        onOpenHealthDashboard={() => setShowHealthDashboard(true)}
        onOpenSettings={() => setShowSettings(true)}
        recentChats={recentChats}
        onNewChat={startNewChat}
        onRefreshChats={() => user && fetchRecentChats(user.id)}
        onLoadChat={(chatId: string) => {
          loadExistingChat(chatId)
          setCurrentView('chat')
          setMobileMenuOpen(false)
        }}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
      />

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      
      <HealthDashboard 
        isOpen={showHealthDashboard} 
        onClose={() => setShowHealthDashboard(false)}
        user={user}
        userProfile={userProfile}
      />
      
      <UserSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  )
}