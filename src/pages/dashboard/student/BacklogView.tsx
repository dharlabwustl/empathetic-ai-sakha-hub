
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const BacklogView = () => {
  return (
    <SharedPageLayout 
      title="Backlog" 
      subtitle="Catch up on items you've missed"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The BacklogView component is under development. Check back later for your backlog items.
          </p>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default BacklogView;
