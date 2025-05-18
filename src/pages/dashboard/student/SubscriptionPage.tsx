
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import PaymentFlow from '@/components/subscription/PaymentFlow';
import { SubscriptionPlan } from '@/types/user/base';
import { Heart, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateUserProfile } = useAuth();
  
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isGroup, setIsGroup] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  // Get the current plan type from user profile
  const currentPlanId = user?.subscription?.planType?.toString() || 'free';
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroupPlan: boolean) => {
    console.log('Plan selected:', plan.name, isGroupPlan ? '(Group)' : '(Individual)');
    setSelectedPlan(plan);
    setIsGroup(isGroupPlan);
    setShowPayment(true);
    
    if (isGroupPlan) {
      toast({
        title: "Group Plan Selected",
        description: "You can invite team members after checkout"
      });
    }
  };
  
  const handleCancelPayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };
  
  const handlePurchaseComplete = (plan: SubscriptionPlan) => {
    // In a real app, this would typically happen via webhook
    // For demo purposes, we'll simulate updating the user profile
    
    if (user) {
      updateUserProfile({
        ...user,
        subscription: {
          planType: plan.type,
          startDate: new Date().toISOString(),
          expiryDate: new Date(new Date().setMonth(new Date().getMonth() + (plan.id.includes('annual') ? 12 : 1))).toISOString(),
          status: 'active',
          autoRenew: true,
        }
      });
    }
    
    toast({
      title: "Subscription Activated",
      description: `You are now subscribed to the ${plan.name} plan`
    });
    
    // Redirect to profile billing section
    navigate('/dashboard/student/profile', { state: { activeTab: 'billing' } });
  };

  // Define feature comparisons for different plans
  const featureComparison = [
    { name: "Access to all study materials", free: true, basic: true, premium: true, pro: true },
    { name: "Personalized study plan", free: false, basic: true, premium: true, pro: true },
    { name: "Unlimited practice tests", free: false, basic: true, premium: true, pro: true },
    { name: "Progress tracking", free: true, basic: true, premium: true, pro: true },
    { name: "AI-powered concept explanations", free: false, basic: false, premium: true, pro: true },
    { name: "24/7 AI tutor assistance", free: false, basic: false, premium: true, pro: true },
    { name: "Mock exams with detailed analysis", free: false, basic: false, premium: true, pro: true },
    { name: "Personalized weak area focus", free: false, basic: false, premium: false, pro: true },
    { name: "1-on-1 expert tutoring sessions", free: false, basic: false, premium: false, pro: true },
    { name: "Priority support", free: false, basic: false, premium: false, pro: true },
  ];
  
  return (
    <MainLayout>
      {showPayment && selectedPlan ? (
        <PaymentFlow 
          selectedPlan={selectedPlan}
          isGroupPlan={isGroup}
          onCancel={handleCancelPayment}
          onSuccess={handlePurchaseComplete}
        />
      ) : (
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Choose Your Plan</h1>
              <p className="text-muted-foreground">Select the perfect plan for your exam preparation journey</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student')}
            >
              Back to Dashboard
            </Button>
          </div>
          
          {/* 7 Days Free Trial Banner */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800/30">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400">🎉 Try Premium Free for 7 Days</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Experience all premium features with no commitment. Cancel anytime.
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        onClick={() => handleSelectPlan({
                          id: 'trial',
                          name: 'Premium Trial',
                          price: 0,
                          features: ['7-day full access to premium features', 'No payment required', 'Cancel anytime'],
                          type: 'trial'
                        }, false)}>
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <SubscriptionPlans
            currentPlanId={currentPlanId}
            onSelectPlan={handleSelectPlan}
          />

          {/* Feature Comparison Table */}
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>Compare features across different subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left">Feature</th>
                      <th className="py-4 px-6 text-center">Free</th>
                      <th className="py-4 px-6 text-center">Basic</th>
                      <th className="py-4 px-6 text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                          Popular
                        </Badge>
                        <div className="mt-1">Premium</div>
                      </th>
                      <th className="py-4 px-6 text-center">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/20' : ''}>
                        <td className="py-2 px-6">{feature.name}</td>
                        <td className="py-2 px-6 text-center">
                          {feature.free ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-2 px-6 text-center">
                          {feature.basic ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-2 px-6 text-center">
                          {feature.premium ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="py-2 px-6 text-center">
                          {feature.pro ? <Check className="mx-auto h-4 w-4 text-green-500" /> : <span className="text-gray-400">-</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                All plans include access to our mobile app, regular updates, and email support.
              </p>
              <p className="text-sm flex items-center text-pink-600 dark:text-pink-400">
                <Heart className="h-4 w-4 mr-1 fill-pink-200 dark:fill-pink-900" />
                We donate 5% of all subscriptions to provide free access for underprivileged students.
              </p>
            </CardFooter>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default SubscriptionPage;
