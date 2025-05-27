
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, XCircle, Clock, Book, AlertTriangle, BarChart, Trophy } from "lucide-react";
import MainLayout from '@/components/layouts/MainLayout';

const ExamResultsPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  // Mock exam result data
  const examResult = {
    examId: examId,
    title: `Practice Exam ${examId}`,
    subject: "Physics",
    topics: ["Mechanics", "Optics", "Waves"],
    score: 78,
    totalQuestions: 10,
    correctAnswers: 8,
    incorrectAnswers: 2,
    timeTaken: "35 minutes",
    maxTime: "60 minutes",
    completedOn: new Date().toISOString(),
    topicPerformance: [
      { name: "Mechanics", score: 85, questions: 4 },
      { name: "Optics", score: 70, questions: 3 },
      { name: "Waves", score: 75, questions: 3 }
    ],
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: Sample physics question about mechanics and motion?`,
      userAnswer: i % 3 === 0 ? "Incorrect answer" : "Correct answer",
      correctAnswer: "Correct answer",
      isCorrect: i % 3 !== 0,
      explanation: `This is the explanation for question ${i + 1}. The correct answer demonstrates the fundamental principles of physics.`
    })),
    weakAreas: [
      "Newton's Laws of Motion",
      "Energy Conservation",
      "Wave Properties"
    ],
    recommendations: [
      "Review Newton's laws and practice more problems",
      "Focus on energy conservation principles",
      "Study wave mechanics and properties"
    ]
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleBackToPracticeExams = () => {
    navigate("/dashboard/student/practice-exam");
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Exam Results</h1>
            <p className="text-gray-600">{examResult.title} • {examResult.subject}</p>
          </div>
          <Button variant="outline" onClick={handleBackToPracticeExams}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice Exams
          </Button>
        </div>

        {/* Score Overview */}
        <Card className="overflow-hidden mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-wrap justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Exam Performance
              </CardTitle>
              <div className="flex items-center gap-2">
                {examResult.topics.map(topic => (
                  <Badge key={topic} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Overall Score</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={`text-4xl font-bold ${getScoreColor(examResult.score)}`}>
                    {examResult.score}%
                  </div>
                  <Progress 
                    value={examResult.score} 
                    className="h-2 mt-2" 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Questions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-gray-600">Correct</span>
                      </div>
                      <div className="text-xl font-medium">{examResult.correctAnswers}</div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-gray-600">Incorrect</span>
                      </div>
                      <div className="text-xl font-medium">{examResult.incorrectAnswers}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Time</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">Time taken</span>
                  </div>
                  <div className="text-xl font-medium">{examResult.timeTaken}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    out of {examResult.maxTime}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Question Review</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-5">
                <div>
                  <h3 className="font-medium text-lg mb-3">Topic Performance</h3>
                  <div className="space-y-3">
                    {examResult.topicPerformance.map(topic => (
                      <div key={topic.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{topic.name}</span>
                          <span className={getScoreColor(topic.score)}>{topic.score}%</span>
                        </div>
                        <Progress 
                          value={topic.score}
                          className="h-2" 
                        />
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          {topic.questions} questions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Areas for Improvement</h3>
                  <div className="space-y-2">
                    {examResult.weakAreas.map((area, index) => (
                      <div key={index} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="questions">
                <div className="space-y-4">
                  {examResult.questions.map((question, index) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Question {index + 1}</CardTitle>
                          {question.isCorrect ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Correct
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Incorrect
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3">{question.text}</p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Your Answer: </span>
                            <span className={question.isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {question.userAnswer}
                            </span>
                          </div>
                          {!question.isCorrect && (
                            <div>
                              <span className="text-sm font-medium">Correct Answer: </span>
                              <span className="text-green-600">{question.correctAnswer}</span>
                            </div>
                          )}
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm font-medium">Explanation: </span>
                            <span className="text-sm">{question.explanation}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">Suggested Actions</h3>
                  <div className="space-y-4">
                    {examResult.recommendations.map((recommendation, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex">
                          <BarChart className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <p>{recommendation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={handleBackToPracticeExams}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Practice Exams
                    </Button>
                    <Button>
                      <Book className="h-4 w-4 mr-2" />
                      Study Related Concepts
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ExamResultsPage;
