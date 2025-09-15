'use client'

import HealthAvatar from './HealthAvatar'
import { useTheme } from '@/contexts/ThemeContext'

export default function LoadingIndicator() {
  const { theme } = useTheme()
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
        <HealthAvatar className="w-6 h-6 text-white" />
      </div>
      <div className={`backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-800/90 border border-slate-600/40'
          : 'bg-white/90 border border-white/30'
      }`}>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}