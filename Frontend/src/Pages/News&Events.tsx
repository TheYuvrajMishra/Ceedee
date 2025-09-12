import { useState, useEffect, useMemo } from 'react';

// The type definition remains the same
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

// =================================================================================
// 1. HELPER COMPONENTS
// =================================================================================

// --- SVG Icons ---
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// --- Filter Controls ---
type FilterType = 'All' | 'News' | 'Event';
const filterOptions: FilterType[] = ['All', 'News', 'Event'];

const FilterControls = ({ activeFilter, setActiveFilter }: { activeFilter: FilterType, setActiveFilter: (filter: FilterType) => void }) => (
    <div className="flex justify-center items-center gap-2 md:gap-4 mb-12">
        {filterOptions.map(option => (
            <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-4 py-2 text-sm md:text-base cursor-pointer font-semibold rounded-full transition-all duration-300 ease-in-out ${
                    activeFilter === option
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                {option}
            </button>
        ))}
    </div>
);

// --- Date Formatter ---
const formatDate = (dateString?: string) => {
    if (!dateString) return { month: '', day: '', full: '' };
    const date = new Date(dateString);
    return {
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        day: date.toLocaleDateString('en-US', { day: '2-digit' }),
        full: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
};

// --- News & Event Card Component ---
const NewsEventCard = ({ item, onReadMore }: { item: NewsEvent, onReadMore: (item: NewsEvent) => void }) => {
    const { month, day, full: fullDate } = formatDate(item.date);
    const isEvent = item.type === 'Event';

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
            {item.image && (
                <div className="relative h-48">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found'; }}
                    />
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${isEvent ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'}`}>
                        {item.type}
                    </span>
                </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-4">
                    {isEvent && (
                        <div className="flex-shrink-0 text-center bg-gray-100 rounded-md p-2 border border-gray-200">
                            <p className="text-purple-600 font-bold text-sm">{month}</p>
                            <p className="text-gray-800 font-extrabold text-2xl tracking-tight">{day}</p>
                        </div>
                    )}
                    <div className="flex-grow">
                        <p className="text-sm text-gray-500 mb-1">
                            {!isEvent && <><CalendarIcon /> {fullDate}</>}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                    </div>
                </div>

                {isEvent && item.location && (
                    <p className="text-sm text-gray-600 my-2 flex items-center">
                        <PinIcon /> {item.location}
                    </p>
                )}

                <p className="text-gray-600 text-sm leading-relaxed my-3 flex-grow">
                    {item.description.substring(0, 120)}{item.description.length > 120 && '...'}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button onClick={() => onReadMore(item)} className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
                        Read More &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Skeleton Loader Card ---
const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="bg-gray-300 h-48 w-full"></div>
        <div className="p-6">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="bg-gray-300 h-14 w-14 rounded-md"></div>
                </div>
                <div className="flex-grow space-y-2">
                    <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
                    <div className="bg-gray-300 h-5 w-full rounded"></div>
                </div>
            </div>
            <div className="bg-gray-300 h-4 w-3/4 mt-4 rounded"></div>
            <div className="space-y-2 mt-3">
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
                 <div className="bg-gray-300 h-5 w-1/4 rounded"></div>
            </div>
        </div>
    </div>
);

// =================================================================================
// 2. NEW: DETAIL MODAL COMPONENT
// =================================================================================
const NewsDetailModal = ({ item, onClose }: { item: NewsEvent, onClose: () => void }) => {
    // Effect to handle 'Escape' key press for closing the modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const { full: fullDate } = formatDate(item.date);
    const isEvent = item.type === 'Event';

    return (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-xs bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose} // Close modal on backdrop click
        >
            <div 
                className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-800 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                {item.image && (
                    <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-t-lg" />
                )}

                <div className="p-6 md:p-8">
                    <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 ${isEvent ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.type}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{item.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 mb-6">
                        <div className="flex items-center"><CalendarIcon /> {fullDate}</div>
                        {isEvent && item.location && <div className="flex items-center"><PinIcon /> {item.location}</div>}
                    </div>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>

                    {item.tags.length > 0 && (
                         <div className="mt-8 pt-4 border-t border-gray-200">
                             <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                             <div className="flex flex-wrap gap-2">
                                 {item.tags.map(tag => (
                                     <span key={tag} className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                                         {tag}
                                     </span>
                                 ))}
                             </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// =================================================================================
// 3. MAIN COMPONENT (Updated with Modal Logic)
// =================================================================================

const NewsAndEvents = () => {
    const [items, setItems] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    
    // NEW: State to manage the selected item for the modal
    const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null);

    useEffect(() => {
        const fetchNewsAndEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/news-events');
                if (!response.ok) throw new Error('Data could not be fetched right now.');
                const data = await response.json();
                
                const newsEvents = data.data.newsEvents || [];
                const publishedItems = newsEvents
                    .filter((item: NewsEvent) => item.status === 'Published')
                    .sort((a: NewsEvent, b: NewsEvent) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
                
                setItems(publishedItems);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchNewsAndEvents();
    }, []);

    const filteredItems = useMemo(() => {
        if (activeFilter === 'All') return items;
        return items.filter(item => item.type === activeFilter);
    }, [items, activeFilter]);

    // NEW: Handlers to open and close the modal
    const handleReadMore = (item: NewsEvent) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">News & Events</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Stay updated with our latest announcements and upcoming events.</p>
                </div>
                
                <FilterControls activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

                {error && (
                    <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg font-semibold">{error}</p>
                )}

                {loading ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl font-semibold text-gray-700">No {activeFilter !== 'All' && activeFilter.toLowerCase()}s to display</p>
                        <p className="text-gray-500 mt-2">Please check back soon for new updates!</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredItems.map(item => (
                            <NewsEventCard key={item._id} item={item} onReadMore={handleReadMore} />
                        ))}
                    </div>
                )}
            </div>
            
            {/* NEW: Conditionally render the modal */}
            {selectedItem && <NewsDetailModal item={selectedItem} onClose={handleCloseModal} />}
        </div>
    );
};

export default NewsAndEvents;