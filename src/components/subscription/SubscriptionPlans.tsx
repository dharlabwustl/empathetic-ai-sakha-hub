
import React from 'react';
import { SubscriptionPlan } from '@/types/user';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface SubscriptionPlansProps {
  currentPlanId: string;
  showGroupOption?: boolean;
  onSelectPlan: (plan: SubscriptionPlan, isGroup?: boolean) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  currentPlanId,
  showGroupOption = false,
  onSelectPlan
}) => {
  // Sample plans - in a real app, these would come from an API
  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      features: [
        "Limited access to study materials",
        "Basic practice questions",
        "Community forum access"
      ],
      description: "Get started with basic features",
      type: "free" as any,
      isPopular: false
    },
    {
      id: "basic",
      name: "Basic Plan",
      price: 499,
      features: [
        "Full access to study materials",
        "Unlimited practice questions",
        "Progress tracking",
        "Ad-free experience",
        "Email support"
      ],
      description: "Great for casual learners",
      type: "basic" as any,
      isPopular: false
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 999,
      features: [
        "Everything in Basic",
        "AI-powered study plan",
        "Mock tests with analysis",
        "Personalized feedback",
        "Priority support",
        "Advanced progress analytics",
        "Mood tracking"
      ],
      description: "Perfect for serious exam preparation",
      type: "premium" as any,
      isPopular: true
    }
  ];

  // Add group plan if enabled
  const groupPlan: SubscriptionPlan = {
    id: "group",
    name: "Group Plan",
    price: 1999,
    features: [
      "Everything in Premium",
      "Up to 5 members",
      "Group analytics",
      "Collaborative learning tools",
      "Shared resources",
      "Group leader dashboard"
    ],
    description: "Ideal for study groups",
    type: "premium" as any,
    maxMembers: 5,
    isPopular: false
  };

  const allPlans = showGroupOption ? [...plans, groupPlan] : plans;

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="subscription-plans">
      <h3 className="text-lg font-medium mb-6">Choose Your Plan</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allPlans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col overflow-hidden ${plan.isPopular ? 'border-2 border-primary' : ''}`}>
            {plan.isPopular && (
              <div className="bg-primary py-1 px-4">
                <p className="text-sm font-medium text-center text-primary-foreground">Most Popular</p>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-2">
                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                <span className="text-muted-foreground ml-1">{plan.price > 0 ? '/month' : ''}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={currentPlanId === plan.id ? "outline" : "default"}
                disabled={currentPlanId === plan.id}
                onClick={() => onSelectPlan(plan, plan.id === "group")}
              >
                {currentPlanId === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
