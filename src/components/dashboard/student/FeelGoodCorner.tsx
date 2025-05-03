
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const FeelGoodCorner: React.FC = () => {
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and boost your mood"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Feel Good Corner</h2>
        <p className="text-gray-600 mb-6">
          This is a space designed to help you relax, recharge, and boost your mood.
          Take a break from studying and explore activities that will help maintain
          your mental wellbeing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Daily Affirmations</h3>
            <p className="text-sm">Positive statements to boost your confidence</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium mb-2">Mindfulness Exercises</h3>
            <p className="text-sm">Quick exercises to center yourself</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium mb-2">Motivation Corner</h3>
            <p className="text-sm">Get inspired with quotes and stories</p>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
