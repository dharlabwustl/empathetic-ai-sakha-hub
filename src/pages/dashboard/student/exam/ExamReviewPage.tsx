
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Download, FileText, PieChart, Share2, XCircle } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock exam result data
const mockExamResult = {
  id: 1,
  title: "Physics Mock Test #1",
  subject: "Physics",
  topics: ["Mechanics", "Optics", "Waves"],
  questionCount: 30,
  timeLimit: 60,
  difficulty: "medium",
  score: 78,
  correctAnswers: 23,
  incorrectAnswers: 7,
  completionTime: 48, // minutes
  topicPerformance: [
    { topic: "Mechanics", correct: 8, total: 10, percentage: 80 },
    { topic: "Optics", correct: 7, total: 10, percentage: 70 },
    { topic: "Waves", correct: 8, total: 10, percentage: 80 },
  ],
  questions: [
    {
      id: 1,
      question: "A body of mass m is thrown vertically upward with an initial velocity v. The work done by the gravitational force during the ascent of the body is:",
      options: [
        "mgv",
        "-mgv",
        "mgv²/2",
        "-mgv²/2"
      ],
      correctAnswer: 1,
      userAnswer: 1,
      explanation: "When a body moves upward against gravity, the work done by the gravitational force is negative because the force and displacement are in opposite directions. The work is equal to -mgh, where h is the height. Since the initial velocity is v and the final velocity is 0, we can use v²/2g as the height (from v² = u² + 2as). This gives us -mg × v²/2g = -mgv²/2."
    },
    {
      id: 2,
      question: "When a ray of light passes from a denser to a rarer medium, which of the following changes?",
      options: [
        "Frequency",
        "Wavelength",
        "Speed",
        "Both wavelength and speed"
      ],
      correctAnswer: 3,
      userAnswer: 2,
      explanation: "When light passes from a denser to a rarer medium, its frequency remains constant, but its speed increases and consequently its wavelength increases (since v = fλ). Therefore, both wavelength and speed change."
    },
    {
      id: 3,
      question: "The principle of superposition of waves is applicable to:",
      options: [
        "Only mechanical waves",
        "Only electromagnetic waves",
        "Both mechanical and electromagnetic waves",
        "Neither mechanical nor electromagnetic waves"
      ],
      correctAnswer: 2,
      userAnswer: 2,
      explanation: "The principle of superposition applies to all linear wave systems, which includes both mechanical waves (like sound waves, water waves) and electromagnetic waves (like light waves, radio waves). This principle states that when two or more waves overlap, the resultant displacement is the algebraic sum of the displacements of the individual waves."
    }
    // More questions would be here in a real app
  ]
};

const ExamReviewPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const examResult = mockExamResult; // In a real app, fetch results by ID
  
  const handleBackToExams = () => {
    navigate('/dashboard/student/practice-exam');
  };

  return (
    <SharedPageLayout
      title={`${examResult.title} - Results`}
      subtitle={`${examResult.subject} • Completed • Score: ${examResult.score}%`}
    >
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center gap-1"
        onClick={handleBackToExams}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Exams</span>
      </Button>
      
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="questions">Questions Review</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-4xl font-bold">{examResult.score}%</div>
                  <div className="text-muted-foreground">Your Score</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{examResult.correctAnswers}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{examResult.incorrectAnswers}</div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Completion Time</span>
                    <span className="font-medium">{examResult.completionTime} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Time Allowed</span>
                    <span className="font-medium">{examResult.timeLimit} min</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topic Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {examResult.topicPerformance.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{topic.topic}</span>
                      <span className="font-medium">{topic.percentage}%</span>
                    </div>
                    <Progress value={topic.percentage} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {topic.correct} out of {topic.total} questions correct
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Based on your performance, we recommend focusing on the following areas:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Review Optics concepts</p>
                    <p className="text-sm text-muted-foreground">This was your lowest scoring topic. Focus particularly on refraction and reflection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Practice time management</p>
                    <p className="text-sm text-muted-foreground">You used 80% of the available time. Try to improve your speed while maintaining accuracy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <PieChart className="h-5 w-5 text-violet-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Take another practice test</p>
                    <p className="text-sm text-muted-foreground">We recommend taking the Physics Mock Test #2 to further improve your skills.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Study Plan Based on Results</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-4">
          {examResult.questions.map((question, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-md">Question {index + 1}</CardTitle>
                  {question.userAnswer === question.correctAnswer ? (
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
              <CardContent className="space-y-4">
                <p>{question.question}</p>
                
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      className={`p-3 rounded-md border ${
                        optIndex === question.correctAnswer
                          ? "bg-green-50 border-green-200"
                          : optIndex === question.userAnswer && optIndex !== question.correctAnswer
                            ? "bg-red-50 border-red-200"
                            : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>{option}</span>
                        {optIndex === question.correctAnswer && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {optIndex === question.userAnswer && optIndex !== question.correctAnswer && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
                  <p className="font-medium text-indigo-800">Explanation</p>
                  <p className="text-indigo-700 mt-1">{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Performance Analysis</CardTitle>
              <CardDescription>
                Insights into your exam performance and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This detailed analysis shows your performance across different dimensions such as
                topics, difficulty levels, and question types.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-medium mb-2">Performance by Question Type</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Conceptual Questions</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Numerical Problems</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Application Based</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Performance by Difficulty</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Easy Questions</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Medium Questions</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Hard Questions</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ExamReviewPage;
