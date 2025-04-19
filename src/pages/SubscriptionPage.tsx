
import React from 'react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Your Subscription</h1>
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default SubscriptionPage;
