'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  currentView: 'chat' | 'discover'
  setCurrentView: (view: 'chat' | 'discover') => void
  onOpenHealthDashboard: () => void
}

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, currentView, setCurrentView, onOpenHealthDashboard }: MobileMenuProps) {
  const { theme } = useTheme()
  return (
    <div className={`lg:hidden fixed left-0 top-0 bottom-0 z-50 transition-all duration-500 ease-out ${mobileMenuOpen ? 'w-80' : 'w-0'}`}>
      <div className={`shadow-2xl h-full overflow-hidden transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-800 border-r border-slate-700'
          : 'bg-gradient-to-br from-navy-50 via-white to-navy-100 border-r border-gray-200'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-900 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m3-3H9" />
                  </svg>
                </div>
                <h1 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>AidMate</h1>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-slate-700 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-blue-600/50 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Chat</span>
            </button>
          </div>

          {/* Separator */}
          <div className={`mx-4 border-t ${
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}></div>

          {/* Navigation */}
          <div className="p-4 space-y-1">
            <button 
              onClick={() => {
                onOpenHealthDashboard()
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              theme === 'dark'
                ? 'hover:bg-slate-700 text-gray-300 hover:text-white'
                : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">Health Dashboard</span>
            </button>
            <button 
              onClick={() => {
                setCurrentView('discover')
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                currentView === 'discover'
                  ? theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark'
                    ? 'hover:bg-slate-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium">Discover</span>
            </button>
            <button className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              theme === 'dark'
                ? 'hover:bg-orange-900/20 text-orange-400 hover:text-orange-300'
                : 'hover:bg-orange-50 text-orange-600 hover:text-orange-700'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-medium">Emergency Guide</span>
            </button>
          </div>

          {/* Recent Chats */}
          <div className={`flex-grow border-t px-4 pt-4 pb-6 ${
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Recent Chats</h3>
              <button className={`text-xs transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}>Clear</button>
            </div>
            <div className="space-y-1">
              <button className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Headache symptoms</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>2 hours ago</p>
                </div>
              </button>
              <button className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">First aid for cuts</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>Yesterday</p>
                </div>
              </button>
              <button className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Medication interactions</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>3 days ago</p>
                </div>
              </button>
            </div>
          </div>

          {/* Emergency Button - Fixed at Bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-700">
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
      </div>
    </div>
  )
}