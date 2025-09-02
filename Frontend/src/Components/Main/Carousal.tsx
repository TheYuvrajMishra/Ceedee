/**
 * @file Polymerix Landing Page
 * @description A fully responsive, animated landing page component for a modern tech company.
 * Built with React, TypeScript, and Tailwind CSS.
 * @version 1.0.0
 */

// =================================================================================================
// 🧩 IMPORTS
// =================================================================================================

import { useState, useEffect, useCallback, type FC, type SetStateAction } from 'react';

// =================================================================================================
// 📚 TYPE DEFINITIONS
// =================================================================================================

interface IconProps {
  className?: string;
}

type IconComponent = FC<IconProps>;

interface Slide {
  url: string;
  alt: string;
  headline: string;
  subheadline: string;
  badge: string;
}

interface Stat {
  number: string;
  label: string;
  icon: IconComponent;
}

interface CarouselComponentProps {
  slides: Slide[];
  currentIndex: number;
}

interface CarouselControlsProps extends CarouselComponentProps {
  goToSlide: (index: number) => void;
}

// =================================================================================================
// 🎨 SVG ICON LIBRARY
// =================================================================================================

const MenuIcon: IconComponent = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const ChevronRightIcon: IconComponent = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
const PlayIcon: IconComponent = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5,3 19,12 5,21" /></svg>
);
const FlaskIcon: IconComponent = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v6l-3 7c-.5 1.7-.5 3.5 0 5.2C6.5 21.3 7.7 22 9 22h6c1.3 0 2.5-.7 3-1.8.5-1.7.5-3.5 0-5.2L15 8V2" /><path d="M12 2v6" /><path d="M9 2h6" /></svg>
);
const RecycleIcon: IconComponent = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" /><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" /><path d="m14 16-3 3 3 3" /><path d="M8.293 13.596 7.196 9.5 3.1 10.598" /><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" /><path d="m13.378 9.633 4.096 1.098 1.097-4.096" /></svg>
);

// =================================================================================================
// 📈 STATIC DATA & CONFIGURATION
// =================================================================================================

const NAV_LINKS = [
  { href: '#', label: 'About Us' }, { href: '#', label: 'Products' }, { href: '#', label: 'Sustainability' }, { href: '#', label: 'Careers' },
];

const SLIDES_DATA: Slide[] = [
  { url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2070&auto=format&fit=crop', alt: 'Abstract network of glowing blue polymer chains', headline: 'Engineering Excellence in Every Molecule', subheadline: "We design and manufacture high-performance polymers for the world's most demanding applications.", badge: 'Innovation Leader' },
  { url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop', alt: 'Scientist working in a modern polymer research laboratory', headline: 'Innovation Driven by Research', subheadline: 'Our state-of-the-art facilities are dedicated to pushing the boundaries of material science.', badge: 'R&D Excellence' },
  { url: 'https://images.unsplash.com/photo-1621282637458-33e211956b6b?q=80&w=1974&auto=format&fit=crop', alt: 'Eco-friendly product made from recycled polymers', headline: 'Sustainable Solutions for Tomorrow', subheadline: 'Committed to a circular economy and developing environmentally responsible materials.', badge: 'Eco-Friendly' },
  { url: 'https://images.unsplash.com/photo-1581092921462-687000287848?q=80&w=2070&auto=format&fit=crop', alt: 'Automated manufacturing line producing polymer components', headline: 'Precision, Scale, and Reliability', subheadline: 'Delivering consistent quality and scalable production to meet your global supply chain needs.', badge: 'Global Scale' },
];

const STATS_DATA: Stat[] = [
  { number: '50+', label: 'Years Experience', icon: FlaskIcon },
  { number: '1000+', label: 'Products Delivered', icon: ChevronRightIcon },
  { number: '95%', label: 'Recycled Materials', icon: RecycleIcon },
];

// =================================================================================================
// 🎣 CUSTOM HOOKS
// =================================================================================================

/**
 * Tracks the current mouse position on the screen.
 * @returns {{ x: number, y: number }} The current mouse coordinates.
 */
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

/**
 * Manages the state and logic for an autoplaying carousel.
 * @param {number} itemCount - The total number of items in the carousel.
 * @param {number} [autoplayDelay=6000] - The delay in milliseconds for autoplay.
 * @returns {{ currentIndex: number, goToSlide: (index: SetStateAction<number>) => void }}
 */
const useCarousel = (itemCount: number, autoplayDelay = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const goToSlide = (slideIndex: SetStateAction<number>) => setCurrentIndex(slideIndex);

  useEffect(() => {
    if (autoplayDelay > 0) {
      const interval = setInterval(nextSlide, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [nextSlide, autoplayDelay]);

  return { currentIndex, goToSlide };
};

// =================================================================================================
// 🏗️ UI SUB-COMPONENTS
// =================================================================================================

/** Renders a radial gradient that follows the mouse for a subtle interactive effect. */
const AnimatedGradient: FC = () => {
  const mousePosition = useMousePosition();
  return (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
      }}
    />
  );
};

/** Displays the background images with a cross-fade transition. */
const BackgroundCarousel: FC<CarouselComponentProps> = ({ slides, currentIndex }) => (
  <>
    {slides.map((slide, index) => (
      <div
        key={slide.url}
        className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
      >
        <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
      </div>
    ))}
  </>
);

/** Renders the site header with navigation and call-to-action. */
const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-20 text-white p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            POLYMERIX
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-blue-300 transition-all duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" className="hidden sm:inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
            Contact Us
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-blue-300 py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-300">
                {link.label}
              </a>
            ))}
            <div className="border-t border-white/10 pt-4">
              <a href="#" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl w-full text-center block">
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

/** Displays the primary hero content, including animated headlines and CTAs. */
const Hero: FC<CarouselComponentProps> = ({ slides, currentIndex }) => (
  <div className="max-w-6xl w-full">
    <div className="relative h-52 md:h-64 flex items-center justify-center mb-8">
      {slides.map((slide, index) => (
        <div
          key={slide.url}
          className={`absolute text-center transition-all duration-1000 ease-out ${currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-sm font-medium text-blue-300">{slide.badge}</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {slide.headline}
          </h2>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto text-gray-200">
            {slide.subheadline}
          </p>
        </div>
      ))}
    </div>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
      <button className="bg-gradient-to-r from-white to-gray-100 text-black font-bold py-4 px-8 rounded-xl flex items-center gap-3 group hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-2xl">
        Explore Solutions <ChevronRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <button className="bg-transparent border-2 border-blue-400/50 text-blue-300 font-bold py-4 px-8 rounded-xl hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 hover:scale-105 w-full sm:w-auto flex items-center gap-3 group">
        <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> Watch Demo
      </button>
    </div>
  </div>
);

/** Renders a grid of key company statistics. */
const Stats: FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
    {STATS_DATA.map((stat, index) => (
      <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group text-center">
        <div className="flex items-center justify-center mb-3">
          <stat.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
        <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
      </div>
    ))}
  </div>
);

/** Renders the interactive carousel navigation dots. */
const CarouselControls: FC<CarouselControlsProps> = ({ slides, currentIndex, goToSlide }) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
    {slides.map((_, slideIndex) => (
      <button
        key={slideIndex}
        onClick={() => goToSlide(slideIndex)}
        aria-label={`Go to slide ${slideIndex + 1}`}
        className="cursor-pointer h-2 rounded-full transition-all duration-500 ease-in-out hover:scale-110"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-in-out ${currentIndex === slideIndex
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 w-12 shadow-lg shadow-blue-500/50'
              : 'bg-white/40 w-6 hover:bg-white/70 hover:w-8'
            }`}
        ></div>
      </button>
    ))}
  </div>
);

// =================================================================================================
// 🚀 MAIN APPLICATION COMPONENT
// =================================================================================================

/**
 * The root component that assembles the entire landing page.
 */
const App = () => {
  const { currentIndex, goToSlide } = useCarousel(SLIDES_DATA.length);

  return (
    <div className="w-full h-screen bg-black font-sans relative overflow-hidden">
      <AnimatedGradient />
      <BackgroundCarousel slides={SLIDES_DATA} currentIndex={currentIndex} />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />

      <Header />

      <main className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
        <Hero slides={SLIDES_DATA} currentIndex={currentIndex} />
        <Stats />
      </main>

      <CarouselControls slides={SLIDES_DATA} currentIndex={currentIndex} goToSlide={goToSlide} />
    </div>
  );
};

export default App;