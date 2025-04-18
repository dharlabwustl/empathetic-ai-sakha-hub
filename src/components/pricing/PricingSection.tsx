
import React from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, Building } from "lucide-react";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import { individualPlans, groupPlans } from "./pricingData";

// Add planId to each plan object for easier handling
const enhancedIndividualPlans = individualPlans.map(plan => {
  const planId = plan.title.toLowerCase().replace(/\s+/g, '-');
  return { ...plan, planId };
});

const enhancedGroupPlans = groupPlans.map(plan => {
  const planId = `group-${plan.title.toLowerCase().replace(/\s+/g, '-')}`;
  return { ...plan, planId };
});

interface PricingSectionProps {
  currentPlan?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ currentPlan }) => {
  const { user } = useAuth();

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <Tabs defaultValue="individual" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <Users size={16} /> Individual
              </TabsTrigger>
              <TabsTrigger value="group" className="flex items-center gap-2">
                <Users size={16} /> Groups & Organizations
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="individual">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {enhancedIndividualPlans.map((plan, index) => (
                <SubscriptionPlanCard 
                  key={index} 
                  {...plan} 
                  planId={plan.planId}
                  isCurrentPlan={currentPlan === plan.planId}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="group">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {enhancedGroupPlans.map((plan, index) => (
                <SubscriptionPlanCard 
                  key={index} 
                  {...plan} 
                  planId={plan.planId}
                  isCurrentPlan={currentPlan === plan.planId}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingSection;
