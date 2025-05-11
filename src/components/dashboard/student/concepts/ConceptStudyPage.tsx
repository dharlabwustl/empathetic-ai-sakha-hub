
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Redirect to the ConceptCardDetail page which has detailed view
  return <Navigate to={`/dashboard/student/concepts/card/${conceptId}`} replace />;
};

export default ConceptStudyPage;
