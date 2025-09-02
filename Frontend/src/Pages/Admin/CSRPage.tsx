import { useState, useEffect } from 'react';

type CSR = {
    _id: string;
    title: string;
    description: string;
};

const AdminCSR = () => {
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const fetchCsrs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/csr');
            if (!response.ok) throw new Error('Failed to fetch CSRs');
            const data = await response.json();
            setCsrs(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    useEffect(() => {
        fetchCsrs();
    }, []);

    const addCsr = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/csr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) throw new Error('Failed to add CSR');
            
            // Clear form and refresh list
            setTitle('');
            setDescription('');
            fetchCsrs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    const deleteCsr = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/csr/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete CSR');
            
            // Refresh list
            fetchCsrs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: Manage CSR</h2>
            
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
            
            {/* Add CSR Form */}
            <form onSubmit={addCsr} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New CSR Item</h3>
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
                    Add CSR
                </button>
            </form>

            {/* CSR List */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Existing CSR Items</h3>
                <ul className="space-y-4">
                    {csrs.map(csr => (
                        <li key={csr._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                            <span className="text-gray-800 font-medium">{csr.title}</span>
                            <button onClick={() => deleteCsr(csr._id)} className="px-3 py-1 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminCSR;