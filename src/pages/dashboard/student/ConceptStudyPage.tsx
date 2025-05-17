
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptCardDetail from '@/components/dashboard/student/concepts/ConceptCardDetail';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
  }, [conceptId]);
  
  // This component should render the ConceptCardDetail component and pass the conceptId
  return <ConceptCardDetail conceptId={conceptId} />;
};

export default ConceptStudyPage;
