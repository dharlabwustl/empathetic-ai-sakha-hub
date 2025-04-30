
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { RevisionItem } from '@/types/user/dashboard';

export interface RevisionLoopSectionProps {
  items: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ items }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-5 w-5 text-violet-600 mr-2" />
          <h3 className="text-lg font-medium">Revision Loop</h3>
        </div>
        
        {items && items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-800/30 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.category}</div>
                </div>
                <div className="text-xs">
                  <span className={`inline-flex px-2 py-1 rounded-full ${
                    item.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    item.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No revision items scheduled yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
