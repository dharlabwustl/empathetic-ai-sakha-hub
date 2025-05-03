
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGoBack = () => {
    navigate('/dashboard/student');
  };
  
  const handleSelectPlan = (plan: string) => {
    toast({
      title: "Subscription Selected",
      description: `You selected the ${plan} plan. This feature is coming soon.`
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <Button 
            variant="outline" 
            onClick={handleGoBack}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 border-2 hover:border-blue-500 transition-all">
            <h2 className="text-xl font-bold mb-2">Free Plan</h2>
            <p className="text-3xl font-bold mb-4">₹0</p>
            <ul className="space-y-2 mb-6">
              <li>✓ Basic study plans</li>
              <li>✓ Limited flashcards</li>
              <li>✓ 5 practice questions/day</li>
            </ul>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => handleSelectPlan('Free')}
            >
              Current Plan
            </Button>
          </Card>
          
          <Card className="p-6 border-2 border-blue-200 hover:border-blue-500 transition-all">
            <h2 className="text-xl font-bold mb-2">Premium</h2>
            <p className="text-3xl font-bold mb-4">₹299<span className="text-sm font-normal">/month</span></p>
            <ul className="space-y-2 mb-6">
              <li>✓ Advanced study plans</li>
              <li>✓ Unlimited flashcards</li>
              <li>✓ Unlimited practice questions</li>
              <li>✓ AI tutor access</li>
            </ul>
            <Button 
              className="w-full"
              onClick={() => handleSelectPlan('Premium')}
            >
              Upgrade Now
            </Button>
          </Card>
          
          <Card className="p-6 border-2 border-purple-200 hover:border-purple-500 transition-all">
            <h2 className="text-xl font-bold mb-2">Pro</h2>
            <p className="text-3xl font-bold mb-4">₹2499<span className="text-sm font-normal">/year</span></p>
            <ul className="space-y-2 mb-6">
              <li>✓ Everything in Premium</li>
              <li>✓ 1-on-1 coaching sessions</li>
              <li>✓ Personalized study path</li>
              <li>✓ Exam strategy sessions</li>
              <li>✓ 2 months free</li>
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => handleSelectPlan('Pro')}
            >
              Best Value
            </Button>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
