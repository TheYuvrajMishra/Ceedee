import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    // Base classes for flex centering are kept, as they are essential
    <section className="relative bg-gradient-to-b from-amber-400/10 via-white via-50% to-white h-screen flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND: Your exact desktop dimensions are restored. */}
      <div
        className="absolute bg-fixed bg-cover bg-center 
                   inset-4 
                   md:inset-auto md:h-160 md:w-360 md:mx-auto md:mt-12
                   shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Hero Content */}
      {/* 2. CONTENT WRAPPER: Your md:-mt-40 is restored. */}
      <div className="relative z-20 container mx-auto px-6 text-white md:-mt-40">
        
        {/* 3. GRID: Your gap-35 is restored and mobile gap is set. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[8.75rem] items-center">
          
          {/* Left Column: Mobile-breaking mt-50 is removed. */}
          <div className="flex flex-col gap-8 text-center md:text-left">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-thin leading-tight tracking-tight">
              Building Trust, Creating Value, Empowering Communities
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                Polymers
              </span>
              <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                Automobiles
              </span>
              <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                Solutions
              </span>
            </div>
          </div>

          {/* Right Column: Mobile-breaking -mt-25 is removed. */}
          <div className="flex flex-col gap-8 items-center md:items-end">
            <p className="md:text-lg text-sm text-white/80 max-w-md leading-relaxed text-center md:text-right">
              A legacy of excellence spanning decades, creating opportunities
              while delivering sustainable solutions across industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const el = document.getElementById("ExploreServices");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white group rounded-full text-black cursor-pointer px-8 py-3 hover:bg-white/95 transition-colors duration-300 tracking-wider text-sm"
              >
                EXPLORE OPPORTUNITIES
                <ArrowRight className="inline ml-2 w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
              <Link
                to={"/contact"}
                onClick={() => navigate("/contact")}
                className="border group rounded-full border-white cursor-pointer text-white hover:bg-white hover:text-black px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
              >
                BECOME A PARTNER
                <ArrowRight className="inline ml-2 w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* 4. MARQUEE: Your exact margins (mt-50, -mb-60) are restored.
        <div className="marquee-wrapper md:block hidden border-t border-b border-t-white/20 border-b-white/20 rounded-full py-2 text-sm md:text-2xl bg-white/5 text-white md:mt-50 md:-mb-60">
          <div className="marquee-content">
            <div className="marquee-text">
              Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth •
            </div>
            <div className="marquee-text" aria-hidden="true">
              Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth •
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}