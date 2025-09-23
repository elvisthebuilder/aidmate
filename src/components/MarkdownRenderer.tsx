'use client'

import ReactMarkdown from 'react-markdown'
import { useTheme } from '@/contexts/ThemeContext'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme()
  
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className={`text-xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-base font-medium mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{children}</h3>
          ),
          p: ({ children }) => (
            <p className={`mb-3 leading-relaxed ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>{children}</p>
          ),
          ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-outside mb-3 space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => (
            <li className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>{children}</li>
          ),
          strong: ({ children }) => (
            <strong className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{children}</strong>
          ),
          em: ({ children }) => (
            <em className={`italic ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{children}</em>
          ),
          code: ({ children }) => (
            <code className={`px-1 py-0.5 rounded text-sm font-mono ${
              theme === 'dark' 
                ? 'bg-slate-700 text-blue-300' 
                : 'bg-navy-50 text-navy-800'
            }`}>{children}</code>
          ),
          pre: ({ children }) => (
            <pre className={`p-3 rounded-lg overflow-x-auto mb-3 ${
              theme === 'dark' 
                ? 'bg-slate-700 text-gray-200' 
                : 'bg-navy-50 text-gray-800'
            }`}>{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className={`border-l-4 border-gray-200 pl-4 italic mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>{children}</blockquote>
          ),
          hr: () => <hr className="border-gray-200/10 my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}