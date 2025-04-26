
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Flag, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExamData {
  id: string;
  title: string;
  duration: number; // in minutes
  questions: Question[];
}

const mockExam: ExamData = {
  id: 'exam1',
  title: 'Physics Mechanics Test',
  duration: 45,
  questions: [
    {
      id: 'q1',
      text: "What is Newton's First Law of Motion?",
      options: [
        "An object at rest stays at rest, and an object in motion stays in motion",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "None of the above"
      ],
      correctAnswer: 0
    },
    // Add more questions as needed
  ]
};

const PracticeExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamData>(mockExam);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert to seconds
  const [examSubmitted, setExamSubmitted] = useState(false);

  useEffect(() => {
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleFlag = (questionId: string) => {
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

  const handleSubmit = () => {
    // Calculate results
    const totalQuestions = exam.questions.length;
    const attempted = Object.keys(answers).length;
    const correct = exam.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    setExamSubmitted(true);
    toast.success('Exam submitted successfully!');
    
    // Navigate to results page with data
    navigate(`/dashboard/student/exams/${examId}/results`, {
      state: {
        answers,
        flaggedQuestions: Array.from(flaggedQuestions),
        timeSpent: exam.duration * 60 - timeLeft,
        totalQuestions,
        attempted,
        correct
      }
    });
  };

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="container max-w-4xl mx-auto py-6">
      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{exam.title}</CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg">
                <Timer className="mr-2 h-4 w-4" />
                {formatTime(timeLeft)}
              </Badge>
              <Button variant="destructive" onClick={handleSubmit}>
                Submit Test
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress 
            value={(currentQuestionIndex + 1) / exam.questions.length * 100} 
            className="h-2" 
          />
          <div className="mt-2 text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {exam.questions.length}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">
              Question {currentQuestionIndex + 1}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleFlag(currentQuestion.id)}
              className={flaggedQuestions.has(currentQuestion.id) ? "text-red-500" : ""}
            >
              <Flag className="h-4 w-4 mr-1" />
              {flaggedQuestions.has(currentQuestion.id) ? "Flagged" : "Flag"}
            </Button>
          </div>
          
          <p className="text-lg mb-6">{currentQuestion.text}</p>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion.id] === index ? "default" : "outline"}
                className="w-full justify-start text-left p-4"
                onClick={() => handleAnswer(currentQuestion.id, index)}
              >
                {answers[currentQuestion.id] === index && (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
          disabled={currentQuestionIndex === exam.questions.length - 1}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PracticeExamPage;
