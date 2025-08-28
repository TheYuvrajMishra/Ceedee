import { Link } from "react-router-dom"; // ✅ correct import
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Ceedee
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/features"
                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              {/* Dropdown trigger (Career) */}
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <Link
                  to="/pricing"
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Career
                </Link>
              </div>

              {/* Dropdown menu */}
              {isOpen && (
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="absolute left-0 top-16 w-screen bg-white border-t shadow-lg transition-all duration-300"
                >
                  <div className="max-w-7xl mx-auto px-4 py-6 text-gray-800">
                    Explore Careers at Ceedee 🚀
                  </div>
                </div>
              )}

              <Link
                to="/about"
                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
