import { ArrowRight } from "lucide-react";
import TwoCompany from "../../Components/Main/TwoCompany";
import PartnerSection from "../../Components/Main/PartnerSection";
import { Link, useNavigate } from "react-router";
import LegacyBentoGrid from "../../Components/Main/LegacyBento";
const CeedeeHomepage = () => {
  const navigate = useNavigate();

  const stakeholders = [
    {
      id: "vendors",
      title: "For Vendors",
      benefits: [
        "Long-term partnerships",
        "Timely payments",
        "Growth opportunities",
        "Technical support",
      ],
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gridClass: "lg:col-span-2 md:col-span-2",
    },
    {
      id: "investors",
      title: "For Investors",
      benefits: [
        "Diversified portfolio",
        "Sustainable returns",
        "Growth trajectory",
        "Market leadership",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gridClass: "lg:row-span-2",
    },
    {
      id: "employees",
      title: "For Employees",
      benefits: [
        "Career development",
        "Skill enhancement",
        "Job security",
        "Innovation culture",
      ],
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gridClass: "",
    },
    {
      id: "community",
      title: "For Community",
      benefits: [
        "Employment creation",
        "Local sourcing",
        "CSR initiatives",
        "Economic development",
      ],
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gridClass: "",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Home</title>

      {/* Hero Section with Parallax */}
      <section className="relative bg-gradient-to-b from-amber-400/10 via-white via-50% to-white h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center h-160 w-360 mx-auto mt-17 rounded-none md:rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-6 md:-mt-40 -mt-10 text-white">
          <div className="grid md:grid-cols-2 gap-35 items-center">
            {/* Left Column: Headline & Pills */}
            <div className="flex flex-col gap-8 text-center md:text-left">
              <h1 className="text-4xl md:mt-0 mt-50 md:text-4xl lg:text-6xl font-thin leading-tight tracking-tight">
                Building Trust, Creating Value, Empowering Communities
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Polymers
                </span>
                <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Autmobiles
                </span>
                <span className="border bg-white/20 border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Solutions
                </span>
              </div>
            </div>

            {/* Right Column: Description & CTA */}
            <div className="flex flex-col gap-8 -mt-25 md:mt-0  items-center md:items-end">
              <p className="md:text-lg text-sm text-white/80 max-w-md leading-relaxed text-center md:text-right">
                A legacy of excellence spanning decades, creating opportunities
                while delivering sustainable solutions across industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <button
                  onClick={() => {
                    const el = document.getElementById("ExploreServices");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white group rounded-full text-black cursor-pointer px-8 py-3 hover:bg-white/95 transition-colors duration-300 tracking-wider text-sm"
                >
                  EXPLORE OPPORTUNITIES
                  <ArrowRight className="inline ml-2 w-4 h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
                </button>
                <Link
                  to={"/contact"}
                  onClick={() => navigate("/contact")}
                  className="border group rounded-full border-white cursor-pointer text-white hover:bg-white hover:text-black px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
                >
                  BECOME A PARTNER
                  <ArrowRight className="inline ml-2 w-4 h-4 transition-all duration-150 group-hover:translate-x-1 translate-x-0" />
                </Link>
              </div>
            </div>
          </div>
          <div className="marquee-wrapper md:block hidden border-t border-b border-t-white/20 border-b-white/20 md:-mb-60 md:mt-50 -mt-7 rounded-full py-2 text-sm md:text-2xl bg-white/5 text-white raleway-light">
            <div className="marquee-content">
              {/* First copy of the text */}
              <div className="marquee-text">
                Building Trust • Creating Value • Empowering Communities •
                Excellence in Partnership • Sustainable Growth • Community
                Impact...
              </div>
              {/* Second copy (the duplicate for the seamless effect) */}
              <div className="marquee-text" aria-hidden="true">
                Building Trust • Creating Value • Empowering Communities •
                Excellence in Partnership • Sustainable Growth • Community
                Impact...
              </div>
              <div className="marquee-text" aria-hidden="true">
                Building Trust • Creating Value • Empowering Communities •
                Excellence in Partnership • Sustainable Growth • Community
                Impact...
              </div>
              <div className="marquee-text" aria-hidden="true">
                Building Trust • Creating Value • Empowering Communities •
                Excellence in Partnership • Sustainable Growth • Community
                Impact...
              </div>
              <div className="marquee-text" aria-hidden="true">
                Building Trust • Creating Value • Empowering Communities •
                Excellence in Partnership • Sustainable Growth • Community
                Impact...
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <LegacyBentoGrid/>

      {/* Partner's Section */}
      <PartnerSection />

      <div id="ExploreServices">
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
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      1995
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Established</div>
                  </div>
                  <div className="bg-white rounded-2xl sm:rounded-3xl py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      ₹300Cr
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Revenue Target</div>
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      1986
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Since</div>
                  </div>
                  <div className="bg-white rounded-2xl sm:rounded-3xl py-4 sm:py-6 p-3 sm:p-4 shadow-sm">
                    <div className="text-xl sm:text-2xl font-light text-gray-900">
                      A-Grade
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">MASS Certified</div>
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
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                />
              </div>
            </div>
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
            <div className="border rounded-4xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-150 border-gray-200 p-8 flex flex-col">
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
            <div className="border rounded-4xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-150  border-gray-200 p-8 flex flex-col">
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
            <div className="border rounded-4xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] transition-all duration-150  border-gray-200 p-8 flex flex-col">
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

      {/* Group Statistics */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 mb-8 sm:mb-12 bg-gray-900 rounded-2xl sm:rounded-3xl max-w-355 mx-4 sm:mx-auto text-white">
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
              { stat: "1986", label: "OLDEST SERVICE CENTRE", sublabel: "South India Legacy" },
              { stat: "1995", label: "POLYMERS ESTABLISHED", sublabel: "Industrial Excellence" },
              { stat: "₹300Cr", label: "REVENUE TARGET", sublabel: "Growth Trajectory" },
              { stat: "1000+", label: "EMPLOYMENT GOAL", sublabel: "Community Impact" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-light mb-2">{item.stat}</div>
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

      {/* Services Overview */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl max-w-355 mx-4 sm:mx-auto border border-black/5 bg-gray-50 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
        <div className="mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 sm:mb-8">
              Comprehensive Solutions
            </h2>
            <div className="w-12 sm:w-16 h-px bg-gray-900 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
              From industrial packaging to automotive excellence, we provide
              comprehensive solutions that create value across sectors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Industrial Packaging",
                description: "Food Grade PP Woven Fabrics, Sacks and Bags for diverse industries with international quality standards.",
                image: "https://hubs.com.sg/mt-content/uploads/2024/07/industry-packaging.jpg"
              },
              {
                title: "Automobile Service",
                description: "Comprehensive Maruti service and multi-brand automotive solutions with a customer-centric approach.",
                image: "https://specializedtruckandauto.com/wp-content/uploads/engine-repair-scaled.jpeg"
              },
              {
                title: "Quality Assurance",
                description: "ISO 9002, ZED, and A-Grade certifications ensuring excellence and reliability across all operations.",
                image: "https://tse4.mm.bing.net/th/id/OIP.3-yZl6H_DTg_MHP83PDksgHaD7?rs=1&pid=ImgDetMain"
              },
              {
                title: "Partnership Focus",
                description: "Building long-term partnerships with customers, suppliers, and stakeholders for mutual growth and success.",
                image: "https://img.freepik.com/premium-vector/partnership-abstract-concept-vector-illustration_107173-20406.jpg"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-xl">
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out transform group-hover:scale-110"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-light text-gray-900 mb-2 sm:mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
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
