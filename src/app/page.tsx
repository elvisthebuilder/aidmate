'use client'

import Link from 'next/link'
import Navbar from '../components/Navbar'
import ChatInput from '../components/ChatInput'
import Footer from '../components/Footer'
import GridPattern from '../components/GridPattern'


export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-navy-100 relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative">
        <GridPattern width="w-full" />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-5 py-2.5 bg-navy-50/80 backdrop-blur-sm rounded-full text-sm font-medium text-navy-600 mb-6 md:mb-8 border border-navy-100/50">
              🩺 Healthcare AI Assistant
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight leading-[1.1]">
              Your health,
              <br />
              <span className="font-normal bg-gradient-to-r from-navy-600 to-navy-300 bg-clip-text text-transparent">simplified</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Instant medical guidance powered by AI. Get personalized health insights, symptom analysis, and care recommendations.
            </p>

            <ChatInput />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-36 bg-gray-50/80 relative">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #5483B3 35px, #5483B3 36px)`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
              Built for modern healthcare
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed px-4">
              Advanced AI technology meets intuitive design to deliver healthcare guidance you can trust.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">Intelligent Analysis</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Advanced AI processes your symptoms and medical history to provide accurate, personalized health insights and recommendations.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-navy-300 to-navy-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Your health data is encrypted and secure. We never share your information and comply with all healthcare privacy regulations.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-navy-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-6 tracking-tight">Instant Response</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get immediate answers to your health questions. No waiting rooms, no appointments - just instant, reliable medical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-36 relative">
        <GridPattern opacity="opacity-[0.05]" width="w-full" gridSize="30px 30px" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-16 md:mb-20 font-light px-4 max-w-4xl mx-auto leading-relaxed">
            Choose the plan that fits your healthcare needs.
          </p>
          
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-2">Free</h3>
              <div className="text-5xl font-light text-gray-900 mb-8">$0</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">5 daily conversations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Basic health guidance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Emergency protocols</span>
                </li>
              </ul>
              <Link href="/chat" className="block w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                Get Started
              </Link>
            </div>
            
            <div className="bg-navy-600 text-white rounded-2xl p-6 md:p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-navy-300 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-light mb-2">Pro</h3>
              <div className="text-5xl font-light mb-8">$4<span className="text-lg text-gray-300">/mo</span></div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200">Unlimited conversations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200">Advanced AI analysis</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200">Health tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-200">Priority support</span>
                </li>
              </ul>
              <Link href="/chat" className="block w-full bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-2">Enterprise</h3>
              <div className="text-5xl font-light text-gray-900 mb-8">$12<span className="text-lg text-gray-600">/mo</span></div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Family accounts (5)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">24/7 medical support</span>
                </li>
              </ul>
              <Link href="/chat" className="block w-full bg-blue-50 text-blue-700 py-3 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Social Proof */}
      <section className="py-20 md:py-24 bg-gray-50/80 relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #5483B3 25%, transparent 25%),
                             linear-gradient(-45deg, #052659 25%, transparent 25%),
                             linear-gradient(45deg, transparent 75%, #5483B3 75%),
                             linear-gradient(-45deg, transparent 75%, #052659 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}></div>
        </div>
        
        {/* Section Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 xl:w-40 bg-gradient-to-r from-gray-50/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 xl:w-40 bg-gradient-to-l from-gray-50/80 to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <p className="text-xl text-gray-500 mb-12 md:mb-16 font-light">Trusted by healthcare professionals and patients worldwide</p>
          
          {/* Seamless Carousel */}
          <div className="relative">
            {/* Scrolling Container */}
            <div className="flex animate-scroll space-x-16 opacity-40">
              <div className="flex space-x-16 shrink-0">
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MedTech Solutions</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">HealthCorp Global</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">CareNet Systems</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">WellnessAI Labs</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MediCore Technologies</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">HealthBridge Partners</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">VitalCare Networks</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MedFlow Systems</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex space-x-16 shrink-0">
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MedTech Solutions</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">HealthCorp Global</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">CareNet Systems</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">WellnessAI Labs</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MediCore Technologies</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">HealthBridge Partners</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">VitalCare Networks</div>
                <div className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide whitespace-nowrap">MedFlow Systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-36 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #5483B3 0%, transparent 70%)`
          }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight">
            Ready to transform your healthcare?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 md:mb-16 font-light px-4 max-w-4xl mx-auto leading-relaxed">
            Join thousands who trust AidMate for their health guidance.
          </p>
          <Link href="/chat" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-navy-600 to-navy-900 text-white rounded-2xl font-medium hover:from-navy-900 hover:to-navy-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
            Start Your Free Trial
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}