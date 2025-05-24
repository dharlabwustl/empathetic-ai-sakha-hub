
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SubjectProgress } from "@/types/user/base";

interface ProgressTrackerSectionProps {
  subjects?: SubjectProgress[];
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ 
  subjects = [] 
}) => {
  const mockSubjects: SubjectProgress[] = subjects.length > 0 ? subjects : [
    {
      id: 'physics',
      subject: 'Physics',
      totalConcepts: 50,
      completedConcepts: 35,
      progress: 70,
      timeSpent: 48,
      lastActivity: '2 hours ago',
      streak: 5,
      averageScore: 85,
      conceptsThisWeek: 8,
      improvementRate: 12
    },
    {
      id: 'chemistry',
      subject: 'Chemistry',
      totalConcepts: 45,
      completedConcepts: 20,
      progress: 44,
      timeSpent: 32,
      lastActivity: '1 day ago',
      streak: 3,
      averageScore: 78,
      conceptsThisWeek: 5,
      improvementRate: 8
    },
    {
      id: 'mathematics',
      subject: 'Mathematics',
      totalConcepts: 60,
      completedConcepts: 42,
      progress: 70,
      timeSpent: 56,
      lastActivity: '3 hours ago',
      streak: 7,
      averageScore: 92,
      conceptsThisWeek: 10,
      improvementRate: 15
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSubjects.map((subject) => (
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

export default ProgressTrackerSection;
