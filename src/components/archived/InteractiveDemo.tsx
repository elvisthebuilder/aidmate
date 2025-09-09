'use client'

import { useState, useEffect } from 'react'

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [activeDevice, setActiveDevice] = useState('mobile')

  const demoSteps = [
    { type: 'user', message: "I've been having chest pain and shortness of breath" },
    { type: 'ai', message: "I understand your concern. Can you describe when this started and how severe the pain is on a scale of 1-10?" },
    { type: 'user', message: "Started 2 hours ago, pain level is about 7/10" },
    { type: 'ai', message: "Based on your symptoms, this requires immediate medical attention. I'm recommending you call emergency services or go to the nearest ER right away." }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setCurrentStep((prev) => (prev + 1) % demoSteps.length)
      }, 1500)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-900 to-teal-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            See AidMate in Action
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Watch how our AI analyzes symptoms and provides instant, accurate medical guidance
          </p>
          
          {/* Device Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <button
                onClick={() => setActiveDevice('mobile')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeDevice === 'mobile'
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                📱 Mobile
              </button>
              <button
                onClick={() => setActiveDevice('desktop')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeDevice === 'desktop'
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                💻 Desktop
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Device Mockups */}
          <div className="relative">
            {/* Mobile Demo */}
            {activeDevice === 'mobile' && (
              <div className="relative mx-auto animate-fade-in" style={{ width: '300px' }}>
              {/* iPhone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10"></div>
                
                {/* Screen */}
                <div className="bg-black rounded-[2.5rem] overflow-hidden" style={{ height: '650px' }}>
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 pt-12 pb-2 text-white text-sm font-medium">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white rounded-full opacity-60"></div>
                        <div className="w-1 h-3 bg-white rounded-full opacity-30"></div>
                        <div className="w-1 h-3 bg-white rounded-full opacity-30"></div>
                      </div>
                      <svg className="w-6 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L3.5 14.4l1.35 1.45L3.5 17.3 4 18.77l-.85 1.48L2 17.8zm4.7-6.9L8.7 8.57 9.55 7.1 8.2 5.65 9.55 4.2 8.7 2.73 8.85 1.25 7 2.7zm8.3 0L15.3 8.57 14.45 7.1 15.8 5.65 14.45 4.2 15.3 2.73 15.15 1.25 17 2.7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Safari Browser */}
                  <div className="bg-white h-full rounded-t-3xl">
                    {/* Safari Address Bar */}
                    <div className="bg-gray-100 px-4 py-3 flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-600">
                        🔒 aidmate.com
                      </div>
                    </div>

                    {/* AidMate Interface */}
                    <div className="p-4 h-full overflow-hidden">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mr-2">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.5 12c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5z"/>
                            </svg>
                          </div>
                          <h1 className="text-lg font-light text-gray-900">AidMate</h1>
                        </div>
                        <p className="text-xs text-gray-600">Your AI Health Assistant</p>
                      </div>

                      {/* Chat Messages */}
                      <div className="space-y-3 mb-4">
                        {demoSteps.slice(0, currentStep + 1).map((step, index) => (
                          <div key={index} className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[200px] px-3 py-2 rounded-2xl text-xs ${
                              step.type === 'user' 
                                ? 'bg-blue-500 text-white rounded-br-md' 
                                : 'bg-gray-100 text-gray-800 rounded-bl-md'
                            }`}>
                              <p>{step.message}</p>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-md">
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Input Area */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                          <input 
                            className="flex-1 bg-transparent text-xs placeholder-gray-500 outline-none" 
                            placeholder="Type your health question..."
                            readOnly
                          />
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            
            {/* Desktop Demo */}
            {activeDevice === 'desktop' && (
              <div className="mx-auto animate-fade-in">
                <div className="bg-gray-200 rounded-t-lg p-1 shadow-2xl" style={{ width: '600px' }}>
                  {/* Browser Chrome */}
                  <div className="bg-white rounded-t-md">
                    {/* Title Bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-100 rounded px-4 py-2 text-sm text-gray-600 text-center">
                          🔒 aidmate.com - Your AI Health Assistant
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="h-96 bg-gradient-to-br from-blue-50 to-teal-50 p-8">
                      <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.5 12c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5z"/>
                              </svg>
                            </div>
                            <h1 className="text-3xl font-light text-gray-900">AidMate</h1>
                          </div>
                          <p className="text-gray-600 mb-6">Your health, simplified</p>
                        </div>

                        {/* Desktop Chat Interface */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Chat Messages */}
                          <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="space-y-4 h-48 overflow-y-auto">
                              {demoSteps.slice(0, currentStep + 1).map((step, index) => (
                                <div key={index} className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                                    step.type === 'user' 
                                      ? 'bg-blue-500 text-white rounded-br-md' 
                                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                  }`}>
                                    <p>{step.message}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {isTyping && (
                                <div className="flex justify-start">
                                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                                    <div className="flex space-x-1">
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Input */}
                            <div className="mt-4 flex items-center space-x-3">
                              <input 
                                className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm placeholder-gray-500 outline-none" 
                                placeholder="Describe your symptoms or ask a health question..."
                                readOnly
                              />
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Analysis Panel */}
                          <div className="space-y-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                Real-time Analysis
                              </h4>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Confidence</span>
                                  <span className="font-medium">98%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full w-[98%]"></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h4 className="font-medium text-gray-900 mb-3">Risk Level</h4>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">High - Immediate Care</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Real-time Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Symptom Recognition</span>
                  <span className="text-white font-medium">98%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-400 to-blue-400 h-2 rounded-full w-[98%]"></div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-medium mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>High Priority - Emergency Care Needed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-50"></div>
                  <span className="opacity-50">Medium Priority</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full opacity-50"></div>
                  <span className="opacity-50">Low Priority</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-medium mb-4">Recommended Actions</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Call Emergency Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Nearest ER: 0.3 miles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-colors shadow-lg">
              Try on Mobile
            </button>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg">
              Open in Browser
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}