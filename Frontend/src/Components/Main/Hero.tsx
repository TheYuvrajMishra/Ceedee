import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function HeroSection() {

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_section_pic.jpg"
          alt="Refinery Background"
          className="h-full w-full object-cover opacity-60 transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center min-w-full px-4 text-center mt-[-4rem] sm:mt-0">

        {/* Top Pill - Industry Tags */}
        <div className="mb-6 sm:mb-8 flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-amber-600/30 bg-amber-950/30 px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-md">
          <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-amber-500" />
          <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-amber-500 uppercase">Polymers</span>
          <span className="text-amber-500/50 hidden sm:inline">•</span>
          <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-amber-500 uppercase">Automobiles</span>
          <span className="text-amber-500/50 hidden sm:inline">•</span>
          <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-amber-500 uppercase">Solutions</span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 sm:mb-8 flex flex-col items-center text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black uppercase leading-tight sm:leading-none tracking-tighter">
          <span className="text-white drop-shadow-lg">Building Trust,</span>
          <span className="flex flex-wrap justify-center items-baseline gap-2 sm:gap-4 drop-shadow-lg">
            <span className="text-white">Creating</span>
            <span className="text-amber-500">Value.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 sm:mb-12 max-w-xl sm:max-w-3xl text-sm sm:text-lg md:text-2xl font-medium leading-relaxed text-gray-300 drop-shadow-md px-2">
          A legacy of excellence spanning decades, creating opportunities while
          delivering sustainable solutions across industries.
        </p>

        {/* Buttons */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 min-w-screen">
          <button
            onClick={() => {
              const el = document.getElementById("ExploreServices");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer flex flex-1 sm:flex-none min-w-[140px] sm:min-w-[240px] items-center justify-center gap-2 sm:gap-3 bg-amber-900/90 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white shadow-lg transition-all hover:bg-amber-800 hover:scale-105"
          >
            <span className="whitespace-nowrap">EXPLORE</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            to="/contact"
            className="group cursor-pointer flex flex-1 sm:flex-none min-w-[140px] sm:min-w-[240px] items-center justify-center gap-2 sm:gap-3 border border-white/20 bg-white/5 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
          >
            <span className="whitespace-nowrap">BE PARTNER</span>
          </Link>
        </div>


        <div className="marquee-wrapper bottom-0 absolute md:block hidden border-t border-b border-t-black/20 font-thin border-b-black/20 py-2 text-sm md:text-2xl min-w-screen bg-yellow-500 text-black">
        <div className="marquee-content">
          <div className="marquee-text">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}