import { useState } from 'react';
import { Link } from "react-router";
import Sidebar from '../../Components/Admin/Sidebar';

// A simple hamburger menu icon component
const MenuIcon = () => (
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z" clipRule="evenodd"/>
    </svg>
);




const DashboardHome = () => {
  // State for managing sidebar visibility on mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Card data array for dashboard and sidebar navigation
  const dashboardCards = [
    {
      to: "/admin/careers",
      icon: "💼",
      title: "Manage Careers",
      description: "Add, edit, and manage job postings",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      to: "/admin/csr",
      icon: "🌱",
      title: "CSR Projects",
      description: "Manage corporate social responsibility initiatives",
      bgColor: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      to: "/admin/news-events",
      icon: "📰",
      title: "News & Events",
      description: "Create and manage news articles and events",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800"
    },
    {
      to: "/admin/queries",
      icon: "💬",
      title: "Client Queries",
      description: "View and respond to inquiries",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
        navLinks={dashboardCards} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-md md:justify-end">
          {/* Mobile Menu Button */}
          <button 
            className="text-slate-700 md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>
          
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/admin/login';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Link 
                  key={index} 
                  to={card.to} 
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col items-start"
                >
                  <div className={`p-3 rounded-full ${card.bgColor} mb-4`}>
                    <div className="text-3xl">{card.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
       {/* Overlay for mobile when sidebar is open */}
       {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardHome;


