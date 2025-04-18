import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Users, Building2, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCard from "@/components/pricing/PricingCard";
import FAQSection from "@/components/pricing/FAQSection";
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

            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">Feature Access by Plan</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Free</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                        <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="py-3 text-sm font-medium">24/7 AI Tutor</td>
                        <td className="py-3 text-sm">5 questions/day</td>
                        <td className="py-3 text-sm">Unlimited</td>
                        <td className="py-3 text-sm">Unlimited + Priority</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Flashcards & Revision</td>
                        <td className="py-3 text-sm">50% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access + Advanced</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Video Library</td>
                        <td className="py-3 text-sm">20% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Concept Cards</td>
                        <td className="py-3 text-sm">40% content</td>
                        <td className="py-3 text-sm">Full access</td>
                        <td className="py-3 text-sm">Full access</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Mood Tracker</td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><Check className="text-green-500" size={16} /></td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Surrounding Influence</td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><X className="text-red-500" size={16} /></td>
                        <td className="py-3 text-sm"><Check className="text-green-500" size={16} /></td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm font-medium">Profile Analytics</td>
                        <td className="py-3 text-sm">Basic</td>
                        <td className="py-3 text-sm">Standard</td>
                        <td className="py-3 text-sm">Advanced</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
