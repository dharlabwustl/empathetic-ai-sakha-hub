
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, ArrowRight, ArrowLeft, Flag, Check } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Radio } from '@/components/ui/radio';

// Mock question data
const mockExams = {
  "physics": {
    id: "physics",
    title: "Physics - Mechanics and Thermodynamics",
    description: "Test your knowledge of basic physics concepts",
    timeLimit: 45, // in minutes
    questions: [
      {
        id: "q1",
        text: "What is Newton's First Law of Motion?",
        options: [
          "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
          "Force equals mass times acceleration",
          "For every action, there is an equal and opposite reaction",
          "Energy can neither be created nor destroyed, only transformed"
        ],
        correctOption: 0
      },
      {
        id: "q2",
        text: "Which of the following is the SI unit of energy?",
        options: [
          "Newton",
          "Joule",
          "Watt",
          "Pascal"
        ],
        correctOption: 1
      },
      {
        id: "q3",
        text: "The principle of conservation of energy states that:",
        options: [
          "Energy is always lost in any process",
          "Energy can be created but not destroyed",
          "Energy can neither be created nor destroyed, only transformed",
          "Energy is proportional to mass"
        ],
        correctOption: 2
      },
      {
        id: "q4",
        text: "What does the Second Law of Thermodynamics state?",
        options: [
          "Heat naturally flows from cold to hot",
          "Entropy of an isolated system always decreases",
          "Energy is conserved in all processes",
          "The entropy of an isolated system always increases over time"
        ],
        correctOption: 3
      },
      {
        id: "q5",
        text: "Which of these is NOT a form of energy?",
        options: [
          "Kinetic energy",
          "Nuclear energy",
          "Mass energy",
          "Momentum energy"
        ],
        correctOption: 3
      }
    ]
  },
  "chemistry": {
    id: "chemistry",
    title: "Chemistry - Periodic Table and Reactions",
    description: "Test your knowledge of basic chemistry concepts",
    timeLimit: 30,
    questions: [
      {
        id: "q1",
        text: "What is the atomic number of oxygen?",
        options: [
          "6",
          "8",
          "16",
          "32"
        ],
        correctOption: 1
      },
      {
        id: "q2",
        text: "Which element has the highest electronegativity?",
        options: [
          "Oxygen",
          "Chlorine",
          "Fluorine",
          "Nitrogen"
        ],
        correctOption: 2
      },
      {
        id: "q3",
        text: "What type of bond forms between atoms of similar electronegativity?",
        options: [
          "Ionic bond",
          "Metallic bond",
          "Covalent bond",
          "Hydrogen bond"
        ],
        correctOption: 2
      }
    ]
  }
};

export default function ExamTakingPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  
  useEffect(() => {
    if (examId && mockExams[examId as keyof typeof mockExams]) {
      const exam = mockExams[examId as keyof typeof mockExams];
      setCurrentExam(exam);
      setRemainingTime(exam.timeLimit * 60); // Convert to seconds
    }
  }, [examId]);
  
  useEffect(() => {
    if (remainingTime <= 0) {
      if (!isExamSubmitted) {
        handleSubmitExam();
      }
      return;
    }
    
    const timer = setInterval(() => {
      setRemainingTime(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [remainingTime, isExamSubmitted]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const handleFlagQuestion = () => {
    if (!currentExam) return;
    
    const questionId = currentExam.questions[currentQuestionIndex].id;
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < (currentExam?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    // Calculate score
    let score = 0;
    currentExam?.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correctOption) {
        score++;
      }
    });
    
    // Navigate to results page
    navigate(`/dashboard/student/practice-exam/${examId}/review`, { 
      state: { 
        answers: selectedAnswers,
        flagged: flaggedQuestions,
        score,
        totalQuestions: currentExam?.questions.length
      } 
    });
  };
  
  if (!currentExam) {
    return (
      <SharedPageLayout 
        title="Practice Exam"
        subtitle="Loading exam..."
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  return (
    <SharedPageLayout 
      title={currentExam.title}
      subtitle={currentExam.description}
    >
      <div className="space-y-6">
        {/* Header with progress and timer */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Badge variant={remainingTime < 300 ? "destructive" : "outline"} className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {formatTime(remainingTime)}
            </Badge>
            <div className="text-sm">
              Question {currentQuestionIndex + 1} of {currentExam.questions.length}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm">
              {Object.keys(selectedAnswers).length} of {currentExam.questions.length} answered
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleSubmitExam}
            >
              Submit Exam
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress 
          value={(currentQuestionIndex / (currentExam.questions.length - 1)) * 100} 
          className="h-1.5" 
        />
        
        {/* Question Card */}
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlagQuestion}
                className={flaggedQuestions[currentExam.questions[currentQuestionIndex].id] ? "text-red-500" : ""}
              >
                <Flag className={`h-4 w-4 mr-1 ${flaggedQuestions[currentExam.questions[currentQuestionIndex].id] ? "fill-red-500 text-red-500" : ""}`} />
                {flaggedQuestions[currentExam.questions[currentQuestionIndex].id] ? "Flagged" : "Flag for Review"}
              </Button>
            </div>
            <p className="text-base mt-2">
              {currentExam.questions[currentQuestionIndex].text}
            </p>
          </CardHeader>
          
          <CardContent className="pb-6">
            <div className="space-y-3">
              {currentExam.questions[currentQuestionIndex].options.map((option: string, index: number) => {
                const isSelected = selectedAnswers[currentExam.questions[currentQuestionIndex].id] === index;
                return (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                      isSelected ? "bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                    }`}
                    onClick={() => handleAnswerSelect(currentExam.questions[currentQuestionIndex].id, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full border text-sm font-medium ${
                        isSelected ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 text-gray-500"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 border-t flex justify-between">
            <Button 
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            {currentQuestionIndex < currentExam.questions.length - 1 ? (
              <Button 
                onClick={handleNext}
              >
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitExam}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Check className="h-4 w-4 mr-1" /> Complete Exam
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Question Navigation */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Questions</h3>
          <div className="flex flex-wrap gap-2">
            {currentExam.questions.map((question: any, index: number) => {
              const isAnswered = selectedAnswers[question.id] !== undefined;
              const isFlagged = flaggedQuestions[question.id];
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <Button 
                  key={question.id}
                  variant="outline"
                  size="icon"
                  className={`w-8 h-8 ${
                    isCurrent ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  } ${
                    isAnswered ? 
                      "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300" : 
                      isFlagged ? 
                        "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300" :
                        ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
}
