import React from 'react';

// --- Reusable BentoCard Component (Static Version) ---
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative flex flex-col rounded-4xl bg-slate-50 p-8
                 border border-slate-200/80
                 md:shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]
                 ${className}`}
    >
      {/* Inner Shadow for Depth - UPDATED for stronger effect */}
      <div className="pointer-events-none absolute inset-0 rounded-4xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]" />
      
      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// --- Type Definitions for our Bento Grid Data ---
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


// --- Data for the Stakeholder Cards ---
const stakeholders: Stakeholder[] = [
  {
    id: 1,
    title: "For Our Investors",
    benefits: [
      "Sustainable long-term growth and profitability.",
      "Transparent governance and robust risk management.",
      "Access to a diversified, resilient portfolio.",
    ],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "For Our Partners",
    benefits: [
      "Collaborative opportunities for mutual success.",
      "Reliability and integrity in every transaction.",
      "Shared vision for innovation and market leadership.",
    ],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "For Our Community",
    benefits: [
      "Commitment to local job creation and development.",
      "Investing in education and social upliftment.",
      "Promoting sustainable and ethical practices.",
    ],
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2574&auto=format&fit=crop",
  },
];

// --- SVG Icon for the Hero Card ---
const LegacyIcon = () => (
  <svg fill="#000000" width="50px" height="50px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>angle-double-top</title> <path d="M13.72 17.68c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.84-5.84 5.84c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM13.72 22.44c-0.2 0-0.44-0.080-0.6-0.24l-5.84-5.88-5.84 5.88c-0.32 0.32-0.84 0.32-1.2 0-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.88-0.32 1.2 0l6.44 6.44c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24z"></path> </g></svg>
);

// --- A unified data structure for a balanced grid ---
const cardData: Card[] = [
    {
        id: 'hero',
        type: 'text',
        className: 'lg:col-span-2',
        content: {
            icon: <LegacyIcon />,
            title: <>A Legacy of <span className="font-bold text-slate-900">Entrepreneurial Excellence</span></>,
            description: "Ceedee's Group represents decades of visionary leadership, building a trusted brand that creates lasting value for all stakeholders.",
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
            icon: <div className="w-3 h-3 border border-slate-400 rounded-full mb-4"></div>,
            title: 'Strategic Portfolio',
            description: 'Our diversified business model creates resilient growth opportunities.',
            hasLine: false,
        }
    }
];


// --- Main LegacyBentoGrid Component ---
const LegacyBentoGrid = () => {
  return (
    <section className="py-16 md:py-3 px-4 md:px-8">
      <div className="md:w-355  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {cardData.map((card) => {
          if (card.type === 'text') {
            return (
              <BentoCard key={card.id} className={card.className}>
                <div className="flex-grow ">
                  {card.content.icon}
                  <h2 className={card.id === 'hero' ? "text-4xl  md:text-5xl font-light text-slate-800 mb-6 leading-tight" : "text-2xl font-regular  text-slate-900 mb-3"}>
                    {card.content.title}
                  </h2>
                  {card.content.hasLine && <div className="w-20 h-px bg-slate-800 mb-6"></div>}
                  <p className={card.id === 'hero' ? "text-lg text-slate-600 max-w-2xl leading-relaxed" : "text-slate-600 leading-relaxed"}>
                    {card.content.description}
                  </p>
                </div>
              </BentoCard>
            );
          }
          if (card.type === 'image') {
            const stakeholder = card.content;
            return (
              <div
                key={stakeholder.id}
                className={`relative min-h-[350px] md:min-h-[400px] rounded-4xl overflow-hidden ${card.className}`}
              >
                <img src={stakeholder.image} className="absolute inset-0 w-full h-full object-cover" alt={stakeholder.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                {/* Inner Shadow for Depth - UPDATED for stronger effect */}
                <div className="absolute inset-0 rounded-4xl shadow-[inset_0_0_40px_rgba(0,0,0,1)]" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-light mb-4 tracking-wide">
                    {stakeholder.title}
                  </h3>
                  {/* Benefits are now always hidden to maintain a clean look without hover */}
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