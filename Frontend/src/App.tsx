import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Career from './Pages/Career';
import ContactForm from './Pages/ContactForm';
import CSR from './Pages/CSR';
import NewsAndEvents from './Pages/News&Events';
import MainPage from './Pages/Main/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route path="/" element={<><Navbar /><MainPage /></>} />
        <Route path="/career" element={<><Navbar /><Career /></>} />
        <Route path="/contact" element={<><Navbar /><ContactForm /></>} />
        <Route path="/csr" element={<><Navbar /><CSR /></>} />
        <Route path="/news-and-events" element={<><Navbar /><NewsAndEvents /></>} />

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
