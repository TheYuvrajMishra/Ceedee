import React from 'react';
import { TWO_COMPANY_SECTION_CONFIG } from './TwoCompany';

const VentureText: React.FC = () => {
  const scrollToNextSection = () => {
    // Scroll to the next section (TwoCompany) using exported config
    const nextSection = document.querySelector(`#${TWO_COMPANY_SECTION_CONFIG.id}`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-[50vh] bg-gray-950 relative overflow-hidden">
      {/* Sandy Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15' /%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content container - centered horizontally and vertically */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main title */}
            <h2 className="text-3xl fira-sans-black text-stone-100 sm:text-4xl md:text-5xl mb-6 leading-tight">
              Introducing our Core Ventures
            </h2>
            
            {/* Subtitle with down arrow */}
            <div className="flex items-center justify-center gap-4">
              <p className="text-lg text-stone-300 noto-sans-medium leading-relaxed">
                From advanced polymer solutions to trusted automotive services, our companies are leaders in their respective fields
              </p>
              
              {/* Down pointing arrow */}
              <button
                onClick={scrollToNextSection}
                className="flex-shrink-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                aria-label="Scroll to next section"
              >
                <svg 
                  className="w-6 h-6 text-stone-200 hover:text-white transition-colors duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VentureText;
