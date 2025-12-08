import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

// --- TYPE DEFINITIONS (Unchanged) ---
interface HeroData {
  logo: string;
  title: string;
  subtitle?: string;
  tagline: string;
  description: string;
  backgroundImage: string;
  buttons: {
    primary: string;
    secondary: string;
  };
  theme: "red" | "blue"; // This will now be used
  tags?: string[]; // Optional tags array
}

interface LegacyData {
  title: string;
  content: string[];
  image: string;
  imageAlt: string;
}

interface ServiceCardData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface PhilosophyData {
  title: string;
  subtitle: string;
  cards: ServiceCardData[];
}

interface ServiceData {
  title: string;
  image: string;
  imageAlt: string;
  services: {
    title: string;
    description: string;
  }[];
}

interface CertificationData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  stats: {
    value: string;
    label: string;
  }[];
  backgroundColor?: string;
}

interface ExperienceData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  leftColumn: {
    title: string;
    points: string[];
  };
  rightColumn: {
    title: string;
    points: string[];
  };
}

interface CTAData {
  title: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

interface LandingPageData {
  hero: HeroData;
  legacy: LegacyData;
  philosophy: PhilosophyData;
  services: ServiceData;
  certification: CertificationData;
  experience: ExperienceData;
  cta: CTAData;
}

interface ReusableLandingProps {
  data: LandingPageData;
  onButtonClick?: (buttonType: string, buttonText: string) => void;
}

const ReusableLanding: React.FC<ReusableLandingProps> = ({
  data,
  onButtonClick,
}) => {


  // --- UPDATED: Refined Theme Configuration Object ---
  // A more robust and reusable theme structure
  const themeConfig = {
    red: {
      text: "text-red-600",
      bg: "bg-red-600",
      hoverBg: "hover:bg-red-700",
      border: "border-red-600",
      // Specific shade for hero button text for better harmony
      heroButtonText: "text-red-600",
      // --- ADD THIS LINE ---
      hoverText: "hover:text-red-600",
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-600",
      hoverBg: "hover:bg-blue-700",
      border: "border-blue-600",
      heroButtonText: "text-blue-600",
      // --- ADD THIS LINE ---
      hoverText: "hover:text-blue-600",
    },
  };

  const currentTheme = themeConfig[data.hero.theme];


  // --- OPTIMIZATION: Ref-based Parallax to avoid re-renders ---
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (heroBgRef.current) {
            heroBgRef.current.style.transform = `translateY(${scrollY * 0.5}px) scale(1.1)`;
          }
          if (heroContentRef.current) {
            heroContentRef.current.style.transform = `translateY(${scrollY * -0.15}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const titleLength = data.hero.title.length;
  const taglineLength = data.hero.tagline.length;

  // Dynamic scaling classes
  // Dynamic scaling classes
  const getTitleClass = () => {
    if (titleLength > 40) return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"; // Very long
    if (titleLength > 25) return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"; // Medium-Long
    return "text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9]"; // Short/Punchy
  };

  const getTaglineClass = () => {
    if (taglineLength > 50) return "text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"; // Very long tagline
    if (taglineLength > 30) return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"; // Long tagline
    return "text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95]"; // Short tagline
  };

  const handleButtonClick = (type: string, text: string) => {
    if (onButtonClick) {
      onButtonClick(type, text);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black text-white">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            ref={heroBgRef}
            src={data.hero.backgroundImage}
            alt="Hero Background"
            className="h-full w-full object-cover opacity-60 transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `scale(1.1)`, // Initial scale
            }}
            fetchPriority="high" // Eager load hero image
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        </div>

        {/* Main Content */}
        <div
          ref={heroContentRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center mt-[-4rem] sm:mt-0"
        >

          {/* Top Pill - Industry Tags */}
          <div className="mb-6 sm:mb-8 flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-amber-600/30 bg-amber-950/30 px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-md">
            <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-amber-500" />
            <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-amber-500 uppercase">
              {data.hero.subtitle || "Our Promise"}
            </span>
            {/* Optional tags from data if present, otherwise minimal dots */}
            {data.hero.tags && data.hero.tags.length > 0 &&
              data.hero.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-amber-500/50 hidden sm:inline">•</span>
                  <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-amber-500 uppercase">
                    {tag}
                  </span>
                </div>
              ))
            }
          </div>

          {/* Heading */}
          <h1 className={`mb-8 sm:mb-10 flex flex-col items-center ${getTitleClass()} font-black uppercase w-full max-w-7xl mx-auto`}>
            <span className="text-white drop-shadow-lg text-balance block max-w-6xl">
              {data.hero.title}
            </span>
            <span className={`block mt-3 ${getTaglineClass()} text-amber-500 drop-shadow-lg text-balance max-w-6xl`}>
              {data.hero.tagline}
            </span>
          </h1>

          {/* Buttons */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 w-full">
            <button
              onClick={() => {
                if (data.hero.buttons.primary === "BOOK SERVICE") {
                  navigate("/shri-krishna-automobile-enterprises/services");
                } else if (data.hero.buttons.primary === "EXPLORE OPPORTUNITIES") {
                  const el = document.getElementById("ExploreServices");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/venbro-polymers/products");
                }
              }}
              className="group cursor-pointer flex flex-1 sm:flex-none min-w-[140px] sm:min-w-[240px] items-center justify-center gap-2 sm:gap-3 bg-amber-900/90 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white shadow-lg transition-all hover:bg-amber-800 hover:scale-105"
            >
              <span className="whitespace-nowrap">{data.hero.buttons.primary}</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/contact"
              onClick={() => navigate("/contact")}
              className="group cursor-pointer flex flex-1 sm:flex-none min-w-[140px] sm:min-w-[240px] items-center justify-center gap-2 sm:gap-3 border border-white/20 bg-white/5 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
              <span className="whitespace-nowrap">{data.hero.buttons.secondary}</span>
            </Link>
          </div>

          {/* Description - Bottom aligned or just below buttons? usage varies, putting below buttons or above? Hero.tsx had it above buttons. */}
          <p className="mt-8 sm:mt-12 max-w-xl sm:max-w-3xl text-sm sm:text-lg md:text-2xl font-medium leading-relaxed text-gray-300 drop-shadow-md px-2 text-balance">
            {data.hero.description}
          </p>

        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-360 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                {data.legacy.title}
              </h2>
              <div className={`w-16 h-px ${currentTheme.bg} mb-8`}></div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {data.legacy.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className={index === 0 ? "text-lg" : ""}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
            <div
              className="relative h-96"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <img
                src={data.legacy.image}
                alt={data.legacy.imageAlt}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-360 mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              {data.philosophy.title}
            </h2>
            <div className={`w-16 h-px ${currentTheme.bg} mx-auto mb-8`}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.philosophy.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {data.philosophy.cards.map((card, index) => (
              <div key={index} className="text-center">
                <div className="relative h-48 mb-8">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  {card.title}
                </h3>
                {/* --- MODIFIED: Themed card divider --- */}
                <div
                  className={`w-12 h-px ${currentTheme.bg} opacity-50 mx-auto mb-4`}
                ></div>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-360 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative md:sticky">
              <img
                src={data.services.image}
                alt={data.services.imageAlt}
                className="w-full h-96 object-cover "
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                {data.services.title}
              </h2>
              <div className={`w-16 h-px ${currentTheme.bg} mb-12`}></div>
              <div className="space-y-8">
                {data.services.services.map((service, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-light text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Standards Section */}
      <section
        className={`py-24 ${data.certification.backgroundColor || "bg-black/95"
          } text-white`}
      >
        <div className="max-w-360 mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                {data.certification.title}
              </h2>
              <div className="w-16 h-px bg-white mb-8"></div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {data.certification.description}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {data.certification.stats.map((stat, index) => (
                  <div key={index}>
                    {/* --- MODIFIED: Themed stat value --- */}
                    <div className={`text-2xl font-light mb-2 text-white/95`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <img
                src={data.certification.image}
                alt={data.certification.imageAlt}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Experience Section */}
      <section className="py-24 bg-white">
        <div className="max-w-360 mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              {data.experience.title}
            </h2>
            {/* --- MODIFIED: Themed divider --- */}
            <div className={`w-16 h-px ${currentTheme.bg} mx-auto mb-8`}></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.experience.description}
            </p>
          </div>
          <div className="relative h-64 md:h-96 mb-16">
            <img
              src={data.experience.image}
              alt={data.experience.imageAlt}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                {data.experience.leftColumn.title}
              </h3>
              <div className="space-y-4 text-gray-600">
                {data.experience.leftColumn.points.map((point, index) => (
                  // --- MODIFIED: Themed bullet point ---
                  <p key={index} className="flex items-start">
                    <span className={`mr-2 ${currentTheme.text}`}>•</span>
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                {data.experience.rightColumn.title}
              </h3>
              <div className="space-y-4 text-gray-600">
                {data.experience.rightColumn.points.map((point, index) => (
                  // --- MODIFIED: Themed bullet point ---
                  <p key={index} className="flex items-start">
                    <span className={`mr-2 ${currentTheme.text}`}>•</span>
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            {data.cta.title}
          </h2>
          <div className={`w-16 h-px ${currentTheme.bg} mx-auto mb-8`}></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            {data.cta.description}
          </p>
          <div className="flex flex-row gap-2 md:gap-4 justify-center">
            {/* --- MODIFIED: Using new theme keys + responsive sizing --- */}
            <button
              onClick={() =>
                handleButtonClick("cta-primary", data.cta.buttons.primary)
              }
              className={`${currentTheme.bg} ${currentTheme.hoverBg} cursor-pointer text-white px-4 py-2 md:px-8 md:py-3 transition-colors duration-300 tracking-wider text-xs md:text-sm whitespace-nowrap`}
            >
              <span className="md:hidden">{data.cta.buttons.primary.split(' ').slice(0, 2).join(' ')}</span>
              <span className="hidden md:inline">{data.cta.buttons.primary}</span>
            </button>
            <button
              onClick={() =>
                handleButtonClick("cta-secondary", data.cta.buttons.secondary)
              }
              className={`border ${currentTheme.border} ${currentTheme.text} ${currentTheme.hoverBg} hover:text-white cursor-pointer px-4 py-2 md:px-8 md:py-3 transition-colors duration-300 tracking-wider text-xs md:text-sm whitespace-nowrap`}
            >
              <span className="md:hidden">{data.cta.buttons.secondary.split(' ').slice(0, 2).join(' ')}</span>
              <span className="hidden md:inline">{data.cta.buttons.secondary}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReusableLanding;
