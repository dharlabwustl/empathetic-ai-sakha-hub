
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Pricing Plans</h1>
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default PricingPage;
