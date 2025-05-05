
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptCardStudyPage from '@/pages/dashboard/student/concept/ConceptCardStudyPage';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Now properly forwarding to the concept study page with the correct URL structure
  return <Navigate to={`/dashboard/student/concepts/${conceptId}/study`} replace />;
};

export default ConceptStudyPage;
