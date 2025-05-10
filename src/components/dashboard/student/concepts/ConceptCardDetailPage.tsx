
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptCardStudyPage from './ConceptCardStudyPage';

// This component just redirects to the uniform ConceptCardStudyPage
const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Directly render the unified ConceptCardStudyPage
  return <ConceptCardStudyPage />;
};

export default ConceptCardDetailPage;
