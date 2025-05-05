
import React from 'react';
import { useParams } from 'react-router-dom';
import ConceptCardStudyPage from '@/pages/dashboard/student/concept/ConceptCardStudyPage';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  return (
    <ConceptCardStudyPage conceptId={conceptId || ''} />
  );
};

export default ConceptStudyPage;
