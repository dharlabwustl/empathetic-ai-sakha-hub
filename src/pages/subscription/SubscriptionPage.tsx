
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlan } from '@/types/user/base';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Current plan ID - in a real app, this would come from user profile
  const currentPlanId = 'free';
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroup: boolean) => {
    toast({
      title: "Subscription Selected",
      description: `You selected the ${plan.name} plan${isGroup ? ' (Group)' : ''}. This feature is coming soon.`
    });
  };
  
  const handleGoBack = () => {
    navigate('/dashboard/student');
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <button 
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
            onClick={handleGoBack}
          >
            Back to Dashboard
          </button>
        </div>
        
        {/* Donation Message Banner */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-blue-800/30">
          <CardContent className="flex items-center gap-4 p-4">
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
              <button 
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-md transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </CardContent>
        </Card>
        
        <SubscriptionPlans 
          currentPlanId={currentPlanId}
          onSelectPlan={handleSelectPlan}
        />
        
        {/* Credit Points Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4">Credit Points Top-up</h2>
          <p className="mb-4">Purchase credit points to use for premium features without subscribing to a plan.</p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">Starter Pack</h3>
                <p className="text-3xl font-bold mt-2">₹199</p>
                <p className="text-sm text-gray-500">100 Credits</p>
              </div>
              <button 
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => toast({
                  title: "Credits Selected",
                  description: "You selected the Starter Pack. This feature is coming soon."
                })}
              >
                Purchase
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">Value Pack</h3>
                <p className="text-3xl font-bold mt-2">₹499</p>
                <p className="text-sm text-gray-500">300 Credits</p>
                <p className="text-xs text-green-600 mt-1">Best Value</p>
              </div>
              <button 
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => toast({
                  title: "Credits Selected",
                  description: "You selected the Value Pack. This feature is coming soon."
                })}
              >
                Purchase
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">Power User</h3>
                <p className="text-3xl font-bold mt-2">₹999</p>
                <p className="text-sm text-gray-500">750 Credits</p>
                <p className="text-xs text-purple-600 mt-1">Most Popular</p>
              </div>
              <button 
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => toast({
                  title: "Credits Selected",
                  description: "You selected the Power User Pack. This feature is coming soon."
                })}
              >
                Purchase
              </button>
            </div>
          </div>
          
          {/* Reminder about donation */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>5% of all purchases helps fund free access for underprivileged students.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
