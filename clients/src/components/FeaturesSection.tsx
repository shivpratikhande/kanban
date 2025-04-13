import React from 'react';
import { 
  Layout, 
  Users, 
  MoveHorizontal,
  Bell, 
  Filter, 
  Calendar,
  BarChart3, 
  Shield, 
  Zap
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Layout className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Intuitive Kanban Boards",
      description: "Visualize your workflow with customizable columns to match your team's process."
    },
    {
      icon: <Users className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates, comments, and mentions."
    },
    {
      icon: <MoveHorizontal className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Drag & Drop Interface",
      description: "Effortlessly move tasks between columns with an intuitive drag-and-drop interface."
    },
    {
      icon: <Bell className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Smart Notifications",
      description: "Stay updated with customizable alerts for task changes and mentions."
    },
    {
      icon: <Filter className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Powerful Filtering",
      description: "Find exactly what you need with advanced filtering and search capabilities."
    },
    {
      icon: <Calendar className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Deadline Management",
      description: "Never miss a deadline with visual due dates and timeline views."
    },
    {
      icon: <BarChart3 className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Progress Analytics",
      description: "Track team performance with visual reports and productivity metrics."
    },
    {
      icon: <Shield className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Secure & Private",
      description: "Enterprise-grade security to keep your data safe and compliant."
    },
    {
      icon: <Zap className="h-10 w-10 p-2 bg-blue-100 text-blue-600 rounded-lg" />,
      title: "Automation Tools",
      description: "Automate routine tasks and workflows to save time and reduce errors."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Features Built for Productivity</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage projects, organize tasks, and boost team collaboration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
