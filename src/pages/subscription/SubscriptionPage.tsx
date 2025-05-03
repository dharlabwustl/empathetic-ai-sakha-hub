
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlan } from '@/types/user/base';

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
        
        <SubscriptionPlans 
          currentPlanId={currentPlanId}
          onSelectPlan={handleSelectPlan}
        />
        
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
        </div>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
