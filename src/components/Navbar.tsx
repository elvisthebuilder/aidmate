'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-4/5 max-w-4xl rounded-[30px]">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-[30px] shadow-2xl">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-light text-gray-900">AidMate</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Pricing
              </a>
              <Link href="/chat" className="bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Try for Free
              </Link>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                outline: 'none',
                border: 'none',
                background: 'none'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/30 bg-white/20 backdrop-blur-xl rounded-b-2xl">
            <div className="px-6 py-4 space-y-4">
              <a href="#pricing" className="block text-gray-600 font-medium">Pricing</a>
              <Link href="/chat" className="block bg-black text-white px-5 py-2.5 rounded-lg text-center font-medium">
                Try for Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}