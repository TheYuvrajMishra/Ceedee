import { useState, useEffect } from 'react';

// The Career type definition remains the same
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

// Paste the ApplicationModal component code here if it's in the same file
// A new component for the Application Modal
const ApplicationModal = ({ job, onClose }:any) => {
    if (!job) return null;

    return (
        // Main overlay
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-xs bg-opacity-60 flex justify-center items-center z-50"
            onClick={onClose} // Close modal if overlay is clicked
        >
            {/* Modal content */}
            <div 
                className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h3>
                    <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <p className="text-gray-600 mb-6">Fill out the form below to submit your application.</p>
                
                {/* Simple Application Form Placeholder */}
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 mr-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const CareerPage = () => {
    const [jobs, setJobs] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // MODAL STATE: Add state for modal visibility and the selected job
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Career | null>(null);

    // MODAL HANDLERS: Functions to open and close the modal
    const handleOpenModal = (job: Career) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/careers');
                if (!response.ok) {
                    throw new Error('Data could not be fetched at this time.');
                }
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

    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return null;
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
        if (min) return `From ${formatter.format(min)}`;
        if (max) return `Up to ${formatter.format(max)}`;
        return null;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 font-sans bg-gray-50">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">We are looking for passionate individuals to join us and help shape the future.</p>
            </div>
            
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-8">{error}</p>}
            
            {loading ? (
                <p className="text-center text-gray-500">Loading available positions...</p>
            ) : jobs.length === 0 && !error ? (
                 <p className="text-center text-gray-600 text-xl mt-8">No open positions at the moment. Please check back later!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-row-2 gap-8 max-w-6xl mx-auto">
                    {jobs.map(job => (
                        <div key={job._id} className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                           
                            {/* Card Header & Meta Info */}
                            <div>
                                <h3 className="text-2xl font-semibold text-blue-600 mb-2">{job.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                                    <span>{job.department}</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{job.location}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="font-medium text-gray-600">{job.type}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="flex-grow">
                                <p className="text-gray-700 leading-relaxed mb-4 break-words">{job.description}</p>
                                
                                {job.requirements?.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                {formatSalary(job.salaryRange.min, job.salaryRange.max) && (
                                    <p className="text-gray-800 font-semibold text-sm">
                                        {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                                    </p>
                                )}
                                {/* ONCLICK HANDLER: Update the button to open the modal */}
                                <button 
                                    onClick={() => handleOpenModal(job)}
                                    className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white font-semibold cursor-pointer rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* RENDER MODAL: Conditionally render the modal based on state */}
            {isModalOpen && <ApplicationModal job={selectedJob} onClose={handleCloseModal} />}
        </div>
    );
};

export default CareerPage;