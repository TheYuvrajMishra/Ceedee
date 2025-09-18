// import TwoCompany from '../../Components/Main/TwoCompany'
// import HeroSection from '../../Components/Main/HeroSection'
// import PartnerSection from '../../Components/Main/PartnerSection'
// import ServicesSection from '../../Components/Main/Services'
// import CompInfo from '../../Components/Main/CompInfo'
// import VentureText from '../../Components/Main/VentureText'

// function MainPage() {
//   return (
//     <div>
//       {/* <div className='h-[1px] mt-2 bg-black w-full mx-auto rounded-full'></div>
//       <h1 className='m-5 text-5xl font-extrabold'>Venbro Polymers</h1> */}
//       <HeroSection/>
//       <CompInfo/>
//       <PartnerSection/>
//       <ServicesSection/>
//       <VentureText/>
//       <TwoCompany/>
//     </div>
//   )
// }

// export default MainPage

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Users,
  Building2,
  Factory,
  Car,
  Package,
} from "lucide-react";
import TwoCompany from "../../Components/Main/TwoCompany";
import PartnerSection from "../../Components/Main/PartnerSection";

const CeedeeHomepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Home</title>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
            Ceedee Group
          </h1>
          <div className="w-32 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-6">
            Diversified Excellence Across Industries
          </p>
          <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed mb-12">
            From automotive services to industrial polymers, we deliver quality
            solutions that drive businesses forward across multiple sectors
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white cursor-pointer text-gray-900 hover:bg-gray-100 px-8 py-4 transition-colors duration-300 tracking-wider text-sm font-medium">
              EXPLORE OUR COMPANIES
            </button>
            <button className="border cursor-pointer border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 transition-colors duration-300 tracking-wider text-sm font-medium">
              CONTACT US
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="w-px h-16 bg-white opacity-50 mx-auto mb-2"></div>
          <p className="text-sm tracking-widest">DISCOVER</p>
        </div>
      </section>

      {/* Group Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Legacy
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ceedee Group represents decades of entrepreneurial excellence,
              bringing together industry-leading companies that serve diverse
              market segments with unwavering commitment to quality and customer
              satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  // transform: `translateY(${scrollY * 0.02}px)`,
                }}
              >
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Diversified Portfolio
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strategic expansion across automotive and industrial sectors,
                creating synergies and opportunities.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  // transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Quality Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Certified quality standards across all operations, ensuring
                consistent excellence in every service.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  // transform: `translateY(${scrollY * 0.025}px)`,
                }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Customer Trust
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building lasting relationships through reliable service delivery
                and continuous innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner's Section */}
      <PartnerSection/>
      
      {/* Company Showcase */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Companies
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto"></div>
          </div>

          {/* Venbro Polymers */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className="relative h-96"
                style={{
                  transform: `translateY(${scrollY * 0.01}px)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="Venbro Polymers manufacturing"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <Factory className="w-8 h-8 text-gray-900 mr-4" />
                  <h3 className="text-3xl font-light text-gray-900">
                    Venbro Polymers
                  </h3>
                </div>
                <div className="w-16 h-px bg-gray-900 mb-6"></div>

                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p className="text-lg">
                    <span className="font-medium">20+ Years</span> of excellence
                    in Food Grade PP Woven Fabrics, Sacks and Bags
                  </p>
                  <p>
                    Serving Indian and International markets since{" "}
                    <span className="font-medium">1995</span> under the
                    leadership of D.Venkateswaran and D. Shanmugasundaram.
                  </p>
                  <p>
                    <span className="font-medium">
                      ISO 9002 & ZED Certified
                    </span>{" "}
                    manufacturing with vision to become ₹300 Crore company by
                    2025.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-4 shadow-sm">
                    <div className="text-2xl font-light text-gray-900">
                      1995
                    </div>
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                  <div className="bg-white p-4 shadow-sm">
                    <div className="text-2xl font-light text-gray-900">
                      ₹300Cr
                    </div>
                    <div className="text-sm text-gray-600">Revenue Target</div>
                  </div>
                </div>

                <button className="bg-gray-900 cursor-pointer text-white px-6 py-3 hover:bg-gray-800 transition-colors tracking-wider text-sm">
                  EXPLORE VENBRO
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sri Krishna Automobile Enterprises */}
          <div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <Car className="w-8 h-8 text-gray-900 mr-4" />
                  <h3 className="text-3xl font-light text-gray-900">
                    Sri Krishna Automobile Enterprises
                  </h3>
                </div>
                <div className="w-16 h-px bg-gray-900 mb-6"></div>

                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p className="text-lg">
                    <span className="font-medium">
                      The Oldest Service Centre
                    </span>{" "}
                    in South India since 1986
                  </p>
                  <p>
                    <span className="font-medium">"A" Grade MASS</span> -
                    Longest Serving Maruti Authorized Service Station providing
                    comprehensive automotive solutions.
                  </p>
                  <p>
                    <span className="font-medium">3Q Service Excellence</span> -
                    Quick and Quality Services at Quite low prices, operating 6
                    days a week.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-4 shadow-sm">
                    <div className="text-2xl font-light text-gray-900">
                      1986
                    </div>
                    <div className="text-sm text-gray-600">Since</div>
                  </div>
                  <div className="bg-white p-4 shadow-sm">
                    <div className="text-2xl font-light text-gray-900">
                      A-Grade
                    </div>
                    <div className="text-sm text-gray-600">MASS Certified</div>
                  </div>
                </div>

                <button className="bg-gray-900 cursor-pointer text-white px-6 py-3 hover:bg-gray-800 transition-colors tracking-wider text-sm">
                  EXPLORE SKAE
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </div>

              <div
                className="relative h-96 order-1 lg:order-2"
                style={{
                  transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="SKAE automobile service"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Comprehensive Solutions
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              From industrial packaging to automotive excellence, we provide
              comprehensive solutions across sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Package className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Industrial Packaging
              </h4>
              <p className="text-gray-600 text-sm">
                Food Grade PP Woven Fabrics, Sacks and Bags for diverse
                industries
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Car className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Automobile Service
              </h4>
              <p className="text-gray-600 text-sm">
                Comprehensive Maruti service and multi-brand automotive
                solutions
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Award className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Quality Assurance
              </h4>
              <p className="text-gray-600 text-sm">
                ISO 9002, ZED, and A-Grade certifications across operations
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Customer Focus
              </h4>
              <p className="text-gray-600 text-sm">
                Dedicated to customer satisfaction and long-term partnerships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Statistics */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Group Excellence
            </h2>
            <div className="w-16 h-px bg-white mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Decades of combined experience delivering excellence across
              industries
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            style={
              {
                // transform: `translateY(${scrollY * -0.05}px)`,
              }
            }
          >
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1986</div>
              <div className="text-sm text-gray-400 tracking-wider">
                OLDEST SERVICE CENTRE
              </div>
              <div className="text-xs text-gray-500 mt-1">South India</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1995</div>
              <div className="text-sm text-gray-400 tracking-wider">
                POLYMERS ESTABLISHED
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Industrial Excellence
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">₹300Cr</div>
              <div className="text-sm text-gray-400 tracking-wider">
                REVENUE TARGET
              </div>
              <div className="text-xs text-gray-500 mt-1">By 2025</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1000+</div>
              <div className="text-sm text-gray-400 tracking-wider">
                EMPLOYMENT GOAL
              </div>
              <div className="text-xs text-gray-500 mt-1">Group Wide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Partner With Excellence
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Discover how Ceedee Group's diversified expertise can serve your
            business needs across automotive and industrial sectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button className="bg-gray-900 text-white cursor-pointer px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm">
              EXPLORE COMPANIES
            </button>
            <button className="border border-gray-900 cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm">
              CONTACT GROUP
            </button>
          </div>
        </div>
        <TwoCompany />
      </section>
      <div className="marquee-wrapper py-5 text-3xl bg-black/80 text-white raleway-light">
        <div className="marquee-content">
          {/* First copy of the text */}
          <div className="marquee-text">
            best of the packaging solutions across industry segments... Longest
            Serving Maruti Authorized Service...
          </div>
          {/* Second copy (the duplicate for the seamless effect) */}
          <div className="marquee-text" aria-hidden="true">
            best of the packaging solutions across industry segments... Longest
            Serving Maruti Authorized Service...
          </div>
          <div className="marquee-text" aria-hidden="true">
            best of the packaging solutions across industry segments... Longest
            Serving Maruti Authorized Service...
          </div>
          <div className="marquee-text" aria-hidden="true">
            best of the packaging solutions across industry segments... Longest
            Serving Maruti Authorized Service...
          </div>
          <div className="marquee-text" aria-hidden="true">
            best of the packaging solutions across industry segments... Longest
            Serving Maruti Authorized Service...
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeedeeHomepage;
