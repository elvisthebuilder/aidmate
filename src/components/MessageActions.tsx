'use client'

import { useTheme } from '@/contexts/ThemeContext'

interface MessageActionsProps {
  content: string
  messageIndex: number
  isLoading: boolean
  onRegenerate: (messageIndex: number) => Promise<void>
}

export default function MessageActions({ content, messageIndex, isLoading, onRegenerate }: MessageActionsProps) {
  const { theme } = useTheme()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      console.log('✅ Message copied to clipboard')
    } catch (err) {
      console.error('❌ Failed to copy message:', err)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'AidMate Health Response',
      text: content
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
        await navigator.clipboard.writeText(content)
        console.log('✅ Message copied for sharing')
      } catch (err) {
        console.error('❌ Failed to copy for sharing:', err)
      }
    } else {
      console.log('❌ Share and clipboard not supported')
    }
  }

  return (
    <div className="flex items-center space-x-2 mt-3 ml-16">
      <button 
        onClick={handleCopy}
        className={`p-2 rounded-xl transition-all duration-200 ${
          theme === 'dark'
            ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
            : 'text-navy-400 hover:text-navy-600 hover:bg-white/40'
        }`}
        title="Copy message"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button 
        onClick={handleShare}
        className={`p-2 rounded-xl transition-all duration-200 ${
          theme === 'dark'
            ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
            : 'text-navy-400 hover:text-navy-600 hover:bg-white/40'
        }`}
        title="Share message"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>
      <button 
        onClick={() => onRegenerate(messageIndex)}
        disabled={isLoading}
        className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          theme === 'dark'
            ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
            : 'text-navy-400 hover:text-navy-600 hover:bg-white/40'
        }`}
        title="Regenerate response"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  )
}