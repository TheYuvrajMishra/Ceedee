import { useState, useEffect } from 'react';

type Csr = {
    _id: string;
    title: string;
    description: string;
};

const CSR = () => {
    const [csrs, setCsrs] = useState<Csr[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCsrs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/csr');
                if (!response.ok) throw new Error('Data could not be fetched.');
                const data = await response.json();
                setCsrs(data);
            } catch (err) {
                 setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            }
        };
        fetchCsrs();
    }, []);

    return (
        <div className="container mx-auto p-8 font-sans">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Corporate Social Responsibility</h2>
            {error && <p className="text-center text-red-500">{error}</p>}
            <ul className="space-y-6">
                {csrs.map(csr => (
                    <li key={csr._id} className="p-6 bg-white rounded-lg shadow-md transition hover:shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-2">{csr.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{csr.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CSR;