
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Clock, FileText, CheckCircle, XCircle, Award, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  urlPath: string;
  completed?: boolean;
  score?: number;
  dateTaken?: string;
  dateCompleted?: string;
}

const upcomingExams: Exam[] = [
  {
    id: 'exam1',
    title: 'Physics Full Mock Test',
    subject: 'Physics',
    duration: '3 hours',
    questions: 90,
    difficulty: 'Medium',
    urlPath: '/exams/physics-mock-1'
  },
  {
    id: 'exam2',
    title: 'Mathematics Practice Set',
    subject: 'Mathematics',
    duration: '2 hours',
    questions: 60,
    difficulty: 'Hard',
    urlPath: '/exams/math-practice-1'
  },
  {
    id: 'exam3',
    title: 'Chemistry Concepts Quiz',
    subject: 'Chemistry',
    duration: '1.5 hours',
    questions: 45,
    difficulty: 'Easy',
    urlPath: '/exams/chemistry-quiz-1'
  }
];

const completedExams: Exam[] = [
  {
    id: 'exam4',
    title: 'Biology Quick Assessment',
    subject: 'Biology',
    duration: '1 hour',
    questions: 30,
    difficulty: 'Easy',
    urlPath: '/exams/bio-assess-1',
    completed: true,
    score: 85,
    dateTaken: '2023-04-12',
    dateCompleted: '2023-04-12'
  },
  {
    id: 'exam5',
    title: 'Physics Mechanics Test',
    subject: 'Physics',
    duration: '2 hours',
    questions: 45,
    difficulty: 'Medium',
    urlPath: '/exams/physics-mech-1',
    completed: true,
    score: 72,
    dateTaken: '2023-04-05',
    dateCompleted: '2023-04-05'
  }
];

interface PracticeExamFeatureProps {
  displayCount?: number;
}

export default function PracticeExamFeature({ displayCount = 3 }: PracticeExamFeatureProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [examInProgress, setExamInProgress] = useState<Exam | null>(null);
  const [showExamEnvironment, setShowExamEnvironment] = useState(false);
  const [showExamReview, setShowExamReview] = useState(false);
  const [reviewingExam, setReviewingExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [examTimeRemaining, setExamTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);
  
  const visibleUpcomingExams = upcomingExams.slice(0, displayCount);
  const visibleCompletedExams = completedExams.slice(0, displayCount);
  
  const handleExamClick = (exam: Exam) => {
    // Modified to show exam details or review
    if (exam.completed) {
      handleReviewExam(exam, new MouseEvent('click') as React.MouseEvent<HTMLButtonElement>);
    } else {
      toast({
        title: "Exam Details",
        description: `${exam.title}: ${exam.questions} questions, ${exam.duration}`,
        duration: 3000,
      });
    }
  };
  
  const handleStartExam = (exam: Exam, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    setExamInProgress(exam);
    setShowExamEnvironment(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    
    // Start the exam timer
    const durationInMinutes = parseInt(exam.duration.split(' ')[0], 10) * 60;
    setExamTimeRemaining(durationInMinutes);
    
    // Set up the timer
    const timerInterval = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    toast({
      title: "Exam Started",
      description: `You've started ${exam.title}. Good luck!`,
      duration: 5000,
    });
    
    window.scrollTo(0, 0); // Scroll to top
  };
  
  const handleReviewExam = (exam: Exam, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    setReviewingExam(exam);
    setShowExamReview(true);
    
    toast({
      title: "Exam Review Mode",
      description: "Review your answers and see explanations for each question.",
      duration: 5000,
    });
    
    window.scrollTo(0, 0); // Scroll to top
  };

  const closeExamEnvironment = () => {
    setShowExamEnvironment(false);
    setExamInProgress(null);
    setExamSubmitted(false);
    
    // Simulate completion
    toast({
      title: "Exam Submitted",
      description: "Your exam has been successfully submitted.",
      duration: 5000,
    });
  };
  
  const handleExamSubmit = () => {
    setExamSubmitted(true);
    
    setTimeout(() => {
      closeExamEnvironment();
      
      // Add the exam to completed exams
      if (examInProgress) {
        const completedExam = {
          ...examInProgress,
          completed: true,
          score: Math.floor(Math.random() * 30) + 70, // Random score between 70-99
          dateTaken: new Date().toISOString(),
          dateCompleted: new Date().toISOString()
        };
        
        // In a real app, you would send this to an API
        toast({
          title: "Exam Results Ready",
          description: "Your exam has been graded and results are available for review.",
          duration: 5000,
        });
      }
    }, 2000);
  };
  
  const closeExamReview = () => {
    setShowExamReview(false);
    setReviewingExam(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };
  
  const navigateQuestion = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentQuestion < 9) {
      setCurrentQuestion(prev => prev + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Sample questions for the exam environment
  const sampleQuestions = [
    {
      question: "What is the correct expression for the kinetic energy of a moving object?",
      options: ["E = mc²", "E = ½mv²", "E = mgh", "E = mv"],
      correctAnswer: "E = ½mv²"
    },
    {
      question: "Which of the following is NOT a type of chemical bond?",
      options: ["Covalent bond", "Ionic bond", "Magnetic bond", "Metallic bond"],
      correctAnswer: "Magnetic bond"
    },
    {
      question: "If f(x) = 2x² + 3x - 5, what is f'(x)?",
      options: ["f'(x) = 4x + 3", "f'(x) = 2x + 3", "f'(x) = 4x² + 3", "f'(x) = 4x - 5"],
      correctAnswer: "f'(x) = 4x + 3"
    },
    {
      question: "What is the SI unit of force?",
      options: ["Watt", "Newton", "Joule", "Pascal"],
      correctAnswer: "Newton"
    },
    {
      question: "Which of the following elements has the highest electronegativity?",
      options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"],
      correctAnswer: "Fluorine"
    },
    {
      question: "What is the value of sin(30°)?",
      options: ["0", "0.5", "1", "√3/2"],
      correctAnswer: "0.5"
    },
    {
      question: "Which of the following is an example of a vector quantity?",
      options: ["Mass", "Temperature", "Velocity", "Time"],
      correctAnswer: "Velocity"
    },
    {
      question: "What is the atomic number of Carbon?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6"
    },
    {
      question: "Which of the following is a noble gas?",
      options: ["Chlorine", "Oxygen", "Helium", "Hydrogen"],
      correctAnswer: "Helium"
    },
    {
      question: "What is the value of the gravitational constant (G)?",
      options: ["6.67 × 10⁻¹¹ N·m²/kg²", "9.8 m/s²", "3 × 10⁸ m/s", "1.6 × 10⁻¹⁹ C"],
      correctAnswer: "6.67 × 10⁻¹¹ N·m²/kg²"
    }
  ];

  // Exam Environment Component
  const ExamEnvironment = ({ exam }: { exam: Exam }) => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{exam.title}</h2>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(exam.difficulty)}>
              {exam.difficulty}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Time left: {formatTime(examTimeRemaining)}
            </span>
          </div>
        </div>
        
        <div className="space-y-8">
          {examSubmitted ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Exam Submitted Successfully!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Your answers are being processed. Results will be available shortly.
                </p>
                <div className="flex justify-center">
                  <Button onClick={closeExamEnvironment}>
                    Return to Dashboard
                  </Button>
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-medium mb-3">Question {currentQuestion + 1} of {sampleQuestions.length}</h3>
                <p className="mb-4">
                  {sampleQuestions[currentQuestion].question}
                </p>
                <div className="space-y-3">
                  {sampleQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <input 
                        type="radio" 
                        id={`q${currentQuestion}-a${index}`} 
                        name={`q${currentQuestion}`} 
                        checked={selectedAnswers[currentQuestion] === option}
                        onChange={() => handleAnswerSelect(currentQuestion, option)}
                        className="w-4 h-4" 
                      />
                      <label htmlFor={`q${currentQuestion}-a${index}`} className="text-sm flex-grow cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Question navigation and progress bar */}
              <div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{currentQuestion + 1}/{sampleQuestions.length}</span>
                  </div>
                  <Progress value={(currentQuestion + 1) / sampleQuestions.length * 100} />
                </div>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {Array.from({ length: sampleQuestions.length }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestion(i)}
                      className={`h-8 w-8 rounded-full text-xs font-medium flex items-center justify-center ${
                        currentQuestion === i 
                          ? 'bg-blue-600 text-white' 
                          : selectedAnswers[i] 
                            ? 'bg-green-100 text-green-800 border border-green-300' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => navigateQuestion('prev')}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion < sampleQuestions.length - 1 ? (
                  <Button 
                    variant="outline"
                    onClick={() => navigateQuestion('next')}
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleExamSubmit}>
                    Submit Exam
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Exam Review Component
  const ExamReview = ({ exam }: { exam: Exam }) => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{exam.title} - Review</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed on: {exam.dateCompleted} | Score: {exam.score}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Completed
            </Badge>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Performance Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-xl font-bold">{exam.score}%</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
                <p className="text-xl font-bold">42 min</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                <p className="text-xl font-bold">{exam.questions}</p>
              </div>
            </div>
          </div>
          
          {/* Question Review */}
          <div>
            <h3 className="text-lg font-medium mb-3">Questions Review</h3>
            
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Question {i+1}</span>
                    <h4 className="font-medium">
                      {i === 0 && "What is the correct expression for the kinetic energy of a moving object?"}
                      {i === 1 && "Which of the following is NOT a type of chemical bond?"}
                      {i === 2 && "If f(x) = 2x² + 3x - 5, what is f'(x)?"}
                    </h4>
                  </div>
                  <Badge className={i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {i % 2 === 0 ? "Correct" : "Incorrect"}
                  </Badge>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium">Your answer:</p>
                  <p className={`text-sm ${i % 2 === 0 ? "text-green-600" : "text-red-600"}`}>
                    {i === 0 && "E = ½mv²"}
                    {i === 1 && "Covalent bond"}
                    {i === 2 && "f'(x) = 2x + 3"}
                  </p>
                </div>
                
                {i % 2 !== 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Correct answer:</p>
                    <p className="text-sm text-green-600">
                      {i === 1 && "Magnetic bond"}
                      {i === 2 && "f'(x) = 4x + 3"}
                    </p>
                  </div>
                )}
                
                <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Explanation:</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    {i === 0 && "Kinetic energy is calculated as E = ½mv², where m is mass and v is velocity."}
                    {i === 1 && "Magnetic bond is not a type of chemical bond. The three main types are covalent, ionic, and metallic bonds."}
                    {i === 2 && "The derivative of f(x) = 2x² + 3x - 5 is f'(x) = 4x + 3 using the power rule."}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Performance Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Topic Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Mechanics</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Thermodynamics</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2 bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Electromagnetism</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-200" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Modern Physics</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-gray-200" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Performance Trend</h3>
              <div className="h-[150px] flex items-end justify-between pt-4">
                {[65, 68, 72, 75, 79, 82].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-violet-500 rounded-t"
                      style={{ height: `${value * 1.2}px` }}
                    ></div>
                    <span className="text-xs mt-2">Attempt {index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-xs text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Improving
                </span>
                <span className="text-xs text-gray-500">Last 6 attempts</span>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Review chemical bonding types and properties</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Practice more calculus differentiation problems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Consider attempting similar practice tests to improve speed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={closeExamReview}>Close Review</Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-800">
      {/* Exam environment overlay */}
      {showExamEnvironment && examInProgress && <ExamEnvironment exam={examInProgress} />}
      
      {/* Exam review overlay */}
      {showExamReview && reviewingExam && <ExamReview exam={reviewingExam} />}
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <span className="flex items-center">
            Practice Exams 
            <motion.span 
              className="ml-2 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {upcomingExams.length + completedExams.length} Available
            </motion.span>
          </span>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400" asChild>
            <a href="/dashboard/student/exams">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'completed')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3 mt-0">
            {visibleUpcomingExams.length > 0 ? (
              visibleUpcomingExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleExamClick(exam)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                        {exam.title}
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-gray-400" />
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • {exam.questions} questions</p>
                    </div>
                    <Badge className={`${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Duration: {exam.duration}
                    </span>
                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700" onClick={(e) => handleStartExam(exam, e)}>
                      Start Exam <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No upcoming exams available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3 mt-0">
            {visibleCompletedExams.length > 0 ? (
              visibleCompletedExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleExamClick(exam)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                        {exam.title}
                        <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-green-500" />
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • Score: {exam.score}%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed: {exam.dateCompleted}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 text-xs border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800"
                      onClick={(e) => handleReviewExam(exam, e)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Review Exam
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No completed exams yet
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
