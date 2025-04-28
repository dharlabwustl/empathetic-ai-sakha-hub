
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, HelpCircle, Timer, PieChart, BarChart3, TrendingUp, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  userAnswerIndex: number | null;
  explanation: string;
}

interface ExamResult {
  id: string;
  title: string;
  subject: string;
  dateCompleted: string;
  duration: number;
  timeSpent: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  score: number;
  passingScore: number;
  questions: Question[];
}

const ExamReviewPage = () => {
  const { examId } = useParams();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockResult: ExamResult = {
          id: examId || '1',
          title: "Physics Mock Test: Mechanics",
          subject: "Physics",
          dateCompleted: new Date().toISOString(),
          duration: 60, // minutes
          timeSpent: 48, // minutes
          totalQuestions: 10,
          correctAnswers: 7,
          incorrectAnswers: 2,
          skippedQuestions: 1,
          score: 70,
          passingScore: 60,
          questions: Array.from({ length: 10 }, (_, i) => {
            // Generate different question patterns
            const isCorrect = i < 7; // First 7 are correct
            const isSkipped = i === 9; // Last one is skipped
            
            return {
              id: i + 1,
              text: `Question ${i+1}: This is a sample physics question about ${
                i % 3 === 0 ? "Newton's laws" : i % 3 === 1 ? "energy conservation" : "momentum"
              }. What is the correct answer?`,
              options: [
                'Option A: First potential answer',
                'Option B: Second potential answer',
                'Option C: Third potential answer',
                'Option D: Fourth potential answer'
              ],
              correctAnswerIndex: i % 4, // Correct answer varies
              userAnswerIndex: isSkipped ? null : isCorrect ? i % 4 : (i % 4 + 1) % 4, // User answer
              explanation: `The correct answer is option ${['A', 'B', 'C', 'D'][i % 4]} because of physics principles related to ${
                i % 3 === 0 ? "Newton's laws" : i % 3 === 1 ? "energy conservation" : "momentum"
              }.`
            };
          })
        };
        setResult(mockResult);
        setCurrentQuestionId(1); // Set first question as active
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [examId]);

  const getProficiencyLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600' };
    if (score >= 75) return { level: 'Good', color: 'text-blue-600' };
    if (score >= 60) return { level: 'Satisfactory', color: 'text-yellow-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFilterQuestions = (filter: string) => {
    setActiveTab(filter);
    // Set first question of filtered set as current
    if (result) {
      let firstQuestion;
      switch (filter) {
        case 'correct':
          firstQuestion = result.questions.find(q => 
            q.userAnswerIndex === q.correctAnswerIndex
          );
          break;
        case 'incorrect':
          firstQuestion = result.questions.find(q => 
            q.userAnswerIndex !== null && q.userAnswerIndex !== q.correctAnswerIndex
          );
          break;
        case 'skipped':
          firstQuestion = result.questions.find(q => 
            q.userAnswerIndex === null
          );
          break;
        default:
          firstQuestion = result.questions[0];
      }
      
      if (firstQuestion) {
        setCurrentQuestionId(firstQuestion.id);
      }
    }
  };

  const getFilteredQuestions = () => {
    if (!result) return [];
    
    switch (activeTab) {
      case 'correct':
        return result.questions.filter(q => q.userAnswerIndex === q.correctAnswerIndex);
      case 'incorrect':
        return result.questions.filter(q => q.userAnswerIndex !== null && q.userAnswerIndex !== q.correctAnswerIndex);
      case 'skipped':
        return result.questions.filter(q => q.userAnswerIndex === null);
      default:
        return result.questions;
    }
  };

  const currentQuestion = result?.questions.find(q => q.id === currentQuestionId) || null;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!result) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-center text-muted-foreground">Exam result not found</p>
    </div>
  );

  const proficiency = getProficiencyLevel(result.score);
  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Result summary card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl">{result.title} - Results</CardTitle>
            <Badge 
              className={result.score >= result.passingScore ? 
                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              } 
              variant="outline"
            >
              {result.score >= result.passingScore ? "Passed" : "Failed"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">Score</p>
                  <p className="font-medium">{result.score}%</p>
                </div>
                <Progress value={result.score} className="h-2" />
              </div>

              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Proficiency Level</p>
                <p className={`font-medium text-lg ${proficiency.color}`}>{proficiency.level}</p>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex justify-center mb-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
                  <p className="font-medium">{result.correctAnswers}</p>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex justify-center mb-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Incorrect</p>
                  <p className="font-medium">{result.incorrectAnswers}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-center mb-1">
                    <HelpCircle className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Skipped</p>
                  <p className="font-medium">{result.skippedQuestions}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-blue-500" />
                  <p className="text-gray-600 dark:text-gray-400">Time Spent</p>
                </div>
                <p className="font-medium">{result.timeSpent} minutes</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-purple-500" />
                  <p className="text-gray-600 dark:text-gray-400">Time Allotted</p>
                </div>
                <p className="font-medium">{result.duration} minutes</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-green-500" />
                  <p className="text-gray-600 dark:text-gray-400">Passing Score</p>
                </div>
                <p className="font-medium">{result.passingScore}%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-indigo-500" />
                  <p className="text-gray-600 dark:text-gray-400">Subject</p>
                </div>
                <p className="font-medium">{result.subject}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-amber-500" />
                  <p className="text-gray-600 dark:text-gray-400">Date Completed</p>
                </div>
                <p className="font-medium">{formatDate(result.dateCompleted)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Question review section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleFilterQuestions} className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All ({result.questions.length})</TabsTrigger>
              <TabsTrigger value="correct">Correct ({result.correctAnswers})</TabsTrigger>
              <TabsTrigger value="incorrect">Incorrect ({result.incorrectAnswers})</TabsTrigger>
              <TabsTrigger value="skipped">Skipped ({result.skippedQuestions})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Question list sidebar */}
            <div className="space-y-2">
              {filteredQuestions.map((question) => {
                const isCorrect = question.userAnswerIndex === question.correctAnswerIndex;
                const isSkipped = question.userAnswerIndex === null;
                
                return (
                  <Button
                    key={question.id}
                    variant={currentQuestionId === question.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setCurrentQuestionId(question.id)}
                  >
                    <span className="mr-2">Q{question.id}.</span>
                    {isSkipped ? (
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    ) : isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                );
              })}
            </div>
            
            {/* Question details */}
            <div className="md:col-span-3">
              {currentQuestion ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">{currentQuestion.text}</h3>
                    <div className="space-y-2 mt-4">
                      {currentQuestion.options.map((option, idx) => {
                        const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
                        const isUserAnswer = idx === currentQuestion.userAnswerIndex;
                        let optionClassName = "p-3 border rounded-md";
                        
                        if (isUserAnswer && isCorrectAnswer) {
                          optionClassName += " bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
                        } else if (isUserAnswer) {
                          optionClassName += " bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
                        } else if (isCorrectAnswer) {
                          optionClassName += " bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
                        }
                        
                        return (
                          <div key={idx} className={optionClassName}>
                            <div className="flex items-center justify-between">
                              <p>{option}</p>
                              {isCorrectAnswer ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                              ) : isUserAnswer ? (
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Explanation</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No questions to display.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamReviewPage;
