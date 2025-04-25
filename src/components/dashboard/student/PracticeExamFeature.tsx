
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { BookOpen, Clock, Search, Filter } from 'lucide-react';
import ExamList from './practice-exam/ExamList';
import ExamEnvironment from './practice-exam/ExamEnvironment';

// Mock data for exams
const mockUpcomingExams = [
  {
    id: "1",
    title: "Physics Mechanics",
    subject: "Physics",
    description: "Test your understanding of mechanics concepts",
    timeEstimate: "45 min",
    difficulty: "Medium",
    questions: 25
  },
  {
    id: "2",
    title: "Organic Chemistry",
    subject: "Chemistry",
    description: "Practice questions on organic reactions",
    timeEstimate: "60 min",
    difficulty: "Hard",
    questions: 30
  },
  {
    id: "3",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    description: "Review core algebra concepts",
    timeEstimate: "30 min",
    difficulty: "Easy",
    questions: 20
  }
];

const mockCompletedExams = [
  {
    id: "4",
    title: "Cell Biology Basics",
    subject: "Biology",
    description: "Test on cell structure and function",
    timeEstimate: "40 min",
    difficulty: "Medium",
    questions: 25,
    completed: true,
    score: 82,
    dateCompleted: "April 15, 2025"
  },
  {
    id: "5",
    title: "Thermodynamics Review",
    subject: "Physics",
    description: "Assessment on thermodynamic principles",
    timeEstimate: "50 min",
    difficulty: "Hard",
    questions: 30,
    completed: true,
    score: 76,
    dateCompleted: "April 10, 2025"
  }
];

// Mock questions for the exams
const mockExamQuestions = [
  {
    id: "q1",
    text: "What is Newton's first law of motion?",
    options: [
      "For every action, there is an equal and opposite reaction.",
      "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      "Force equals mass times acceleration.",
      "Energy can neither be created nor destroyed."
    ],
    correctAnswer: 1
  },
  {
    id: "q2",
    text: "Which of the following is a unit of energy?",
    options: [
      "Newton",
      "Pascal",
      "Joule",
      "Ampere"
    ],
    correctAnswer: 2
  },
  {
    id: "q3",
    text: "What is the acceleration due to gravity on Earth's surface?",
    options: [
      "5.8 m/s²",
      "7.9 m/s²",
      "9.8 m/s²",
      "11.2 m/s²"
    ],
    correctAnswer: 2
  }
];

const PracticeExamFeature = () => {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [examFilter, setExamFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [examInProgress, setExamInProgress] = useState(false);
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [examTimer, setExamTimer] = useState<number | null>(null);
  const [examSubmitting, setExamSubmitting] = useState(false);
  
  // Timer effect for the exam
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (examInProgress && examTimer !== null) {
      interval = setInterval(() => {
        setExamTimer((prev) => {
          if (prev === null || prev <= 1) {
            // Time's up - auto submit
            clearInterval(interval!);
            toast({
              title: "Time's Up!",
              description: "Your exam is being submitted automatically.",
              variant: "destructive"
            });
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examInProgress, examTimer]);
  
  // Function to get color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handler for starting an exam
  const handleStartExam = (exam: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsLoadingExam(true);
    
    // Simulate loading the exam
    setTimeout(() => {
      setSelectedExam(exam);
      setExamInProgress(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setExamTimer(exam.timeEstimate.includes('30') ? 1800 : 3600); // 30 or 60 min in seconds
      setIsLoadingExam(false);
      
      toast({
        title: "Exam Started",
        description: `You've started the ${exam.title} exam. Good luck!`,
      });
    }, 1000);
  };
  
  // Handler for reviewing a completed exam
  const handleReviewExam = (exam: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    toast({
      title: "Exam Review",
      description: `Reviewing ${exam.title} exam.`,
    });
    // In a real app, this would open the exam review screen
  };
  
  // Handler for clicking on an exam card
  const handleExamClick = (exam: any) => {
    toast({
      title: "Exam Details",
      description: exam.description,
    });
    // In a real app, this would show more details about the exam
  };
  
  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockExamQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  // Submit the exam
  const handleSubmitExam = () => {
    setExamSubmitting(true);
    
    // Simulate submitting the exam
    setTimeout(() => {
      setExamSubmitting(false);
      setExamInProgress(false);
      setSelectedExam(null);
      
      // Calculate the score (in a real app this would be more complex)
      const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      
      toast({
        title: "Exam Submitted Successfully!",
        description: `Your score is ${score}%. Great job!`,
      });
    }, 1500);
  };
  
  // Close the exam environment
  const closeExamEnvironment = () => {
    // Confirm before closing if answers have been selected
    if (Object.keys(selectedAnswers).length > 0) {
      if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
        setExamInProgress(false);
        setSelectedExam(null);
      }
    } else {
      setExamInProgress(false);
      setSelectedExam(null);
    }
  };

  return (
    <>
      {/* Exam Environment Modal */}
      {examInProgress && selectedExam && (
        <ExamEnvironment
          exam={selectedExam}
          currentQuestion={mockExamQuestions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          questions={mockExamQuestions}
          selectedAnswers={selectedAnswers}
          examTimer={examTimer}
          handleAnswerSelect={handleAnswerSelect}
          handlePreviousQuestion={handlePreviousQuestion}
          handleNextQuestion={handleNextQuestion}
          handleSubmitExam={handleSubmitExam}
          closeExamEnvironment={closeExamEnvironment}
          examSubmitting={examSubmitting}
          getDifficultyColor={getDifficultyColor}
          formatTime={formatTime}
        />
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Practice Exams</h2>
            <p className="text-gray-500">
              Test your knowledge with practice exams and assessments
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search exams..." 
                className="pl-8 h-9 w-full rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Exams</CardTitle>
                <CardDescription>Practice tests to prepare for your exams</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{mockUpcomingExams.length + mockCompletedExams.length} exams</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Exams</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <ExamList 
                  exams={mockUpcomingExams}
                  onExamClick={handleExamClick}
                  onStartExam={handleStartExam}
                  onReviewExam={handleReviewExam}
                  isLoadingExam={isLoadingExam}
                  getDifficultyColor={getDifficultyColor}
                />
              </TabsContent>
              
              <TabsContent value="completed">
                <ExamList 
                  exams={mockCompletedExams}
                  onExamClick={handleExamClick}
                  onStartExam={handleStartExam}
                  onReviewExam={handleReviewExam}
                  isLoadingExam={isLoadingExam}
                  getDifficultyColor={getDifficultyColor}
                />
              </TabsContent>
              
              <TabsContent value="all">
                <ExamList 
                  exams={[...mockUpcomingExams, ...mockCompletedExams]}
                  onExamClick={handleExamClick}
                  onStartExam={handleStartExam}
                  onReviewExam={handleReviewExam}
                  isLoadingExam={isLoadingExam}
                  getDifficultyColor={getDifficultyColor}
                />
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Want to create your own practice quiz?
              </p>
              <Button variant="outline" className="gap-1">
                <BookOpen className="h-4 w-4 mr-1" />
                Create Custom Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PracticeExamFeature;
