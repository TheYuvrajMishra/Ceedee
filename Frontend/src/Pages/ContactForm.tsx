import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

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
    const [scrollY, setScrollY] = useState(0);
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

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const parallaxOffset = scrollY * 0.3;

    return (
        <div className="min-h-screen bg-white">
            <title>Ceedee's | Contact</title>
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        transform: `translateY(${parallaxOffset}px)`,
                        backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                    }}
                />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
                        Contact Us
                    </h1>
                    <div className="w-24 h-px bg-white mx-auto mb-8"></div>
                    <p className="text-xl font-light mb-4">
                        Get in Touch
                    </p>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                        We'd love to hear from you. Let's discuss how we can help your business grow.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div 
                        className="bg-white border border-gray-200 p-12 shadow-sm"
                        style={{
                            transform: `translateY(${scrollY * 0.05}px)`,
                        }}
                    >
                        {success && (
                            <div className="text-center mb-12">
                                <div className="w-16 h-16 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-light text-gray-900 mb-4">Message Sent</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Thank you for your message! We'll get back to you soon.
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-8 p-6 bg-red-50 border border-red-200">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        {!success && (
                            <div className="space-y-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-light text-gray-900 mb-4">
                                        Send us a Message
                                    </h2>
                                    <div className="w-16 h-px bg-gray-900 mx-auto"></div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                            NAME *
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                            EMAIL *
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                            PHONE
                                        </label>
                                        <input
                                            name="phone"
                                            type="text"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                            COMPANY
                                        </label>
                                        <input
                                            name="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                            PREFERRED CONTACT METHOD
                                        </label>
                                        <select
                                            name="contactPreference"
                                            value={formData.contactPreference}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors bg-white"
                                        >
                                            <option>Any</option>
                                            <option>Email</option>
                                            <option>Phone</option>
                                            <option>WhatsApp</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                                        YOUR MESSAGE *
                                    </label>
                                    <textarea
                                        name="query"
                                        value={formData.query}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                                        placeholder="Tell us about your project or inquiry..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full px-8 py-4 bg-gray-900 text-white font-light tracking-wider text-sm hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? 'SENDING...' : 'SEND MESSAGE'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                            Get in Touch
                        </h2>
                        <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Multiple ways to reach us across our business locations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div 
                                className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    // transform: `translateY(${scrollY * 0.02}px)`,
                                }}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-light text-gray-900 mb-4">Visit Us</h3>
                            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                Corporate Office<br />
                                Tamil Nadu, India
                            </p>
                        </div>

                        <div className="text-center">
                            <div 
                                className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    // transform: `translateY(${scrollY * 0.025}px)`,
                                }}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-light text-gray-900 mb-4">Call Us</h3>
                            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                +91 XXX XXX XXXX<br />
                                +91 XXX XXX XXXX
                            </p>
                        </div>

                        <div className="text-center">
                            <div 
                                className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    // transform: `translateY(${scrollY * 0.03}px)`,
                                }}
                            >
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-light text-gray-900 mb-4">Email Us</h3>
                            <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                info@ceedeegroup.com<br />
                                contact@ceedeegroup.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                        Partner With Excellence
                    </h2>
                    <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                        Discover how Ceedee Group's diversified expertise can serve your
                        business needs across automotive and industrial sectors.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link 
                            to="/" 
                            className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
                        >
                            EXPLORE COMPANIES
                        </Link>
                        <Link 
                            to="/careers" 
                            className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
                        >
                            VIEW CAREERS
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8">
                            <h3 className="text-xl font-light text-gray-900 mb-4">Industrial Solutions</h3>
                            <div className="w-12 h-px bg-gray-400 mb-4"></div>
                            <p className="text-gray-600 mb-4">
                                Food Grade PP Woven Fabrics, Sacks and Bags for diverse industries
                            </p>
                            <Link to="/venbro" className="text-gray-900 text-sm tracking-wider hover:underline">
                                VISIT VENBRO POLYMERS →
                            </Link>
                        </div>
                        <div className="bg-gray-50 p-8">
                            <h3 className="text-xl font-light text-gray-900 mb-4">Automotive Excellence</h3>
                            <div className="w-12 h-px bg-gray-400 mb-4"></div>
                            <p className="text-gray-600 mb-4">
                                South India's longest serving Maruti authorized service station
                            </p>
                            <Link to="/skae" className="text-gray-900 text-sm tracking-wider hover:underline">
                                VISIT SKAE →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactForm;