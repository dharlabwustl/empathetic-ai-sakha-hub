
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConceptDetailView from '@/components/dashboard/student/concept-detail/ConceptDetailView';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const isLoading = false; // Replace with actual loading state
  const error = null; // Replace with actual error state
  
  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };
  
  if (isLoading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (error) {
    return <ErrorState title="Error Loading Concept" message={error.toString()} />;
  }

  return (
    <SharedPageLayout
      title="Concept Details"
      subtitle="Master the fundamental concepts for your exam"
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <ConceptDetailView conceptId={conceptId} />
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
