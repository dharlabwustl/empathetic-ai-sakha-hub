
import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded ${
              difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
              difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' :
              'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
            }`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{subject} • {topic}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">{title}</h1>
        </div>
        
        <Button 
          variant={isBookmarked ? "default" : "outline"} 
          className={`flex items-center gap-1 ${isBookmarked ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          onClick={onBookmarkToggle}
        >
          <Bookmark className="h-4 w-4" />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ConceptHeader;
