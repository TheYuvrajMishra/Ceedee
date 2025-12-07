import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowDown, Menu } from 'lucide-react';

import Sidebar from '../../components/Admin/Sidebar';

// Types
interface DashboardCard {
  to: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

// Constants
const DASHBOARD_CARDS: DashboardCard[] = [
  {
    to: '/admin/careers',
    icon: '💼',
    title: 'Manage Careers',
    description: 'Add, edit, and manage job postings',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  {
    to: '/admin/csr',
    icon: '🌱',
    title: 'CSR Projects',
    description: 'Manage corporate social responsibility initiatives',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  {
    to: '/admin/news-events',
    icon: '📰',
    title: 'News & Events',
    description: 'Create and manage news articles and events',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  {
    to: '/admin/queries',
    icon: '💬',
    title: 'Client Queries',
    description: 'View and respond to inquiries',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  }
];

// Subcomponents

const DashboardCard: React.FC<{ card: DashboardCard; index: number }> = ({ card }) => (
  <Link
    to={card.to}
    className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 hover:border-blue-200"
    aria-label={`Navigate to ${card.title}`}
  >
    <div className={`inline-flex p-3 rounded-lg ${card.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
      <span className="text-2xl" role="img" aria-hidden="true">
        {card.icon}
      </span>
    </div>
    
    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
      {card.title}
    </h3>
    
    <p className="text-sm text-slate-600 leading-relaxed">
      {card.description}
    </p>
  </Link>
);

const MobileHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
  <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-100 md:justify-end">
    <button
      onClick={onMenuClick}
      className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
      aria-label="Toggle sidebar"
      type="button"
    >
      <Menu className="h-6 w-6" />
    </button>
  </header>
);

const MobileOverlay: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ 
  isVisible, 
  onClose 
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

// Main Component
const DashboardHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = (): void => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSidebarClose = (): void => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <title>Ceedee's | Dashboard</title>
      <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bg-blue-400 text-white p-4 hover:-rotate-135 transition-all ease duration-250 rounded-full bottom-10 right-10 cursor-pointer -rotate-110"
        >
          <ArrowDown />
        </a>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          navLinks={DASHBOARD_CARDS}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <MobileHeader onMenuClick={handleSidebarToggle} />

          {/* Page Content */}
          <main className="flex-1 p-6" role="main">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600">
                  Manage your website content and monitor activities
                </p>
              </header>

              {/* Dashboard Grid */}
              <section aria-label="Dashboard navigation">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DASHBOARD_CARDS.map((card, index) => (
                    <DashboardCard key={card.to} card={card} index={index} />
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        <MobileOverlay 
          isVisible={isSidebarOpen} 
          onClose={handleSidebarClose} 
        />
      </div>
    </>
  );
};

export default DashboardHome;
