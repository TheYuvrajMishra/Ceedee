import { useState, useEffect, useMemo } from 'react';

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

// --- SVG ICONS ---
// A collection of simple, professional icons for UI elements.
const Icons = {
    briefcase: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    location: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    checkCircle: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// --- APPLICATION MODAL COMPONENT ---
const ApplicationModal = ({ job, onClose }: { job: Career | null, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    if (!job) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/career-applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, careerId: job._id }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to submit application.');
            setSubmitSuccess(true);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">Apply for {job.title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl leading-none flex-shrink-0 ml-4">&times;</button>
                </div>
                
                <div className="p-6">
                    {submitSuccess ? (
                        <div className="text-center">
                            {Icons.checkCircle}
                            <h4 className="text-xl font-semibold text-gray-800">Application Submitted!</h4>
                            <p className="text-gray-600 mt-2">Thank you for your interest. We have received your application and will be in touch shortly.</p>
                            <button onClick={onClose} className="mt-6 w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Jane Doe" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="jane.doe@example.com" required />
                            </div>
                            {submitError && <p className="text-red-600 bg-red-50 p-3 rounded-md text-sm">{submitError}</p>}
                            <div className="flex justify-end space-x-3 pt-2">
                                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md border border-gray-300 hover:bg-gray-100 transition" disabled={submitting}>Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition" disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit Application'}
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
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Career | null>(null);
    
    // State for filters
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers`);
                if (!response.ok) throw new Error('Data could not be fetched at this time.');
                const data = await response.json();
                setJobs(data.data.jobs || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
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

    // Memoize filter options to avoid recalculating on every render
    const departments = useMemo(() => ['All', ...Array.from(new Set(jobs.map(job => job.department)))], [jobs]);
    const jobTypes = useMemo(() => ['All', ...Array.from(new Set(jobs.map(job => job.type)))], [jobs]);

    // Memoize the filtered jobs for performance
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => 
            (departmentFilter === 'All' || job.department === departmentFilter) &&
            (typeFilter === 'All' || job.type === typeFilter)
        );
    }, [jobs, departmentFilter, typeFilter]);
    
    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return null;
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
        if (min) return `From ${formatter.format(min)}`;
        return `Up to ${formatter.format(max!)}`;
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <title>Ceedee's | Careers</title>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight break-words">
                        Find Your <span className="text-indigo-600">Next Opportunity</span>
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        We are a passionate team dedicated to innovation and excellence. Explore our open positions and find where you belong.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select id="department-filter" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                        <select id="type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                            {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                {loading ? (
                    // Skeleton Loader for a professional loading state
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No open positions match your criteria. Please check back later!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredJobs.map(job => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm border border-transparent hover:border-indigo-500 hover:shadow-md transition-all duration-300">
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 cursor-pointer break-words">{job.title}</h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-2">
                                            <span className="flex items-center min-w-0"><span className="truncate">{Icons.briefcase}{job.department}</span></span>
                                            <span className="flex items-center min-w-0"><span className="truncate">{Icons.location}{job.location}</span></span>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:text-right flex-shrink-0">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">{job.type}</span>
                                        {job.salaryRange && (job.salaryRange.min || job.salaryRange.max) && (
                                            <p className="text-sm text-gray-800 font-semibold mt-2">
                                                {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-200 break-words">{job.description}</p>
                                <div className="text-right mt-4">
                                    <button onClick={() => handleOpenModal(job)} className="px-5 py-2 w-full sm:w-auto bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-200">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && <ApplicationModal job={selectedJob} onClose={handleCloseModal} />}
        </div>
    );
};

export default CareerPage;
