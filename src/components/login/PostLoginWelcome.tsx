
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, CheckCircle, ClipboardCheck, Clock, BookMarked } from "lucide-react";
import { motion } from "framer-motion";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth/AuthContext";

interface PendingTask {
  id: string;
  title: string;
  path: string;
  iconType: "quiz" | "flashcard" | "concept" | "practice" | "other";
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

const PostLoginWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [userName, setUserName] = useState<string>(user?.name || 'Student');
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [lastLoginDate, setLastLoginDate] = useState<string>('recently');
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        
        // Set user name
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        
        // Get last activity
        if (parsedData.lastActivity) {
          setLastActivity(parsedData.lastActivity.description);
        }
        
        // Format last login date if available
        if (parsedData.lastLogin) {
          const lastLogin = new Date(parsedData.lastLogin);
          const now = new Date();
          const diffDays = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 0) {
            setLastLoginDate('today');
          } else if (diffDays === 1) {
            setLastLoginDate('yesterday');
          } else if (diffDays < 7) {
            setLastLoginDate(`${diffDays} days ago`);
          } else {
            setLastLoginDate(lastLogin.toLocaleDateString());
          }
        }
        
        // Generate pending tasks based on user profile
        // In a real app, these would come from the API based on the user's study plan
        const generatedTasks: PendingTask[] = [];
        
        // Add tasks based on subjects in study plan if available
        if (parsedData.studyPlan && parsedData.studyPlan.subjects) {
          parsedData.studyPlan.subjects.forEach((subject: any, index: number) => {
            if (!subject.completed && index < 3) {
              generatedTasks.push({
                id: `subject-${subject.id || index}`,
                title: `Complete ${subject.name} assessment`,
                path: '/dashboard/student/practice-exam',
                iconType: 'quiz',
                priority: 'high'
              });
            }
          });
        }
        
        // Add some default tasks if no specific ones were added
        if (generatedTasks.length === 0) {
          generatedTasks.push(
            {
              id: '1',
              title: 'Complete Physics Quiz on Mechanics',
              path: '/dashboard/student/practice-exam',
              iconType: 'quiz',
              priority: 'high',
              dueDate: 'Today'
            },
            {
              id: '2',
              title: 'Review Biology Flashcards',
              path: '/dashboard/student/flashcards',
              iconType: 'flashcard',
              priority: 'medium',
              dueDate: 'Tomorrow'
            },
            {
              id: '3',
              title: 'Study Chemistry Concepts',
              path: '/dashboard/student/concepts',
              iconType: 'concept',
              priority: 'medium'
            }
          );
        }
        
        setPendingTasks(generatedTasks);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // Auto-redirect after 15 seconds if no action taken
    const timer = setTimeout(() => {
      navigate('/dashboard/student/today');
      toast({
        title: "Welcome back!",
        description: "You've been automatically redirected to Today's Plan.",
      });
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast, user?.name]);

  const getIconForTask = (type: string) => {
    switch (type) {
      case 'quiz':
        return <ClipboardCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'flashcard':
        return <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'practice':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const goToTodaysPlan = () => {
    navigate("/dashboard/student/today");
    toast({
      title: "Today's Plan",
      description: "Let's focus on today's learning goals!"
    });
  };

  const goToDashboard = () => {
    navigate("/dashboard/student");
    toast({
      title: "Welcome Back",
      description: "Your dashboard is ready for today's learning activities."
    });
  };
  
  const navigateToTask = (task: PendingTask) => {
    navigate(task.path);
    toast({
      title: "Continuing Your Work",
      description: `Now viewing: ${task.title}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <PrepzrLogo width={120} height="auto" className="mx-auto" />
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back, {userName}!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {lastLoginDate === 'today' 
              ? "Returning for another study session today?" 
              : `You last logged in ${lastLoginDate}`}
          </p>
        </div>
        
        <Card className="shadow-lg border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Pick Up Where You Left Off</CardTitle>
            <CardDescription>
              {lastActivity 
                ? `You were working on ${lastActivity}`
                : "Choose where to continue your learning journey"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              variant="default" 
              className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
              onClick={goToTodaysPlan}
            >
              <Calendar className="h-5 w-5" />
              <span className="flex-1 text-left">Go to Today's Plan</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            {pendingTasks.length > 0 && (
              <>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 pt-2 pb-1">
                  Pending Activities:
                </div>
                
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {pendingTasks.map((task) => (
                    <Button 
                      key={task.id}
                      variant="outline" 
                      className={`w-full justify-start gap-3 border hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 ${
                        task.priority ? getPriorityClass(task.priority) : ''
                      }`}
                      onClick={() => navigateToTask(task)}
                    >
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {getIconForTask(task.iconType)}
                        {task.dueDate && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/80 dark:bg-gray-800/80">
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                      <span className="flex-1 text-left truncate">
                        {task.title}
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0" />
                    </Button>
                  ))}
                </div>
              </>
            )}
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 mt-4"
              onClick={goToDashboard}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="flex-1 text-left">Go to My Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center pt-2">
            <p className="text-sm text-muted-foreground">
              You'll be redirected to Today's Plan shortly...
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostLoginWelcome;
