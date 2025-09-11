'use client'

import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl  font-medium text-gray-800">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {isSignUp && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-navy-500 backdrop-blur-sm" 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-navy-500 backdrop-blur-sm" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-navy-500 backdrop-blur-sm" 
          />
          {isSignUp && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-navy-500 backdrop-blur-sm" 
            />
          )}
          
          <button className="w-full bg-gradient-to-r from-navy-600 to-navy-900 hover:from-navy-700 hover:to-navy-900 text-white py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
          
          <button className="w-full bg-white/30 hover:bg-white/40 text-gray-900 py-3 rounded-2xl transition-colors border border-white/40 backdrop-blur-sm flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
          
          <p className="text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-navy-600 hover:text-navy-700 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}