
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Clock, FileCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  date?: string;
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
    id: 'completed1',
    title: 'Biology Systems Test',
    subject: 'Biology',
    duration: '2 hours',
    questions: 60,
    difficulty: 'Medium',
    urlPath: '/exams/biology-systems-1',
    completed: true,
    score: 78,
    date: '2025-04-10'
  },
  {
    id: 'completed2',
    title: 'Physics Mechanics Quiz',
    subject: 'Physics',
    duration: '1 hour',
    questions: 30,
    difficulty: 'Easy',
    urlPath: '/exams/physics-mechanics-1',
    completed: true,
    score: 92,
    date: '2025-04-08'
  }
];

interface PracticeExamFeatureProps {
  displayCount?: number;
}

export default function PracticeExamFeature({ displayCount = 3 }: PracticeExamFeatureProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
  const visibleUpcomingExams = upcomingExams.slice(0, displayCount);
  const visibleCompletedExams = completedExams.slice(0, displayCount);
  
  const handleExamClick = (exam: Exam) => {
    // Open exam in a new tab
    window.open(exam.urlPath, '_blank', 'noopener,noreferrer');
    
    // Show reminder toast on the dashboard
    toast({
      title: "Exam opened in new tab",
      description: "Return to this tab after completing your exam.",
      duration: 5000,
    });
  };
  
  const handleReviewExam = (exam: Exam) => {
    // Open exam review in a new tab
    window.open(`${exam.urlPath}/review`, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Exam review opened",
      description: "You can analyze your performance in the new tab.",
      duration: 5000,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-800">
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
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as "upcoming" | "completed")}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="completed">Completed Exams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3">
            {visibleUpcomingExams.map((exam) => (
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
                  <span className="text-xs flex items-center text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    Duration: {exam.duration}
                  </span>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="h-7 text-xs bg-gradient-to-r from-sakha-blue to-sakha-purple" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExamClick(exam);
                    }}
                  >
                    Start Exam <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3">
            {visibleCompletedExams.map((exam) => (
              <motion.div
                key={exam.id}
                className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                      {exam.title}
                      <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-green-500" />
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • Completed on {new Date(exam.date || '').toLocaleDateString()}</p>
                  </div>
                  <div className={`font-bold text-lg ${getScoreColor(exam.score || 0)}`}>
                    {exam.score}%
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs flex items-center text-gray-400">
                    <FileCheck className="h-3 w-3 mr-1" />
                    {exam.questions} questions • {exam.duration}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 text-xs" 
                    onClick={() => handleReviewExam(exam)}
                  >
                    Review Exam <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
