import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Users,
  Building2,
  Factory,
  Car,
  Package,
  Heart,
  TrendingUp,
  Handshake,
  Shield,
  Target,
  Globe,
} from "lucide-react";
import TwoCompany from "../../Components/Main/TwoCompany";
import PartnerSection from "../../Components/Main/PartnerSection";
import { Link, useNavigate } from "react-router";

const CeedeeHomepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const navigate = useNavigate();
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
          <Link to="/" className="flex flex-col items-center mt-5 md:mt-0  mb-6 space-x-3">
            <div className="w-30 h-30 rounded-lg overflow-hidden">
              <img
                src="/logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl text-amber-700 font-regular mb-4 tracking-wide">
            Ceedee Group
          </h1>
          </Link>
          <div className="w-32 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-6">
            Building Trust, Creating Value, Empowering Communities
          </p>
          <p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed mb-12">
            A legacy of excellence spanning decades, creating opportunities for investors, 
            partners, and communities while delivering sustainable solutions across industries
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById("Company");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white cursor-pointer text-gray-900 hover:bg-gray-100 px-8 py-4 transition-colors duration-300 tracking-wider text-sm font-medium"
            >
              EXPLORE OUR COMPANIES
            </button>
            <Link
              to="/contact"
              className="border cursor-pointer border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 transition-colors duration-300 tracking-wider text-sm font-medium"
            >
              PARTNER WITH US
            </Link>
          </div>
        </div>
      </section>

      {/* Company Identity & Legacy */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Legacy of Excellence
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ceedee Group represents decades of entrepreneurial excellence and visionary leadership,
              building a trusted brand that creates lasting value for all stakeholders while contributing 
              to community development and economic growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Strategic Portfolio
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Diversified business model across automotive and industrial sectors, 
                creating resilient growth opportunities for investors and partners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Trusted Brand
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building lasting relationships through transparent operations, 
                ethical business practices, and unwavering commitment to quality excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Community Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creating employment opportunities, supporting local communities, 
                and contributing to sustainable economic development across regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Value Proposition */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Value Creation for All
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We create sustainable value for vendors, investors, employees, and communities 
              through innovative business practices and strategic growth initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Handshake className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-4">For Vendors</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Long-term partnerships</li>
                <li>• Timely payments</li>
                <li>• Growth opportunities</li>
                <li>• Technical support</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <TrendingUp className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-4">For Investors</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Diversified portfolio</li>
                <li>• Sustainable returns</li>
                <li>• Growth trajectory</li>
                <li>• Market leadership</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Users className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-4">For Employees</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Career development</li>
                <li>• Skill enhancement</li>
                <li>• Job security</li>
                <li>• Innovation culture</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Globe className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-4">For Community</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Employment creation</li>
                <li>• Local sourcing</li>
                <li>• CSR initiatives</li>
                <li>• Economic development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner's Section */}
      <PartnerSection />

      {/* Company Showcase */}
      <section className="py-24 bg-gray-50" id="Company">
        <div className="max-w-screen mx-auto px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Companies
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Industry-leading companies with proven track records, creating value 
              across automotive and industrial sectors
            </p>
          </div>

          {/* Venbro Polymers */}
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className="relative h-96"
                style={{
                  // transform: `translateY(${scrollY * 0.01}px)`,
                }}
              >
                <img
                  src="https://www.ppilbd.com/wp-content/uploads/2022/07/IMG_20220331_090854_603.jpg"
                  alt="Venbro Polymers manufacturing"
                  className="w-full h-full object-cover "
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
                    2025, creating 500+ direct employment opportunities.
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

                <button
                  onClick={() => navigate("/venbro-polymers")}
                  className="bg-gray-900 cursor-pointer text-white px-6 py-3 hover:bg-gray-800 transition-colors tracking-wider text-sm"
                >
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
                    comprehensive automotive solutions with 500+ direct and indirect employment.
                  </p>
                  <p>
                    <span className="font-medium">3Q Service Excellence</span> -
                    Quick and Quality Services at Quite low prices, operating 6
                    days a week with customer-first approach.
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

                <button
                  onClick={() =>
                    navigate("/shri-krishna-automobile-enterprises")
                  }
                  className="bg-gray-900 cursor-pointer text-white px-6 py-3 hover:bg-gray-800 transition-colors tracking-wider text-sm"
                >
                  EXPLORE SKAE
                  <ArrowRight className="inline ml-2 w-4 h-4" />
                </button>
              </div>

              <div
                className="relative h-96 order-1 lg:order-2"
                style={{
                  // transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="SKAE automobile service"
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSR & Community Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Community & Social Responsibility
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our commitment extends beyond business success to creating positive impact 
              in communities, supporting sustainable development, and fostering inclusive growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Employment Generation
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Creating 1000+ direct and indirect employment opportunities across our group companies, 
                supporting families and local economies.
              </p>
              <div className="text-2xl font-light text-green-600">1000+</div>
              <div className="text-sm text-gray-500">Jobs Created</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Local Sourcing
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Supporting local vendors and suppliers, promoting regional economic growth 
                through strategic partnerships and procurement policies.
              </p>
              <div className="text-2xl font-light text-blue-600">70%</div>
              <div className="text-sm text-gray-500">Local Sourcing</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Community Development
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Investing in education, healthcare, and infrastructure development 
                in local communities, creating lasting positive impact.
              </p>
              <div className="text-2xl font-light text-purple-600">₹5Cr+</div>
              <div className="text-sm text-gray-500">Community Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Comprehensive Solutions
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              From industrial packaging to automotive excellence, we provide
              comprehensive solutions that create value across sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white hover:shadow-lg transition-all duration-300">
              <Package className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Industrial Packaging
              </h4>
              <p className="text-gray-600 text-sm">
                Food Grade PP Woven Fabrics, Sacks and Bags for diverse
                industries with international quality standards
              </p>
            </div>

            <div className="text-center p-6 bg-white hover:shadow-lg transition-all duration-300">
              <Car className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Automobile Service
              </h4>
              <p className="text-gray-600 text-sm">
                Comprehensive Maruti service and multi-brand automotive
                solutions with customer-centric approach
              </p>
            </div>

            <div className="text-center p-6 bg-white hover:shadow-lg transition-all duration-300">
              <Award className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Quality Assurance
              </h4>
              <p className="text-gray-600 text-sm">
                ISO 9002, ZED, and A-Grade certifications ensuring excellence
                and reliability across all operations
              </p>
            </div>

            <div className="text-center p-6 bg-white hover:shadow-lg transition-all duration-300">
              <Handshake className="w-12 h-12 text-gray-900 mx-auto mb-4" />
              <h4 className="text-lg font-light text-gray-900 mb-3">
                Partnership Focus
              </h4>
              <p className="text-gray-600 text-sm">
                Building long-term partnerships with customers, suppliers, 
                and stakeholders for mutual growth
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
              Trust Through Numbers
            </h2>
            <div className="w-16 h-px bg-white mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Decades of proven performance creating value for stakeholders 
              and building lasting relationships across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1986</div>
              <div className="text-sm text-gray-400 tracking-wider">
                OLDEST SERVICE CENTRE
              </div>
              <div className="text-xs text-gray-500 mt-1">South India Legacy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1995</div>
              <div className="text-sm text-gray-400 tracking-wider">
                POLYMERS ESTABLISHED
              </div>
              <div className="text-xs text-gray-500 mt-1">Industrial Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">₹300Cr</div>
              <div className="text-sm text-gray-400 tracking-wider">
                REVENUE TARGET
              </div>
              <div className="text-xs text-gray-500 mt-1">Growth Trajectory</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">1000+</div>
              <div className="text-sm text-gray-400 tracking-wider">
                EMPLOYMENT GOAL
              </div>
              <div className="text-xs text-gray-500 mt-1">Community Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Join Our Growth Story
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Discover partnership opportunities with Ceedee Group - where vision meets execution,
            and success creates lasting impact for businesses, communities, and stakeholders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => {
                const el = document.getElementById("Company");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gray-900 text-white cursor-pointer px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              EXPLORE OPPORTUNITIES
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border border-gray-900 cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              BECOME A PARTNER
            </button>
          </div>
        </div>
        <TwoCompany />
      </section>
      <div className="marquee-wrapper py-5 text-3xl bg-red-500 text-white raleway-light">
        <div className="marquee-content">
          {/* First copy of the text */}
          <div className="marquee-text">
            Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth • Community Impact...
          </div>
          {/* Second copy (the duplicate for the seamless effect) */}
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth • Community Impact...
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth • Community Impact...
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth • Community Impact...
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities • Excellence in Partnership • Sustainable Growth • Community Impact...
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeedeeHomepage;