import { useState, useEffect } from 'react';

type Job = {
    _id: string;
    title: string;
    description: string;
};

const AdminCareer = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Fetches all jobs from the server
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/careers');
            if (!response.ok) throw new Error('Failed to fetch jobs');
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Adds a new job posting
    const addJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/careers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) throw new Error('Failed to add job');

            // Clear the form and refresh the job list
            setTitle('');
            setDescription('');
            fetchJobs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    // Deletes a job posting
    const deleteJob = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/careers/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete job');

            // Refresh the job list
            fetchJobs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: Manage Careers</h2>

            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

            {/* Add Job Form */}
            <form onSubmit={addJob} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Job Posting</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150">
                    Add Job
                </button>
            </form>

            {/* Job List */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Existing Job Postings</h3>
                <ul className="space-y-4">
                    {jobs.map(job => (
                        <li key={job._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                            <span className="text-gray-800 font-medium">{job.title}</span>
                            <button onClick={() => deleteJob(job._id)} className="px-3 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminCareer;