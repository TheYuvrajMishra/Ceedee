import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/csr', label: 'CSR Activities' },
  { to: '/news-and-events', label: 'News & Events' },
  { to: '/venbro-polymers', label: 'Venbro Polymers' },
  { to: '/venbro-polymers/products', label: 'Products' },
  { to: '/shri-krishna-automobile-enterprises', label: 'Shri Krishna Automobiles' },
  { to: '/shri-krishna-automobile-enterprises/services', label: 'Services' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`p-2 transition-colors ${
                isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <img
                src="/logo_title.png"
                alt="Company Name"
                className="h-8 object-contain"
              />
            </Link>

            {/* Contact Button */}
            <Link
              to="/contact"
              onClick={scrollToTop}
              className={`relative px-4 py-2 border-2 transition-all duration-500 overflow-hidden group ${
                isScrolled
                  ? 'border-amber-600 text-amber-600 hover:text-white'
                  : 'border-white text-white hover:text-gray-900'
              }`}
            >
              <span
                className={`absolute inset-0 transition-transform duration-500 ease-out transform origin-left scale-x-0 group-hover:scale-x-100 ${
                  isScrolled ? 'bg-amber-600' : 'bg-white'
                }`}
              />
              <span className="relative z-10">
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-6">
                <ul className="space-y-2 px-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => {
                          closeMenu();
                          scrollToTop();
                        }}
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="border-t p-4">
                <Link
                  to="/contact"
                  onClick={() => {
                    closeMenu();
                    scrollToTop();
                  }}
                  className="block w-full px-4 py-3 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;