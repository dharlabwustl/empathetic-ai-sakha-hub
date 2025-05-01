
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showNewPlanSelector, setShowNewPlanSelector] = useState(false);
  
  // Mock current subscription
  const currentSubscription = {
    planId: 'pro_monthly',
    name: 'Pro Plan (Monthly)',
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    status: 'Active',
    price: 999,
    autoRenew: true
  };
  
  const handleManageSubscription = () => {
    setShowNewPlanSelector(true);
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancellation",
      description: "Your subscription will remain active until the end of the billing period."
    });
  };
  
  const handleSelectPlan = (plan: any) => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${plan.name}. Redirecting to checkout...`
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate('/dashboard/student')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Current Subscription Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Current Subscription</CardTitle>
              <Badge variant="outline">{currentSubscription.status}</Badge>
            </div>
            <CardDescription>Your active subscription plan and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentSubscription.name}</h2>
                  <p className="text-muted-foreground">₹{currentSubscription.price}/month</p>
                </div>
                <Badge className="bg-green-500">Current</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Subscription Period</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(currentSubscription.startDate).toLocaleDateString()} - 
                      {new Date(currentSubscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Billing</p>
                    <p className="text-sm text-muted-foreground">
                      Next billing on {new Date(currentSubscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={handleCancelSubscription}>
                  Cancel Subscription
                </Button>
                <Button onClick={handleManageSubscription}>
                  Change Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Plan Selector */}
        {showNewPlanSelector ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose a New Plan</h2>
            <SubscriptionPlans 
              currentPlanId={currentSubscription.planId}
              onSelectPlan={handleSelectPlan}
            />
          </div>
        ) : (
          <div className="text-center">
            <Button onClick={() => setShowNewPlanSelector(true)}>
              View Available Plans
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
