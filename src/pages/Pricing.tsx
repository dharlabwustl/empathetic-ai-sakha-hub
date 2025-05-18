
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

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

        {/* Donation Message Banner */}
        <div className="container mx-auto px-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-blue-800/30">
            <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-full">
                <Heart className="h-6 w-6 text-purple-500 dark:text-purple-300 fill-purple-200 dark:fill-purple-800" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-purple-600 dark:text-purple-300">Making a difference together</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We donate 5% of monthly subscription revenue to fund underprivileged students,
                  providing them free access to our platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

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
