import { useState, useEffect } from 'react';

type Job = {
    _id: string;
    title: string;
    description: string;
};

const Career = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/careers');
                if (!response.ok) throw new Error('Data could not be fetched.');
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                 setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="container mx-auto p-8 font-sans">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Careers</h2>
            {error && <p className="text-center text-red-500">{error}</p>}
            <ul className="space-y-6">
                {jobs.map(job => (
                    <li key={job._id} className="p-6 bg-white rounded-lg shadow-md transition hover:shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-2">{job.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Career;