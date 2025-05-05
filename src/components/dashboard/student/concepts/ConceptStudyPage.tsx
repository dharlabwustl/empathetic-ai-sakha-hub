
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Redirect to the new ConceptCardStudyPage which has the better design
  return <Navigate to={`/dashboard/student/concepts/study/${conceptId}`} replace />;
};

export default ConceptStudyPage;
