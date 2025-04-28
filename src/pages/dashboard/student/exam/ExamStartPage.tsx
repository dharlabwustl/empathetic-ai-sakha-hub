
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Clock, FileText, CheckCircle, ChevronRight, Brain, Timer } from 'lucide-react';
import DashboardContainer from '@/components/dashboard/student/DashboardContainer';

const ExamStartPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // This would be fetched from an API in a real application
  const examData = {
    id: examId,
    title: "JEE Advanced Physics Mock Test",
    description: "Comprehensive practice test covering mechanics, electromagnetism, optics, and modern physics.",
    subject: "Physics",
    duration: 180,
    totalQuestions: 60,
    totalPoints: 180,
    difficulty: "advanced",
    topics: ["Mechanics", "Electromagnetism", "Optics", "Modern Physics"],
    instructions: [
      "Each question carries 3 marks for correct answer.",
      "There is a negative marking of 1 mark for each wrong answer.",
      "Questions can be attempted in any order.",
      "Use the calculator for complex calculations.",
      "Submit before the timer ends to ensure your answers are saved."
    ],
    previousAttempts: 2,
    highestScore: 78,
    averageScore: 65,
    recommendedTime: 3
  };
  
  const startExam = () => {
    setIsLoading(true);
    // In a real application, you would make an API call to start the exam session
    setTimeout(() => {
      navigate(`/dashboard/student/exams/attempt/${examId}`);
    }, 1000);
  };
  
  return (
    <DashboardContainer>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{examData.title}</h1>
          <p className="text-gray-500 mt-1">{examData.description}</p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">Exam Information</CardTitle>
                  <CardDescription>Important details about this test</CardDescription>
                </div>
                <Badge variant={examData.difficulty === "advanced" ? "destructive" : (examData.difficulty === "intermediate" ? "warning" : "outline")}>
                  {examData.difficulty.charAt(0).toUpperCase() + examData.difficulty.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Subject</p>
                    <p className="text-lg">{examData.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg">{Math.floor(examData.duration / 60)} hours {examData.duration % 60} minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Questions</p>
                    <p className="text-lg">{examData.totalQuestions} questions ({examData.totalPoints} points)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Timer className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Recommended Time</p>
                    <p className="text-lg">{examData.recommendedTime} minutes per question</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {examData.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ul className="space-y-2">
                  {examData.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {examData.previousAttempts > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Your Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Previous Attempts</p>
                        <p className="text-xl font-medium">{examData.previousAttempts}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Highest Score</p>
                        <p className="text-xl font-medium">{examData.highestScore}%</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm font-medium">Once started, the timer cannot be paused</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                  onClick={startExam}
                  disabled={isLoading}
                >
                  {isLoading ? 'Starting...' : 'Start Exam'}
                  {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ExamStartPage;
