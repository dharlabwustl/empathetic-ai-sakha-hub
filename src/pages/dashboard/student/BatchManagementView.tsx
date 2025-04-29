
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const BatchManagementView = () => {
  return (
    <SharedPageLayout 
      title="Batch Management" 
      subtitle="Manage your class and batch details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The BatchManagementView component is under development. Check back later for your batch details.
          </p>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default BatchManagementView;
