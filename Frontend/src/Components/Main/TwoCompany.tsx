import { useState, useEffect, useRef, type FC } from "react";
import { ArrowRight, Factory, Wrench, type LucideIcon } from "lucide-react";

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

export type Company = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  website: string;
  buttonText: string;
  icon: LucideIcon;
  backgroundImage: string;
};

export const TWO_COMPANY_SECTION_CONFIG = {
  id: 'ExploreServices',
  title: 'Our Core Ventures',
  description: 'Discover our two flagship companies leading innovation in polymer solutions and automotive services.',
};

export const COMPANIES_DATA: Company[] = [
  {
    id: 'venbro',
    name: 'Venbro',
    subtitle: 'Polymers',
    description: 'Advanced polymer solutions for industrial applications. Delivering quality materials and innovative manufacturing processes.',
    website: '/Venbro',
    buttonText: 'Visit Now',
    icon: Factory,
    backgroundImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 'shrikrishna',
    name: 'Shri Krishna',
    subtitle: 'Automobile Enterprise',
    description: 'Professional automotive services and maintenance solutions. Trusted expertise for commercial and personal vehicles.',
    website: '/Shrikrishna',
    buttonText: 'Visit Site',
    icon: Wrench,
    backgroundImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2132&q=80',
  },
];

// ============================================================================
// UI SUB-COMPONENTS
// ============================================================================

type CompanyCardProps = {
  company: Company;
  isLeft: boolean;
  hoveredSide: string | null;
};

/**
 * Renders a single company card with dynamic styling based on hover state.
 * @param {Company} company - The company data to display.
 * @param {boolean} isLeft - Whether this is the left company card.
 * @param {string | null} hoveredSide - The currently hovered side.
 */
const CompanyCard: FC<CompanyCardProps> = ({ company, isLeft, hoveredSide }) => {
  const { name, subtitle, description, website, buttonText, icon: Icon, backgroundImage } = company;
  const side = isLeft ? 'left' : 'right';
  const oppositeSide = isLeft ? 'right' : 'left';
  
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
      ${
        hoveredSide === oppositeSide
          ? "lg:flex-[0.33]"
          : hoveredSide === side
          ? "lg:flex-[0.67]"
          : hoveredSide === "resetting"
          ? "lg:flex-[0.5]"
          : "lg:flex-1 flex-[unset]"
      } 
       h-[60vh] lg:h-auto to min-h-[50vh] lg:min-h-screen
      `}
    >
      <div
        className="absolute inset-0 h-full overflow-hidden"
      >
        <div
          className={`w-full h-full bg-cover bg-center bg-fixed transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            hoveredSide === side ? "blur-sm scale-110" : "blur-none scale-100"
          }`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      </div>

      <div className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        hoveredSide === side 
          ? "bg-gradient-to-br from-black/20 via-black/15 to-black/25 opacity-30" 
          : "bg-gradient-to-br from-black/70 via-black/65 to-black/75 opacity-100"
      }`} />

      <div
        className={`relative z-10 max-w-lg text-center px-6 sm:px-8 py-12 lg:py-0 transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          hoveredSide === oppositeSide
            ? "scale-95 opacity-80"
            : "scale-100 opacity-100"
        }
      `}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6 sm:mb-8 border border-white/20">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>

        <h1 className={`${isLeft ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'} font-light text-white mb-${isLeft ? '3 sm:mb-4' : '2 sm:mb-3'} tracking-wide ${!isLeft ? 'leading-tight' : ''}`}>
          {name}
        </h1>

        <h2 className="text-lg sm:text-xl font-normal text-slate-300 mb-6 sm:mb-8 tracking-wider uppercase">
          {subtitle}
        </h2>

        <p
          className={`text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 leading-relaxed font-light transition-all duration-500 
          ${hoveredSide === oppositeSide ? "opacity-0" : "opacity-100"}`}
        >
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

// ============================================================================
// MAIN TWOCOMPANY COMPONENT
// ============================================================================

/**
 * The TwoCompany component displays two company showcases side by side.
 * Features interactive hover effects that dynamically adjust the layout
 * to emphasize the hovered company while maintaining smooth transitions.
 */
const TwoCompany: FC = () => {
  const [hoveredSide, setHoveredSide] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (window.innerWidth < 1024) return; // disable hover logic on mobile/tablet

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    const centerZone = containerWidth * 0.1;
    const leftBoundary = containerWidth / 2 - centerZone / 2;
    const rightBoundary = containerWidth / 2 + centerZone / 2;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    let newHoveredSide: string | null = null;

    if (x < leftBoundary) newHoveredSide = "left";
    else if (x > rightBoundary) newHoveredSide = "right";

    if (newHoveredSide !== hoveredSide) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredSide(newHoveredSide);
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSide("resetting");
      setTimeout(() => setHoveredSide(null), 600);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id={TWO_COMPANY_SECTION_CONFIG.id} className="min-h-screen relative overflow-hidden bg-slate-50">
      <div
        ref={containerRef}
        className="min-h-screen flex flex-col lg:flex-row"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Company Card */}
        <CompanyCard 
          company={COMPANIES_DATA[0]} 
          isLeft={true} 
          hoveredSide={hoveredSide} 
        />

        {/* Divider (hidden on mobile) */}
        <div className="hidden lg:block relative md:w-px z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-400 rounded-full" />
        </div>

        {/* Right Company Card */}
        <CompanyCard 
          company={COMPANIES_DATA[1]} 
          isLeft={false} 
          hoveredSide={hoveredSide} 
        />
      </div>
    </section>
  );
};

export default TwoCompany;