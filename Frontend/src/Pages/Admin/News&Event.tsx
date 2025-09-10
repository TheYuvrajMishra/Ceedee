import { useState, useEffect } from 'react';
import { Link } from 'react-router';

// Type definition based on the Mongoose Schema
type NewsEvent = {
    _id: string;
    title: string;
    type: "News" | "Event";
    description: string;
    date?: string;
    location?: string;
    image?: string;
    status: "Draft" | "Published" | "Archived";
    tags: string[];
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

const AdminNewsAndEvents = () => {
    const [newsAndEvents, setNewsAndEvents] = useState<NewsEvent[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'News' as NewsEvent['type'],
        description: '',
        date: '',
        location: '',
        image: '',
        status: 'Published' as NewsEvent['status'],
        tags: '', // Will be stored as a comma-separated string in the form
    });
    const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const API_URL = 'http://localhost:5000/api/news-events';

    const fetchNewsAndEvents = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch news and events');
            const data = await response.json();
            setNewsAndEvents(data.data?.newsEvents || data.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsAndEvents();
    }, []);

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'News',
            description: '',
            date: '',
            location: '',
            image: '',
            status: 'Published',
            tags: '',
        });
        setEditingItem(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (item: NewsEvent) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            type: item.type,
            description: item.description,
            date: formatDateForInput(item.date),
            location: item.location || '',
            image: item.image || '',
            status: item.status,
            tags: item.tags.join(', '), // Convert array back to comma-separated string for editing
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
        
        if (formData.description.trim().length < 20 || formData.description.trim().length > 10000) {
            setError('Description must be between 20 and 10000 characters');
            return;
        }

        const itemData = {
            title: formData.title.trim(),
            type: formData.type,
            content: formData.description.trim(), // Backend expects 'content', not 'description'
            date: formData.date || undefined,
            location: formData.location.trim() || undefined,
            image: formData.image.trim() || undefined,
            status: formData.status,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Convert string to array
        };

        const url = editingItem ? `${API_URL}/${editingItem._id}` : API_URL;
        const method = editingItem ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(itemData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to ${editingItem ? 'update' : 'add'} item`);
            }

            resetForm();
            fetchNewsAndEvents();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        }
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            const response = await fetch(`${API_URL}/${itemToDelete}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (!response.ok) throw new Error('Failed to delete item');
            fetchNewsAndEvents();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
            <Link to={"/admin/dashboard"} className='fixed top-0 right-0 m-5 underline'>back to home</Link>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: Manage News & Events</h2>

            {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 border border-red-200">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">{editingItem ? 'Edit Item' : 'Add New News/Event'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Type</label>
                        <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="News">News</option>
                            <option value="Event">Event</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} required></textarea>
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex space-x-4 mt-6">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                        {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItem && (
                        <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-150">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Existing News & Events</h3>
                {loading ? <p>Loading items...</p> : (
                    <div className="space-y-4">
                        {newsAndEvents.map(item => (
                            <div key={item._id} className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                 <div className="mb-3 sm:mb-0">
                                  <p className="text-lg text-gray-800 font-bold">{item.title} <span className="text-sm font-normal text-white bg-indigo-500 px-2 py-0.5 rounded-full ml-2">{item.type}</span></p>
                                  <p className="text-sm text-gray-600">{formatDateForInput(item.date)} &bull; <span className={`font-medium ${item.status === 'Published' ? 'text-green-600' : 'text-gray-500'}`}>{item.status}</span></p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-150 text-sm">Edit</button>
                                    <button onClick={() => handleDeleteClick(item._id)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150 text-sm">Delete</button>
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
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action is permanent.</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNewsAndEvents;
