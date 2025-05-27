
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Flag, CheckCircle, ChevronLeft, ChevronRight, AlertTriangle, RotateCcw, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuestionView from './QuestionView';

interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
  correctOptionId: string;
  explanation: string;
  difficulty: string;
  subject: string;
  topic: string;
}

const ExamTakingPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  console.log('ExamTakingPage - examId:', examId);

  // Enhanced mock exam data with more realistic content
  const mockQuestions: ExamQuestion[] = Array.from({ length: 30 }, (_, i) => ({
    id: `q${i + 1}`,
    text: i === 0 ? 
      "A particle moves with uniform acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?" :
      i === 1 ?
      "In the reaction CH₃CH₂OH + HBr → CH₃CH₂Br + H₂O, what type of reaction is this?" :
      `Sample question ${i + 1}: What is the formula for calculating kinetic energy in classical mechanics?`,
    options: i === 0 ? [
      { id: 'a', text: '2.5 m/s²' },
      { id: 'b', text: '5.0 m/s²' },
      { id: 'c', text: '7.5 m/s²' },
      { id: 'd', text: '10.0 m/s²' }
    ] : [
      { id: 'a', text: 'KE = ½mv²' },
      { id: 'b', text: 'KE = mv' },
      { id: 'c', text: 'KE = mgh' },
      { id: 'd', text: 'KE = mv²' }
    ],
    correctOptionId: 'a',
    explanation: i === 0 ? 
      'Using s = ut + ½at², we can find that the acceleration is 2.5 m/s²' :
      'Kinetic energy is calculated using the formula KE = ½mv², where m is mass and v is velocity.',
    difficulty: i < 10 ? 'easy' : i < 20 ? 'medium' : 'hard',
    subject: i % 3 === 0 ? 'Physics' : i % 3 === 1 ? 'Chemistry' : 'Biology',
    topic: i % 3 === 0 ? 'Mechanics' : i % 3 === 1 ? 'Organic Chemistry' : 'Cell Biology'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [mockQuestions[currentQuestionIndex].id]: optionId
    }));
  };

  const handleSubmitExam = () => {
    const results = {
      examId,
      answers,
      score: Math.floor(Math.random() * 40) + 60, // Mock score 60-100
      completedAt: new Date().toISOString(),
      timeSpent: 3600 - timeLeft,
      breakdown: {
        physics: Math.floor(Math.random() * 30) + 70,
        chemistry: Math.floor(Math.random() * 30) + 70,
        biology: Math.floor(Math.random() * 30) + 70
      }
    };
    
    localStorage.setItem(`exam_result_${examId}`, JSON.stringify(results));
    
    toast({
      title: "Exam Submitted Successfully",
      description: "Your answers have been recorded. Redirecting to results...",
    });

    setTimeout(() => {
      navigate(`/dashboard/student/practice-exam/${examId}/review`);
    }, 2000);
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const getQuestionStatus = (index: number) => {
    const question = mockQuestions[index];
    const isAnswered = answers[question.id];
    const isFlagged = flaggedQuestions.includes(question.id);
    const isCurrent = index === currentQuestionIndex;
    
    if (isCurrent) return 'current';
    if (isAnswered && isFlagged) return 'answered-flagged';
    if (isAnswered) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-blue-500 text-white';
      case 'answered': return 'bg-green-500 text-white';
      case 'answered-flagged': return 'bg-orange-500 text-white';
      case 'flagged': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Practice Exam {examId}</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {mockQuestions.length}</p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline" className="bg-blue-50">
              {currentQuestion.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              {currentQuestion.topic}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowQuestionPalette(!showQuestionPalette)}>
            <BookOpen className="h-4 w-4 mr-2" />
            Question Palette
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Palette */}
        {showQuestionPalette && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {mockQuestions.map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className={`h-10 w-10 p-0 ${getStatusColor(getQuestionStatus(index))}`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span>Unanswered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className={showQuestionPalette ? "lg:col-span-3" : "lg:col-span-4"}>
          {/* Timer and Progress */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={`flex items-center gap-2 ${timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                <Timer className="h-4 w-4" />
                {formatTime(timeLeft)}
              </Badge>
              <span className="text-sm text-gray-600">
                Answered: {answeredCount}/{mockQuestions.length}
              </span>
              {timeLeft < 300 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Time Running Out!
                </Badge>
              )}
            </div>
            <Button onClick={handleSubmitExam} variant="destructive">
              Submit Exam
            </Button>
          </div>

          <Progress value={(currentQuestionIndex + 1) / mockQuestions.length * 100} className="mb-6" />

          {/* Question */}
          <QuestionView
            question={currentQuestion}
            selectedOptionId={answers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            isFlagged={flaggedQuestions.includes(currentQuestion.id)}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const questionId = currentQuestion.id;
                  setFlaggedQuestions(prev => 
                    prev.includes(questionId) 
                      ? prev.filter(id => id !== questionId)
                      : [...prev, questionId]
                  );
                }}
              >
                <Flag className="h-4 w-4 mr-2" />
                {flaggedQuestions.includes(currentQuestion.id) ? 'Unflag' : 'Flag'}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  if (answers[currentQuestion.id]) {
                    const newAnswers = { ...answers };
                    delete newAnswers[currentQuestion.id];
                    setAnswers(newAnswers);
                  }
                }}
                disabled={!answers[currentQuestion.id]}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {isLastQuestion ? (
              <Button onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTakingPage;
