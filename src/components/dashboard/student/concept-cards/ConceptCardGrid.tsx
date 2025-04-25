
import React from 'react';
import { ConceptCardItem } from '@/types/user/base';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, BookOpen, Clock, Volume2, FileText, Bookmark } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ConceptCardGridProps {
  concepts: ConceptCardItem[];
}

const ConceptCardGrid: React.FC<ConceptCardGridProps> = ({ concepts }) => {
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-yellow-500';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'hard': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {concepts.map((concept) => (
        <Card 
          key={concept.id}
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-l-4"
          style={{
            borderLeftColor: concept.status === 'completed' ? '#10b981' : 
                            concept.status === 'in-progress' ? '#f59e0b' : '#d1d5db'
          }}
        >
          <div className="p-4">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                {concept.subject}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {concept.topic}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(concept.difficulty)}`}>
                {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(concept.priority)}`}>
                {concept.priority.charAt(0).toUpperCase() + concept.priority.slice(1)} Priority
              </Badge>
            </div>
          
            <h4 className="font-medium text-base mb-1">{concept.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{concept.description}</p>
            
            {concept.progress !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{concept.progress}%</span>
                </div>
                <Progress value={concept.progress} className="h-1" />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{concept.timeAllocation} mins</span>
              </div>
              
              <div className="flex items-center gap-2">
                {concept.hasAudioNarration && <Volume2 className="h-4 w-4 text-indigo-500" />}
                {concept.hasNotes && <FileText className="h-4 w-4 text-blue-500" />}
                {concept.isBookmarked && <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />}
                <span className={`${getStatusColor(concept.status)}`}>
                  {concept.status === 'completed' ? '✅' : 
                   concept.status === 'in-progress' ? '🟡' : '⏳'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ConceptCardGrid;
