
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, PieChart, BarChart3, CheckCircle, AlertCircle, BookOpen, Timer } from "lucide-react";
import { ExamQuestion, ExamAttempt } from "@/types/user/exam";
import { motion } from "framer-motion";

const ExamReviewPage = () => {
  const { examId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock exam data (in a real app, this would be fetched)
  const examData: ExamAttempt = {
    id: "attempt-123",
    examId: examId || "exam-123",
    startedAt: "2025-04-25T14:30:00Z",
    completedAt: "2025-04-25T15:45:00Z",
    score: 72,
    totalPoints: 100,
    timeSpent: 4500, // 75 minutes in seconds
    percentile: 65,
    answers: [
      {
        questionId: "q1",
        userAnswer: "Force equals mass times acceleration",
        correct: true,
        points: 2,
        feedback: "Excellent! That's Newton's Second Law."
      },
      {
        questionId: "q2",
        userAnswer: ["option1", "option3"],
        correct: false,
        points: 0,
        feedback: "You missed option2, which was also correct."
      },
      {
        questionId: "q3",
        userAnswer: "option2",
        correct: true,
        points: 2
      }
    ]
  };

  // Mock questions data
  const questionsData: ExamQuestion[] = [
    {
      id: "q1",
      question: "What is Newton's Second Law of Motion?",
      type: "short-answer",
      points: 2,
      explanation: "Newton's Second Law states that Force equals mass times acceleration (F = ma)."
    },
    {
      id: "q2",
      question: "Which of the following are fundamental forces in physics?",
      options: ["Gravity", "Electromagnetic Force", "Strong Nuclear Force", "Centripetal Force"],
      type: "checkbox",
      correctAnswer: ["option1", "option2", "option3"],
      points: 3,
      explanation: "The four fundamental forces are gravity, electromagnetic force, strong nuclear force, and weak nuclear force. Centripetal force is not a fundamental force."
    },
    {
      id: "q3",
      question: "Which law of thermodynamics states that energy cannot be created or destroyed?",
      options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
      type: "multiple-choice",
      correctAnswer: "option2",
      points: 2,
      explanation: "The First Law of Thermodynamics states that energy cannot be created or destroyed, only transferred or converted from one form to another."
    }
  ];

  // Calculate statistics
  const correctAnswers = examData.answers.filter(answer => answer.correct).length;
  const incorrectAnswers = examData.answers.filter(answer => !answer.correct).length;
  const totalQuestions = examData.answers.length;
  const accuracy = (correctAnswers / totalQuestions) * 100;

  // Format time spent
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Mock topic data
  const weakTopics = ["Thermodynamics", "Wave Mechanics"];
  const strongTopics = ["Kinematics", "Newton's Laws"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link to="/dashboard/student/practice">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Practice Exams
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Exam Review</CardTitle>
                <CardDescription>
                  Completed on {new Date(examData.completedAt).toLocaleDateString()} • 
                  {' '}{formatTime(examData.timeSpent)} spent
                </CardDescription>
              </div>
              <Badge className={examData.score >= 70 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                {examData.score}% Score
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions Review</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold mb-1">{examData.score}%</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold mb-1">{examData.percentile || 0}</div>
                      <div className="text-sm text-muted-foreground">Percentile</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold mb-1">{correctAnswers}/{totalQuestions}</div>
                      <div className="text-sm text-muted-foreground">Correct Answers</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="text-2xl font-bold mb-1">{formatTime(examData.timeSpent)}</div>
                      <div className="text-sm text-muted-foreground">Time Spent</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Overall Performance
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Accuracy</span>
                      <span className="text-sm font-medium">{accuracy.toFixed(0)}%</span>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center text-red-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Weak Areas
                      </h4>
                      <ul className="space-y-2">
                        {weakTopics.map((topic, index) => (
                          <li key={index} className="text-sm bg-red-50 p-2 rounded-md flex items-center">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Strong Areas
                      </h4>
                      <ul className="space-y-2">
                        {strongTopics.map((topic, index) => (
                          <li key={index} className="text-sm bg-green-50 p-2 rounded-md flex items-center">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Time Analysis
                    </h4>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-blue-700">
                        You spent an average of {(examData.timeSpent / totalQuestions).toFixed(1)} seconds per question.
                        Try to spend no more than 90 seconds on each question to improve your time management.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="questions" className="space-y-6">
                {questionsData.map((question, index) => {
                  const answer = examData.answers.find(a => a.questionId === question.id);
                  
                  return (
                    <Card key={index} className={`border-l-4 ${answer?.correct ? "border-l-green-500" : "border-l-red-500"}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                          <Badge>{answer?.correct ? "Correct" : "Incorrect"}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="font-medium">{question.question}</p>
                          
                          {question.options && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                              {question.options.map((option, i) => (
                                <div 
                                  key={i} 
                                  className={`px-3 py-2 rounded-md text-sm ${
                                    // For checkbox questions
                                    Array.isArray(answer?.userAnswer) && Array.isArray(question.correctAnswer) ?
                                      (Array.isArray(answer?.userAnswer) && answer?.userAnswer.includes(`option${i+1}`) && 
                                       Array.isArray(question.correctAnswer) && question.correctAnswer.includes(`option${i+1}`)) ?
                                        "bg-green-100 text-green-800" : 
                                      (Array.isArray(answer?.userAnswer) && answer?.userAnswer.includes(`option${i+1}`) && 
                                       Array.isArray(question.correctAnswer) && !question.correctAnswer.includes(`option${i+1}`)) ?
                                        "bg-red-100 text-red-800" :
                                      (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(`option${i+1}`)) ?
                                        "bg-green-50 border border-green-200" :
                                        "bg-gray-100" :
                                    // For single choice questions
                                    answer?.userAnswer === `option${i+1}` && question.correctAnswer === `option${i+1}` ?
                                      "bg-green-100 text-green-800" :
                                    answer?.userAnswer === `option${i+1}` && question.correctAnswer !== `option${i+1}` ?
                                      "bg-red-100 text-red-800" :
                                    question.correctAnswer === `option${i+1}` ?
                                      "bg-green-50 border border-green-200" :
                                      "bg-gray-100"
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === "short-answer" && (
                            <div className="mt-3">
                              <div className="font-medium text-sm text-gray-500">Your Answer:</div>
                              <div className={`px-3 py-2 rounded-md text-sm mt-1 ${answer?.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {answer?.userAnswer as string || "No answer provided"}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Explanation</h4>
                          <p className="text-sm text-blue-700">{question.explanation}</p>
                        </div>
                        
                        {answer?.feedback && (
                          <div className="bg-amber-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium mb-1">Feedback</h4>
                            <p className="text-sm text-amber-700">{answer.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Study Recommendations
                  </h3>
                  
                  <div className="grid gap-4">
                    {weakTopics.map((topic, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{topic}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">
                            Focus on improving your understanding of {topic.toLowerCase()} concepts.
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              View Concepts
                            </Button>
                            <Button size="sm">
                              Practice Questions
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                    <div className="flex items-start">
                      <Timer className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Time Management</h4>
                        <p className="text-sm text-amber-700">
                          Consider practicing with timed exercises to improve your speed. You spent more time than average on questions related to Wave Mechanics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-wrap gap-3 justify-between border-t pt-4">
            <div>
              <Button variant="outline" size="sm" onClick={() => window.print()} className="mr-2">
                Print Results
              </Button>
              <Button variant="outline" size="sm">
                Save to Study Plan
              </Button>
            </div>
            <div>
              <Link to={`/dashboard/student/exams/start/${examId}`}>
                <Button size="sm" className="mr-2">
                  Retake Exam
                </Button>
              </Link>
              <Link to="/dashboard/student/practice">
                <Button variant="secondary" size="sm">
                  Practice Similar Exams
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExamReviewPage;
