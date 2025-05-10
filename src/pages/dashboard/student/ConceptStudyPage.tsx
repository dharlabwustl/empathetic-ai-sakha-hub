
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Now properly forwarding to the concept card detail page with the correct URL structure
  return <Navigate to={`/dashboard/student/concepts/card/${conceptId}`} replace />;
};

export default ConceptStudyPage;
