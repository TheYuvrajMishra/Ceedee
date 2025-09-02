import { useState, useEffect } from 'react';

// Full type definition to match the data structure
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

const NewsAndEvents = () => {
    const [items, setItems] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNewsAndEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/news-events');
                if (!response.ok) throw new Error('Data could not be fetched at this moment.');
                const data: NewsEvent[] = await response.json();
                // Filter for only published items before setting state
                const publishedItems = data.filter(item => item.status === 'Published');
                setItems(publishedItems);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchNewsAndEvents();
    }, []);

    // Helper to format dates for better readability
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    
    // Icon component for calendar
    const CalendarIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );

    // Icon component for location pin
    const PinIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );


    return (
        <div className="container mx-auto p-6 md:p-8 font-sans bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">News & Events</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Stay updated with our latest announcements and upcoming events.</p>

            {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

            {loading ? (
                <p className="text-center text-gray-500 text-xl">Loading...</p>
            ) : items.length === 0 ? (
                <p className="text-center text-gray-600 text-xl mt-8">No news or events to display at the moment. Please check back soon!</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map(item => (
                        <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition hover:transform hover:-translate-y-1">
                            {item.image && (
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-48 object-cover" 
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found'; }}
                                />
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.type === 'Event' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {item.type}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      <CalendarIcon />
                                      {formatDate(item.date)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex-grow">{item.title}</h3>
                                {item.type === 'Event' && item.location && (
                                    <p className="text-sm text-gray-600 mb-3 flex items-center">
                                      <PinIcon />
                                      {item.location}
                                    </p>
                                )}
                                <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
                                
                                <div className="mt-auto pt-4 border-t border-gray-200">
                                  {item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                  )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsAndEvents;
