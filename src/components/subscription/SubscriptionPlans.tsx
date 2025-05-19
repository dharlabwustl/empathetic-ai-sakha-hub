
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Info, Users } from 'lucide-react';
import { standardSubscriptionPlans, SubscriptionType } from '@/types/user/subscription';

interface Plan {
  id: string;
  name: string;
  price: number;
  priceAnnual?: number;
  description: string;
  features: string[];
  type: string;
  highlighted?: boolean;
  popular?: boolean;
  buttonText?: string;
  maxMembers?: number;
}

interface SubscriptionPlansProps {
  currentPlanId?: string;
  onSelectPlan: (plan: any, isGroup: boolean) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  currentPlanId = 'free',
  onSelectPlan,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  // Get plans from standardized plans
  const individualPlans = standardSubscriptionPlans.individual;
  const groupPlans = standardSubscriptionPlans.group;
  
  const handlePeriodToggle = (period: 'monthly' | 'annual') => {
    setSelectedPeriod(period);
  };
  
  const getPriceDisplay = (price: number, priceAnnual?: number) => {
    const displayPrice = selectedPeriod === 'annual' && priceAnnual ? priceAnnual : price;
    
    return (
      <>
        <span className="mr-1">₹</span>
        <span className="text-3xl font-bold">{displayPrice}</span>
        <span className="text-muted-foreground">/{selectedPeriod === 'monthly' ? 'mo' : 'year'}</span>
      </>
    );
  };
  
  // Helper to check if a plan is the current plan
  const isCurrentPlan = (planId: string) => {
    return planId === currentPlanId;
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${selectedPeriod === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            onClick={() => handlePeriodToggle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${selectedPeriod === 'annual' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
            onClick={() => handlePeriodToggle('annual')}
          >
            <div className="flex items-center gap-2">
              Annual
              <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                Save 20%
              </Badge>
            </div>
          </button>
        </div>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Individual Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {individualPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border ${
                  plan.highlighted
                  ? 'border-primary shadow-md dark:border-primary/50'
                  : 'border-gray-200 dark:border-gray-800'
                } overflow-hidden transition-all hover:shadow-md`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-1.5 text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mt-1.5 h-12">{plan.description}</p>
                  
                  {plan.price === 0 ? (
                    <div className="mt-4 mb-6">
                      <div className="text-3xl font-bold">Free</div>
                      <div className="text-muted-foreground">Forever</div>
                    </div>
                  ) : (
                    <div className="mt-4 mb-6">
                      {getPriceDisplay(plan.price, plan.priceAnnual)}
                      {selectedPeriod === 'annual' && plan.priceAnnual && (
                        <div className="text-xs text-green-600 mt-1">
                          Billed annually (₹{Math.round(plan.priceAnnual / 12)}/month)
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-xs text-emerald-600 mb-4">
                    <span>5% helps fund education for underprivileged students</span>
                  </div>
                  
                  <Button
                    className={`w-full ${plan.highlighted ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}`}
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => onSelectPlan(plan, false)}
                    disabled={isCurrentPlan(plan.id)}
                  >
                    {isCurrentPlan(plan.id) 
                      ? 'Current Plan' 
                      : plan.buttonText || 'Select Plan'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Group Plans</h2>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
              <Users className="h-3 w-3 mr-1" />
              Teams
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground mt-1.5 h-12">{plan.description}</p>
                  
                  <div className="mt-4 mb-3">
                    {getPriceDisplay(plan.price, plan.priceAnnual)}
                    {selectedPeriod === 'annual' && plan.priceAnnual && (
                      <div className="text-xs text-green-600 mt-1">
                        Billed annually (₹{Math.round(plan.priceAnnual / 12)}/month)
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-purple-600 mb-3">
                    For up to {plan.maxMembers} members
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-xs text-emerald-600 mb-4">
                    <span>5% helps fund education for underprivileged students</span>
                  </div>
                  
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => onSelectPlan(plan, true)}
                    disabled={isCurrentPlan(plan.id)}
                  >
                    {isCurrentPlan(plan.id) ? 'Current Plan' : 'Select Group Plan'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-blue-800 dark:text-blue-300 font-medium">Need help choosing?</p>
          <p className="text-blue-600 dark:text-blue-400">
            Contact our support team for personalized recommendations based on your exam needs.
          </p>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>We support UN Sustainability goals - inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
