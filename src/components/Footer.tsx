import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {/* <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.5 12c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zm-2.5 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-4-8.5c0-.83-.67-1.5-1.5-1.5S10 3.67 10 4.5v7.84c-1.18.69-2 1.94-2 3.41 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.47-.82-2.72-2-3.41V4.5zm-1 11.25c-1.24 0-2.25-1.01-2.25-2.25S10.76 11.25 12 11.25s2.25 1.01 2.25 2.25S13.24 15.75 12 15.75zm6-3.75c0 .28-.22.5-.5.5h-1.79c-.45 1.12-1.54 1.93-2.82 1.99-.17.01-.34.01-.51.01v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-1.5c-.17 0-.34 0-.51-.01-1.28-.06-2.37-.87-2.82-1.99H6.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1.79c.45-1.12 1.54-1.93 2.82-1.99.17-.01.34-.01.51-.01V8.5c0-.28.22-.5.5-.5s.5.22.5.5v1.5c.17 0 .34 0 .51.01 1.28.06 2.37.87 2.82 1.99H17.5c.28 0 .5.22.5.5z"/>
              </svg>
            </div> */}
            <h3 className="text-3xl font-light">AidMate</h3>
          </div>
          <p className="text-gray-300 italic text-[15px] md:text-normal  max-w-2xl mx-auto leading-relaxed">
            Empowering better health decisions through AI-powered guidance. 
            Your trusted companion for medical insights and wellness support.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <Link href="#features" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Pricing
          </Link>
          <Link href="/chat" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Try Now
          </Link>
          <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Privacy
          </Link>
          <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Terms
          </Link>
          <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors font-medium">
            Support
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700  pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AidMate. All rights reserved.
            </p>
            <div className="flex items-center flex-col gap-10 space-x-6">
              {/* <span className="text-gray-400 text-sm">Made with ❤️ for better health</span> */}
              <p className="text-gray-400 text-sm">Powered by <span className='text-indigo-400'>APPBAI</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}