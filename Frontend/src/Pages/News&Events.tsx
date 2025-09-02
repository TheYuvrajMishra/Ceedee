import { useState, useEffect } from 'react';

interface NewsItem {
    _id: string;
    title: string;
    content: string;
}

const NewsAndEvents = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/news');
                if (!response.ok) throw new Error('Data could not be fetched.');
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="container mx-auto p-8 font-sans">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">News and Events</h2>
            {error && <p className="text-center text-red-500">{error}</p>}
            <ul className="space-y-6">
                {news.map(item => (
                    <li key={item._id} className="p-6 bg-white rounded-lg shadow-md transition hover:shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-2">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsAndEvents;