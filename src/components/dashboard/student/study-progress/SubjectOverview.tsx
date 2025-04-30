
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from 'lucide-react';
import { SubjectProgress } from '@/types/student/studyProgress';

interface SubjectOverviewProps {
  subjects: SubjectProgress[];
}

const SubjectOverview: React.FC<SubjectOverviewProps> = ({ subjects }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Book className="h-5 w-5 mr-2" />
          Subject Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                  <h4 className="font-medium">{subject.name}</h4>
                </div>
                <div className="text-sm text-muted-foreground">
                  {subject.masteredConcepts}/{subject.totalConcepts} concepts
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectOverview;
