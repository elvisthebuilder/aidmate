'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface HealthDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function HealthDashboard({ isOpen, onClose }: HealthDashboardProps) {
  const { theme } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-4xl max-h-[90vh] mx-4 rounded-2xl shadow-2xl overflow-hidden ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Health Dashboard
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Health Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heartbeat text-white"></i>
                </div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Overall Health
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">Good</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Based on recent interactions
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-brain text-white"></i>
                </div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Mental Wellness
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">Stable</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Positive conversation patterns
              </p>
            </div>

            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-orange-50 border-orange-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white"></i>
                </div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Health Score
                </h3>
              </div>
              <p className="text-2xl font-bold text-orange-600 mb-1">78/100</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                +5 from last week
              </p>
            </div>
          </div>

          {/* Recent Health Insights */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Recent Health Insights
            </h3>
            <div className="space-y-4">
              {[
                { icon: 'fas fa-exclamation-triangle', color: 'yellow', title: 'Sleep Pattern Alert', desc: 'Mentioned difficulty sleeping 3 times this week' },
                { icon: 'fas fa-check-circle', color: 'green', title: 'Nutrition Improvement', desc: 'Showing interest in healthy eating habits' },
                { icon: 'fas fa-info-circle', color: 'blue', title: 'Exercise Inquiry', desc: 'Asked about workout routines recently' }
              ].map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  theme === 'dark' ? 'bg-slate-700/30 border-slate-600' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${insight.color}-600`}>
                      <i className={`${insight.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {insight.title}
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {insight.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Recommendations */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Personalized Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Sleep Hygiene Tips', desc: 'Based on your sleep concerns', icon: 'fas fa-moon' },
                { title: 'Stress Management', desc: 'Techniques for better wellness', icon: 'fas fa-leaf' },
                { title: 'Nutrition Guide', desc: 'Tailored to your interests', icon: 'fas fa-apple-alt' },
                { title: 'Exercise Plan', desc: 'Beginner-friendly routines', icon: 'fas fa-dumbbell' }
              ].map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${rec.icon} text-blue-600`}></i>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {rec.title}
                    </h4>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {rec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Health Timeline */}
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Health Timeline
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Today', event: 'Asked about meditation techniques', type: 'mental' },
                { date: 'Yesterday', event: 'Discussed nutrition and meal planning', type: 'nutrition' },
                { date: '2 days ago', event: 'Inquired about sleep improvement', type: 'sleep' },
                { date: '3 days ago', event: 'Talked about exercise routines', type: 'fitness' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    item.type === 'mental' ? 'bg-purple-500' :
                    item.type === 'nutrition' ? 'bg-green-500' :
                    item.type === 'sleep' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {item.event}
                      </p>
                      <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}