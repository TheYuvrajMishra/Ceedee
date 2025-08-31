import { useState, useEffect } from 'react';
import axios from 'axios';

type Query = {
    _id: string;
    name: string;
    email: string;
    message: string;
};

const AdminClientQueryViewer = () => {
    const [queries, setQueries] = useState<Query[]>([]);

    useEffect(() => {
        const fetchQueries = async () => {
            const response = await axios.get('/api/queries', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setQueries(response.data);
        };
        fetchQueries();
    }, []);

    return (
        <div>
            <h2>Client Queries</h2>
            <ul>
                {queries.map(query => (
                    <li key={query._id}>
                        <p>Name: {query.name}</p>
                        <p>Email: {query.email}</p>
                        <p>Message: {query.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminClientQueryViewer;
