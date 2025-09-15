'use client'

import { useVoiceInput } from '@/lib/useVoiceInput'
import { useTheme } from '@/contexts/ThemeContext'

interface VoiceInputProps {
  onTranscription: (text: string) => void
}

export default function VoiceInput({ onTranscription }: VoiceInputProps) {
  const { theme } = useTheme()
  const { isRecording, isProcessing, startRecording, stopRecording } = useVoiceInput()

  const handleClick = async () => {
    if (isRecording) {
      try {
        const transcription = await stopRecording()
        onTranscription(transcription)
      } catch (error) {
        console.error('Transcription failed:', error)
      }
    } else {
      startRecording()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={`p-2 transition-all duration-200 ${
        isRecording
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
          : theme === 'dark'
          ? ' hover:bg-slate-600 text-gray-300'
          : ' hover:bg-gray-200 text-gray-500'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? (
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )}
    </button>
  )
}