import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/95 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light mb-6 tracking-wide">Venbro Polymers</h3>
            <div className="w-16 h-px bg-white mb-6"></div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Since 1995, we have been committed to delivering high-quality Food Grade PP Woven Fabrics, Sacks and Bags for Indian and International markets with unwavering dedication to excellence.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Founded by D.Venkateswaran & D. Shanmugasundaram</p>
              <p>ISO 9002 & ZED Certified</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-light mb-6 tracking-wide">Products</h4>
            <div className="w-12 h-px bg-gray-600 mb-6"></div>
            <ul className="space-y-3 text-gray-300">
              <li>PP Woven Fabrics</li>
              <li>Food Grade Sacks</li>
              <li>Industrial Bags</li>
              <li>Packaging Solutions</li>
              <li>Custom Manufacturing</li>
              <li>Bulk Orders</li>
            </ul>
          </div>

          {/* Industries Served */}
          <div>
            <h4 className="text-lg font-light mb-6 tracking-wide">Industries</h4>
            <div className="w-12 h-px bg-gray-600 mb-6"></div>
            <ul className="space-y-3 text-gray-300">
              <li>Food & Beverages</li>
              <li>Agriculture</li>
              <li>Cement</li>
              <li>Fertilizers</li>
              <li>Chemicals</li>
              <li>Feed Industry</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">ADDRESS</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Industrial Area<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">PHONE</h5>
                <p className="text-gray-300 text-sm">+91 XXX XXX XXXX</p>
                <p className="text-gray-300 text-sm">+91 XXX XXX XXXX</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">EMAIL</h5>
                <p className="text-gray-300 text-sm">info@venbropolymers.com</p>
                <p className="text-gray-300 text-sm">sales@venbropolymers.com</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium mb-2 tracking-wider">HOURS</h5>
                <p className="text-gray-300 text-sm">Mon - Fri: 9:00 - 18:00</p>
                <p className="text-gray-300 text-sm">Sat: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wider">QUICK LINKS</h5>
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <a href="#" className="hover:text-white transition-colors">About Us</a>
                <a href="#" className="hover:text-white transition-colors">Products</a>
                <a href="#" className="hover:text-white transition-colors">Quality</a>
                <a href="#" className="hover:text-white transition-colors">Certifications</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
              </div>
            </div>
            
            <div className="md:text-right">
              <h5 className="text-sm font-medium mb-4 tracking-wider">CERTIFICATIONS</h5>
              <div className="flex md:justify-end gap-6 text-sm text-gray-300">
                <span className="border border-gray-600 px-3 py-1 text-xs tracking-wider">ISO 9002</span>
                <span className="border border-gray-600 px-3 py-1 text-xs tracking-wider">ZED CERTIFIED</span>
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
              <p>&copy; 2024 Venbro Polymers. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;