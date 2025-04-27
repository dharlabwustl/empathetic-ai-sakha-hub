
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FeelGoodCorner from '@/components/dashboard/student/feel-good-corner/FeelGoodCorner';

const FeelGoodCornerPage = () => {
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a moment to relax, reflect, and refresh your mind"
    >
      <div className="max-w-3xl mx-auto">
        <FeelGoodCorner />
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
          <h2 className="text-lg font-medium mb-2">Why Take Breaks?</h2>
          <p className="text-sm mb-4">
            Research shows that taking short mental breaks can improve focus, retention, and overall productivity.
            It helps your brain process and consolidate information you've been studying.
          </p>
          
          <h3 className="font-medium mb-2">Benefits of Mental Refreshers:</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Reduced mental fatigue and stress</li>
            <li>Improved information retention</li>
            <li>Enhanced creative problem-solving</li>
            <li>Better focus when you return to studying</li>
            <li>Improved emotional well-being</li>
          </ul>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
