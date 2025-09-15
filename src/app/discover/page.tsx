'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

const healthTopics = [
  {
    category: "Symptoms & Conditions",
    items: [
      { title: "Understanding Headaches", description: "Types, causes, and when to seek help" },
      { title: "Common Cold vs Flu", description: "Key differences and treatment options" },
      { title: "Chest Pain Causes", description: "When chest pain requires immediate attention" },
      { title: "Skin Rashes Guide", description: "Identifying common skin conditions" }
    ]
  },
  {
    category: "First Aid & Emergency",
    items: [
      { title: "CPR Basics", description: "Life-saving techniques everyone should know" },
      { title: "Wound Care", description: "Proper cleaning and dressing of cuts" },
      { title: "Choking Response", description: "Heimlich maneuver and emergency steps" },
      { title: "Burns Treatment", description: "First aid for different types of burns" }
    ]
  },
  {
    category: "Wellness & Prevention",
    items: [
      { title: "Heart Health Tips", description: "Daily habits for cardiovascular wellness" },
      { title: "Mental Health Basics", description: "Recognizing and managing stress" },
      { title: "Nutrition Guidelines", description: "Balanced diet for optimal health" },
      { title: "Exercise Safety", description: "Preventing injuries during workouts" }
    ]
  },
  {
    category: "Medications & Treatments",
    items: [
      { title: "Over-the-Counter Medications", description: "Safe use of common pain relievers" },
      { title: "Antibiotic Guidelines", description: "When and how to use antibiotics properly" },
      { title: "Home Remedies", description: "Natural treatments for minor ailments" },
      { title: "Drug Interactions", description: "Understanding medication safety" }
    ]
  }
]

export default function DiscoverPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className={`inline-flex items-center space-x-2 mb-4 text-sm transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chat
          </Link>
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Discover Health Topics</h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Explore curated health information and medical guidance</p>
        </div>

        {/* Topics Grid */}
        <div className="space-y-8">
          {healthTopics.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{item.title}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/chat" className={`p-4 rounded-lg border text-center transition-all duration-200 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-blue-900/20 border-blue-800 hover:bg-blue-900/30'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}>
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ask AidMate</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Get personalized health advice</p>
            </Link>
            
            <div className={`p-4 rounded-lg border text-center transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
              theme === 'dark'
                ? 'bg-red-900/20 border-red-800 hover:bg-red-900/30'
                : 'bg-red-50 border-red-200 hover:bg-red-100'
            }`}>
              <div className="text-red-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Emergency Guide</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Critical first aid steps</p>
            </div>

            <div className={`p-4 rounded-lg border text-center transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
              theme === 'dark'
                ? 'bg-green-900/20 border-green-800 hover:bg-green-900/30'
                : 'bg-green-50 border-green-200 hover:bg-green-100'
            }`}>
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Health Dashboard</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Track your wellness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}