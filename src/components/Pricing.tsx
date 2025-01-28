import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Pricing() {
  const plans = [
    {
      name: 'Padawan',
      price: 'Free',
      features: ['1 WookieLink', 'Basic analytics', 'Standard support'],
      cta: 'Start for Free',
      isPopular: false,
    },
    {
      name: 'Jedi Knight',
      price: '$9.99/mo',
      features: [
        '5 WookieLinks',
        'Advanced analytics',
        'Priority support',
        'Custom domains',
      ],
      cta: 'Upgrade to Knight',
      isPopular: true,
    },
    {
      name: 'Jedi Master',
      price: '$19.99/mo',
      features: [
        'Unlimited WookieLinks',
        'Premium analytics',
        '24/7 support',
        'API access',
        'Team collaboration',
      ],
      cta: 'Become a Master',
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-white">
          Choose Your <span className="text-primary">Path</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                plan.isPopular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-extrabold mb-8">{plan.price}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 text-lg">
                    <Check
                      className={`h-6 w-6 ${
                        plan.isPopular ? 'text-white' : 'text-green-500'
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full">
                <Button
                  className={`w-full py-3 rounded-lg font-bold ${
                    plan.isPopular
                      ? 'bg-white text-purple-500 hover:bg-gray-100'
                      : 'bg-primary hover:bg-primary-dark'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
