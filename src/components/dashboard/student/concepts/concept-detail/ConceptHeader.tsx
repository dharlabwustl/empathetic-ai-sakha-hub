
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ConceptCard } from '@/types/user/conceptCard';

export interface ConceptHeaderProps {
  concept: ConceptCard;
}

const ConceptHeader: React.FC<ConceptHeaderProps> = ({ concept }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{concept.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200">
              {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-purple-200">
              {concept.difficulty}
            </Badge>
            {concept.examRelevance && (
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200">
                {concept.examRelevance} Exam Relevance
              </Badge>
            )}
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {concept.description || `A comprehensive overview of ${concept.title}, covering all key aspects and applications.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConceptHeader;
