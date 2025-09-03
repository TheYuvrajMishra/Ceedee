import { Menu, X } from 'lucide-react';
import { useState, useEffect, type FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/careers', label: 'Careers' },
];

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out p-4 md:py-3',
        {
          'bg-white/90 backdrop-blur-lg shadow-md': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="container mx-auto flex items-center">
        {/* Hamburger Menu - Left Side with consistent positioning */}
        <div className="flex-1">
          <div className="ml-6 sm:ml-8 md:ml-10 lg:ml-12">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'p-2 rounded-lg transition-colors duration-300',
                {
                  'text-slate-800 hover:bg-slate-200/50': isScrolled,
                  'text-white hover:bg-white/10': !isScrolled,
                }
              )}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Logo - Center */}
        <Link to="/" className="flex items-center space-x-4 -py-1 absolute left-1/2 transform -translate-x-1/2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="Company Logo Base" />
          </div>
          <img src="/logo_title.png" alt="Company Name" className="w-30" />
        </Link>

        {/* Contact Button */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="mr-6 sm:mr-8 md:mr-10 lg:mr-12">
            <Link
              to="/contact"
              className="
                sm:inline-block fira-sans-black py-3 px-6 rounded-xl shadow-lg 
                relative overflow-hidden 
                border-2 border-amber-600 text-amber-600                 
                transition-all duration-600
                before:absolute before:inset-0 before:-z-10
                before:bg-amber-600
                before:w-0 before:transition-[width]
                hover:text-white hover:before:w-full"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Blur Background Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300',
          {
            'opacity-100 pointer-events-auto': isMenuOpen,
            'opacity-0 pointer-events-none': !isMenuOpen,
          }
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Navigation */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full w-1/4 min-w-[280px] bg-slate-900/95 backdrop-blur-xl z-50 transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': isMenuOpen,
            '-translate-x-full': !isMenuOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links - Centered */}
          <nav className="flex-1 flex flex-col justify-center px-6">
            <div className="space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-300 text-center text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;