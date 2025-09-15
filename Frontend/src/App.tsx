import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Career from './Pages/Career';
import ContactForm from './Pages/ContactForm';
import CSR from './Pages/CSR';
import NewsAndEvents from './Pages/News&Events';
import MainPage from './Pages/Main/MainPage';
import Venbro from './Pages/Venbro Polymer/Venbro';
import Footer from './Components/Footer';
import SKAELanding from './Pages/Shri Krishnan/ShriKrishna';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route path="/" element={<><Navbar /><MainPage /><Footer/></>} />
        <Route path="/careers" element={<><Navbar /><Career /><Footer/></>} />
        <Route path="/contact" element={<><Navbar /><ContactForm /><Footer/></>} />
        <Route path="/csr" element={<><Navbar /><CSR /><Footer/></>} />
        <Route path="/news-and-events" element={<><Navbar /><NewsAndEvents /><Footer/></>} />
        <Route path="/venbro" element={<><Navbar /><Venbro/><Footer/></>} />
        <Route path="/Shrikrishna" element={<><Navbar /><SKAELanding/><Footer/></>} />
        {/* Admin Login Route (no navbar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes (handles all admin pages internally) */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<><Navbar /><div className="text-center p-10"><h2>404 Not Found</h2></div></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
