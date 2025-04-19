
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import GroupPlanInviteModal from './GroupPlanInviteModal';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
  features: string[];
  includedFeatures: string[];
  buttonText: string;
  highlighted?: boolean;
  userCount?: number;
}

interface Props {
  currentPlanId?: string;
}

export default function SubscriptionPlans({ currentPlanId }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroupPlan, setSelectedGroupPlan] = useState<Plan | null>(null);

  const monthlyPlans: Plan[] = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      description: 'Basic access to AI tutoring and study resources',
      features: [
        'Limited AI questions per day',
        'Basic study materials',
        'Concept explorer tool',
        'Progress tracking',
      ],
      includedFeatures: [
        'Limited AI questions per day',
        'Basic study materials',
        'Concept explorer tool',
        'Progress tracking',
      ],
      buttonText: 'Current Plan',
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 499,
      description: 'Enhanced individual learning experience',
      features: [
        'Unlimited AI tutoring',
        'Personalized study plan',
        'Practice questions',
        'Mock exams',
        'Progress reports',
      ],
      includedFeatures: [
        'Unlimited AI tutoring',
        'Personalized study plan',
        'Practice questions',
        'Mock exams',
        'Progress reports',
      ],
      buttonText: 'Get Started',
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 999,
      description: 'Complete premium learning package',
      features: [
        'Everything in Basic',
        'Advanced personalization',
        'Priority support',
        'Exam simulations',
        'Performance analytics',
        'Advanced AI features',
        'Priority updates',
      ],
      includedFeatures: [
        'Everything in Basic',
        'Advanced personalization',
        'Priority support',
        'Exam simulations',
        'Performance analytics',
        'Advanced AI features',
        'Priority updates',
      ],
      popular: true,
      highlighted: true,
      buttonText: 'Get Started',
    },
    {
      id: 'group-pro',
      name: 'Group Pro Plan',
      price: 4499,
      description: 'Premium package for groups of 5 students',
      features: [
        'Everything in Pro Plan',
        '5 user accounts',
        'Group learning dashboard',
        'Collaborative features',
        'Group analytics',
        '10% discount per user',
        'Batch leader tools',
      ],
      includedFeatures: [
        'Everything in Pro Plan',
        '5 user accounts',
        'Group learning dashboard',
        'Collaborative features',
        'Group analytics',
        '10% discount per user',
        'Batch leader tools',
      ],
      buttonText: 'Get Started',
      userCount: 5,
    },
  ];

  const yearlyPlans = monthlyPlans.map(plan => ({
    ...plan,
    id: `${plan.id}-yearly`,
    price: Math.round(plan.price * 10), // 10 months price for yearly (2 months free)
  }));

  const handleSubscribe = (plan: Plan) => {
    if (plan.id === currentPlanId) {
      toast({
        title: "Already Subscribed",
        description: `You're already on the ${plan.name}.`,
      });
      return;
    }

    if (plan.id === 'group-pro' || plan.id === 'group-pro-yearly') {
      setSelectedGroupPlan(plan);
      setShowGroupModal(true);
    } else {
      // For individual plans - direct to checkout
      toast({
        title: "Upgrading Plan",
        description: `You're being redirected to upgrade to the ${plan.name}.`,
      });
      // Navigate to checkout page (for demo purposes we'll just redirect to subscription page with param)
      navigate(`/dashboard/student/subscription?plan=updated`);
    }
  };

  const handleGroupPlanComplete = (emails: string[], inviteCodes: string[]) => {
    setShowGroupModal(false);
    
    // Navigate to checkout page with group info
    const queryParams = new URLSearchParams({
      emails: emails.join(','),
      codes: inviteCodes.join(',')
    }).toString();
    
    navigate(`/dashboard/student/group-checkout?${queryParams}`);
    
    toast({
      title: "Group Plan Setup",
      description: "Please complete your payment to activate the group plan.",
    });
  };

  return (
    <>
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly (Save 16%)</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`overflow-hidden ${plan.highlighted ? 
                  'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' : 
                  ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 text-center">
                    Most Popular
                  </div>
                )}
                {plan.userCount && (
                  <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 text-center flex items-center justify-center">
                    <Users size={14} className="mr-1" /> Group Plan
                  </div>
                )}
                <CardHeader className="pb-1">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.id === currentPlanId ? 
                      'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700' : 
                      plan.highlighted ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''
                    }`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={plan.id === currentPlanId}
                  >
                    {plan.id === currentPlanId ? "Current Plan" : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="yearly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearlyPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`overflow-hidden ${plan.highlighted ? 
                  'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' : 
                  ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium px-3 py-1 text-center">
                    Most Popular
                  </div>
                )}
                {plan.userCount && (
                  <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 text-center flex items-center justify-center">
                    <Users size={14} className="mr-1" /> Group Plan
                  </div>
                )}
                <CardHeader className="pb-1">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/year</span>
                    
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Save ₹{Math.round(plan.price * 0.16)}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.id === currentPlanId ? 
                      'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700' : 
                      plan.highlighted ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''
                    }`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={plan.id === currentPlanId}
                  >
                    {plan.id === currentPlanId ? "Current Plan" : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showGroupModal && selectedGroupPlan && (
        <GroupPlanInviteModal
          plan={selectedGroupPlan}
          onClose={() => setShowGroupModal(false)}
          onComplete={handleGroupPlanComplete}
        />
      )}
    </>
  );
}
