
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const StudyPlanView: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Study Plan</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Long-term Study Plan</h2>
          <p className="text-muted-foreground">
            Your personalized study plan content will appear here. This page is still being enhanced.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudyPlanView;
