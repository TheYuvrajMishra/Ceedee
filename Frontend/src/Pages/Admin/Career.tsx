import { useState, useEffect } from 'react';
import axios from 'axios';

type Job = {
    _id: string;
    title: string;
    description: string;
};

const AdminCareer = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get('/api/careers');
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    const addJob = async (e:any) => {
        e.preventDefault();
        await axios.post('/api/careers', { title, description }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh jobs
    };

    const deleteJob = async (id:any) => {
        await axios.delete(`/api/careers/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        // Refresh jobs
    };

    return (
        <div>
            <h2>Admin Career</h2>
            <form onSubmit={addJob}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit">Add Job</button>
            </form>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        {job.title} <button onClick={() => deleteJob(job._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCareer;
