import { useState, useEffect } from 'react';

// Using the full CSR type to display all details
type CSR = {
    _id: string;
    title: string;
    description: string;
    category: "Education" | "Healthcare" | "Environment" | "Community Development" | "Other";
    location?: string;
    startDate?: string;
    endDate?: string;
    impact?: string;
    status: "Planned" | "Ongoing" | "Completed";
};

const CSR = () => {
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCsrs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/csr');
                if (!response.ok) throw new Error('Data could not be fetched at this moment.');
                const data = await response.json();
                                
                console.log("CSR API Response:", data);
                setCsrs(data.data.projects || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchCsrs();
    }, []);
    
    // Helper to format dates for display
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: CSR['status']) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
            case 'Planned': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="container mx-auto p-6 md:p-8 font-sans bg-gray-50">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Corporate Social Responsibility</h2>
             <p className="text-center text-gray-600 mb-12 text-lg">Our Commitment to Making a Difference</p>

            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-500">Loading our initiatives...</p>
            ) : csrs.length === 0 ? (
                 <p className="text-center text-gray-600 text-xl mt-8">We are currently planning our next initiatives. Please check back soon!</p>
            ) : (
                <div className="space-y-8 max-w-4xl mx-auto">
                    {csrs.map(csr => (
                        <div key={csr._id} className="p-6 bg-white rounded-xl shadow-md transition hover:shadow-xl border border-gray-200">
                           <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-indigo-600">{csr.category}</p>
                                    <h3 className="text-2xl font-semibold text-gray-800 mt-1">{csr.title}</h3>
                                     <p className="text-sm text-gray-500 mt-1">{csr.location}</p>
                                </div>
                                <span className={`mt-2 sm:mt-0 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${getStatusColor(csr.status)}`}>
                                    {csr.status}
                                </span>
                           </div>

                            <p className="text-gray-700 leading-relaxed mb-4">{csr.description}</p>
                            
                            {csr.impact && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-1">Impact:</h4>
                                    <p className="text-gray-600 italic">{csr.impact}</p>
                                </div>
                            )}

                            <div className="text-sm text-gray-500 border-t pt-4 mt-4 flex justify-between">
                                <span>Start Date: {formatDate(csr.startDate)}</span>
                                {csr.endDate && <span>End Date: {formatDate(csr.endDate)}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CSR;
