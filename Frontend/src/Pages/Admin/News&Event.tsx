import { useState, useEffect } from 'react';
import axios from 'axios';

type NewsItem = {
    _id: string;
    title: string;
    content: string;
};

const AdminNewsAndEvents = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get('/api/news');
            setNews(response.data);
        };
        fetchNews();
    }, []);

    const addNews = async (e:any) => {
        e.preventDefault();
        await axios.post('/api/news', { title, content }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh news
    };

    const deleteNews = async (id:any) => {
        await axios.delete(`/api/news/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh news
    };

    return (
        <div>
            <h2>Admin News and Events</h2>
            <form onSubmit={addNews}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit">Add News</button>
            </form>
            <ul>
                {news.map(item => (
                    <li key={item._id}>
                        {item.title} <button onClick={() => deleteNews(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminNewsAndEvents;
