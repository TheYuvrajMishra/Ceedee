import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminCareer from './AdminCareer';
import AdminCSR from './CSRPage';
import NewsEvent from './News&Event';
import ClientQuery from './ClientQuery';

// Simple Dashboard Home Component
const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/admin/login';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/careers" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow block">
            <div className="text-4xl mb-4">💼</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">Manage Careers</div>
            <div className="text-sm text-gray-600">Add, edit, and manage job postings</div>
          </Link>
          
          <Link to="/admin/csr" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow block">
            <div className="text-4xl mb-4">🌱</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">CSR Projects</div>
            <div className="text-sm text-gray-600">Manage corporate social responsibility initiatives</div>
          </Link>
          
          <Link to="/admin/news-events" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow block">
            <div className="text-4xl mb-4">📰</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">News & Events</div>
            <div className="text-sm text-gray-600">Create and manage news articles and events</div>
          </Link>
          
          <Link to="/admin/queries" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow block">
            <div className="text-4xl mb-4">💬</div>
            <div className="text-lg font-semibold text-gray-800 mb-2">Client Queries</div>
            <div className="text-sm text-gray-600">View and respond to inquiries</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication - only check for token
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/careers" element={<AdminCareer />} />
      <Route path="/csr" element={<AdminCSR />} />
      <Route path="/news-events" element={<NewsEvent />} />
      <Route path="/queries" element={<ClientQuery />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminDashboard;
