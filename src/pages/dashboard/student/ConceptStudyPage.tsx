
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConceptCardDetail from '@/components/dashboard/student/concepts/ConceptCardDetail';
import { useToast } from '@/hooks/use-toast';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
  }, [conceptId]);
  
  // This component should render the ConceptCardDetail component and pass the conceptId
  return <ConceptCardDetail conceptId={conceptId} />;
};

export default ConceptStudyPage;
