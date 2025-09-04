import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import Headers from '../Navbar'; // Assuming this is your Navbar component
import { SLIDES_DATA } from './data/hero-data'; // Assuming this is your data file

// Main Hero Component
const CeeDeeHeroSection = () => {
  // --- Carousel Logic (from useCarousel hook) ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, 7000); // 7-second interval
    return () => clearInterval(slideInterval);
  }, [goToNext]);

  // --- Button Click Handler (inlined) ---
  const handleExploreClick = () => {
    const element = document.getElementById("ExploreServices");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative font-sans text-white">
      <div className="relative z-10 h-screen w-full overflow-hidden">
        {/* --- Background Videos (from BackgroundCarousel) --- */}
        {SLIDES_DATA.map((slide, index) => (
          <div
            key={slide.url}
            className={`absolute inset-0 h-full w-full transition-all duration-[3000ms] ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={slide.url}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/80" />

        {/* --- Decorative Frame --- */}
        <div className="pointer-events-none absolute opacity-0 md:opacity-100 inset-0 z-1 rounded-lg border border-white/20 bg-black/5 backdrop-blur-sm md:inset-20" />

        <Headers />

        <main className="relative z-10 flex h-full flex-col items-center justify-center">
          {/* --- Animated Text Content (from HeroContent) --- */}
          <div className="relative flex h-72 w-full max-w-6xl items-center justify-center px-4 text-center sm:h-80 sm:px-6">
            {SLIDES_DATA.map((slide, index) => (
              <div
                key={slide.headline}
                className={`absolute transition-opacity duration-1000 ease-in-out ${
                  currentIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className={`mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-300 transition-transform duration-1000 ease-in-out ${
                    currentIndex === index ? 'translate-y-0' : '-translate-y-4'
                  }`}>{slide.eyebrow}</p>
                <h1 className={`text-4xl font-bold tracking-tight text-slate-100 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-in-out delay-150 sm:text-5xl md:text-6xl lg:text-7xl ${
                    currentIndex === index ? 'translate-y-0' : '-translate-y-4'
                  }`}>{slide.headline}</h1>
                <p className={`mx-auto mt-3 md:mt-6 max-w-3xl text-lg font-light text-slate-300 transition-transform duration-1000 ease-in-out delay-300 md:text-xl ${
                    currentIndex === index ? 'translate-y-0' : '-translate-y-4'
                  }`}>{slide.subheadline}</p>
              </div>
            ))}
          </div>
          {/* --- Action Buttons --- */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={handleExploreClick} className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-100 px-8 py-3.5 font-bold text-slate-900 transition-all duration-300 hover:bg-white sm:w-auto">
              Explore Our Solutions <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 font-bold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:w-auto">
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" /> Watch Demo
            </button>
          </div>
        </main>

        {/* --- Carousel Controls --- */}
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10">
          <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm">
            {SLIDES_DATA.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex ? 'scale-125 bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeeDeeHeroSection;