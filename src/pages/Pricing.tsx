
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Users, Building2, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import { individualPlans, groupPlans } from "@/components/pricing/pricingData";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <PricingHero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="individual" className="max-w-6xl mx-auto mb-8">
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
                  {individualPlans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {groupPlans.map((plan, index) => (
                    <PricingCard key={index} {...plan} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

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

