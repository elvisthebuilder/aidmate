'use client'

import { useState, useEffect } from 'react'
import MarkdownRenderer from './MarkdownRenderer'

interface TypewriterTextProps {
  text: string
  speed?: number
}

export default function TypewriterText({ text, speed = 15 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  return <MarkdownRenderer content={displayText} />
}