
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("Pages/ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Show toast notification
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
      
      // In a real app, fetch concept data from API here
      // For now, simulate loading and use mock data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      console.error("ConceptStudyPage: Missing conceptId parameter");
      navigate('/dashboard/student/concepts', { replace: true });
    }
  }, [conceptId, navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  // Use the ConceptCardDetailPage component to display the concept details
  return <ConceptCardDetailPage conceptId={conceptId} />;
};

export default ConceptStudyPage;
