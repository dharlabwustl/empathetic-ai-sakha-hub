
import React from 'react';
import { useParams } from 'react-router-dom';
import ConceptDetailView from '@/components/dashboard/student/concept-detail/ConceptDetailView';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const isLoading = false; // Replace with actual loading state
  const error = null; // Replace with actual error state
  
  if (isLoading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (error) {
    return <ErrorState title="Error Loading Concept" message={error.toString()} />;
  }

  return <ConceptDetailView conceptId={conceptId} />;
};

export default ConceptDetailPage;
