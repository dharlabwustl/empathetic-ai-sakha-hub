
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Check, Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface PracticeExam {
  id: string;
  title: string;
  type: 'quick' | 'comprehensive' | 'mock';
  subject: string;
  topic?: string;
  questionCount: number;
  timeLimit?: number; // in minutes
  completed?: boolean;
  score?: number;
  lastAttempted?: string;
}

const mockExams: PracticeExam[] = [
  {
    id: 'ex-1',
    title: 'Physics Quick Test: Mechanics',
    type: 'quick',
    subject: 'Physics',
    topic: 'Mechanics',
    questionCount: 10,
    timeLimit: 15,
    completed: true,
    score: 80,
    lastAttempted: '2024-05-01'
  },
  {
    id: 'ex-2',
    title: 'Chemistry Comprehensive: Organic Chemistry',
    type: 'comprehensive',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    questionCount: 25,
    timeLimit: 45,
    completed: false
  },
  {
    id: 'ex-3',
    title: 'Biology Mock Exam',
    type: 'mock',
    subject: 'Biology',
    questionCount: 50,
    timeLimit: 90,
    completed: false
  },
  {
    id: 'ex-4',
    title: 'Math Quick Test: Calculus',
    type: 'quick',
    subject: 'Mathematics',
    topic: 'Calculus',
    questionCount: 15,
    timeLimit: 20,
    completed: true,
    score: 65,
    lastAttempted: '2024-04-28'
  },
  {
    id: 'ex-5',
    title: 'NEET Full Length Mock Exam',
    type: 'mock',
    subject: 'All Subjects',
    questionCount: 180,
    timeLimit: 180,
    completed: false
  },
];

const typeColors = {
  quick: 'bg-green-100 text-green-800',
  comprehensive: 'bg-blue-100 text-blue-800',
  mock: 'bg-purple-100 text-purple-800'
};

const typeNames = {
  quick: 'Quick Test',
  comprehensive: 'Comprehensive',
  mock: 'Mock Exam'
};

const PracticeExamList: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard/student');
  };

  const handleStartExam = (examId: string) => {
    // Navigate to exam page
    navigate(`/dashboard/student/practice/${examId}`);
  };

  const handleViewResults = (examId: string) => {
    // Navigate to results page
    navigate(`/dashboard/student/practice/${examId}/results`);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2 w-fit flex gap-2 items-center hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Return to the dashboard</p>
            </TooltipContent>
          </Tooltip>
          
          <h1 className="text-3xl font-bold">Practice Exams</h1>
          <p className="text-muted-foreground">
            Test your knowledge with our collection of practice exams and quizzes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Exams</CardTitle>
            <CardDescription>
              Select from available practice exams based on your study plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge className={typeColors[exam.type]}>
                            {typeNames[exam.type]}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50">
                            {exam.subject}
                          </Badge>
                          {exam.topic && (
                            <Badge variant="outline" className="bg-slate-50">
                              {exam.topic}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold">{exam.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {exam.questionCount} questions
                          </div>
                          {exam.timeLimit && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {exam.timeLimit} minutes
                            </div>
                          )}
                          {exam.completed && (
                            <div className="flex items-center">
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        {exam.completed ? (
                          <>
                            <div className="flex flex-col items-end mr-6 hidden md:flex">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">{exam.score}%</span>
                                <span className="text-xs text-muted-foreground">Score</span>
                              </div>
                              <Progress value={exam.score} className="h-1.5 w-24" />
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => handleViewResults(exam.id)}
                            >
                              View Results
                            </Button>
                            <Button onClick={() => handleStartExam(exam.id)}>
                              Retake Exam
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => handleStartExam(exam.id)}>
                            Start Exam
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All Exams
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default PracticeExamList;
