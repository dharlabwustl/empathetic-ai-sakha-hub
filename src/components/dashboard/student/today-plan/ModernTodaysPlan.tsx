
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Star, 
  Flag,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  Brain,
  FileText,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface ModernTodaysPlanProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const ModernTodaysPlan: React.FC<ModernTodaysPlanProps> = ({ 
  planData, 
  onConceptClick,
  isMobile = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!planData) return null;

  const completionPercentage = planData.totalTasks > 0 
    ? Math.round((planData.completedTasks / planData.totalTasks) * 100) 
    : 0;

  const statsCards = [
    {
      title: "Tasks Completed",
      value: `${planData.completedTasks}/${planData.totalTasks}`,
      percentage: completionPercentage,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "green"
    },
    {
      title: "Study Streak",
      value: `${planData.streak} days`,
      icon: <Zap className="h-5 w-5" />,
      color: "orange"
    },
    {
      title: "Total Time",
      value: `${planData.timeAllocation.total} min`,
      icon: <Clock className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Focus Score",
      value: "85%",
      icon: <Target className="h-5 w-5" />,
      color: "purple"
    }
  ];

  const renderTaskCard = (task: any, type: string, icon: React.ReactNode, colorClass: string) => {
    const isCompleted = task.status === 'completed';
    
    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-l-4 ${colorClass} bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden`}
        onClick={() => type === 'concept' && onConceptClick(task.id)}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${
                isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : icon}
              </div>
              <Badge variant={isCompleted ? "outline" : "default"} className={
                isCompleted ? "bg-green-50 text-green-700 border-green-200" : ""
              }>
                {isCompleted ? "Completed" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{task.duration} min</span>
            </div>
          </div>
          
          <h3 className={`font-medium text-sm mb-2 ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
          }`}>
            {task.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{task.subject}</span>
            {!isCompleted && (
              <Button size="sm" variant="ghost" className="h-6 text-xs px-2 hover:bg-blue-50">
                <PlayCircle className="h-3 w-3 mr-1" />
                Start
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Today's Study Plan</h1>
            <p className="text-blue-100">Stay focused and make progress every day</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <div className="text-sm text-blue-100">Daily Progress</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs font-medium">{stat.title}</span>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
              {stat.percentage && (
                <Progress value={stat.percentage} className="h-1 mt-2 bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Concepts
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Time Allocation Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Concepts</span>
                    <span>{planData.timeAllocation.concepts} min</span>
                  </div>
                  <Progress value={60} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Flashcards</span>
                    <span>{planData.timeAllocation.flashcards} min</span>
                  </div>
                  <Progress value={30} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Practice</span>
                    <span>{planData.timeAllocation.practiceExams} min</span>
                  </div>
                  <Progress value={45} className="h-1" />
                </div>
              </CardContent>
            </Card>

            {/* Subject Breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Subject Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Physics', 'Chemistry', 'Biology'].map((subject, index) => (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-xs font-medium">{subject}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={[75, 60, 85][index]} className="h-1 w-16" />
                      <span className="text-xs text-gray-500">{[75, 60, 85][index]}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tomorrow Preview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Tomorrow's Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {planData.tomorrowPreview && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Total Tasks</span>
                      <span className="font-medium">{planData.tomorrowPreview.totalTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Area</span>
                      <span className="font-medium">{planData.tomorrowPreview.focusArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty</span>
                      <Badge variant="outline" className="text-xs">
                        {planData.tomorrowPreview.difficulty}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Concepts Tab */}
        <TabsContent value="concepts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.concepts?.map(concept => 
              renderTaskCard(concept, 'concept', <BookOpen className="h-4 w-4" />, 'border-l-blue-500')
            )}
          </div>
        </TabsContent>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.flashcards?.map(flashcard => 
              renderTaskCard(flashcard, 'flashcard', <Brain className="h-4 w-4" />, 'border-l-purple-500')
            )}
          </div>
        </TabsContent>

        {/* Practice Tab */}
        <TabsContent value="practice">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planData.practiceExams?.map(exam => 
              renderTaskCard(exam, 'practice', <FileText className="h-4 w-4" />, 'border-l-orange-500')
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernTodaysPlan;
