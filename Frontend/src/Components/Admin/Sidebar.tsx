import React from 'react';
import { Link } from 'react-router';
import { X, LogOut } from 'lucide-react';

// Types
interface NavLink {
  to: string;
  icon: string;
  title: string;
  description?: string;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navLinks: NavLink[];
}

// Constants
const SIDEBAR_CONFIG = {
  width: 'w-64',
  zIndex: {
    sidebar: 'z-30',
    overlay: 'z-20'
  },
  animations: {
    sidebar: 'transition-transform duration-300 ease-out',
    overlay: 'transition-opacity duration-300'
  }
} as const;

// Subcomponents
const SidebarHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">A</span>
      </div>
      <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
    </div>
    
    <button
      onClick={onClose}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Close sidebar"
      type="button"
    >
      <X className="w-4 h-4 text-gray-500" />
    </button>
  </div>
);

const NavigationLink: React.FC<{ 
  link: NavLink; 
  onLinkClick: () => void;
}> = ({ link, onLinkClick }) => (
  <li>
    <Link
      to={link.to}
      onClick={onLinkClick}
      className="group flex items-center px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Navigate to ${link.title}`}
    >
      <span 
        className="text-lg mr-3 text-gray-500 group-hover:text-blue-600 transition-colors duration-150" 
        role="img" 
        aria-hidden="true"
      >
        {link.icon}
      </span>
      <span className="font-medium">{link.title}</span>
    </Link>
  </li>
);

const NavigationMenu: React.FC<{ 
  navLinks: NavLink[]; 
  onLinkClick: () => void;
}> = ({ navLinks, onLinkClick }) => (
  <nav className="flex-1 px-4 py-6 overflow-y-auto" role="navigation" aria-label="Sidebar navigation">
    <div className="space-y-8">
      <div>
        <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Management
        </h2>
        <ul className="space-y-1">
          {navLinks.map((link, index) => (
            <NavigationLink 
              key={link.to || index} 
              link={link} 
              onLinkClick={onLinkClick}
            />
          ))}
        </ul>
      </div>
    </div>
  </nav>
);

const LogoutButton: React.FC = () => {
  const handleLogout = (): void => {
    try {
      // Clear authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Redirect to login page
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback redirect
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150"
        type="button"
        aria-label="Logout from admin panel"
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

const MobileOverlay: React.FC<{ 
  isVisible: boolean; 
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/30 ${SIDEBAR_CONFIG.zIndex.overlay} md:hidden ${SIDEBAR_CONFIG.animations.overlay}`}
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

// Main Component
const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  navLinks = [] 
}) => {
  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleLinkClick = (): void => {
    // Close sidebar on mobile when a link is clicked
    setIsOpen(false);
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 
    ${SIDEBAR_CONFIG.width} 
    bg-white border-r border-gray-200 
    transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    ${SIDEBAR_CONFIG.animations.sidebar}
    ${SIDEBAR_CONFIG.zIndex.sidebar}
    md:relative md:translate-x-0
    flex flex-col
  `.trim().replace(/\s+/g, ' ');

  return (
    <>
      {/* Mobile Overlay */}
      <MobileOverlay isVisible={isOpen} onClose={handleClose} />
      
      {/* Sidebar */}
      <aside className={sidebarClasses} role="complementary" aria-label="Admin sidebar">
        {/* Header */}
        <SidebarHeader onClose={handleClose} />

        {/* Navigation */}
        <NavigationMenu navLinks={navLinks} onLinkClick={handleLinkClick} />

        {/* Logout Button */}
        <LogoutButton />
      </aside>
    </>
  );
};

export default Sidebar;
