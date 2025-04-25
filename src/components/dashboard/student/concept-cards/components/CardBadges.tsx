
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CardBadgesProps {
  subject: string;
  topic: string;
  difficulty: string;
  priority: string;
  isPremium?: boolean;
}

const CardBadges: React.FC<CardBadgesProps> = ({
  subject,
  topic,
  difficulty,
  priority,
  isPremium
}) => {
  // Helper functions moved from ConceptCard
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
        {subject}
      </Badge>
      <Badge variant="outline" className="text-xs">
        {topic}
      </Badge>
      <Badge variant="outline" className={`text-xs ${getDifficultyColor(difficulty)}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Badge>
      <Badge variant="outline" className={`text-xs ${getPriorityColor(priority)}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
      </Badge>
      {isPremium && (
        <Badge variant="outline" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-300">
          Premium
        </Badge>
      )}
    </div>
  );
};

export default CardBadges;
