import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminCareer from './Pages/Admin/AdminCareer';
import AdminClientQueryViewer from './Pages/Admin/ClientQuery';
import AdminCSR from './Pages/Admin/CSRPage';
import AdminNewsAndEvents from './Pages/Admin/News&Event';
import Career from './Pages/Career';
import ContactForm from './Pages/ContactForm';
import CSR from './Pages/CSR';
import NewsAndEvents from './Pages/News&Events';
import MainPage from './Pages/Main/MainPage';

// A Private Route component to protect admin pages
const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  // Simple token check for authentication
  // In a real app, you'd have a more robust auth system (e.g., using Context API or Redux)
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPage/>} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/csr" element={<CSR />} />
        <Route path="/news-and-events" element={<NewsAndEvents />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/career"
          element={
            <PrivateRoute>
              <AdminCareer />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/queries"
          element={
            <PrivateRoute>
              <AdminClientQueryViewer />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/csr"
          element={
            <PrivateRoute>
              <AdminCSR />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news-and-events"
          element={
            <PrivateRoute>
              <AdminNewsAndEvents />
            </PrivateRoute>
          }
        />
        
        {/* Optional: A catch-all route for 404 Not Found */}
        <Route path="*" element={<div><h2>404 Not Found</h2></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
