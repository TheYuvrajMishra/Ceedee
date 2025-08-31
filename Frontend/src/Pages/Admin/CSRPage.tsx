import  { useState, useEffect } from 'react';
import axios from 'axios';

type CSR = {
    _id: string;
    title: string;
    description: string;
};

const AdminCSR = () => {
    const [csrs, setCsrs] = useState<CSR[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCsrs = async () => {
            const response = await axios.get('/api/csr');
            setCsrs(response.data);
        };
        fetchCsrs();
    }, []);

    const addCsr = async (e:any) => {
        e.preventDefault();
        await axios.post('/api/csr', { title, description }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh CSRs
    };

    const deleteCsr = async (id:any) => {
        await axios.delete(`/api/csr/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh CSRs
    };

    return (
        <div>
            <h2>Admin CSR</h2>
            <form onSubmit={addCsr}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit">Add CSR</button>
            </form>
            <ul>
                {csrs.map(csr => (
                    <li key={csr._id}>
                        {csr.title} <button onClick={() => deleteCsr(csr._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCSR;
