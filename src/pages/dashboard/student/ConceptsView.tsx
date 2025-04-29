
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptsSection from '@/components/dashboard/student/ConceptsSection';

const ConceptsView = () => {
  return (
    <SharedPageLayout 
      title="Concept Cards" 
      subtitle="Master key concepts with our interactive concept cards"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConceptsSection />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsView;
