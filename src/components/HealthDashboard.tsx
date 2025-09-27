'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase'

interface HealthDashboardProps {
  isOpen: boolean
  onClose: () => void
  user?: any
  userProfile?: any
}

interface HealthMetrics {
  overallScore: number
  mentalWellness: number
  physicalHealth: number
  sleepQuality: number
  stressLevel: number
  activityLevel: number
}

interface HealthInsight {
  type: 'warning' | 'success' | 'info' | 'recommendation'
  category: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  actionable: boolean
}

export default function HealthDashboard({ isOpen, onClose, user, userProfile }: HealthDashboardProps) {
  const { theme } = useTheme()
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    overallScore: 78,
    mentalWellness: 82,
    physicalHealth: 75,
    sleepQuality: 68,
    stressLevel: 45,
    activityLevel: 71
  })
  const [recentInsights, setRecentInsights] = useState<HealthInsight[]>([])
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const userName = userProfile?.display_name || userProfile?.first_name || user?.email?.split('@')[0] || 'User'
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  useEffect(() => {
    if (isOpen && user) {
      loadHealthData()
    }
  }, [isOpen, user])
  
  const loadHealthData = async () => {
    setLoading(true)
    try {
      // Fetch recent chat history for analysis
      const { data: chats } = await supabase
        .from('chat_history')
        .select('user_message, ai_response, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
      
      setChatHistory(chats || [])
      
      // Generate AI-powered health insights
      const insights = await generateHealthInsights(chats || [])
      setRecentInsights(insights)
      
      // Calculate personalized metrics
      const metrics = calculateHealthMetrics(chats || [])
      setHealthMetrics(metrics)
    } catch (error) {
      console.error('Error loading health data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const generateHealthInsights = async (chats: any[]): Promise<HealthInsight[]> => {
    const insights: HealthInsight[] = []
    const recentMessages = chats.slice(0, 10).map(c => c.user_message.toLowerCase())
    
    // Sleep pattern analysis
    const sleepMentions = recentMessages.filter(msg => 
      msg.includes('sleep') || msg.includes('tired') || msg.includes('insomnia') || msg.includes('rest')
    ).length
    
    if (sleepMentions >= 3) {
      insights.push({
        type: 'warning',
        category: 'Sleep',
        title: 'Sleep Pattern Concerns Detected',
        description: `You've mentioned sleep-related issues ${sleepMentions} times recently. Consider establishing a consistent bedtime routine.`,
        priority: 'high',
        actionable: true
      })
    }
    
    // Stress indicators
    const stressMentions = recentMessages.filter(msg => 
      msg.includes('stress') || msg.includes('anxious') || msg.includes('worried') || msg.includes('overwhelmed')
    ).length
    
    if (stressMentions >= 2) {
      insights.push({
        type: 'recommendation',
        category: 'Mental Health',
        title: 'Stress Management Recommended',
        description: 'Based on your conversations, consider incorporating mindfulness or breathing exercises into your daily routine.',
        priority: 'medium',
        actionable: true
      })
    }
    
    // Positive health behaviors
    const exerciseMentions = recentMessages.filter(msg => 
      msg.includes('exercise') || msg.includes('workout') || msg.includes('gym') || msg.includes('run')
    ).length
    
    if (exerciseMentions >= 2) {
      insights.push({
        type: 'success',
        category: 'Fitness',
        title: 'Great Exercise Interest!',
        description: 'You\'re showing consistent interest in physical activity. Keep up the momentum!',
        priority: 'low',
        actionable: false
      })
    }
    
    // Nutrition awareness
    const nutritionMentions = recentMessages.filter(msg => 
      msg.includes('diet') || msg.includes('nutrition') || msg.includes('healthy eating') || msg.includes('food')
    ).length
    
    if (nutritionMentions >= 2) {
      insights.push({
        type: 'info',
        category: 'Nutrition',
        title: 'Nutrition Awareness Growing',
        description: 'You\'re asking great questions about nutrition. Consider tracking your meals for better insights.',
        priority: 'medium',
        actionable: true
      })
    }
    
    return insights.slice(0, 4) // Limit to top 4 insights
  }
  
  const calculateHealthMetrics = (chats: any[]): HealthMetrics => {
    const baseMetrics = {
      overallScore: 75,
      mentalWellness: 80,
      physicalHealth: 75,
      sleepQuality: 70,
      stressLevel: 50,
      activityLevel: 65
    }
    
    // Adjust based on chat patterns
    const recentMessages = chats.slice(0, 10).map(c => c.user_message.toLowerCase())
    
    // Positive indicators boost scores
    const positiveWords = recentMessages.filter(msg => 
      msg.includes('good') || msg.includes('better') || msg.includes('improved') || msg.includes('great')
    ).length
    
    // Negative indicators lower scores
    const negativeWords = recentMessages.filter(msg => 
      msg.includes('pain') || msg.includes('sick') || msg.includes('tired') || msg.includes('stressed')
    ).length
    
    const adjustment = (positiveWords * 3) - (negativeWords * 2)
    
    return {
      overallScore: Math.max(40, Math.min(100, baseMetrics.overallScore + adjustment)),
      mentalWellness: Math.max(40, Math.min(100, baseMetrics.mentalWellness + adjustment)),
      physicalHealth: Math.max(40, Math.min(100, baseMetrics.physicalHealth + adjustment)),
      sleepQuality: Math.max(30, Math.min(100, baseMetrics.sleepQuality + adjustment)),
      stressLevel: Math.max(10, Math.min(90, baseMetrics.stressLevel - adjustment)),
      activityLevel: Math.max(30, Math.min(100, baseMetrics.activityLevel + adjustment))
    }
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Attention'
  }

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
            {userName}'s Health Dashboard
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* User Profile Section */}
              <div className={`mb-8 p-6 rounded-2xl border ${
                theme === 'dark' ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/30 border-slate-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {userInitials}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Welcome back, {userName}!
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      Here's your personalized health overview
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      Premium Member
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-heartbeat text-white"></i>
                      </div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Overall Health
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <p className={`text-3xl font-bold ${getScoreColor(healthMetrics.overallScore)}`}>
                      {healthMetrics.overallScore}
                    </p>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/100</p>
                  </div>
                  <p className={`text-sm font-medium ${getScoreColor(healthMetrics.overallScore)}`}>
                    {getScoreStatus(healthMetrics.overallScore)}
                  </p>
                  <div className={`mt-3 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'
                  }`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${healthMetrics.overallScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-brain text-white"></i>
                      </div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Mental Wellness
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <p className={`text-3xl font-bold ${getScoreColor(healthMetrics.mentalWellness)}`}>
                      {healthMetrics.mentalWellness}
                    </p>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/100</p>
                  </div>
                  <p className={`text-sm font-medium ${getScoreColor(healthMetrics.mentalWellness)}`}>
                    {getScoreStatus(healthMetrics.mentalWellness)}
                  </p>
                  <div className={`mt-3 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'
                  }`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                      style={{ width: `${healthMetrics.mentalWellness}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-moon text-white"></i>
                      </div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Sleep Quality
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <p className={`text-3xl font-bold ${getScoreColor(healthMetrics.sleepQuality)}`}>
                      {healthMetrics.sleepQuality}
                    </p>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/100</p>
                  </div>
                  <p className={`text-sm font-medium ${getScoreColor(healthMetrics.sleepQuality)}`}>
                    {getScoreStatus(healthMetrics.sleepQuality)}
                  </p>
                  <div className={`mt-3 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'
                  }`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${healthMetrics.sleepQuality}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* AI-Powered Health Insights */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                AI Health Insights
              </h3>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                Powered by AI
              </div>
            </div>
            <div className="space-y-4">
              {recentInsights.length > 0 ? recentInsights.map((insight, index) => {
                const getInsightIcon = () => {
                  switch (insight.type) {
                    case 'warning': return 'fas fa-exclamation-triangle'
                    case 'success': return 'fas fa-check-circle'
                    case 'recommendation': return 'fas fa-lightbulb'
                    default: return 'fas fa-info-circle'
                  }
                }
                
                const getInsightColor = () => {
                  switch (insight.type) {
                    case 'warning': return 'from-red-500 to-red-600'
                    case 'success': return 'from-green-500 to-green-600'
                    case 'recommendation': return 'from-yellow-500 to-yellow-600'
                    default: return 'from-blue-500 to-blue-600'
                  }
                }
                
                return (
                  <div key={index} className={`p-5 rounded-xl border ${
                    theme === 'dark' ? 'bg-slate-700/30 border-slate-600' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${getInsightColor()} shadow-lg`}>
                        <i className={`${getInsightIcon()} text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {insight.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                            insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {insight.priority} priority
                          </span>
                        </div>
                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          {insight.description}
                        </p>
                        {insight.actionable && (
                          <button className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                            theme === 'dark' ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}>
                            Get Recommendations
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              }) : (
                <div className={`p-6 rounded-xl border text-center ${
                  theme === 'dark' ? 'bg-slate-700/30 border-slate-600' : 'bg-slate-50 border-slate-200'
                }`}>
                  <i className={`fas fa-chart-line text-3xl mb-3 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                  }`}></i>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Keep chatting with AidMate to generate personalized health insights!
                  </p>
                </div>
              )}
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

          {/* Health Activity Timeline */}
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Recent Health Activity
            </h3>
            <div className="space-y-4">
              {chatHistory.length > 0 ? chatHistory.slice(0, 5).map((chat, index) => {
                const getActivityType = (message: string) => {
                  const msg = message.toLowerCase()
                  if (msg.includes('sleep') || msg.includes('tired')) return { type: 'sleep', color: 'bg-blue-500', icon: 'fas fa-moon' }
                  if (msg.includes('exercise') || msg.includes('workout')) return { type: 'fitness', color: 'bg-orange-500', icon: 'fas fa-dumbbell' }
                  if (msg.includes('stress') || msg.includes('mental')) return { type: 'mental', color: 'bg-purple-500', icon: 'fas fa-brain' }
                  if (msg.includes('nutrition') || msg.includes('diet')) return { type: 'nutrition', color: 'bg-green-500', icon: 'fas fa-apple-alt' }
                  return { type: 'general', color: 'bg-gray-500', icon: 'fas fa-comment' }
                }
                
                const activity = getActivityType(chat.user_message)
                const timeAgo = new Date(chat.created_at).toLocaleDateString()
                
                return (
                  <div key={index} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-slate-700/30 border-slate-600' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color}`}>
                        <i className={`${activity.icon} text-white text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {chat.user_message.length > 60 ? chat.user_message.substring(0, 60) + '...' : chat.user_message}
                          </p>
                          <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {timeAgo}
                          </span>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Health consultation completed
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }) : (
                <div className={`p-6 rounded-xl border text-center ${
                  theme === 'dark' ? 'bg-slate-700/30 border-slate-600' : 'bg-slate-50 border-slate-200'
                }`}>
                  <i className={`fas fa-comments text-3xl mb-3 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                  }`}></i>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Start a conversation with AidMate to see your health activity timeline!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}