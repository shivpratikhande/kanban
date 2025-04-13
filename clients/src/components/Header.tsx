"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-xl font-bold text-gray-900">KanbanFlow</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Login</a>
          <a
            href="#"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Sign Up Free
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg px-4 py-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>

            <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
                Login
              </a>
              <a
                href="#"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Sign Up Free
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
