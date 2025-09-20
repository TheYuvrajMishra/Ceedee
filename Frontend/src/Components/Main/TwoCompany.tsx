import { useState, useRef, useCallback } from "react";
import { ArrowRight, Factory, Wrench } from "lucide-react";

const COMPANIES = [
  {
    id: 'venbro',
    name: 'Venbro',
    subtitle: 'Polymers',
    description: 'Advanced polymer solutions for industrial applications. Delivering quality materials and innovative manufacturing processes.',
    website: '/venbro-polymers',
    buttonText: 'Visit Now',
    icon: Factory,
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 'shrikrishna',
    name: 'Shri Krishna',
    subtitle: 'Automobile Enterprise',
    description: 'Professional automotive services and maintenance solutions. Trusted expertise for commercial and personal vehicles.',
    website: '/shri-krishna-automobile-enterprises',
    buttonText: 'Visit Site',
    icon: Wrench,
    backgroundImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2132&q=80',
  },
];

type Company = typeof COMPANIES[number];
type CompanyCardProps = {
  company: Company;
  isLeft: boolean;
  hoveredSide: "left" | "right" | "resetting" | null;
};

const CompanyCard = ({ company, isLeft, hoveredSide }: CompanyCardProps) => {
  const { name, subtitle, description, website, buttonText, icon: Icon, backgroundImage } = company;
  const side = isLeft ? "left" : "right";
  const isHovered = hoveredSide === side;
  const isOther = hoveredSide === (isLeft ? "right" : "left");
  const isResetting = hoveredSide === "resetting";

  const flexClass = isOther ? "lg:flex-[0.33]" : isHovered ? "lg:flex-[0.67]" : isResetting ? "lg:flex-[0.5]" : "lg:flex-1 flex-[unset]";
  const bgClass = isHovered ? "blur-sm scale-110" : "blur-none scale-100";
  const overlayClass = isHovered ? "bg-gradient-to-br from-black/70 via-black/55 to-black/75 opacity-30" : "bg-gradient-to-br from-black/70 via-black/65 to-black/75 opacity-100";
  const contentClass = isOther ? "scale-95 opacity-80" : "scale-100 opacity-100";

  return (
    <div id="Company" className={`relative flex items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${flexClass} h-[60vh] lg:h-auto min-h-[50vh] lg:min-h-screen`}>
      <div className="absolute inset-0 h-full overflow-hidden">
        <div className={`w-full h-full bg-cover bg-center bg-fixed transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${bgClass}`} style={{ backgroundImage: `url('${backgroundImage}')` }} />
      </div>
      <div className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${overlayClass}`} />
      <div className={`relative z-10 max-w-lg text-center px-6 sm:px-8 py-12 lg:py-0 transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${contentClass}`}>
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6 sm:mb-8 border border-white/20">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className={`${isLeft ? 'text-4xl sm:text-5xl mb-3 sm:mb-4' : 'text-3xl sm:text-4xl mb-2 sm:mb-3 leading-tight'} font-light text-white tracking-wide`}>
          {name}
        </h1>
        <h2 className="text-lg sm:text-xl font-normal text-slate-300 mb-6 sm:mb-8 tracking-wider uppercase">
          {subtitle}
        </h2>
        <p className={`text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 leading-relaxed font-light transition-all duration-500 ${isOther ? "opacity-0" : "opacity-100"}`}>
          {description}
        </p>
        <button
          onClick={() => window.open(website, "_blank")}
          className="group inline-flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium border border-white/20 hover:border-white/30 cursor-pointer transition-all duration-300"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
};

const TwoCompany = () => {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | "resetting" | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e:any) => {
    if (!containerRef.current || window.innerWidth < 1024) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    const centerZone = containerWidth * 0.1;
    const leftBoundary = containerWidth / 2 - centerZone / 2;
    const rightBoundary = containerWidth / 2 + centerZone / 2;

    const newSide = x < leftBoundary ? "left" : x > rightBoundary ? "right" : null;

    if (newSide !== hoveredSide) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setHoveredSide(newSide), 50);
    }
  }, [hoveredSide]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredSide("resetting");
      setTimeout(() => setHoveredSide(null), 600);
    }, 150);
  }, []);

  return (
    <section id="ExploreServices" className="min-h-screen relative overflow-hidden bg-slate-50">
      <div
        ref={containerRef}
        className="min-h-screen flex flex-col lg:flex-row"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CompanyCard company={COMPANIES[0]} isLeft={true} hoveredSide={hoveredSide} />
        <div className="hidden lg:block relative md:w-px z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-400 rounded-full" />
        </div>
        <CompanyCard company={COMPANIES[1]} isLeft={false} hoveredSide={hoveredSide} />
      </div>
    </section>
  );
};

export default TwoCompany;