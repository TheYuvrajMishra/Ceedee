import { useState, useEffect } from 'react';
import axios from 'axios';

type Csr = {
    _id: string;
    title: string;
    description: string;
};

const CSR = () => {
    const [csrs, setCsrs] = useState<Csr[]>([]);

    useEffect(() => {
        const fetchCsrs = async () => {
            const response = await axios.get('/api/csr');
            setCsrs(response.data);
        };
        fetchCsrs();
    }, []);

    return (
        <div>
            <h2>CSR</h2>
            <ul>
                {csrs.map(csr => (
                    <li key={csr._id}>
                        <h3>{csr.title}</h3>
                        <p>{csr.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CSR;
