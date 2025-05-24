
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from 'lucide-react';

export interface SubjectBreakdownSectionProps {
  subjects: Array<{
    id: string;
    name: string;
    progress: number;
    color: string;
    timeSpent: number;
  }>;
}

const SubjectBreakdownSection: React.FC<SubjectBreakdownSectionProps> = ({ subjects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Subject Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{subject.name}</span>
                <span className="text-sm text-muted-foreground">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {subject.timeSpent}h studied this week
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdownSection;
