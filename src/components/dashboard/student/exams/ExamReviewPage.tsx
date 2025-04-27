
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, Download, Printer, Share2, BadgeCheck, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExamQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'checkbox' | 'short-answer' | 'long-answer';
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  feedback?: string;
}

interface ExamAttempt {
  id: string;
  examId: string;
  startedAt: string;
  completedAt: string;
  score: number;
  totalPoints: number;
  timeSpent: number; // in seconds
  answers: {
    questionId: string;
    userAnswer: any;
    correct: boolean;
    points: number;
    feedback?: string;
  }[];
  percentile?: number;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  questions: ExamQuestion[];
  attempt: ExamAttempt;
  averageScore?: number;
}

const ExamReviewPage = () => {
  const { examId } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState<ExamData | null>(null);

  useEffect(() => {
    const fetchExamReview = async () => {
      setLoading(true);
      try {
        // In a real application, fetch from API
        // For now, we're using mock data
        setTimeout(() => {
          const mockExamData: ExamData = {
            id: examId || '1',
            title: "Classical Mechanics - Mid-term Practice Test",
            subject: "Physics",
            topic: "Classical Mechanics",
            description: "This practice test covers Newton's laws, kinematics, and forces.",
            averageScore: 68,
            questions: [
              {
                id: "q1",
                text: "A 2 kg object experiences a net force of 10 N. What is its acceleration according to Newton's Second Law?",
                type: "multiple-choice",
                options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
                correctAnswer: "5 m/s²",
                points: 5,
                feedback: "According to Newton's Second Law, F = ma. Rearranging, a = F/m = 10/2 = 5 m/s²."
              },
              {
                id: "q2",
                text: "Which of the following are examples of Newton's Third Law? Select all that apply.",
                type: "checkbox",
                options: [
                  "A book resting on a table",
                  "A rocket pushing exhaust gases backward",
                  "A person walking forward",
                  "An object falling due to gravity"
                ],
                correctAnswer: ["A book resting on a table", "A rocket pushing exhaust gases backward", "A person walking forward"],
                points: 10,
                feedback: "Newton's Third Law states that for every action, there is an equal and opposite reaction. All options except 'An object falling due to gravity' demonstrate this principle directly."
              },
              {
                id: "q3",
                text: "Briefly explain the principle of conservation of momentum.",
                type: "short-answer",
                points: 15,
                feedback: "The principle of conservation of momentum states that the total momentum of an isolated system remains constant if no external forces act on it. Mathematically: p₁ + p₂ + ... = constant."
              },
              {
                id: "q4",
                text: "A projectile is launched at an angle of 45° with an initial velocity of 20 m/s. Calculate its maximum height and range. Assume g = 10 m/s².",
                type: "long-answer",
                points: 20,
                feedback: "For a projectile at 45°: Maximum height = v₀²sin²θ/(2g) = 20²×sin²45°/(2×10) = 10 m. Range = v₀²sin2θ/g = 20²×sin90°/10 = 40 m."
              }
            ],
            attempt: {
              id: "att1",
              examId: examId || '1',
              startedAt: new Date(Date.now() - 45 * 60000).toISOString(),
              completedAt: new Date().toISOString(),
              score: 35,
              totalPoints: 50,
              timeSpent: 2700, // 45 minutes
              percentile: 82,
              answers: [
                {
                  questionId: "q1",
                  userAnswer: "5 m/s²",
                  correct: true,
                  points: 5,
                  feedback: "Correct! You understood Newton's Second Law perfectly."
                },
                {
                  questionId: "q2",
                  userAnswer: ["A book resting on a table", "A rocket pushing exhaust gases backward"],
                  correct: false,
                  points: 6,
                  feedback: "You identified two correct examples but missed 'A person walking forward'."
                },
                {
                  questionId: "q3",
                  userAnswer: "The total momentum of a system remains constant when no external forces act on it.",
                  correct: true,
                  points: 15,
                  feedback: "Excellent explanation of conservation of momentum!"
                },
                {
                  questionId: "q4",
                  userAnswer: "Maximum height = 10 m, Range = 40 m",
                  correct: true,
                  points: 9,
                  feedback: "Your calculation is correct, but you didn't show your work completely."
                }
              ]
            }
          };
          
          setExamData(mockExamData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching exam review:', error);
        toast({
          title: "Error",
          description: "Failed to load exam review data",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchExamReview();
  }, [examId, toast]);

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully!"
    });
  };

  const handleShareResults = () => {
    toast({
      title: "Results Shared",
      description: "Your results have been shared with your teacher!"
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Exam Results Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested exam review could not be found.</p>
        <Link to="/dashboard/student/practice">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice Exams
          </Button>
        </Link>
      </div>
    );
  }

  const attempt = examData.attempt;
  const scorePercentage = (attempt.score / attempt.totalPoints) * 100;
  const scoreGrade = 
    scorePercentage >= 90 ? 'A' :
    scorePercentage >= 80 ? 'B' :
    scorePercentage >= 70 ? 'C' :
    scorePercentage >= 60 ? 'D' : 'F';

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500 dark:text-green-400';
    if (percentage >= 60) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };
  
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'D': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{examData.title} - Results</h1>
          <p className="text-muted-foreground">{examData.subject} • {examData.topic}</p>
        </div>
        <Link to="/dashboard/student/practice">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice Exams
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
            <CardDescription>
              Completed on {new Date(attempt.completedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold flex items-baseline gap-2">
                <span className={getScoreColor(scorePercentage)}>
                  {Math.round(scorePercentage)}%
                </span>
                <span className={`text-lg font-semibold px-2 py-0.5 rounded-md ${getGradeColor(scoreGrade)}`}>
                  {scoreGrade}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">
                  {attempt.score} / {attempt.totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">points earned</div>
              </div>
            </div>
            
            <Progress value={scorePercentage} className="h-3 rounded-md" />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-muted-foreground">Time Spent</div>
                <div className="font-semibold mt-1">{formatTime(attempt.timeSpent)}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-muted-foreground">Questions</div>
                <div className="font-semibold mt-1">
                  {attempt.answers.filter(a => a.correct).length} / {attempt.answers.length} correct
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="text-sm text-muted-foreground">Percentile</div>
                <div className="font-semibold mt-1">{attempt.percentile}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 -translate-y-8 translate-x-8">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 opacity-10 rounded-full"></div>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-violet-500" />
              Achievement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-full mb-4">
                <BadgeCheck className="h-12 w-12 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold">Top Performer</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                You scored higher than {attempt.percentile}% of students!
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={handleDownloadCertificate} className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button onClick={handleShareResults} className="w-full" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="questions">
        <TabsList className="mb-4">
          <TabsTrigger value="questions">Question Review</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
              <CardDescription>
                Review your answers and see detailed explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {examData.questions.map((question, index) => {
                  const answer = attempt.answers.find(a => a.questionId === question.id);
                  const isCorrect = answer?.correct;
                  
                  return (
                    <AccordionItem 
                      key={question.id} 
                      value={question.id} 
                      className={`border rounded-md ${isCorrect ? 'border-green-200' : 'border-red-200'}`}
                    >
                      <AccordionTrigger className="px-4">
                        <div className="flex items-center gap-3 text-left">
                          <div className={`p-1.5 rounded-full ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isCorrect ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">Question {index + 1}</div>
                            <div className="text-sm text-muted-foreground">
                              {isCorrect ? (
                                <span className="text-green-600 dark:text-green-400">
                                  {answer?.points} of {question.points} points earned
                                </span>
                              ) : (
                                <span className="text-red-600 dark:text-red-400">
                                  {answer?.points} of {question.points} points earned
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Question:</h4>
                            <p>{question.text}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Your Answer:</h4>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                              {Array.isArray(answer?.userAnswer) ? (
                                <ul className="list-disc list-inside">
                                  {answer?.userAnswer.map((ans, i) => (
                                    <li key={i}>{ans}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{answer?.userAnswer || 'No answer provided'}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Correct Answer:</h4>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                              {Array.isArray(question.correctAnswer) ? (
                                <ul className="list-disc list-inside">
                                  {question.correctAnswer.map((ans, i) => (
                                    <li key={i}>{ans}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{question.correctAnswer || 'See explanation below'}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Explanation:</h4>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                              <p>{question.feedback}</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>
                Review your strengths and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 border rounded-md">
                  <h3 className="text-lg font-medium mb-4">Score Comparison</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 rounded-full border-8 border-violet-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{Math.round(scorePercentage)}%</div>
                        <div className="text-xs text-muted-foreground">Your Score</div>
                      </div>
                    </div>
                    
                    <div className="w-32 h-32 rounded-full border-8 border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{examData.averageScore}%</div>
                        <div className="text-xs text-muted-foreground">Average Score</div>
                      </div>
                    </div>
                    
                    <div className="flex-1 pl-4">
                      <p className="mb-2">
                        You scored <span className="font-semibold">{Math.round(scorePercentage - (examData.averageScore || 0))}%</span> {scorePercentage > (examData.averageScore || 0) ? 'higher' : 'lower'} than the average.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This places you in the top {100 - attempt.percentile}% of test takers.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-md">
                    <h3 className="text-lg font-medium mb-4">Strengths</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Strong understanding of theoretical concepts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Good at explaining principles concisely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Quick at solving numerical problems</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <h3 className="text-lg font-medium mb-4">Areas to Improve</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 mt-0.5" />
                        <span>Pay more attention to multiple-choice selections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 mt-0.5" />
                        <span>Show complete working for calculation problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-amber-500 mt-0.5" />
                        <span>Review Newton's Third Law applications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <Button variant="outline" onClick={() => toast({ title: "Report Downloaded", description: "Full analysis report has been downloaded to your device" })}>
                <Download className="h-4 w-4 mr-2" />
                Download Full Analysis Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamReviewPage;
