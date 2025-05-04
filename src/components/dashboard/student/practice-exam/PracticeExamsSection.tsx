
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";
import BackButton from "@/components/ui/back-button";

const PracticeExamsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  // This would normally come from an API/database
  const exams = [
    { 
      id: '1', 
      title: 'Physics Full Mock Test', 
      type: 'full', 
      duration: 180, 
      questions: 90, 
      difficulty: 'Hard',
      subject: 'Physics',
      isNew: true
    },
    { 
      id: '2', 
      title: 'Biology Quick Quiz', 
      type: 'quiz', 
      duration: 30, 
      questions: 15, 
      difficulty: 'Easy',
      subject: 'Biology'
    },
    { 
      id: '3', 
      title: 'Chemistry Section Test', 
      type: 'section', 
      duration: 60, 
      questions: 30, 
      difficulty: 'Medium',
      subject: 'Chemistry',
      isRecommended: true
    },
    { 
      id: '4', 
      title: 'Mathematics Practice Set', 
      type: 'practice', 
      duration: 90, 
      questions: 40, 
      difficulty: 'Medium',
      subject: 'Mathematics'
    },
  ];

  const getFilteredExams = () => {
    if (activeTab === 'all') return exams;
    return exams.filter(exam => exam.type === activeTab);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'hard': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back button */}
      <BackButton to="/dashboard/student" label="Back to Dashboard" />
      
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FileText className="h-7 w-7" />
        Practice Exams
      </h1>
      <p className="text-muted-foreground">
        Test your knowledge with mock exams, quizzes, and practice sets
      </p>
      
      {/* Tab filters */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <EnhancedTooltip content="View all available exams">
            <TabsTrigger value="all">All Exams</TabsTrigger>
          </EnhancedTooltip>
          <EnhancedTooltip content="Full-length mock tests simulating real exam conditions">
            <TabsTrigger value="full">Full Mocks</TabsTrigger>
          </EnhancedTooltip>
          <EnhancedTooltip content="Short quizzes for quick revision">
            <TabsTrigger value="quiz">Quizzes</TabsTrigger>
          </EnhancedTooltip>
          <EnhancedTooltip content="Topic-specific practice sets">
            <TabsTrigger value="section">Section Tests</TabsTrigger>
          </EnhancedTooltip>
          <EnhancedTooltip content="Practice exercises with explanations">
            <TabsTrigger value="practice">Practice Sets</TabsTrigger>
          </EnhancedTooltip>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredExams().map((exam) => (
              <EnhancedTooltip
                key={exam.id}
                content={`${exam.title}: ${exam.questions} questions, ${exam.duration} minutes, ${exam.difficulty} difficulty`}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      {exam.isNew && (
                        <Badge variant="default" className="bg-green-600">New</Badge>
                      )}
                      {exam.isRecommended && (
                        <Badge variant="outline" className="border-blue-500 text-blue-500">Recommended</Badge>
                      )}
                    </div>
                    <CardDescription>{exam.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{exam.duration} mins</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{exam.questions} questions</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className={`${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" asChild>
                      <Link to={`/dashboard/student/practice-exam/${exam.id}/start`}>
                        Start Exam <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </EnhancedTooltip>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Recent Scores */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Recent Scores
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border-b">Exam</th>
                <th className="text-left p-2 border-b">Date</th>
                <th className="text-left p-2 border-b">Score</th>
                <th className="text-left p-2 border-b">Percentile</th>
                <th className="text-right p-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">Mathematics Section Test</td>
                <td className="p-2 border-b">May 2, 2025</td>
                <td className="p-2 border-b">85%</td>
                <td className="p-2 border-b">92nd</td>
                <td className="p-2 border-b text-right">
                  <EnhancedTooltip content="View detailed analysis and answers">
                    <Button variant="link" size="sm" asChild>
                      <Link to="/dashboard/student/practice-exam/past-1/review">
                        Review
                      </Link>
                    </Button>
                  </EnhancedTooltip>
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b">Biology Full Mock</td>
                <td className="p-2 border-b">Apr 28, 2025</td>
                <td className="p-2 border-b">72%</td>
                <td className="p-2 border-b">78th</td>
                <td className="p-2 border-b text-right">
                  <EnhancedTooltip content="View detailed analysis and answers">
                    <Button variant="link" size="sm" asChild>
                      <Link to="/dashboard/student/practice-exam/past-2/review">
                        Review
                      </Link>
                    </Button>
                  </EnhancedTooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PracticeExamsSection;
