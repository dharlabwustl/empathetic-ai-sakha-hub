
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ExamStartPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Mock exam data - replace with actual data from your backend
  const examData = {
    title: "Physics Full Mock Test",
    duration: 180,
    totalQuestions: 90,
    sections: [
      { name: "Physics", questions: 30 },
      { name: "Chemistry", questions: 30 },
      { name: "Mathematics", questions: 30 }
    ],
    instructions: [
      "Read all questions carefully before answering",
      "Each question carries equal marks",
      "There is negative marking for incorrect answers",
      "Use rough paper for calculations"
    ]
  };

  const startExam = () => {
    navigate(`/dashboard/student/exams/attempt/${examId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{examData.title}</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Exam Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Duration: {examData.duration} minutes</span>
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
                    <CheckCircle2 className="h-4 w-4 mt-1 text-green-500" />
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
              <Button size="lg" onClick={startExam}>
                Start Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
