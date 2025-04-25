
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Link as LinkIcon, Award, CheckCircle, XCircle, ChevronRight, ChartBar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamResult {
  id: string;
  title: string;
  subject: string;
  topic: string;
  completedAt: string;
  duration: number;
  timeSpent: number;
  score: number;
  questions: Question[];
  userAnswers: Record<string, number>;
  linkedConceptIds: string[];
  linkedFlashcardIds: string[];
}

const PracticeExamReviewPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Mock data loading - would be API call in real implementation
  useEffect(() => {
    const loadExamResult = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock exam result data
        const mockResult: ExamResult = {
          id: examId || '1',
          title: 'Algebra Level 1 Mini Test',
          subject: 'Mathematics',
          topic: 'Algebra',
          completedAt: '2025-04-24T15:30:00Z',
          duration: 30, // 30 minutes
          timeSpent: 22, // 22 minutes
          score: 75, // 75%
          questions: [
            {
              id: 'q1',
              text: 'Solve for x: 2x + 3 = 7',
              options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
              correctAnswer: 1,
              explanation: 'To solve, subtract 3 from both sides: 2x = 4, then divide by 2: x = 2'
            },
            {
              id: 'q2',
              text: 'Simplify: 3(x + 2) - 4',
              options: ['3x + 2', '3x + 6 - 4', '3x + 2', '3x + 6'],
              correctAnswer: 0,
              explanation: 'Distributing the 3: 3x + 6, then subtracting 4: 3x + 2'
            },
            {
              id: 'q3',
              text: 'If f(x) = x² + 1, then f(3) = ?',
              options: ['4', '8', '9', '10'],
              correctAnswer: 3,
              explanation: 'f(3) = 3² + 1 = 9 + 1 = 10'
            },
            {
              id: 'q4',
              text: 'Solve the inequality: 2x - 5 > 3',
              options: ['x > 4', 'x > 3', 'x < 4', 'x = 4'],
              correctAnswer: 0,
              explanation: '2x - 5 > 3 means 2x > 8, so x > 4'
            },
          ],
          userAnswers: {
            'q1': 1, // correct
            'q2': 2, // incorrect
            'q3': 3, // correct
            'q4': 1, // incorrect
          },
          linkedConceptIds: ['concept-1', 'concept-2'],
          linkedFlashcardIds: ['flashcard-1', 'flashcard-3']
        };
        
        setExamResult(mockResult);
      } catch (error) {
        console.error('Error loading exam results:', error);
        toast({
          title: "Error",
          description: "Could not load the exam results. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadExamResult();
  }, [examId, toast]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading Results...</h2>
            <div className="w-full max-w-md mx-auto">
              <Progress value={40} className="h-1.5" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!examResult) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Results Not Found</h2>
            <Button onClick={() => navigate('/dashboard/student/exams')}>
              Go to Practice Tests
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const currentQuestion = examResult.questions[currentQuestionIndex];
  const userAnswer = examResult.userAnswers[currentQuestion.id];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  
  // Calculate stats
  const totalQuestions = examResult.questions.length;
  const correctAnswers = Object.keys(examResult.userAnswers).filter(
    qId => examResult.userAnswers[qId] === examResult.questions.find(q => q.id === qId)?.correctAnswer
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <Button
              variant="ghost"
              className="mb-2 -ml-4 text-blue-600 hover:text-blue-700"
              onClick={() => navigate('/dashboard/student/exams')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Practice Tests
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{examResult.title} - Results</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{examResult.subject}</Badge>
              {examResult.topic && <Badge variant="outline">{examResult.topic}</Badge>}
              <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-3xl font-bold text-blue-600">{examResult.score}%</div>
            <div className="text-sm text-gray-500">
              Completed on {formatDate(examResult.completedAt)}
            </div>
          </div>
        </div>
        
        {/* Performance Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-blue-700">Score</div>
                <div className="text-2xl font-bold text-blue-800">{examResult.score}%</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-green-700">Correct</div>
                <div className="text-2xl font-bold text-green-800">{correctAnswers}/{totalQuestions}</div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-sm text-red-700">Incorrect</div>
                <div className="text-2xl font-bold text-red-800">{incorrectAnswers}/{totalQuestions}</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-purple-700">Time Spent</div>
                <div className="text-2xl font-bold text-purple-800">{examResult.timeSpent} min</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Question Review */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Question {currentQuestionIndex + 1} Review</CardTitle>
              <Badge className={isCorrect ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                {isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2">
            <p className="text-lg mb-4">{currentQuestion.text}</p>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg ${
                    index === currentQuestion.correctAnswer && index === userAnswer
                      ? 'bg-green-50 border-green-500' 
                      : index === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : index === userAnswer
                          ? 'bg-red-50 border-red-500'
                          : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                        index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white' 
                          : index === userAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                    
                    {index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    
                    {index === userAnswer && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Explanation */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-1">Explanation</h3>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </Button>
            
            <Button 
              onClick={() => setCurrentQuestionIndex(prev => Math.min(examResult.questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === examResult.questions.length - 1}
            >
              Next Question
            </Button>
          </CardFooter>
        </Card>
        
        {/* Question Navigation */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Question Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {examResult.questions.map((q, index) => {
              const isAnswerCorrect = examResult.userAnswers[q.id] === q.correctAnswer;
              
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    currentQuestionIndex === index
                      ? 'bg-blue-500 text-white'
                      : isAnswerCorrect
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Linked Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <LinkIcon className="h-4 w-4 mr-2 text-blue-600" />
                Related Concept Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 border rounded-md hover:bg-gray-50">
                  <Link to="/dashboard/student/concepts/concept-1" className="flex justify-between items-center">
                    <span>Algebra Fundamentals</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
                <li className="p-2 border rounded-md hover:bg-gray-50">
                  <Link to="/dashboard/student/concepts/concept-2" className="flex justify-between items-center">
                    <span>Solving Linear Equations</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <LinkIcon className="h-4 w-4 mr-2 text-blue-600" />
                Related Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 border rounded-md hover:bg-gray-50">
                  <Link to="/dashboard/student/flashcards/flashcard-1" className="flex justify-between items-center">
                    <span>Algebra Equations Practice</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
                <li className="p-2 border rounded-md hover:bg-gray-50">
                  <Link to="/dashboard/student/flashcards/flashcard-3" className="flex justify-between items-center">
                    <span>Functions and Graphs</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to={`/dashboard/student/exams/${examId}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              <Award className="h-4 w-4 mr-2" />
              Retry Exam
            </Button>
          </Link>
          
          <Link to="/dashboard/student/exams">
            <Button className="w-full sm:w-auto">
              <ChartBar className="h-4 w-4 mr-2" />
              Find Similar Tests
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default PracticeExamReviewPage;
