import { useState, useEffect } from 'react';

// Use the full Career type to display all job details
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

const Career = () => {
    const [jobs, setJobs] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Inside your useEffect hook

const fetchJobs = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/careers');
        if (!response.ok) throw new Error('Data could not be fetched at this time.');
        const data = await response.json();
        
        // Extract jobs from the correct path in the API response
        console.log("API Response:", data); 

        // Backend returns data: { jobs }, so we need data.data.jobs
        setJobs(data.data.jobs || []); 
        
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setLoading(false);
    }
};

fetchJobs();
    }, []);

    // Helper to format salary
    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return null;
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
        if (min) return `From ${formatter.format(min)}`;
        if (max) return `Up to ${formatter.format(max)}`;
        return null;
    }

    return (
        <div className="container mx-auto p-6 md:p-8 font-sans bg-gray-50">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Join Our Team</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">We are looking for passionate individuals to join us.</p>
            
            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            {loading ? (
                <p className="text-center text-gray-500">Loading available positions...</p>
            ) : jobs.length === 0 ? (
                 <p className="text-center text-gray-600 text-xl mt-8">No open positions at the moment. Please check back later!</p>
            ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {jobs.map(job => (
                        <div key={job._id} className="p-6 bg-white rounded-xl shadow-md transition hover:shadow-xl border border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                                <h3 className="text-2xl font-semibold text-blue-600">{job.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
                                    <span>{job.location}</span>
                                    <span className="h-4 border-l"></span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                             {job.department && <p className="text-md text-gray-600 mb-4 font-medium">{job.department}</p>}
                            
                            <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>
                            
                            {job.requirements && job.requirements.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                        {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                                    </ul>
                                </div>
                            )}

                             {formatSalary(job.salaryRange.min, job.salaryRange.max) && (
                                <p className="text-gray-800 font-semibold mb-4">
                                    Salary: {formatSalary(job.salaryRange.min, job.salaryRange.max)}
                                </p>
                             )}

                            <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Career;
