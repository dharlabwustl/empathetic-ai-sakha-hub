
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, AlignJustify, PieChart, Clock, Award, AlertCircle } from 'lucide-react';
import DashboardContainer from '@/components/dashboard/student/DashboardContainer';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
} from 'recharts';
import { useToast } from "@/hooks/use-toast";

const ExamReviewPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data - would be fetched from API in a real app
  const examData = {
    id: examId,
    title: "JEE Advanced Physics Mock Test",
    subject: "Physics",
    date: "April 26, 2025",
    duration: 180, // minutes
    timeSpent: 162, // minutes
    score: 68,
    totalPoints: 100,
    totalQuestions: 30,
    correctAnswers: 21,
    incorrectAnswers: 6,
    unattempted: 3,
    subjectPerformance: [
      { subject: 'Mechanics', score: 78, total: 100 },
      { subject: 'Electromagnetism', score: 65, total: 100 },
      { subject: 'Optics', score: 82, total: 100 },
      { subject: 'Modern Physics', score: 45, total: 100 },
    ],
    timeDistribution: {
      quickAnswers: 12, // questions answered in less than expected time
      expectedTimeAnswers: 15, // questions answered in expected time
      longAnswers: 3, // questions that took longer than expected
    },
    difficultyBreakdown: {
      easy: { correct: 10, incorrect: 0, total: 10 },
      medium: { correct: 8, incorrect: 2, total: 10 },
      hard: { correct: 3, incorrect: 4, total: 10 },
    },
    weakTopics: [
      "Wave Optics",
      "Rotational Dynamics",
      "Electromagnetic Induction"
    ],
    strongTopics: [
      "Kinematics",
      "Electrostatics",
      "Ray Optics"
    ],
    questions: [
      {
        id: "q1",
        question: "A body of mass 'm' is thrown with a velocity 'v' at an angle 'θ' with the horizontal. The horizontal range of the projectile will be:",
        userAnswer: "v²sin(2θ)/g",
        correctAnswer: "v²sin(2θ)/g",
        isCorrect: true,
        points: 4,
        earnedPoints: 4,
        explanation: "The horizontal range of a projectile is given by the formula R = v²sin(2θ)/g, where v is the initial velocity, θ is the angle with the horizontal, and g is the acceleration due to gravity."
      },
      {
        id: "q2",
        question: "Which of the following phenomena demonstrate the wave nature of light? (Select all that apply)",
        userAnswer: ["Interference", "Diffraction", "Photoelectric effect"],
        correctAnswer: ["Interference", "Diffraction"],
        isCorrect: false,
        points: 4,
        earnedPoints: 1,
        explanation: "Interference and diffraction are phenomena that can only be explained by the wave nature of light. The photoelectric effect demonstrates the particle nature of light."
      }
      // More questions would be here in a real app
    ]
  };
  
  // Calculate percentages for the pie chart
  const pieData = [
    { name: 'Correct', value: examData.correctAnswers },
    { name: 'Incorrect', value: examData.incorrectAnswers },
    { name: 'Unattempted', value: examData.unattempted },
  ];
  
  const COLORS = ['#22c55e', '#ef4444', '#94a3b8'];
  
  // Time efficiency data
  const timeData = [
    { name: 'Fast', value: examData.timeDistribution.quickAnswers },
    { name: 'Optimal', value: examData.timeDistribution.expectedTimeAnswers },
    { name: 'Slow', value: examData.timeDistribution.longAnswers },
  ];
  
  const TIME_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
  
  // Prepare difficulty data for bar chart
  const difficultyData = [
    {
      name: 'Easy',
      correct: examData.difficultyBreakdown.easy.correct,
      incorrect: examData.difficultyBreakdown.easy.incorrect,
    },
    {
      name: 'Medium',
      correct: examData.difficultyBreakdown.medium.correct,
      incorrect: examData.difficultyBreakdown.medium.incorrect,
    },
    {
      name: 'Hard',
      correct: examData.difficultyBreakdown.hard.correct,
      incorrect: examData.difficultyBreakdown.hard.incorrect,
    },
  ];
  
  // Handle retry exam
  const handleRetryExam = () => {
    navigate(`/dashboard/student/exams/start/${examId}`);
  };
  
  // Handle practice weak areas
  const handlePracticeWeakAreas = () => {
    toast({
      title: "Practice Session Created",
      description: "We've created a personalized practice session focusing on your weak areas."
    });
    
    // In a real app, you would navigate to a specific practice session
    navigate('/dashboard/student/practice');
  };

  return (
    <DashboardContainer>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{examData.title} - Results</h1>
          <div className="flex flex-wrap gap-3 mt-2">
            <Badge variant="outline" className="text-sm">
              {examData.subject}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {examData.date}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Time: {Math.floor(examData.timeSpent / 60)}h {examData.timeSpent % 60}m
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{examData.score}%</div>
                <p className="text-sm text-gray-500">Overall Score</p>
                
                <div className="mt-4">
                  <Progress value={examData.score} className="h-3" />
                </div>
                
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <div className="font-medium">{examData.correctAnswers}/{examData.totalQuestions}</div>
                    <div className="text-gray-500">Correct</div>
                  </div>
                  <div>
                    <div className="font-medium">{examData.totalPoints * (examData.score / 100)}/{examData.totalPoints}</div>
                    <div className="text-gray-500">Points</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 flex items-center h-full">
              <div className="w-full">
                <h3 className="text-lg font-medium mb-4">Performance Breakdown</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Correct</span>
                      <span className="font-medium text-green-600">{Math.round((examData.correctAnswers / examData.totalQuestions) * 100)}%</span>
                    </div>
                    <Progress value={(examData.correctAnswers / examData.totalQuestions) * 100} className="bg-gray-100 h-2" indicatorClassName="bg-green-500" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Incorrect</span>
                      <span className="font-medium text-red-600">{Math.round((examData.incorrectAnswers / examData.totalQuestions) * 100)}%</span>
                    </div>
                    <Progress value={(examData.incorrectAnswers / examData.totalQuestions) * 100} className="bg-gray-100 h-2" indicatorClassName="bg-red-500" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Unattempted</span>
                      <span className="font-medium text-gray-600">{Math.round((examData.unattempted / examData.totalQuestions) * 100)}%</span>
                    </div>
                    <Progress value={(examData.unattempted / examData.totalQuestions) * 100} className="bg-gray-100 h-2" indicatorClassName="bg-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 flex flex-col h-full">
              <h3 className="text-lg font-medium mb-4">Areas to Focus</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                  Weak Areas
                </h4>
                <div className="space-y-1">
                  {examData.weakTopics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounde-full"></div>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Strong Areas
                </h4>
                <div className="space-y-1">
                  {examData.strongTopics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <Button 
                  onClick={handlePracticeWeakAreas} 
                  variant="default" 
                  className="w-full"
                >
                  Practice Weak Areas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-1">
              <AlignJustify className="h-4 w-4" />
              <span>Questions</span>
            </TabsTrigger>
            <TabsTrigger value="timing" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Timing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={examData.subjectPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" name="Your Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Answer Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={difficultyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="correct" stackId="a" fill="#22c55e" name="Correct" />
                        <Bar dataKey="incorrect" stackId="a" fill="#ef4444" name="Incorrect" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-6">
            {examData.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">
                      Question {index + 1}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({question.earnedPoints}/{question.points} points)
                      </span>
                    </CardTitle>
                    <Badge variant={question.isCorrect ? "success" : "destructive"} className="ml-auto">
                      {question.isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{question.question}</p>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Your Answer:</p>
                    <div className="bg-slate-50 p-3 rounded-md text-sm">
                      {Array.isArray(question.userAnswer) 
                        ? question.userAnswer.join(", ") 
                        : question.userAnswer}
                    </div>
                  </div>
                  
                  {!question.isCorrect && (
                    <div>
                      <p className="text-sm font-medium mb-1">Correct Answer:</p>
                      <div className="bg-green-50 p-3 rounded-md text-sm">
                        {Array.isArray(question.correctAnswer) 
                          ? question.correctAnswer.join(", ") 
                          : question.correctAnswer}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Explanation:</p>
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                      {question.explanation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="timing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span>Total Time Spent</span>
                    <span className="font-medium">
                      {Math.floor(examData.timeSpent / 60)}h {examData.timeSpent % 60}m 
                      of {Math.floor(examData.duration / 60)}h {examData.duration % 60}m
                    </span>
                  </div>
                  <Progress 
                    value={(examData.timeSpent / examData.duration) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={timeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {timeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TIME_COLORS[index % TIME_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TIME_COLORS[0] }}></div>
                    <span className="text-sm">Fast - Answered quicker than recommended time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TIME_COLORS[1] }}></div>
                    <span className="text-sm">Optimal - Answered within recommended time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TIME_COLORS[2] }}></div>
                    <span className="text-sm">Slow - Took longer than recommended time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time Management Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span>You spent more time on Hard questions. Consider setting a time limit for challenging questions and moving on if you can't solve them quickly.</span>
                  </li>
                  <li className="flex gap-3">
                    <Award className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span>Your accuracy on quickly-answered questions was 85%. Continue trusting your instincts on questions you find easy.</span>
                  </li>
                  <li className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>You left 3 questions unattempted. Always try to attempt all questions, especially if there's no negative marking.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-4 justify-center mb-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleRetryExam}
          >
            Retake Exam
          </Button>
          <Button 
            variant="default" 
            size="lg"
            onClick={handlePracticeWeakAreas}
          >
            Practice Weak Areas
          </Button>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ExamReviewPage;
