
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BarChart3, 
  Clock, 
  FileText,
  ChevronLeft,
  ChevronRight, 
  Home,
  Share 
} from 'lucide-react';

const PracticeExamReviewPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // In a real app, this would come from the backend
  // For now, we'll mock exam results
  const examResults = {
    id: examId,
    title: "Physics Mock Test - Electromagnetism",
    subject: "Physics",
    score: 12,
    maxScore: 15,
    timeTaken: "45:30", // mm:ss format
    completedAt: new Date().toISOString(),
    questionBreakdown: {
      correct: 12,
      incorrect: 2,
      skipped: 1
    },
    strengthAreas: [
      "Electromagnetic Induction", 
      "Maxwell's Equations"
    ],
    weakAreas: [
      "Magnetostatics", 
      "Electromagnetic Waves"
    ],
    timeDistribution: [
      { category: "Easy", time: 15 },
      { category: "Medium", time: 20 },
      { category: "Hard", time: 10 }
    ],
    questions: [
      {
        id: 1,
        text: "Which of the following is a vector quantity?",
        type: "single",
        options: ["Mass", "Velocity", "Time", "Temperature"],
        correctAnswer: 1,
        userAnswer: 1,
        isCorrect: true,
        explanation: "Velocity is a vector quantity as it has both magnitude and direction. Mass, time, and temperature are scalar quantities."
      },
      {
        id: 2,
        text: "Select all of the following that are SI base units:",
        type: "multiple",
        options: ["Meter", "Joule", "Second", "Watt", "Kelvin", "Ampere"],
        correctAnswer: [0, 2, 4, 5],
        userAnswer: [0, 1, 2, 4],
        isCorrect: false,
        explanation: "The SI base units are meter (length), second (time), kelvin (temperature), ampere (electric current), mole (amount of substance), candela (luminous intensity), and kilogram (mass). Joule and watt are derived units."
      },
      {
        id: 3,
        text: "Explain the difference between electric potential and electric potential energy.",
        type: "text",
        correctAnswer: "Electric potential is the electric potential energy per unit charge, whereas electric potential energy is the energy possessed by a charged particle due to its position in an electric field.",
        userAnswer: "Electric potential is a scalar quantity measured in volts that represents energy per unit charge, while electric potential energy depends on the charge and is the energy a charged object has due to its position.",
        isCorrect: true,
        explanation: "Your answer correctly identifies the key distinction that electric potential (voltage) is electric potential energy per unit charge."
      }
    ]
  };
  
  const scorePercentage = Math.round((examResults.score / examResults.maxScore) * 100);
  
  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const handleNextQuestion = () => {
    if (activeQuestion < examResults.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };
  
  const question = examResults.questions[activeQuestion];
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/practice-exam')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Exams
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {/* Share functionality */}}
          >
            <Share className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/dashboard/student/practice-exam')}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="border-b bg-gray-50 dark:bg-gray-900/20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{examResults.title}</CardTitle>
              <CardDescription>{examResults.subject}</CardDescription>
            </div>
            <Badge className={getScoreColor()}>
              Score: {examResults.score}/{examResults.maxScore} ({scorePercentage}%)
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 rounded-none border-b">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Question Review</TabsTrigger>
              <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
            </TabsList>
            
            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Overall Score</span>
                        <span className="font-medium">{scorePercentage}%</span>
                      </div>
                      <Progress value={scorePercentage} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <div className="flex justify-center mb-1">
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        </div>
                        <div className="text-2xl font-semibold">{examResults.questionBreakdown.correct}</div>
                        <div className="text-xs text-muted-foreground">Correct</div>
                      </div>
                      
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <div className="flex justify-center mb-1">
                          <XCircle className="text-red-500 h-5 w-5" />
                        </div>
                        <div className="text-2xl font-semibold">{examResults.questionBreakdown.incorrect}</div>
                        <div className="text-xs text-muted-foreground">Incorrect</div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md">
                        <div className="flex justify-center mb-1">
                          <AlertCircle className="text-gray-500 h-5 w-5" />
                        </div>
                        <div className="text-2xl font-semibold">{examResults.questionBreakdown.skipped}</div>
                        <div className="text-xs text-muted-foreground">Skipped</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Exam Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Date Completed</span>
                      <span className="font-medium">{new Date(examResults.completedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Time Taken</span>
                      <span className="font-medium">{examResults.timeTaken}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Questions</span>
                      <span className="font-medium">{examResults.maxScore}</span>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Strength Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {examResults.strengthAreas.map((area, i) => (
                          <Badge key={i} variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 border-green-200">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="font-medium mb-2">Improvement Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {examResults.weakAreas.map((area, i) => (
                          <Badge key={i} variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 border-red-200">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => setActiveTab('questions')}
                  className="w-full"
                >
                  Review Questions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* QUESTIONS TAB */}
            <TabsContent value="questions" className="p-0">
              {/* Question navigation */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Question {activeQuestion + 1} of {examResults.questions.length}</h3>
                  <Badge variant={question.isCorrect ? "success" : "destructive"}>
                    {question.isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
                
                <Progress 
                  value={((activeQuestion + 1) / examResults.questions.length) * 100} 
                  className="h-1" 
                />
              </div>
              
              {/* Question content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
                
                {question.type === 'single' && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md border ${
                          index === question.correctAnswer 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200' 
                            : index === question.userAnswer && !question.isCorrect
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200'
                            : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                          {index === question.correctAnswer && (
                            <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                          )}
                          {index === question.userAnswer && !question.isCorrect && (
                            <XCircle className="ml-auto h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'multiple' && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md border ${
                          question.correctAnswer.includes(index) 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200' 
                            : question.userAnswer?.includes(index) && !question.correctAnswer.includes(index)
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200'
                            : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                          {question.correctAnswer.includes(index) && (
                            <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                          )}
                          {question.userAnswer?.includes(index) && !question.correctAnswer.includes(index) && (
                            <XCircle className="ml-auto h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Your Answer</h4>
                      <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-900/10">
                        <p>{question.userAnswer}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Model Answer</h4>
                      <div className="p-3 border rounded-md bg-green-50 dark:bg-green-900/10">
                        <p>{question.correctAnswer}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 bg-gray-50 dark:bg-gray-900/10 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Explanation</h4>
                  <p>{question.explanation}</p>
                </div>
              </div>
              
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-900/20 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={activeQuestion === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                {activeQuestion < examResults.questions.length - 1 ? (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => setActiveTab('analysis')}>
                    See Analysis
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </TabsContent>
            
            {/* ANALYSIS TAB */}
            <TabsContent value="analysis" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance by Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-around">
                      {/* This would be a chart in a real app */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-green-500 h-[120px] rounded-t-md"></div>
                        <span className="mt-2 text-xs">Easy</span>
                        <span className="text-xs text-muted-foreground">90%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-amber-500 h-[80px] rounded-t-md"></div>
                        <span className="mt-2 text-xs">Medium</span>
                        <span className="text-xs text-muted-foreground">70%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-red-500 h-[60px] rounded-t-md"></div>
                        <span className="mt-2 text-xs">Hard</span>
                        <span className="text-xs text-muted-foreground">50%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Time Spent by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-around">
                      {examResults.timeDistribution.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className={`w-12 rounded-t-md ${
                              item.category === 'Easy' ? 'bg-green-500' : 
                              item.category === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ height: `${(item.time / 45) * 150}px` }}
                          ></div>
                          <span className="mt-2 text-xs">{item.category}</span>
                          <span className="text-xs text-muted-foreground">{item.time} min</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>Focus on studying Magnetostatics and Electromagnetic Waves topics where you scored lower.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>Practice more hard difficulty questions to improve your performance in that area.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>You're doing well on conceptual questions but need more practice with calculation-based problems.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Exams
                </Button>
                
                <Button onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/start`)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Retry Exam
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExamReviewPage;
