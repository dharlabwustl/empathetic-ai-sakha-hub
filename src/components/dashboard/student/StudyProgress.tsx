
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudyTimeChart } from './study-progress/StudyTimeChart';
import { QuizzesList } from './study-progress/QuizzesList';
import { TopicsList } from './study-progress/TopicsList';
import { SubjectProgress, StudyStreak } from "@/types/user/base";

interface StudyProgressProps {
  subjects?: SubjectProgress[];
  studyStreak?: StudyStreak;
}

const StudyProgress: React.FC<StudyProgressProps> = ({ 
  subjects = [], 
  studyStreak = { current: 5, longest: 12, lastActiveDate: new Date().toISOString() }
}) => {
  const [activeTab, setActiveTab] = useState<string>('study-time');
  
  // Use mock data if no subjects provided
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

  const [selectedSubject, setSelectedSubject] = useState<SubjectProgress | null>(
    mockSubjects.length > 0 ? mockSubjects[0] : null
  );

  const handleSelectSubject = (subjectId: string) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
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
              subjects={mockSubjects}
              selectSubject={handleSelectSubject}
              studyStreak={studyStreak}
            />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizzesList 
              selectedSubject={selectedSubject}
              subjects={mockSubjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
          
          <TabsContent value="topics">
            <TopicsList 
              selectedSubject={selectedSubject}
              subjects={mockSubjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudyProgress;
