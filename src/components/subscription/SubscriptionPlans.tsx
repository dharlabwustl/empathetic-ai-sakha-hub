
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubscriptionPlan } from '@/types/user/base';
import { individualPlans, groupPlans } from '@/components/pricing/pricingData';

interface SubscriptionPlansProps {
  currentPlanId: string;
  onSelectPlan: (plan: SubscriptionPlan, isGroup: boolean) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlanId,
  onSelectPlan
}) => {
  // Convert pricing data format to subscription plan format
  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      type: 'free',
      name: 'Free Trial',
      price: 0,
      currency: 'INR',
      interval: 'month',
      description: 'Experience Sakha AI for 7 days',
      features: [
        '5 Concept Cards (Auto-generated)',
        '5 Flashcards',
        '5 Practice Exams with analytics',
        '1 Academic Advisor plan',
        'Basic Smart Study Plan',
        '10 AI Tutor requests',
        'Feel Good Corner'
      ],
      notIncluded: [
        'Custom Card Creation',
        'Surrounding Influence',
        'Mood-Based Study Plan'
      ]
    },
    {
      id: 'premium-monthly',
      type: 'premium',
      name: 'Pro Plan (Monthly)',
      price: 999,
      currency: 'INR',
      interval: 'month',
      description: 'Complete AI-powered learning companion',
      features: [
        'Unlimited Concept Cards (via Study Plan)',
        'Unlimited Flashcards',
        'Unlimited Practice Exams',
        'Custom Cards (via credits)',
        '2 Academic Advisor plans/month',
        'Full + Mood-Based Study Plan',
        'Unlimited AI Tutor (Fair Use)',
        'Surrounding Influence',
        'Feel Good Corner'
      ],
      notIncluded: [
        'Study Groups'
      ]
    },
    {
      id: 'pro-annual',
      type: 'pro',
      name: 'Pro Plan (Annual)',
      price: 9999,
      currency: 'INR',
      interval: 'year',
      description: 'All Pro features with annual savings',
      features: [
        'All Pro Plan Monthly features',
        '₹2,000 savings vs. monthly plan',
        'Priority support',
        'Early access to new features',
        'Unlimited Concept Cards',
        'Unlimited Flashcards',
        'Unlimited Practice Exams',
        'Custom Cards (via credits)',
        'Full + Mood-Based Study Plan',
        'Unlimited AI Tutor (Fair Use)'
      ],
      notIncluded: []
    }
  ];

  const groupPlans: SubscriptionPlan[] = [
    {
      id: 'group-monthly',
      type: 'group',
      name: 'Group Plan (5 Users)',
      price: 3999,
      currency: 'INR',
      interval: 'month',
      description: 'For study groups & small batches',
      features: [
        '5 Users included (₹799/user extra)',
        'Unlimited Concept Cards (via Study Plan)',
        'Unlimited Flashcards',
        'Unlimited Practice Exams',
        'Custom Cards (shared credit pool)',
        '4 Academic Advisor plans/month shared',
        'Study Groups',
        'Admin Dashboard',
        'Batch Manager'
      ],
      notIncluded: []
    },
    {
      id: 'group-annual',
      type: 'group_annual',
      name: 'Group Plan (Annual)',
      price: 39999,
      currency: 'INR',
      interval: 'year',
      description: 'Best value for study groups',
      features: [
        'All Group Plan Monthly features',
        '₹8,000 savings vs. monthly plan',
        'Priority group support',
        'Enhanced analytics',
        'Customized onboarding session',
        '5 Users included (₹799/user extra)',
        'Batch Manager',
        'Admin Dashboard'
      ],
      notIncluded: []
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
                    
                    {plan.notIncluded && plan.notIncluded.map((feature, i) => (
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
