import { useState, useEffect } from 'react';
import axios from 'axios';

type Job = {
    _id: string;
    title: string;
    description: string;
};

const Career = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get('/api/careers');
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Careers</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Career;
