import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, HeartPulse, Leaf, Users, ClipboardList, MapPin, Calendar, CheckCircle, ArrowRight, Search, ChevronDown } from 'lucide-react';

// --- TYPES ---
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

// --- HELPER CONFIGURATION ---
const categoryConfig = {
    "Education": { icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", ring: "ring-blue-200" },
    "Healthcare": { icon: HeartPulse, color: "text-red-600", bg: "bg-red-50", ring: "ring-red-200" },
    "Environment": { icon: Leaf, color: "text-green-600", bg: "bg-green-50", ring: "ring-green-200" },
    "Community Development": { icon: Users, color: "text-purple-600", bg: "bg-purple-50", ring: "ring-purple-200" },
    "Other": { icon: ClipboardList, color: "text-gray-600", bg: "bg-gray-50", ring: "ring-gray-200" },
};

const statusConfig = {
    "Completed": { color: "text-green-700", bg: "bg-green-100/80" },
    "Ongoing": { color: "text-yellow-700", bg: "bg-yellow-100/80" },
    "Planned": { color: "text-indigo-700", bg: "bg-indigo-100/80" },
};


// --- CARD COMPONENT ---
const InitiativeCard = ({ csr }: { csr: CSR }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const CategoryIcon = categoryConfig[csr.category].icon;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <motion.div
            layout
            className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200/80 overflow-hidden ${categoryConfig[csr.category].ring} ring-1 ring-inset`}
        >
            <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3 sm:gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${categoryConfig[csr.category].bg}`}>
                            <CategoryIcon className={`w-6 h-6 ${categoryConfig[csr.category].color}`} />
                        </div>
                        <div className="min-w-0">
                            <p className={`text-sm font-semibold ${categoryConfig[csr.category].color}`}>{csr.category}</p>
                            <h3 className="text-lg font-bold text-gray-800 break-words">{csr.title}</h3>
                        </div>
                    </div>
                    <div className={`px-3 py-1 text-xs font-medium rounded-full self-start sm:self-center flex-shrink-0 ${statusConfig[csr.status].bg} ${statusConfig[csr.status].color}`}>
                        {csr.status}
                    </div>
                </div>

                {csr.location && (
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5 break-words">
                        <MapPin size={14} className="flex-shrink-0" /> {csr.location}
                    </p>
                )}
                
                <motion.div layout animate={{ height: 'auto' }} className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-sm break-words">
                        {isExpanded ? csr.description : `${csr.description.slice(0, 100)}${csr.description.length > 100 ? '...' : ''}`}
                    </p>

                    <AnimatePresence>
                        {isExpanded && csr.impact && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className={`mt-4 p-4 rounded-lg border ${categoryConfig[csr.category].bg} border-dashed`}
                            >
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                                    <CheckCircle size={16} className={categoryConfig[csr.category].color} /> Impact & Outcomes
                                </h4>
                                <p className="text-gray-700 text-sm italic break-words">{csr.impact}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <div className="border-t border-gray-200/80 pt-4 mt-4 text-xs text-gray-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                     <div className="flex items-center gap-1.5 flex-wrap">
                         <Calendar size={14} />
                         <span>{formatDate(csr.startDate)}</span>
                         {csr.endDate && <><span>-</span><span>{formatDate(csr.endDate)}</span></>}
                     </div>
                     {(csr.description.length > 100 || csr.impact) && (
                         <button
                             onClick={() => setIsExpanded(!isExpanded)}
                             className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center gap-1 flex-shrink-0 self-end sm:self-center"
                         >
                             {isExpanded ? 'Show Less' : 'Learn More'}
                             <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                                 <ChevronDown size={16} />
                             </motion.div>
                         </button>
                     )}
                </div>
            </div>
        </motion.div>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function CSRPage() {
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterCategory, setFilterCategory] = useState<'all' | CSR['category']>('all');
    const [filterStatus, setFilterStatus] = useState<'all' | CSR['status']>('all');

    // --- API Integration ---
    useEffect(() => {
        const fetchCsrs = async () => {
            setLoading(true);
            setError(''); // Reset error state on new fetch
            try {
                const response = await fetch('http://localhost:5000/api/csr');
                if (!response.ok) {
                    throw new Error('Failed to fetch initiatives. Please try again later.');
                }
                const data = await response.json();
                setCsrs(data.data?.projects || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchCsrs();
    }, []);

    const filteredCsrs = csrs.filter(csr => {
        const categoryMatch = filterCategory === 'all' || csr.category === filterCategory;
        const statusMatch = filterStatus === 'all' || csr.status === filterStatus;
        return categoryMatch && statusMatch;
    });

    const categories: ('all' | CSR['category'])[] = ['all', 'Education', 'Healthcare', 'Environment', 'Community Development', 'Other'];
    const statuses: ('all' | CSR['status'])[] = ['all', 'Ongoing', 'Completed', 'Planned'];

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-20">
                    <div className="inline-flex items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <span className="text-lg text-gray-600">Loading our initiatives...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="py-20 max-w-lg mx-auto text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">😟</span>
                    </div>
                    <h3 className="text-xl font-semibold text-red-800 mb-2">An Error Occurred</h3>
                    <p className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
                </div>
            );
        }

        if (filteredCsrs.length === 0) {
            return (
                <div className="text-center py-20 max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Initiatives Found</h3>
                    <p className="text-gray-600">
                        {csrs.length > 0
                            ? "Try adjusting your filters to discover more of our projects."
                            : "We are currently planning new initiatives. Please check back soon!"
                        }
                    </p>
                </div>
            );
        }
        
        return (
            <motion.div 
                layout
                className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence>
                    {filteredCsrs.map((csr, i) => (
                        <motion.div
                            key={csr._id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                            <InitiativeCard csr={csr} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans pt-16">
            {/* Header Section */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight break-words">
                        Corporate Social Responsibility
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We are committed to creating a positive impact on society and the environment through sustainable initiatives.
                    </p>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter Section */}
                <div className="mb-12 p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button 
                                        key={cat} 
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                                            filterCategory === cat
                                            ? 'bg-indigo-600 text-white shadow'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat === 'all' ? 'All' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Status</label>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(stat => (
                                     <button 
                                         key={stat} 
                                         onClick={() => setFilterStatus(stat)}
                                         className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                                             filterStatus === stat
                                             ? 'bg-indigo-600 text-white shadow'
                                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                         }`}
                                     >
                                         {stat === 'all' ? 'All' : stat}
                                     </button>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>

                {/* Content Grid */}
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-white mt-16 border-t border-gray-200">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                         Join Us in Making a Difference
                     </h2>
                      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                           Interested in our initiatives or want to partner with us? We'd love to hear from you.
                      </p>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                          Contact Us <ArrowRight size={18} />
                      </button>
                 </div>
            </footer>
        </div>
    );
}

