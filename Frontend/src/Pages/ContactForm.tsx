import { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await axios.post('/api/queries', { name, email, message });
        setSuccess(true);
    };

    return (
        <div>
            <h2>Contact Us</h2>
            {success ? <p>Thank you for your message!</p> : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
