
import React from 'react';
import { useParams } from 'react-router-dom';
import EnhancedConceptLandingPage from './EnhancedConceptLandingPage';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  return (
    <div className="container mx-auto">
      <EnhancedConceptLandingPage conceptId={conceptId} />
    </div>
  );
};

export default ConceptStudyPage;
