import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium">
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs font-bold">✓</span>
              <span>Visual Task Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Visualize your workflow with <span className="text-blue-600">Forge</span>
            </h1>

            <p className="text-xl text-gray-600">
              Boost your team's productivity with our intuitive kanban board. Organize tasks, track progress, and collaborate seamlessly.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/home"
                className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                See How It Works
              </a>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Trusted by 10,000+ teams worldwide</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 transform rotate-2 rounded-2xl z-[-1]" />
            <div className="relative p-2 bg-white rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1000"
                alt="Kanban Board Preview"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
