import React from "react";

interface Partner {
  id: number;
  name: string;
  logo?: string; // URL to logo image
}

const PartnerSection: React.FC = () => {
  // Original partner data array
  const partners: Partner[] = [
    {
      id: 1,
      name: "Maruti Suzuki",
      logo: "https://logos-world.net/wp-content/uploads/2022/12/Maruti-Suzuki-Logo.png",
    },
    {
      id: 2,
      name: "Reliance Industries",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Reliance-Logo.png",
    },
    {
      id: 3,
      name: "Tata Motors",
      logo: "https://logos-world.net/wp-content/uploads/2021/11/Tata-Logo.png",
    },
    {
      id: 4,
      name: "ITC Limited",
      logo: "https://cdn.freebiesupply.com/logos/large/2x/itc-limited-logo-png-transparent.png",
    },
    {
      id: 5,
      name: "Mahindra Group",
      logo: "https://logos-world.net/wp-content/uploads/2022/12/Mahindra-Logo.png",
    },
    {
      id: 6,
      name: "L&T Limited",
      logo: "https://workmen.digital.lntecc.com/WISA/Content/Layout/images/logo-blue.png",
    },
    {
      id: 7,
      name: "Asian Paints",
      logo: "https://static.vecteezy.com/system/resources/previews/021/671/857/large_2x/asian-paints-logo-free-png.png",
    },
    {
      id: 8,
      name: "Godrej Group",
      logo: "https://companieslogo.com/img/orig/GODREJCP.NS-b269802a.png?t=1601648486",
    },
  ];

  // **CHANGE 1: Re-introduce the helper functions from your requested logic**

  // Renders a single partner logo with your specific styling
  const renderPartnerLogo = (partner: Partner) => (
    <div
      key={partner.id}
      className="flex-shrink-0 rounded-2xl w-48 h-24 bg-white border border-gray-200 flex items-center justify-center mx-4 hover:border-gray-900 transition-colors duration-300"
    >
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-w-32 max-h-16 object-contain  hover:-0 transition-all duration-300"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const nextSibling = target.nextElementSibling as HTMLElement;
            if (nextSibling) {
              nextSibling.classList.remove("hidden");
            }
          }}
        />
      ) : null}
      <span
        className={`text-gray-900 font-light text-sm tracking-wider ${
          partner.logo ? "hidden" : ""
        }`}
      >
        {partner.name.toUpperCase()}
      </span>
    </div>
  );

  // Renders a complete set of all partner logos
  const renderPartnerSet = (setIndex: number) => (
    <div key={setIndex} className="flex items-center flex-shrink-0">
      {partners.map(renderPartnerLogo)}
    </div>
  );

  return (
    <section className="py-12 mb-12 mt-6 md:max-w-355 mx-auto border border-black/10 transition-all duration-150 rounded-4xl p-6 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Our Partners
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver exceptional solutions
            and drive innovation across automotive and industrial sectors.
          </p>
        </div>
        {/* Logo marquee container */}
        <div className="relative overflow-hidden">
          {/* **CHANGE 2: Use the render function to generate three sets** */}
          <div className="flex animate-marquee">
            {[0, 1, 2].map(renderPartnerSet)}
          </div>

          {/* Fade gradients on sides */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>
        {/* Partner categories */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <h3 className="text-lg font-light text-gray-900 mb-4">
              Automotive Partners
            </h3>
            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              Leading automotive manufacturers and service providers across
              India
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-light text-gray-900 mb-4">
              Industrial Clients
            </h3>
            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              Major industrial corporations requiring specialized packaging
              solutions
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-light text-gray-900 mb-4">
              Strategic Alliances
            </h3>
            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">
              Long-term partnerships driving innovation and growth across
              sectors
            </p>
          </div>
        </div>
      </div>

      {/* **CHANGE 3: Update CSS to match the triple duplication logic** */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-marquee {
            animation: marquee 50s linear infinite;
            width: calc(300%);
          }
          
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 60s;
            }
          }
        `,
        }}
      />
    </section>
  );
};

export default PartnerSection;
