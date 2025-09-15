'use client'

import HealthAvatar from './HealthAvatar'
import MarkdownRenderer from './MarkdownRenderer'
import MessageActions from './MessageActions'
import { useTheme } from '@/contexts/ThemeContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessageProps {
  message: Message
  index: number
  isLoading: boolean
  onRegenerate: (messageIndex: number) => Promise<void>
}

export default function ChatMessage({ message, index, isLoading, onRegenerate }: ChatMessageProps) {
  const { theme } = useTheme()
  if (message.role === 'assistant') {
    return (
      <div className="w-full">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl border border-navy-500/20">
            <HealthAvatar className="w-6 h-6 text-white" />
          </div>
          <div className={`leading-relaxed min-w-0 flex-1 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            <MarkdownRenderer content={message.content} />
          </div>
        </div>
        <MessageActions 
          content={message.content}
          messageIndex={index}
          isLoading={isLoading}
          onRegenerate={onRegenerate}
        />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900 text-white rounded-2xl rounded-br-md px-5 py-4 max-w-lg shadow-xl border border-navy-500/20 backdrop-blur-sm">
      {message.content}
    </div>
  )
}