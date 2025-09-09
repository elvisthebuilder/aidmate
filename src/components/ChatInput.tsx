'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatInput() {
  const [demoMessage, setDemoMessage] = useState('')
  const router = useRouter()

  const handleDemoSubmit = () => {
    if (!demoMessage.trim()) return
    router.push(`/chat?message=${encodeURIComponent(demoMessage.trim())}`)
  }

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleDemoSubmit()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* AI Message */}
      <div className="flex items-start space-x-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 p-5 flex-1 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-600 text-sm md:text-normal leading-relaxed">Hello! I'm your AI health assistant. What can I help you with today?</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={demoMessage}
          onChange={(e) => setDemoMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe your symptoms or ask a health question..."
          className="w-full h-32 border border-gray-200 rounded-2xl px-16 pr-16 shadow-sm"
          style={{ 
            outline: 'none',
            boxShadow: 'none',
            border: '1px solid rgb(229 231 235)'
          }}
          onFocus={(e) => {
            e.target.style.outline = 'none'
            e.target.style.border = 'none'
            e.target.style.boxShadow = '0 0 0 2px rgb(59 130 246 / 0.5)'
            // Scroll input into view on mobile
            setTimeout(() => {
              e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 300)
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none'
            e.target.style.border = '1px solid rgb(229 231 235)'
          }}
        />
        <button
          onClick={() => router.push('/chat')}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full transition-colors flex items-center hover:cursor-pointer justify-center"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={handleDemoSubmit}
          disabled={!demoMessage.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { label: '🤕 Headache', prompt: 'I have been experiencing headaches for the past few days along with fatigue. The pain is usually on both sides of my head and gets worse in the afternoon. What could be causing this and what should I do?' },
          { label: '🩹 First Aid', prompt: 'I just got a minor cut on my finger while cooking. It is bleeding a little but not too deep. What are the proper first aid steps I should take to clean and treat this wound?' },
          { label: '🥗 Nutrition', prompt: 'I want to improve my eating habits and maintain a healthier diet. Can you provide me with some practical nutrition advice and meal planning tips for better overall health?' }
        ].map((suggestion, index) => (
          <button 
            key={index}
            onClick={() => setDemoMessage(suggestion.prompt)}
            className="bg-white border border-blue-100 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  )
}