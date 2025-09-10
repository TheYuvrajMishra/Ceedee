import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminCareer from "./AdminCareer";
import AdminCSR from "./CSRPage";
import NewsEvent from "./News&Event";
import ClientQuery from "./ClientQuery";
import DashboardHome from "./DashboardHome";
// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication - only check for token
    const token = localStorage.getItem("token");

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
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/careers" element={<AdminCareer />} />
        <Route path="/csr" element={<AdminCSR />} />
        <Route path="/news-events" element={<NewsEvent />} />
        <Route path="/queries" element={<ClientQuery />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;
