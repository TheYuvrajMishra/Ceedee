import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Factory, Wrench } from 'lucide-react'

export default function HeroSection() {
  const [hoveredSide, setHoveredSide] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width
    const centerZone = containerWidth * 0.1 // 10% dead zone in center
    const leftBoundary = (containerWidth / 2) - (centerZone / 2)
    const rightBoundary = (containerWidth / 2) + (centerZone / 2)
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    let newHoveredSide: string | null = null
    
    if (x < leftBoundary) {
      newHoveredSide = 'left'
    } else if (x > rightBoundary) {
      newHoveredSide = 'right'
    }
    
    if (newHoveredSide !== hoveredSide) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredSide(newHoveredSide)
      }, 50)
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    
    // Smooth reset: go to "resetting" first, then null
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSide("resetting")
      setTimeout(() => setHoveredSide(null), 600) // after transition duration
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      <div 
        ref={containerRef}
        className="h-screen flex"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Section - Venbro Polymers */}
        <div 
          className={`relative flex items-center justify-center transition-all duration-700 ease-in-out ${
            hoveredSide === 'right'
              ? 'flex-[0.33]'
              : hoveredSide === 'left'
              ? 'flex-[0.67]'
              : hoveredSide === 'resetting'
              ? 'flex-[0.5]'
              : 'flex-1'
          }`}
        >
          {/* Parallax Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85"></div>
          
          {/* Content */}
          <div className={`relative z-10 max-w-lg text-center px-8 transform transition-all duration-700 ease-in-out ${
            hoveredSide === 'right' ? 'scale-90 opacity-75' : 'scale-100 opacity-100'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
              <Factory className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
              Venbro
            </h1>
            
            <h2 className="text-xl font-normal text-slate-300 mb-8 tracking-wider uppercase">
              Polymers
            </h2>
            
            <p className={`text-lg text-slate-400 mb-10 leading-relaxed font-light transition-opacity duration-500 ${
              hoveredSide === 'right' ? 'opacity-0' : 'opacity-100'
            }`}>
              Advanced polymer solutions for industrial applications. Delivering quality materials and innovative manufacturing processes.
            </p>

            <button 
              onClick={() => window.open('https://venbro.com', '_blank')}
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium border border-white/20 hover:border-white/30 cursor-pointer transition-all duration-300"
            >
              Visit Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent z-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-400 rounded-full"></div>
        </div>

        {/* Right Section - Shri Krishna Automobile */}
        <div 
          className={`relative flex items-center justify-center transition-all duration-700 ease-in-out ${
            hoveredSide === 'left'
              ? 'flex-[0.33]'
              : hoveredSide === 'right'
              ? 'flex-[0.67]'
              : hoveredSide === 'resetting'
              ? 'flex-[0.5]'
              : 'flex-1'
          }`}
        >
          {/* Parallax Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2132&q=80')",
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85"></div>
          
          {/* Content */}
          <div className={`relative z-10 max-w-lg text-center px-8 transform transition-all duration-700 ease-in-out ${
            hoveredSide === 'left' ? 'scale-90 opacity-75' : 'scale-100 opacity-100'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
              <Wrench className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl font-light text-white mb-2 tracking-wide leading-tight">
              Shri Krishna
            </h1>
            
            <h2 className="text-xl font-normal text-slate-300 mb-8 tracking-wider uppercase">
              Automobile Enterprise
            </h2>
            
            <p className={`text-lg text-slate-400 mb-10 leading-relaxed font-light transition-opacity duration-500 ${
              hoveredSide === 'left' ? 'opacity-0' : 'opacity-100'
            }`}>
              Professional automotive services and maintenance solutions. Trusted expertise for commercial and personal vehicles.
            </p>

            <button 
              onClick={() => window.open('https://shrikrishnaautomobile.com', '_blank')}
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium border border-white/20 hover:border-white/30 cursor-pointer transition-all duration-300"
            >
              Visit Site
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
