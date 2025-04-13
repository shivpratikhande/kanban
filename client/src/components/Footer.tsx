import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo + Social */}
          <div className="space-y-4">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 mr-2 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#7E69AB" />
                <rect x="4" y="4" width="4" height="4" rx="1" fill="white" />
                <rect x="4" y="10" width="4" height="4" rx="1" fill="white" />
                <rect x="4" y="16" width="4" height="4" rx="1" fill="white" />
                <rect x="10" y="4" width="4" height="4" rx="1" fill="white" />
                <rect x="10" y="10" width="4" height="4" rx="1" fill="#33C3F0" />
                <rect x="10" y="16" width="4" height="4" rx="1" fill="white" />
                <rect x="16" y="4" width="4" height="4" rx="1" fill="white" />
                <rect x="16" y="10" width="4" height="4" rx="1" fill="white" />
                <rect x="16" y="16" width="4" height="4" rx="1" fill="white" />
              </svg>
              <span className="text-xl font-bold text-white">Forge</span>
            </div>
            <p className="text-gray-400">
              The visual workflow tool that empowers teams to manage projects and tasks efficiently.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Tutorials', 'Blog', 'Community', 'Help Center'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>© 2025 Forge. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
