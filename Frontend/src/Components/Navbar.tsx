import { Menu, X, ChevronDown, Mail, Twitter, Linkedin, Instagram, Building2, Car, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Updated data structure with meaningful Lucide icons
const NAV_LINKS = [
  {
    label: 'Venbro Polymers',
    children: [
      { to: '/venbro-polymers', label: 'Overview', icon: <Target className="w-4 h-4" /> },
      { to: '/venbro-polymers/products', label: 'Products', icon: <Building2 className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Shri Krishna Automobiles',
    children: [
      { to: '/shri-krishna-automobile-enterprises', label: 'Overview', icon: <Target className="w-4 h-4" /> },
      { to: '/shri-krishna-automobile-enterprises/services', label: 'Services', icon: <Car className="w-4 h-4" /> },
    ],
  },
  { to: '/csr', label: 'CSR' },
  { to: '/news-and-events', label: 'News & Events' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // --- HOOKS ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  // --- STYLES ---
  const headerClasses = isScrolled
    ? 'bg-white/95 backdrop-blur-lg shadow-sm'
    : 'bg-transparent';
  const textClasses = isScrolled ? 'text-slate-800' : 'text-white';
  const logoFilter = isScrolled ? '' : 'brightness-0 invert';

  // --- RENDER ---
  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
                <img src="/logo.png" alt="Company Logo" className="h-10 w-auto" />
                <img src="/logo_title.png" alt="Company Name" className={`h-6 w-auto transition-all duration-300 ${logoFilter}`} />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group">
                  {link.children ? (
                    <>
                      <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${textClasses} hover:bg-black/5`}>
                        <span>{link.label}</span>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={scrollToTop}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.to || '#'}
                      onClick={scrollToTop}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${textClasses} hover:bg-black/5 ${location.pathname === link.to ? (isScrolled ? 'bg-slate-100' : 'bg-white/10') : ''}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: CTA & Mobile Toggle */}
            <div className="flex items-center gap-2">
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

              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-full transition-colors duration-300 ${textClasses} hover:bg-black/10`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed inset-0 z-90 transition-opacity duration-300 lg:hidden ${ isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' }`}>
        <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
        
        <div className={`relative -right-14 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Link to="/" onClick={scrollToTop} className="flex items-center gap-2">
                <img src="/logo.png" alt="Company Logo" className="h-8 w-8" />
                <span className="text-lg font-bold text-slate-800">CD Group</span>
              </Link>
              <button onClick={()=>{setIsMenuOpen(false)}}><X/></button>
              
            </div>

            <nav className="flex-1 py-4 overflow-y-auto px-2">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <MobileNavItem key={link.label} item={link} />
                ))}
              </ul>
            </nav>

            <div className="border-t p-4">
                <Link to="/contact" onClick={scrollToTop} className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Contact Us</span>
                </Link>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-slate-400 hover:text-slate-600"><Twitter /></a>
                  <a href="#" className="text-slate-400 hover:text-slate-600"><Linkedin /></a>
                  <a href="#" className="text-slate-400 hover:text-slate-600"><Instagram /></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for mobile navigation items
const MobileNavItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (item.children) {
    return (
      <li>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-3 py-2.5 text-left rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">
          <span className="font-semibold text-sm">{item.label}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <ul className="pt-1 pl-4">
            {item.children.map((child:any) => (
              <li key={child.to}>
                 <Link to={child.to} className={`flex items-center gap-3 w-full pl-3 pr-2 py-2.5 text-left text-sm rounded-lg transition-colors ${location.pathname === child.to ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                    <span>{child.label}</span>
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
      <Link to={item.to} className={`flex items-center w-full px-3 py-2.5 text-left rounded-lg transition-colors text-sm font-semibold ${location.pathname === item.to ? 'bg-slate-100 text-blue-600' : 'text-slate-700 hover:bg-slate-100'}`}>
        {item.label}
      </Link>
    </li>
  );
};

export default Header;