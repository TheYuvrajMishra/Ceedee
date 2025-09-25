import { Menu, X, ChevronDown, Mail, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// DATA STRUCTURE WITH ICONS
const NAV_LINKS = [
  {
    label: 'Venbro Polymers',
    icon: '•',
    children: [
      { to: '/venbro-polymers', label: 'Overview' },
      { to: '/venbro-polymers/products', label: 'Products' },
    ],
  },
  {
    label: 'Shri Krishna Automobiles',
    icon: '•',
    children: [
      { to: '/shri-krishna-automobile-enterprises', label: 'Overview' },
      { to: '/shri-krishna-automobile-enterprises/services', label: 'Services' },
    ],
  },
  { to: '/csr', label: 'CSR Activities', icon: '•'},
  { to: '/news-and-events', label: 'News & Events', icon: '•'},
  { to: '/dot-philosophy', label: 'Dot Philosophy', icon: '•'},
  { to: '/careers', label: 'Careers', icon: '•'},
  { to: '/contact', label: 'Contact us', icon: '•'},
  { to: '/about', label: 'About', icon: '•'},
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu on route change
    if (isMenuOpen) {
      closeMenu();
    }
  }, [location.pathname]);

  // Cleanup body overflow style on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubMenu(null);
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubMenuToggle = (label:any) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const NavLink = ({ link, isSubLink = false }:any) => {
    const isActive = location.pathname === link.to;
    const activeClasses = 'bg-amber-50 text-amber-700';
    const baseClasses = 'flex items-center gap-4 w-full text-left rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors';
    const padding = isSubLink ? 'pl-12 pr-4 py-2.5' : 'px-4 py-3';

    return (
      <Link to={link.to} onClick={scrollToTop} className={`${baseClasses} ${padding} ${isActive ? activeClasses : ''}`}>
        {/* DEBUGGED: Renders the icon string inside a styled <span> */}
        {link.icon ? (
            <span className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${isActive ? 'text-amber-600' : 'text-gray-400'}`}>
                {link.icon}
            </span>
        ) : (
            <span className="w-5 h-5 flex-shrink-0" /> // Placeholder for alignment
        )}
        <span className="font-medium text-sm">{link.label}</span>
      </Link>
    );
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">
            {/* Left: Menu Button */}
            <div className="justify-self-start">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center: Logo */}
            <div className="justify-self-center -ml-4 md:justify-self-center">
              <Link to="/" onClick={scrollToTop} className={`flex md:opacity-100 items-center space-x-3 ${
                  isScrolled ? 'opacity-100' : 'opacity-0'
                }`}>
                <img src="/logo.png" alt="Company Logo" className="h-10 w-auto object-contain" />
                <img src="/logo_title.png" alt="Company Name" className="h-5 md:h-8 object-contain sm:block" />
              </Link>
            </div>

            {/* Right: Contact Button */}
            <div className="justify-self-end">
              <Link to="/contact" onClick={scrollToTop} className={`relative inline-flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 overflow-hidden group ${
                isScrolled ? 'border-amber-600 text-amber-600 hover:text-white' : 'border-white text-white hover:text-gray-900'
              } px-3 sm:px-4 py-2`}>
                <span className={`absolute inset-0 transition-transform duration-500 ease-out transform origin-left scale-x-0 group-hover:scale-x-100 ${
                  isScrolled ? 'bg-amber-600' : 'bg-white'
                }`} />
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Panel */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${ isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}>
        <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
        
        <div className={`relative left-0 top-0 h-full w-80 max-w-[85vw] bg-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
                <img src="/logo.png" alt="Company Logo" className="h-8 w-8 object-contain" />
                <span className="text-lg font-bold text-gray-800">VENBRO</span>
              </Link>
              <button onClick={closeMenu} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.children ? (
                      <>
                        <button onClick={() => handleSubMenuToggle(link.label)} className="flex items-center justify-between gap-4 w-full px-4 py-3 text-left rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <div className="flex items-center gap-4">
                            {link.icon}
                            <span className="font-medium text-sm">{link.label}</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubMenu === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubMenu === link.label ? 'max-h-96' : 'max-h-0'}`}>
                          <ul className="pt-1 space-y-1">
                            {link.children.map((child) => (
                              <li key={child.to}><NavLink link={child} isSubLink /></li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <NavLink link={link} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Panel Footer */}
            <div className="border-t p-4 bg-white">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Twitter /></a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Linkedin /></a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Instagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;