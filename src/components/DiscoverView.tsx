'use client'

import DiscoverPage from '@/app/discover/page'
import { useTheme } from '@/contexts/ThemeContext'

export default function DiscoverView() {
  const { theme } = useTheme()

  return (
    <div 
      className="flex-1 overflow-y-auto w-full"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#475569 transparent'
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #475569;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: #334155;
        }
      `}</style>
      <DiscoverPage/>
    </div>
  )
}