'use client'

import { useTheme } from '@/contexts/ThemeContext'

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

export default function DiscoverView() {
  const { theme } = useTheme()

  return (
    <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
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


      </div>
    </div>
  )
}