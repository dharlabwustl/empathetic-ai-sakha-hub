
import React from 'react';
import { useParams } from 'react-router-dom';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import DashboardLayout from '@/components/dashboard/layouts/DashboardLayout';
import { Helmet } from 'react-helmet-async';

const ConceptDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Concept Detail | PREPZR</title>
      </Helmet>
      <DashboardLayout>
        <EnhancedConceptDetail id={id} />
      </DashboardLayout>
    </>
  );
};

export default ConceptDetailPage;
