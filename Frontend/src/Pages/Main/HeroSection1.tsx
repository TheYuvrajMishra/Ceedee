import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    '/3.jpg'
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
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Navbar space - transparent area for fixed navbar components */}
      <div className="relative w-full h-20 bg-transparent z-0"></div>
      
      {/* Main content area - adjusted for navbar */}
      <div className="relative w-full" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Fallback background in case images don't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image ${index + 1}:`, slide);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image ${index + 1}:`, slide);
              }}
            />
            {/* Uniform blur overlay over images */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-end">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full flex justify-end">
            {/* Text content */}
            <div className="max-w-2xl bg-amber-50/98 p-10 rounded-3xl backdrop-blur-md border-2 border-amber-200/50 shadow-2xl">
              {/* Main Title */}
              <h1 className="text-gray-800 text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
                Ceedee's Group: A Legacy of Innovation
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                Pioneering Diverse Industries with Vision and Integrity since 1950. 
                From the foundational vision of Late Shri Doraisamy Chinnappa Gounder, Ceedee's Group has grown into a leading force in manufacturing and trading. Rooted in Erode and expanding globally, we proudly foster entrepreneurship through Venbro Polymers and Sri Krishna Automobiles.
              </p>
              
              {/* CTA Button */}
              <button className="border-2 border-orange-500 hover:bg-orange-600 hover:text-white text-gray-800 px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span>Explore Our Solutions</span>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* L-shaped creamy border overlay - clean design */}
      <div className="absolute inset-0 pointer-events-none z-20" style={{ top: '80px' }}>
        {/* Left border - aligned with content area */}
        <div 
          className="absolute left-0 bg-amber-50 w-24"
          style={{ 
            top: '36px',
            height: 'calc(100vh - 116px)',
            borderTopRightRadius: '60px'
          }}
        ></div>
        
        {/* Bottom border - extends but leaves right space */}
        <div 
          className="absolute bottom-0 left-0 bg-amber-50 h-24"
          style={{ 
            width: 'calc(100% - 96px)',
            borderTopRightRadius: '60px'
          }}
        ></div>
      </div>

      {/* Slide Indicators - positioned in the creamy border area on the right curved part */}
      <div className="absolute bottom-8 right-32 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-5 h-5 rounded-full border-2 border-gray-800 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gray-800' 
                : 'bg-transparent hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - positioned in the left creamy border area */}
      <div className="absolute bottom-8 left-8 z-30">
        <div className="text-gray-800 flex items-center gap-2 text-sm font-medium h-5">
          <span>SCROLL</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;