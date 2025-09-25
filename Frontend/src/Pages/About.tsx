import {
  Handshake,
  Heart,
  Link2,
  Smile,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
// Assuming you are using react-router-dom v5 or earlier based on the syntax
// For v6, you would use `useNavigate` or update Link components.
import { Link } from "react-router-dom";

// --- SVG Icon Components for Core Values (for a cleaner look) ---
const ValueIcon = ({ children }: { children: React.ReactNode }) => (
  // Centered the icon within the div for better alignment
  <div className="w-16 h-16 mx-auto border border-gray-300 flex items-center justify-center mb-6 text-gray-900">
    {children}
  </div>
);

// --- Timeline Item Component (REBUILT FOR STABILITY) ---
const TimelineItem = ({
  year,
  title,
  children,
  isLeft,
}: {
  year: string;
  title: string;
  children: React.ReactNode;
  isLeft?: boolean;
}) => {
  // Common content block to avoid repeating code
  const ContentBlock = () => (
    <div className="bg-gray-50 border border-gray-200 p-6 md:p-8">
      <h3 className="text-xl font-light text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );

  return (
    // The main container for a single timeline entry
    <div className="relative">
      {/* Mobile View (visible below md breakpoint) */}
      <div className="flex items-start gap-x-6 md:hidden">
        {/* Year Box */}
        <div className="relative z-10 flex-shrink-0">
          <div className="w-24 h-12 border border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-light tracking-wider">
            {year}
          </div>
        </div>
        {/* Content Box */}
        <div className="w-full">
          <ContentBlock />
        </div>
      </div>

      {/* Desktop View (hidden below md breakpoint) */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-12 md:items-center">
        {/* Left Column (Content or Spacer) */}
        {isLeft ? (
          <div className="text-right">
            <ContentBlock />
          </div>
        ) : (
          <div></div> // This empty div acts as a spacer in the grid
        )}

        {/* Center Column (Year) */}
        <div className="relative z-10">
          <div className="w-24 h-12 border border-gray-900 bg-white flex items-center justify-center text-gray-900 text-sm font-light tracking-wider">
            {year}
          </div>
        </div>

        {/* Right Column (Content or Spacer) */}
        {!isLeft ? (
          <div className="text-left">
            <ContentBlock />
          </div>
        ) : (
          <div></div> // This empty div acts as a spacer in the grid
        )}
      </div>
    </div>
  );
};

// --- Main About Page Component ---
export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reduced parallax effect slightly for a more subtle feel
  const parallaxOffset = scrollY * 0.2;

  return (
    <div className="min-h-screen bg-white">
      <title>About Us | Ceedee's Group</title>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            A Legacy of Excellence
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">Since 1950</p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            From a single rice mill to a diversified group of manufacturing and
            trading enterprises, our journey is built on a foundation of trust,
            innovation, and community.
          </p>
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 text-center">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto border border-gray-300 p-2">
              <img
                src="https://placehold.co/400x400/cccccc/333333?text=Founder"
                alt="Late Shri Doraisamy Chinnappa Gounder"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <h3 className="text-2xl font-light mt-6">
              Late Shri Doraisamy Chinnappa Gounder
            </h3>
            <p className="text-gray-600 tracking-wider text-sm mt-1">
              FOUNDER (1950)
            </p>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
              The Vision That Started It All
            </h2>
            <div className="w-16 h-px bg-gray-900 mb-8"></div>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In 1950, our founder, Late Shri Doraisamy Chinnappa Gounder,
                laid the cornerstone of the Ceedee's Group with a single rice
                mill in Erode. His entrepreneurial spirit was matched only by
                his commitment to the community.
              </p>
              <p>
                More than just a business magnate, he was a philanthropist, a
                mentor, and an advisor who believed in fostering growth for all.
                This philosophy of combining business success with social
                upliftment remains the guiding principle of our group today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Journey Through Time
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Vertical Line for Mobile (left-aligned) */}
            <div className="absolute top-0 bottom-0 left-[47px] w-px bg-gray-300 md:hidden"></div>
            {/* Vertical Line for Desktop (centered) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px -ml-px bg-gray-300 hidden md:block"></div>

            <div className="space-y-12 md:space-y-16">
              <TimelineItem year="1950" title="Humble Beginnings">
                Late Shri Doraisamy Chinnappa Gounder conceives his first Rice
                Milling business in Erode, laying the foundation for the group.
              </TimelineItem>

              <TimelineItem year="1987" title="A New Generation" isLeft>
                Shri D. Venkateswaran (CD. Kumar) joins the business, bringing
                new perspectives after his education in the USA.
              </TimelineItem>

              <TimelineItem year="1994" title="Excellence Recognized">
                Under CD. Kumar's leadership, Sri Krishna Automobile Enterprises
                is adjudged as the Biggest Maruti Authorised Service Station.
              </TimelineItem>

              <TimelineItem year="2003" title="Fostering Innovation" isLeft>
                The group helps establish the country’s FIRST Technology
                Business Incubator (TBI) at Kongu Engineering College.
              </TimelineItem>

              <TimelineItem year="2014" title="National Acclaim">
                The TBI is recognized as the Best TBI in India by the President
                of India, a testament to the group's commitment to innovation.
              </TimelineItem>

              <TimelineItem year="TODAY" title="Diversified Growth" isLeft>
                The group thrives under its two major companies, Venbro Polymers
                and Sri Krishna Automobiles, continuing a legacy of growth and
                reliability.
              </TimelineItem>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Guiding Principles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our values are the bedrock of our culture and how we conduct our
              business. They guide every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { name: "Focus", Icon: Target },
              { name: "Synergy", Icon: Handshake },
              { name: "Growth", Icon: TrendingUp },
              { name: "Commitment", Icon: Link2 },
              { name: "Happiness", Icon: Smile },
              { name: "Compassion", Icon: Heart },
            ].map((value) => (
              <div key={value.name}>
                <ValueIcon>
                  {/* Render the icon component */}
                  <value.Icon
                    className="w-8 h-8 text-gray-800"
                    strokeWidth={1.5}
                  />
                </ValueIcon>
                <h3 className="text-lg font-light tracking-wider text-gray-800">
                  {value.name.toUpperCase()}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Leadership of Today
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Following in their father's footsteps, the second generation of
              leadership continues to drive the group forward with integrity and
              vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* D. Venkateswaran */}
            <div className="bg-white p-8 border border-gray-200">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
                <img
                  src="https://placehold.co/100x100/cccccc/333333?text=CDK"
                  alt="D. Venkateswaran"
                  className="w-24 h-24 flex-shrink-0 object-cover grayscale rounded-full sm:rounded-none"
                />
                <div>
                  <h3 className="text-2xl font-light text-gray-900">
                    D. Venkateswaran
                  </h3>
                  <p className="text-gray-600 mb-4">(CD. Kumar)</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                As Managing Partner of Venbro Polymers, CD. Kumar extends his
                father's legacy with a focus on marketing, R&D, and production.
                His academic background in Industrial Engineering (MS) and
                Business (MBA) from Wayne State University underpins his
                strategic approach. He is a key figure in regional development
                through his leadership roles in CII, Kongu Engineering College,
                and as the founder of India's award-winning TBI.
              </p>
            </div>

            {/* D. Shanmugasundaram */}
            <div className="bg-white p-8 border border-gray-200">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
                <img
                  src="https://placehold.co/100x100/cccccc/333333?text=DS"
                  alt="D. Shanmugasundaram"
                  className="w-24 h-24 flex-shrink-0 object-cover grayscale rounded-full sm:rounded-none"
                />
                <div>
                  <h3 className="text-2xl font-light text-gray-900">
                    D. Shanmugasundaram
                  </h3>
                  <p className="text-gray-600 mb-4">(Thambi)</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                A Chemical Engineering graduate with an MBA from Cleveland State
                University, D. Shanmugasundaram manages IT, Finance, and HR for
                Venbro Polymers. His passion for technology led to an in-house
                ERP, while his deep interest in agriculture drives the group’s
                organic farming and modern dairy initiatives. He is deeply
                involved in community building through his leadership in Olirum
                Erodu Foundation and Young Indians (Yi).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Partner with a Legacy of Trust
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Our history is a testament to our reliability and commitment.
            Discover how our companies can bring value to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              EXPLORE COMPANIES
            </Link>
            <Link
              to="/contact"
              className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
