import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Forge has transformed our team's productivity. The visual workflow makes it easy to track progress and identify bottlenecks.",
      author: "Sarah Johnson",
      position: "Product Manager at TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      stars: 5,
    },
    {
      quote:
        "The intuitive interface and powerful features have made project management so much easier. Our team collaboration has improved significantly.",
      author: "Michael Chen",
      position: "Engineering Director at InnovateLabs",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
    },
    {
      quote:
        "We've tried many project management tools, but Forge stands out with its simplicity and effectiveness. Highly recommended!",
      author: "Emily Rodriguez",
      position: "Operations Lead at GrowthStartup",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Loved by Teams Worldwide
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See what our users have to say about how Forge has improved their workflow and productivity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-6">"{testimonial.quote}"</blockquote>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted by innovative companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["ACME Inc.", "TechGiant", "Innovate Co.", "FutureLabs", "SmartSolutions"].map((name, i) => (
              <div key={i} className="text-lg font-semibold text-gray-400">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
