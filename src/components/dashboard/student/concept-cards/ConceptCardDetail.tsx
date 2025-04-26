
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { ChevronLeft, Book } from 'lucide-react';
import { ConceptsPageLayout } from './ConceptsPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conceptCard, loading } = useConceptCardDetails(id || '');

  if (loading) {
    return (
      <ConceptsPageLayout>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </ConceptsPageLayout>
    );
  }

  if (!conceptCard) {
    return (
      <ConceptsPageLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Concept Card Not Found</h2>
          <p className="text-gray-600 mb-6">The concept card you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard/student/concepts">
            <Button variant="outline">Go Back to Concepts</Button>
          </Link>
        </div>
      </ConceptsPageLayout>
    );
  }

  const getDifficultyClass = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };

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
        
        {/* Concept card header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">{conceptCard.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{conceptCard.subject}</Badge>
                <Badge variant="outline">{conceptCard.chapter}</Badge>
                <Badge variant="outline" className={getDifficultyClass(conceptCard.difficulty)}>
                  {conceptCard.difficulty}
                </Badge>
                <Badge variant={conceptCard.completed ? "outline" : "default"}>
                  {conceptCard.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
          </div>
          
          {!conceptCard.completed && (
            <Button variant="default">
              Mark as Completed
            </Button>
          )}
        </div>
        
        {/* Concept card content */}
        <Card>
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg font-medium text-gray-700 mb-6">{conceptCard.description}</p>
              <div className="mt-8">{conceptCard.content}</div>
              
              {/* Examples section */}
              {conceptCard.examples && conceptCard.examples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Examples</h3>
                  <ul className="space-y-2">
                    {conceptCard.examples.map((example, index) => (
                      <li key={index} className="bg-blue-50 p-3 rounded-md">{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common mistakes section */}
              {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Common Mistakes to Avoid</h3>
                  <ul className="space-y-2">
                    {conceptCard.commonMistakes.map((mistake, index) => (
                      <li key={index} className="bg-red-50 p-3 rounded-md">{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Exam relevance section */}
              {conceptCard.examRelevance && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Exam Relevance</h3>
                  <div className="bg-purple-50 p-4 rounded-md">
                    {conceptCard.examRelevance}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
          
        {/* Related concepts */}
        {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Related Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCard.relatedConcepts.map((relatedId) => {
                const relatedCard = conceptCard && conceptCard.relatedConcepts 
                  ? conceptCard.relatedConcepts.find(c => c === relatedId) 
                  : null;
                  
                return (
                  <Card key={relatedId} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => navigate(`/dashboard/student/concepts/${relatedId}`)}
                      >
                        View Related Concept
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ConceptsPageLayout>
  );
};
