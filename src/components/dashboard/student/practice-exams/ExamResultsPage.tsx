
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ChevronLeft, BarChart, Timer, Clock, CheckCircle, XCircle, 
  AlertTriangle, LineChart, BookOpen, FileText, Brain
} from 'lucide-react';
import { 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: number;
  questions: ExamQuestion[];
  relatedConceptIds?: string[];
  relatedFlashcardIds?: string[];
}

const mockExam: ExamData = {
  id: '2',
  title: "Newton's Laws Test",
  subject: 'Physics',
  topic: 'Mechanics',
  duration: 45,
  questions: [
    {
      id: 'q1',
      text: "What is Newton's First Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "None of the above"
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      text: "What is Newton's Second Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion",
        "Force equals mass times acceleration (F = ma)",
        "For every action, there is an equal and opposite reaction",
        "None of the above"
      ],
      correctAnswer: 1
    },
    {
      id: 'q3',
      text: "What is Newton's Third Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "None of the above"
      ],
      correctAnswer: 2
    }
  ],
  relatedConceptIds: ['c3', 'c4'],
  relatedFlashcardIds: ['f1', 'f2']
};

const COLORS = ['#22c55e', '#ef4444', '#f59e0b'];

const ExamResultsPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [exam, setExam] = useState<ExamData>(mockExam);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState('summary');
  
  // Statistics
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    score: 0,
    timeTaken: 0,
    avgTimePerQuestion: 0
  });
  
  useEffect(() => {
    // In a real app, we would fetch the exam and user's answers from an API
    // For now, we'll use mock data
    
    // Simulate answers from the user - in reality this would come from the location state or API
    const mockAnswers = {
      q1: 0, // correct
      q2: 1, // correct
      q3: 3, // incorrect
    };
    
    setUserAnswers(mockAnswers);
    
    // Calculate statistics
    const total = exam.questions.length;
    const correct = Object.keys(mockAnswers).filter(
      qId => {
        const question = exam.questions.find(q => q.id === qId);
        return question && mockAnswers[qId] === question.correctAnswer;
      }
    ).length;
    
    const incorrect = Object.keys(mockAnswers).filter(
      qId => {
        const question = exam.questions.find(q => q.id === qId);
        return question && mockAnswers[qId] !== question.correctAnswer;
      }
    ).length;
    
    const skipped = total - (correct + incorrect);
    const score = Math.round((correct / total) * 100);
    const timeTaken = Math.round(exam.duration * 0.8); // Simulated time taken (80% of allowed time)
    const avgTime = Math.round(timeTaken / total);
    
    setStats({
      totalQuestions: total,
      correct,
      incorrect,
      skipped,
      score,
      timeTaken,
      avgTimePerQuestion: avgTime
    });
    
  }, [exam]);
  
  const pieData = [
    { name: 'Correct', value: stats.correct, color: COLORS[0] },
    { name: 'Incorrect', value: stats.incorrect, color: COLORS[1] },
    { name: 'Skipped', value: stats.skipped, color: COLORS[2] }
  ];
  
  const topicPerformance = [
    { name: "Newton's First Law", correct: 1, incorrect: 0 },
    { name: "Newton's Second Law", correct: 1, incorrect: 0 },
    { name: "Newton's Third Law", correct: 0, incorrect: 1 },
  ];

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard/student/exams">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Exams
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{exam.title} - Results</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{exam.subject}</Badge>
                <Badge variant="outline">{exam.topic}</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/dashboard/student/exams/${examId}`)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Take Again
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="summary" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" /> Summary
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> Questions
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" /> Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            {/* Score Overview Card */}
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Score */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600">{stats.score}%</div>
                    <div className="mt-2 text-gray-500">Overall Score</div>
                  </div>
                  
                  {/* Time */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Timer className="h-6 w-6 text-amber-500 mr-2" />
                      <div className="text-2xl font-bold">{stats.timeTaken} min</div>
                    </div>
                    <div className="mt-2 text-gray-500">Time Taken</div>
                    <div className="mt-1 text-xs text-gray-400">
                      {stats.avgTimePerQuestion} sec per question
                    </div>
                  </div>
                  
                  {/* Question Breakdown */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-3 w-full">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{stats.correct}</div>
                        <div className="text-xs text-gray-500">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-600">{stats.incorrect}</div>
                        <div className="text-xs text-gray-500">Incorrect</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-amber-600">{stats.skipped}</div>
                        <div className="text-xs text-gray-500">Skipped</div>
                      </div>
                    </div>
                    <div className="w-full mt-3">
                      <div className="flex w-full h-2 overflow-hidden rounded-full">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(stats.correct / stats.totalQuestions) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(stats.incorrect / stats.totalQuestions) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-amber-500" 
                          style={{ width: `${(stats.skipped / stats.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Question Results</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Topic Performance */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Topic Performance</h3>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart
                          data={topicPerformance}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 'dataMax + 1']} />
                          <YAxis dataKey="name" type="category" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="correct" name="Correct" fill="#22c55e" />
                          <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Performance Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Strengths</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        You have a good understanding of Newton's First and Second Laws. Keep up the good work in these areas!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-800">Areas for Improvement</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        You may need to review Newton's Third Law. Consider revisiting related concepts and practicing with flashcards.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Related Concepts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Related Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {(exam.relatedConceptIds || []).map((conceptId, index) => (
                      <Link key={conceptId} to={`/dashboard/student/concepts/${conceptId}`}>
                        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                          <div className="font-medium">
                            {index === 0 ? "Newton's Laws of Motion" : "Force and Momentum"}
                          </div>
                          <ChevronLeft className="h-4 w-4 rotate-180" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Flashcards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Related Flashcards
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {(exam.relatedFlashcardIds || []).map((flashcardId, index) => (
                      <Link key={flashcardId} to={`/dashboard/student/flashcards/${flashcardId}`}>
                        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                          <div className="font-medium">
                            {index === 0 ? "Physics: Mechanics Quick Recap" : "Newton's Laws Practice Cards"}
                          </div>
                          <ChevronLeft className="h-4 w-4 rotate-180" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-6">
            {exam.questions.map((question, index) => (
              <Card key={question.id} className={
                userAnswers[question.id] === question.correctAnswer
                  ? 'border-green-200'
                  : question.id in userAnswers
                  ? 'border-red-200'
                  : 'border-amber-200'
              }>
                <CardHeader className={
                  userAnswers[question.id] === question.correctAnswer
                    ? 'bg-green-50 border-b border-green-200'
                    : question.id in userAnswers
                    ? 'bg-red-50 border-b border-red-200'
                    : 'bg-amber-50 border-b border-amber-200'
                }>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    {userAnswers[question.id] === question.correctAnswer ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Correct
                      </Badge>
                    ) : question.id in userAnswers ? (
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incorrect
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        Skipped
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <p className="mb-4">{question.text}</p>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`p-3 border rounded-md ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200'
                            : userAnswers[question.id] === optionIndex
                            ? 'bg-red-50 border-red-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border mr-3 text-sm font-medium">
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span>{option}</span>
                          </div>
                          
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {optionIndex === userAnswers[question.id] && optionIndex !== question.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {userAnswers[question.id] !== question.correctAnswer && question.id in userAnswers && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <h4 className="font-medium text-amber-800 mb-1">Explanation</h4>
                      <p className="text-sm text-amber-700">
                        {index === 0 
                          ? "Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force." 
                          : index === 1 
                          ? "Newton's Second Law relates force, mass, and acceleration through the equation F = ma."
                          : "Newton's Third Law states that for every action, there is an equal and opposite reaction."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6">
            {/* Time Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Time Distribution</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Average Time per Question</span>
                          <span>{stats.avgTimePerQuestion} sec</span>
                        </div>
                        <Progress value={(stats.avgTimePerQuestion / 120) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Time Spent on Correct Answers</span>
                          <span>{Math.round(stats.avgTimePerQuestion * 0.9)} sec</span>
                        </div>
                        <Progress value={((stats.avgTimePerQuestion * 0.9) / 120) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Time Spent on Incorrect Answers</span>
                          <span>{Math.round(stats.avgTimePerQuestion * 1.3)} sec</span>
                        </div>
                        <Progress value={((stats.avgTimePerQuestion * 1.3) / 120) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Time Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-blue-800">Efficient Time Usage</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            You completed the exam in {stats.timeTaken} minutes, which is {Math.round((stats.timeTaken / exam.duration) * 100)}% of the allowed time.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-800">Time-Saving Strategies</h4>
                          <p className="text-sm text-green-700 mt-1">
                            You spent less time on questions you knew well. This is an effective strategy for maximizing your score.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-800">Study Focus</h4>
                    </div>
                    <p className="text-sm text-blue-700 flex-grow">
                      Concentrate on Newton's Third Law, which appears to be challenging for you. 
                      Review the concept and related examples.
                    </p>
                    <Button variant="outline" className="mt-4 bg-white">
                      <Link to={`/dashboard/student/concepts/c4`} className="flex w-full justify-center">
                        View Concept
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-800">Practice Method</h4>
                    </div>
                    <p className="text-sm text-green-700 flex-grow">
                      Use flashcards to reinforce your understanding of Newton's Laws. 
                      Focus on applications and examples.
                    </p>
                    <Button variant="outline" className="mt-4 bg-white">
                      <Link to={`/dashboard/student/flashcards/f1`} className="flex w-full justify-center">
                        View Flashcards
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <h4 className="font-medium text-amber-800">Next Test</h4>
                    </div>
                    <p className="text-sm text-amber-700 flex-grow">
                      Consider taking a more focused test on Newton's Third Law 
                      after reviewing the material.
                    </p>
                    <Button variant="outline" className="mt-4 bg-white">
                      <Link to="/dashboard/student/exams" className="flex w-full justify-center">
                        Find Tests
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExamResultsPage;
