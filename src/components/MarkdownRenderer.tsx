'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
        h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-gray-900">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-gray-900">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-medium mb-2 text-gray-900">{children}</h3>,
        p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-outside mb-3 space-y-1 pl-5">{children}</ol>,
        li: ({ children }) => <li className="text-gray-800">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
        code: ({ children }) => <code className="bg-navy-50 text-navy-800 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
        pre: ({ children }) => <pre className="bg-navy-50 p-3 rounded-lg overflow-x-auto mb-3">{children}</pre>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-navy-300 pl-4 italic text-gray-700 mb-3">{children}</blockquote>,
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}