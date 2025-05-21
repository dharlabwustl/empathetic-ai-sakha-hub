
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ArrowRight, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LinkedConceptsSectionProps {
  conceptId: string;
  subject: string;
  topic: string;
}

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
  topic: string;
  relationship: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({
  conceptId,
  subject,
  topic
}) => {
  const navigate = useNavigate();
  
  // Mock data for related concepts - in a real app this would come from an API
  const relatedConcepts: RelatedConcept[] = [
    {
      id: 'concept-2',
      title: 'Force and Motion',
      subject: 'Physics',
      topic: 'Mechanics',
      relationship: 'Prerequisite',
      difficulty: 'easy'
    },
    {
      id: 'concept-3',
      title: 'Conservation of Energy',
      subject: 'Physics',
      topic: 'Mechanics',
      relationship: 'Next Concept',
      difficulty: 'medium'
    },
    {
      id: 'concept-4',
      title: 'Momentum Conservation',
      subject: 'Physics',
      topic: 'Mechanics',
      relationship: 'Related',
      difficulty: 'medium'
    },
    {
      id: 'concept-5',
      title: 'Circular Motion',
      subject: 'Physics',
      topic: 'Mechanics',
      relationship: 'Advanced',
      difficulty: 'hard'
    }
  ];
  
  const handleNavigateToConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };
  
  // Get badge color based on difficulty
  const getDifficultyBadgeColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30';
      default:
        return '';
    }
  };
  
  // Get badge color based on relationship
  const getRelationshipBadgeColor = (relationship: string) => {
    switch (relationship) {
      case 'Prerequisite':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30';
      case 'Next Concept':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30';
      case 'Related':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/30';
      case 'Advanced':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30';
      default:
        return '';
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-4">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-800/40 p-2 rounded-lg">
            <Network className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-300 mb-1">
              Connected Concepts
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              These concepts are related to what you're currently studying. Understanding the connections will help you build a stronger knowledge foundation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedConcepts.map(concept => (
          <Card 
            key={concept.id}
            className="border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className={`${getRelationshipBadgeColor(concept.relationship)}`}>
                  {concept.relationship}
                </Badge>
                <Badge variant="outline" className={`${getDifficultyBadgeColor(concept.difficulty)}`}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
              </div>
              
              <h3 className="font-medium text-lg mb-2">{concept.title}</h3>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {concept.subject} &gt; {concept.topic}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
                onClick={() => handleNavigateToConcept(concept.id)}
              >
                <RefreshCw className="h-4 w-4" />
                View Concept
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkedConceptsSection;
