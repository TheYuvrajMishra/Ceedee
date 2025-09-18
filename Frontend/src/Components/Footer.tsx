import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black/95 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light mb-6 tracking-wide">
              CeeDee's Group
            </h3>
            <div className="w-16 h-px bg-white mb-6"></div>
            <p className="text-gray-300 leading-relaxed mb-6">
              A diversified business group committed to excellence across
              multiple industries with decades of experience and unwavering
              dedication to quality and innovation.
            </p>

            {/* Our Companies */}
            <div className="mt-6 pt-6 border-t border-white/50">
              <h5 className="text-sm font-medium mb-3 tracking-wider text-gray-400">
                OUR COMPANIES
              </h5>
              <div className="space-y-2">
                <Link
                  to="/venbro-polymers"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-200">
                        Venbro Polymers
                      </p>
                      <p className="text-xs text-gray-400">
                        PP Woven Fabrics & Packaging Solutions
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/shri-krishna-automobile-enterprises" onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}>
                  <div className="flex items-start space-x-3">
                    <Building2 className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-200">
                        Shri Krishnan Automobile Enterprises
                      </p>
                      <p className="text-xs text-gray-400">
                        Automotive Solutions & Services
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-light mb-6 tracking-wide">Services</h4>
            <div className="w-12 h-px bg-white/50 mb-6"></div>
            <ul className="space-y-3 text-gray-300">
              <li>Industrial Manufacturing</li>
              <li>Packaging Solutions</li>
              <li>Automotive Services</li>
              <li>Custom Manufacturing</li>
              <li>Quality Assurance</li>
              <li>Business Solutions</li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-light mb-6 tracking-wide">
              Industries
            </h4>
            <div className="w-12 h-px bg-white/50 mb-6"></div>
            <ul className="space-y-3 text-gray-300">
              <li>Food & Beverages</li>
              <li>Automotive</li>
              <li>Agriculture</li>
              <li>Manufacturing</li>
              <li>Chemicals</li>
              <li>Industrial</li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-white/50 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wider">
                QUICK LINKS
              </h5>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Venbro Polymers
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Shri Krishna Automobile Enterprises
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Corporate Social Responsibilities
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  News & Events
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </div>
            </div>

            <div className="md:text-right">
              <h5 className="text-sm font-medium mb-4 tracking-wider">
                CERTIFICATIONS
              </h5>
              <div className="flex md:justify-end gap-6 text-sm text-gray-300">
                <span className="border border-white/50 px-3 py-1 text-xs tracking-wider">
                  ISO CERTIFIED
                </span>
                <span className="border border-white/50 px-3 py-1 text-xs tracking-wider">
                  QUALITY ASSURED
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <div className="border-t border-white/50 mt-16 pt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">
                  ADDRESS
                </h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Industrial Area
                  <br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">
                  PHONE
                </h5>
                <p className="text-gray-300 text-sm">+91 XXX XXX XXXX</p>
                <p className="text-gray-300 text-sm">+91 XXX XXX XXXX</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">
                  EMAIL
                </h5>
                <p className="text-gray-300 text-sm">info@ceedeesgroup.com</p>
                <p className="text-gray-300 text-sm">
                  contact@ceedeesgroup.com
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">
                  HOURS
                </h5>
                <p className="text-gray-300 text-sm">Mon - Fri: 9:00 - 18:00</p>
                <p className="text-gray-300 text-sm">Sat: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 CeeDee's Group. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
