
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PracticeExamCard } from './PracticeExamCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

export const PracticeExamSection = () => {
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');

  const mockExams = [
    {
      id: "1",
      title: "Algebra Level 1 Mini Test",
      subject: "Mathematics",
      topic: "Algebra",
      linkedConcept: "Linear Equations",
      questionCount: 15,
      duration: "30 mins",
      difficulty: "Medium" as const,
      priority: "High" as const,
      completed: false
    },
    {
      id: "2",
      title: "Physics Mechanics Quiz",
      subject: "Physics",
      topic: "Mechanics",
      linkedConcept: "Newton's Laws",
      questionCount: 10,
      duration: "20 mins",
      difficulty: "Easy" as const,
      priority: "Medium" as const,
      completed: true,
      score: 85
    },
    {
      id: "3",
      title: "History Modern India Test",
      subject: "History",
      topic: "Modern India",
      linkedConcept: "Freedom Struggle",
      questionCount: 20,
      duration: "45 mins",
      difficulty: "Hard" as const,
      priority: "Medium" as const,
      completed: false
    },
    {
      id: "4",
      title: "Biology Cell Structure Quiz",
      subject: "Biology",
      topic: "Cell Biology",
      linkedConcept: "Cell Components",
      questionCount: 15,
      duration: "25 mins",
      difficulty: "Medium" as const,
      priority: "High" as const,
      completed: false
    }
  ];

  return (
    <Card className="p-6">
      <SectionHeader 
        title="🧪 Practice Tests – Sharpen Your Skills" 
        subtitle="Challenge yourself with curated tests aligned with your study plan"
      />

      <Tabs value={timeView} onValueChange={(value) => setTimeView(value as typeof timeView)}>
        <TabsList className="mb-4">
          <TabsTrigger 
            value="today"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
          >
            Today
          </TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockExams.map(exam => (
              <PracticeExamCard
                key={exam.id}
                {...exam}
                onStart={(id) => console.log('Starting test:', id)}
                onViewResult={(id) => console.log('Viewing result:', id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockExams.filter(exam => exam.id === "3" || exam.id === "4").map(exam => (
              <PracticeExamCard
                key={exam.id}
                {...exam}
                onStart={(id) => console.log('Starting test:', id)}
                onViewResult={(id) => console.log('Viewing result:', id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockExams.filter(exam => exam.id === "2").map(exam => (
              <PracticeExamCard
                key={exam.id}
                {...exam}
                onStart={(id) => console.log('Starting test:', id)}
                onViewResult={(id) => console.log('Viewing result:', id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard/student/practice-exams">
          <Button className="flex items-center gap-2">
            🔍 View All Practice Tests
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
