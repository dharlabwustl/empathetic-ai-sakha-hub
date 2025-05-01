
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Clock, ChevronRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Mock exams data
const upcomingExams = [
  {
    id: "1",
    title: "Physics Full Test",
    subject: "Physics",
    questions: 45,
    duration: 180,
    difficulty: "Advanced",
    due: "Tomorrow",
    recommended: true
  },
  {
    id: "2",
    title: "Organic Chemistry Quiz",
    subject: "Chemistry",
    questions: 25,
    duration: 60,
    difficulty: "Intermediate",
    due: "3 days",
    recommended: false
  },
  {
    id: "3",
    title: "Calculus Practice Exam",
    subject: "Mathematics",
    questions: 35,
    duration: 120,
    difficulty: "Advanced",
    due: "1 week",
    recommended: true
  }
];

const completedExams = [
  {
    id: "4",
    title: "Physics: Mechanics",
    subject: "Physics",
    completedDate: "3 days ago",
    score: 78,
    timeSpent: 95,
    questionsCount: 30
  },
  {
    id: "5",
    title: "Chemistry Fundamentals",
    subject: "Chemistry",
    completedDate: "1 week ago",
    score: 82,
    timeSpent: 45,
    questionsCount: 20
  }
];

// Function to determine score color
const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
};

const PracticeExamsView = () => {
  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge and track progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-8">
        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">80%</h3>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">12</h3>
                <p className="text-sm text-muted-foreground">Exams Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-violet-600 dark:text-violet-400">8h</h3>
                <p className="text-sm text-muted-foreground">Total Practice Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Exams */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Upcoming Exams</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className={`overflow-hidden ${exam.recommended ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{exam.subject}</Badge>
                        <Badge variant="outline">{exam.difficulty}</Badge>
                        {exam.recommended && (
                          <Badge variant="secondary">Recommended</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-medium">{exam.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {exam.due}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.duration} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{exam.questions} questions</span>
                    <Button variant="default" asChild>
                      <Link to={`/dashboard/student/practice-exam/${exam.id}/start`}>
                        Start Exam
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Completed Exams */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Completed Exams</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedExams.map((exam) => (
              <Card key={exam.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline">{exam.subject}</Badge>
                      <h3 className="font-medium mt-1">{exam.title}</h3>
                    </div>
                    <div className="bg-primary/10 rounded-full h-16 w-16 flex flex-col items-center justify-center">
                      <span className={`text-lg font-bold ${getScoreColor(exam.score)}`}>{exam.score}%</span>
                      <span className="text-xs text-muted-foreground">Score</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    <span>Completed: {exam.completedDate}</span>
                    <span>Time spent: {exam.timeSpent} min</span>
                    <span>Questions: {exam.questionsCount}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-3"
                    asChild
                  >
                    <Link to={`/dashboard/student/practice-exam/${exam.id}/review`}>
                      View Results <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
