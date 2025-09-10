import { useState, useEffect } from 'react';
import { Link } from 'react-router';

type Query = {
    _id: string;
    name: string;
    email: string;
    query: string; // Changed from 'message' to 'query' to match Client model
};

const AdminClientQueryViewer = () => {
    const [queries, setQueries] = useState<Query[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Authentication token not found. Please log in.');
                    return;
                }
                
                const response = await fetch('http://localhost:5000/api/clients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch queries. You may not be authorized.');
                }
                
                const data = await response.json();
                setQueries(data.data?.clients || data.data || []);
            } catch (err) {
                 setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchQueries();
    }, []);

    return (
        <div className="container mx-auto p-6 font-sans">
            <Link to={"/admin/dashboard"} className='fixed top-0 right-0 m-5 underline'>back to home</Link>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Client Queries</h2>

            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            {loading ? (
                <p>Loading queries...</p>
            ) : (
                <ul className="space-y-6">
                    {queries.length > 0 ? (
                        queries.map(q => (
                            <li key={q._id} className="p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
                                <p className="text-gray-600 mb-2">
                                    <strong className="font-semibold text-gray-800">Name:</strong> {q.name}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong className="font-semibold text-gray-800">Email:</strong>{' '}
                                    <a href={`mailto:${q.email}`} className="text-blue-600 hover:underline">{q.email}</a>
                                </p>
                                <p className="text-gray-800 mt-4 p-4 bg-gray-50 rounded-md">
                                    <strong className="block font-semibold text-gray-800 mb-1">Message:</strong> {q.query}
                                </p>
                            </li>
                        ))
                    ) : (
                        !error && <p className="text-gray-500">No client queries found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AdminClientQueryViewer;