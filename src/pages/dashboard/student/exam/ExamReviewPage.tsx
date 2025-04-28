
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, PieChart, BarChart, Clock } from 'lucide-react';

export default function ExamReviewPage() {
  const { examId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock exam review data - replace with actual data from your backend
  const reviewData = {
    examTitle: "Physics Full Mock Test",
    score: 75,
    totalQuestions: 90,
    correctAnswers: 68,
    incorrectAnswers: 12,
    unattempted: 10,
    timeTaken: "2h 45m",
    sectionWiseScores: [
      { name: "Physics", score: 80, total: 100 },
      { name: "Chemistry", score: 70, total: 100 },
      { name: "Mathematics", score: 75, total: 100 }
    ],
    questions: [
      {
        id: 1,
        question: "What is Newton's First Law?",
        yourAnswer: "An object at rest stays at rest...",
        correctAnswer: "An object at rest stays at rest...",
        isCorrect: true,
        explanation: "This law is also known as the law of inertia..."
      },
      // ... more questions
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{reviewData.examTitle} - Review</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{reviewData.score}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{reviewData.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">{reviewData.incorrectAnswers}</div>
                <div className="text-sm text-muted-foreground">Incorrect Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{reviewData.timeTaken}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewData.sectionWiseScores.map((section) => (
                    <div key={section.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{section.name}</span>
                        <span>{section.score}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${section.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            {reviewData.questions.map((q) => (
              <Card key={q.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-2">
                    {q.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm text-muted-foreground mt-2">Your answer: {q.yourAnswer}</p>
                      <p className="text-sm text-green-600 mt-1">Correct answer: {q.correctAnswer}</p>
                      {!q.isCorrect && (
                        <p className="text-sm bg-muted p-3 rounded-md mt-3">{q.explanation}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
