import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowDown, Menu, X } from "lucide-react";

function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-1/2 transform mt-5 -translate-x-1/2 w-350 h-16 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-300 shadow-xl z-50">
        <div className="h-full px-6">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex justify-center">
              <Link
                to="/"
                className="flex items-center text-xl font-semibold text-gray-900 hover:text-black transition-colors duration-200"
              >
                <img
                  src="/logo_base.png"
                  alt="Logo"
                  className="h-10 w-auto mr-2"
                />
                <img
                  src="/logo_title.png"
                  alt="Logo"
                  className="h-7 w-auto mr-2"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className="text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Home
              </Link>

              {/* Divider */}
              <div className="w-px h-4 bg-gray-400 mx-2"></div>

              {/* Dropdown Container */}
              <div className="relative">
                <Link
                  to="/career"
                  className="text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center"
                >
                  Career
                </Link>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-gray-400 mx-2"></div>

              <Link
                to="/about"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
                className="text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center"
              >
                About
                <svg
                  className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
              {isAboutOpen && (
                <div
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                  className="absolute top-full -mt-3 left-0 right-0 w-350 bg-white/95 backdrop-blur-sm border border-t-0 border-gray-300 rounded-b-2xl shadow-xl py-3 animate-in fade-in slide-in-from-top-1 duration-300"
                >
                  {/* Header */}
                  <div className="px-5 py-3 border-b border-black/50">
                    <p className="text-xl font-semibold text-gray-900 tracking-wide">
                      About Ceedee
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Explore Our Company
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col divide-y divide-black/20">
                    <Link
                      to="/about/dot-philosophy"
                      className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 group hover:bg-gray-100 hover:text-black transition-all duration-200"
                    >
                      Dot Philosophy
                      <ArrowDown className="-rotate-135 text-gray-500 transition-all ease duration-100 group-hover:text-gray-700 group-hover:-rotate-150" />
                    </Link>

                    <Link
                      to="/about/business-practices"
                      className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 group hover:bg-gray-100 hover:text-black transition-all duration-200"
                    >
                      Business Practices
                      <ArrowDown className="-rotate-135 text-gray-500 transition-all ease duration-100 group-hover:text-gray-700 group-hover:-rotate-150" />
                    </Link>

                    <Link
                      to="/about/csr-activities"
                      className="flex items-center group justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200"
                    >
                      CSR Activities
                      <ArrowDown className="-rotate-135 text-gray-500 transition-all ease duration-100 group-hover:text-gray-700 group-hover:-rotate-150" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="w-px h-4 bg-gray-400 mx-2"></div>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200/60 shadow-xl z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center text-lg font-semibold text-slate-800"
              onClick={closeMobileMenu}
            >
              <img
                src="/logo_base.png"
                alt="Logo"
                className="h-8 w-auto mr-2"
              />
              <img
                src="/logo_title.png"
                alt="Logo"
                className="h-6 w-auto"
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-4 border-t border-slate-200/50">
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  to="/"
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                <Link
                  to="/career"
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  Career
                </Link>

                {/* Mobile About Section */}
                <div>
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className="w-full flex items-center justify-between text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    About
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isAboutOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isAboutOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link
                        to="/about/dot-philosophy"
                        className="block text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        Dot Philosophy
                      </Link>
                      <Link
                        to="/about/business-practices"
                        className="block text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        Business Practices
                      </Link>
                      <Link
                        to="/about/csr-activities"
                        className="block text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        CSR Activities
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/70 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;