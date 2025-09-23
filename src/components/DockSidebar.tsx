'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface DockSidebarProps {
  fullSidebar: boolean
  setFullSidebar: (full: boolean) => void
  currentView: 'chat' | 'discover'
  setCurrentView: (view: 'chat' | 'discover') => void
  onOpenHealthDashboard: () => void
  onOpenSettings: () => void
  recentChats: any[]
  onNewChat: () => void
  onRefreshChats: () => void
  onLoadChat: (chatId: string) => void
  onRenameChat: (chatId: string, newTitle: string) => void
  onDeleteChat: (chatId: string) => void
}

export default function DockSidebar({ fullSidebar, setFullSidebar, currentView, setCurrentView, onOpenHealthDashboard, onOpenSettings, recentChats, onNewChat, onRefreshChats, onLoadChat, onRenameChat, onDeleteChat }: DockSidebarProps) {
  const { theme } = useTheme()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [renameId, setRenameId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [showAllChats, setShowAllChats] = useState(false)

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null)
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeMenu])
  return (
    <div className={`hidden lg:block fixed z-50 transition-all duration-500 ease-out ${fullSidebar ? 'left-0 top-0 bottom-0 w-80' : 'left-6 top-1/2 -translate-y-1/2 w-14'}`}>
      <div className={`${fullSidebar ? (theme === 'dark' ? 'bg-slate-800 border-r border-slate-700' : 'bg-gradient-to-br from-navy-50 via-white to-navy-100 border-r border-blue-200/50') + ' rounded-none h-full flex flex-col' : (theme === 'dark' ? 'bg-slate-800/30 backdrop-blur-2xl border border-slate-700/40' : 'bg-white/20 backdrop-blur-3xl border border-blue-200/30') + ' rounded-3xl'} shadow-2xl overflow-hidden`}>
        {!fullSidebar ? (
          <div className="p-3 space-y-3">
            <div className="w-8 h-8 bg-gradient-to-br from-navy-600 to-navy-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m3-3H9" />
              </svg>
            </div>
            <button 
              onClick={onNewChat}
              className="w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-blue-500/20 hover:rounded-2xl hover:shadow-lg"
            >
              <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button 
              onClick={onOpenHealthDashboard}
              className="w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-purple-500/20 hover:rounded-2xl hover:shadow-lg"
            >
              <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setCurrentView('discover')}
              className={`w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:rounded-2xl hover:shadow-lg ${
                currentView === 'discover' ? 'bg-teal-500/20 rounded-2xl' : 'hover:bg-teal-500/20'
              }`}
            >
              <svg className={`w-5 h-5 group-hover:text-teal-500 ${
                currentView === 'discover' ? 'text-teal-500' : 'text-teal-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-red-500/20 hover:rounded-2xl hover:shadow-lg">
              <svg className="w-5 h-5 text-red-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-orange-500/20 hover:rounded-2xl hover:shadow-lg">
              <svg className="w-5 h-5 text-orange-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
            <div className={`mt-4 pt-3 border-t ${theme === 'dark' ? 'border-white/30' : 'border-blue-300/40'}`}>
              <button onClick={() => setFullSidebar(true)} className={`w-8 h-8 flex items-center justify-center transition-all duration-200 group ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-blue-100/60'} hover:rounded-2xl hover:shadow-lg`}>
                <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-white group-hover:text-gray-200' : 'text-blue-700 group-hover:text-blue-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-900 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m3-3H9" />
                  </svg>
                </div>
                <span className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>AidMate</span>
              </div>
              <button onClick={() => setFullSidebar(false)} className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-gray-400 hover:text-white'
                  : 'hover:bg-blue-50/80 text-gray-500 hover:text-blue-700'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            {/* New Chat Button */}
            <div className="mb-4">
              <button 
                onClick={onNewChat}
                className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                  theme === 'dark' ? 'bg-blue-600/50 hover:bg-blue-700 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Chat</span>
              </button>
            </div>
            
            {/* Separator */}
            <div className={`mx-0 mb-4 border-t ${
              theme === 'dark' ? 'border-slate-700' : 'border-blue-200/40'
            }`}></div>
            
            <div className="space-y-1">
              <button 
                onClick={onOpenHealthDashboard}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                theme === 'dark' ? 'hover:bg-slate-700 text-gray-300 hover:text-white' : 'hover:bg-blue-50/80 text-gray-700 hover:text-blue-900'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">Health Dashboard</span>
              </button>
              <button 
                onClick={() => setCurrentView('discover')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  currentView === 'discover'
                    ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-blue-50/80 text-blue-900'
                    : theme === 'dark' ? 'hover:bg-slate-700 text-gray-300 hover:text-white' : 'hover:bg-blue-50/80 text-gray-700 hover:text-blue-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-medium">Discover</span>
              </button>
              <button className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                theme === 'dark' ? 'hover:bg-orange-900/20 text-orange-400 hover:text-orange-300' : 'hover:bg-orange-50/80 text-orange-600 hover:text-orange-700'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium">Emergency Guide</span>
              </button>
            </div>
            
            {/* Recent Chats */}
            <div className={`flex-1 border-t pt-4 pb-6 ${
              theme === 'dark' ? 'border-slate-700' : 'border-blue-200/40'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Recent Chats</h3>
                  {recentChats.length > 5 && (
                    <button
                      onClick={() => setShowAllChats(!showAllChats)}
                      className={`p-1 rounded transition-all duration-200 group relative ${
                        theme === 'dark' ? 'hover:bg-slate-700 text-gray-400 hover:text-gray-300' : 'hover:bg-blue-50 text-gray-500 hover:text-gray-700'
                      }`}
                      title={showAllChats ? 'Show less' : 'Show all chats'}
                    >
                      <svg className={`w-3 h-3 transition-transform duration-200 ${
                        showAllChats ? 'rotate-180' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                <button 
                  onClick={onRefreshChats}
                  className={`p-1 rounded transition-colors ${
                    theme === 'dark' ? 'hover:bg-slate-700 text-gray-400 hover:text-gray-300' : 'hover:bg-blue-50 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <div className={`space-y-1 ${showAllChats && recentChats.length > 8 ? 'max-h-64 overflow-y-auto scrollbar-hide' : ''}`} onClick={() => setActiveMenu(null)} style={showAllChats && recentChats.length > 8 ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}>
                {recentChats.length > 0 ? (
                  recentChats.slice(0, showAllChats ? recentChats.length : 5).map((chat) => (
                    <div key={chat.id} className="relative group">
                      {renameId === chat.id ? (
                        <div className={`w-full px-3 py-2.5 rounded-lg ${
                          theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50/60'
                        }`}>
                          <input
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onRenameChat(chat.id, renameValue)
                                setRenameId(null)
                              } else if (e.key === 'Escape') {
                                setRenameId(null)
                              }
                            }}
                            onBlur={() => setRenameId(null)}
                            className={`w-full text-sm font-medium bg-transparent border-none outline-none ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => onLoadChat(chat.id)}
                            className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                              theme === 'dark'
                                ? 'hover:bg-slate-700 text-gray-300'
                                : 'hover:bg-blue-50/60 text-gray-700'
                            }`}
                          >
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <div className="flex-1 min-w-0 pr-8">
                              <p className="text-sm font-medium truncate">{chat.user_message}</p>
                              <p className={`text-xs ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                {new Date(chat.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveMenu(activeMenu === chat.id ? null : chat.id)
                            }}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ${
                              theme === 'dark' ? 'hover:bg-slate-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                          </button>
                          {activeMenu === chat.id && (
                            <div className={`absolute right-0 top-0 mt-8 w-32 rounded-lg shadow-lg z-10 ${
                              theme === 'dark' ? 'bg-slate-700 border border-slate-600' : 'bg-white border border-gray-200'
                            }`}>
                              <button
                                onClick={() => {
                                  setRenameId(chat.id)
                                  setRenameValue(chat.user_message)
                                  setActiveMenu(null)
                                }}
                                className={`w-full px-3 py-2 text-left text-sm rounded-t-lg transition-colors ${
                                  theme === 'dark' ? 'hover:bg-slate-600 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                }`}
                              >
                                Rename
                              </button>
                              <button
                                onClick={() => {
                                  // Share functionality to be implemented
                                  setActiveMenu(null)
                                }}
                                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                                  theme === 'dark' ? 'hover:bg-slate-600 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                }`}
                              >
                                Share
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteChat(chat.id)
                                  setActiveMenu(null)
                                }}
                                className={`w-full px-3 py-2 text-left text-sm rounded-b-lg transition-colors ${
                                  theme === 'dark' ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'
                                }`}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-8 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-sm">No recent chats</p>
                    <p className="text-xs mt-1">Start a conversation to see your chat history</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bottom Actions */}
            <div className={`border-t space-y-2 p-4 ${
              theme === 'dark' ? 'border-slate-700' : 'border-blue-200/40'
            }`}>
              <button 
                onClick={onOpenSettings}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  theme === 'dark' ? 'hover:bg-slate-700 text-gray-300 hover:text-white' : 'hover:bg-blue-50/80 text-gray-700 hover:text-blue-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Settings</span>
              </button>
              <button className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400 hover:text-red-300'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Emergency</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}