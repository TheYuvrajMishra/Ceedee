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
      
      {/* <div 
        className="absolute top-0 left-0 h-full opacity-100"
        style={{ backgroundColor: '#243354',width: '25%', zIndex: 1 }}
      ></div> */}

      {/* Left translucent white line */}
      <div 
        className="absolute top-0 left-0 h-full"
        style={{ 
          width: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginLeft: '64px',
          zIndex: 3 
        }}
      ></div>

      {/* Right translucent white line */}
      <div 
        className="absolute top-0 right-0 h-full"
        style={{ 
          width: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          marginRight: '64px',
          zIndex: 3 
        }}
      ></div>

      {/* Top translucent white line - positioned below navbar */}
      <div 
        className="absolute left-0 right-0"
        style={{ 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          top: '80px',
          // marginLeft: '64px',
          // marginRight: '64px',
          zIndex: 3 
        }}
      ></div>

      {/* Bottom translucent white line */}
      <div 
        className="absolute left-0 right-0"
        style={{ 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
          bottom: '64px',
          // marginLeft: '64px',
          // marginRight: '64px',
          zIndex: 3 
        }}
      ></div>

      {/* Vertical Status Dots - Left side outside the line */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col"
        style={{ 
          marginLeft: '24px',
          zIndex: 4,
          gap: '24px'
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white border-white' 
                : 'bg-transparent border-white hover:bg-white/30'
            }`}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative h-full flex items-center justify-start" style={{ zIndex: 2 }}>
        {/* Main Title */}
        <div className="text-left" style={{ paddingLeft: '80px', paddingBottom: '140px' }}>
          <div className="mb-12">
            <h1 
              className="text-white inter-tight-black leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                // fontWeight: '300',
                // letterSpacing: '2px',
                // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
              }}
            >
              Ceedee's Group A Legacy of Innovation
            </h1>
          </div>
          <div className="mt-4">
            <p 
              className="text-white leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: '300',
                maxWidth: '600px',
                opacity: '0.9'
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