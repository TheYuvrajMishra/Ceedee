import React from 'react';

const HeroSectionInfo: React.FC = () => {
  return (
    <div className="relative h-[50vh] bg-amber-50 overflow-hidden">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className="max-w-6xl w-full text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-amber-900 drop-shadow-lg">
            Ceedee's Group of companies is an industry leader in providing a range of services in the sphere of various manufacturing and trading enterprises worldwide!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionInfo;
