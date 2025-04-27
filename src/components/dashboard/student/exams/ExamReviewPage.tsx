
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, X, Clock, Award, AlertCircle, BarChart2, 
  BookOpen, ArrowLeft, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // minutes
  totalQuestions: number;
  questions: ExamQuestion[];
}

interface ExamReviewPageProps {}

const ExamReviewPage: React.FC<ExamReviewPageProps> = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  
  // Get data from location state or generate mock data
  const examFromState = location.state?.exam as Exam | undefined;
  const selectedAnswersFromState = location.state?.selectedAnswers as Record<string, number> | undefined;
  const timeSpentFromState = location.state?.timeSpent as number | undefined;
  
  const [exam, setExam] = useState<Exam | null>(examFromState || null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(selectedAnswersFromState || {});
  const [loading, setLoading] = useState(!examFromState);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, unanswered: 0, percentage: 0 });
  const [timeSpent, setTimeSpent] = useState<number>(timeSpentFromState || 0);

  // Generate mock data if not provided through state
  useEffect(() => {
    if (!examFromState) {
      setLoading(true);
      
      setTimeout(() => {
        const mockExam = generateMockExam(examId || '');
        setExam(mockExam);
        
        // Generate mock answers
        const mockAnswers: Record<string, number> = {};
        mockExam.questions.forEach((q, index) => {
          // 60% chance of correct answer, 30% chance of incorrect, 10% chance of unanswered
          const rand = Math.random();
          if (rand < 0.6) {
            mockAnswers[q.id] = q.correctAnswer;
          } else if (rand < 0.9) {
            mockAnswers[q.id] = (q.correctAnswer + 1) % q.options.length;
          }
        });
        
        setSelectedAnswers(mockAnswers);
        setTimeSpent(mockExam.duration * 60 * 0.7); // Used 70% of allotted time
        setLoading(false);
      }, 800);
    }
  }, [examId, examFromState]);

  // Calculate score when exam and answers are available
  useEffect(() => {
    if (exam && Object.keys(selectedAnswers).length) {
      calculateScore();
      identifyWeakAreas();
    }
  }, [exam, selectedAnswers]);

  const generateMockExam = (id: string): Exam => {
    const formattedExamName = formatExamName(id);
    const subject = determineSubject(id);
    
    return {
      id,
      title: formattedExamName,
      subject,
      description: `This exam tests your knowledge of ${formattedExamName}.`,
      duration: 60, // 60 minutes
      totalQuestions: 5,
      questions: [
        {
          id: "q1",
          question: `What is the primary focus of ${formattedExamName}?`,
          options: [
            "Understanding key theoretical concepts",
            "Applying mathematical formulas",
            "Memorizing important definitions",
            "Analyzing experimental data"
          ],
          correctAnswer: 0,
          explanation: "The primary focus is on understanding the underlying theoretical concepts that form the foundation of the subject."
        },
        {
          id: "q2",
          question: `Which of the following is NOT a characteristic of ${formattedExamName}?`,
          options: [
            "Systematic approach to problem-solving",
            "Reliance on empirical evidence",
            "Subjective interpretation of results",
            "Application of scientific principles"
          ],
          correctAnswer: 2,
          explanation: "Subjective interpretation contradicts the objective nature of scientific inquiry in this field."
        },
        {
          id: "q3",
          question: `How does ${formattedExamName} relate to real-world applications?`,
          options: [
            "It has no practical applications",
            "It is used only in theoretical research",
            "It has widespread applications in industry and technology",
            "It is primarily used in academic settings"
          ],
          correctAnswer: 2,
          explanation: "This subject has numerous practical applications across various industries and technological developments."
        },
        {
          id: "q4",
          question: `What is the historical significance of ${formattedExamName}?`,
          options: [
            "It emerged in the 21st century",
            "It has roots dating back to ancient civilizations",
            "It was developed exclusively in Western Europe",
            "It has no historical significance"
          ],
          correctAnswer: 1,
          explanation: "Many of the key concepts can be traced back to early scientific discoveries in ancient civilizations."
        },
        {
          id: "q5",
          question: `Which scientist made the most significant contribution to ${formattedExamName}?`,
          options: [
            "Albert Einstein",
            "Marie Curie",
            "Isaac Newton",
            "Depends on the specific area of focus"
          ],
          correctAnswer: 3,
          explanation: "Different scientists made significant contributions to different aspects of this field."
        }
      ]
    };
  };

  // Helper functions to format names
  const formatExamName = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const determineSubject = (topic: string): string => {
    const topics = {
      Physics: ["physics", "newton", "motion", "gravity", "force", "energy", "wave", "optics"],
      Chemistry: ["chemistry", "acid", "element", "compound", "reaction", "bond", "periodic"],
      Mathematics: ["math", "algebra", "calculus", "geometry", "trigonometry", "equation"],
      Biology: ["biology", "cell", "gene", "evolution", "ecosystem", "dna", "organ"]
    };

    for (const [subject, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => topic.toLowerCase().includes(keyword))) {
        return subject;
      }
    }
    return "General Science";
  };

  const calculateScore = () => {
    if (!exam) return;
    
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    exam.questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      
      if (userAnswer === undefined) {
        unanswered++;
      } else if (userAnswer === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    
    const percentage = Math.round((correct / exam.questions.length) * 100);
    
    setScore({
      correct,
      incorrect,
      unanswered,
      percentage
    });
  };

  const identifyWeakAreas = () => {
    if (!exam) return;
    
    const weakTopics: string[] = [];
    
    // This is a simplified approach - in a real app you would have topic categories for questions
    exam.questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      
      if (userAnswer !== undefined && userAnswer !== question.correctAnswer) {
        // Extract topics based on question text (simplified for demo)
        const words = question.question.split(' ');
        const significantWords = words.filter(word => 
          word.length > 5 && 
          !['primary', 'following', 'characteristic', 'relates', 'historical', 'significant'].includes(word.toLowerCase())
        );
        
        if (significantWords.length > 0) {
          weakTopics.push(significantWords[0]);
        }
      }
    });
    
    setWeakAreas([...new Set(weakTopics)]);
  };

  const handleNextQuestion = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetakeExam = () => {
    navigate(`/dashboard/student/exams/attempt/${examId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreComment = (percentage: number): string => {
    if (percentage >= 90) return "Excellent! You've mastered this topic.";
    if (percentage >= 80) return "Great job! You have a strong understanding.";
    if (percentage >= 70) return "Good work! Keep reinforcing these concepts.";
    if (percentage >= 60) return "You're on the right track. Keep studying.";
    if (percentage >= 50) return "You have a basic grasp. More practice needed.";
    return "This area needs significant improvement. Focus your study here.";
  };

  if (loading) {
    return (
      <SharedPageLayout title="Loading Results" subtitle="Please wait while we analyze your exam">
        <div className="space-y-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-2/3 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!exam) {
    return (
      <SharedPageLayout title="Exam Not Found" subtitle="We couldn't find the requested exam results">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p>Sorry, the exam results you're looking for don't seem to exist.</p>
            <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestion.id];
  const isAnswerCorrect = userAnswer === currentQuestion.correctAnswer;
  const progressPercentage = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
  return (
    <SharedPageLayout 
      title="Exam Review"
      subtitle={`${exam.title} - Result Analysis`}
      backButton={true}
      onBack={handleGoBack}
    >
      <div className="space-y-6">
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6 pt-4">
            {/* Score Overview Card */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Score Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold mb-2 relative">
                    <span className={getScoreColor(score.percentage)}>{score.percentage}%</span>
                    <div className="absolute top-0 right-0 transform translate-x-full -translate-y-1/4">
                      {score.percentage >= 70 && (
                        <span className="text-xl">🏆</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {getScoreComment(score.percentage)}
                  </p>
                  <Progress value={score.percentage} className="h-2 w-full max-w-xs" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                    <div className="flex justify-center mb-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="font-bold text-xl text-green-700">{score.correct}</div>
                    <div className="text-xs text-green-600">Correct</div>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-lg text-center border border-red-100">
                    <div className="flex justify-center mb-1">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="font-bold text-xl text-red-700">{score.incorrect}</div>
                    <div className="text-xs text-red-600">Incorrect</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-200">
                    <div className="flex justify-center mb-1">
                      <AlertCircle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="font-bold text-xl text-gray-700">{score.unanswered}</div>
                    <div className="text-xs text-gray-600">Unanswered</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Time Analysis</span>
                    </div>
                    <span className="text-sm text-blue-700">{formatTime(timeSpent)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-blue-600">
                    <span>Average time per question: {formatTime(Math.round(timeSpent / exam.questions.length))}</span>
                    <span>{Math.round((timeSpent / (exam.duration * 60)) * 100)}% of allowed time</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Improvement Areas Card */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-violet-500" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weakAreas.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Based on your responses, we recommend focusing on these topics:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {weakAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <h4 className="text-sm font-medium">Study Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Review the incorrect questions in the Detailed Review tab</li>
                        <li>Revisit the concepts related to your weak areas</li>
                        <li>Practice with additional flashcards on these topics</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-green-600 mb-2">Excellent work!</p>
                    <p className="text-sm text-muted-foreground">
                      You did very well on this exam. Continue practicing to maintain your knowledge.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Actions Card */}
            <div className="flex gap-4 justify-center pt-4">
              <Button onClick={handleRetakeExam} variant="outline" className="flex-1 sm:flex-initial">
                <RefreshIcon className="h-4 w-4 mr-2" /> Retake Exam
              </Button>
              <Button onClick={() => navigate(`/dashboard/student/practice/${exam.subject.toLowerCase()}`)} className="flex-1 sm:flex-initial">
                <BookOpen className="h-4 w-4 mr-2" /> Practice More
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6 pt-4">
            {/* Question Navigator */}
            <div className="flex items-center justify-between">
              <span className="text-sm">
                Question {currentQuestionIndex + 1} of {exam.questions.length}
              </span>
              <Progress value={progressPercentage} className="w-24 h-2" />
            </div>
            
            {/* Question Review */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm">
                        {currentQuestionIndex + 1}
                      </span>
                      <span>{currentQuestion.question}</span>
                    </CardTitle>
                    
                    <Badge variant={
                      userAnswer === undefined ? "outline" :
                      isAnswerCorrect ? "success" : "destructive"
                    }>
                      {userAnswer === undefined ? "Unanswered" :
                       isAnswerCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={userAnswer?.toString()} className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const isCorrect = index === currentQuestion.correctAnswer;
                      const isSelected = index === userAnswer;
                      
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            isCorrect ? "bg-green-50 border border-green-200" : 
                            isSelected && !isCorrect ? "bg-red-50 border border-red-200" : ""
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`q${currentQuestionIndex}-opt${index}`} disabled />
                          <Label htmlFor={`q${currentQuestionIndex}-opt${index}`} className="flex-1 py-2">
                            {option}
                          </Label>
                          {isCorrect && <Check className="h-4 w-4 text-green-600" />}
                          {isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                        </div>
                      );
                    })}
                  </RadioGroup>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                    <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === exam.questions.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Question Navigator Buttons */}
            <div className="pt-4">
              <div className="flex justify-center">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-md">
                  {exam.questions.map((q, index) => {
                    const isCurrentQuestion = index === currentQuestionIndex;
                    const userAnswerForQ = selectedAnswers[q.id];
                    const isCorrect = userAnswerForQ === q.correctAnswer;
                    
                    let backgroundColor = "bg-gray-100"; // Unanswered
                    if (userAnswerForQ !== undefined) {
                      backgroundColor = isCorrect ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300";
                    }
                    
                    return (
                      <Button
                        key={q.id}
                        variant={isCurrentQuestion ? "default" : "outline"}
                        className={`h-10 w-10 p-0 ${isCurrentQuestion ? "" : backgroundColor}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

// Helper icon component
const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

export default ExamReviewPage;
