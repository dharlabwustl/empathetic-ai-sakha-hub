
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubscriptionPlan } from '@/types/user/base';

interface SubscriptionPlansProps {
  currentPlanId: string;
  onSelectPlan: (plan: SubscriptionPlan, isGroup: boolean) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlanId,
  onSelectPlan
}) => {
  // Define plans
  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      type: 'free',
      name: 'Free',
      price: 0,
      currency: 'INR',
      description: 'Basic exam preparation',
      features: [
        'Basic study plans',
        'Limited flashcards',
        '5 practice questions/day',
        'Basic progress tracking'
      ],
      notIncluded: [
        'AI tutor sessions',
        'Personalized study path',
        'Advanced analytics',
        'Group study tools'
      ]
    },
    {
      id: 'premium-monthly',
      type: 'premium',
      name: 'Premium',
      price: 299,
      currency: 'INR',
      interval: 'month',
      description: 'Advanced preparation tools',
      features: [
        'Advanced study plans',
        'Unlimited flashcards',
        'Unlimited practice questions',
        'AI tutor access',
        'Detailed analytics',
        'Personalized recommendations',
        'Advanced progress tracking'
      ],
      notIncluded: [
        '1-on-1 coaching',
        'Exam strategy sessions'
      ]
    },
    {
      id: 'pro-annual',
      type: 'pro',
      name: 'Pro',
      price: 2499,
      currency: 'INR',
      interval: 'year',
      description: 'Complete exam success package',
      features: [
        'Everything in Premium',
        '1-on-1 coaching sessions',
        'Personalized study path',
        'Exam strategy sessions',
        'Premium study materials',
        'Priority support',
        '2 months free'
      ],
      notIncluded: []
    }
  ];

  const groupPlans: SubscriptionPlan[] = [
    {
      id: 'group-monthly',
      type: 'group',
      name: 'Group Plan',
      price: 999,
      currency: 'INR',
      interval: 'month',
      description: 'For study groups (up to 5 members)',
      features: [
        'All Premium features for 5 users',
        'Collaborative study tools',
        'Group analytics dashboard',
        'Shared study materials',
        'Group discount (33% off per user)'
      ],
      notIncluded: [
        '1-on-1 coaching'
      ]
    }
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Individual Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map(plan => (
            <Card 
              key={plan.id}
              className={`p-6 border-2 transition-all duration-300 hover:shadow-lg ${
                plan.id === currentPlanId 
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' 
                  : plan.id === 'pro-annual' 
                    ? 'border-purple-200 hover:border-purple-500' 
                    : plan.id === 'premium-monthly' 
                      ? 'border-blue-200 hover:border-blue-500'
                      : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold">
                    {plan.currency === 'INR' ? '₹' : '$'}{plan.price}
                    {plan.interval && (
                      <span className="text-sm font-normal text-gray-500">
                        /{plan.interval}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full mt-4 ${
                    plan.id === 'pro-annual'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : ''
                  }`}
                  variant={plan.id === currentPlanId ? "outline" : "default"}
                  onClick={() => onSelectPlan(plan, false)}
                  disabled={plan.id === currentPlanId}
                >
                  {plan.id === currentPlanId ? 'Current Plan' : 'Choose Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Group Plans</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupPlans.map(plan => (
            <Card 
              key={plan.id}
              className="p-6 border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold">
                    {plan.currency === 'INR' ? '₹' : '$'}{plan.price}
                    {plan.interval && (
                      <span className="text-sm font-normal text-gray-500">
                        /{plan.interval}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    
                    {plan.notIncluded && plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400">
                        <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => onSelectPlan(plan, true)}
                >
                  Choose Group Plan
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
