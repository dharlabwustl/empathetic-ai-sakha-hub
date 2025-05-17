
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
  }, [conceptId]);
  
  // Redirect to the concept detail page with the correct URL structure
  return <Navigate to={`/dashboard/student/concepts/${conceptId}`} replace />;
};

export default ConceptStudyPage;
