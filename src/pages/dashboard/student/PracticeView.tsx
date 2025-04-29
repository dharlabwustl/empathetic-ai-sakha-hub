
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const PracticeView = () => {
  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge with practice exams"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The PracticeView component is under development. Check back later for your personalized practice exams.
          </p>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeView;
