
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Bookmark, 
  ArrowLeft, 
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId?: string;
  explanation?: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // in minutes
  totalMarks: number;
  questions: ExamQuestion[];
}

export default function ExamTakingPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // States
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);
  const [timer, setTimer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockExam: Exam = {
        id: examId || '1',
        title: "Physics: Mechanics and Motion",
        description: "Test your understanding of basic mechanics concepts including Newton's laws and kinematics.",
        subject: "Physics",
        duration: 30, // 30 minutes
        totalMarks: 50,
        questions: [
          {
            id: "q1",
            text: "According to Newton's First Law of Motion, an object at rest will remain at rest and an object in motion will remain in motion with the same speed and in the same direction unless acted upon by...",
            options: [
              { id: "a1", text: "Gravitational force only" },
              { id: "a2", text: "An unbalanced force" },
              { id: "a3", text: "Another object of equal mass" },
              { id: "a4", text: "Frictional force only" }
            ],
            correctOptionId: "a2",
            explanation: "Newton's First Law of Motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an unbalanced force. This property of objects is called inertia.",
            subject: "Physics",
            topic: "Newton's Laws",
            difficulty: "medium"
          },
          {
            id: "q2",
            text: "What is the formula for calculating kinetic energy?",
            options: [
              { id: "a1", text: "KE = mv" },
              { id: "a2", text: "KE = mv²" },
              { id: "a3", text: "KE = (1/2)mv²" },
              { id: "a4", text: "KE = (1/2)m²v" }
            ],
            correctOptionId: "a3",
            explanation: "The formula for kinetic energy is KE = (1/2)mv², where m is mass and v is velocity.",
            subject: "Physics",
            topic: "Energy",
            difficulty: "easy"
          },
          {
            id: "q3",
            text: "A 2 kg object accelerates at 5 m/s². What is the force applied to it according to Newton's Second Law?",
            options: [
              { id: "a1", text: "2.5 N" },
              { id: "a2", text: "7 N" },
              { id: "a3", text: "10 N" },
              { id: "a4", text: "0.4 N" }
            ],
            correctOptionId: "a3",
            explanation: "Using Newton's Second Law: F = ma, where F is force, m is mass, and a is acceleration. F = 2 kg × 5 m/s² = 10 N",
            subject: "Physics",
            topic: "Newton's Laws",
            difficulty: "medium"
          },
          {
            id: "q4",
            text: "A car accelerates from rest to 20 m/s in 10 seconds. What is its acceleration?",
            options: [
              { id: "a1", text: "0.5 m/s²" },
              { id: "a2", text: "2 m/s²" },
              { id: "a3", text: "10 m/s²" },
              { id: "a4", text: "20 m/s²" }
            ],
            correctOptionId: "a2",
            explanation: "Acceleration = change in velocity / time taken. Acceleration = (20 m/s - 0 m/s) / 10 s = 2 m/s²",
            subject: "Physics",
            topic: "Kinematics",
            difficulty: "easy"
          },
          {
            id: "q5",
            text: "Which of the following is NOT conserved in an elastic collision?",
            options: [
              { id: "a1", text: "Momentum" },
              { id: "a2", text: "Kinetic energy" },
              { id: "a3", text: "Mechanical energy" },
              { id: "a4", text: "Mass" }
            ],
            correctOptionId: "a3",
            explanation: "In an elastic collision, both momentum and kinetic energy are conserved. Mechanical energy (which includes potential energy) is not necessarily conserved if there's a change in potential energy.",
            subject: "Physics",
            topic: "Conservation Laws",
            difficulty: "hard"
          }
        ]
      };

      setExam(mockExam);
      setTimer(mockExam.duration * 60); // Convert minutes to seconds
      setTimeRemaining(mockExam.duration * 60);
      setLoading(false);
    }, 1500);
  }, [examId]);

  // Timer effect
  useEffect(() => {
    if (loading || timeRemaining === null) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loading, timeRemaining]);

  // Time warning effects
  useEffect(() => {
    if (timeRemaining === 300) { // 5 minutes warning
      toast({
        title: "Time Alert",
        description: "5 minutes remaining! Please start finalizing your answers.",
        variant: "warning",
      });
    } else if (timeRemaining === 60) { // 1 minute warning
      toast({
        title: "Time Alert",
        description: "Only 1 minute remaining!",
        variant: "destructive",
      });
    } else if (timeRemaining === 0) {
      toast({
        title: "Time's Up!",
        description: "Your exam is being submitted automatically.",
        variant: "destructive",
      });
      handleSubmit();
    }
  }, [timeRemaining]);

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (!exam) return;
    
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleBookmarkQuestion = (questionId: string) => {
    setBookmarkedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
    
    toast({
      title: "Question Bookmarked",
      description: "This question has been saved for later review.",
    });
  };

  const handleSubmit = () => {
    if (!exam) return;
    
    setIsSubmitting(true);
    
    // Calculate score
    let score = 0;
    exam.questions.forEach(question => {
      if (answers[question.id] === question.correctOptionId) {
        score++;
      }
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/dashboard/student/practice-exam/${examId}/review`, { 
        state: { 
          answers,
          score,
          totalQuestions: exam.questions.length,
          timeSpent: timer ? timer - (timeRemaining || 0) : 0,
          flaggedQuestions,
          bookmarkedQuestions
        } 
      });
    }, 1500);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!exam) return 0;
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / exam.questions.length) * 100;
  };

  const currentQuestion = exam?.questions[currentQuestionIndex];

  if (loading || !exam || !currentQuestion) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <Card className="w-full h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
            <p className="text-xl font-medium mb-2">Loading Exam</p>
            <p className="text-muted-foreground">Preparing your practice exam...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl">{exam.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{exam.subject}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Time: {formatTime(timeRemaining)}
              </Badge>
              <Badge variant="outline">
                {currentQuestionIndex + 1}/{exam.questions.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
            <span>Progress: {Math.round(calculateProgress())}% complete</span>
            <span>{Object.keys(answers).length}/{exam.questions.length} answered</span>
          </div>
          <Progress value={calculateProgress()} className="h-2 mb-4" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question navigation panel - shown on larger screens */}
        <Card className="hidden lg:block h-fit">
          <CardHeader>
            <CardTitle className="text-base">Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, index) => (
                <Button 
                  key={q.id}
                  variant={currentQuestionIndex === index ? "default" : answers[q.id] ? "secondary" : "outline"}
                  size="sm"
                  className={`min-w-8 h-8 p-0 relative ${
                    flaggedQuestions.includes(q.id) ? "border-red-500 border-2" : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                  {flaggedQuestions.includes(q.id) && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></div>
                  )}
                  {bookmarkedQuestions.includes(q.id) && (
                    <div className="absolute -top-1 -left-1 bg-amber-500 rounded-full w-2 h-2"></div>
                  )}
                </Button>
              ))}
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Flagged: {flaggedQuestions.length}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Bookmarked: {bookmarkedQuestions.length}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Answered: {Object.keys(answers).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main question card */}
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge 
                  className={`mb-2 ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {currentQuestion.difficulty} difficulty
                </Badge>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-medium">Question {currentQuestionIndex + 1}</span>
                  <Badge variant="outline" className="text-xs">{currentQuestion.topic}</Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-100"
                  onClick={() => handleFlagQuestion(currentQuestion.id)}
                >
                  <Flag className={`h-4 w-4 ${flaggedQuestions.includes(currentQuestion.id) ? 'fill-red-500' : ''}`} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-amber-500 hover:text-amber-600 hover:bg-amber-100"
                  onClick={() => handleBookmarkQuestion(currentQuestion.id)}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarkedQuestions.includes(currentQuestion.id) ? 'fill-amber-500' : ''}`} />
                </Button>
              </div>
            </div>
            <p className="text-base">{currentQuestion.text}</p>
          </CardHeader>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              {currentQuestion.options.map(option => (
                <motion.div 
                  key={option.id}
                  whileTap={{ scale: 0.98 }}
                >
                  <label 
                    htmlFor={option.id}
                    className={`flex items-start p-3 border rounded-md cursor-pointer transition-all ${
                      answers[currentQuestion.id] === option.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-gray-50 hover:dark:bg-gray-800/50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      id={option.id}
                      name={`question-${currentQuestion.id}`}
                      checked={answers[currentQuestion.id] === option.id}
                      onChange={() => handleSelectAnswer(currentQuestion.id, option.id)}
                      className="mt-1 mr-3"
                    />
                    <span>{option.text}</span>
                  </label>
                </motion.div>
              ))}
            </div>
            
            {answers[currentQuestion.id] && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mt-4">
                <Check className="h-4 w-4" />
                <span className="text-sm">Answer selected</span>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-4 border-t flex flex-wrap justify-between items-center bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === exam.questions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Exit
              </Button>
              <Button 
                variant="default" 
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Answers'
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Time warning */}
      {timeRemaining !== null && timeRemaining < 300 && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium">Time running out!</p>
            <p className="text-sm">{formatTime(timeRemaining)} remaining</p>
          </div>
        </div>
      )}
    </div>
  );
}
