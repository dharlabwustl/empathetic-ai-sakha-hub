
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Brain, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LinkedConceptsProps {
  conceptId: string;
  subject: string;
  topic: string;
}

const LinkedConceptsSection: React.FC<LinkedConceptsProps> = ({ conceptId, subject, topic }) => {
  const navigate = useNavigate();
  
  // Mock related concepts (in a real app, these would be fetched from an API)
  const relatedConcepts = [
    {
      id: 'concept-1',
      title: 'Cell Structure',
      description: 'Understanding the basic structure of cells',
      subject: subject,
      difficulty: 'easy' as const,
      estimatedTime: 15
    },
    {
      id: 'concept-2',
      title: 'Cell Functions',
      description: 'How cells carry out their specialized functions',
      subject: subject,
      difficulty: 'medium' as const,
      estimatedTime: 20
    },
    {
      id: 'concept-3',
      title: 'Cell Organelles',
      description: 'The specialized structures within cells',
      subject: subject,
      difficulty: 'hard' as const,
      estimatedTime: 25
    }
  ];
  
  const handleNavigateToConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Related Concepts</h2>
          <p className="text-muted-foreground">Explore related concepts to build a deeper understanding</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedConcepts.map((concept) => (
          <Card key={concept.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{concept.title}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {concept.description}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                <Clock className="h-3 w-3 mr-1" />
                <span>{concept.estimatedTime} min read</span>
                <span className="mx-2">•</span>
                <Brain className="h-3 w-3 mr-1" />
                <span>{subject}</span>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full text-sm" 
                onClick={() => handleNavigateToConcept(concept.id)}
              >
                Explore Concept <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" /> Load More Related Concepts
        </Button>
      </div>
    </div>
  );
};

export default LinkedConceptsSection;
