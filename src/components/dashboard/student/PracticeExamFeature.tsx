
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Clock, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
  dateTaken?: string;
  dateCompleted?: string;
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
    id: 'exam4',
    title: 'Biology Quick Assessment',
    subject: 'Biology',
    duration: '1 hour',
    questions: 30,
    difficulty: 'Easy',
    urlPath: '/exams/bio-assess-1',
    completed: true,
    score: 85,
    dateTaken: '2023-04-12',
    dateCompleted: '2023-04-12'
  },
  {
    id: 'exam5',
    title: 'Physics Mechanics Test',
    subject: 'Physics',
    duration: '2 hours',
    questions: 45,
    difficulty: 'Medium',
    urlPath: '/exams/physics-mech-1',
    completed: true,
    score: 72,
    dateTaken: '2023-04-05',
    dateCompleted: '2023-04-05'
  }
];

interface PracticeExamFeatureProps {
  displayCount?: number;
}

export default function PracticeExamFeature({ displayCount = 3 }: PracticeExamFeatureProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const visibleUpcomingExams = upcomingExams.slice(0, displayCount);
  const visibleCompletedExams = completedExams.slice(0, displayCount);
  
  const handleExamClick = (exam: Exam) => {
    // Open exam in a new tab with the correct URL
    const examUrl = exam.urlPath.startsWith('http') 
      ? exam.urlPath 
      : window.location.origin + exam.urlPath;
    
    window.open(examUrl, '_blank', 'noopener,noreferrer');
    
    // Show reminder toast on the dashboard
    toast({
      title: "Exam opened in new tab",
      description: "Return to this tab after completing your exam.",
      duration: 5000,
    });
  };
  
  const handleReviewExam = (exam: Exam, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    const reviewUrl = `${exam.urlPath}/review`;
    window.open(reviewUrl, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "Exam Review Mode",
      description: "Review your answers and see explanations for each question.",
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
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'completed')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3 mt-0">
            {visibleUpcomingExams.length > 0 ? (
              visibleUpcomingExams.map((exam) => (
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
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Duration: {exam.duration}
                    </span>
                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700" onClick={(e) => {
                      e.stopPropagation();
                      handleExamClick(exam);
                    }}>
                      Start Exam <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No upcoming exams available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3 mt-0">
            {visibleCompletedExams.length > 0 ? (
              visibleCompletedExams.map((exam) => (
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
                        <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-green-500" />
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • Score: {exam.score}%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed: {exam.dateCompleted}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 text-xs border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800"
                      onClick={(e) => handleReviewExam(exam, e)}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Review Exam
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No completed exams yet
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
