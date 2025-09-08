import React from 'react';

const PartnerSection: React.FC = () => {
  return (
    // The main container
    <section className="h-[50vh] bg-gray-950 relative overflow-hidden">
      
      {/* Sandy Texture Overlay. */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15' /%3E%3C/svg%3E")`,
        }}
      />
      
             {/* Content container */}
       <div className="relative z-10 h-full flex items-center">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
           <div className="flex h-full">
             {/* Left side - Text content (30%) */}
             <div className="w-[30%] flex flex-col justify-center pr-8">
               <h2 className="text-3xl fira-sans-black text-stone-100 sm:text-4xl md:text-5xl mb-6 leading-tight">
                 Our Partners
               </h2>
               <p className="text-lg text-stone-300 noto-sans-medium leading-relaxed">
                 Collaborating with industry leaders to deliver exceptional solutions and drive innovation across multiple sectors.
               </p>
             </div>
             
             {/* Right side - Logo marquee (70%) */}
             <div className="w-[70%] flex items-center overflow-hidden">
               <div className="w-full">
                 {/* Marquee container */}
                 <div className="flex animate-marquee">
                   {/* First set of logos */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 5</span>
                     </div>
                   </div>
                   
                   {/* Second set for seamless loop */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 5</span>
                     </div>
                   </div>
                   
                   {/* Third set for extra smoothness */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-stone-200 font-semibold">Partner 5</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* CSS for marquee animation */}
       <style dangerouslySetInnerHTML={{
         __html: `
           @keyframes marquee {
             0% {
               transform: translateX(0);
             }
             100% {
               transform: translateX(-33.333%);
             }
           }
           
           .animate-marquee {
             animation: marquee 30s linear infinite;
             width: calc(300%);
           }
           
           .animate-marquee:hover {
             animation-play-state: paused;
           }
         `
       }} />
    </section>
  );
};

export default PartnerSection;