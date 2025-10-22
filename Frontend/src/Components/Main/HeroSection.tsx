// import { useState, useEffect, useCallback, useRef, type FC } from "react";
// import { ChevronRight} from "lucide-react";
// import Headers from "../Navbar"; // Assuming this is your Navbar component
// import { SLIDES_DATA } from "./data/hero-data"; // Assuming this is your data file

// // ============================================================================
// // DATA, TYPES, AND HOOKS
// // ============================================================================

// // 1. TYPES
// export type Stat = {
//   icon: React.ElementType;
//   number: string;
//   label: string;
// };

// export type Slide = {
//   url: string;
//   alt: string;
//   eyebrow: string;
//   headline: string;
//   subheadline: string;
// };

// export interface CarouselProps {
//   slides: Slide[];
//   currentIndex: number;
// }

// export interface CarouselControlsProps extends CarouselProps {
//   goToSlide: (index: number) => void;
// }

// // 3. HOOKS
// // const useMousePosition = () => {
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

// //   useEffect(() => {
// //     const updateMousePosition = (ev: MouseEvent) => {
// //       setMousePosition({ x: ev.clientX, y: ev.clientY });
// //     };
// //     window.addEventListener('mousemove', updateMousePosition);
// //     return () => {
// //       window.removeEventListener('mousemove', updateMousePosition);
// //     };
// //   }, []);

// //   return mousePosition;
// // };

// const useCarousel = (_length: number, _interval = 5000) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const goToNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
//   }, []);

//   const goToSlide = (slideIndex: number) => {
//     setCurrentIndex(slideIndex);
//   };

//   useEffect(() => {
//     const slideInterval = setInterval(goToNext, 7000); // 7-second interval
//     return () => clearInterval(slideInterval);
//   }, [goToNext]);

//   return { currentIndex, goToSlide };
// };

// // ============================================================================
// // UI SUB-COMPONENTS
// // ============================================================================

// const SandyTextureOverlay: FC = () => (
//   <div
//     className="absolute inset-0 pointer-events-none"
//     style={{
//       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08' /%3E%3C/svg%3E")`,
//       zIndex: 0,
//     }}
//   />
// );

// const BackgroundCarousel = ({ slides, currentIndex }: CarouselProps) => (
//   <>
//     {slides.map((slide, index) => (
//       <div
//         key={slide.url}
//         className={`absolute inset-0 h-full w-full transition-all duration-[3000ms] ease-in-out
//           ${
//             index === currentIndex
//               ? "opacity-100 scale-100"
//               : "opacity-0 scale-105"
//           }`}
//       >
//         <video
//           src={slide.url}
//           className="h-full w-full object-cover object-center"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="none"
//         >
//         </video>
//       </div>
//     ))}
//   </>
// );

// const explore = () => {
//   const element = document.getElementById("ExploreServices");
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// };

// const HeroContent: FC<CarouselProps> = ({ slides, currentIndex }) => (
//   <div className="w-full max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
//     <div className="relative flex flex-col items-center justify-center text-center">
//       {/* Fixed space containers for each text type */}
//       <div className="flex flex-col items-center space-y-3 xs:space-y-4 sm:space-y-6">
//         {/* Eyebrow container - fixed height with better mobile scaling */}
//         <div className="h-[14px] xs:h-[16px] sm:h-[20px] md:h-[24px] flex items-center justify-center">
//           {slides.map((slide, index) => (
//             <p
//               key={`eyebrow-${slide.url}`}
//               className={`absolute text-[10px] xs:text-xs uppercase raleway-light tracking-wider text-amber-600 sm:text-sm md:text-base transition-all duration-1000 ease-in-out
//                 ${
//                   currentIndex === index
//                     ? "opacity-100 blur-0 scale-100"
//                     : "opacity-0 blur-md scale-95 pointer-events-none"
//                 }`}
//             >
//               {slide.eyebrow}
//             </p>
//           ))}
//         </div>

//         {/* Headline container - better mobile height management */}
//         <div className="h-[60px] xs:h-[72px] sm:h-[96px] raleway-bold md:h-[120px] lg:h-[144px] xl:h-[168px] flex items-center justify-center px-2">
//           {slides.map((slide, index) => (
//             <h1
//               key={`headline-${slide.url}`}
//               className={`absolute text-2xl xs:text-3xl leading-tight tracking-tight text-slate-100 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-1000 ease-in-out
//                 ${
//                   currentIndex === index
//                     ? "opacity-100 blur-0 scale-100"
//                     : "opacity-0 blur-md scale-95 pointer-events-none"
//                 }`}
//             >
//               {slide.headline}
//             </h1>
//           ))}
//         </div>

//         {/* Subheadline container - better mobile text sizing */}
//         <div className="h-[40px] xs:h-[48px] sm:h-[56px] raleway-regular md:h-[64px] mx-auto max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl flex items-center justify-center">
//           {slides.map((slide, index) => (
//             <p
//               key={`subheadline-${slide.url}`}
//               className={`absolute text-sm xs:text-base text-slate-300 sm:text-lg md:text-xl transition-all duration-1000 ease-in-out px-2 xs:px-4 leading-relaxed
//                 ${
//                   currentIndex === index
//                     ? "opacity-100 blur-0 scale-100"
//                     : "opacity-0 blur-md scale-95 pointer-events-none"
//                 }`}
//             >
//               {slide.subheadline}
//             </p>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Buttons with better mobile spacing */}
//     <div className="mt-6 xs:mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4 md:mt-16">
//       <button
//         onClick={explore}
//         className="group flex w-full xs:w-auto min-w-[280px] xs:min-w-[300px] sm:min-w-0 min-h-[44px] xs:min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 xs:px-6 py-3 font-bold text-slate-900 transition-all duration-300 hover:bg-white sm:w-auto sm:px-8 sm:py-3.5 touch-manipulation"
//       >
//         <span className="inter-tight-balck text-sm xs:text-base">
//           Explore Our Solutions
//         </span>
//         <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
//       </button>
//     </div>
//   </div>
// );

// // const Stats: FC<{ stats: Stat[] }> = ({ stats }) => (
// //   <div className="grid w-full max-w-6xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:px-8">
// //     {stats.map((stat) => (
// //       <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:px-3 sm:py-5 md:px-4 md:py-6">
// //         <div className="flex justify-center">
// //           <stat.icon className="mb-2 h-4 w-4 text-indigo-300 sm:mb-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
// //         </div>
// //         <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{stat.number}</div>
// //         <p className="text-xs text-slate-300 sm:text-sm md:text-base">{stat.label}</p>
// //       </div>
// //     ))}
// //   </div>
// // );

// const CarouselControls: FC<CarouselControlsProps> = ({
//   slides,
//   currentIndex,
//   goToSlide,
// }) => (
//   <div className="absolute bottom-4 xs:bottom-6 left-1/2 transform -translate-x-1/2 z-20 sm:bottom-8 md:bottom-10 lg:bottom-12">
//     <div className="flex items-center justify-center gap-2 xs:gap-3 rounded-full bg-white/5 border border-white/50 px-3 xs:px-4 py-2 backdrop-blur-sm">
//       {slides.map((_, slideIndex) => (
//         <button
//           key={slideIndex}
//           onClick={() => goToSlide(slideIndex)}
//           aria-label={`Go to slide ${slideIndex + 1}`}
//           className="flex h-7 w-7 xs:h-8 xs:w-8 items-center justify-center rounded-full transition-all duration-300 touch-manipulation"
//         >
//           <div
//             className={`h-2 w-2 xs:h-2.5 xs:w-2.5 rounded-full transition-all duration-300
//             ${
//               currentIndex === slideIndex
//                 ? "bg-white scale-125"
//                 : "bg-white/40 hover:bg-white/70"
//             }`}
//           />
//         </button>
//       ))}
//     </div>
//   </div>
// );

// // ============================================================================
// // MAIN HERO COMPONENT
// // ============================================================================

// const CeeDeeHeroSection = () => {
//   const { currentIndex, goToSlide } = useCarousel(SLIDES_DATA.length);
//   const heroRef = useRef<HTMLDivElement>(null); // Create a ref for the hero section

//   return (
//     // The main container uses full viewport height with safe area handling
//     <div ref={heroRef} className="relative raleway h-screen w-full min-h-[600px] xs:min-h-[700px]">
//       {/* Background color layer */}
//       <div className="absolute inset-0"></div>

//       {/* Main content container */}
//       <div className="relative z-10 h-full w-full overflow-hidden bg-transparent text-white">
//         {/* Background carousel */}
//         <BackgroundCarousel slides={SLIDES_DATA} currentIndex={currentIndex} />

//         {/* Black overlay for entire background with slightly more opacity on mobile */}
//         <div className="absolute inset-0 bg-black/70 xs:bg-black/65 sm:bg-black/60" />

//         <Headers />

//         {/* Main content area - better mobile padding and spacing */}
//         <main className="relative z-10 flex h-full flex-col items-center justify-center pt-16 xs:pt-20 pb-6 xs:pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16">
//           <div className="flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 flex-1 min-h-0 w-full max-w-7xl mx-auto">
//             {/* Dark background container for text content - better mobile responsiveness */}
//             <div
//               className="backdrop-blur-sm py-6 xs:py-8 sm:py-10 md:py-12 bg-transparent border-1 border-white/20 mx-auto"
//               style={{
//                 width: "calc(100% - clamp(24px, 3vw, 96px))",
//                 maxWidth: "calc(100vw - clamp(24px, 3vw, 96px))",
//                 paddingLeft: "clamp(16px, 3vw, 48px)",
//                 paddingRight: "clamp(16px, 3vw, 48px)",
//               }}
//             >
//               <SandyTextureOverlay />
//               <HeroContent slides={SLIDES_DATA} currentIndex={currentIndex} />
//             </div>
//             {/* <Stats stats={STATS_DATA} /> */}
//           </div>
//         </main>

//         <CarouselControls
//           slides={SLIDES_DATA}
//           currentIndex={currentIndex}
//           goToSlide={goToSlide}
//         />
//       </div>
//     </div>
//   );
// };

// export default CeeDeeHeroSection;