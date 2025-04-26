
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PracticeExamCard } from './PracticeExamCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PracticeExamSection = () => {
  const [timeView, setTimeView] = useState<'today' | 'week' | 'month'>('today');
  const [subject, setSubject] = useState<string>('all');

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
      completed: true,
      score: 85
    },
  ];

  const subjects = Array.from(new Set(mockExams.map(exam => exam.subject)));

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">🧪 Practice Tests – Sharpen Your Skills</h2>
        <p className="text-gray-600">Challenge yourself with curated tests aligned with your study plan</p>
      </div>

      <Tabs value={timeView} onValueChange={(value) => setTimeView(value as typeof timeView)}>
        <TabsList className="mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <div className="mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSubject('all')}>
              All Subjects
            </TabsTrigger>
            {subjects.map((subj) => (
              <TabsTrigger 
                key={subj} 
                value={subj.toLowerCase()}
                onClick={() => setSubject(subj)}
              >
                {subj}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {['today', 'week', 'month'].map((view) => (
          <TabsContent key={view} value={view} className="space-y-4">
            {mockExams
              .filter(exam => 
                (subject === 'all' || exam.subject === subject)
              )
              .map(exam => (
                <PracticeExamCard
                  key={exam.id}
                  {...exam}
                  onStart={(id) => console.log('Starting test:', id)}
                  onViewResult={(id) => console.log('Viewing result:', id)}
                />
              ))
            }
          </TabsContent>
        ))}
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
