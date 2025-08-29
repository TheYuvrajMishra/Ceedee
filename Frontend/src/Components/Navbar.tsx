import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const navLinks = [
    'About Us',
    'Career',
    'News & Events',
    'Venbro Polymers',
    'Sri Krishna Automobiles'
  ];

  const aboutSubLinks = [
    'Dot Philosophy',
    'Business Practices',
    'CSR Activities'
  ];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Show navbar after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsAboutDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // Add a delay to prevent flickering when moving between elements
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAboutDropdownOpen(false);
    }, 150);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] max-w-7xl">
      {/* Main navbar container */}
      <div className={`px-6 py-4 relative overflow-visible rounded-4xl transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-100' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between relative z-10">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="CD Group Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className={`tasa text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-orange-600' : 'text-orange-600'
            }`}>
              CD Group
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link === 'About Us' ? (
                  <div
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href="#"
                      className={`tasa font-replica font-bold text-sm transition-all duration-300 relative group pb-1 flex items-center gap-1 ${
                        isScrolled 
                          ? 'text-black hover:text-gray-700' 
                          : 'text-white hover:text-gray-200'
                      }`}
                    >
                      {link}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? 'bg-black' : 'bg-white'
                      }`}></span>
                    </a>
                  </div>
                ) : (
                  <a
                    href="#"
                    className={`tasa font-replica font-bold text-sm transition-all duration-300 relative group pb-1 flex items-center ${
                      isScrolled 
                        ? 'text-black hover:text-gray-700' 
                        : 'text-white hover:text-gray-200'
                    }`}
                  >
                    {link}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-black' : 'bg-white'
                    }`}></span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 bg-black border-2 border-black hover:bg-gray-800 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-yellow-400" />
            ) : (
              <Menu className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t-2 border-black relative z-10">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link === 'About Us' ? (
                    <div>
                      <button
                        onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                        className="text-black font-bold text-sm hover:text-gray-700 transition-all duration-300 py-2 px-3 hover:bg-black/10 w-full text-left flex items-center justify-between"
                      >
                        {link}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isAboutDropdownOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {aboutSubLinks.map((subLink, subIndex) => (
                            <a
                              key={subIndex}
                              href="#"
                              className="text-gray-600 font-medium text-sm hover:text-black transition-all duration-300 py-2 px-3 hover:bg-black/10 block"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subLink}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href="#"
                      className="text-black font-bold text-sm hover:text-gray-700 transition-all duration-300 py-2 px-3 hover:bg-black/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Dropdown Menu - positioned outside navbar container */}
      {isAboutDropdownOpen && (
        <div className="relative">
          <div 
            className="absolute top-full left-0 right-0 bg-neutral-100 rounded-4xl shadow-lg z-40"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="relative z-10 px-6 py-4">
              <div className="grid grid-cols-3 gap-6">
                {aboutSubLinks.map((subLink, subIndex) => (
                  <a
                    key={subIndex}
                    href="#"
                    className="tasa text-black font-replica font-bold text-sm hover:text-gray-700 transition-all duration-300 py-3 px-4 hover:bg-black/10 rounded-lg block text-center"
                  >
                    {subLink}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Floating effect shadow for dropdown */}
          <div className="absolute top-full left-0 right-0 bg-black blur-sm -z-10 transform translate-y-1 rounded-4xl"></div>
        </div>
      )}

      {/* Floating effect shadow - only when scrolled */}
      {/* {isScrolled && (
        <div className="absolute inset-0 bg-black blur-sm -z-10 transform translate-y-1 rounded-4xl"></div>
      )} */}
    </nav>
  );
};

export default FloatingNavbar;