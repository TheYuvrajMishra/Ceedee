import { Menu, X, ChevronDown, Mail, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  {
    label: 'VENBRO POLYMERS',
    children: [
      { to: '/venbro-polymers', label: 'Overview' },
      { to: '/venbro-polymers/products', label: 'Products' },
    ],
  },
  {
    label: 'SHRI KRISHNA AUTOMOBILES',
    children: [
      { to: '/shri-krishna-automobile-enterprises', label: 'Overview' },
      { to: '/shri-krishna-automobile-enterprises/services', label: 'Services' },
    ],
  },
  { to: '/csr', label: 'CSR' },
  { to: '/news-and-events', label: 'NEWS & EVENTS' },
  { to: '/careers', label: 'CAREERS' },
  { to: '/about', label: 'ABOUT' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // --- HOOKS ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto' };
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // --- HANDLERS ---
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const isHome = location.pathname === '/';
  const isNotHomeEfx = isHome ? "md:bg-transparent" : "md:bg-white/95";

  const headerClasses = isScrolled
    ? 'bg-white/95 backdrop-blur-lg shadow-sm'
    : `${isNotHomeEfx} bg-white/95`;

  // --- RENDER ---
  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200/50 hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Left: Logo with Tagline */}
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">CD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-slate-800">CEEDEE'S GROUP</span>
                <span className="text-[10px] text-slate-500 tracking-wider">EST. 1984 • GLOBAL</span>
              </div>
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group">
                  {link.children ? (
                    <>
                      <button className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200 tracking-wide">
                        <span>{link.label}</span>
                        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 -translate-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={scrollToTop}
                            className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.to || '#'}
                      onClick={scrollToTop}
                      className={`px-4 py-2 text-xs font-medium transition-colors duration-200 tracking-wide ${location.pathname === link.to ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Theme Toggle + Contact + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden lg:flex p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-slate-600" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* Contact Button */}
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="hidden lg:block px-6 py-2 text-xs font-semibold tracking-wide text-white bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              >
                CONTACT
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />

        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CD</span>
                </div>
                <span className="text-sm font-bold text-slate-800">CEEDEE'S GROUP</span>
              </Link>
              <button onClick={closeMenu} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto px-2">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <MobileNavItem key={link.label} item={link} onNavigate={closeMenu} />
                ))}
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="border-t p-4">
              <Link
                to="/contact"
                onClick={() => { scrollToTop(); closeMenu(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for mobile navigation items
const MobileNavItem = ({ item, onNavigate }: { item: any; onNavigate: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (item.children) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2.5 text-left text-slate-700 hover:bg-slate-50 rounded transition-colors"
        >
          <span className="text-xs font-semibold tracking-wide">{item.label}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <ul className="pt-1 pl-4 space-y-1">
            {item.children.map((child: any) => (
              <li key={child.to}>
                <Link
                  to={child.to}
                  onClick={onNavigate}
                  className={`block px-3 py-2 text-xs rounded transition-colors ${location.pathname === child.to
                    ? 'text-amber-600 font-semibold bg-amber-50'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={item.to}
        onClick={onNavigate}
        className={`block px-3 py-2.5 text-xs font-semibold tracking-wide rounded transition-colors ${location.pathname === item.to
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-700 hover:bg-slate-50'
          }`}
      >
        {item.label}
      </Link>
    </li>
  );
};

export default Header;