
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowLeft, Clock, FileText, Timer } from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

export default function ExamStartPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Mock exam data - replace with actual data from your backend
  const examData = {
    title: "Physics Full Mock Test",
    subject: "Physics",
    topic: "Comprehensive",
    description: "This comprehensive test covers mechanics, thermodynamics, optics, and modern physics concepts. It's designed to simulate the actual exam environment.",
    totalQuestions: 90,
    timeLimit: 180, // in minutes
    difficulty: "medium",
    dueDate: "Tomorrow",
    instructions: [
      "Read all questions carefully before answering",
      "Each question carries equal marks",
      "There is negative marking for incorrect answers",
      "Use rough paper for calculations",
      "The exam will be automatically submitted when the time limit is reached"
    ],
    sections: [
      { name: "Physics", questions: 30 },
      { name: "Chemistry", questions: 30 },
      { name: "Mathematics", questions: 30 }
    ]
  };

  const startExam = () => {
    navigate(`/dashboard/student/exams/attempt/${examId}`);
  };

  const handleBackToExams = () => {
    navigate('/dashboard/student/practice-exam');
  };

  return (
    <SharedPageLayout
      title={examData.title}
      subtitle={`${examData.subject} • ${examData.totalQuestions} questions • ${examData.timeLimit} minutes`}
      showQuickAccess={false}
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToExams}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Practice Exams</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Exam Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description:</p>
              <p>{examData.description}</p>
            </div>
          
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duration: {examData.timeLimit} minutes</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={examData.difficulty === "hard" ? "destructive" : examData.difficulty === "medium" ? "default" : "outline"}>
                  {examData.difficulty.charAt(0).toUpperCase() + examData.difficulty.slice(1)} Difficulty
                </Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Question Distribution:</p>
              <div className="space-y-2">
                {examData.sections.map((section) => (
                  <div key={section.name} className="flex justify-between items-center">
                    <span>{section.name}</span>
                    <Badge variant="secondary">{section.questions} questions</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {examData.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-xs text-primary font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Ready to begin?</h3>
            <p className="text-muted-foreground">
              Make sure you have everything you need before starting the exam.
              You cannot pause once you begin.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 max-w-xl mx-auto">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <h4 className="font-medium">Important Note</h4>
              </div>
              <p className="mt-1 text-sm text-yellow-700">
                Once you start the exam, the timer cannot be paused. Make sure you have sufficient time to complete the exam.
              </p>
            </div>
            <Button size="lg" onClick={startExam} className="bg-gradient-to-r from-violet-600 to-indigo-600">
              Start Exam Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </SharedPageLayout>
  );
}
