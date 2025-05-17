
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("Pages/ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Navigate to the correct path format
      navigate(`/dashboard/student/concepts/${conceptId}`, { replace: true });
      
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
    }
  }, [conceptId, navigate, toast]);
  
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
        <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
      </div>
    </div>
  );
};

export default ConceptStudyPage;
