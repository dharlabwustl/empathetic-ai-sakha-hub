
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Timer, Flag, CheckSquare, ArrowLeft, ArrowRight, 
  AlertTriangle, CheckCircle, HelpCircle, Send
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';
import DashboardContainer from '@/components/dashboard/student/DashboardContainer';
import { ExamQuestion } from '@/types/user/exam';
import FlashcardCalculator from '../flashcards/FlashcardCalculator';

const ExamAttemptPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  // Exam details - would be fetched from API in a real app
  const [examDetails, setExamDetails] = useState({
    id: examId || '',
    title: "JEE Advanced Physics Mock Test",
    duration: 180, // minutes
    totalQuestions: 10,
  });
  
  // Sample questions for demo
  const [questions, setQuestions] = useState<ExamQuestion[]>([
    {
      id: "q1",
      question: "A body of mass 'm' is thrown with a velocity 'v' at an angle 'θ' with the horizontal. The horizontal range of the projectile will be:",
      options: [
        "v²sin(2θ)/g", 
        "2v²sin(θ)/g", 
        "v²sin(2θ)/2g", 
        "v²sin²(θ)/g"
      ],
      correctAnswer: "v²sin(2θ)/g",
      explanation: "The horizontal range of a projectile is given by the formula R = v²sin(2θ)/g, where v is the initial velocity, θ is the angle with the horizontal, and g is the acceleration due to gravity.",
      type: "multiple-choice",
      points: 4
    },
    {
      id: "q2",
      question: "Which of the following phenomena demonstrate the wave nature of light? (Select all that apply)",
      options: [
        "Interference", 
        "Photoelectric effect", 
        "Diffraction", 
        "Compton effect"
      ],
      correctAnswer: ["Interference", "Diffraction"],
      explanation: "Interference and diffraction are phenomena that can only be explained by the wave nature of light. The photoelectric effect and Compton effect demonstrate the particle nature of light.",
      type: "checkbox",
      points: 4
    },
    {
      id: "q3",
      question: "Define Faraday's law of electromagnetic induction and explain its significance in modern electrical devices.",
      correctAnswer: "Faraday's law states that the magnitude of EMF induced in a circuit is proportional to the rate of change of magnetic flux through the circuit. This is fundamental for transformers and generators.",
      explanation: "A complete answer should mention the mathematical formulation (EMF = -dΦ/dt), discuss flux linkage, and explain applications in transformers, generators, and inductors.",
      type: "long-answer",
      points: 8
    }
  ]);
  
  // State for exam attempt
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(examDetails.duration * 60); // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    return (Object.keys(answers).length / examDetails.totalQuestions) * 100;
  };
  
  // Handle answer change
  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  // Handle multiple choice selection
  const handleMultipleChoiceChange = (value: string) => {
    handleAnswerChange(value);
  };
  
  // Handle checkbox selection
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentAnswer = answers[currentQuestion.id] || [];
    let newAnswer;
    
    if (checked) {
      newAnswer = [...currentAnswer, value];
    } else {
      newAnswer = currentAnswer.filter((item: string) => item !== value);
    }
    
    handleAnswerChange(newAnswer);
  };
  
  // Check if an option is selected for checkbox
  const isOptionChecked = (option: string) => {
    const currentAnswer = answers[currentQuestion.id] || [];
    return currentAnswer.includes(option);
  };
  
  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAnswerChange(e.target.value);
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Toggle question flag
  const toggleFlagQuestion = () => {
    const questionId = currentQuestion.id;
    
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };
  
  // Handle exam submission
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate how many questions were answered
      const answeredCount = Object.keys(answers).length;
      
      if (answeredCount < questions.length) {
        toast({
          title: `You've answered ${answeredCount} out of ${questions.length} questions`,
          description: "We'll submit your current answers."
        });
      }
      
      // Navigate to review page
      navigate(`/dashboard/student/exams/review/${examId}`);
    } catch (error) {
      toast({
        title: "Error submitting exam",
        description: "Please try again",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  // Render answer input based on question type
  const renderAnswerInput = () => {
    if (!currentQuestion) return null;
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleMultipleChoiceChange}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox 
                  id={`checkbox-${index}`} 
                  checked={isOptionChecked(option)}
                  onCheckedChange={(checked) => handleCheckboxChange(option, checked === true)}
                />
                <Label htmlFor={`checkbox-${index}`} className="text-base">{option}</Label>
              </div>
            ))}
          </div>
        );
        
      case 'short-answer':
      case 'long-answer':
        return (
          <Textarea 
            value={answers[currentQuestion.id] || ''}
            onChange={handleTextChange}
            placeholder="Type your answer here..."
            className="min-h-[150px]"
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <DashboardContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header with timer and progress */}
        <div className="sticky top-0 z-10 bg-background pb-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">{examDetails.title}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                <Timer className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
              
              <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="default">Submit Exam</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You've answered {Object.keys(answers).length} out of {questions.length} questions.
                      {Object.keys(answers).length < questions.length && 
                        " Some questions are still unanswered. Are you sure you want to submit?"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmitExam} disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Yes, Submit"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-sm text-gray-500">
              {Object.keys(answers).length} of {questions.length} answered
            </div>
          </div>
          
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Question card */}
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  Question {currentQuestionIndex + 1}
                  <span className="ml-2 text-sm text-gray-500">
                    ({currentQuestion?.points} points)
                  </span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={flaggedQuestions.includes(currentQuestion?.id) ? "destructive" : "outline"}>
                    {flaggedQuestions.includes(currentQuestion?.id) ? "Flagged" : "Flag"} for Review
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleFlagQuestion}
                    className={flaggedQuestions.includes(currentQuestion?.id) ? "text-destructive" : ""}
                  >
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-base">
                  {currentQuestion?.question}
                </div>
                <Separator className="mb-4" />
                {renderAnswerInput()}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={isFirstQuestion}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="default"
                  onClick={goToNextQuestion}
                  disabled={isLastQuestion}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* Question navigation panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => (
                    <Button
                      key={q.id}
                      variant={currentQuestionIndex === index ? "default" : 
                        (answers[q.id] ? "secondary" : "outline")}
                      size="sm"
                      className={`h-9 w-9 p-0 ${flaggedQuestions.includes(q.id) ? "border-red-500" : ""}`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full bg-secondary"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full border border-red-500"></div>
                    <span>Flagged for review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tool box */}
            <FlashcardCalculator />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ExamAttemptPage;
