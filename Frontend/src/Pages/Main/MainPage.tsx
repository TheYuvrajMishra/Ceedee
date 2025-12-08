import { ArrowRight } from "lucide-react";
import TwoCompany from "../../Components/Main/TwoCompany";
import PartnerSection from "../../Components/Main/PartnerSection";
import { useNavigate } from "react-router";
import LegacyBentoGrid from "../../Components/Main/LegacyBento";
import { HeroSection } from "../../Components/Main/Hero";
const CeedeeHomepage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Home</title>

      {/* Hero Section with Parallax */}
      <HeroSection />

      {/* Marquee Section */}
      <div className="marquee-wrapper mx-auto md:block hidden border-t border-b border-t-black/20 font-thin border-b-black/20 py-2 text-sm md:text-2xl bg-yellow-500 text-black mb-2">
        <div className="marquee-content">
          <div className="marquee-text">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
          <div className="marquee-text" aria-hidden="true">
            Building Trust • Creating Value • Empowering Communities •
            Excellence in Partnership • Sustainable Growth •
          </div>
        </div>
      </div>

      <LegacyBentoGrid />

      <div id="ExploreServices" className="py-5">
        <TwoCompany />
      </div>


      {/* Company Showcase */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24" id="Company">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 sm:mb-8">
              Our Companies
            </h2>
            <div className="w-12 sm:w-16 h-px bg-gray-900 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4">
              Industry-leading companies with proven track records, creating
              value across automotive and industrial sectors
            </p>
          </div>

          {/* Venbro Polymers */}
          <div className="mb-16 sm:mb-20 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src="https://www.ppilbd.com/wp-content/uploads/2022/07/IMG_20220331_090854_603.jpg"
                  alt="Venbro Polymers manufacturing"
                  className="w-full h-full object-cover  sm:"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>

              <div className="px-4 sm:px-0">
                <div className="flex items-center mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl font-light text-gray-900">
                    Venbro Polymers
                  </h3>
                </div>
                <div className="w-12 sm:w-16 h-px bg-gray-900 mb-4 sm:mb-6"></div>

                <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg">
                    <span className="font-medium">20+ Years</span> of excellence
                    in Food Grade PP Woven Fabrics, Sacks and Bags
                  </p>
                  <p className="text-sm sm:text-base">
                    Serving Indian and International markets since{" "}
                    <span className="font-medium">1995</span> under the
                    leadership of D.Venkateswaran and D. Shanmugasundaram.
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">
                      ISO 9002 & ZED Certified
                    </span>{" "}
                    manufacturing with vision to become ₹300 Crore company by
                    2025, creating 500+ direct employment opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white  py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      1995
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Established
                    </div>
                  </div>
                  <div className="bg-white  py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      ₹300Cr
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Revenue Target
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/venbro-polymers")}
                  className="bg-gray-900 group rounded-full cursor-pointer text-white px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-800 transition-colors tracking-wider text-xs sm:text-sm w-full sm:w-auto"
                >
                  EXPLORE VENBRO
                  <ArrowRight className="inline ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Sri Krishna Automobile - Fixed order classes */}
          <div>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="lg:order-1 order-2 px-4 sm:px-0">
                <div className="flex items-center mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl font-light text-gray-900">
                    Sri Krishna Automobile Enterprises
                  </h3>
                </div>
                <div className="w-12 sm:w-16 h-px bg-gray-900 mb-4 sm:mb-6"></div>

                <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg">
                    <span className="font-medium">
                      The Oldest Service Centre
                    </span>{" "}
                    in South India since 1986
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">"A" Grade MASS</span> -
                    Longest Serving Maruti Authorized Service Station providing
                    comprehensive automotive solutions with 500+ direct and
                    indirect employment.
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">3Q Service Excellence</span> -
                    Quick and Quality Services at Quite low prices, operating 6
                    days a week with customer-first approach.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white  py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      1986
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Since
                    </div>
                  </div>
                  <div className="bg-white  py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      A-Grade
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      MASS Certified
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/shri-krishna-automobile-enterprises")
                  }
                  className="bg-gray-900 rounded-full cursor-pointer text-white px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-800 group transition-colors tracking-wider text-xs sm:text-sm w-full sm:w-auto"
                >
                  EXPLORE SKAE
                  <ArrowRight className="inline ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
                </button>
              </div>

              <div className="relative h-64 sm:h-80 md:h-96 lg:order-2 order-1">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                  alt="SKAE automobile service"
                  className="w-full h-full object-cover  sm:"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner's Section */}
      <PartnerSection />

      {/* Group Statistics */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 mb-8 sm:mb-12 bg-gray-900  max-w-355 mx-4 sm:mx-auto text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8">
              Trust Through Numbers
            </h2>
            <div className="w-12 sm:w-16 h-px bg-white mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Decades of proven performance creating value for stakeholders and
              building lasting relationships across industries
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                stat: "1986",
                label: "OLDEST SERVICE CENTRE",
                sublabel: "South India Legacy",
              },
              {
                stat: "1995",
                label: "POLYMERS ESTABLISHED",
                sublabel: "Industrial Excellence",
              },
              {
                stat: "₹300Cr",
                label: "REVENUE TARGET",
                sublabel: "Growth Trajectory",
              },
              {
                stat: "1000+",
                label: "EMPLOYMENT GOAL",
                sublabel: "Community Impact",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-light mb-2">
                  {item.stat}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 tracking-wider">
                  {item.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR & Community Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-screen mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-5">
              Community & Social Responsibility
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our commitment extends beyond business success to creating
              positive impact in communities, supporting sustainable
              development, and fostering inclusive growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1: Employment Generation */}
            <div className="border  hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-250 border-gray-200 p-8 flex flex-col">
              <div className="flex-grow ">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Employment Generation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Creating direct and indirect employment opportunities across
                  our group companies, supporting families and local economies.
                </p>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6">
                <div className="text-4xl font-light text-gray-900">1000+</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  JOBS CREATED
                </div>
              </div>
            </div>

            {/* Card 2: Local Sourcing */}
            <div className="border  hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-250  border-gray-200 p-8 flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Local Sourcing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Supporting local vendors and suppliers to promote regional
                  economic growth through strategic partnerships and procurement
                  policies.
                </p>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6">
                <div className="text-4xl font-light text-gray-900">70%</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  OF SOURCING IS LOCAL
                </div>
              </div>
            </div>

            {/* Card 3: Community Development */}
            <div className="border  hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-250  border-gray-200 p-8 flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Community Development
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Investing in education, healthcare, and infrastructure to
                  create lasting positive impact and empower local communities.
                </p>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6">
                <div className="text-4xl font-light text-gray-900">₹5Cr+</div>
                <div className="text-sm text-gray-500 tracking-wider">
                  INVESTED IN COMMUNITY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Join Our Growth Story
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Discover partnership opportunities with Ceedee Group - where vision
            meets execution, and success creates lasting impact for businesses,
            communities, and stakeholders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => {
                const el = document.getElementById("Company");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gray-900 group rounded-full text-white cursor-pointer px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              EXPLORE OPPORTUNITIES
              <ArrowRight className="inline ml-2 w-4 h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border group rounded-full border-gray-900 cursor-pointer text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              BECOME A PARTNER
              <ArrowRight className="inline ml-2 w-4 h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CeedeeHomepage;
