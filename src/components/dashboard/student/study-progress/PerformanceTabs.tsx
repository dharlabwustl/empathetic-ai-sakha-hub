
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectOverview } from './SubjectOverview';
import { TopicsList } from './TopicsList';
import { QuizzesList } from './QuizzesList';
import StudyTimeChart from './StudyTimeChart';
import { SubjectProgress } from "@/types/user/progress";
import { StudyStreak } from "@/types/user/progress";

interface PerformanceTabsProps {
  subjects: SubjectProgress[];
  selectedSubject: SubjectProgress | null;
  selectSubject: (id: string) => void;
  studyStreak: StudyStreak | null;
}

export const PerformanceTabs: React.FC<PerformanceTabsProps> = ({
  subjects,
  selectedSubject,
  selectSubject,
  studyStreak
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="time">Study Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <SubjectOverview subjects={subjects} />
          </TabsContent>
          
          <TabsContent value="topics">
            <TopicsList
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={selectSubject}
            />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizzesList
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={selectSubject}
            />
          </TabsContent>
          
          <TabsContent value="time">
            <StudyTimeChart studyStreak={studyStreak} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
