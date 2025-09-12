import * as React from "react";

const AidMateLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 40"
    fill="none"
    {...props}
  >
    {/* Background circle for the icon */}
    <circle
      cx="20"
      cy="20"
      r="18"
      fill="url(#gradient)"
      className="drop-shadow-lg"
    />
    
    {/* Medical cross */}
    <path
      d="M20 8v24M8 20h24"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    
    {/* Heart shape */}
    <path
      d="M20 28c-4-3-8-6-8-10 0-2.5 2-4.5 4-4.5s3 1.5 4 2.5c1-1 2-2.5 4-2.5s4 2 4 4.5c0 4-4 7-8 10z"
      fill="white"
      opacity="0.9"
    />
    
    {/* Text */}
    <text
      x="45"
      y="16"
      className="fill-current font-bold text-lg"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      Aid
    </text>
    <text
      x="45"
      y="32"
      className="fill-current font-light text-sm opacity-80"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      Mate
    </text>
    
    {/* Gradient definition */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
  </svg>
);

export default AidMateLogo;