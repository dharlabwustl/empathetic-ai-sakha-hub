import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectProgress, StudyStreak } from "@/types/user";

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
            <div key={subject.id}>
              {subject.name} - {subject.progress}%
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="streak">
        <div>
          Current Streak: {streak.current}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
