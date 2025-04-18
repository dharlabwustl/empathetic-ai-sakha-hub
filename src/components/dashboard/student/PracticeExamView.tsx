
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, Calendar, ArrowLeft, ArrowRight, CheckCircle, X, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import BackToDashboardButton from '../BackToDashboardButton';

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  questions: ExamQuestion[];
  totalMarks: number;
}

interface PracticeExamViewProps {
  title?: string;
  subject?: string;
  exams?: PracticeExam[];
}

const PracticeExamView: React.FC<PracticeExamViewProps> = ({ 
  title = "Practice Exams", 
  subject = "Physics",
  exams = []
}) => {
  const [selectedExam, setSelectedExam] = useState<PracticeExam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showExamDialog, setShowExamDialog] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Sample exams if none provided
  const defaultExams: PracticeExam[] = [
    {
      id: "1",
      title: "Mechanics Test 1",
      subject: "Physics",
      topic: "Mechanics",
      duration: 30,
      difficulty: "medium",
      totalMarks: 20,
      questions: [
        {
          id: "q1",
          question: "An object accelerates at 2 m/s². If it starts from rest, what is its velocity after 5 seconds?",
          options: ["5 m/s", "10 m/s", "20 m/s", "25 m/s"],
          correctAnswer: 1,
          explanation: "Using the formula v = u + at, where u = 0, a = 2 m/s², t = 5 s, we get v = 0 + 2 × 5 = 10 m/s."
        },
        {
          id: "q2",
          question: "What is the formula for kinetic energy?",
          options: ["KE = mv", "KE = mgh", "KE = ½mv²", "KE = Fd"],
          correctAnswer: 2,
          explanation: "Kinetic energy is given by the formula KE = ½mv², where m is mass and v is velocity."
        },
        {
          id: "q3",
          question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
          options: ["First law", "Second law", "Third law", "Law of conservation of momentum"],
          correctAnswer: 2,
          explanation: "Newton's third law states that for every action, there is an equal and opposite reaction."
        }
      ]
    },
    {
      id: "2",
      title: "Electromagnetism Basics",
      subject: "Physics",
      topic: "Electromagnetism",
      duration: 45,
      difficulty: "hard",
      totalMarks: 30,
      questions: [
        {
          id: "q1",
          question: "What is Coulomb's Law used to calculate?",
          options: [
            "Magnetic field strength",
            "Electric field intensity",
            "Force between two electric charges",
            "Induced current"
          ],
          correctAnswer: 2,
          explanation: "Coulomb's Law is used to calculate the force between two electric charges."
        },
        {
          id: "q2",
          question: "Which of the following is NOT a unit of magnetic field strength?",
          options: ["Tesla", "Weber/m²", "N/A·m", "Volt/m"],
          correctAnswer: 3,
          explanation: "Volt/m is the unit of electric field strength, not magnetic field strength."
        }
      ]
    }
  ];
  
  const availableExams = exams.length > 0 ? exams : defaultExams;
  
  const handleStartExam = (exam: PracticeExam) => {
    setSelectedExam(exam);
    setUserAnswers(new Array(exam.questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setExamCompleted(false);
    setShowExamDialog(true);
  };
  
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (selectedExam?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitExam = () => {
    if (!selectedExam) return;
    
    // Calculate score
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === selectedExam.questions[index].correctAnswer) {
        correct += 1;
      }
    });
    
    const calculatedScore = Math.round((correct / selectedExam.questions.length) * selectedExam.totalMarks);
    setScore(calculatedScore);
    setExamCompleted(true);
  };
  
  const handleCloseExam = () => {
    setShowExamDialog(false);
    setSelectedExam(null);
    setUserAnswers([]);
    setExamCompleted(false);
  };
  
  const currentQuestion = selectedExam?.questions[currentQuestionIndex];
  const progressPercentage = selectedExam ? 
    Math.round(((currentQuestionIndex + 1) / selectedExam.questions.length) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <div>
        <BackToDashboardButton />
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">Select an exam to begin practice</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableExams.map(exam => (
          <Card key={exam.id} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{exam.title}</CardTitle>
                <Badge variant={
                  exam.difficulty === 'easy' ? 'outline' : 
                  exam.difficulty === 'medium' ? 'secondary' : 
                  'destructive'
                }>
                  {exam.difficulty}
                </Badge>
              </div>
              <CardDescription>{exam.subject} - {exam.topic}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Questions</span>
                  </div>
                  <span className="font-medium">{exam.questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium">{exam.duration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Total Marks</span>
                  </div>
                  <span className="font-medium">{exam.totalMarks}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleStartExam(exam)}
              >
                Start Exam
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Exam Dialog */}
      <Dialog open={showExamDialog} onOpenChange={setShowExamDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {!examCompleted ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex justify-between items-center">
                    <span>{selectedExam?.title}</span>
                    <Badge variant="outline" className="ml-2">
                      Question {currentQuestionIndex + 1} of {selectedExam?.questions.length}
                    </Badge>
                  </div>
                </DialogTitle>
                <DialogDescription className="flex justify-between">
                  <span>{selectedExam?.subject} - {selectedExam?.topic}</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedExam?.duration} min
                  </span>
                </DialogDescription>
                <Progress value={progressPercentage} className="mt-2" />
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">{currentQuestion?.question}</h3>
                    
                    <RadioGroup 
                      value={userAnswers[currentQuestionIndex]?.toString() || ""} 
                      onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                    >
                      {currentQuestion?.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCloseExam}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft size={16} />
                    Quit Exam
                  </Button>
                </div>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex === (selectedExam?.questions.length || 0) - 1 ? (
                    <Button 
                      onClick={handleSubmitExam}
                      disabled={userAnswers.some(answer => answer === null)}
                    >
                      Submit Exam
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>
                      Next <ArrowRight size={16} className="ml-1" />
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Exam Completed</DialogTitle>
                <DialogDescription>
                  {selectedExam?.title} - {selectedExam?.subject}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6">
                <div className="text-center mb-6">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your Score</h2>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {score} / {selectedExam?.totalMarks}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {Math.round((score / (selectedExam?.totalMarks || 1)) * 100)}% correct answers
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Results Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedExam?.questions.map((question, index) => (
                        <div key={index} className="border-b pb-3 last:border-b-0">
                          <div className="flex items-start gap-2">
                            <div className="mt-1">
                              {userAnswers[index] === question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Question {index + 1}</p>
                              <p className="text-sm text-gray-700">{question.question}</p>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm">
                                  <span className="font-medium">Your answer:</span>{" "}
                                  <span className={userAnswers[index] === question.correctAnswer ? 
                                    "text-green-600 font-medium" : "text-red-600 font-medium"
                                  }>
                                    {userAnswers[index] !== null ? question.options[userAnswers[index]] : "No answer"}
                                  </span>
                                </p>
                                {userAnswers[index] !== question.correctAnswer && (
                                  <p className="text-sm">
                                    <span className="font-medium">Correct answer:</span>{" "}
                                    <span className="text-green-600 font-medium">
                                      {question.options[question.correctAnswer]}
                                    </span>
                                  </p>
                                )}
                                <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                                  <span className="font-medium">Explanation:</span> {question.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handleCloseExam}>
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Exams
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeExamView;
