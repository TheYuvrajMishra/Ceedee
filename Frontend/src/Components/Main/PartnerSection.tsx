import React from 'react';

const PartnerSection: React.FC = () => {
  return (
    // The main container
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      
             {/* Content container */}
       <div className="relative z-10">
         <div className="max-w-6xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-light mb-8">
               Our Partners
             </h2>
             <div className="w-16 h-px bg-white mx-auto mb-8"></div>
             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
               Collaborating with industry leaders to deliver exceptional solutions and drive innovation across multiple sectors.
             </p>
           </div>
           
           {/* Logo marquee */}
           <div className="flex items-center overflow-hidden">
               <div className="w-full">
                 {/* Marquee container */}
                 <div className="flex animate-marquee">
                   {/* First set of logos */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 5</span>
                     </div>
                   </div>
                   
                   {/* Second set for seamless loop */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 5</span>
                     </div>
                   </div>
                   
                   {/* Third set for extra smoothness */}
                   <div className="flex items-center space-x-8 mr-8 flex-shrink-0">
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 1</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 2</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 3</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 4</span>
                     </div>
                     <div className="flex-shrink-0 w-32 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                       <span className="text-white font-light">Partner 5</span>
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