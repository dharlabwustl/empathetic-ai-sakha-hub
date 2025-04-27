
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Flag, Clock, AlertCircle } from 'lucide-react';
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

const ExamAttemptPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Default 60 minutes
  const [examStarted, setExamStarted] = useState(false);

  // Generate mock exam based on exam ID
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const mockExam = generateMockExam(examId || '');
      setExam(mockExam);
      setTimeLeft(mockExam.duration * 60); // Convert to seconds
      setLoading(false);
    }, 800);
  }, [examId]);

  // Timer effect
  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's Up!",
            description: "Your exam is being submitted automatically.",
            variant: "destructive"
          });
          setTimeout(() => handleSubmitExam(), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

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

  const handleStartExam = () => {
    setExamStarted(true);
    toast({
      title: "Exam Started",
      description: `You have ${exam?.duration} minutes to complete this exam.`,
      duration: 3000
    });
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

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleToggleFlag = (questionId: string) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  const handleSubmitExam = () => {
    // Calculate score
    if (!exam) return;
    
    const totalQuestions = exam.questions.length;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    
    if (answeredQuestions < totalQuestions) {
      const unanswered = totalQuestions - answeredQuestions;
      
      if (window.confirm(`You have ${unanswered} unanswered ${unanswered === 1 ? 'question' : 'questions'}. Are you sure you want to submit?`)) {
        navigateToReview();
      }
    } else {
      navigateToReview();
    }
  };
  
  const navigateToReview = () => {
    // In a real application, we would save the exam results to the server
    // For now, we'll just navigate to the review page
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded. Redirecting to review...",
      duration: 2000
    });
    
    setTimeout(() => {
      navigate(`/dashboard/student/exams/review/${examId}`, {
        state: {
          exam,
          selectedAnswers,
          timeSpent: exam?.duration ? (exam.duration * 60) - timeLeft : 0
        }
      });
    }, 1000);
  };

  const handleGoBack = () => {
    if (examStarted) {
      if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <SharedPageLayout title="Loading Exam" subtitle="Please wait while we prepare your exam">
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
      <SharedPageLayout title="Exam Not Found" subtitle="We couldn't find the requested exam">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p>Sorry, the exam you're looking for doesn't seem to exist.</p>
            <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  // Show exam intro if not started
  if (!examStarted) {
    return (
      <SharedPageLayout 
        title={exam.title}
        subtitle={`${exam.subject} Exam`}
        backButton={true}
        onBack={handleGoBack}
      >
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{exam.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Exam Details:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="font-medium mr-2">Subject:</span> {exam.subject}
                </li>
                <li className="flex items-center">
                  <span className="font-medium mr-2">Total Questions:</span> {exam.totalQuestions}
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-medium mr-2">Duration:</span> {exam.duration} minutes
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-amber-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                Important Instructions:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
                <li>Once started, the timer cannot be paused.</li>
                <li>You can navigate between questions using the previous and next buttons.</li>
                <li>Flag questions for review if you want to revisit them later.</li>
                <li>Click "Submit Exam" when you're finished, or the exam will be automatically submitted when time expires.</li>
                <li>After submission, you'll be redirected to a review page to see your results.</li>
              </ul>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button onClick={handleStartExam} size="lg" className="w-full max-w-xs">
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
  return (
    <SharedPageLayout 
      title={exam.title}
      subtitle={`${exam.subject} Exam`}
      backButton={true}
      onBack={handleGoBack}
    >
      <div className="space-y-6">
        {/* Timer and progress */}
        <Card className="bg-white shadow">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-red-500" />
                <span className="font-bold text-xl">{formatTime(timeLeft)}</span>
                <span className="ml-2 text-muted-foreground text-sm">remaining</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {exam.questions.length}
                </span>
                <div className="w-24">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Question card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                  {currentQuestionIndex + 1}
                </span>
                <span>{currentQuestion.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedAnswers[currentQuestion.id]?.toString()} 
                onValueChange={(value) => handleSelectAnswer(currentQuestion.id, parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestionIndex}-opt${index}`} />
                    <Label htmlFor={`q${currentQuestionIndex}-opt${index}`} className="flex-1 py-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  variant={isFlagged ? "destructive" : "outline"}
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {isFlagged ? "Unflag" : "Flag"}
                </Button>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {currentQuestionIndex === exam.questions.length - 1 ? (
                  <Button onClick={handleSubmitExam}>
                    Submit Exam
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Navigation grid */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {exam.questions.map((q, index) => {
                const isCurrentQuestion = index === currentQuestionIndex;
                const isQuestionAnswered = selectedAnswers[q.id] !== undefined;
                const isQuestionFlagged = flaggedQuestions.includes(q.id);
                
                return (
                  <Button
                    key={q.id}
                    variant={isCurrentQuestion ? "default" : "outline"}
                    className={`h-10 w-10 p-0 ${
                      isQuestionAnswered ? "bg-green-100 border-green-300" : ""
                    } ${
                      isQuestionFlagged ? "!border-red-500 border-2" : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ExamAttemptPage;
