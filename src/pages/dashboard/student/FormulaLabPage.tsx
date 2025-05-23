
import React from 'react';
import { useParams } from 'react-router-dom';
import SidebarLayout from '@/components/dashboard/SidebarLayout';
import FormulaLabPage from '@/components/dashboard/student/concepts/FormulaLabPage';

const FormulaLabPageView = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  return (
    <SidebarLayout>
      <FormulaLabPage />
    </SidebarLayout>
  );
};

export default FormulaLabPageView;
