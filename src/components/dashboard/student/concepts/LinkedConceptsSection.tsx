
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';

interface LinkedConceptsSectionProps {
  conceptId: string;
  relatedConcepts?: string[];
}

export const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({ 
  conceptId, 
  relatedConcepts = [] 
}) => {
  // This would typically come from your data fetching logic
  const mockRelatedConcepts = [
    {
      id: '1',
      title: "Newton's First Law of Motion",
      description: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      subject: "Physics",
      difficulty: "medium",
      masteryLevel: 75
    },
    {
      id: '2',
      title: "Newton's Third Law of Motion",
      description: "For every action, there is an equal and opposite reaction.",
      subject: "Physics",
      difficulty: "medium",
      masteryLevel: 60
    },
    {
      id: '3',
      title: "Conservation of Momentum",
      description: "In a closed system, the total momentum remains constant if no external force acts on the system.",
      subject: "Physics",
      difficulty: "hard",
      masteryLevel: 45
    }
  ];
  
  // We'll use the related concept IDs if available, or mock data for demonstration
  const conceptsToShow = relatedConcepts && relatedConcepts.length > 0 
    ? relatedConcepts.map(id => {
        // Here you would normally fetch details for each concept ID
        const { conceptCard } = useConceptCardDetails(id);
        return conceptCard;
      }).filter(Boolean)
    : mockRelatedConcepts;
  
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  const getMasteryColor = (level: number): string => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-blue-600';
    if (level >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-blue-600" />
          Related Concepts
        </h2>
      </div>
      
      {conceptsToShow.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Related Concepts</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            There are no related concepts linked to this topic yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conceptsToShow.map((concept: any) => (
            <Link to={`/dashboard/student/concepts/${concept.id}`} key={concept.id}>
              <Card className="h-full hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] overflow-hidden border-l-4" style={{
                borderLeftColor: concept.difficulty === 'easy' 
                  ? '#22c55e' 
                  : concept.difficulty === 'medium' 
                    ? '#f59e0b' 
                    : '#ef4444'
              }}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                    </Badge>
                    
                    {'masteryLevel' in concept && (
                      <div className={`text-sm font-medium ${getMasteryColor(concept.masteryLevel)}`}>
                        {concept.masteryLevel}% Mastery
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {concept.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {concept.description}
                  </p>
                  
                  <div className="flex items-center mt-auto justify-between">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/60">
                      {concept.subject}
                    </Badge>
                    
                    <Button variant="ghost" size="sm" className="text-blue-600 p-0 hover:text-blue-800 hover:bg-transparent">
                      View <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
