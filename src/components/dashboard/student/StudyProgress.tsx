import React from 'react';
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { StudyProgressHeader } from "@/components/dashboard/student/study-progress/StudyProgressHeader";
import { ProgressStatCards } from "@/components/dashboard/student/study-progress/ProgressStatCards";
import { WeeklyProgressChart } from "@/components/dashboard/student/study-progress/WeeklyProgressChart";
import { StudyStreakCard } from "@/components/dashboard/student/study-progress/StudyStreakCard";
import { PerformanceTabs } from "@/components/dashboard/student/study-progress/PerformanceTabs";
import { UserRole } from "@/types/user/base";
import { SubjectProgress, StudyStreak } from "@/types/user/study";

interface StudyProgressProps {
  subjects: SubjectProgress[];
  studyStreak: StudyStreak;
}

const StudyProgress: React.FC<StudyProgressProps> = ({ subjects, studyStreak }) => {
  const [activeTab, setActiveTab] = useState<string>('study-time');
  const [selectedSubject, setSelectedSubject] = useState<SubjectProgress | null>(
    subjects.length > 0 ? subjects[0] : null
  );

  const handleSelectSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="study-time">Study Time</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-time">
            <StudyTimeChart 
              selectedSubject={selectedSubject} 
              subjects={subjects}
              selectSubject={handleSelectSubject}
              studyStreak={studyStreak}
            />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizzesList 
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
          
          <TabsContent value="topics">
            <TopicsList 
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudyProgress;
