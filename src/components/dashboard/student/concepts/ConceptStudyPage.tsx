
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ConceptCardStudyPage from './ConceptCardStudyPage';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  // Use the unified ConceptCardStudyPage component
  return <ConceptCardStudyPage />;
};

export default ConceptStudyPage;
