'use client'

import DiscoverPage from '@/app/discover/page'
import { useTheme } from '@/contexts/ThemeContext'

export default function DiscoverView() {
  const { theme } = useTheme()

  return (
    <div className="flex-1 w-full overflow-hidden">
      <DiscoverPage/>
    </div>
  )
}