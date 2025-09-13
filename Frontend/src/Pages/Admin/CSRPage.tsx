import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

// Types
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

// Helper to format date for display
const formatDateForDisplay = (dateString?: string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        return '';
    }
};

const AdminCSR = () => {
    // State management
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [expandedInitiatives, setExpandedInitiatives] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
    
    // Form state
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
    
    // UI state
    const [editingCsr, setEditingCsr] = useState<CSR | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [csrToDelete, setCsrToDelete] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | CSR['status']>('all');
    const [filterCategory, setFilterCategory] = useState<'all' | CSR['category']>('all');

    const API_URL = 'http://localhost:5000/api/csr';

    // Data fetching
    const fetchCsrs = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch CSR initiatives');
            const data = await response.json();
            const csrArray = data.data?.projects || data.projects || data.data?.csrs || data.csrs || [];
            setCsrs(Array.isArray(csrArray) ? csrArray : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const toggleInitiativeExpansion = (csrId: string) => {
        const newExpanded = new Set(expandedInitiatives);
        if (newExpanded.has(csrId)) {
            newExpanded.delete(csrId);
        } else {
            newExpanded.add(csrId);
        }
        setExpandedInitiatives(newExpanded);
    };

    useEffect(() => {
        fetchCsrs();
    }, []);

    // Form management
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
        setActiveTab('form');
    };

    // CRUD operations
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
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
                throw new Error(errorData.message || `Failed to ${editingCsr ? 'update' : 'add'} CSR initiative`);
            }

            resetForm();
            fetchCsrs();
            setActiveTab('list');
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
            const response = await fetch(`${API_URL}/${csrToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (!response.ok) throw new Error('Failed to delete CSR initiative');
            
            fetchCsrs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete CSR initiative.');
        } finally {
            setShowDeleteModal(false);
            setCsrToDelete(null);
        }
    };

    // Filter initiatives
    const filteredCsrs = csrs.filter(csr => {
        const statusMatch = filterStatus === 'all' || csr.status === filterStatus;
        const categoryMatch = filterCategory === 'all' || csr.category === filterCategory;
        return statusMatch && categoryMatch;
    });

    // Get status color
    const getStatusColor = (status: CSR['status']) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Ongoing':
                return 'bg-blue-100 text-blue-800';
            case 'Planned':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get category icon
    const getCategoryIcon = (category: CSR['category']) => {
        switch (category) {
            case 'Education':
                return '🎓';
            case 'Healthcare':
                return '🏥';
            case 'Environment':
                return '🌱';
            case 'Community Development':
                return '🏘️';
            default:
                return '📋';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <a
          href="/csr"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bg-blue-400 text-white p-4 hover:-rotate-135 transition-all ease duration-250 rounded-full bottom-10 right-10 cursor-pointer -rotate-110"
        >
          <ArrowDown />
        </a>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">CSR Management</h1>
                            <p className="text-gray-600 mt-1">Manage Corporate Social Responsibility initiatives</p>
                        </div>
                        <Link 
                            to="/admin/dashboard" 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`px-6 py-3 text-sm cursor-pointer font-medium rounded-lg transition-colors ${
                            activeTab === 'list'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        CSR Initiatives ({csrs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('form')}
                        className={`px-6 py-3 text-sm font-medium cursor-pointer rounded-lg transition-colors ${
                            activeTab === 'form'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        {editingCsr ? 'Edit Initiative' : 'Create New Initiative'}
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'list' ? (
                    <div className="space-y-6">
                        {/* Header with filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <h2 className="text-xl font-semibold text-gray-900">CSR Initiatives</h2>
                            
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                {/* Filters */}
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value as any)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Planned">Planned</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value as any)}
                                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Education">Education</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Environment">Environment</option>
                                    <option value="Community Development">Community Development</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                                <button
                                    onClick={() => setActiveTab('form')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-indigo-700 transition-colors"
                                >
                                    + Add Initiative
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading initiatives...</p>
                            </div>
                        ) : filteredCsrs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No CSR initiatives found.</p>
                                <button
                                    onClick={() => setActiveTab('form')}
                                    className="mt-4 cursor-pointer text-indigo-600 hover:text-indigo-800"
                                >
                                    Create your first initiative
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredCsrs.map(csr => (
                                    <div key={csr._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                        {/* Initiative Header */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <span className="text-2xl">{getCategoryIcon(csr.category)}</span>
                                                        <h3 className="text-lg font-semibold text-gray-900">{csr.title}</h3>
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(csr.status)}`}>
                                                            {csr.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                        <span>📂 {csr.category}</span>
                                                        {csr.location && <span>📍 {csr.location}</span>}
                                                        {csr.budget && <span>💰 ${csr.budget.toLocaleString()}</span>}
                                                        {csr.startDate && <span>📅 {formatDateForDisplay(csr.startDate)}</span>}
                                                    </div>
                                                    <p className="text-gray-700 text-sm line-clamp-2">{csr.description}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-4">
                                                    <button
                                                        onClick={() => handleEdit(csr)}
                                                        className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(csr._id)}
                                                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md cursor-pointer hover:bg-red-200 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => toggleInitiativeExpansion(csr._id)}
                                                        className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
                                                    >
                                                        {expandedInitiatives.has(csr._id) ? 'Hide' : 'View'} Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {expandedInitiatives.has(csr._id) && (
                                            <div className="border-t border-gray-200 bg-gray-50">
                                                <div className="p-6 space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {/* Timeline */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Timeline</h4>
                                                            <div className="space-y-1 text-sm text-gray-600">
                                                                {csr.startDate && <p>Start: {formatDateForDisplay(csr.startDate)}</p>}
                                                                {csr.endDate && <p>End: {formatDateForDisplay(csr.endDate)}</p>}
                                                                {!csr.startDate && !csr.endDate && <p>No timeline specified</p>}
                                                            </div>
                                                        </div>

                                                        {/* Implementation */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation</h4>
                                                            <p className="text-sm text-gray-600">
                                                                {csr.implementedBy || 'Not specified'}
                                                            </p>
                                                        </div>

                                                        {/* Contact Person */}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Person</h4>
                                                            {csr.contactPerson?.name || csr.contactPerson?.email || csr.contactPerson?.phone ? (
                                                                <div className="text-sm text-gray-600 space-y-1">
                                                                    {csr.contactPerson.name && <p>{csr.contactPerson.name}</p>}
                                                                    {csr.contactPerson.email && <p>{csr.contactPerson.email}</p>}
                                                                    {csr.contactPerson.phone && <p>{csr.contactPerson.phone}</p>}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-600">No contact specified</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Impact */}
                                                    {csr.impact && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-900 mb-2">Impact & Outcomes</h4>
                                                            <p className="text-sm text-gray-600">{csr.impact}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Form Tab */
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingCsr ? 'Edit CSR Initiative' : 'Create New CSR Initiative'}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {editingCsr ? 'Update the initiative details below' : 'Fill in the details to create a new CSR initiative'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="space-y-8">
                                    {/* Basic Information */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="lg:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Initiative Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Category *
                                                </label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                    <option value="Education">🎓 Education</option>
                                                    <option value="Healthcare">🏥 Healthcare</option>
                                                    <option value="Environment">🌱 Environment</option>
                                                    <option value="Community Development">🏘️ Community Development</option>
                                                    <option value="Other">📋 Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                    <option value="Planned">Planned</option>
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>

                                            <div className="lg:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Description *
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows={4}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Budget (USD)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div className="lg:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Implemented By
                                                </label>
                                                <input
                                                    type="text"
                                                    name="implementedBy"
                                                    value={formData.implementedBy}
                                                    onChange={handleInputChange}
                                                    placeholder="Organization or team responsible"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Contact Person Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="contactPersonName"
                                                    value={formData.contactPersonName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="contactPersonEmail"
                                                    value={formData.contactPersonEmail}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="contactPersonPhone"
                                                    value={formData.contactPersonPhone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Impact & Outcomes */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Impact & Outcomes</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Impact Description
                                            </label>
                                            <textarea
                                                name="impact"
                                                value={formData.impact}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Describe the expected or achieved impact of this initiative..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            setActiveTab('list');
                                        }}
                                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-pointer rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <div className="space-x-3">
                                        {editingCsr && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border cursor-pointer border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                Reset Form
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700 transition-colors"
                                        >
                                            {editingCsr ? 'Update Initiative' : 'Create Initiative'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <span className="text-red-600 text-xl">⚠️</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete CSR Initiative</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Are you sure you want to delete this CSR initiative? This action cannot be undone and will permanently remove all initiative data.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Delete Initiative
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCSR;