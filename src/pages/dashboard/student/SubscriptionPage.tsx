
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const SubscriptionPage = () => {
  return (
    <SharedPageLayout 
      title="Subscription" 
      subtitle="Manage your subscription details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The SubscriptionPage component is under development. Check back later to manage your subscription.
          </p>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default SubscriptionPage;
