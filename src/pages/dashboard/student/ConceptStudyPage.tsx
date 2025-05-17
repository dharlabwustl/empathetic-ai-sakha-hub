
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { toast } = useToast();
  
  useEffect(() => {
    if (conceptId) {
      toast({
        title: "Loading concept",
        description: "Preparing your study materials...",
      });
    }
  }, [conceptId, toast]);
  
  // Redirect to the concept detail page with the correct URL structure
  return <Navigate to={`/dashboard/student/concepts/${conceptId}`} replace />;
};

export default ConceptStudyPage;
