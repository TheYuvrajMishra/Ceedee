import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    'Home',
    'About Us',
    'Dot Philosophy',
    'Venbro Polymers',
    'Sri Krishna Automobiles'
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      {/* Main navbar container */}
      <div className="bg-neutral-100 border-1 border-black px-6 py-4 relative overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}>
        </div>
        <div className="flex items-center justify-between relative z-10">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="CD Group Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="tasa text-2xl font-bold text-black tracking-tight">
              CD Group
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="tasa text-black font-replica font-bold text-sm hover:text-gray-700 transition-all duration-300 relative group pb-1"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
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
                <a
                  key={index}
                  href="#"
                  className="text-black font-bold text-sm hover:text-gray-700 transition-all duration-300 py-2 px-3 hover:bg-black/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating effect shadow */}
      <div className="absolute inset-0 bg-black blur-sm -z-10 transform translate-y-1"></div>
    </nav>
  );
};

export default FloatingNavbar;