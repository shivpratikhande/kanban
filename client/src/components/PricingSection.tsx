import React from 'react';
import { Check } from 'lucide-react';

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "Free forever",
      description: "Perfect for individuals and small teams just getting started.",
      features: [
        "Up to 10 boards",
        "Basic task management",
        "Drag & drop interface",
        "2 team members",
        "1GB storage",
        "Email support"
      ],
      highlight: false,
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$12",
      period: "per user / month",
      description: "Everything you need for professional project management.",
      features: [
        "Unlimited boards",
        "Advanced task tracking",
        "Custom workflows",
        "Unlimited team members",
        "10GB storage",
        "Priority support",
        "Team reporting",
        "Task dependencies"
      ],
      highlight: true,
      buttonText: "Try Free for 14 Days"
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "per user / month",
      description: "Advanced features and control for larger organizations.",
      features: [
        "Everything in Pro",
        "Advanced security",
        "Custom integrations",
        "Unlimited storage",
        "Dedicated support",
        "SLA guarantees",
        "User provisioning",
        "Custom reporting"
      ],
      highlight: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your team, from startups to enterprise organizations.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border transition hover:shadow-md ${
                plan.highlight
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-xl font-semibold mb-2 text-gray-900">{plan.name}</div>

              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 ml-1 text-base">{plan.period}</span>
              </div>

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 px-4 rounded-md font-semibold text-sm transition ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
