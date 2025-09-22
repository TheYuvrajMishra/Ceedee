import { useState, useRef, useCallback } from "react";

const COMPANIES = [
  {
    id: "venbropolymers",
    name: "Venbro Polymers",
    subtitle: "Industrial Excellence",
    description:
      "Food Grade PP Woven Fabrics, Sacks and Bags for Indian and International markets. 20+ years of manufacturing excellence since 1995.",
    website: "/venbro-polymers",
    buttonText: "Visit Site",
    backgroundImage:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "shrikrishna",
    name: "SKAE Services",
    subtitle: "Automotive Excellence",
    description:
      "South India's oldest and most trusted Maruti Authorized Service Station since 1986. A-Grade MASS providing comprehensive automotive solutions.",
    website: "/shri-krishna-automobile-enterprises",
    buttonText: "Visit Site",
    backgroundImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  },
];

type Company = (typeof COMPANIES)[number];
type CompanyCardProps = {
  company: Company;
  isLeft: boolean;
  hoveredSide: "left" | "right" | "resetting" | null;
};

const CompanyCard = ({ company, isLeft, hoveredSide }: CompanyCardProps) => {
  const {
    name,
    subtitle,
    description,
    website,
    buttonText,
    backgroundImage,
  } = company;
  const side = isLeft ? "left" : "right";
  const isHovered = hoveredSide === side;
  const isOther = hoveredSide === (isLeft ? "right" : "left");
  const isResetting = hoveredSide === "resetting";

  const flexClass = isOther
    ? "lg:flex-[0.33]"
    : isHovered
    ? "lg:flex-[0.67]"
    : isResetting
    ? "lg:flex-[0.5]"
    : "lg:flex-1 flex-[unset]";
  const bgClass = isHovered ? "scale-110 grayscale-none" : "scale-100 grayscale";
  const overlayClass = isHovered
    ? "bg-black/60"
    : "bg-black/75";
  const contentClass = isOther
    ? "scale-95 opacity-80"
    : "scale-100 opacity-100";

  return (
    <div
      id="Company"
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${flexClass} h-[60vh] lg:h-auto min-h-[50vh] lg:min-h-screen`}
    >
      <div className="absolute inset-0 h-full overflow-hidden">
        <div
          className={`w-full h-full bg-cover bg-center bg-fixed transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${bgClass}`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      </div>
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${overlayClass}`}
      />
      <div
        className={`relative z-10 max-w-lg text-center px-6 sm:px-8 py-12 lg:py-0 transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${contentClass}`}
      >
        <div className="w-16 h-px bg-white mx-auto mb-6 sm:mb-8"></div>
        
        <h1
          className={`${
            isLeft
              ? "text-4xl sm:text-5xl mb-3 sm:mb-4"
              : "text-3xl sm:text-4xl mb-2 sm:mb-3 leading-tight"
          } font-light text-white tracking-wide`}
        >
          {name}
        </h1>
        <h2 className="text-lg sm:text-xl font-light text-gray-300 mb-6 sm:mb-8 tracking-wider uppercase">
          {subtitle}
        </h2>
        <p
          className={`text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed font-light transition-all duration-500 ${
            isOther ? "opacity-0" : "opacity-100"
          }`}
        >
          {description}
        </p>
        <button
          onClick={() => window.open(website, "_blank")}
          className="group bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 font-light tracking-wider text-sm cursor-pointer transition-all duration-300 border border-white"
        >
          {buttonText.toUpperCase()}
          <span className="inline-block ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </div>
  );
};

const TwoCompany = () => {
  const [hoveredSide, setHoveredSide] = useState<
    "left" | "right" | "resetting" | null
  >(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!containerRef.current || window.innerWidth < 1024) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      const centerZone = containerWidth * 0.1;
      const leftBoundary = containerWidth / 2 - centerZone / 2;
      const rightBoundary = containerWidth / 2 + centerZone / 2;

      const newSide =
        x < leftBoundary ? "left" : x > rightBoundary ? "right" : null;

      if (newSide !== hoveredSide) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setHoveredSide(newSide), 50);
      }
    },
    [hoveredSide]
  );

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredSide("resetting");
      setTimeout(() => setHoveredSide(null), 600);
    }, 150);
  }, []);

  return (
    <section
      id="ExploreServices"
      className="min-h-screen relative overflow-hidden bg-white"
    >
      <div
        ref={containerRef}
        className="min-h-screen flex flex-col lg:flex-row"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CompanyCard
          company={COMPANIES[0]}
          isLeft={true}
          hoveredSide={hoveredSide}
        />
        <div className="hidden lg:block relative w-px z-20 bg-white/30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/50 bg-white/10 backdrop-blur-sm" />
        </div>
        <CompanyCard
          company={COMPANIES[1]}
          isLeft={false}
          hoveredSide={hoveredSide}
        />
      </div>
    </section>
  );
};

export default TwoCompany;