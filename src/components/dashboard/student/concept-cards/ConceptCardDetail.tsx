
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { ChevronLeft } from 'lucide-react';
import { ConceptsPageLayout } from './ConceptsPageLayout';

export const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conceptCard, loading } = useConceptCardDetails(id || '');

  if (loading || !conceptCard) {
    return <div>Loading...</div>;
  }

  return (
    <ConceptsPageLayout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/student/concepts')}
          className="group mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Concepts
        </Button>
        
        {/* Concept card content */}
        <div className="prose dark:prose-invert max-w-none">
          <h1>{conceptCard.title}</h1>
          <p>{conceptCard.description}</p>
          <div className="mt-8">{conceptCard.content}</div>
          
          {/* Related concepts */}
          {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
            <div className="mt-8">
              <h3>Related Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {conceptCard.relatedConcepts.map((relatedId) => (
                  <Button
                    key={relatedId}
                    variant="outline"
                    onClick={() => navigate(`/dashboard/student/concepts/${relatedId}`)}
                  >
                    View Related Concept
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ConceptsPageLayout>
  );
};
