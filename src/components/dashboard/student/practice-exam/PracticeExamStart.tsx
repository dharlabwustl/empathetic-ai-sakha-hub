
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfileType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  BookOpen,
  Check,
  FileText,
  Tag,
  AlertCircle,
  ArrowRight,
  Brain
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PracticeExamProps {
  userProfile: UserProfileType;
  onStartExam: () => void;
}

const PracticeExamStart: React.FC<PracticeExamProps> = ({ userProfile, onStartExam }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [examLoading, setExamLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get exam name based on user's exam preparation
  const examName = userProfile.examPreparation?.target || "Mock Test";
  
  // Sample exam data - in a real app this would come from a backend
  const examData = {
    id: "practice-001",
    title: `${examName} Practice Test`,
    description: "This practice test will help you prepare for your upcoming exam by simulating real exam conditions.",
    timeLimit: 60, // minutes
    questionCount: 25,
    subject: userProfile.subjects?.[0]?.name || "General Knowledge",
    difficulty: "Medium",
    avgScore: "68%",
    attempts: 543,
    requiredSubscription: "free"
  };
  
  const handleStartExam = () => {
    setShowConfirmDialog(false);
    setExamLoading(true);
    
    toast({
      title: "Starting Exam",
      description: "Preparing your practice test..."
    });
    
    // Simulate loading time for exam preparation
    setTimeout(() => {
      setExamLoading(false);
      onStartExam();
      navigate("/dashboard/student/practice-exam/1");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Practice Exams</h2>
          <p className="text-muted-foreground">Test your knowledge and track your progress.</p>
        </div>
        
        <Button 
          onClick={() => setShowConfirmDialog(true)}
          disabled={examLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-700"
        >
          {examLoading ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Loading Exam...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Start New Practice Test
            </>
          )}
        </Button>
      </div>
      
      <Card className="overflow-hidden border-2 border-primary/20">
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 h-2" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{examData.title}</CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Recommended
            </Badge>
          </div>
          <CardDescription>{examData.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Time Limit</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{examData.timeLimit} minutes</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Questions</span>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{examData.questionCount} questions</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Subject</span>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{examData.subject}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{examData.difficulty}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
            <div className="flex items-start">
              <Brain className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Test Preparation Tips:</h4>
                <ul className="mt-1 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Find a quiet place with minimal distractions</li>
                  <li>• Have paper/calculator ready if allowed for your exam</li>
                  <li>• Maintain a steady pace to complete all questions</li>
                  <li>• Review your answers before submitting if time permits</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between border-t bg-gray-50 dark:bg-gray-800/50 p-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="flex items-center text-sm text-muted-foreground">
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Avg. Score: {examData.avgScore}
            </span>
            <span className="mx-2">•</span>
            <span className="text-sm text-muted-foreground">{examData.attempts} attempts</span>
          </div>
          
          <Button 
            onClick={() => setShowConfirmDialog(true)}
            disabled={examLoading}
          >
            {examLoading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Start Practice Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Practice Exam</DialogTitle>
            <DialogDescription>
              You're about to start a {examData.timeLimit}-minute practice exam with {examData.questionCount} questions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-start mb-4">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Before you begin:</h4>
                <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                  <li>• Make sure you have {examData.timeLimit} minutes of uninterrupted time</li>
                  <li>• Your progress will be saved automatically</li>
                  <li>• You can pause the exam, but the timer will continue</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center font-medium">Are you ready to begin?</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartExam}>
              Start Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PracticeExamStart;
