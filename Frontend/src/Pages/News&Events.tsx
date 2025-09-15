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

// --- Sort and Filter Controls ---
type FilterType = 'All' | 'News' | 'Event';
const filterOptions: FilterType[] = ['All', 'News', 'Event'];

type SortType = 'newest' | 'oldest' | 'alphabetical';
const sortOptions: { value: SortType; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'Alphabetical' }
];

const SortDropdown = ({ activeSort, setActiveSort }: { activeSort: SortType, setActiveSort: (sort: SortType) => void }) => (
    <div className="relative">
        <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value as SortType)}
            className="appearance-none bg-gray-200 border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors cursor-pointer shadow-sm"
            style={{ minWidth: '160px' }}
        >
            {sortOptions.map(option => (
                <option 
                    key={option.value} 
                    value={option.value} 
                    className="py-2"
                >
                    {option.label}
                </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

const FilterControls = ({ activeFilter, setActiveFilter }: { activeFilter: FilterType, setActiveFilter: (filter: FilterType) => void }) => (
    <div className="inline-flex bg-gray-200 rounded-lg p-1">
        {filterOptions.map((option, index) => (
            <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative ${
                    index === 0 ? 'rounded-l-md' : index === filterOptions.length - 1 ? 'rounded-r-md' : ''
                } ${
                    activeFilter === option
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-300'
                }`}
            >
                {option}
            </button>
        ))}
    </div>
);

const ControlsBar = ({ activeFilter, setActiveFilter, activeSort, setActiveSort }: {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
    activeSort: SortType;
    setActiveSort: (sort: SortType) => void;
}) => (
    <div className="flex justify-between items-center mb-12">
        <SortDropdown activeSort={activeSort} setActiveSort={setActiveSort} />
        <FilterControls activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
    </div>
);


// --- Timeline Item Component ---
const TimelineItem = ({ item, onReadMore }: { item: NewsEvent, onReadMore: (item: NewsEvent) => void }) => {
    const formatTimelineDate = (dateString?: string) => {
        if (!dateString) return { month: '', day: '', year: '' };
        const date = new Date(dateString);
        return {
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            day: date.getDate().toString().padStart(2, '0'),
            year: date.getFullYear().toString()
        };
    };

    const { month, day, year } = formatTimelineDate(item.date);
    const isEvent = item.type === 'Event';

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-gray-200 last:border-b-0 group">
            {/* Date Block */}
            <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-sm font-medium text-gray-500 mb-1">{month}</div>
                <div className="text-5xl md:text-6xl font-light text-gray-800 mb-1">{day}</div>
                <div className="text-lg font-medium text-gray-500">{year}</div>
            </div>

            {/* Image - Fixed height to match content */}
            <div className="flex-shrink-0 w-full md:w-96 h-80 overflow-hidden">
                <img
                    src={item.image || 'https://placehold.co/600x400/EEE/31343C?text=No+Image'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found'; }}
                />
            </div>

            {/* Content - Fixed height to match image */}
            <div className="flex-1 min-w-0 h-80 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isEvent ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.type}
                    </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {item.title}
                </h3>
                
                {isEvent && item.location && (
                    <div className="text-sm text-gray-500 mb-4 flex items-center">
                        <PinIcon /> {item.location}
                    </div>
                )}
                
                {/* Fixed height description - minimum 3 lines */}
                <div className="h-20 mb-6 overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-base h-full">
                        {item.description.substring(0, 250)}{item.description.length > 250 && '...'}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <button 
                        onClick={() => onReadMore(item)} 
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors group/btn"
                    >
                        View {item.type} Details 
                        <svg className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};


// =================================================================================
// 2. DETAIL MODAL COMPONENT
// =================================================================================
const NewsDetailModal = ({ item, onClose }: { item: NewsEvent, onClose: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    // We'll need the full formatDate function here for the modal
    const fullFormatDate = (dateString?: string) => {
        if (!dateString) return { full: '' };
        const date = new Date(dateString);
        return {
            full: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
    };

    const { full: fullDate } = fullFormatDate(item.date);
    const isEvent = item.type === 'Event';

    return (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-xs bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
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
// 3. MAIN COMPONENT
// =================================================================================

const NewsAndEvents = () => {
    const [items, setItems] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [activeSort, setActiveSort] = useState<SortType>('newest');
    const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchNewsAndEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/news-events');
                if (!response.ok) throw new Error('Data could not be fetched right now.');
                const data = await response.json();
                
                const newsEvents = data.data.newsEvents || [];
                const publishedItems = newsEvents
                    .filter((item: NewsEvent) => item.status === 'Published');
                
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
        let filtered = activeFilter === 'All' ? items : items.filter(item => item.type === activeFilter);
        
        // Apply sorting
        return filtered.sort((a, b) => {
            switch (activeSort) {
                case 'oldest':
                    return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                case 'alphabetical':
                    return a.title.localeCompare(b.title);
                case 'newest':
                default:
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
            }
        });
    }, [items, activeFilter, activeSort]);

    const handleReadMore = (item: NewsEvent) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const parallaxOffset = scrollY * 0.3;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="flex w-full h-full">
                    {/* Left side - Content */}
                    <div className="w-2/5 bg-gray-900 text-white flex items-center justify-center relative z-10">
                        <div className="max-w-lg px-8 text-left">
                            <h1 className="text-2xl md:text-3xl font-light text-amber-600 mb-6 tracking-wide">
                                News & Events
                            </h1>
                            <h2 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight">
                                Stay Connected with Ceedee - Latest Updates & Happenings.
                            </h2>
                            <p className="text-lg text-gray-300 font-light tracking-wide">
                                Your Gateway to Information.
                            </p>
                        </div>
                    </div>
                    
                    {/* Right side - Image */}
                    <div className="w-3/5 relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                transform: `translateY(${parallaxOffset}px)`,
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 md:py-16">
                
                <ControlsBar 
                    activeFilter={activeFilter} 
                    setActiveFilter={setActiveFilter}
                    activeSort={activeSort}
                    setActiveSort={setActiveSort}
                />

                {error && (
                    <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg font-semibold">{error}</p>
                )}

                {loading ? (
                    <div className="w-4/5 mx-auto">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-gray-200 animate-pulse">
                                <div className="flex-shrink-0 text-center md:text-left">
                                    <div className="bg-gray-300 h-4 w-8 rounded mb-1 mx-auto md:mx-0"></div>
                                    <div className="bg-gray-300 h-16 w-16 rounded mx-auto md:mx-0 mb-1"></div>
                                    <div className="bg-gray-300 h-5 w-12 rounded mx-auto md:mx-0"></div>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-96 h-80 bg-gray-300 rounded-lg"></div>
                                <div className="flex-1 min-w-0">
                                    <div className="bg-gray-300 h-6 w-16 rounded-full mb-3"></div>
                                    <div className="bg-gray-300 h-9 w-3/4 rounded mb-4"></div>
                                    <div className="space-y-2 mb-6">
                                        <div className="bg-gray-300 h-4 w-full rounded"></div>
                                        <div className="bg-gray-300 h-4 w-full rounded"></div>
                                        <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                                    </div>
                                    <div className="bg-gray-300 h-6 w-32 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl font-semibold text-gray-700">No {activeFilter !== 'All' && activeFilter.toLowerCase()}s to display</p>
                        <p className="text-gray-500 mt-2">Please check back soon for new updates!</p>
                    </div>
                ) : (
                    <div className="w-4/5 mx-auto">
                        {filteredItems.map(item => (
                            <TimelineItem key={item._id} item={item} onReadMore={handleReadMore} />
                        ))}
                    </div>
                )}
            </div>
            
            {selectedItem && <NewsDetailModal item={selectedItem} onClose={handleCloseModal} />}
        </div>
    );
};

export default NewsAndEvents;