
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Timer, ChevronLeft, ChevronRight, Flag, Calculator } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  text: string;
  options: string[];
  type: 'single' | 'multiple';
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  totalQuestions: number;
  timeAllotted: number; // in minutes
  questions: Question[];
}

const ExamAttemptPage = () => {
  const { examId } = useParams();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockExam: ExamData = {
          id: examId || '1',
          title: "Physics Weekly Test - Mechanics",
          subject: "Physics",
          totalQuestions: 10,
          timeAllotted: 30, // 30 minutes
          questions: Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            text: `Question ${i + 1}: This is a sample physics question about mechanics and Newton's laws. What is the correct answer to this physics problem?`,
            options: [
              'Option A: This is the first option',
              'Option B: This is the second option',
              'Option C: This is the third option',
              'Option D: This is the fourth option'
            ],
            type: i % 3 === 0 ? 'multiple' : 'single'
          }))
        };
        setExam(mockExam);
        setTimeLeft(mockExam.timeAllotted * 60); // Convert to seconds
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [examId]);

  // Timer functionality
  useEffect(() => {
    if (timeLeft <= 0 || !exam) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, exam]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (exam && currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const question = exam?.questions[currentQuestion];
    if (!question) return;
    
    if (question.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [question.id]: value
      }));
    } else {
      // Handle multiple choice
      const currentAnswers = answers[question.id] as string[] || [];
      if (currentAnswers.includes(value)) {
        setAnswers(prev => ({
          ...prev,
          [question.id]: currentAnswers.filter(a => a !== value)
        }));
      } else {
        setAnswers(prev => ({
          ...prev,
          [question.id]: [...currentAnswers, value]
        }));
      }
    }
  };

  const toggleFlag = () => {
    const questionId = exam?.questions[currentQuestion].id;
    if (!questionId) return;
    
    if (flagged.includes(questionId)) {
      setFlagged(prev => prev.filter(id => id !== questionId));
    } else {
      setFlagged(prev => [...prev, questionId]);
    }
  };

  const handleSubmitExam = () => {
    toast({
      title: "Exam Submitted",
      description: "Your answers have been submitted for evaluation."
    });
    // Redirect to review page would happen here in a real app
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!exam) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-center text-muted-foreground">Exam not found</p>
    </div>
  );

  const question = exam.questions[currentQuestion];
  const isQuestionFlagged = question && flagged.includes(question.id);
  const hasAnswer = question && answers[question.id] !== undefined;
  const progress = (Object.keys(answers).length / exam.totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{exam.title}</CardTitle>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowCalculator(!showCalculator)}
                className={showCalculator ? "bg-purple-100 dark:bg-purple-900" : ""}
              >
                <Calculator className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-md">
                <Timer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="font-mono font-medium text-orange-600 dark:text-orange-400">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Answered {Object.keys(answers).length} of {exam.totalQuestions} questions
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between mb-6">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1}/{exam.questions.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={isQuestionFlagged ? "text-red-500 border-red-200" : ""}
                  onClick={toggleFlag}
                >
                  <Flag className={`h-4 w-4 ${isQuestionFlagged ? "fill-red-500" : ""} mr-1`} />
                  {isQuestionFlagged ? "Flagged" : "Flag for Review"}
                </Button>
              </div>
              
              <div className="text-lg mb-8">{question.text}</div>
              
              {question.type === 'single' ? (
                <RadioGroup
                  value={answers[question.id] as string || ""}
                  onValueChange={handleAnswerChange}
                  className="space-y-4"
                >
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`option-${idx}`}
                        checked={(answers[question.id] as string[] || []).includes(option)}
                        onCheckedChange={() => handleAnswerChange(option)}
                      />
                      <Label htmlFor={`option-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {showCalculator && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <p className="text-muted-foreground">Calculator functionality would be implemented here.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            
            {currentQuestion < exam.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitExam}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamAttemptPage;
