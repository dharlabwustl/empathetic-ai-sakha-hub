
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Navigate directly to the concept card detail page
      navigate(`/dashboard/student/concepts/card/${conceptId}`, { replace: true });
      
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
    }
  }, [conceptId, navigate, toast]);
  
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-primary">Loading Concept</h2>
        <p className="text-muted-foreground mt-2">Please wait while we prepare your study materials...</p>
      </div>
    </div>
  );
};

export default ConceptStudyPage;
