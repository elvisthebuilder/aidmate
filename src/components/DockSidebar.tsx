'use client'

interface DockSidebarProps {
  dockExpanded: boolean
  setDockExpanded: (expanded: boolean) => void
  fullSidebar: boolean
  setFullSidebar: (full: boolean) => void
}

export default function DockSidebar({ dockExpanded, setDockExpanded, fullSidebar, setFullSidebar }: DockSidebarProps) {
  return (
    <div className={`hidden lg:block fixed z-50 transition-all duration-500 ease-out ${fullSidebar ? 'left-0 top-0 bottom-0 w-80' : dockExpanded ? 'left-6 top-1/2 -translate-y-1/2 w-72' : 'left-6 top-1/2 -translate-y-1/2 w-14'}`}>
      <div className={`${fullSidebar ? 'bg-white border-r border-gray-200 rounded-none h-full' : 'bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl'} shadow-2xl overflow-hidden`}>
        {!dockExpanded ? (
          <div className="p-3 space-y-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-navy-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <button className="w-8 h-8 bg-navy-500/10 hover:bg-navy-500/20 rounded-2xl flex items-center justify-center transition-all duration-200 group shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4 text-navy-600 group-hover:text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-white/40 hover:bg-white/60 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-white/40 hover:bg-white/60 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>
            <button className="w-8 h-8 bg-orange-500/20 hover:bg-orange-500/30 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </button>
            <div className="mt-4 pt-3 border-t border-white/30">
              <button onClick={() => setDockExpanded(true)} className="w-8 h-8 bg-white/40 hover:bg-white/60 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {!fullSidebar && (
              <div className="flex items-center justify-center mb-4">
                <button onClick={() => setFullSidebar(true)} className="w-8 h-8 bg-white/40 hover:bg-white/60 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-navy-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900">AidMate</span>
              </div>
              <button onClick={() => fullSidebar ? setFullSidebar(false) : setDockExpanded(false)} className="w-8 h-8 bg-white/40 hover:bg-white/60 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fullSidebar ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M15 19l-7-7 7-7"} />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-navy-50 hover:bg-navy-100' : 'bg-navy-500/10 hover:bg-navy-500/15'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium text-gray-800">Chat</span>
              </button>
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white/25 hover:bg-white/40'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-gray-800">Dashboard</span>
              </button>
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white/25 hover:bg-white/40'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-gray-800">Discover</span>
              </button>
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-red-50 hover:bg-red-100' : 'bg-red-500/10 hover:bg-red-500/15'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-red-600 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="font-medium text-red-600 group-hover:text-red-700">Emergency</span>
              </button>
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-orange-50 hover:bg-orange-100' : 'bg-orange-500/10 hover:bg-orange-500/15'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-orange-600 group-hover:text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-medium text-orange-600 group-hover:text-orange-700">Emergency Guide</span>
              </button>
            </div>
            <div className="mt-6 pt-4 border-t border-white/30">
              <button className={`w-full flex items-center space-x-3 px-4 py-3 ${fullSidebar ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white/25 hover:bg-white/40'} rounded-2xl transition-all duration-200 group shadow-lg hover:shadow-xl`}>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-gray-800">Health Records</span>
              </button>
            </div>
            {fullSidebar && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Recent Chats</h3>
                  <button className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                </div>
                <div className="space-y-1">
                  <button className="w-full flex items-start space-x-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Headache symptoms</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </button>
                  <button className="w-full flex items-start space-x-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">First aid for cuts</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </button>
                  <button className="w-full flex items-start space-x-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Medication interactions</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}