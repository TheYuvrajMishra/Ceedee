import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';

type NewsEvent = {
    _id: string; title: string; type: "News" | "Event"; description: string;
    date?: string; location?: string; image?: string; status: "Draft" | "Published" | "Archived"; tags: string[];
};
type FilterType = 'All' | 'News' | 'Event';
type SortType = 'newest' | 'oldest' | 'alphabetical';

const filterOptions: FilterType[] = ['All', 'News', 'Event'];
const sortOptions = [
    { value: 'newest' as SortType, label: 'Newest First' },
    { value: 'oldest' as SortType, label: 'Oldest First' },
    { value: 'alphabetical' as SortType, label: 'Alphabetical' }
];

const formatDate = (dateString?: string, full = false) => {
    if (!dateString) return full ? '' : { month: '', day: '', year: '' };
    const date = new Date(dateString);
    if (full) return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return {
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        day: date.getDate().toString().padStart(2, '0'),
        year: date.getFullYear().toString()
    };
};

const Controls = ({ activeFilter, setActiveFilter, activeSort, setActiveSort }: {
    activeFilter: FilterType; setActiveFilter: (f: FilterType) => void;
    activeSort: SortType; setActiveSort: (s: SortType) => void;
}) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
        <div className="relative">
            <select value={activeSort} onChange={(e) => setActiveSort(e.target.value as SortType)}
                className="appearance-none bg-white border border-gray-300 px-4 py-3 pr-10 text-sm font-light tracking-wider text-gray-700 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
                style={{ minWidth: '160px' }}>
                {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="w-3 h-3 border-r border-b border-gray-400 transform rotate-45"></div>
            </div>
        </div>
        <div className="flex gap-3">
            {filterOptions.map((option) => (
                <button key={option} onClick={() => setActiveFilter(option)}
                    className={`px-6 py-3 text-sm cursor-pointer font-light tracking-wider border transition-all duration-300 ${
                        activeFilter === option ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'}`}>
                    {option.toUpperCase()}
                </button>
            ))}
        </div>
    </div>
);

const TimelineItem = ({ item, onReadMore, index, scrollY }: { 
    item: NewsEvent; onReadMore: (item: NewsEvent) => void; index: number; scrollY: number;
}) => {
    const { month, day, year } = formatDate(item.date) as { month: string; day: string; year: string };
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-16 border-b border-gray-200 last:border-b-0 group"
            style={{ transform: `translateY(${scrollY * 0.02 * (index + 1)}px)` }}>
            <div className="flex-shrink-0 text-center lg:text-left lg:w-32">
                <div className="text-sm font-light text-gray-600 mb-2 tracking-wider">{month}</div>
                <div className="text-5xl lg:text-6xl font-light text-gray-900 mb-2">{day}</div>
                <div className="text-lg font-light text-gray-600">{year}</div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-96 h-80 overflow-hidden">
                <img src={item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={item.title} className="w-full h-full object-cover  group-hover:-0 transition-all duration-300"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }} />
            </div>
            <div className="flex-1 min-w-0 h-80 flex flex-col">
                <div className="mb-4">
                    <span className="px-3 py-1 text-xs font-light tracking-wider bg-gray-100 text-gray-900 border border-gray-300">
                        {item.type.toUpperCase()}
                    </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 group-hover:text-black transition-colors leading-tight">
                    {item.title}
                </h3>
                {item.type === 'Event' && item.location && (
                    <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                        {item.location}
                    </div>
                )}
                <div className="flex-1 mb-6 overflow-hidden">
                    <p className="text-gray-700 leading-relaxed">
                        {item.description.substring(0, 280)}{item.description.length > 280 && '...'}
                    </p>
                </div>
                <div className="mt-auto">
                    <button onClick={() => onReadMore(item)} 
                        className="text-gray-900 cursor-pointer text-sm font-light tracking-wider hover:underline transition-colors">
                        READ MORE →
                    </button>
                </div>
            </div>
        </div>
    );
};

const Modal = ({ item, onClose }: { item: NewsEvent; onClose: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const fullDate = formatDate(item.date, true) as string;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="relative bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-6 cursor-pointer right-6 text-white hover:text-gray-700 z-10 text-2xl leading-none">×</button>
                {item.image && <img src={item.image} alt={item.title} className="w-full h-64 object-cover " />}
                <div className="p-8 md:p-12">
                    <span className="px-3 py-1 text-xs font-light tracking-wider bg-gray-100 text-gray-900 border border-gray-300 mb-6 inline-block">
                        {item.type.toUpperCase()}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">{item.title}</h2>
                    <div className="flex flex-col sm:flex-row gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border border-gray-400"></div>
                            {fullDate}
                        </div>
                        {item.type === 'Event' && item.location && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                                {item.location}
                            </div>
                        )}
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                        {item.description.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                    </div>
                    {item.tags.length > 0 && (
                        <div className="border-t border-gray-200 pt-8">
                            <h4 className="font-light text-gray-900 mb-4 text-sm tracking-wider">TAGS</h4>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs font-light tracking-wider bg-gray-100 text-gray-700 px-3 py-1 border border-gray-300">
                                        {tag.toUpperCase()}
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

const LoadingSkeleton = () => (
    <div className="space-y-16">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-16 border-b border-gray-200 animate-pulse">
                <div className="flex-shrink-0 text-center lg:text-left lg:w-32">
                    <div className="bg-gray-200 h-4 w-8 mb-2 mx-auto lg:mx-0"></div>
                    <div className="bg-gray-200 h-16 w-16 mb-2 mx-auto lg:mx-0"></div>
                    <div className="bg-gray-200 h-5 w-12 mx-auto lg:mx-0"></div>
                </div>
                <div className="flex-shrink-0 w-full lg:w-96 h-80 bg-gray-200"></div>
                <div className="flex-1 min-w-0">
                    <div className="bg-gray-200 h-6 w-16 mb-4"></div>
                    <div className="bg-gray-200 h-9 w-3/4 mb-4"></div>
                    <div className="space-y-2 mb-6">
                        <div className="bg-gray-200 h-4 w-full"></div>
                        <div className="bg-gray-200 h-4 w-full"></div>
                        <div className="bg-gray-200 h-4 w-2/3"></div>
                    </div>
                    <div className="bg-gray-200 h-4 w-24"></div>
                </div>
            </div>
        ))}
    </div>
);

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
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/news-events`);
                if (!response.ok) throw new Error('Data could not be fetched right now.');
                const data = await response.json();
                const publishedItems = (data.data.newsEvents || []).filter((item: NewsEvent) => item.status === 'Published');
                setItems(publishedItems);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredItems = useMemo(() => {
        let filtered = activeFilter === 'All' ? items : items.filter(item => item.type === activeFilter);
        return filtered.sort((a, b) => {
            switch (activeSort) {
                case 'oldest': return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                case 'alphabetical': return a.title.localeCompare(b.title);
                case 'newest':
                default: return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
            }
        });
    }, [items, activeFilter, activeSort]);

    return (
        <div className="min-h-screen bg-white">
            <title>Ceedee's | News-and-Events</title>
            
            <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
                    transform: `translateY(${scrollY * 0.3}px)`,
                    backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                }} />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">News & Events</h1>
                    <div className="w-24 h-px bg-white mx-auto mb-8"></div>
                    <p className="text-xl font-light mb-4">Stay Connected</p>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                        Latest updates and happenings from across the Ceedee Group portfolio of companies and industries.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <Controls activeFilter={activeFilter} setActiveFilter={setActiveFilter} activeSort={activeSort} setActiveSort={setActiveSort} />

                    {error && (
                        <div className="text-center mb-16">
                            <div className="border border-red-200 bg-red-50 p-8 max-w-md mx-auto">
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {loading ? <LoadingSkeleton /> : filteredItems.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center">
                                <div className="w-6 h-6 border border-gray-400"></div>
                            </div>
                            <h3 className="text-xl font-light text-gray-900 mb-2">
                                No {activeFilter !== 'All' && activeFilter.toLowerCase()}s Available
                            </h3>
                            <p className="text-gray-600">Please check back soon for new updates.</p>
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {filteredItems.map((item, index) => (
                                <TimelineItem key={item._id} item={item} onReadMore={setSelectedItem} index={index} scrollY={scrollY} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            
            {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
                <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Join Our Mission
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Partner with Ceedee Group in creating positive change and sustainable 
            development across communities and industries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/" 
              className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              EXPLORE COMPANIES
            </Link>
            <Link 
              to="/contact" 
              className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              CONTACT US
            </Link>
          </div>

          {/* <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Community Development</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Supporting local communities through education, healthcare, and sustainable initiatives
              </p>
            </div>
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Environmental Responsibility</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Committed to sustainable practices and environmental conservation across all operations
              </p>
            </div>
          </div> */}
        </div>
      </section>
        </div>
    );
};

export default NewsAndEvents;