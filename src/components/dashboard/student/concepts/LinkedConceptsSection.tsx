
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Brain, Clock } from 'lucide-react';

interface ConceptLink {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  masteryLevel: number;
  estimatedTime?: number;
}

interface LinkedConceptsSectionProps {
  conceptId: string;
  subject?: string;
  topic?: string;
  relatedConcepts?: ConceptLink[];
}

export const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({ 
  conceptId, 
  subject = "Physics",
  topic = "Mechanics",
  relatedConcepts = [] 
}) => {
  // This would typically come from your data fetching logic
  const mockRelatedConcepts: ConceptLink[] = [
    {
      id: 'concept-1',
      title: "Newton's First Law of Motion",
      description: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      subject: "Physics",
      difficulty: "medium",
      masteryLevel: 75,
      estimatedTime: 15
    },
    {
      id: 'concept-3',
      title: "Newton's Third Law of Motion",
      description: "For every action, there is an equal and opposite reaction.",
      subject: "Physics",
      difficulty: "medium",
      masteryLevel: 60,
      estimatedTime: 20
    },
    {
      id: 'concept-4',
      title: "Conservation of Momentum",
      description: "In a closed system, the total momentum remains constant if no external force acts on the system.",
      subject: "Physics",
      difficulty: "hard",
      masteryLevel: 45,
      estimatedTime: 25
    },
    {
      id: 'concept-5',
      title: "Kinetic Energy",
      description: "Energy possessed by an object due to its motion, calculated as 1/2 × mass × velocity².",
      subject: "Physics",
      difficulty: "medium",
      masteryLevel: 55,
      estimatedTime: 15
    }
  ];
  
  // We'll use the related concept IDs if available, or mock data for demonstration
  const conceptsToShow = relatedConcepts && relatedConcepts.length > 0 
    ? relatedConcepts
    : mockRelatedConcepts;
  
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/40';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/40';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/40';
      default: return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/40';
    }
  };
  
  const getMasteryColor = (level: number): string => {
    if (level >= 80) return 'text-green-600 dark:text-green-400';
    if (level >= 60) return 'text-blue-600 dark:text-blue-400';
    if (level >= 40) return 'text-amber-600 dark:text-amber-500';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getMasteryWidth = (level: number): string => {
    return `${level}%`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
          Related Concepts
        </h2>
        
        <div>
          <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/60">
            {subject}
          </Badge>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/60">
            {topic}
          </Badge>
        </div>
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
          {conceptsToShow.map((concept: ConceptLink) => (
            <Link to={`/dashboard/student/concepts/${concept.id}`} key={concept.id} className="transition-transform duration-300 hover:scale-[1.02]">
              <Card className="h-full hover:shadow-md transition-all duration-300 overflow-hidden border-l-4" style={{
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
                    
                    {concept.estimatedTime && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{concept.estimatedTime} min</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                    {concept.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {concept.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center">
                        <Brain className="h-3 w-3 mr-1.5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Mastery</span>
                      </div>
                      <span className={`text-xs font-medium ${getMasteryColor(concept.masteryLevel)}`}>
                        {concept.masteryLevel}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
                      <div 
                        className={`h-1.5 rounded-full ${
                          concept.masteryLevel >= 80 ? 'bg-green-500 dark:bg-green-500' :
                          concept.masteryLevel >= 60 ? 'bg-blue-500 dark:bg-blue-500' :
                          concept.masteryLevel >= 40 ? 'bg-amber-500 dark:bg-amber-500' :
                          'bg-red-500 dark:bg-red-500'
                        }`}
                        style={{ width: getMasteryWidth(concept.masteryLevel) }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/60">
                        {concept.subject}
                      </Badge>
                      
                      <Button variant="ghost" size="sm" className="text-blue-600 p-0 hover:text-blue-800 dark:text-blue-400 hover:bg-transparent">
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
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

export default LinkedConceptsSection;
