
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, ArrowRight, Clock, Star, FileText } from 'lucide-react';

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const [lastActivity, setLastActivity] = useState<any | null>(null);
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch this data from your API
    // Mocking data for demonstration
    setLastActivity({
      type: 'concept',
      title: 'Newton\'s Laws of Motion',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    });

    setPendingTasks([
      {
        id: '1',
        title: 'Complete Chemical Bonding',
        type: 'concept',
        subject: 'Chemistry',
        dueDate: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Organic Chemistry Flashcards',
        type: 'flashcard',
        subject: 'Chemistry',
        dueDate: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Physics Weekly Test',
        type: 'exam',
        subject: 'Physics',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    ]);

    // Auto-redirect to dashboard after 30 seconds
    const timer = setTimeout(() => {
      goToDashboard();
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      return "Just now";
    } else if (diffHrs === 1) {
      return "1 hour ago";
    } else if (diffHrs < 24) {
      return `${diffHrs} hours ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      if (diffDays === 1) {
        return "Yesterday";
      } else {
        return `${diffDays} days ago`;
      }
    }
  };

  const goToTask = (taskId: string, taskType: string) => {
    // Navigate to the appropriate section based on task type
    switch (taskType) {
      case 'concept':
        navigate(`/dashboard/student/concepts/card/${taskId}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${taskId}/interactive`);
        break;
      case 'exam':
        navigate(`/dashboard/student/practice-exam/${taskId}/start`);
        break;
      default:
        goToDashboard();
    }
  };

  const goToLastActivity = () => {
    if (lastActivity) {
      switch (lastActivity.type) {
        case 'concept':
          navigate(`/dashboard/student/concepts/card/${lastActivity.id}`);
          break;
        case 'flashcard':
          navigate(`/dashboard/student/flashcards/${lastActivity.id}/interactive`);
          break;
        case 'exam':
          navigate(`/dashboard/student/practice-exam/${lastActivity.id}/start`);
          break;
        default:
          goToDashboard();
      }
    } else {
      goToDashboard();
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard/student');
  };

  const goToTodayPlan = () => {
    navigate('/dashboard/student/today');
  };

  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'concept':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'flashcard':
        return <Star className="h-4 w-4 text-amber-500" />;
      case 'exam':
        return <FileText className="h-4 w-4 text-emerald-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl p-4"
      >
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground">Pick up where you left off</p>
              </div>

              {lastActivity && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-lg font-medium mb-3">Last Activity</h2>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 p-4 h-auto" 
                    onClick={goToLastActivity}
                  >
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      {getTaskIcon(lastActivity.type)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{lastActivity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(lastActivity.timestamp)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-lg font-medium mb-3">Pending Tasks</h2>
                <div className="space-y-2">
                  {pendingTasks.map(task => (
                    <Button
                      key={task.id}
                      variant="outline"
                      className="w-full justify-start gap-3 p-4 h-auto"
                      onClick={() => goToTask(task.id, task.type)}
                    >
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.subject} • Due: {formatDate(task.dueDate)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 mt-8"
              >
                <Button 
                  className="flex-1" 
                  onClick={goToTodayPlan}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Today's Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={goToDashboard}
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostLoginPrompt;
