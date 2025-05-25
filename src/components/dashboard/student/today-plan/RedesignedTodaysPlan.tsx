
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Brain, 
  FileText,
  Target,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';

const RedesignedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");

  if (loading) {
    return (
      <SharedPageLayout title="Today's Study Plan" showBackButton={true}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (error || !planData) {
    return (
      <SharedPageLayout title="Today's Study Plan" showBackButton={true}>
        <div className="text-center py-8">
          <p className="text-red-500">{error || "Failed to load plan"}</p>
          <Button onClick={refreshData} className="mt-4">Try Again</Button>
        </div>
      </SharedPageLayout>
    );
  }

  const completionPercentage = planData.totalTasks > 0 
    ? Math.round((planData.completedTasks / planData.totalTasks) * 100) 
    : 0;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice-exam': return <FileText className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const handleTaskClick = (taskId: string, type: string) => {
    if (type === 'concept') {
      navigate(`/dashboard/student/concepts/${taskId}`);
    } else if (type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (type === 'practice-exam') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const allTasks = [
    ...planData.concepts.map(c => ({ ...c, type: 'concept' })),
    ...planData.flashcards.map(f => ({ ...f, type: 'flashcard' })),
    ...planData.practiceExams.map(p => ({ ...p, type: 'practice-exam' }))
  ];

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle={`${new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Daily Progress</h2>
                  <p className="text-purple-100">
                    {planData.completedTasks} of {planData.totalTasks} tasks completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{completionPercentage}%</div>
                  <div className="text-sm text-purple-100">Complete</div>
                </div>
              </div>
              <Progress 
                value={completionPercentage} 
                className="h-3 bg-purple-400/30"
              />
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Day {planData.streak || 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{planData.timeAllocation.total} min</span>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={refreshData}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {allTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${
                  task.status === 'completed' 
                    ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10' 
                    : activeTaskId === task.id
                    ? 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/10'
                    : 'border-l-gray-300 hover:border-l-purple-400'
                }`}
                onClick={() => handleTaskClick(task.id, task.type)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-full ${
                        task.status === 'completed' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                          : task.type === 'concept' 
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                          : task.type === 'flashcard'
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                          : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          getTaskIcon(task.type)
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {task.subject}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{task.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.difficulty && (
                        <Badge 
                          variant={
                            task.difficulty === 'Easy' ? 'outline' :
                            task.difficulty === 'Medium' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {task.difficulty}
                        </Badge>
                      )}
                      <Badge 
                        variant={task.status === 'completed' ? 'default' : 'outline'}
                        className={task.status === 'completed' ? 'bg-green-500' : ''}
                      >
                        {task.status === 'completed' ? 'Done' : 'Pending'}
                      </Badge>
                      {activeTaskId === task.id ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTaskId(null);
                          }}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTaskId(task.id);
                          }}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Voice Assistant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <TodaysPlanVoiceAssistant 
            planData={planData}
            userName={planData?.userName}
            isEnabled={true}
          />
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default RedesignedTodaysPlan;
