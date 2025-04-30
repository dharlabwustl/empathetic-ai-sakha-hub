
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, BookOpen, Star, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RevisionLoopSectionProps {
  // Add proper typing when available
}

const RevisionLoopSection = ({}: RevisionLoopSectionProps) => {
  // Mock revision data
  const revisionItems = [
    {
      id: '1',
      type: 'concept',
      title: 'Newton\'s Laws of Motion',
      dueDate: '2h ago',
      isOverdue: true,
      icon: <BookOpen className="h-4 w-4 text-blue-500" />
    },
    {
      id: '2',
      type: 'flashcard',
      title: 'Chemical Bonding',
      dueDate: 'Today',
      isOverdue: false,
      icon: <Star className="h-4 w-4 text-purple-500" />
    },
    {
      id: '3',
      type: 'concept',
      title: 'Integration Techniques',
      dueDate: 'Tomorrow',
      isOverdue: false,
      icon: <BookOpen className="h-4 w-4 text-blue-500" />
    },
    {
      id: '4',
      type: 'practice',
      title: 'Thermodynamics Quiz',
      dueDate: '2 days',
      isOverdue: false,
      icon: <FileText className="h-4 w-4 text-green-500" />
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-purple-500" />
          Spaced Revision
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {revisionItems.map(item => (
            <div 
              key={item.id}
              className={`p-3 border rounded-lg flex items-center gap-3 ${
                item.isOverdue ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="p-2 rounded-full bg-white dark:bg-gray-700">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className={`text-xs ${
                  item.isOverdue ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  Due: {item.dueDate}
                </div>
              </div>
              <Button 
                size="sm" 
                variant={item.isOverdue ? "destructive" : "outline"}
                className="shrink-0"
              >
                Revise
              </Button>
            </div>
          ))}
          
          <div className="pt-2 flex justify-center">
            <Button variant="outline" size="sm">
              View All Due Items
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
