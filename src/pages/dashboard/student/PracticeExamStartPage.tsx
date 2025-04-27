
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Clock, ChevronLeft, ChevronRight, Flag, Save, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PracticeExamStartPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // Mock exam data
  const exam = {
    id: examId,
    title: "Physics Mock Test - Electromagnetism",
    subject: "Physics",
    duration: 60, // minutes
    totalQuestions: 15,
    instructions: "Answer all questions to the best of your ability. You may skip questions and return to them later."
  };
  
  // Mock questions data
  const questions = [
    {
      id: 1,
      text: "Which of the following is a vector quantity?",
      type: "single",
      options: ["Mass", "Velocity", "Time", "Temperature"],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Select all of the following that are SI base units:",
      type: "multiple",
      options: ["Meter", "Joule", "Second", "Watt", "Kelvin", "Ampere"],
      correctAnswer: [0, 2, 4, 5]
    },
    {
      id: 3,
      text: "Explain the difference between electric potential and electric potential energy.",
      type: "text",
      correctAnswer: ""
    },
    // Additional mock questions would be here
  ];
  
  // State for tracking exam progress
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>(Array(questions.length).fill(null));
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60); // in seconds
  const [examStarted, setExamStarted] = useState(false);
  
  // State for the timer
  React.useEffect(() => {
    if (!examStarted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [examStarted]);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress
  const progress = Math.round((answers.filter(a => a !== null).length / questions.length) * 100);
  
  // Handle answer selection
  const handleAnswerChange = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };
  
  // Handle flagging a question
  const toggleFlagged = () => {
    if (flagged.includes(currentQuestion)) {
      setFlagged(flagged.filter(q => q !== currentQuestion));
    } else {
      setFlagged([...flagged, currentQuestion]);
    }
  };
  
  // Navigate to next or previous question
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Handle starting the exam
  const handleStartExam = () => {
    setExamStarted(true);
  };
  
  // Handle submitting the exam
  const handleSubmitExam = () => {
    // In a real app, you would send the answers to the backend for grading
    navigate(`/dashboard/student/practice-exam/${examId}/review`, { 
      state: { answers, flagged }
    });
  };
  
  // Show start screen if exam hasn't started yet
  if (!examStarted) {
    return (
      <div className="container max-w-4xl py-8">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-gray-50 dark:bg-gray-900/20">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{exam.title}</CardTitle>
                <CardDescription className="mt-1">{exam.subject}</CardDescription>
              </div>
              <Badge className="px-3 py-1">
                {exam.duration} minutes
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Exam Details</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Total Questions:</span>
                    <span>{exam.totalQuestions}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-32 font-medium">Time Limit:</span>
                    <span>{exam.duration} minutes</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold">Instructions</h3>
                <p className="mt-2 text-sm">{exam.instructions}</p>
                
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Once started, the timer cannot be paused. Please ensure you have a stable internet connection.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 dark:bg-gray-900/20 p-6 border-t flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Exams
            </Button>
            <Button onClick={handleStartExam}>
              Start Exam
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  const question = questions[currentQuestion];

  return (
    <div className="container max-w-4xl py-4">
      {/* Top info bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-amber-500" />
          <span className="font-mono text-lg">Time Remaining: {formatTime(timeRemaining)}</span>
        </div>
        
        <div>
          <span className="mr-2">Progress:</span>
          <Badge variant="outline" className="font-mono">
            {answers.filter(a => a !== null).length}/{questions.length}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Question navigation sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentQuestion === index ? "default" : answers[index] !== null ? "outline" : "ghost"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${flagged.includes(index) ? "border-2 border-amber-500" : ""}`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-primary rounded-sm mr-2"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 border rounded-sm mr-2"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 border-2 border-amber-500 rounded-sm mr-2"></div>
                  <span>Flagged</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t p-4">
              <Button 
                className="w-full"
                onClick={handleSubmitExam}
              >
                <Save className="mr-2 h-4 w-4" />
                Submit Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main question area */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <Card>
            <CardHeader className="border-b py-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
                <Button 
                  variant={flagged.includes(currentQuestion) ? "destructive" : "outline"} 
                  size="sm"
                  onClick={toggleFlagged}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  {flagged.includes(currentQuestion) ? "Unflag" : "Flag"} Question
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <p className="mb-6 text-lg">{question.text}</p>
              
              {question.type === 'single' && (
                <RadioGroup 
                  value={answers[currentQuestion]?.toString() || ""} 
                  onValueChange={(value) => handleAnswerChange(parseInt(value))}
                  className="space-y-3"
                >
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/20">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="grow cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === 'multiple' && (
                <div className="space-y-3">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/20">
                      <Checkbox 
                        id={`option-${index}`} 
                        checked={answers[currentQuestion]?.includes(index) || false}
                        onCheckedChange={(checked) => {
                          const current = answers[currentQuestion] || [];
                          if (checked) {
                            handleAnswerChange([...current, index]);
                          } else {
                            handleAnswerChange(current.filter((i: number) => i !== index));
                          }
                        }}
                      />
                      <Label htmlFor={`option-${index}`} className="grow cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'text' && (
                <textarea
                  className="w-full p-3 border rounded-md min-h-[150px]"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
              )}
            </CardContent>
            
            <CardFooter className="border-t p-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPrevQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={goToNextQuestion}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmitExam}>
                  <Check className="mr-2 h-4 w-4" />
                  Finish Exam
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticeExamStartPage;
