
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { SubscriptionPlan } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroup?: boolean) => {
    toast({
      title: "Plan Selected",
      description: `You selected the ${plan.name}. Please sign up to continue.`,
    });
    
    navigate("/signup", { state: { selectedPlan: plan, isGroup } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <PricingHero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <SubscriptionPlans 
              currentPlanId="" 
              onSelectPlan={handleSelectPlan}
              showGroupOption={true}
            />
          </div>
        </section>
        
        <FAQSection />
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  );
};

export default Pricing;
