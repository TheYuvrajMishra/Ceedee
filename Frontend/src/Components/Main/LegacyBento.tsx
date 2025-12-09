import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// --- Reusable BentoCard Component ---
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative flex flex-col bg-white p-8 md:p-10
                 -3xl shadow-sm hover:shadow-xl transition-all duration-500
                 border border-slate-100 overflow-hidden group
                 ${className}`}
    >
      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// --- Type Definitions ---
interface Stakeholder {
  id: number;
  title: string;
  benefits: string[];
  image: string;
}

interface TextCardContent {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  hasLine: boolean;
}

interface TextCardData {
  id: string;
  type: 'text';
  className?: string;
  content: TextCardContent;
}

interface ImageCardData {
  id: string;
  type: 'image';
  className?: string;
  content: Stakeholder;
}

type Card = TextCardData | ImageCardData;

// --- Data ---
const stakeholders: Stakeholder[] = [
  {
    id: 1,
    title: "For Our Investors",
    benefits: [
      "Sustainable long-term growth.",
      "Transparent governance.",
      "Resilient portfolio.",
    ],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "For Our Partners",
    benefits: [
      "Collaborative opportunities.",
      "Reliability and integrity.",
      "Shared vision for innovation.",
    ],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "For Our Community",
    benefits: [
      "Local job creation.",
      "Education investment.",
      "Sustainable practices.",
    ],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Icons ---
const LegacyIcon = () => (
  <div className="w-12 h-12 bg-amber-50 -2xl flex items-center justify-center mb-6">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const cardData: Card[] = [
  {
    id: 'hero',
    type: 'text',
    className: 'lg:col-span-2 bg-slate-50',
    content: {
      icon: <LegacyIcon />,
      title: <>A Legacy of <span className="font-semibold text-slate-900">Entrepreneurial Excellence</span></>,
      description: "Ceedee's Group represents decades of visionary leadership, building a trusted brand that creates lasting value for all stakeholders. We don't just build businesses; we build futures.",
      hasLine: true,
    }
  },
  {
    id: 'investors',
    type: 'image',
    className: '',
    content: stakeholders[0]
  },
  {
    id: 'partners',
    type: 'image',
    className: '',
    content: stakeholders[1]
  },
  {
    id: 'community',
    type: 'image',
    className: '',
    content: stakeholders[2]
  },
  {
    id: 'portfolio',
    type: 'text',
    className: '',
    content: {
      icon: <div className="w-10 h-10 bg-slate-100 -full flex items-center justify-center mb-4"><div className="w-3 h-3 bg-slate-400 -full"></div></div>,
      title: 'Strategic Portfolio',
      description: 'Our diversified business model creates resilient growth opportunities across multiple sectors.',
      hasLine: false,
    }
  }
];

const LegacyBentoGrid = () => {
  return (
    <section className="py-5 px-4 bg-slate-50/50">
      <div className="max-w-[1430px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => {
          if (card.type === 'text') {
            return (
              <BentoCard key={card.id} className={card.className}>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    {card.content.icon}
                    <h2 className={card.id === 'hero' ? "text-3xl md:text-4xl font-light text-slate-800 mb-6 leading-tight" : "text-xl font-medium text-slate-900 mb-3"}>
                      {card.content.title}
                    </h2>
                    {card.content.hasLine && <div className="w-16 h-1 bg-amber-400 mb-6 -full"></div>}
                    <p className={card.id === 'hero' ? "text-lg text-slate-600 max-w-2xl leading-relaxed" : "text-slate-500 leading-relaxed text-sm"}>
                      {card.content.description}
                    </p>
                  </div>
                  {card.id === 'hero' && (
                     <div className="mt-8 flex items-center gap-2 text-amber-600 font-medium cursor-pointer group-hover:gap-4 transition-all">
                        <span>Learn about our history</span>
                        <ArrowUpRight className="w-4 h-4" />
                     </div>
                  )}
                </div>
              </BentoCard>
            );
          }
          if (card.type === 'image') {
            const stakeholder = card.content;
            return (
              <div
                key={stakeholder.id}
                className={`relative min-h-[300px] md:min-h-[350px] -3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${card.className}`}
              >
                <img 
                  src={stakeholder.image} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={stakeholder.title} 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-light mb-2 tracking-wide">
                    {stakeholder.title}
                  </h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ul className="text-sm text-white/80 space-y-1 list-disc list-inside mt-2">
                      {stakeholder.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};

export default LegacyBentoGrid;