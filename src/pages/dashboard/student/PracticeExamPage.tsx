
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Flag, Clock, FileText, ChevronLeft, ChevronRight, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: number; // Minutes
  questionCount: number;
  questions: Question[];
  linkedConceptIds: string[]; // IDs of linked concept cards
  linkedFlashcardIds: string[]; // IDs of linked flashcards
}

const PracticeExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState<ExamData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [examSubmitting, setExamSubmitting] = useState(false);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Mock data loading - would be API call in real implementation
  useEffect(() => {
    const loadExam = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock exam data
        const mockExam: ExamData = {
          id: examId || '1',
          title: 'Algebra Level 1 Mini Test',
          subject: 'Mathematics',
          topic: 'Algebra',
          duration: 30, // 30 minutes
          questionCount: 4,
          questions: [
            {
              id: 'q1',
              text: 'Solve for x: 2x + 3 = 7',
              options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
              correctAnswer: 1
            },
            {
              id: 'q2',
              text: 'Simplify: 3(x + 2) - 4',
              options: ['3x + 2', '3x + 6 - 4', '3x + 2', '3x + 6'],
              correctAnswer: 0
            },
            {
              id: 'q3',
              text: 'If f(x) = x² + 1, then f(3) = ?',
              options: ['4', '8', '9', '10'],
              correctAnswer: 3
            },
            {
              id: 'q4',
              text: 'Solve the inequality: 2x - 5 > 3',
              options: ['x > 4', 'x > 3', 'x < 4', 'x = 4'],
              correctAnswer: 0
            },
          ],
          linkedConceptIds: ['concept-1', 'concept-2'],
          linkedFlashcardIds: ['flashcard-1', 'flashcard-3']
        };
        
        setExam(mockExam);
        setTimeRemaining(mockExam.duration * 60); // Convert minutes to seconds
      } catch (error) {
        console.error('Error loading exam:', error);
        toast({
          title: "Error",
          description: "Could not load the exam. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadExam();
  }, [examId, toast]);
  
  // Timer effect
  useEffect(() => {
    if (!loading && exam && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto-submit when time runs out
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [loading, exam, timeRemaining]);
  
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };
  
  const handleNextQuestion = () => {
    if (!exam) return;
    
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitExam = async () => {
    if (!exam) return;
    
    setExamSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Exam Submitted",
        description: "Your answers have been recorded.",
      });
      
      // Navigate to result page
      navigate(`/dashboard/student/exams/${examId}/review`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not submit the exam. Please try again.",
        variant: "destructive",
      });
    } finally {
      setExamSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading Exam...</h2>
            <div className="w-full max-w-md mx-auto">
              <Progress value={20} className="h-1.5" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!exam) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Exam Not Found</h2>
            <Button onClick={() => navigate('/dashboard/student/exams')}>
              Go to Practice Tests
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / exam.questionCount) * 100;
  
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
            <h1 className="text-2xl md:text-3xl font-bold">{exam.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline">{exam.subject}</Badge>
              {exam.topic && <Badge variant="outline">{exam.topic}</Badge>}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="text-lg font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {exam.questionCount}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{answeredCount}/{exam.questionCount} answered</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
        
        {/* Current Question */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Question {currentQuestionIndex + 1}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleFlagQuestion(currentQuestion.id)}
                className={flaggedQuestions.has(currentQuestion.id) ? "text-red-600 border-red-300 bg-red-50" : ""}
              >
                <Flag className={`h-4 w-4 ${flaggedQuestions.has(currentQuestion.id) ? "fill-red-600" : ""}`} />
                <span className="ml-1">{flaggedQuestions.has(currentQuestion.id) ? "Flagged" : "Flag"}</span>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2">
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectAnswer(currentQuestion.id, index)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion.id] === index 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                      selectedAnswers[currentQuestion.id] === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            {currentQuestionIndex < exam.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitExam}
                disabled={examSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {examSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Question Navigation */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Question Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {exam.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentQuestionIndex === index
                    ? 'bg-blue-500 text-white'
                    : selectedAnswers[q.id] !== undefined
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : flaggedQuestions.has(q.id)
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        {/* Linked Resources */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Link className="text-blue-600" size={18} />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Related Resources</h3>
              <p className="text-sm text-blue-700">
                These resources will be available after you complete the test.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PracticeExamPage;
