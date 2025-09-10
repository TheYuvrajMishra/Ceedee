import { Link } from "react-router";

// New Sidebar Component
const Sidebar = ({ isOpen, setIsOpen, navLinks }:any) => {
  return (
    <aside className={`fixed inset-y-0 left-0 bg-slate-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0`}>
      <div className="p-5 text-center border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        {navLinks.map((link:any, index:any) => (
          <Link
            key={index}
            to={link.to}
            className="flex items-center px-6 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)} // Close sidebar on link click for mobile
          >
            <span className="text-xl mr-3">{link.icon}</span>
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;