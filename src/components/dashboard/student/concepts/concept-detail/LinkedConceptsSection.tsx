
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface LinkedConceptsSectionProps {
  conceptId: string;
  subject: string;
  topic: string;
}

const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({
  conceptId,
  subject,
  topic
}) => {
  const navigate = useNavigate();
  
  // In a real app, this would be fetched from your API
  const relatedConcepts = [
    {
      id: "c1",
      title: "Newton's First Law of Motion",
      description: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      subject: "Physics",
      topic: "Classical Mechanics",
      difficulty: "easy" as const
    },
    {
      id: "c2",
      title: "Newton's Third Law of Motion",
      description: "For every action, there is an equal and opposite reaction.",
      subject: "Physics", 
      topic: "Classical Mechanics",
      difficulty: "medium" as const
    },
    {
      id: "c3",
      title: "Conservation of Momentum",
      description: "The total momentum of a closed system remains constant if no external forces act on it.",
      subject: "Physics",
      topic: "Classical Mechanics",
      difficulty: "hard" as const
    }
  ];

  const handleConceptClick = (relatedConceptId: string) => {
    navigate(`/dashboard/student/concepts/${relatedConceptId}`);
  };
  
  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ArrowLeft className="h-5 w-5 mr-2 text-blue-600" />
        Related Concepts
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {relatedConcepts.map((concept) => (
          <Card 
            key={concept.id} 
            className="p-4 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-colors"
            onClick={() => handleConceptClick(concept.id)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-base">{concept.title}</h3>
                <Badge className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {concept.description}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50">
                  {concept.topic}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          Browse All Concepts
        </Button>
      </div>
    </div>
  );
};

export default LinkedConceptsSection;
