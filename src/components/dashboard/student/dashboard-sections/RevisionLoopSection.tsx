
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RepeatIcon, Clock, Brain, BookOpenCheck } from 'lucide-react';

interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  lastReviewed: string;
  retentionScore: number;
  dueDate: string;
}

export interface RevisionLoopSectionProps {
  revisionItems: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionItems }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <RepeatIcon className="mr-2 h-5 w-5 text-violet-500" />
          <CardTitle className="text-lg font-medium">Spaced Revision Loop</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-violet-500 hover:text-violet-600">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Review these items based on your retention scores to strengthen your memory
        </div>
        
        <div className="space-y-3">
          {revisionItems.map(item => (
            <div 
              key={item.id}
              className="p-3 border rounded-lg bg-gradient-to-r from-violet-50/60 to-white dark:from-violet-900/10 dark:to-gray-800/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{item.title}</div>
                <span className="text-xs bg-violet-100 text-violet-800 rounded-full px-2 py-0.5">
                  {item.subject}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last: {item.lastReviewed}
                </div>
                
                <div className="flex items-center">
                  <Brain className="h-3 w-3 mr-1" />
                  Retention: {item.retentionScore}%
                </div>
                
                <div className="flex items-center">
                  <BookOpenCheck className="h-3 w-3 mr-1" />
                  Due: {item.dueDate}
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t flex justify-end">
                <Button size="sm" variant="ghost" className="h-7 text-xs">Skip</Button>
                <Button size="sm" className="h-7 text-xs ml-2">Review Now</Button>
              </div>
            </div>
          ))}
          
          {revisionItems.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No revision items due at the moment
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
