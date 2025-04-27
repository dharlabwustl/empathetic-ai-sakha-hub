
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useParams } from 'react-router-dom';

const ConceptsView: React.FC = () => {
  const { subject } = useParams<{ subject?: string }>();
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {subject ? `${subject} Concepts` : 'All Concepts'}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <p className="text-muted-foreground">
              Your concepts for {subject || 'all subjects'} will appear here.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptsView;
