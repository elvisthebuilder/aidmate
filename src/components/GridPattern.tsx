interface GridPatternProps {
  width?: string
  opacity?: string
  gridSize?: string
  color?: string
}

export default function GridPattern({ 
  width = "w-4/5", 
  opacity = "opacity-[0.08]", 
  gridSize = "50px 50px",
  color = "#5483B3"
}: GridPatternProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`${width} h-full ${opacity}`}>
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: gridSize
        }}></div>
      </div>
    </div>
  )
}