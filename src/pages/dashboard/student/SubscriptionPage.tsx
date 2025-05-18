
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import PaymentFlow from '@/components/subscription/PaymentFlow';
import { SubscriptionPlan } from '@/types/user/base';
import { Heart } from 'lucide-react';

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
                  <div className="flex items-center gap-1 mt-2">
                    <Heart className="h-4 w-4 text-pink-500 fill-pink-200 dark:fill-pink-900" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Making a difference:</span> 5% of subscriptions fund free access for underprivileged students.
                    </p>
                  </div>
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
        </div>
      )}
    </MainLayout>
  );
};

export default SubscriptionPage;
