
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlan } from '@/types/user/base';

interface PlansProps {
  currentPlanId?: string;
  onSelectPlan: (plan: SubscriptionPlan, isGroupPlan: boolean) => void;
}

// Define plan features
const features = {
  free: [
    "Basic question bank access",
    "Limited exam analysis",
    "Community forums access"
  ],
  basic: [
    "Full question bank access",
    "Detailed exam analysis",
    "Community forums access",
    "Personal study plans",
    "Progress tracking"
  ],
  premium: [
    "Everything in Basic",
    "AI-powered study recommendations",
    "Mock tests with detailed analysis",
    "Personalized learning path",
    "Priority support"
  ],
  group: [
    "Everything in Premium",
    "Group study features",
    "Batch management",
    "Performance comparison",
    "Shared resources",
    "Dedicated group admin tools"
  ]
};

// Define subscription plans
const subscriptionPlans: Record<string, SubscriptionPlan[]> = {
  monthly: [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access to our platform',
      price: 0,
      type: 'free',
      features: features.free,
      isPopular: false
    },
    {
      id: 'basic_monthly',
      name: 'Basic',
      description: 'Perfect for serious students',
      price: 299,
      type: 'basic',
      features: features.basic,
      isPopular: false
    },
    {
      id: 'premium_monthly',
      name: 'Premium',
      description: 'For top performers',
      price: 499,
      type: 'premium',
      features: features.premium,
      isPopular: true
    },
    {
      id: 'group_monthly',
      name: 'Group',
      description: 'Study with friends & classmates',
      price: 799,
      type: 'group',
      memberLimit: 5,
      features: features.group,
      isPopular: false
    }
  ],
  annual: [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access to our platform',
      price: 0,
      type: 'free',
      features: features.free,
      isPopular: false
    },
    {
      id: 'basic_annual',
      name: 'Basic',
      description: 'Perfect for serious students',
      price: 2999,
      originalPrice: 3588,
      type: 'basic',
      features: features.basic,
      isPopular: false
    },
    {
      id: 'premium_annual',
      name: 'Premium',
      description: 'For top performers',
      price: 4999,
      originalPrice: 5988,
      type: 'premium',
      features: features.premium,
      isPopular: true
    },
    {
      id: 'group_annual',
      name: 'Group',
      description: 'Study with friends & classmates',
      price: 7999,
      originalPrice: 9588,
      type: 'group',
      memberLimit: 5,
      features: features.group,
      isPopular: false
    }
  ]
};

const SubscriptionPlans: React.FC<PlansProps> = ({ currentPlanId, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  
  const plans = subscriptionPlans[billingCycle];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <Tabs defaultValue="monthly" value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}>
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="annual">Annual Billing <Badge variant="outline" className="ml-2 font-normal">Save 16%</Badge></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-md' : ''}`}
          >
            {plan.isPopular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    ₹{plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                  )}
                </div>
                
                {plan.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through mt-1">
                    ₹{plan.originalPrice}/{billingCycle === "monthly" ? "mo" : "yr"}
                  </div>
                )}
              </div>
              
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-1 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.isPopular ? "default" : "outline"}
                onClick={() => onSelectPlan(plan, plan.type === 'group')}
                disabled={plan.id === currentPlanId}
              >
                {plan.id === currentPlanId ? "Current Plan" : (plan.price === 0 ? "Current Plan" : "Choose Plan")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        All plans include access to our community forums and base features.
        <br />Upgrade anytime to unlock more features.
      </div>
    </div>
  );
};

export default SubscriptionPlans;
