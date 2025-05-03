
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ExamNamesBadge = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <div className="text-sm text-muted-foreground mr-1">Trusted by students preparing for:</div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Badge className="bg-green-600 hover:bg-green-700 px-3 py-1 text-white flex items-center gap-1.5">
          <span>NEET</span>
          <span className="bg-white text-green-600 text-xs px-1.5 py-0.5 rounded-full font-medium">
            Launched
          </span>
        </Badge>
      </div>
    </div>
  );
};

export default ExamNamesBadge;
