
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle,
  AlertTriangle,
  Timer,
  BarChart2,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ExamProps {
  id: string;
  title: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  questionCount: number;
  duration: number; // minutes
  dueDate?: Date;
  completionRate?: number;
  lastAttemptScore?: number;
}

const mockExams: ExamProps[] = [
  {
    id: "exam1",
    title: "Physics Midterm Mock",
    subject: "Physics",
    difficulty: "Medium",
    questionCount: 40,
    duration: 60,
    dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    completionRate: 0
  },
  {
    id: "exam2",
    title: "Chemistry Practice Test",
    subject: "Chemistry",
    difficulty: "Hard",
    questionCount: 30,
    duration: 45,
    completionRate: 75,
    lastAttemptScore: 68
  },
  {
    id: "exam3",
    title: "Mathematics Quick Quiz",
    subject: "Mathematics",
    difficulty: "Easy",
    questionCount: 20,
    duration: 30,
    completionRate: 100,
    lastAttemptScore: 92
  }
];

const ExamPreparationPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<ExamProps | null>(null);
  const [examDialogOpen, setExamDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  
  const { toast } = useToast();
  
  const handleStartExam = (exam: ExamProps) => {
    setSelectedExam(exam);
    setCurrentQuestion(0);
    setTimeRemaining(exam.duration * 60);
    setExamDialogOpen(true);
    
    toast({
      title: "Exam Started",
      description: `You are now taking ${exam.title}. Good luck!`
    });
  };
  
  const handleCloseExam = () => {
    if (confirm("Are you sure you want to exit the exam? Your progress will not be saved.")) {
      setExamDialogOpen(false);
      setSelectedExam(null);
      
      toast({
        title: "Exam Exited",
        description: "You have exited the exam. Your progress was not saved."
      });
    }
  };
  
  const handleSubmitExam = () => {
    setExamDialogOpen(false);
    
    toast({
      title: "Exam Submitted",
      description: "Your exam has been submitted successfully. Results will be available shortly."
    });
    
    // Here you would typically save the results and update the exam's completion status
  };
  
  const formatDueDate = (date?: Date) => {
    if (!date) return "No due date";
    
    const today = new Date();
    const daysUntilDue = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue === 0) return "Due today";
    if (daysUntilDue === 1) return "Due tomorrow";
    if (daysUntilDue < 0) return "Past due";
    
    return `Due in ${daysUntilDue} days`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-blue-100 text-blue-700";
      case "Hard":
        return "bg-orange-100 text-orange-700";
      case "Expert":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Mock questions for the selected exam
  const renderExamContent = () => {
    if (!selectedExam) return null;
    
    // In a real app, you'd fetch actual questions
    const mockQuestion = {
      text: "If a car travels at 60 km/h for 2 hours and then at 40 km/h for 3 hours, what is the average speed for the entire journey?",
      options: [
        "48 km/h",
        "50 km/h",
        "52 km/h",
        "45 km/h"
      ]
    };
    
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {selectedExam.questionCount}</span>
          </div>
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-1 text-red-500" />
            <span className="text-sm font-medium">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">{mockQuestion.text}</h3>
          
          <div className="space-y-3">
            {mockQuestion.options.map((option, index) => (
              <div 
                key={index}
                className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentQuestion < selectedExam.questionCount - 1 ? (
            <Button 
              onClick={() => setCurrentQuestion(prev => prev + 1)}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSubmitExam}
            >
              Submit Exam
            </Button>
          )}
        </div>
      </>
    );
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Exam Preparation</h1>
          <p className="text-gray-500">Practice tests and mock exams for your preparation</p>
        </div>
        <Link to="/dashboard/student">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
          <div className="space-y-4">
            {mockExams.map((exam) => (
              <Card key={exam.id} className="overflow-hidden">
                <div className={`h-1 ${
                  exam.completionRate === 100 
                    ? "bg-green-500" 
                    : exam.completionRate && exam.completionRate > 0
                      ? "bg-amber-500" 
                      : "bg-blue-500"
                }`} 
                style={{ 
                  width: exam.completionRate ? `${exam.completionRate}%` : "0%" 
                }}></div>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{exam.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="outline">{exam.subject}</Badge>
                        <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                          {exam.difficulty}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {exam.duration} minutes
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {exam.questionCount} questions
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      {exam.completionRate === 100 ? (
                        <div className="flex items-center text-green-600 mb-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed ({exam.lastAttemptScore}%)
                        </div>
                      ) : exam.completionRate && exam.completionRate > 0 ? (
                        <div className="flex items-center text-amber-600 mb-2">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          In progress ({exam.completionRate}%)
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-600 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exam.dueDate ? formatDueDate(exam.dueDate) : "Available now"}
                        </div>
                      )}
                      
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={() => handleStartExam(exam)}
                      >
                        {exam.completionRate === 100 ? "Retake Exam" : 
                          exam.completionRate && exam.completionRate > 0 ? "Continue Exam" : "Start Exam"}
                      </Button>
                    </div>
                  </div>
                  
                  {exam.completionRate !== undefined && exam.completionRate > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 mb-1">
                        Completion: {exam.completionRate}%
                      </div>
                      <Progress value={exam.completionRate} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Exam Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Score</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed Exams</span>
                  <span className="font-medium">1 of 3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Highest Score</span>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="font-medium">92%</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-3">Recent Performance</h4>
                  <div className="relative h-32">
                    {/* Here you would normally put a proper chart */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100"></div>
                    <div className="absolute bottom-0 left-10% w-6 h-40% bg-blue-500"></div>
                    <div className="absolute bottom-0 left-30% w-6 h-60% bg-blue-500"></div>
                    <div className="absolute bottom-0 left-50% w-6 h-90% bg-blue-500"></div>
                    <div className="absolute bottom-0 left-70% w-6 h-70% bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockExams
                  .filter(exam => exam.dueDate && exam.completionRate !== 100)
                  .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
                  .slice(0, 3)
                  .map(exam => (
                    <div key={exam.id} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-xs text-gray-500">
                          {exam.dueDate ? format(exam.dueDate, 'MMMM d, yyyy') : 'No due date'}
                        </p>
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                  ))}
                
                {mockExams.filter(exam => exam.dueDate && exam.completionRate !== 100).length === 0 && (
                  <p className="text-sm text-gray-500">No upcoming exams</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={examDialogOpen} onOpenChange={setExamDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedExam?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedExam && (
                  <>
                    <Badge variant="outline">{selectedExam.subject}</Badge>
                    <Badge variant="outline" className={getDifficultyColor(selectedExam.difficulty)}>
                      {selectedExam.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {selectedExam.duration} minutes
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {selectedExam.questionCount} questions
                    </div>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {renderExamContent()}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseExam}>
              Exit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamPreparationPage;
