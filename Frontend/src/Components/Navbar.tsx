import { Menu, X } from 'lucide-react';
import { useState, useEffect} from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

const NAV_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/csr', label: 'CSR Activities' },
  { to: '/news-and-events', label: 'News & Events' },
  { to: '/venbro', label: 'Venbro Polymers' }
];

// Shared button styles
const buttonStyles = {
  base: "p-2 rounded-lg transition-colors duration-300 touch-manipulation",
  scrolled: "text-slate-800 hover:bg-slate-200/50",
  transparent: "text-white hover:bg-white/10"
};

const contactStyles = `
  inline-block noto-sans-medium py-2 px-3 xs:py-2.5 xs:px-4 sm:py-3 sm:px-6 rounded-xl
  text-xs xs:text-sm sm:text-base relative overflow-hidden border-2 border-amber-600 
  text-amber-600 transition-all duration-600 before:absolute before:inset-0 before:-z-10
  before:bg-amber-600 before:w-0 before:transition-[width] hover:text-white 
  hover:before:w-full touch-manipulation min-h-[40px] items-center justify-center
`;

const overlayStyles: React.CSSProperties = {
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
  pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
  isolation: 'isolate'
};

const sidebarStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 'min(320px, 85vw)',
  height: '100vh',
  backgroundColor: '#FCFCFC',
  zIndex: 105,
  transition: 'transform 300ms ease-in-out',
  pointerEvents: 'auto'
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the main page (home page)
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if navbar should be transparent
  // Only transparent on main page when not scrolled
  const shouldBeTransparent = isMainPage && !isScrolled;

  const closeMenu = () => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const MenuButton = ({
    className,
    onClick,
    children,
    ariaLabel
  }: {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
  }) => (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  const Logo = () => (
    <Link to="/" onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }} className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
      <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
        <img src="/logo.png" alt="Company Logo Base" className="w-full h-full object-contain" />
      </div>
      <img src="/logo_title.png" alt="Company Name" className="w-20 xs:w-24 sm:w-30 object-contain" />
    </Link>
  );

  const ContactButton = () => (
    <Link to="/contact" onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }} className={contactStyles}>
      <span className="hidden xs:inline">Contact Us</span>
      <span className="xs:hidden">Contact</span>
    </Link>
  );

  type NavLinkProps = {
    to: string;
    label: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  };

  const NavLink = ({
    to,
    label,
    onClick,
    style,
    onMouseEnter,
    onMouseLeave
  }: NavLinkProps) => (
    <Link
      to={to}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {label}
    </Link>
  );

  const MobileMenu = () => (
    <>
      <div style={overlayStyles} onClick={closeMenu} />
      <div style={{ ...sidebarStyles, transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Close Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 16px', paddingTop: '24px' }}>
            <button
              onClick={closeMenu}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'black',
                cursor: 'pointer',
                transition: 'background-color 300ms ease',
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement) as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => ((e.target as HTMLElement) as HTMLElement).style.backgroundColor = 'transparent'}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  label={link.label}
                  onClick={closeMenu}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    color: 'black',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: '500',
                    backgroundColor: 'transparent',
                    transition: 'all 300ms ease',
                    minHeight: '56px',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                  }}
                />
              ))}
            </div>
          </nav>

          {/* Footer Contact Button */}
          <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center' }}>
            <Link
              to="/contact"
              onClick={closeMenu}
              
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: '#D97706',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 300ms ease',
                minHeight: '48px',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#B45309';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#D97706';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={clsx(
      'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out p-3 xs:p-4 md:py-3',
      shouldBeTransparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-lg shadow-md'
    )}>
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Hamburger Menu */}
        <div className="flex items-center">
          <div className="ml-2 xs:ml-4 sm:ml-6 md:ml-8 lg:ml-10 xl:ml-12">
            <MenuButton
              className={clsx(buttonStyles.base, shouldBeTransparent ? buttonStyles.transparent : buttonStyles.scrolled)}
              onClick={toggleMenu}
              ariaLabel="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
            </MenuButton>
          </div>
        </div>

        <Logo />

        {/* Contact Button */}
        <div className="flex items-center">
          <div className="mr-2 xs:mr-4 sm:mr-6 md:mr-8 lg:mr-10 xl:mr-12">
            <ContactButton />
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {isMenuOpen && typeof document !== 'undefined' && createPortal(<MobileMenu />, document.body)}
    </div>
  );
};

export default Header;