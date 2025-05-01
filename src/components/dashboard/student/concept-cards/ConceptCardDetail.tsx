
import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { ChevronLeft, Book, BookOpen } from 'lucide-react';
import { ConceptsPageLayout } from './ConceptsPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conceptCard, loading } = useConceptCardDetails(id || '');
  const { toast } = useToast();

  // Function to navigate to the concept study page
  const handleStudyClick = () => {
    navigate(`/dashboard/student/concepts/${id}/study`);
    toast({
      title: "Loading study materials",
      description: "Preparing your personalized learning experience",
    });
  };

  // Function to mark concept as completed
  const handleMarkCompleted = () => {
    // In a real app, this would make an API call to update the status
    toast({
      title: "Concept marked as completed",
      description: "Your progress has been updated",
    });
  };

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
              <div className="flex items-center gap-2 mt-1 flex-wrap">
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
            <Button variant="default" onClick={handleMarkCompleted}>
              Mark as Completed
            </Button>
          )}
        </div>
        
        {/* Concept card content */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
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

        {/* Concept Analysis Section - New */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              Concept Mastery Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Recall Accuracy</h4>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: `${conceptCard.recallAccuracy || 65}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Last tested: 3 days ago</span>
                  <span>{conceptCard.recallAccuracy || 65}%</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Quiz Performance</h4>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${conceptCard.quizScore || 72}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Questions attempted: 15</span>
                  <span>{conceptCard.quizScore || 72}%</span>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2 text-gray-700">Learning Journey</h4>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">First studied</span>
                    <span className="text-sm">Review frequency</span>
                    <span className="text-sm">Last reviewed</span>
                  </div>
                  <div className="relative pt-2">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div className="bg-blue-500 h-full w-2/12 rounded-l"></div>
                      <div className="bg-blue-300 h-full w-5/12"></div>
                      <div className="bg-blue-500 h-full w-3/12"></div>
                      <div className="bg-gray-300 h-full w-2/12 rounded-r"></div>
                    </div>
                    <div className="absolute -top-1 left-[16.6%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <div className="absolute -top-1 left-[50%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <div className="absolute -top-1 left-[83.3%]">
                      <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2 weeks ago</span>
                    <span>4 times</span>
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">AI Learning Insights:</p>
              <p>This concept appears to be well-understood, but periodic review is recommended to maintain recall accuracy. Your quiz performance shows strong comprehension with room for improvement in application questions.</p>
            </div>
          </CardContent>
        </Card>

        {/* Study Button - Enhanced UI */}
        <div className="flex justify-center mt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={handleStudyClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            {conceptCard?.completed ? "Review Again" : "Start Learning"}
          </Button>
        </div>
          
        {/* Related concepts - Enhanced UI */}
        {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 16v-3a2 2 0 0 0-2-2H3v-2"/><path d="M8 9v3a2 2 0 0 0 2 2h11v2"/></svg>
              Related Concepts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCard.relatedConcepts.map((relatedId) => {
                const relatedCard = conceptCard && conceptCard.relatedConcepts 
                  ? conceptCard.relatedConcepts.find(c => c === relatedId) 
                  : null;
                  
                return (
                  <Card key={relatedId} className="hover:shadow-md transition-shadow border-l-4 border-blue-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Related Concept #{relatedId}</h4>
                      <p className="text-sm text-gray-600 mb-3">Explore this related concept to deepen your understanding</p>
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                        onClick={() => navigate(`/dashboard/student/concepts/card/${relatedId}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="m10 14 11-11"/></svg>
                        View Concept
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
