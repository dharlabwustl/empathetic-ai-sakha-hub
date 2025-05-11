
import React from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FormulaLabComponent from '@/components/dashboard/student/formula-lab/FormulaLabComponent';

const FormulaLabPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  return (
    <SharedPageLayout
      title="Formula Practice Lab"
      subtitle="Master formulas through interactive practice and problem-solving"
      showBackButton={true}
      backButtonUrl={conceptId ? `/dashboard/student/concepts/card/${conceptId}` : '/dashboard/student/concepts'}
    >
      <FormulaLabComponent conceptId={conceptId} />
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
