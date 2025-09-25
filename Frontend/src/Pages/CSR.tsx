import { useState, useEffect } from "react";
import { Link } from "react-router";

// --- TYPES ---
type CSR = {
  _id: string;
  title: string;
  description: string;
  category:
    | "Education"
    | "Healthcare"
    | "Environment"
    | "Community Development"
    | "Other";
  location?: string;
  startDate?: string;
  endDate?: string;
  impact?: string;
  status: "Planned" | "Ongoing" | "Completed";
};

// --- HELPER CONFIGURATION ---
const categoryConfig = {
  Education: { symbol: "📚" },
  Healthcare: { symbol: "🏥" },
  Environment: { symbol: "🌱" },
  "Community Development": { symbol: "👥" },
  Other: { symbol: "📋" },
};

const statusConfig = {
  Completed: { color: "text-gray-700", bg: "bg-gray-100" },
  Ongoing: { color: "text-gray-800", bg: "bg-gray-200" },
  Planned: { color: "text-gray-600", bg: "bg-gray-50" },
};

// --- MODAL COMPONENT ---
const CSRModal = ({ csr, onClose }: { csr: CSR | null; onClose: () => void }) => {
  useEffect(() => {
    if (csr) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [csr, onClose]);

  if (!csr) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 cursor-pointer right-6 text-gray-400 hover:text-gray-700 z-10 text-2xl leading-none"
        >
          ×
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 border border-gray-300 flex items-center justify-center text-2xl">
              {categoryConfig[csr.category].symbol}
            </div>
            <div>
              <p className="text-sm font-light tracking-wider text-gray-600 mb-2">
                {csr.category.toUpperCase()}
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                {csr.title}
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div
              className={`px-4 py-2 text-xs font-light tracking-wider border border-gray-300 ${
                statusConfig[csr.status].bg
              } ${statusConfig[csr.status].color} self-start`}
            >
              {csr.status.toUpperCase()}
            </div>
            {csr.location && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                {csr.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-gray-400"></div>
              <span>{formatDate(csr.startDate)}</span>
              {csr.endDate && (
                <>
                  <span>-</span>
                  <span>{formatDate(csr.endDate)}</span>
                </>
              )}
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
            {csr.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {csr.impact && (
            <div className="bg-gray-50 p-8 border-l-2 border-gray-900 mb-8">
              <h4 className="font-light text-gray-900 mb-4 text-sm tracking-wider">
                IMPACT & OUTCOMES
              </h4>
              <div className="text-gray-700 leading-relaxed italic">
                {csr.impact.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CARD COMPONENT ---
const InitiativeCard = ({ csr, index, onClick }: { csr: CSR; index: number; onClick: () => void }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
  <div
    // This parallax effect is maintained. It's generally fine on mobile,
    // but you might consider disabling it on smaller screens for performance if needed.
    className="bg-white border border-gray-200 hover:border-gray-900 transition-colors duration-300 group cursor-pointer"
    style={{
      transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
    }}
    onClick={onClick}
  >
    {/* Use less padding on mobile and increase it for larger screens */}
    <div className="p-5 md:p-8">
      {/* Header Section:
        - On mobile (`flex-col`), the title/category and status badge are stacked vertically with a gap.
        - On medium screens and up (`md:flex-row`), they switch to a side-by-side layout.
      */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-2 mb-6">
        <div className="flex items-center gap-4">
          {/* Icon size can be adjusted for mobile vs. desktop if desired, but 12x12 is often fine */}
          <div className="w-12 h-12 border border-gray-300 flex items-center justify-center text-lg flex-shrink-0">
            {categoryConfig[csr.category].symbol}
          </div>
          <div>
            <p className="text-sm font-light tracking-wider text-gray-600 mb-1">
              {csr.category.toUpperCase()}
            </p>
            {/* Slightly smaller heading on mobile for better balance */}
            <h3 className="text-lg md:text-xl font-light text-gray-900 group-hover:text-black transition-colors">
              {csr.title}
            </h3>
          </div>
        </div>
        {/* The status badge aligns to the start of the flex container on mobile */}
        <div
          className={`px-3 py-1 text-xs font-light tracking-wider border border-gray-300 self-start md:self-auto ${
            statusConfig[csr.status].bg
          } ${statusConfig[csr.status].color}`}
        >
          {csr.status.toUpperCase()}
        </div>
      </div>

      {csr.location && (
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <div className="w-4 h-4 border border-gray-400 rounded-full flex-shrink-0"></div>
          {csr.location}
        </div>
      )}

      <div className="mb-6">
        {/* The description truncation logic remains the same */}
        <p className="text-gray-700 leading-relaxed">
          {csr.description.slice(0, 150)}
          {csr.description.length > 150 ? "..." : ""}
        </p>
      </div>

      {/* Footer Section:
        - On mobile (`flex-col`), the date and "VIEW DETAILS" link are stacked.
        - On small screens and up (`sm:flex-row`), they sit side-by-side.
      */}
      <div className="border-t border-gray-200 pt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className="w-3 h-3 border border-gray-400 flex-shrink-0"></div>
          <span>{formatDate(csr.startDate)}</span>
          {csr.endDate && (
            <>
              <span>-</span>
              <span>{formatDate(csr.endDate)}</span>
            </>
          )}
        </div>
        <div className="text-gray-900 text-sm font-light tracking-wider hover:underline transition-colors">
          VIEW DETAILS →
        </div>
      </div>
    </div>
  </div>
);
};

// --- MAIN PAGE COMPONENT ---
export default function CSRPage() {
  const [csrs, setCsrs] = useState<CSR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [selectedCSR, setSelectedCSR] = useState<CSR | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | CSR["category"]>(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<"all" | CSR["status"]>(
    "all"
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCsrs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/csr`);
        if (!response.ok) {
          throw new Error(
            "Failed to fetch initiatives. Please try again later."
          );
        }
        const data = await response.json();
        setCsrs(data.data?.projects || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCsrs();
  }, []);

  const filteredCsrs = csrs.filter((csr) => {
    const categoryMatch =
      filterCategory === "all" || csr.category === filterCategory;
    const statusMatch = filterStatus === "all" || csr.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const categories: ("all" | CSR["category"])[] = [
    "all",
    "Education",
    "Healthcare",
    "Environment",
    "Community Development",
    "Other",
  ];
  const statuses: ("all" | CSR["status"])[] = [
    "all",
    "Ongoing",
    "Completed",
    "Planned",
  ];

  const parallaxOffset = scrollY * 0.3;

  const handleCSRClick = (csr: CSR) => {
    setSelectedCSR(csr);
  };

  const handleCloseModal = () => {
    setSelectedCSR(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 p-8 animate-pulse">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200"></div>
                <div>
                  <div className="h-4 bg-gray-200 w-24 mb-2"></div>
                  <div className="h-6 bg-gray-200 w-48"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 w-5/6"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16">
          <div className="border border-red-200 bg-red-50 p-8 max-w-md mx-auto">
            <h3 className="text-xl font-light text-red-900 mb-2">
              An Error Occurred
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      );
    }

    if (filteredCsrs.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center">
            <div className="w-6 h-6 border border-gray-400"></div>
          </div>
          <h3 className="text-xl font-light text-gray-900 mb-2">
            No Initiatives Found
          </h3>
          <p className="text-gray-600">
            {csrs.length > 0
              ? "Try adjusting your filters to discover more of our projects."
              : "We are currently planning new initiatives. Please check back soon."}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {filteredCsrs.map((csr, index) => (
          <InitiativeCard 
            key={csr._id} 
            csr={csr} 
            index={index} 
            onClick={() => handleCSRClick(csr)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Corporate Social Responsibility</title>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Social Responsibility
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">
            Creating Positive Impact
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            We are committed to creating a positive impact on society and the 
            environment through sustainable initiatives and community development.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filters */}
          <div className="mb-16 border border-gray-200 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-4 tracking-wider">
                  CATEGORY
                </label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-4 py-2 text-sm cursor-pointer font-light tracking-wider border transition-colors duration-200 ${
                        filterCategory === cat
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {cat === "all" ? "ALL" : cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-4 tracking-wider">
                  STATUS
                </label>
                <div className="flex flex-wrap gap-3">
                  {statuses.map((stat) => (
                    <button
                      key={stat}
                      onClick={() => setFilterStatus(stat)}
                      className={`px-4 py-2 cursor-pointer text-sm font-light tracking-wider border transition-colors duration-200 ${
                        filterStatus === stat
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {stat === "all" ? "ALL" : stat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Impact
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Measuring our contribution to society and sustainable development
            </p>
          </div>

          <div 
            className="grid md:grid-cols-4 gap-8"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {csrs.filter(c => c.category === 'Education').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">EDUCATION PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {csrs.filter(c => c.category === 'Healthcare').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">HEALTHCARE INITIATIVES</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {csrs.filter(c => c.category === 'Environment').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">ENVIRONMENT PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {csrs.filter(c => c.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">COMPLETED PROJECTS</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Join Our Mission
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Partner with Ceedee Group in creating positive change and sustainable 
            development across communities and industries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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
              CONTACT US
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Community Development</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Supporting local communities through education, healthcare, and sustainable initiatives
              </p>
            </div>
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Environmental Responsibility</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Committed to sustainable practices and environmental conservation across all operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCSR && (
        <CSRModal csr={selectedCSR} onClose={handleCloseModal} />
      )}
    </div>
  );
}