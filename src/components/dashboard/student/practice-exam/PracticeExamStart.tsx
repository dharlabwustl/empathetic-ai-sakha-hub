
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TimerOff, FileText, AlertCircle, BarChart, CheckCircle } from 'lucide-react';
import { ExamPreparation } from '@/types/user/exam-preparation';

interface PracticeExamStartProps {
  exam: string | ExamPreparation;
  lastAttempt?: {
    date: string;
    score: number;
    timeSpent: number;
    completed: boolean;
  };
  onStart: () => void;
  onReview?: () => void;
}

const PracticeExamStart: React.FC<PracticeExamStartProps> = ({ 
  exam,
  lastAttempt,
  onStart,
  onReview
}) => {
  // Convert string to exam object if necessary
  const examData = typeof exam === 'string' 
    ? {
        id: "1",
        title: exam,
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        subjects: ["Mathematics", "Physics", "Chemistry"],
        daysLeft: 30,
        progress: 65,
        startDate: new Date().toISOString()
      } 
    : exam;

  // Calculate days left until exam
  const daysLeft = examData.daysLeft || 
    Math.ceil((new Date(examData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{examData.title}</CardTitle>
            <CardDescription className="mt-1">
              Practice exam to help you prepare for {examData.title}
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock size={14} />
            <span>{daysLeft} days left</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center text-sm mb-1.5">
            <span className="text-muted-foreground">Exam readiness</span>
            <span className="font-medium">{examData.progress || 0}%</span>
          </div>
          <Progress value={examData.progress || 0} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <FileText size={16} className="mr-1.5 text-primary" />
              About this practice exam
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <span className="bg-primary/20 w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-medium text-primary mr-2">
                  60
                </span>
                <span>minutes time limit</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary/20 w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-medium text-primary mr-2">
                  30
                </span>
                <span>questions</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary/20 w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-medium text-primary mr-2">
                  75
                </span>
                <span>minimum passing score</span>
              </li>
            </ul>
            
            {examData.subjects && examData.subjects.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1.5">Subjects covered:</p>
                <div className="flex flex-wrap gap-1">
                  {examData.subjects.map(subject => (
                    <Badge key={subject} variant="outline" className="bg-primary/5">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            {lastAttempt ? (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <BarChart size={16} className="mr-1.5 text-primary" />
                  Your last attempt
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <span className="font-medium">{lastAttempt.score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span>{new Date(lastAttempt.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time spent:</span>
                    <span>{Math.floor(lastAttempt.timeSpent / 60)}:{(lastAttempt.timeSpent % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant={lastAttempt.score >= 75 ? "default" : "destructive"}>
                      {lastAttempt.score >= 75 ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-full text-center">
                <TimerOff className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">You haven't attempted this practice exam yet</p>
              </div>
            )}
          </div>
        </div>

        {daysLeft < 7 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your exam is coming up soon! We recommend taking this practice test as soon as possible.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onStart}
          className="w-full sm:w-auto flex-1 bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary/90"
        >
          <FileText className="mr-2 h-4 w-4" />
          Start Practice Exam
        </Button>
        
        {lastAttempt && onReview && (
          <Button 
            variant="outline" 
            onClick={onReview}
            className="w-full sm:w-auto flex-1"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Review Last Attempt
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeExamStart;
