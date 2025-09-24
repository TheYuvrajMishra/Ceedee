import { useState, useEffect } from 'react';

const SKAEServices = () => {
//   const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState('all');

  useEffect(() => {
    // const handleScroll = () => setScrollY(window.scrollY);
    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceCategories = [
    { id: 'all', name: 'All Services' },
    { id: 'maruti', name: 'Maruti Authorized' },
    { id: 'multi-brand', name: 'Multi-Brand' },
    { id: 'insurance', name: 'Insurance Services' },
    { id: 'parts', name: 'Parts & Accessories' }
  ];

  const services = [
    {
      id: 1,
      category: 'maruti',
      name: 'Free Service',
      description: 'Comprehensive free service for Maruti vehicles as per manufacturer guidelines, ensuring warranty compliance and optimal performance.',
      features: [
        'Engine Oil & Filter Change',
        'Multi-Point Vehicle Inspection',
        'Brake System Check',
        'Suspension & Steering Check',
        'Battery & Electrical Testing',
        'AC Performance Check',
        'Computerized Diagnostic',
        'Service History Documentation'
      ],
      duration: '2-4 Hours',
      frequency: 'Every 10,000 km or 6 months',
      warranty: 'Manufacturer Warranty Maintained',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      category: 'maruti',
      name: 'Running Repairs',
      description: 'Expert diagnosis and repair of vehicle issues using genuine Maruti parts and certified techniques by trained technicians.',
      features: [
        'Engine Diagnostics & Repair',
        'Transmission Service',
        'Brake Repair & Replacement',
        'Clutch Service & Replacement',
        'Cooling System Repair',
        'Electrical System Repair',
        'Fuel System Cleaning',
        'Performance Optimization'
      ],
      duration: '1-3 Days',
      frequency: 'As Required',
      warranty: '6 Months on Parts & Labor',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      category: 'maruti',
      name: 'Major Overhauls',
      description: 'Complete engine and transmission overhauls for high-mileage vehicles, restoring performance and extending vehicle life.',
      features: [
        'Complete Engine Rebuild',
        'Transmission Overhaul',
        'Timing Belt Replacement',
        'Gasket & Seal Replacement',
        'Piston & Ring Service',
        'Valve Train Service',
        'Oil Pump Service',
        'Performance Testing'
      ],
      duration: '5-10 Days',
      frequency: 'After 100,000+ km',
      warranty: '12 Months Comprehensive',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      category: 'maruti',
      name: 'Accident Repairs',
      description: 'Professional body work and mechanical repairs for accident-damaged vehicles with insurance claim assistance.',
      features: [
        'Body Damage Assessment',
        'Panel Beating & Replacement',
        'Paint & Color Matching',
        'Frame Alignment',
        'Mechanical Damage Repair',
        'Safety System Check',
        'Insurance Documentation',
        'Quality Assurance Testing'
      ],
      duration: '3-15 Days',
      frequency: 'As Required',
      warranty: '12 Months on Repairs',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      category: 'multi-brand',
      name: 'Multi-Brand Service',
      description: 'Expert service for all car makes through Ceedees Automobile Enterprises with the same quality standards as Maruti service.',
      features: [
        'All Brand Compatibility',
        'Trained Multi-Brand Technicians',
        'OEM & Aftermarket Parts',
        'Advanced Diagnostic Tools',
        'Engine Service All Types',
        'AC Service All Brands',
        'Electrical System Expertise',
        'Performance Tuning'
      ],
      duration: '2-5 Hours',
      frequency: 'Regular Maintenance',
      warranty: '6 Months Service Warranty',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      category: 'insurance',
      name: 'Insurance Services',
      description: 'Comprehensive motor insurance services including policy management, claims processing, and risk mitigation solutions.',
      features: [
        'Motor Insurance Policies',
        'Claim Processing Assistance',
        'Policy Renewal Services',
        'Damage Assessment',
        'Third Party Claims',
        'No Claim Bonus Protection',
        'Add-on Coverage Options',
        'Insurance Advisory'
      ],
      duration: '1-2 Days',
      frequency: 'Annual/As Required',
      warranty: 'Policy Terms Coverage',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      category: 'parts',
      name: 'Genuine Parts Supply',
      description: 'Authentic Maruti genuine parts and quality aftermarket parts for all vehicle maintenance and repair needs.',
      features: [
        'Genuine Maruti Parts',
        'Quality Aftermarket Options',
        'Engine Components',
        'Body Parts & Panels',
        'Electrical Components',
        'Filters & Consumables',
        'Accessories & Upgrades',
        'Bulk Supply Options'
      ],
      duration: 'Immediate/Same Day',
      frequency: 'As Required',
      warranty: 'Manufacturer Warranty',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      category: 'maruti',
      name: 'Periodic Maintenance',
      description: 'Scheduled maintenance services following Maruti service intervals to ensure optimal performance and longevity.',
      features: [
        'Oil Change Services',
        'Filter Replacements',
        'Brake Fluid Service',
        'Coolant System Service',
        'Tire Rotation & Balancing',
        'Wheel Alignment',
        'Battery Maintenance',
        'Preventive Inspections'
      ],
      duration: '1-2 Hours',
      frequency: 'Every 5,000-10,000 km',
      warranty: 'Service Warranty Included',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredServices = activeService === 'all' 
    ? services 
    : services.filter(service => service.category === activeService);

//   const parallaxOffset = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Shri Krishna Automobile Enterprises' Services</title>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20"
          style={{
            // transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Our Services
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">
            Complete Automotive Solutions
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            From routine maintenance to major repairs, we provide comprehensive automotive services with the expertise of South India's longest serving Maruti authorized service station.
          </p>
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Service Categories</h2>
            <div className="w-16 h-px bg-gray-900 mx-auto"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveService(category.id)}
                className={`px-6 py-3 text-sm cursor-pointer font-light tracking-wider border transition-all duration-300 ${
                  activeService === category.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {filteredServices.map((service, index) => (
              <div 
                key={service.id}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{
                //   transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative h-96 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover  hover:-0 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <h3 className="text-3xl font-light text-gray-900 mb-6">
                    {service.name}
                  </h3>
                  <div className="w-16 h-px bg-gray-900 mb-6"></div>
                  
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <h4 className="text-sm font-light text-gray-900 mb-2 tracking-wider">
                        DURATION
                      </h4>
                      <p className="text-gray-600">{service.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-light text-gray-900 mb-2 tracking-wider">
                        FREQUENCY
                      </h4>
                      <p className="text-gray-600">{service.frequency}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-light text-gray-900 mb-2 tracking-wider">
                        WARRANTY
                      </h4>
                      <p className="text-gray-600">{service.warranty}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-light text-gray-900 mb-4 tracking-wider">
                      SERVICE INCLUDES
                    </h4>
                    <div className="w-12 h-px bg-gray-400 mb-4"></div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 border border-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3Q Service Philosophy */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              3Q Service Promise
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to providing Quick and Quality Services at Quite low prices has made us South India's most trusted automotive service center
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div 
                className="w-20 h-20 border-2 border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                //   transform: `translateY(${scrollY * 0.02}px)`,
                }}
              >
                <div className="text-2xl font-light text-gray-900">Q</div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Quick Service</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Fast and efficient service delivery without compromising on thoroughness. We value your time and ensure minimal waiting periods.
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-20 h-20 border-2 border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                //   transform: `translateY(${scrollY * 0.025}px)`,
                }}
              >
                <div className="text-2xl font-light text-gray-900">Q</div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Quality Standards</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Uncompromising quality with genuine parts, trained technicians, and A-Grade MASS certification ensuring excellence in every service.
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-20 h-20 border-2 border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                //   transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <div className="text-2xl font-light text-gray-900">Q</div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Quite Low Prices</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Competitive and transparent pricing with no hidden costs. Best value for money with comprehensive service packages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8">
                Certified Excellence
              </h2>
              <div className="w-16 h-px bg-gray-900 mb-8"></div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  As an A-Grade Maruti Authorized Service Station (MASS), we maintain the highest standards of service quality and customer satisfaction in South India.
                </p>
                <p>
                  Our certified technicians undergo regular training programs to stay updated with the latest automotive technologies and service techniques.
                </p>
                <p>
                  Operating six days a week, we ensure consistent availability and reliable service for all your automotive needs.
                </p>
              </div>
            </div>
            
            <div 
              className="relative"
              style={{
                // transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <div className="bg-gray-100 p-8 border border-gray-200">
                <h3 className="text-xl font-light text-gray-900 mb-6">Service Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-300">
                    <span className="text-gray-600">Established</span>
                    <span className="text-gray-900">1986</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-300">
                    <span className="text-gray-600">MASS Grade</span>
                    <span className="text-gray-900">A-Grade</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-300">
                    <span className="text-gray-600">Operating Days</span>
                    <span className="text-gray-900">6 Days/Week</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-300">
                    <span className="text-gray-600">Service Bays</span>
                    <span className="text-gray-900">Multiple Bays</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600">Experience</span>
                    <span className="text-gray-900">38+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Experience Excellence
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Trust your vehicle to South India's most experienced and reliable automobile service center. Book your service appointment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gray-900 cursor-pointer text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm">
              BOOK SERVICE
            </button>
            <button className="border cursor-pointer border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm">
              GET ESTIMATE
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-light text-gray-900 mb-4">Emergency Service</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600">
                24/7 breakdown assistance and emergency repair services for urgent automotive needs.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-light text-gray-900 mb-4">Service Packages</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600">
                Comprehensive service packages designed for different vehicle ages and usage patterns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SKAEServices;