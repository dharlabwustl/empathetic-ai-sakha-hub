
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Play,
  ClipboardList,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  AlertCircle,
  CheckCheck,
  ChevronRight,
  PauseCircle,
  ArrowRight,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  subject: string;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  concepts: string[];
  questions: Question[];
  lastAttempt?: {
    date: string;
    score: number;
    timeTaken: number;
  };
}

// Sample exam data
const sampleExams: Exam[] = [
  {
    id: "e1",
    title: "Physics Fundamentals",
    description: "Test your knowledge of basic physics concepts including mechanics and energy.",
    duration: 30,
    subject: "Physics",
    totalQuestions: 10,
    difficulty: "Medium",
    concepts: ["Newton's Laws", "Energy Conservation", "Kinematics", "Gravity"],
    questions: [
      {
        id: "q1",
        text: "Which of Newton's laws states that an object at rest tends to stay at rest, and an object in motion tends to stay in motion unless acted upon by a force?",
        options: [
          "Newton's First Law", 
          "Newton's Second Law", 
          "Newton's Third Law", 
          "Law of Conservation of Energy"
        ],
        correctAnswer: 0,
        explanation: "Newton's First Law, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
        concept: "Newton's Laws",
        difficulty: "Easy"
      },
      {
        id: "q2",
        text: "The SI unit of force is:",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The newton (N) is the SI unit of force. It is equal to the force needed to accelerate a mass of one kilogram by one meter per second squared.",
        concept: "Newton's Laws",
        difficulty: "Easy"
      },
      {
        id: "q3",
        text: "What is the formula for calculating kinetic energy?",
        options: ["KE = mgh", "KE = mv", "KE = 0.5mv²", "KE = Fd"],
        correctAnswer: 2,
        explanation: "Kinetic energy (KE) is given by the formula KE = 0.5mv², where m is mass and v is velocity.",
        concept: "Energy Conservation",
        difficulty: "Medium"
      },
      {
        id: "q4",
        text: "A car accelerates uniformly from rest to 20 m/s in 10 seconds. What is its acceleration?",
        options: ["1 m/s²", "2 m/s²", "10 m/s²", "20 m/s²"],
        correctAnswer: 1,
        explanation: "Using the formula a = (v - u)/t, where v is final velocity (20 m/s), u is initial velocity (0 m/s), and t is time (10 s): a = (20 - 0)/10 = 2 m/s²",
        concept: "Kinematics",
        difficulty: "Medium"
      },
      {
        id: "q5",
        text: "The gravitational force between two objects is proportional to:",
        options: [
          "The sum of their masses", 
          "The product of their masses", 
          "The square of their masses", 
          "The cube of their masses"
        ],
        correctAnswer: 1,
        explanation: "According to Newton's Law of Universal Gravitation, the gravitational force between two objects is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.",
        concept: "Gravity",
        difficulty: "Medium"
      },
      {
        id: "q6",
        text: "In an isolated system, which of the following is conserved?",
        options: [
          "Only momentum", 
          "Only energy", 
          "Both momentum and energy", 
          "Neither momentum nor energy"
        ],
        correctAnswer: 2,
        explanation: "In an isolated system (no external forces or energy transfer), both momentum and energy are conserved according to conservation laws in physics.",
        concept: "Energy Conservation",
        difficulty: "Medium"
      },
      {
        id: "q7",
        text: "A projectile is fired at an angle of 45° to the horizontal. Neglecting air resistance, what path does it follow?",
        options: ["Straight line", "Circular path", "Parabolic path", "Elliptical path"],
        correctAnswer: 2,
        explanation: "Under constant gravitational acceleration and no air resistance, a projectile follows a parabolic path regardless of the angle at which it is projected.",
        concept: "Kinematics",
        difficulty: "Medium"
      },
      {
        id: "q8",
        text: "Which of the following statements about Newton's Third Law is correct?",
        options: [
          "Action and reaction forces act on the same object", 
          "Action is always greater than reaction", 
          "Action and reaction forces act on different objects", 
          "Reaction occurs before action"
        ],
        correctAnswer: 2,
        explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction. These forces act on different objects, not on the same object.",
        concept: "Newton's Laws",
        difficulty: "Medium"
      },
      {
        id: "q9",
        text: "What happens to the gravitational force between two objects when the distance between them is doubled?",
        options: [
          "It becomes twice as strong", 
          "It becomes half as strong", 
          "It becomes one-fourth as strong", 
          "It remains the same"
        ],
        correctAnswer: 2,
        explanation: "According to the inverse square law in Newton's Law of Universal Gravitation, when the distance is doubled, the force becomes (1/2)² = 1/4 as strong.",
        concept: "Gravity",
        difficulty: "Hard"
      },
      {
        id: "q10",
        text: "A spring with spring constant k is stretched by a distance x. The potential energy stored in the spring is:",
        options: ["kx", "kx²", "0.5kx", "0.5kx²"],
        correctAnswer: 3,
        explanation: "The potential energy stored in a spring is given by E = 0.5kx², where k is the spring constant and x is the displacement from equilibrium position.",
        concept: "Energy Conservation",
        difficulty: "Hard"
      }
    ],
    lastAttempt: {
      date: "2025-04-05",
      score: 70,
      timeTaken: 22
    }
  },
  {
    id: "e2",
    title: "Mathematics Essentials",
    description: "Practice your algebra, calculus, and geometry skills with these essential questions.",
    duration: 45,
    subject: "Mathematics",
    totalQuestions: 15,
    difficulty: "Hard",
    concepts: ["Algebra", "Calculus", "Geometry", "Trigonometry"],
    questions: [
      {
        id: "q1",
        text: "What is the derivative of y = x³?",
        options: ["y' = 3x²", "y' = 3x", "y' = x²", "y' = 3"],
        correctAnswer: 0,
        explanation: "Using the power rule for differentiation: if y = x^n, then y' = n*x^(n-1). So for y = x³, y' = 3*x^(3-1) = 3x².",
        concept: "Calculus",
        difficulty: "Medium"
      },
      // More questions would be here
    ]
  },
  {
    id: "e3",
    title: "Chemistry Crash Course",
    description: "A quick test on chemical reactions, elements, and compounds.",
    duration: 25,
    subject: "Chemistry",
    totalQuestions: 10,
    difficulty: "Easy",
    concepts: ["Chemical Reactions", "Periodic Table", "Bonding", "States of Matter"],
    questions: [
      {
        id: "q1",
        text: "Which element has the symbol 'Na'?",
        options: ["Nitrogen", "Nickel", "Sodium", "Neon"],
        correctAnswer: 2,
        explanation: "Na is the chemical symbol for Sodium, which comes from its Latin name 'Natrium'.",
        concept: "Periodic Table",
        difficulty: "Easy"
      },
      // More questions would be here
    ]
  }
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Hard: "bg-red-100 text-red-800 border-red-200",
  Mixed: "bg-indigo-100 text-indigo-800 border-indigo-200"
};

const PracticeExamFeature = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('available');
  const [exams, setExams] = useState<Exam[]>(sampleExams);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examInProgress, setExamInProgress] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [examPaused, setExamPaused] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examResults, setExamResults] = useState<{
    score: number;
    timeTaken: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unanswered: number;
    conceptPerformance: Record<string, {correct: number, total: number}>;
  } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Initialize from local storage
  useEffect(() => {
    const savedExams = localStorage.getItem('practiceExams');
    if (savedExams) {
      setExams(JSON.parse(savedExams));
    }
  }, []);
  
  // Save to local storage when exams change
  useEffect(() => {
    localStorage.setItem('practiceExams', JSON.stringify(exams));
  }, [exams]);
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (examInProgress && timeRemaining > 0 && !examPaused) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - submit exam automatically
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examInProgress, timeRemaining, examPaused]);
  
  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setExamInProgress(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(exam.questions.length).fill(null));
    setTimeRemaining(exam.duration * 60); // Convert minutes to seconds
    setExamPaused(false);
    setExamCompleted(false);
    setExamResults(null);
    setShowExplanation(false);
    
    toast({
      title: "Exam Started",
      description: `You have ${exam.duration} minutes to complete this exam.`,
    });
  };
  
  const togglePause = () => {
    setExamPaused(!examPaused);
    
    toast({
      title: examPaused ? "Exam Resumed" : "Exam Paused",
      description: examPaused ? "The timer is now running again." : "The timer is now paused.",
    });
  };
  
  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    } else if (direction === 'next' && activeExam && currentQuestionIndex < activeExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };
  
  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
  };
  
  const handleSubmitExam = () => {
    if (!activeExam) return;
    
    const timeTaken = activeExam.duration * 60 - timeRemaining;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;
    
    const conceptPerformance: Record<string, {correct: number, total: number}> = {};
    
    // Initialize concept performance tracking
    activeExam.concepts.forEach(concept => {
      conceptPerformance[concept] = { correct: 0, total: 0 };
    });
    
    // Calculate results
    selectedAnswers.forEach((selected, index) => {
      const question = activeExam.questions[index];
      const concept = question.concept;
      
      if (conceptPerformance[concept]) {
        conceptPerformance[concept].total += 1;
      } else {
        conceptPerformance[concept] = { correct: 0, total: 1 };
      }
      
      if (selected === null) {
        unanswered += 1;
      } else if (selected === question.correctAnswer) {
        correctAnswers += 1;
        if (conceptPerformance[concept]) {
          conceptPerformance[concept].correct += 1;
        }
      } else {
        incorrectAnswers += 1;
      }
    });
    
    const score = Math.round((correctAnswers / activeExam.questions.length) * 100);
    
    // Update exam with last attempt info
    const updatedExams = exams.map(exam => {
      if (exam.id === activeExam.id) {
        return {
          ...exam,
          lastAttempt: {
            date: new Date().toISOString().split('T')[0],
            score,
            timeTaken: Math.round(timeTaken / 60) // Convert to minutes
          }
        };
      }
      return exam;
    });
    
    setExams(updatedExams);
    setExamInProgress(false);
    setExamCompleted(true);
    setExamResults({
      score,
      timeTaken,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      conceptPerformance
    });
    
    toast({
      title: "Exam Completed",
      description: `You scored ${score}%. View your detailed results.`,
    });
  };
  
  const exitExam = () => {
    setActiveExam(null);
    setExamInProgress(false);
    setExamCompleted(false);
    setExamResults(null);
  };
  
  // Format time (seconds) to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-t-4 border-t-emerald-500">
      <CardHeader className="pb-3 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-emerald-100 p-2 rounded-full">
              <ClipboardList className="text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg gradient-text">Practice Exams</CardTitle>
              <CardDescription>Test your knowledge and track your progress</CardDescription>
            </div>
          </div>
          {!examInProgress && !examCompleted && (
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
              {exams.length} Available
            </Badge>
          )}
          {examInProgress && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                <Clock size={14} className="mr-1" /> {formatTime(timeRemaining)}
              </Badge>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8"
                onClick={togglePause}
              >
                {examPaused ? <Play size={14} /> : <PauseCircle size={14} />}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {!activeExam ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="available" className="flex-1 gap-1 rounded-none">
                <ClipboardList size={14} /> Available
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 gap-1 rounded-none">
                <CheckCheck size={14} /> Completed
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="p-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {exams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-sm border p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-lg">{exam.title}</h3>
                          <p className="text-gray-600 text-sm">{exam.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {exam.subject}
                            </Badge>
                            <Badge className={difficultyColors[exam.difficulty]}>
                              {exam.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {exam.totalQuestions} Questions
                            </Badge>
                            <Badge variant="outline">
                              <Clock size={12} className="mr-1" /> {exam.duration} min
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {exam.lastAttempt && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Last attempt: {exam.lastAttempt.date}</p>
                              <p className="text-sm font-medium">
                                Score: {exam.lastAttempt.score}%
                              </p>
                            </div>
                          )}
                          <Button 
                            onClick={() => startExam(exam)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Play size={14} className="mr-1" /> Start Exam
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Topics covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {exam.concepts.map((concept, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="p-4">
              <div className="space-y-4">
                {exams.filter(exam => exam.lastAttempt).length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-gray-500">You haven't completed any exams yet.</p>
                    <Button 
                      onClick={() => setActiveTab('available')}
                      className="mt-4 bg-emerald-600"
                    >
                      View Available Exams
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {exams.filter(exam => exam.lastAttempt).map((exam) => (
                      <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-sm border p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h3 className="font-medium text-lg">{exam.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                {exam.subject}
                              </Badge>
                              <Badge className={difficultyColors[exam.difficulty]}>
                                {exam.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {exam.lastAttempt && (
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Completed: {exam.lastAttempt.date}</p>
                                <div className="flex items-center gap-2">
                                  <Badge className={
                                    exam.lastAttempt.score >= 80 ? "bg-green-100 text-green-700" :
                                    exam.lastAttempt.score >= 60 ? "bg-amber-100 text-amber-700" :
                                    "bg-red-100 text-red-700"
                                  }>
                                    {exam.lastAttempt.score}%
                                  </Badge>
                                  <p className="text-xs text-gray-500">
                                    Time: {exam.lastAttempt.timeTaken} min
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // View detailed results logic would go here
                                  toast({
                                    title: "Coming soon!",
                                    description: "Detailed results view is under development.",
                                  });
                                }}
                              >
                                <BarChart3 size={14} className="mr-1" /> Results
                              </Button>
                              <Button 
                                onClick={() => startExam(exam)}
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                              >
                                <RotateCw size={14} className="mr-1" /> Retake
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : examCompleted ? (
          <div className="p-4">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{activeExam.title} - Results</h3>
                  <div className="flex justify-center">
                    <Badge className={`text-lg py-2 px-4 ${
                      examResults?.score && examResults.score >= 80 ? 'bg-green-100 text-green-800' : 
                      examResults?.score && examResults.score >= 60 ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {examResults?.score}% Score
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Time taken: {Math.floor((examResults?.timeTaken || 0) / 60)}:{((examResults?.timeTaken || 0) % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                    <CheckCircle2 className="mx-auto mb-1 text-green-600" size={20} />
                    <h4 className="font-medium">Correct</h4>
                    <p className="text-xl font-bold text-green-700">{examResults?.correctAnswers}</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
                    <AlertCircle className="mx-auto mb-1 text-red-600" size={20} />
                    <h4 className="font-medium">Incorrect</h4>
                    <p className="text-xl font-bold text-red-700">{examResults?.incorrectAnswers}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                    <HelpCircle className="mx-auto mb-1 text-gray-600" size={20} />
                    <h4 className="font-medium">Unanswered</h4>
                    <p className="text-xl font-bold text-gray-700">{examResults?.unanswered}</p>
                  </div>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3">Performance by Concept</h4>
                    <div className="space-y-3">
                      {examResults?.conceptPerformance && Object.entries(examResults.conceptPerformance)
                        .filter(([_, data]) => data.total > 0)
                        .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
                        .map(([concept, data]) => {
                          const percentage = Math.round((data.correct / data.total) * 100);
                          return (
                            <div key={concept} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{concept}</span>
                                <span>{data.correct}/{data.total} ({percentage}%)</span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Areas for Improvement</h4>
                    <div className="space-y-2">
                      {examResults?.conceptPerformance && Object.entries(examResults.conceptPerformance)
                        .filter(([_, data]) => data.total > 0 && (data.correct / data.total) < 0.7)
                        .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
                        .slice(0, 3)
                        .map(([concept, _], index) => (
                          <div 
                            key={concept} 
                            className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3"
                          >
                            <Sparkles className="text-amber-600 mt-0.5" size={16} />
                            <div>
                              <p className="font-medium text-amber-800">{concept}</p>
                              <p className="text-xs text-amber-700">
                                {index === 0 
                                  ? "Focus on reviewing core principles and practicing more problems in this area." 
                                  : index === 1 
                                  ? "Consider revisiting the fundamental concepts and working through additional examples." 
                                  : "Allocate some extra study time to strengthen your understanding of these topics."
                                }
                              </p>
                            </div>
                          </div>
                        ))}
                      
                      {(!examResults?.conceptPerformance || 
                       !Object.entries(examResults.conceptPerformance).some(
                         ([_, data]) => data.total > 0 && (data.correct / data.total) < 0.7
                       )) && (
                        <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-3">
                          <CheckCircle2 className="text-green-600 mt-0.5" size={16} />
                          <div>
                            <p className="font-medium text-green-800">Great job!</p>
                            <p className="text-xs text-green-700">
                              You're performing well across all concepts. Continue to reinforce your knowledge.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setExamCompleted(false);
                      setExamInProgress(true);
                      setShowExplanation(true);
                    }} 
                    variant="outline"
                  >
                    Review Answers
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      onClick={exitExam} 
                      variant="outline"
                    >
                      Exit
                    </Button>
                    <Button 
                      onClick={() => {
                        startExam(activeExam);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Retry Exam
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {/* Question navigation */}
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">
                      Question {currentQuestionIndex + 1} of {activeExam.questions.length}
                    </Badge>
                    <div className="flex gap-2">
                      <Badge className={difficultyColors[activeExam.questions[currentQuestionIndex].difficulty]}>
                        {activeExam.questions[currentQuestionIndex].difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        {activeExam.questions[currentQuestionIndex].concept}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Question text */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <h3 className="text-lg font-medium mb-4">
                      {activeExam.questions[currentQuestionIndex].text}
                    </h3>
                    
                    {/* Options */}
                    <div className="space-y-3">
                      {activeExam.questions[currentQuestionIndex].options.map((option, index) => (
                        <div
                          key={index}
                          className={`
                            p-3 rounded-lg border cursor-pointer transition-colors
                            ${selectedAnswers[currentQuestionIndex] === index ? 
                              'bg-indigo-50 border-indigo-300' : 
                              'hover:bg-gray-50'
                            }
                            ${showExplanation && index === activeExam.questions[currentQuestionIndex].correctAnswer ?
                              'bg-green-50 border-green-300' : ''
                            }
                            ${showExplanation && 
                              selectedAnswers[currentQuestionIndex] === index && 
                              selectedAnswers[currentQuestionIndex] !== activeExam.questions[currentQuestionIndex].correctAnswer ?
                              'bg-red-50 border-red-300' : ''
                            }
                          `}
                          onClick={() => {
                            if (!showExplanation) {
                              handleAnswerSelect(index);
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-6 h-6 rounded-full flex items-center justify-center
                              ${selectedAnswers[currentQuestionIndex] === index ?
                                'bg-indigo-600 text-white' : 'bg-gray-100'
                              }
                              ${showExplanation && index === activeExam.questions[currentQuestionIndex].correctAnswer ?
                                'bg-green-600 text-white' : ''
                              }
                              ${showExplanation && 
                                selectedAnswers[currentQuestionIndex] === index && 
                                selectedAnswers[currentQuestionIndex] !== activeExam.questions[currentQuestionIndex].correctAnswer ?
                                'bg-red-600 text-white' : ''
                              }
                            `}>
                              {['A', 'B', 'C', 'D'][index]}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Explanation section */}
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <h4 className="font-medium text-blue-800 mb-1">Explanation</h4>
                        <p className="text-sm text-blue-700">
                          {activeExam.questions[currentQuestionIndex].explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Question navigation */}
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => navigateQuestion('prev')}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ChevronLeft size={16} className="mr-1" /> Previous
                    </Button>
                    {showExplanation ? (
                      <Button
                        variant="outline"
                        onClick={() => setShowExplanation(false)}
                      >
                        Hide Explanation
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setShowExplanation(true)}
                        disabled={examPaused}
                      >
                        Show Explanation
                      </Button>
                    )}
                    {currentQuestionIndex < activeExam.questions.length - 1 ? (
                      <Button 
                        variant={selectedAnswers[currentQuestionIndex] !== null ? 'default' : 'outline'}
                        className={selectedAnswers[currentQuestionIndex] !== null ? 'bg-emerald-600' : ''}
                        onClick={() => navigateQuestion('next')}
                      >
                        Next <ChevronRight size={16} className="ml-1" />
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-emerald-600">
                            Submit Exam
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Submit Exam</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to submit your exam? 
                              {selectedAnswers.filter(a => a === null).length > 0 && (
                                <span className="text-amber-600 font-medium block mt-1">
                                  You have {selectedAnswers.filter(a => a === null).length} unanswered questions.
                                </span>
                              )}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-between pt-4">
                            <Button variant="outline" onClick={() => document.body.click()}>
                              Cancel
                            </Button>
                            <Button 
                              className="bg-emerald-600" 
                              onClick={handleSubmitExam}
                            >
                              Submit Exam
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  
                  {/* Question progress indicators */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Question Progress:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedAnswers.map((answer, index) => (
                        <button
                          key={index}
                          className={`
                            w-8 h-8 rounded-full text-xs flex items-center justify-center border
                            ${currentQuestionIndex === index ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
                            ${answer !== null ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-gray-50 text-gray-800'}
                          `}
                          onClick={() => jumpToQuestion(index)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-gradient-to-r from-emerald-500/5 to-indigo-500/5 border-t px-3 py-2">
        <p className="text-xs text-gray-500 w-full text-center">
          Regular practice with sample exams can improve your final score by up to 25%
        </p>
      </CardFooter>
    </Card>
  );
};

const RotateCw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export default PracticeExamFeature;
