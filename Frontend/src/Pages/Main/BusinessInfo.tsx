import React from 'react';

// Defines the structure for a company object
interface Company {
  id: number;
  name: string;
  logoPath: string;
}

// Company data with placeholder logos
const companiesData: Company[] = [
  { id: 1, name: 'Company One', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C1' },
  { id: 2, name: 'Company Two', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C2' },
  { id: 3, name: 'Company Three', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C3' },
  { id: 4, name: 'Company Four', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C4' },
  { id: 5, name: 'Company Five', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C5' },
  { id: 6, name: 'Company Six', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C6' },
  { id: 7, name: 'Company Seven', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C7' },
  { id: 8, name: 'Company Eight', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C8' },
  { id: 9, name: 'Company Nine', logoPath: 'https://placehold.co/100x100/343A40/FFFFFF?text=C9' },
];

const HeroSectionInfo: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Main Text */}
        <div className="min-h-[50vh] flex items-center justify-start">
          <div className="max-w-6xl w-full text-left px-4" style={{ paddingLeft: 'clamp(20px, 8vw, 100px)', paddingRight: 'clamp(16px, 4vw, 32px)' }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl fira-sans-black leading-tight"
              style={{ 
                color: '#343A40'          
            }}>
              Ceedee's Group of companies is an industry leader in providing a range of services in the sphere of various manufacturing and trading enterprises worldwide!
            </h2>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="py-16 px-4" style={{ paddingLeft: 'clamp(20px, 8vw, 100px)', paddingRight: 'clamp(16px, 4vw, 32px)' }}>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end md:gap-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center md:text-right mb-8 md:mb-0" style={{ color: '#343A40' }}>
              Our Trusted Partners
            </h3>
            
            {/* Sponsor Box */}
            <div 
              className="max-w-5xl w-full md:w-auto"
              style={{ 
                backgroundColor: '#343A40',
                padding: 'clamp(30px, 8vw, 50px) clamp(20px, 6vw, 50px)'
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 justify-items-center">
                {companiesData.map((company) => (
                  <div 
                    key={company.id}
                    className="flex items-center space-x-4"
                  >
                    <div 
                      className="rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 overflow-hidden"
                      style={{
                        width: 'clamp(50px, 10vw, 60px)',
                        height: 'clamp(50px, 10vw, 60px)',
                        background: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 50%, #909090 100%)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <img 
                        src={company.logoPath} 
                        alt={`${company.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback for broken images
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.style.backgroundColor = '#cccccc';
                        }}
                      />
                    </div>
                    <p 
                      className="prata-regular text-left"
                      style={{ 
                        color: '#F4F6F8',
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)'
                      }}
                    >
                      {company.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return <HeroSectionInfo />;
}