import { Menu, X } from 'lucide-react';
import { useState, useEffect, type FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

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
                sm:inline-block noto-sans-medium py-3 px-6 rounded-xl
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

      {/* Portal-based overlay and sidebar */}
      {isMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Blur Background Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px) saturate(110%)',
              WebkitBackdropFilter: 'blur(10px) saturate(110%)',
              zIndex: 100,
              transition: 'all 300ms ease-in-out',
              pointerEvents: 'auto',
              isolation: 'isolate'
            }}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Side Navigation Panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '320px',
              height: '100vh',
              backgroundColor: '#1e293b',
              zIndex: 105,
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 300ms ease-in-out',
              pointerEvents: 'auto'
            }}
          >
            {/* Navigation Content */}
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#1e293b'
              }}
            >
              {/* Close Button */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  backgroundColor: '#1e293b'
                }}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'background-color 300ms ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#475569';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '0 24px',
                  backgroundColor: '#1e293b'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '500',
                        backgroundColor: 'transparent',
                        transition: 'all 300ms ease',
                        border: 'none',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.color = '#93c5fd';
                        (e.target as HTMLAnchorElement).style.backgroundColor = '#475569';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.color = 'white';
                        (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;