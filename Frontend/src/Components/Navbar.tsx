import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    'Home',
    'About Us',
    'Philosophy',
    'Business Practises',
    'CSR Activities',
    'News & Events', 
    'Careers'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300"
        style={{ 
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          padding: '16px clamp(16px, 5vw, 80px)',
          height: 'clamp(60px, 10vw, 80px)'
        }}
      >
        {/* Menu Icon - Left */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-400 transition-colors duration-300"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo - Absolutely Centered within navbar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img 
            src="/logo.png" 
            alt="Ceedee's Group Logo" 
            className="h-8 w-auto sm:h-10 md:h-12"
          />
        </div>

        {/* Spacer to push contact button to right */}
        <div className="flex-1"></div>

        {/* CTA Contact Button - Right */}
        <div className="flex items-center">
          <button 
            className="text-white noto-sans-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base"
            onClick={() => window.location.href = '#contact'}
            style={{
              // backgroundColor: '#ea5e21',
              border: '2px solid #ea5e21',
              borderColor: '#ea5e21',
              letterSpacing: '1px',
              fontSize: 'clamp(12px, 2.5vw, 16px)',
              fontWeight: '700',
              padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 32px)'
            }}
          >
            CONTACT
          </button>
        </div>
      </nav>

      {/* Left Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: 'clamp(280px, 80vw, 350px)',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 60
        }}
      >
        {/* Menu Header - Just Close Button */}
        <div className="flex items-center justify-end p-4 sm:p-6">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-400 transition-colors duration-300"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links - Centered Vertically */}
        <div className="flex flex-col justify-center items-center h-full px-4" style={{ paddingTop: 'clamp(60px, 15vw, 80px)', paddingBottom: 'clamp(60px, 15vw, 80px)' }}>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-white hover:text-orange-400 hover:bg-white/5 transition-all duration-300 relative group text-center w-full"
              style={{
                textDecoration: 'none',
                fontSize: 'clamp(16px, 4vw, 20px)',
                fontWeight: '500',
                padding: 'clamp(12px, 3vw, 20px) clamp(16px, 4vw, 32px)',
                margin: 'clamp(4px, 1vw, 8px) 0',
                borderRadius: '8px',
                maxWidth: '250px'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(234, 116, 39, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay with Blur Effect */}
      {isMenuOpen && (
        <div
          className="fixed inset-0"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 55
          }}
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navbar;