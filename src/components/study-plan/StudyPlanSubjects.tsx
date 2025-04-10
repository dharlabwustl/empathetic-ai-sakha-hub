
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ExtendedSubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  expectedMastery: string;
}

interface StudyPlanSubjectsProps {
  subjects: ExtendedSubjectProgress[];
  isEditing: boolean;
}

const StudyPlanSubjects = ({ subjects, isEditing }: StudyPlanSubjectsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold mb-4">Your Subjects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map(subject => (
          <div 
            key={subject.id}
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-lg">{subject.name}</h4>
              <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200">
                {subject.progress}%
              </Badge>
            </div>
            <Progress value={subject.progress} className="h-2 mb-2" />
            <div className="text-sm text-muted-foreground">
              <p>Topics: {subject.totalTopics} · Completed: {subject.completedTopics}</p>
              <p className="mt-1">Expected mastery: {subject.expectedMastery}</p>
            </div>
            {isEditing && (
              <Button className="w-full mt-3 bg-gradient-to-r from-sky-500 to-violet-500 text-white" size="sm">
                Edit Subject Details
              </Button>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <Button className="mt-6 bg-gradient-to-r from-sky-500 to-violet-500 text-white">
          Add New Subject
        </Button>
      )}
    </div>
  );
};

export default StudyPlanSubjects;
