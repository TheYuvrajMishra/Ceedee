import React, { useState, useEffect, useCallback, type FC, useRef } from 'react';

// Icon imports from Lucide
import { ChevronRight, Play} from 'lucide-react';
import Headers from '../Navbar';
import { SLIDES_DATA, STATS_DATA } from './data/hero-data';
// ============================================================================
// DATA, TYPES, AND HOOKS
// ============================================================================

// 1. TYPES
export type Stat = {
  icon: React.ElementType;
  number: string;
  label: string;
};

export type Slide = {
  url: string;
  alt: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
};

export interface CarouselProps {
  slides: Slide[];
  currentIndex: number;
}

export interface CarouselControlsProps extends CarouselProps {
  goToSlide: (index: number) => void;
}



// 3. HOOKS
// const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (ev: MouseEvent) => {
//       setMousePosition({ x: ev.clientX, y: ev.clientY });
//     };
//     window.addEventListener('mousemove', updateMousePosition);
//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//     };
//   }, []);

//   return mousePosition;
// };

const useCarousel = (length: number, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  }, [length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, interval);
    return () => clearInterval(slideInterval);
  }, [goToNext, interval]);

  return { currentIndex, goToSlide };
};


// ============================================================================
// UI SUB-COMPONENTS
// ============================================================================


const BackgroundCarousel: FC<CarouselProps> = ({ slides, currentIndex }) => (
  <>
    {slides.map((slide, index) => (
      <div
        key={slide.url}
        className={`absolute inset-0 h-full w-full transition-all duration-[3000ms] ease-in-out
          ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`
        }
      >
        <img 
          src={slide.url} 
          alt={slide.alt} 
          className="h-full w-full object-cover object-center" 
          loading="lazy"
        />
      </div>
    ))}
  </>
);

const explore = () => {
    const element = document.getElementById("ExploreServices");
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

const HeroContent: FC<CarouselProps> = ({ slides, currentIndex }) => (
  <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="relative flex min-h-[200px] items-center justify-center text-center sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
      {slides.map((slide, index) => (
        <div
          key={slide.url}
          className={`absolute w-full transition-all duration-1500 ease-out
            ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
          }
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-300 sm:mb-4 sm:text-sm md:text-base">{slide.eyebrow}</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-100 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">{slide.headline}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:mt-6 sm:max-w-3xl sm:text-lg md:text-xl lg:max-w-4xl">{slide.subheadline}</p>
        </div>
      ))}
    </div>
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 md:mt-10">
      <button onClick={explore} className="group flex w-full min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-100 px-6 py-3 font-bold text-slate-900 transition-all duration-300 hover:bg-white sm:w-auto sm:px-8 sm:py-3.5 touch-manipulation">
        <span className="text-sm sm:text-base">Explore Our Solutions</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </button>
      <button className="group flex w-full min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-bold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto sm:px-8 sm:py-3.5 touch-manipulation">
        <Play className="h-4 w-4 transition-transform group-hover:scale-110 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base">Watch Demo</span>
      </button>
    </div>
  </div>
);

const Stats: FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid w-full max-w-6xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:px-8">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:px-3 sm:py-5 md:px-4 md:py-6">
        <div className="flex justify-center">
          <stat.icon className="mb-2 h-4 w-4 text-indigo-300 sm:mb-3 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </div>
        <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{stat.number}</div>
        <p className="text-xs text-slate-300 sm:text-sm md:text-base">{stat.label}</p>
      </div>
    ))}
  </div>
);

const CarouselControls: FC<CarouselControlsProps> = ({ slides, currentIndex, goToSlide }) => (
  <div className="absolute bottom-6 left-6 z-20 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10 lg:bottom-12 lg:left-12">
    <div className="flex flex-col items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-2 py-4 backdrop-blur-sm">
      {slides.map((_, slideIndex) => (
        <button
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          aria-label={`Go to slide ${slideIndex + 1}`}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 touch-manipulation"
        >
          <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300
            ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`
          } />
        </button>
      ))}
    </div>
  </div>
);


// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

const CeeDeeHeroSection = () => {
  const { currentIndex, goToSlide } = useCarousel(SLIDES_DATA.length);
  const heroRef = useRef<HTMLDivElement>(null); // Create a ref for the hero section

  return (
    // The main container uses full viewport height and width
    <div
      ref={heroRef}
      className="relative h-screen w-full"
    >
      {/* Background color layer */}
      <div className='absolute inset-0'></div>
      
      {/* Main content container */}
      <div className="relative z-10 h-full w-full overflow-hidden bg-transparent font-sans text-white">
        {/* Background carousel and overlay */}
        <BackgroundCarousel slides={SLIDES_DATA} currentIndex={currentIndex} />
        <div className="absolute inset-0 bg-black/60 sm:bg-black/70 md:bg-black/80" />

        <Headers />

        {/* Main content area - uses flexbox to distribute space */}
        <main className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-2 pt-16 pb-16 xs:px-4 sm:gap-8 sm:pt-20 sm:pb-20 md:gap-12 lg:gap-16">
          <HeroContent slides={SLIDES_DATA} currentIndex={currentIndex} />
          <Stats stats={STATS_DATA} />
        </main>

        <CarouselControls slides={SLIDES_DATA} currentIndex={currentIndex} goToSlide={goToSlide} />
      </div>
    </div>
  );
};

export default CeeDeeHeroSection;