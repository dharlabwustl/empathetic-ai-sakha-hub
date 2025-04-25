
import React from 'react';
import { Clock, Volume2, FileText, Bookmark } from 'lucide-react';

interface CardFooterProps {
  timeAllocation: number;
  hasAudioNarration: boolean;
  hasNotes: boolean;
  isBookmarked: boolean;
  status: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
  timeAllocation,
  hasAudioNarration,
  hasNotes,
  isBookmarked,
  status
}) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return '✅';
      case 'in-progress': return '🟡';
      default: return '⏳';
    }
  };

  return (
    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Clock className="h-3 w-3" />
        <span>{timeAllocation} mins</span>
      </div>
      
      <div className="flex items-center gap-2">
        {hasAudioNarration && <Volume2 className="h-4 w-4 text-indigo-500" />}
        {hasNotes && <FileText className="h-4 w-4 text-blue-500" />}
        {isBookmarked && <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />}
        <span>{getStatusIcon(status)}</span>
      </div>
    </div>
  );
};

export default CardFooter;
