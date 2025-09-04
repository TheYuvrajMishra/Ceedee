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
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 -py-1">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
            <img src="/logo_base.png" alt="Company Logo Base" />
          </div>
          <img src="/logo_title.png" alt="Company Name" className="w-30" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={clsx(
                'transition-colors duration-300 relative group',
                {
                  'text-slate-700 hover:text-amber-600': isScrolled,
                  'text-white hover:text-amber-300': !isScrolled,
                }
              )}
            >
              {link.label}
              <span
                className={clsx(
                  'absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full'
                )}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            to="/contact"
            className="hidden sm:inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-100 shadow-lg hover:shadow-amber-500/30"
          >
            Contact Us
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
              'md:hidden p-2 rounded-lg transition-colors duration-300',
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

      <div
        className={clsx(
          'md:hidden overflow-hidden transition-all duration-500 ease-in-out',
          {
            'max-h-96 opacity-100 mt-4': isMenuOpen,
            'max-h-0 opacity-0': !isMenuOpen,
          }
        )}
      >
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white hover:text-amber-300 py-2 px-4 rounded-lg hover:bg-white/5 transition-all duration-300 text-center text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 mt-2">
              <Link
                to="/contact"
                className="bg-transparent border border-amber-700 text-white font-semibold py-3 px-6 rounded-xl w-full text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;