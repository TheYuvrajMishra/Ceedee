import { Link } from "react-router-dom";

// --- Data for the Philosophy Principles ---
const principles = [
  {
    title: "Focused",
    description:
      "We shall stay focused, composed, and compassionate to deliver the most innovative products to our customers.",
  },
  {
    title: "Simple",
    description:
      "We shall be straightforward, pragmatic, and clear in our commitments to our customers.",
  },
  {
    title: "Nucleation",
    description:
      "We shall welcome new discoveries and innovations, striving to bring the best products to our customers.",
  },
  {
    title: "Expand",
    description:
      "We shall strive to expand in all spheres of human welfare, be it charity, welfare programs, or business.",
  },
  {
    title: "Centric",
    description:
      "We radiate energy and act as a gravitational force for the well-being of mankind.",
  },
  {
    title: "Links to a Path",
    description:
      "We shall be leaders, paving the way for others to practice right virtues and best practices.",
  },
  {
    title: "Natural & Perfect",
    description:
      "We shall be original in our approach, with zero impact on the environment and zero defects.",
  },
  {
    title: "Circular",
    description:
      "We shall be inclusive in our approach, treating everyone as equal and encouraging cultural diversity.",
  },
];

// --- Main Dot Philosophy Page Component ---
export default function DotPhilosophyPage() {

  return (
    <div className="min-h-screen bg-white">
      <title>Our Dot Philosophy | Ceedee's Group</title>

      {/* Hero Section */}
      <section className="relative py-32 bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-10"
          style={{
            backgroundImage: `url('https://th.bing.com/th/id/R.17f54fbf5ca568340d13dc11deb51c9d?rik=CmYexcRi51S13Q&riu=http%3a%2f%2fwww.newdesignfile.com%2fpostpic%2f2012%2f01%2fhalftone-dots-vector_120105.jpg&ehk=RDPltWtMhRt1t%2bMYm9r%2bOiCq5A4z48YJoWqPKpqSyys%3d&risl=&pid=ImgRaw&r=0')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Our Dot Philosophy
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-2xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            Everything starts and ends in a Dot.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-3 h-3 bg-gray-900 rounded-full mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
            The Power of a Single Point
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Dot refers to a simple component of focus, radiation,
            nucleation, and the beginning of expansion. It is both the part and
            the whole. At Ceedee's Group, we have drawn a profound link between
            this elemental concept and the way we live and conduct our
            business.
          </p>
        </div>
      </section>

      {/* Principles Grid Section */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {principles.map((principle) => (
              <div key={principle.title} className="text-center group">
                <div className="flex justify-center items-center mb-6">
                  <div className="w-4 h-4 border-2 border-gray-900 rounded-full transition-colors duration-300 group-hover:bg-gray-900"></div>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="border-l-4 border-gray-900 pl-8">
            <p className="text-2xl font-light text-gray-900 italic leading-relaxed">
              Ceedee’s Group honors commitment and shall liaise with people who
              are willing to grow.
            </p>
          </blockquote>
        </div>
      </section>

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