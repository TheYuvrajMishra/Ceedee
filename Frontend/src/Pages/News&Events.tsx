import { useState, useEffect } from 'react';
import axios from 'axios';

interface NewsItem {
    _id: string;
    title: string;
    content: string;
}

const NewsAndEvents = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get('/api/news');
            setNews(response.data);
        };
        fetchNews();
    }, []);

    return (
        <div>
            <h2>News and Events</h2>
            <ul>
                {news.map(item => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsAndEvents;
