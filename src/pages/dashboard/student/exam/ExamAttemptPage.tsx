
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const ExamAttemptPage = () => {
  return (
    <SharedPageLayout 
      title="Attempt Exam" 
      subtitle="Good luck on your exam!"
      showQuickAccess={false}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-gray-500">
          The ExamAttemptPage component is under development. Check back later to attempt your exams.
        </p>
      </div>
    </SharedPageLayout>
  );
};

export default ExamAttemptPage;
