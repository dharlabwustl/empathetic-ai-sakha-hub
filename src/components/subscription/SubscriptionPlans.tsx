
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users } from 'lucide-react';
import { SubscriptionPlan } from '@/types/user/base';

interface SubscriptionPlansProps {
  currentPlanId?: string;
  onSelectPlan: (plan: SubscriptionPlan, isGroup: boolean) => void;
  showGroupOption?: boolean;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlanId, 
  onSelectPlan,
  showGroupOption = false
}) => {
  // Basic plans
  const basicPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Limited concepts and flashcards',
        'Basic personalization',
        'Community support'
      ],
      type: 'free'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 499,
      features: [
        'Full access to concepts',
        'Unlimited flashcards',
        'Personalized study path',
        '24/7 doubt solving',
        'Email support'
      ],
      type: 'basic'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999,
      features: [
        'Everything in Basic',
        'Mock tests and analysis',
        'AI-driven personalization',
        'Progress tracking',
        'Priority support',
        'Exam readiness reports'
      ],
      type: 'premium'
    }
  ];

  // Group plans
  const groupPlans: SubscriptionPlan[] = [
    {
      id: 'group-small',
      name: 'Small Group',
      price: 2499,
      features: [
        'For up to 5 members',
        'All Premium features',
        'Group analytics',
        'Batch leader controls',
        'Member progress tracking'
      ],
      type: 'premium',
      maxMembers: 5
    },
    {
      id: 'group-medium',
      name: 'Medium Group',
      price: 4999,
      features: [
        'For up to 10 members',
        'All Premium features',
        'Group analytics',
        'Batch leader controls',
        'Member progress tracking',
        'Customized study paths'
      ],
      type: 'premium',
      maxMembers: 10
    },
    {
      id: 'group-large',
      name: 'Large Group',
      price: 9999,
      features: [
        'For up to 20 members',
        'All Premium features',
        'Advanced group analytics',
        'Batch leader controls',
        'Member progress tracking',
        'Customized study paths',
        'Priority support'
      ],
      type: 'premium',
      maxMembers: 20
    }
  ];

  const handleSelectPlan = (plan: SubscriptionPlan, isGroup: boolean = false) => {
    onSelectPlan(plan, isGroup);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `₹${price}/month`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Individual Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {basicPlans.map(plan => (
            <Card key={plan.id} className={`overflow-hidden ${currentPlanId === plan.id ? 'border-primary' : ''}`}>
              {currentPlanId === plan.id && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Current Plan
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.id === 'premium' && (
                    <Badge>Popular</Badge>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{formatPrice(plan.price)}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={currentPlanId === plan.id ? 'outline' : 'default'}
                  disabled={currentPlanId === plan.id}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {currentPlanId === plan.id ? 'Current Plan' : 'Select Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {showGroupOption && (
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Users size={18} className="mr-2" />
            Group Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupPlans.map(plan => (
              <Card key={plan.id} className={`overflow-hidden ${currentPlanId === plan.id ? 'border-primary' : ''}`}>
                {currentPlanId === plan.id && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Current Plan
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.id === 'group-medium' && (
                      <Badge>Best Value</Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{formatPrice(plan.price)}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={currentPlanId === plan.id ? 'outline' : 'default'}
                    disabled={currentPlanId === plan.id}
                    onClick={() => handleSelectPlan(plan, true)}
                  >
                    {currentPlanId === plan.id ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
