
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Clock, FileText, HelpCircle, AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ExamStartPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Mock exam data (in a real app, this would be fetched)
  const examData = {
    id: examId,
    title: "Physics Midterm Exam",
    description: "Test your understanding of Mechanics and Thermodynamics",
    totalQuestions: 50,
    totalMarks: 100,
    timeLimit: 90, // minutes
    difficulty: "Medium",
    instructions: [
      "Read all questions carefully before answering",
      "Each question has only one correct answer unless specified otherwise",
      "No negative marking for wrong answers",
      "You can flag questions to review later"
    ]
  };

  const handleStartExam = () => {
    setLoading(true);
    toast({
      title: "Exam Started",
      description: "Good luck!"
    });
    // Simulate loading and then redirect to the exam page
    setTimeout(() => {
      navigate(`/dashboard/student/exams/attempt/${examId}`);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{examData.title}</CardTitle>
                <CardDescription>{examData.description}</CardDescription>
              </div>
              <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded-md">
                <Timer className="h-5 w-5 mr-2" />
                <span className="font-medium">{examData.timeLimit} minutes</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center">
                <FileText className="h-8 w-8 text-slate-600 mb-2" />
                <div className="text-2xl font-bold">{examData.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Check className="h-8 w-8 text-slate-600 mb-2" />
                <div className="text-2xl font-bold">{examData.totalMarks}</div>
                <div className="text-sm text-muted-foreground">Total Marks</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Clock className="h-8 w-8 text-slate-600 mb-2" />
                <div className="text-2xl font-bold">{examData.timeLimit}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                Instructions
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {examData.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-slate-700">{instruction}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Important</h4>
                  <p className="text-sm text-amber-700">
                    Once you start the exam, the timer will begin counting down. Make sure you have a stable internet connection and won't be disturbed for the next {examData.timeLimit} minutes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={() => navigate('/dashboard/student/practice')}>
              Cancel
            </Button>
            <Button 
              onClick={handleStartExam} 
              className="gap-2" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  Start Exam
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExamStartPage;
