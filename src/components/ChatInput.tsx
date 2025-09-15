'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  isLoading: boolean
  onSendMessage: () => void
}

export default function ChatInput({ input, setInput, isLoading, onSendMessage }: ChatInputProps) {
  const { theme } = useTheme()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
    }
  }

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      if (event.error === 'network') {
        alert('Network error. Please check your internet connection and try again.')
      } else if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone permissions.')
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
    setRecognition(recognition)
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      setRecognition(null)
    }
    setIsRecording(false)
  }

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  // Add type declaration for Speech Recognition
  declare global {
    interface Window {
      SpeechRecognition: any
      webkitSpeechRecognition: any
    }
  }

  return (
    <div className="px-6 sm:px-8 pb-8">
      <div className={`backdrop-blur-2xl m-auto md:w-5/6 w-full rounded-3xl p-4 sm:p-6 shadow-2xl transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800/30 border border-gray-600/40'
          : 'bg-white/30 border border-white/40'
      }`}>
        <div className="flex flex-col -space-y-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your health concerns..."
            className={`w-full bg-transparent border-none focus:outline-none resize-none text-base sm:text-lg leading-relaxed overflow-y-auto min-h-[60px] max-h-[300px] transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-100 placeholder-gray-400'
                : 'text-gray-900 placeholder-gray-500'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,audio/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <button 
                onClick={handleFileUpload}
                className={`p-2 transition-colors rounded-xl flex-shrink-0 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/40'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'
                }`}
                title="Attach file"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button 
                onClick={handleMicClick}
                className={`p-2 transition-colors rounded-xl flex-shrink-0 ${
                  isRecording
                    ? 'text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/40'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/30'
                }`}
                title={isRecording ? 'Stop recording' : 'Start voice recording'}
              >
                {isRecording ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
            </div>
            <button
              onClick={onSendMessage}
              disabled={!input?.trim() || isLoading}
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
  )
}