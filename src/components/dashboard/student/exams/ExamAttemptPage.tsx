
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Save, Timer, AlertCircle, Flag, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'checkbox' | 'short-answer' | 'long-answer';
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  isBookmarked: boolean;
}

interface ExamData {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: ExamQuestion[];
}

const ExamAttemptPage = () => {
  const { examId } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<ExamData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        // In a real application, fetch from API
        // For now, we're using mock data
        setTimeout(() => {
          const mockExam: ExamData = {
            id: examId || '1',
            title: "Classical Mechanics - Mid-term Practice Test",
            description: "This practice test covers Newton's laws, kinematics, and forces. Complete all questions to get your score.",
            subject: "Physics",
            topic: "Classical Mechanics",
            duration: 30, // 30 minutes
            totalPoints: 50,
            questions: [
              {
                id: "q1",
                text: "A 2 kg object experiences a net force of 10 N. What is its acceleration according to Newton's Second Law?",
                type: "multiple-choice",
                options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
                correctAnswer: "5 m/s²",
                points: 5,
                isBookmarked: false
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
                isBookmarked: false
              },
              {
                id: "q3",
                text: "Briefly explain the principle of conservation of momentum.",
                type: "short-answer",
                points: 15,
                isBookmarked: false
              },
              {
                id: "q4",
                text: "A projectile is launched at an angle of 45° with an initial velocity of 20 m/s. Calculate its maximum height and range. Assume g = 10 m/s².",
                type: "long-answer",
                points: 20,
                isBookmarked: false
              }
            ]
          };
          
          setExam(mockExam);
          setTimeRemaining(mockExam.duration * 60);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching exam:', error);
        toast({
          title: "Error",
          description: "Failed to load exam data",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId, toast]);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining > 0 && !loading && !isSubmitting) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !loading && !isSubmitting) {
      // Auto submit when time is up
      handleSubmitExam();
    }
  }, [timeRemaining, loading, isSubmitting]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (exam?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChangeAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleToggleBookmark = (questionId: string) => {
    if (bookmarked.includes(questionId)) {
      setBookmarked(bookmarked.filter(id => id !== questionId));
    } else {
      setBookmarked([...bookmarked, questionId]);
    }
    
    toast({
      title: bookmarked.includes(questionId) ? 'Bookmark removed' : 'Question bookmarked',
      description: bookmarked.includes(questionId) 
        ? 'This question has been removed from your bookmarks' 
        : 'You can review this question later',
      duration: 2000
    });
  };

  const handleSubmitExam = () => {
    setIsSubmitting(true);
    toast({
      title: "Submitting Your Answers",
      description: "Please wait while we process your exam submission..."
    });
    
    // In a real application, would submit to an API
    setTimeout(() => {
      toast({
        title: "Exam Submitted",
        description: "Your answers have been recorded successfully!"
      });
      
      // Redirect to review page
      window.location.href = `/dashboard/student/exams/review/${examId}`;
    }, 1500);
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
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Exam Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested exam could not be found.</p>
        <Link to="/dashboard/student/practice">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice Exams
          </Button>
        </Link>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const questionsAnswered = Object.keys(answers).length;
  const progress = (questionsAnswered / exam.questions.length) * 100;
  
  const isTimeWarning = timeRemaining < 300; // Less than 5 minutes
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <p className="text-muted-foreground">{exam.subject} • {exam.topic}</p>
        </div>
        <div className={`flex items-center gap-2 ${isTimeWarning ? 'text-red-500' : ''}`}>
          <Timer className={`h-5 w-5 ${isTimeWarning ? 'animate-pulse' : ''}`} />
          <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {exam.questions.length}
        </div>
        <Badge variant="outline">
          {questionsAnswered} of {exam.questions.length} answered
        </Badge>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <Card className="border-t-4" style={{ borderTopColor: bookmarked.includes(currentQuestion.id) ? '#f59e0b' : '#6366f1' }}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="px-2 py-0.5">
              {currentQuestion.points} points
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleToggleBookmark(currentQuestion.id)}
              className={bookmarked.includes(currentQuestion.id) ? "text-amber-500" : ""}
            >
              <Flag className="h-4 w-4 mr-1" />
              {bookmarked.includes(currentQuestion.id) ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
          <CardTitle className="text-lg">{currentQuestion.text}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {currentQuestion.type === 'multiple-choice' && (
            <RadioGroup 
              value={answers[currentQuestion.id] || ''}
              onValueChange={(value) => handleChangeAnswer(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentQuestion.type === 'checkbox' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => {
                const checked = Array.isArray(answers[currentQuestion.id]) && 
                  answers[currentQuestion.id]?.includes(option);
                  
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`option-${index}`} 
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const currentAnswers = Array.isArray(answers[currentQuestion.id]) 
                          ? [...answers[currentQuestion.id]] 
                          : [];
                          
                        if (isChecked) {
                          handleChangeAnswer(currentQuestion.id, [...currentAnswers, option]);
                        } else {
                          handleChangeAnswer(
                            currentQuestion.id, 
                            currentAnswers.filter(ans => ans !== option)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                  </div>
                );
              })}
            </div>
          )}
          
          {currentQuestion.type === 'short-answer' && (
            <Input 
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleChangeAnswer(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here"
              className="w-full"
            />
          )}
          
          {currentQuestion.type === 'long-answer' && (
            <Textarea 
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleChangeAnswer(currentQuestion.id, e.target.value)}
              placeholder="Write your answer here"
              className="w-full min-h-[150px]"
            />
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {currentQuestionIndex < exam.questions.length - 1 ? (
            <Button onClick={handleNextQuestion}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} variant="outline">
              Review Answers <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Started at {new Date().toLocaleTimeString()}</span>
        </div>
        
        <Button 
          onClick={handleSubmitExam}
          disabled={questionsAnswered === 0 || isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? "Submitting..." : "Submit Exam"}
          {!isSubmitting && <Save className="h-4 w-4" />}
        </Button>
      </div>
      
      {isTimeWarning && (
        <div className="fixed bottom-6 right-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-semibold">Time is running out!</p>
              <p className="text-sm">Less than 5 minutes remaining</p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ExamAttemptPage;
