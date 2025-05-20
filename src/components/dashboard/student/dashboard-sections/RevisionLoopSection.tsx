
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, AlertTriangle, Check, Clock, Brain, Star, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'quiz';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  retentionScore: number;
}

interface RevisionLoopSectionProps {
  revisionItems: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionItems }) => {
  // Helper function to get proper badge for each priority level
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Helper function to get icon based on revision item type
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'concept':
        return <div className="bg-blue-100 text-blue-700 p-1.5 rounded-md"><Brain className="h-4 w-4" /></div>;
      case 'flashcard':
        return <div className="bg-purple-100 text-purple-700 p-1.5 rounded-md"><Star className="h-4 w-4" /></div>;
      case 'quiz':
        return <div className="bg-green-100 text-green-700 p-1.5 rounded-md"><RotateCw className="h-4 w-4" /></div>;
      default:
        return <div className="bg-gray-100 text-gray-700 p-1.5 rounded-md"><RotateCw className="h-4 w-4" /></div>;
    }
  };

  return (
    <Card className="border-gradient-amber shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-t-lg">
        <div className="flex items-center">
          <div className="bg-amber-500/10 p-2 rounded-full mr-3">
            <Brain className="h-5 w-5 text-amber-500" />
          </div>
          <CardTitle className="text-lg font-medium">Spaced Revision</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-100/50 dark:hover:bg-amber-900/50">
          View All
        </Button>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="text-sm text-muted-foreground mb-4 px-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500" />
            <span>Smart revision recommendations based on your learning patterns</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {revisionItems && revisionItems.length > 0 ? (
            revisionItems.map(item => (
              <div 
                key={item.id}
                className="p-4 border rounded-xl bg-gradient-to-r from-amber-50/70 to-white dark:from-amber-900/20 dark:to-gray-800/60 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subject}</div>
                    </div>
                  </div>
                  {getPriorityBadge(item.priority)}
                </div>
                
                <div className="flex flex-wrap items-center justify-between text-xs mt-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1 text-amber-500" />
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="text-muted-foreground">Retention:</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.retentionScore < 50 ? 'bg-red-500' : 
                            item.retentionScore < 75 ? 'bg-amber-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${item.retentionScore}%` }}
                        />
                      </div>
                      <span className={`ml-2 font-medium ${
                        item.retentionScore < 50 ? 'text-red-500' : 
                        item.retentionScore < 75 ? 'text-amber-500' : 
                        'text-green-500'
                      }`}>
                        {item.retentionScore}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="default" className="text-xs h-8 bg-amber-500 hover:bg-amber-600">
                    Review Now
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 px-4 rounded-lg bg-amber-50/50 dark:bg-amber-900/10">
              <div className="flex justify-center mb-3">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">No revision items due</p>
              <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-100/50">
                <Check className="mr-1 h-4 w-4" />
                All caught up!
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <style>{`
        .border-gradient-amber {
          border-top: 1px solid #fef3c7;
          border-left: 1px solid #fef3c7;
          border-right: 1px solid rgba(251, 191, 36, 0.1);
          border-bottom: 1px solid rgba(251, 191, 36, 0.1);
        }
      `}</style>
    </Card>
  );
};

export default RevisionLoopSection;
