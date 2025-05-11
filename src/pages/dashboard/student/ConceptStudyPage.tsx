
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
  }, [conceptId]);
  
  // Update routing to match Today's Plan flow - first to card view, then to detail
  return <Navigate to={`/dashboard/student/concepts/card/${conceptId}`} replace />;
};

export default ConceptStudyPage;
