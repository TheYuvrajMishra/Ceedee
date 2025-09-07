import { useState, useEffect } from 'react';

// Expanded type to match the Mongoose schema
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

const AdminCareer = () => {
    // State for the list of all jobs
    const [jobs, setJobs] = useState<Career[]>([]);

    // State for the form fields
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-Time' as Career['type'],
        description: '',
        requirements: [] as string[],
        salaryMin: '',
        salaryMax: '',
    });

    // State for managing the requirements input
    const [currentRequirement, setCurrentRequirement] = useState('');
    
    // State for editing logic
    const [editingJob, setEditingJob] = useState<Career | null>(null);
    
    // UI State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);


    const API_URL = 'http://localhost:5000/api/careers'; // Ensure this is your correct API endpoint

    // --- Data Fetching ---
    const fetchJobs = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch jobs. Please check the network connection.');
            const data = await response.json();
            // Extract jobs array from API response structure
            setJobs(data.data?.jobs || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // --- Form Management ---
    const resetForm = () => {
        setFormData({
            title: '',
            department: '',
            location: '',
            type: 'Full-Time',
            description: '',
            requirements: [],
            salaryMin: '',
            salaryMax: '',
        });
        setCurrentRequirement('');
        setEditingJob(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // --- Requirements Management ---
    const handleAddRequirement = () => {
        if (currentRequirement.trim()) {
            setFormData(prev => ({
                ...prev,
                requirements: [...prev.requirements, currentRequirement.trim()]
            }));
            setCurrentRequirement('');
        }
    };

    const handleRemoveRequirement = (index: number) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };
    
    // --- CRUD Operations ---
    const handleEdit = (job: Career) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            description: job.description,
            requirements: job.requirements,
            salaryMin: job.salaryRange.min?.toString() || '',
            salaryMax: job.salaryRange.max?.toString() || '',
        });
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Frontend validation to match backend requirements
        if (formData.title.trim().length < 5 || formData.title.trim().length > 200) {
            setError('Job title must be between 5 and 200 characters');
            return;
        }
        
        if (formData.description.trim().length < 50 || formData.description.trim().length > 5000) {
            setError('Job description must be between 50 and 5000 characters');
            return;
        }

        if (formData.location && formData.location.length > 100) {
            setError('Location must not exceed 100 characters');
            return;
        }

        if (formData.requirements.join('').length > 2000) {
            setError('Requirements must not exceed 2000 characters total');
            return;
        }

        // Clean up salary range - remove undefined values to avoid validation issues
        const salaryRange: any = {};
        if (formData.salaryMin && !isNaN(Number(formData.salaryMin))) {
            salaryRange.min = Number(formData.salaryMin);
        }
        if (formData.salaryMax && !isNaN(Number(formData.salaryMax))) {
            salaryRange.max = Number(formData.salaryMax);
        }

        const careerData = {
            title: formData.title.trim(),
            department: formData.department.trim() || undefined,
            location: formData.location.trim() || undefined,
            type: formData.type,
            description: formData.description.trim(),
            requirements: formData.requirements.filter(req => req.trim() !== ''),
            ...(Object.keys(salaryRange).length > 0 && { salaryRange }),
        };

        const url = editingJob ? `${API_URL}/${editingJob._id}` : API_URL;
        const method = editingJob ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    // Assuming token-based auth
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(careerData),
            });
            if (!response.ok) {
                 const errorData = await response.json();
                 console.error('Career API Error:', errorData);
                 console.error('Sent data:', careerData);
                 
                 // Show detailed validation errors if available
                 if (errorData.details && Array.isArray(errorData.details)) {
                     const validationErrors = errorData.details.map((err: any) => 
                         `${err.field}: ${err.message}`
                     ).join(', ');
                     throw new Error(validationErrors);
                 }
                 
                 throw new Error(errorData.message || `Failed to ${editingJob ? 'update' : 'add'} job`);
            }

            resetForm();
            fetchJobs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    const handleDeleteClick = (id: string) => {
        setJobToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!jobToDelete) return;

        try {
            const response = await fetch(`${API_URL}/${jobToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (!response.ok) throw new Error('Failed to delete job');
            
            fetchJobs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setShowDeleteModal(false);
            setJobToDelete(null);
        }
    };

    // --- Render Method ---
    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: Manage Careers</h2>

            {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 border border-red-200">{error}</p>}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">{editingJob ? 'Edit Job' : 'Add New Job Posting'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    {/* Department */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {/* Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Job Type</label>
                        <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} required></textarea>
                    </div>
                    {/* Salary Range */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-gray-700 font-medium mb-2">Salary Minimum</label>
                            <input type="number" name="salaryMin" placeholder="e.g., 50000" value={formData.salaryMin} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Salary Maximum</label>
                            <input type="number" name="salaryMax" placeholder="e.g., 80000" value={formData.salaryMax} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                     {/* Requirements */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Requirements</label>
                        <div className="flex items-center space-x-2 mb-3">
                            <input
                                type="text"
                                value={currentRequirement}
                                onChange={(e) => setCurrentRequirement(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                                placeholder="Add a requirement and press Enter"
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={handleAddRequirement} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 whitespace-nowrap">
                                Add
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {formData.requirements.map((req, index) => (
                                <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                                    <span className="text-gray-800">{req}</span>
                                    <button type="button" onClick={() => handleRemoveRequirement(index)} className="text-red-500 hover:text-red-700 font-bold">
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex space-x-4 mt-6">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                        {editingJob ? 'Update Job' : 'Add Job'}
                    </button>
                    {editingJob && (
                        <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-150">
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Jobs List */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Existing Job Postings</h3>
                {loading ? <p>Loading jobs...</p> : (
                    <ul className="space-y-4">
                        {jobs.map(job => (
                            <li key={job._id} className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="mb-3 sm:mb-0">
                                  <p className="text-lg text-gray-800 font-bold">{job.title}</p>
                                  <p className="text-sm text-gray-600">{job.location} &bull; {job.type}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(job)} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-150 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(job._id)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150 text-sm">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h4>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this job posting? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition duration-150">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCareer;
