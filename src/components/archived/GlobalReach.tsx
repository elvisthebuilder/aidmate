'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

export default function GlobalReach() {
  const [activeRegion, setActiveRegion] = useState(0)
  const [counters, setCounters] = useState({
    countries: 0,
    languages: 0,
    users: 0
  })

  const regions = [
    { 
      name: 'North America', 
      users: '2.1M', 
      countries: 3, 
      color: 'bg-blue-500',
      center: [-100, 45],
      scale: 200
    },
    { 
      name: 'Europe', 
      users: '1.8M', 
      countries: 27, 
      color: 'bg-teal-500',
      center: [10, 54],
      scale: 300
    },
    { 
      name: 'Asia Pacific', 
      users: '3.2M', 
      countries: 15, 
      color: 'bg-blue-600',
      center: [100, 25],
      scale: 180
    },
    { 
      name: 'Latin America', 
      users: '890K', 
      countries: 12, 
      color: 'bg-teal-600',
      center: [-60, -15],
      scale: 250
    },
    { 
      name: 'Africa', 
      users: '450K', 
      countries: 8, 
      color: 'bg-blue-400',
      center: [20, 0],
      scale: 220
    }
  ]

  // Removed globalDots as we're now using real geographic coordinates

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, key: keyof typeof counters) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, 30)
    }

    animateCounter(65, 'countries')
    animateCounter(40, 'languages')
    animateCounter(8500000, 'users')

    // Cycle through regions
    const regionTimer = setInterval(() => {
      setActiveRegion(prev => (prev + 1) % regions.length)
    }, 2000)

    return () => clearInterval(regionTimer)
  }, [])

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'w-2 h-2'
      case 'medium': return 'w-3 h-3'
      case 'large': return 'w-4 h-4'
      case 'extra-large': return 'w-5 h-5'
      default: return 'w-3 h-3'
    }
  }

  return (
    <section className="py-20 md:py-32 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3B82F6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #14B8A6 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Healing the World
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AidMate serves millions of users across the globe, breaking down barriers to healthcare access
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* World Map Visualization */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900/50 to-teal-900/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              {/* Professional World Map */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: regions[activeRegion].scale,
                    center: regions[activeRegion].center
                  }}
                  className="w-full h-full transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `scale(${1 + Math.sin(Date.now() / 2000) * 0.02})`,
                    transition: 'transform 2s ease-in-out'
                  }}
                >
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  
                  <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="url(#mapGradient)"
                          stroke="#334155"
                          strokeWidth={0.5}
                          className="hover:fill-blue-800 transition-colors duration-300"
                        />
                      ))
                    }
                  </Geographies>
                  
                  {/* Major Cities Markers */}
                  {[
                    { name: "New York", coordinates: [-74.006, 40.7128], region: 0, size: "large" },
                    { name: "London", coordinates: [-0.1276, 51.5074], region: 1, size: "large" },
                    { name: "Tokyo", coordinates: [139.6917, 35.6895], region: 2, size: "extra-large" },
                    { name: "São Paulo", coordinates: [-46.6333, -23.5505], region: 3, size: "medium" },
                    { name: "Lagos", coordinates: [3.3792, 6.5244], region: 4, size: "small" },
                    { name: "Sydney", coordinates: [151.2093, -33.8688], region: 2, size: "medium" },
                    { name: "Berlin", coordinates: [13.4050, 52.5200], region: 1, size: "small" },
                    { name: "Mumbai", coordinates: [72.8777, 19.0760], region: 2, size: "large" }
                  ].map((marker, index) => (
                    <Marker key={index} coordinates={marker.coordinates}>
                      <circle
                        r={marker.size === 'extra-large' ? 8 : marker.size === 'large' ? 6 : marker.size === 'medium' ? 4 : 3}
                        fill={activeRegion === marker.region ? '#3B82F6' : '#14B8A6'}
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                      <circle
                        r={marker.size === 'extra-large' ? 12 : marker.size === 'large' ? 10 : marker.size === 'medium' ? 8 : 6}
                        fill={activeRegion === marker.region ? '#3B82F6' : '#14B8A6'}
                        fillOpacity={0.3}
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                    </Marker>
                  ))}
                </ComposableMap>
              </div>

              {/* Active Region Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-medium text-white mb-2">
                  {regions[activeRegion].name}
                </h3>
                <div className="flex justify-center space-x-6 text-sm">
                  <span className="text-blue-300">{regions[activeRegion].users} users</span>
                  <span className="text-teal-300">{regions[activeRegion].countries} countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="text-5xl font-light text-blue-400 mb-2">
                    {counters.countries}+
                  </div>
                  <div className="text-gray-300 text-lg">Countries Served</div>
                  <div className="text-sm text-gray-400 mt-2">Across 6 continents</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="text-5xl font-light text-teal-400 mb-2">
                    {counters.languages}+
                  </div>
                  <div className="text-gray-300 text-lg">Languages</div>
                  <div className="text-sm text-gray-400 mt-2">Real-time translation</div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="text-5xl font-light text-blue-300 mb-2">
                    {(counters.users / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-gray-300 text-lg">Lives Impacted</div>
                  <div className="text-sm text-gray-400 mt-2">And growing daily</div>
                </div>
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-medium mb-4">Universal Access</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Screen Reader Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                  </svg>
                  <span>Offline Capability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" clipRule="evenodd" />
                  </svg>
                  <span>SMS Integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  <span>Low Bandwidth Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}