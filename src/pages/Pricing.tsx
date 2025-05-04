
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";

const Pricing = () => {
  // Dummy handler for subscription plans
  const handleSelectPlan = (plan: any, isGroup: boolean) => {
    console.log("Selected plan:", plan, "Is group:", isGroup);
    // In a production app, this would redirect to checkout or login
    window.alert(`Selected ${plan.name}. In a real app, this would proceed to checkout!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <PricingHero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <SubscriptionPlans 
              currentPlanId="free" 
              onSelectPlan={handleSelectPlan} 
            />
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <FeatureComparison />
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
