
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SubjectProgress } from "@/types/user/base";

export interface SubjectBreakdownSectionProps {
  subjects: SubjectProgress[];
}

const SubjectBreakdownSection: React.FC<SubjectBreakdownSectionProps> = ({ subjects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm text-muted-foreground">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{subject.completedConcepts}/{subject.totalConcepts} concepts</span>
                <span>{subject.timeSpent}h studied</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdownSection;
