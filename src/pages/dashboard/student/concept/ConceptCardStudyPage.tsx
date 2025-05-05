
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptCardStudyContent from '@/components/dashboard/student/concept-cards/ConceptCardStudyContent';
import LoadingState from '@/components/common/LoadingState';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useConceptCard } from '@/hooks/useConceptCard';

const ConceptCardStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const [loading, setLoading] = useState(true);
  
  // Get concept data
  const { conceptCard, isLoading, error } = useConceptCard(conceptId);
  
  useEffect(() => {
    // Log route for debugging
    console.log(`ConceptCardStudyPage mounted with conceptId: ${conceptId}`);
    
    if (!conceptId) {
      navigate('/dashboard/student/concepts');
      return;
    }
    
    // Simulate loading of concept data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [conceptId, navigate]);
  
  if (loading || isLoading) {
    return (
      <LoadingState message="Loading concept study content..." />
    );
  }
  
  if (error || !conceptCard) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="We couldn't find the concept you're looking for"
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">The concept may have been moved or deleted</p>
          <Button 
            variant="default" 
            onClick={() => navigate('/dashboard/student/concepts')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Button>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={`Study: ${conceptCard.title}`}
      subtitle={`${conceptCard.subject} - ${conceptCard.topic || 'Study Session'}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <ConceptCardStudyContent conceptCard={conceptCard} />
    </SharedPageLayout>
  );
};

export default ConceptCardStudyPage;
