
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from 'framer-motion';

interface ConceptHeaderProps {
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const ConceptHeader: React.FC<ConceptHeaderProps> = ({
  title,
  subject,
  topic,
  difficulty,
  isBookmarked,
  onBookmarkToggle
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50">
              {subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/50">
              {topic}
            </Badge>
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
        </div>
        <button 
          className="h-8 w-8 flex items-center justify-center rounded-full"
          onClick={onBookmarkToggle}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Star 
            className={`h-6 w-6 ${isBookmarked 
              ? 'text-amber-500 fill-amber-500' 
              : 'text-gray-400 dark:text-gray-500'}`} 
          />
        </button>
      </div>
    </motion.div>
  );
};

export default ConceptHeader;
