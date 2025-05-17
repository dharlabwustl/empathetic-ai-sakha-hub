
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptCardDetail from '@/components/dashboard/student/concepts/ConceptCardDetail';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
  }, [conceptId]);
  
  // Now we render the ConceptCardDetail component directly
  return <ConceptCardDetail />;
};

export default ConceptStudyPage;
