
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectProgress, StudyStreak } from "@/types/user/student";

interface PerformanceTabsProps {
  subjectsProgress: SubjectProgress[];
  streak: StudyStreak;
}

const PerformanceTabs: React.FC<PerformanceTabsProps> = ({ subjectsProgress, streak }) => {
  return (
    <Tabs defaultValue="subjects" className="w-full">
      <TabsList>
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
        <TabsTrigger value="streak">Streak</TabsTrigger>
      </TabsList>
      <TabsContent value="subjects">
        <div>
          {subjectsProgress.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span>{subject.name}</span>
              <span className="text-sm font-medium">{subject.progress}%</span>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="streak">
        <div className="py-2">
          <div className="flex items-center justify-between mb-4">
            <span>Current Streak:</span>
            <span className="font-bold">{streak.current} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Longest Streak:</span>
            <span className="font-bold">{streak.longest} days</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
