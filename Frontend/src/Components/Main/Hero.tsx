import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Base classes for flex centering are kept, as they are essential
    <section className="relative bg-gradient-to-b from-amber-400/10 via-white via-50% to-white h-screen flex items-center justify-center overflow-hidden">

      {/* 1. BACKGROUND: Optimized with img tag for LCP with Parallax */}
      <div
        className="absolute inset-4 
                   md:inset-auto md:h-160 md:w-360 md:mx-auto md:mt-12
                   shadow-[inset_0_0_40px_rgba(0,0,0,1)] overflow-hidden"
      >
        <img
          src="/hero_section_pic.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
          }}
          width="2000"
          height="1333"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      {/* Content centered with buttons beneath */}
      <div 
        className="relative z-20 container mx-auto px-4 sm:px-6 text-white"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      >

        {/* Centered content wrapper */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-5">
          {/* Industry Tags - Centered */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
              Polymers
            </span>
            <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
              Automobiles
            </span>
            <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
              Solutions
            </span>
          </div>

          {/* Main Heading - Centered with mixed font treatments */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem] leading-tight tracking-tight text-white">
              <span className="block text-[0.6rem] sm:text-xs uppercase tracking-[0.35em] font-semibold text-white/70">
                Ceedee Group Promise
              </span>
              <span className="mt-3 sm:mt-4 flex w-full flex-col items-center justify-center gap-2 sm:gap-3 text-center md:flex-row md:items-end md:justify-center">
                <span className="font-serif font-light text-white whitespace-nowrap leading-tight md:leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Building Trust
                </span>
                <span className="font-sans whitespace-nowrap font-black text-amber-300 uppercase tracking-[0.08em] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                  Creating Value
                </span>
              </span>
              <span className="block font-light italic text-white/90 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem]">
                Empowering Communities
              </span>
            </h1>
          </div>

          {/* Description - Centered with emphasized typography */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-sans">
            A <span className="font-semibold font-serif text-white">legacy of excellence</span> spanning decades, creating
            opportunities while delivering sustainable solutions across industries.
          </p>

          

          {/* Action Buttons - Centered beneath content */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <button
              onClick={() => {
                const el = document.getElementById("ExploreServices");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white group rounded-full text-slate-900 cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-white/95 transition-all duration-300 tracking-wide text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>EXPLORE OPPORTUNITIES</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
            <Link
              to={"/contact"}
              onClick={() => navigate("/contact")}
              className="border-2 group rounded-full border-white cursor-pointer text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 tracking-wide text-sm font-semibold backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>BECOME A PARTNER</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}