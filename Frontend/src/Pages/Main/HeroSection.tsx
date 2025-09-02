import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/Hero/heroOne.png',
    '/Hero/heroTwo.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="hero-section h-screen w-full relative overflow-hidden"
    >
      {/* Background Images with sliding effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: 1 }}
      ></div>

      {/* Left translucent white line */}
      <div 
        className="absolute top-0 left-0 h-full"
        style={{ 
          width: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginLeft: 'clamp(16px, 5vw, 64px)',
          zIndex: 3 
        }}
      ></div>

      {/* Right translucent white line */}
      <div 
        className="absolute top-0 right-0 h-full"
        style={{ 
          width: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginRight: 'clamp(16px, 5vw, 64px)',
          zIndex: 3 
        }}
      ></div>

      {/* Top translucent white line - positioned below navbar */}
      <div 
        className="absolute left-0 right-0"
        style={{ 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          top: 'clamp(60px, 10vw, 80px)',          
          zIndex: 3 
        }}
      ></div>

      {/* Bottom translucent white line */}
      <div 
        className="absolute left-0 right-0"
        style={{ 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          bottom: 'clamp(32px, 8vw, 64px)',
          zIndex: 3 
        }}
      ></div>

      {/* Scroll Indicator - Bottom center aligned with navbar logo */}
      <div 
        className="absolute flex flex-col items-center"
        style={{ 
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '24px',
          zIndex: 4,
          gap: '8px'
        }}
      >
        {/* SCROLL text above the line */}
        <div 
          className="noto-sans-medium text-white text-md tracking-wider"
          style={{ 
            opacity: '0.8',            
          }}
        >
          SCROLL
        </div>
        
        {/* Pointer below the line */}
        <div 
          className="text-white"
          style={{ 
            opacity: '0.8',
          }}
        >
          <svg 
            className="w-12 h-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7" 
            />
          </svg>
        </div>
      </div>

      {/* Vertical Status Dots - Left side outside the line */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col"
        style={{ 
          marginLeft: 'clamp(8px, 2vw, 24px)',
          zIndex: 4,
          gap: 'clamp(16px, 4vw, 24px)'
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`rounded-full border-2 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white border-white' 
                : 'bg-transparent border-white hover:bg-white/30'
            }`}
            style={{ 
              cursor: 'pointer',
              width: 'clamp(10px, 2.5vw, 12px)',
              height: 'clamp(10px, 2.5vw, 12px)'
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative h-full flex items-center justify-start" style={{ zIndex: 2 }}>
        {/* Main Title */}
        <div className="text-left flex flex-col px-4 sm:px-8 md:px-16 lg:px-20" style={{ paddingLeft: 'clamp(20px, 8vw, 100px)', gap: 'clamp(24px, 6vw, 46px)' }}>
          <div>
            <h2
              className="noto-sans-medium text-white text-xs sm:text-sm md:text-base"
              style={{
                opacity: '0.8',
                fontSize: 'clamp(10px, 2.5vw, 16px)'
              }}
            >
              "PIONEERING DIVERSE INDUSTRIES WITH VISION AND INTEGRITY SINCE 1950"
            </h2>
            <h1 
              className="text-white fira-sans-black leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 4rem)',
              }}
            >
              <span style={{ color: '#ea5e21' }}>Ceedee's Group</span> A Legacy of <br className="hidden sm:block" />Innovation
            </h1>
          </div>
          <div>
            <p 
              className="noto-sans-medium text-white leading-tight"
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1.2rem)',
                maxWidth: 'clamp(280px, 80vw, 600px)',
                opacity: '0.6'                
              }}
            >
              From the foundational vision of Late Shri Doraisamy Chinnappa Gounder, Ceedee's Group has grown into a leading force in manufacturing and trading. Rooted in Erode and expanding globally, we proudly foster entrepreneurship through Venbro Polymers and Sri Krishna Automobiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;