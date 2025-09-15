import { useEffect, useState } from 'react';

// Type definitions for the data structure
interface HeroData {
  title: string;
  subtitle?: string;
  tagline: string;
  description: string;
  backgroundImage: string;
  buttons: {
    primary: string;
    secondary: string;
  };
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

const ReusableLanding: React.FC<ReusableLandingProps> = ({ data, onButtonClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  const handleButtonClick = (type: string, text: string) => {
    if (onButtonClick) {
      onButtonClick(type, text);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${data.hero.backgroundImage}')`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            {data.hero.title}
          </h1>
          {data.hero.subtitle && (
            <div className="text-xl md:text-2xl font-light mb-6 opacity-90">
              {data.hero.subtitle}
            </div>
          )}
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-6">
            {data.hero.tagline}
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleButtonClick('primary', data.hero.buttons.primary)}
              className="bg-white cursor-pointer text-gray-900 hover:bg-gray-100 px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              {data.hero.buttons.primary}
            </button>
            <button 
              onClick={() => handleButtonClick('secondary', data.hero.buttons.secondary)}
              className="border cursor-pointer border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              {data.hero.buttons.secondary}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="w-px h-16 bg-white opacity-50 mx-auto mb-2"></div>
          <p className="text-sm tracking-widest">SCROLL</p>
        </div>
      </section>

      {/* Legacy & Experience */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                {data.legacy.title}
              </h2>
              <div className="w-16 h-px bg-gray-900 mb-8"></div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {data.legacy.content.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-lg" : ""} 
                     dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </div>
            <div 
              className="relative h-96"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <img 
                src={data.legacy.image}
                alt={data.legacy.imageAlt}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              {data.philosophy.title}
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
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
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">{card.title}</h3>
                <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <img 
                src={data.services.image}
                alt={data.services.imageAlt}
                className="w-full h-96 object-cover grayscale"
              />
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                {data.services.title}
              </h2>
              <div className="w-16 h-px bg-gray-900 mb-12"></div>
              
              <div className="space-y-8">
                {data.services.services.map((service, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-light text-gray-900 mb-4">{service.title}</h3>
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

      {/* Certifications & Standards */}
      <section className={`py-24 ${data.certification.backgroundColor || 'bg-black/95'} text-white`}>
        <div className="max-w-6xl mx-auto px-6">
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
                    <div className="text-2xl font-light mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400 tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-96">
              <img 
                src={data.certification.image}
                alt={data.certification.imageAlt}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Experience */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              {data.experience.title}
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.experience.description}
            </p>
          </div>

          <div className="relative h-64 md:h-96 mb-16">
            <img 
              src={data.experience.image}
              alt={data.experience.imageAlt}
              className="w-full h-full object-cover grayscale"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">{data.experience.leftColumn.title}</h3>
              <div className="space-y-4 text-gray-600">
                {data.experience.leftColumn.points.map((point, index) => (
                  <p key={index}>• {point}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">{data.experience.rightColumn.title}</h3>
              <div className="space-y-4 text-gray-600">
                {data.experience.rightColumn.points.map((point, index) => (
                  <p key={index}>• {point}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            {data.cta.title}
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            {data.cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleButtonClick('cta-primary', data.cta.buttons.primary)}
              className="bg-gray-900 cursor-pointer text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              {data.cta.buttons.primary}
            </button>
            <button 
              onClick={() => handleButtonClick('cta-secondary', data.cta.buttons.secondary)}
              className="border border-gray-900 cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              {data.cta.buttons.secondary}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ReusableLanding;
