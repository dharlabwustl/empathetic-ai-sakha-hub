
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Clock, Target } from 'lucide-react';

export interface StudyStatsSectionProps {
  subjects: Array<{
    name: string;
    progress: number;
    timeSpent: number;
  }>;
  conceptCards: {
    mastered: number;
    total: number;
    recentlyAdded: number;
  };
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ subjects, conceptCards }) => {
  const totalTimeSpent = subjects.reduce((acc, subject) => acc + subject.timeSpent, 0);
  const averageProgress = subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Study Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTimeSpent}h</div>
              <div className="text-xs text-muted-foreground">Total Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(averageProgress)}%</div>
              <div className="text-xs text-muted-foreground">Average Progress</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Concept Cards Mastered</span>
              <span className="text-sm text-muted-foreground">
                {conceptCards.mastered}/{conceptCards.total}
              </span>
            </div>
            <Progress value={(conceptCards.mastered / conceptCards.total) * 100} className="h-2" />
          </div>
          
          <div className="text-xs text-muted-foreground">
            {conceptCards.recentlyAdded} new cards added this week
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStatsSection;
