import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

// --- TYPE DEFINITIONS ---
type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Internship" | "Contract";
  description: string;
  requirements: string[];
  salaryRange: {
    min?: number;
    max?: number;
  };
};

// --- APPLICATION MODAL COMPONENT ---
const ApplicationModal = ({
  job,
  onClose,
}: {
  job: Career | null;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/career-applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, careerId: job._id }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to submit application.");
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-none shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-gray-200">
          <h3 className="text-2xl font-light text-gray-900">
            Apply for Position
          </h3>
          <p className="text-sm text-gray-600 mt-1">{job.title}</p>
          <button
            onClick={onClose}
            className="absolute top-6 cursor-pointer right-6 text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-8">
          {submitSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-light text-gray-900 mb-4">
                Application Submitted
              </h4>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you for your interest. We have received your application
                and will be in touch shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 cursor-pointer bg-gray-900 text-white font-light tracking-wider text-sm hover:bg-gray-800 transition-colors"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2 tracking-wider">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 cursor-pointer py-3 border border-gray-300 text-gray-700 font-light tracking-wider text-sm hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 cursor-pointer bg-gray-900 text-white font-light tracking-wider text-sm hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                  disabled={submitting}
                >
                  {submitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CAREER PAGE COMPONENT ---
const CareerPage = () => {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // State for filters
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/careers`
        );
        if (!response.ok)
          throw new Error("Data could not be fetched at this time.");
        const data = await response.json();
        setJobs(data.data.jobs || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleOpenModal = (job: Career) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Memoize filter options
  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((job) => job.department)))],
    [jobs]
  );
  const jobTypes = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((job) => job.type)))],
    [jobs]
  );

  // Memoize the filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        (departmentFilter === "All" || job.department === departmentFilter) &&
        (typeFilter === "All" || job.type === typeFilter)
    );
  }, [jobs, departmentFilter, typeFilter]);

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    if (min && max)
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    if (min) return `From ${formatter.format(min)}`;
    return `Up to ${formatter.format(max!)}`;
  };

  return (
    <div className="min-h-screen bg-white">
        <title>Ceedee's | Careers</title>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Careers
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">
            Join Our Growing Team
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            Discover opportunities across our diversified portfolio of companies 
            and build a career that makes a difference
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filters */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                  DEPARTMENT
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors bg-white"
                >
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                  JOB TYPE
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors bg-white"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 p-8 animate-pulse">
                  <div className="h-6 bg-gray-200 w-3/4 mb-4"></div>
                  <div className="flex gap-8 mb-6">
                    <div className="h-4 bg-gray-200 w-32"></div>
                    <div className="h-4 bg-gray-200 w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="border border-red-200 bg-red-50 p-8 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">
                No open positions match your criteria.
              </p>
              <p className="text-gray-500 mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredJobs.map((job, index) => (
                <div
                  key={job._id}
                  className="border border-gray-200 hover:border-gray-900 transition-colors duration-300 group"
                  style={{
                    transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                  }}
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-black transition-colors">
                          {job.title}
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600 mb-6">
                          <div className="flex items-center">
                            <div className="w-4 h-4 border border-gray-400 rounded-full mr-3"></div>
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 border border-gray-400 rounded-full mr-3"></div>
                            {job.location}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                      
                      <div className="lg:text-right flex-shrink-0">
                        <div className="border border-gray-300 px-4 py-2 mb-4 inline-block">
                          <span className="text-xs font-light tracking-wider text-gray-700">
                            {job.type}
                          </span>
                        </div>
                        {job.salaryRange && (job.salaryRange.min || job.salaryRange.max) && (
                          <p className="text-sm text-gray-800 mb-6">
                            {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                          </p>
                        )}
                        <button
                          onClick={() => handleOpenModal(job)}
                          className="bg-gray-900 cursor-pointer text-white px-8 py-3 hover:bg-black transition-colors font-light tracking-wider text-sm w-full lg:w-auto"
                        >
                          APPLY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Join Our Mission
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Be part of a diversified group that values excellence, innovation, and 
            growth across automotive and industrial sectors.
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
              CONTACT GROUP
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-xl font-light text-gray-900 mb-4">Industrial Excellence</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Join Venbro Polymers in manufacturing Food Grade PP Woven Fabrics and packaging solutions
              </p>
              <a href="/venbro-polymers" className="text-gray-900 text-sm tracking-wider hover:underline">
                LEARN MORE →
              </a>
            </div>
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-xl font-light text-gray-900 mb-4">Automotive Services</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Be part of South India's longest serving Maruti authorized service station
              </p>
              <a href="/shri-krishna-automobile-enterprises" className="text-gray-900 text-sm tracking-wider hover:underline">
                LEARN MORE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ApplicationModal job={selectedJob} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CareerPage;