import { useEffect, useState } from "react";
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
  const [scrollY, setScrollY] = useState(0);

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
  const isLongTitle =
    data.hero.title?.trim().toLowerCase() === "sri krishnan automobile enterprises";
  const titleSizeClass = isLongTitle
    ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = (type: string, text: string) => {
    if (onButtonClick) {
      onButtonClick(type, text);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-400/10 via-white via-50% to-white h-screen flex items-center justify-center overflow-hidden">

        {/* BACKGROUND: matches Hero parallax implementation for better LCP */}
        <div
          className="absolute inset-4 
                     md:inset-auto md:h-160 md:w-360 md:mx-auto md:mt-12
                     shadow-[inset_0_0_40px_rgba(0,0,0,1)] overflow-hidden"
        >
          <img
            src={data.hero.backgroundImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
            style={{
              transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content: centered with parallax lift */}
        <div
          className="relative z-20 container mx-auto px-4 sm:px-6 text-white"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
          }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-5">

            {/* Top badge */}
            <div>
              <span className="inline px-4 py-1 text-[0.6rem] sm:text-xs uppercase tracking-[0.35em] rounded-full border border-white/50 bg-white/10 font-semibold text-white/70">
                {data.hero.subtitle || "Our Promise"}
              </span>
            </div>

            {/* Main Heading styled like Hero.tsx */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem] leading-tight tracking-tight text-white text-balance">
                <span className="mt-3 sm:mt-4 flex w-full flex-col items-center justify-center gap-2 sm:gap-3 text-center md:flex-row md:items-end md:justify-center">
                  <span className={`font-serif font-light text-white leading-tight md:leading-none ${titleSizeClass} whitespace-normal md:whitespace-nowrap break-words text-balance`}>
                    {data.hero.title}
                  </span>
                  {/* <span className="font-sans whitespace-nowrap font-semibold ml-2 text-amber-200 uppercase tracking-[0.14em] leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    {data.hero.subtitle || "Creating Value"}
                  </span> */}
                </span>
                <span className="block font-light italic text-white/90 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] text-balance">
                  {data.hero.tagline || "Empowering Communities"}
                </span>
              </h1>
            </div>

            {/* Optional tags */}
            {data.hero.tags && data.hero.tags.length > 0 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {data.hero.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-sans text-balance">
              {data.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
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
                className="bg-white group rounded-full text-slate-900 cursor-pointer px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-white/95 transition-all duration-300 tracking-wide text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">{data.hero.buttons.primary}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
              <Link
                to="/contact"
                onClick={() => navigate("/contact")}
                className="border-2 group rounded-full border-white cursor-pointer text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 tracking-wide text-sm font-semibold backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span className="whitespace-nowrap">{data.hero.buttons.secondary}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
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
