
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingHero from "@/components/pricing/PricingHero";
import FAQSection from "@/components/pricing/FAQSection";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GroupPlanInviteModal from "@/components/subscription/GroupPlanInviteModal";

const Pricing = () => {
  const navigate = useNavigate();
  const [showGroupModal, setShowGroupModal] = useState(false);
  
  const handleGroupPlan = () => {
    setShowGroupModal(true);
  };
  
  const handleGroupPlanComplete = (emails: string[], inviteCodes: string[]) => {
    // If user is not logged in, direct them to signup first
    // In a real app, this would store the emails and codes temporarily
    // After signup/login, they would be redirected to checkout
    
    setShowGroupModal(false);
    
    const queryParams = new URLSearchParams({
      emails: emails.join(','),
      codes: inviteCodes.join(','),
      plan: 'group'
    }).toString();
    
    navigate(`/signup?${queryParams}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <PricingHero />

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Select the perfect plan for your educational journey, whether you're studying alone or with friends.
              </p>
            </div>
            
            <SubscriptionPlans />
            
            {/* Group Plan Special Section */}
            <div className="mt-16 max-w-5xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
                <div className="md:flex">
                  <CardHeader className="md:w-2/3">
                    <CardTitle className="text-2xl flex items-center">
                      <Users className="mr-2" /> Group Learning Advantage
                    </CardTitle>
                    <CardDescription className="text-base dark:text-gray-300">
                      Study together and save with our special group plans. Perfect for friends preparing for the same exam.
                    </CardDescription>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <span className="font-medium">10% discount per user</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Save when you sign up as a group</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <span className="font-medium">Batch leader dashboard</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Track progress of all group members</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <span className="font-medium">Collaborative features</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Share notes and study resources</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="md:w-1/3 flex flex-col justify-center items-center p-6">
                    <div className="text-center mb-4">
                      <div className="text-lg font-medium">Group Pro Plan (5 Users)</div>
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-3xl font-bold">₹4,499</span>
                        <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">₹899 per user (Save ₹500/user)</div>
                    </div>
                    
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handleGroupPlan}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Start Group Plan
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        <FeatureComparison />
        
        <FAQSection />
      </main>
      <Footer />
      <FloatingAvatar />
      
      {showGroupModal && (
        <GroupPlanInviteModal
          plan={{
            id: 'group-pro',
            name: 'Group Pro Plan',
            price: 4499,
            userCount: 5
          }}
          onClose={() => setShowGroupModal(false)}
          onComplete={handleGroupPlanComplete}
        />
      )}
    </div>
  );
};

export default Pricing;
