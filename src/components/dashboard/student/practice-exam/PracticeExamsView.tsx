
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Award, Play, ArrowLeft } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';

const examsData = [
  {
    id: "exam1",
    title: "Physics Mock Test - Mechanics",
    description: "Test your understanding of Newton's Laws, Work & Energy, and Rotational Motion",
    difficulty: "Medium",
    questions: 30,
    timeLimit: 45,
    subject: "Physics",
    topic: "Mechanics",
    lastAttempt: "2023-08-15",
    attemptsCount: 2,
    avgScore: 72,
    status: "in-progress"
  },
  {
    id: "exam2",
    title: "Biology - Human Physiology",
    description: "Comprehensive test covering Digestive, Respiratory, and Circulatory Systems",
    difficulty: "Hard",
    questions: 45,
    timeLimit: 60,
    subject: "Biology",
    topic: "Human Physiology",
    lastAttempt: "2023-08-10",
    attemptsCount: 3,
    avgScore: 68,
    status: "completed"
  },
  {
    id: "exam3",
    title: "Chemistry - Organic Compounds",
    description: "Test on Hydrocarbons, Alcohols, and Carbonyl Compounds",
    difficulty: "Medium",
    questions: 35,
    timeLimit: 50,
    subject: "Chemistry",
    topic: "Organic Chemistry",
    lastAttempt: null,
    attemptsCount: 0,
    avgScore: null,
    status: "not-started"
  }
];

const PracticeExamsView = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getFilteredExams = () => {
    if (activeTab === 'all') return examsData;
    return examsData.filter(exam => exam.status === activeTab);
  };

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleGoBack = () => {
    navigate('/dashboard/student');
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with subject-specific practice exams"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      {/* Back button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 flex items-center gap-2" 
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredExams().map(exam => (
          <Card key={exam.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty}
                </Badge>
                {getStatusBadge(exam.status)}
              </div>
              <CardTitle className="text-lg mt-2">{exam.title}</CardTitle>
              <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{exam.questions} questions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{exam.timeLimit} min</span>
                </div>
              </div>
              
              {exam.attemptsCount > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Best Score</span>
                    <span className="font-medium">{exam.avgScore}%</span>
                  </div>
                  <Progress value={exam.avgScore || 0} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Last attempt: {new Date(exam.lastAttempt || Date.now()).toLocaleDateString()}</span>
                    <span>{exam.attemptsCount} attempts</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <Button
                onClick={() => handleStartExam(exam.id)}
                className="w-full flex gap-2 items-center"
                variant={exam.status === 'not-started' ? 'default' : 'outline'}
              >
                {exam.status === 'completed' ? (
                  <>
                    <Award className="h-4 w-4" />
                    Review Exam
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    {exam.status === 'in-progress' ? 'Continue Exam' : 'Start Exam'}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
