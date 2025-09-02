import React, { useState, useEffect, useCallback, type FC } from 'react';

// Icon imports from Lucide
import { ChevronRight, Play, Briefcase, Users, TrendingUp } from 'lucide-react';
import Headers from '../Navbar';
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


// 2. DATA
const SLIDES_DATA: Slide[] = [
  {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    alt: 'Team collaborating in a modern office',
    eyebrow: 'Innovate & Excel',
    headline: 'Next-Generation Tech Solutions',
    subheadline: 'Driving business growth with cutting-edge technology and unparalleled expertise.',
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    alt: 'Computer screen with data charts and graphs',
    eyebrow: 'Data-Driven Insights',
    headline: 'Unlock Your Data Potential',
    subheadline: 'Leverage the power of analytics to make smarter decisions and outperform the competition.',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    alt: 'People working together on laptops',
    eyebrow: 'Seamless Integration',
    headline: 'Connecting Your Digital World',
    subheadline: 'Our solutions integrate flawlessly with your existing infrastructure for a streamlined workflow.',
  },
];

const STATS_DATA: Stat[] = [
  {
    icon: Briefcase,
    number: '150+',
    label: 'Projects Completed',
  },
  {
    icon: Users,
    number: '85+',
    label: 'Satisfied Clients',
  },
  {
    icon: TrendingUp,
    number: '300%',
    label: 'Average ROI',
  },
];


// 3. HOOKS
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

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


const AnimatedGradient: FC = () => {
  const mousePosition = useMousePosition();
  const circleSize = 30;
  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden rounded-full lg:block"
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        transform: `translate(${mousePosition.x - circleSize / 2}px, ${mousePosition.y - circleSize / 2}px)`,
      }}
    />
  );
};

const BackgroundCarousel: FC<CarouselProps> = ({ slides, currentIndex }) => (
  <>
    {slides.map((slide, index) => (
      <div
        key={slide.url}
        className={`absolute inset-0 h-full w-full transition-all duration-[3000ms] ease-in-out
          ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`
        }
      >
        <img src={slide.url} alt={slide.alt} className="h-full w-full object-cover" />
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
  <div className="w-full max-w-6xl px-4 sm:px-6">
    <div className="relative flex h-72 items-center justify-center text-center sm:h-80">
      {slides.map((slide, index) => (
        <div
          key={slide.url}
          className={`absolute transition-all duration-1500 ease-out
            ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
          }
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-300">{slide.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl">{slide.headline}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">{slide.subheadline}</p>
        </div>
      ))}
    </div>
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button onClick={explore} className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-100 px-8 py-3.5 font-bold text-slate-900 transition-all duration-300 hover:bg-white sm:w-auto">
        Explore Our Solutions <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 font-bold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto">
        <Play className="h-5 w-5 transition-transform group-hover:scale-110" /> Watch Demo
      </button>
    </div>
  </div>
);

const Stats: FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 md:px-30 sm:grid-cols-3 sm:gap-6">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 px-2 py-6 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/10">
        <div className="flex justify-center">
          <stat.icon className="mb-3 h-5 w-5 text-indigo-300" />
        </div>
        <div className="text-3xl font-bold text-white">{stat.number}</div>
        <p className="text-sm text-slate-300">{stat.label}</p>
      </div>
    ))}
  </div>
);

const CarouselControls: FC<CarouselControlsProps> = ({ slides, currentIndex, goToSlide }) => (
  <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
    <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm">
      {slides.map((_, slideIndex) => (
        <button
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          aria-label={`Go to slide ${slideIndex + 1}`}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300
            ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`
          }
        />
      ))}
    </div>
  </div>
);


// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

const CeeDeeHeroSection = () => {
    const { currentIndex, goToSlide } = useCarousel(SLIDES_DATA.length);

    return (
        <div className="relative">
            {/* Background color layer */}
            <div className='absolute inset-0 bg-yellow-200/10'></div>
            
            {/* Main content container */}
            <div className="relative z-10 w-full overflow-hidden bg-transparent font-sans text-white md:rounded-b-full">
                {/* Background carousel and overlay */}
                <BackgroundCarousel slides={SLIDES_DATA} currentIndex={currentIndex} />
                <div className="absolute inset-0 bg-black/80" />
                <AnimatedGradient />

                <Headers />

                {/* Main content area with responsive padding for flexible height */}
                <main className="relative z-10 flex flex-col items-center gap-12 pt-28 pb-20 md:gap-16 md:pt-5 md:pb-28">
                    <HeroContent slides={SLIDES_DATA} currentIndex={currentIndex} />
                    <Stats stats={STATS_DATA} />
                </main>

                <CarouselControls slides={SLIDES_DATA} currentIndex={currentIndex} goToSlide={goToSlide} />
            </div>
        </div>
    );
};

export default CeeDeeHeroSection;

