
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RevisionStats } from '@/types/student/dashboard';
import { BookOpen, FileText, Flag, ArrowClockwise } from 'lucide-react';

interface RevisionLoopSectionProps {
  revisionStats: RevisionStats;
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionStats }) => {
  const revisionItems = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-500" />,
      label: "Pending Review Concepts",
      value: revisionStats.pendingReviewConcepts,
      color: "text-blue-600 dark:text-blue-400",
      action: "Review Concepts",
      colorClass: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <FileText className="h-10 w-10 text-amber-500" />,
      label: "Low Retention Flashcards",
      value: revisionStats.lowRetentionFlashcards,
      color: "text-amber-600 dark:text-amber-400",
      action: "Practice Flashcards",
      colorClass: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: <Flag className="h-10 w-10 text-red-500" />,
      label: "Flagged Items for Revisit",
      value: revisionStats.flaggedItems,
      color: "text-red-600 dark:text-red-400",
      action: "Review Flagged",
      colorClass: "bg-red-50 dark:bg-red-900/20"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowClockwise className="h-5 w-5 mr-2 text-violet-600" />
          Revision Loop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {revisionItems.map((item, index) => (
            <div key={index} className={`rounded-lg p-4 ${item.colorClass}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.label}</h4>
                    <p className={`text-2xl font-bold ${item.color}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-gradient-to-r from-blue-500 to-violet-500" : ""}
                >
                  {item.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <ArrowClockwise className="h-4 w-4 mr-1" /> View All Pending Revisions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RevisionLoopSection;
