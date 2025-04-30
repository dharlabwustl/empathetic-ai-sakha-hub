import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowRight, ArrowLeft, Check, X, Clock, Flag, MoveRight, PieChart } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { cn } from '@/lib/utils';

// Mock question data - same as in ExamTakingPage
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
        correctOption: 0,
        explanation: "Newton's First Law, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
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
        correctOption: 1,
        explanation: "The joule (J) is the SI unit of energy. It is equal to the energy transferred when applying a force of one newton through a distance of one meter."
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
        correctOption: 2,
        explanation: "The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant."
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
        correctOption: 3,
        explanation: "The Second Law of Thermodynamics states that the entropy (disorder) of an isolated system always increases over time. Heat naturally flows from hot to cold, not the reverse."
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
        correctOption: 3,
        explanation: "Momentum energy is not a type of energy. Momentum (p = mv) is the product of mass and velocity, while kinetic energy, nuclear energy, and mass energy (E = mc²) are all valid forms of energy."
      }
    ]
  },
  "chemistry": {
    id: "chemistry",
    title: "Chemistry - Periodic Table and Reactions",
    description: "Test your knowledge of basic chemistry concepts",
    timeLimit: 30,
    questions: [
      
    ]
  }
};

export default function ExamReviewPage() {
  const { examId } = useParams<{ examId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Get results from state or use defaults
  const answers = location.state?.answers || {};
  const flagged = location.state?.flagged || {};
  const score = location.state?.score || 0;
  const totalQuestions = location.state?.totalQuestions || 0;
  
  useEffect(() => {
    if (examId && mockExams[examId as keyof typeof mockExams]) {
      setCurrentExam(mockExams[examId as keyof typeof mockExams]);
    }
  }, [examId]);
  
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
  
  const getPercentageScore = () => {
    return Math.round((score / totalQuestions) * 100);
  };
  
  const getScoreColor = () => {
    const percentage = getPercentageScore();
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getScoreLabel = () => {
    const percentage = getPercentageScore();
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Fair";
    return "Needs Improvement";
  };
  
  if (!currentExam) {
    return (
      <SharedPageLayout 
        title="Exam Review"
        subtitle="Loading exam results..."
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const isCorrect = selectedAnswer === currentQuestion.correctOption;
  
  return (
    <SharedPageLayout 
      title="Exam Review"
      subtitle={`Results for ${currentExam.title}`}
    >
      <div className="space-y-6">
        {/* Score summary */}
        <Card className="border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Score</h3>
                <p className={`text-3xl font-bold ${getScoreColor()}`}>
                  {score}/{totalQuestions}
                </p>
                <p className="text-sm mt-1">{getScoreLabel()}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Percentage</h3>
                <p className={`text-3xl font-bold ${getScoreColor()}`}>
                  {getPercentageScore()}%
                </p>
                <div className="mt-2 h-1.5">
                  <Progress value={getPercentageScore()} />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border text-center">
                <h3 className="text-sm text-muted-foreground mb-1">Time Taken</h3>
                <p className="text-3xl font-bold">
                  {Math.floor(currentExam.timeLimit * 0.8)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                </p>
                <p className="text-sm mt-1">of {currentExam.timeLimit} minutes</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Question Analysis</h3>
              <div className="flex flex-wrap gap-2 md:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Correct: {score}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Incorrect: {totalQuestions - score}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-sm">Flagged: {Object.values(flagged).filter(Boolean).length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Review navigation */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border flex flex-wrap justify-between items-center">
          <div className="text-sm">
            Reviewing Question {currentQuestionIndex + 1} of {currentExam.questions.length}
          </div>
          
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/dashboard/student/practice-exam/${examId}/start`)}
            >
              Retake Exam
            </Button>
            <Button 
              variant="default" 
              size="sm"
            >
              Review Learning Materials
            </Button>
          </div>
        </div>
        
        {/* Question Review */}
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <div className="flex items-center gap-2">
                {flagged[currentQuestion.id] && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 dark:text-amber-300 dark:border-amber-700 dark:bg-amber-900/20">
                    <Flag className="h-3.5 w-3.5 mr-1" /> Flagged
                  </Badge>
                )}
                <Badge 
                  className={isCorrect ? 
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : 
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }
                >
                  {isCorrect ? 
                    <Check className="h-3.5 w-3.5 mr-1" /> : 
                    <X className="h-3.5 w-3.5 mr-1" />
                  }
                  {isCorrect ? "Correct" : "Incorrect"}
                </Badge>
              </div>
            </div>
            <p className="text-base mt-2">
              {currentQuestion.text}
            </p>
          </CardHeader>
          
          <CardContent className="pb-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === currentQuestion.correctOption;
                
                return (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      isCorrectOption ? 
                        "bg-green-50 border-green-300 dark:bg-green-900/10 dark:border-green-700" :
                        isSelected ? 
                          "bg-red-50 border-red-300 dark:bg-red-900/10 dark:border-red-700" :
                          "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full border text-sm font-medium ${
                        isCorrectOption ? 
                          "bg-green-500 text-white border-green-500" :
                          isSelected ? 
                            "bg-red-500 text-white border-red-500" :
                            "border-gray-300 text-gray-500"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {isCorrectOption && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                      {!isCorrectOption && isSelected && <X className="h-4 w-4 text-red-600 ml-auto" />}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Explanation */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-lg">
              <h4 className="font-medium flex items-center gap-1.5 mb-1.5">
                <BookOpen className="h-4 w-4" /> Explanation
              </h4>
              <p className="text-sm">
                {currentQuestion.explanation}
              </p>
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
                onClick={() => navigate('/dashboard/student/practice-exam')}
                className="bg-gradient-to-r from-purple-500 to-indigo-600"
              >
                Return to Exams <MoveRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Question Navigation */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Question Navigator</h3>
          <div className="flex flex-wrap gap-2">
            {currentExam.questions.map((question: any, index: number) => {
              const questionAnswer = answers[question.id];
              const isCorrect = questionAnswer === question.correctOption;
              const isFlagged = flagged[question.id];
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <Button 
                  key={question.id}
                  variant="outline"
                  size="icon"
                  className={`w-8 h-8 ${
                    isCurrent ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  } ${
                    questionAnswer !== undefined ? 
                      isCorrect ? 
                        "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300" : 
                        "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300" :
                      isFlagged ? 
                        "bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300" :
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
