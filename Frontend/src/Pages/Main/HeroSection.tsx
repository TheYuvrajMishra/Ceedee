import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const slides = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    '/3.jpg'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {/* Full Background Image Slideshow */}
      <div className="absolute inset-0">
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
            />
          </div>
        ))}
      </div>

      {/* Creamy Noise Overlay - Half of the screen */}
      <div className="absolute inset-0">
        <div className="w-1/2 h-full bg-amber-50/95 backdrop-blur-sm">
          {/* Noise texture overlay */}
          <div 
            className="w-full h-full opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-start p-4 pt-20">
        <div className="max-w-7xl w-full">
          
          {/* Left Side - Content without background */}
          <div className="max-w-2xl">
            <div className="p-6 lg:p-8">
              <div className="text-amber-900 space-y-4">
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight drop-shadow-lg">
                  Ceedee's Group: A Legacy of 
                  <span className="block text-amber-800">Innovation.</span>
                </h1>
                
                <p className="text-base lg:text-lg font-medium text-amber-700 leading-relaxed drop-shadow-md">
                  Pioneering Diverse Industries with Vision and Integrity since 1950. From the foundational vision of Late Shri Doraisamy Chinnappa Gounder, Ceedee's Group has grown into a leading force in manufacturing and trading. Rooted in Erode and expanding globally, we proudly foster entrepreneurship through Venbro Polymers and Sri Krishna Automobiles.
                </p>
                
                <div className="pt-2">
                  <button className="bg-amber-800 text-amber-50 px-6 py-3 rounded-full font-semibold text-base hover:bg-amber-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 group">
                    Learn About Our Legacy
                    <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ChevronRight className="w-3 h-3 text-amber-800" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white/90 backdrop-blur-sm scale-125 shadow-lg' 
                : 'bg-white/50 backdrop-blur-sm hover:bg-white/75 hover:scale-110 shadow-md'
            }`}
          />
        ))}
      </div>

      {/* Overlay Content */}
      {/* <div className="absolute top-24 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-20 border border-white/30 shadow-lg">
        75+ Years of Excellence
      </div> */}

      {/* <div className="absolute bottom-12 right-6 text-white z-20">
        <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30 shadow-lg">
          <p className="text-lg font-semibold mb-1">Est. 1950</p>
          <p className="text-sm opacity-90">Manufacturing & Trading Excellence</p>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;