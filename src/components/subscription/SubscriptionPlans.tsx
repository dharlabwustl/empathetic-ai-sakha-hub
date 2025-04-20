
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionPlan, SubscriptionType } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/utils/dateUtils';

interface SubscriptionPlansProps {
  currentPlanId: string;
  onSelectPlan: (plan: SubscriptionPlan, isGroup?: boolean) => void;
  showGroupOption?: boolean;
  activePlan?: {
    id: string;
    name: string;
    nextBillingDate?: string;
    status?: 'active' | 'cancelled' | 'past_due';
  };
}

// Sample plans data with added type property
const individualPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for getting started',
    price: 499,
    features: [
      'Access to basic study materials',
      'Limited practice questions',
      'Progress tracking',
      'Mobile access'
    ],
    isPopular: false,
    type: SubscriptionType.Basic
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Our most popular plan',
    price: 999,
    features: [
      'Full access to all study materials',
      'Unlimited practice questions',
      'Advanced progress tracking',
      'Mobile access',
      'Downloadable resources',
      'Priority support'
    ],
    isPopular: true,
    type: SubscriptionType.Premium
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For serious learners',
    price: 1999,
    features: [
      'Everything in Premium',
      'One-on-one tutoring sessions',
      'Custom study plans',
      'Advanced analytics',
      'Career guidance',
      'Dedicated support manager'
    ],
    isPopular: false,
    type: SubscriptionType.Enterprise
  }
];

const groupPlans: SubscriptionPlan[] = [
  {
    id: 'group-basic',
    name: 'Group Basic',
    description: 'Perfect for small groups',
    price: 1999,
    features: [
      'Up to 5 members',
      'Access to basic study materials',
      'Limited practice questions',
      'Group progress tracking'
    ],
    isPopular: false,
    maxMembers: 5,
    type: SubscriptionType.School
  },
  {
    id: 'group-premium',
    name: 'Group Premium',
    description: 'Ideal for medium-sized groups',
    price: 3999,
    features: [
      'Up to 10 members',
      'Full access to all study materials',
      'Unlimited practice questions',
      'Advanced group progress tracking',
      'Group study sessions',
      'Priority support'
    ],
    isPopular: true,
    maxMembers: 10,
    type: SubscriptionType.Corporate
  },
  {
    id: 'group-enterprise',
    name: 'Group Enterprise',
    description: 'For large groups or institutions',
    price: 7999,
    features: [
      'Up to 25 members',
      'Everything in Group Premium',
      'Custom group study plans',
      'Advanced analytics',
      'Dedicated support manager',
      'Admin controls'
    ],
    isPopular: false,
    maxMembers: 25,
    type: SubscriptionType.Enterprise
  }
];

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  currentPlanId,
  onSelectPlan,
  showGroupOption = false,
  activePlan
}) => {
  const [planType, setPlanType] = useState<'individual' | 'group'>(
    showGroupOption ? 'individual' : 'individual'
  );
  
  const navigate = useNavigate();
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    onSelectPlan(plan, planType === 'group');
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/student/subscription/manage');
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {activePlan && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Your Active Subscription</CardTitle>
                <CardDescription>Details of your current subscription</CardDescription>
              </div>
              <Button variant="outline" onClick={handleManageSubscription}>
                Manage Subscription
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="font-semibold text-lg">{activePlan.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Status: <span className="font-medium capitalize">{activePlan.status || 'active'}</span>
                </p>
                {activePlan.nextBillingDate && (
                  <p className="text-sm text-muted-foreground">
                    Next billing date: {formatDateTime(activePlan.nextBillingDate)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showGroupOption && (
        <Tabs 
          value={planType} 
          onValueChange={(value) => setPlanType(value as 'individual' | 'group')}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="individual">Individual Plans</TabsTrigger>
              <TabsTrigger value="group">Group Plans</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individual">
            <div className="grid md:grid-cols-3 gap-8">
              {individualPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isCurrent={plan.id === currentPlanId}
                  onSelect={handleSelectPlan}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="grid md:grid-cols-3 gap-8">
              {groupPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isCurrent={plan.id === currentPlanId}
                  onSelect={handleSelectPlan}
                  isGroup
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      {!showGroupOption && (
        <div className="grid md:grid-cols-3 gap-8">
          {individualPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrent={plan.id === currentPlanId}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrent: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
  isGroup?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrent, onSelect, isGroup }) => {
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className={`flex flex-col ${isCurrent ? 'border-green-400 shadow-md' : ''} ${plan.isPopular ? 'border-amber-300 shadow-md' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            {plan.isPopular && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-2">
                Most Popular
              </Badge>
            )}
            {isCurrent && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Current Plan
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <p className="text-3xl font-bold">{formatPrice(plan.price)}</p>
          <p className="text-sm text-muted-foreground">per month</p>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-green-600 mt-1 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        {plan.maxMembers && (
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>Up to {plan.maxMembers} members</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(plan)} 
          className="w-full" 
          variant={isCurrent ? "outline" : plan.isPopular ? "default" : "outline"}
          disabled={isCurrent}
        >
          {isCurrent ? 'Current Plan' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlans;
