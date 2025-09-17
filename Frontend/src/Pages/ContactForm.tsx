import { useState } from 'react';
import { useNavigate } from 'react-router';

// Define the structure for our form data
interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    query: string;
    contactPreference: "Email" | "Phone" | "WhatsApp" | "Any";
}

const ContactForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        query: '',
        contactPreference: 'Any',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                 const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong. Please try again.');
            }

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                query: '',
                contactPreference: 'Any',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
            setInterval(() => {
                navigate('/');
            }, 2000);
        }
        
    };

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white shadow-2xl rounded-xl my-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-center text-gray-500 mb-8">We'd love to hear from you. Please fill out the form below.</p>
            
            {success && (
                <p className="p-4 my-4 text-center text-green-800 bg-green-50 rounded-lg border border-green-200">
                    Thank you for your message! We'll get back to you soon.
                </p>
            )}

            {error && (
                <p className="p-4 my-4 text-center text-red-800 bg-red-50 rounded-lg border border-red-200">
                    {error}
                </p>
            )}

            {!success && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-1">How should we contact you?</label>
                            <select id="contactPreference" name="contactPreference" value={formData.contactPreference} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                                <option>Any</option>
                                <option>Email</option>
                                <option>Phone</option>
                                <option>WhatsApp</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">Your Query</label>
                            <textarea id="query" name="query" value={formData.query} onChange={handleInputChange} required rows={5} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full px-4 py-3 text-white bg-indigo-600 font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
