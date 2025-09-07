import { useState, useEffect } from 'react';

// Full CSR type based on the Mongoose Schema
type CSR = {
    _id: string;
    title: string;
    description: string;
    category: "Education" | "Healthcare" | "Environment" | "Community Development" | "Other";
    location?: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    implementedBy?: string;
    contactPerson?: {
        name?: string;
        email?: string;
        phone?: string;
    };
    impact?: string;
    status: "Planned" | "Ongoing" | "Completed";
};

// Helper to format date for input[type=date]
const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toISOString().split('T')[0];
    } catch (error) {
        return '';
    }
};

const AdminCSR = () => {
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Other' as CSR['category'],
        location: '',
        startDate: '',
        endDate: '',
        budget: '',
        implementedBy: '',
        contactPersonName: '',
        contactPersonEmail: '',
        contactPersonPhone: '',
        impact: '',
        status: 'Planned' as CSR['status'],
    });

    const [editingCsr, setEditingCsr] = useState<CSR | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [csrToDelete, setCsrToDelete] = useState<string | null>(null);

    const API_URL = 'http://localhost:5000/api/csr';

    const fetchCsrs = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch CSR initiatives');
            const data = await response.json();
            // Extract CSRs array from API response structure
            // Backend returns: { data: { projects } }
            const csrArray = data.data?.projects || data.projects || data.data?.csrs || data.csrs || [];
            setCsrs(Array.isArray(csrArray) ? csrArray : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCsrs();
    }, []);

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: 'Other',
            location: '',
            startDate: '',
            endDate: '',
            budget: '',
            implementedBy: '',
            contactPersonName: '',
            contactPersonEmail: '',
            contactPersonPhone: '',
            impact: '',
            status: 'Planned',
        });
        setEditingCsr(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (csr: CSR) => {
        setEditingCsr(csr);
        setFormData({
            title: csr.title,
            description: csr.description,
            category: csr.category,
            location: csr.location || '',
            startDate: formatDateForInput(csr.startDate),
            endDate: formatDateForInput(csr.endDate),
            budget: csr.budget?.toString() || '',
            implementedBy: csr.implementedBy || '',
            contactPersonName: csr.contactPerson?.name || '',
            contactPersonEmail: csr.contactPerson?.email || '',
            contactPersonPhone: csr.contactPerson?.phone || '',
            impact: csr.impact || '',
            status: csr.status,
        });
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Frontend validation to match backend requirements
        if (formData.title.trim().length < 5 || formData.title.trim().length > 300) {
            setError('Title must be between 5 and 300 characters');
            return;
        }
        
        if (formData.description.trim().length < 20 || formData.description.trim().length > 5000) {
            setError('Description must be between 20 and 5000 characters');
            return;
        }

        if (formData.location && formData.location.length > 200) {
            setError('Location must not exceed 200 characters');
            return;
        }

        if (formData.impact && formData.impact.length > 1000) {
            setError('Impact description must not exceed 1000 characters');
            return;
        }

        const csrData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            location: formData.location.trim() || undefined,
            startDate: formData.startDate || undefined,
            endDate: formData.endDate || undefined,
            budget: formData.budget ? Number(formData.budget) : undefined,
            implementedBy: formData.implementedBy.trim() || undefined,
            contactPerson: {
                name: formData.contactPersonName.trim() || undefined,
                email: formData.contactPersonEmail.trim() || undefined,
                phone: formData.contactPersonPhone.trim() || undefined,
            },
            impact: formData.impact.trim() || undefined,
            status: formData.status,
        };

        const url = editingCsr ? `${API_URL}/${editingCsr._id}` : API_URL;
        const method = editingCsr ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(csrData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${editingCsr ? 'update' : 'add'} CSR item`);
            }

            resetForm();
            fetchCsrs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    const handleDeleteClick = (id: string) => {
        setCsrToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!csrToDelete) return;

        try {
            await fetch(`${API_URL}/${csrToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchCsrs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete CSR item.');
        } finally {
            setShowDeleteModal(false);
            setCsrToDelete(null);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: Manage CSR Initiatives</h2>

            {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 border border-red-200">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">{editingCsr ? 'Edit CSR Initiative' : 'Add New CSR Initiative'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} required></textarea>
                    </div>
                    
                    {/* Details */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {["Education", "Healthcare", "Environment", "Community Development", "Other"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Budget (USD)</label>
                        <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Implemented By</label>
                        <input type="text" name="implementedBy" value={formData.implementedBy} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Contact Person */}
                    <div className="md:col-span-2 p-4 border rounded-md mt-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Contact Person</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input type="text" name="contactPersonName" placeholder="Name" value={formData.contactPersonName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="email" name="contactPersonEmail" placeholder="Email" value={formData.contactPersonEmail} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="tel" name="contactPersonPhone" placeholder="Phone" value={formData.contactPersonPhone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                         </div>
                    </div>
                    
                    {/* Impact & Status */}
                     <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Impact / Outcome</label>
                        <textarea name="impact" value={formData.impact} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                             {["Planned", "Ongoing", "Completed"].map(stat => <option key={stat} value={stat}>{stat}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4 mt-6">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                        {editingCsr ? 'Update Initiative' : 'Add Initiative'}
                    </button>
                    {editingCsr && (
                        <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-150">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Existing CSR Initiatives</h3>
                {loading ? <p>Loading initiatives...</p> : (
                    <div className="space-y-4">
                        {csrs.map(csr => (
                            <div key={csr._id} className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="mb-3 sm:mb-0">
                                  <p className="text-lg text-gray-800 font-bold">{csr.title}</p>
                                  <p className="text-sm text-gray-600">{csr.location} &bull; <span className={`font-medium ${csr.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{csr.status}</span></p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(csr)} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-150 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(csr._id)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150 text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h4>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this CSR initiative? This action is permanent.</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCSR;
