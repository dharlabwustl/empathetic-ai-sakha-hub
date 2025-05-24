
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubjectProgress } from "@/types/user/base";

interface TopicsListProps {
  selectedSubject: SubjectProgress | null;
  subjects: SubjectProgress[];
  selectSubject: (subjectId: string) => void;
}

export const TopicsList: React.FC<TopicsListProps> = ({
  selectedSubject,
  subjects,
  selectSubject
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Topic Mastery</h3>
        <Select value={selectedSubject?.id || ''} onValueChange={selectSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Topics Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedSubject && (
              <div>
                <h4 className="font-medium">{selectedSubject.subject}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSubject.completedConcepts}/{selectedSubject.totalConcepts} concepts completed
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
