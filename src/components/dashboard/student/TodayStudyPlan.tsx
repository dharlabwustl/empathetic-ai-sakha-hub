
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, CalendarDays, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const TodayStudyPlan = () => {
  const { toast } = useToast();
  
  // Mock data for study tasks
  const studyTasks = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      type: 'concept',
      duration: '45 min',
      completed: false,
      conceptId: '1'
    },
    {
      id: '2',
      title: 'Integration by Parts',
      subject: 'Mathematics',
      type: 'flashcard',
      duration: '30 min',
      completed: true,
    },
    {
      id: '3',
      title: 'Organic Chemistry Revision',
      subject: 'Chemistry',
      type: 'practice-exam',
      duration: '60 min',
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(studyTasks);

  const handleMarkComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    toast({
      title: "Task updated",
      description: "Your study plan has been updated",
    });
  };

  const totalMinutes = tasks.reduce((sum, task) => sum + parseInt(task.duration), 0);
  const completedMinutes = tasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + parseInt(task.duration), 0);

  const completionPercentage = Math.round((completedMinutes / totalMinutes) * 100);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-blue-500" />
            Today's Study Plan
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
            {completionPercentage}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-3 p-3 rounded-lg ${task.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800/50'}`}
            >
              <button 
                onClick={() => handleMarkComplete(task.id)}
                className="mt-1 focus:outline-none"
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  {task.type === 'concept' && task.conceptId ? (
                    <Link to={`/dashboard/student/concepts/${task.conceptId}`} className="font-medium hover:text-blue-600 transition-colors">
                      {task.title}
                    </Link>
                  ) : (
                    <p className="font-medium">{task.title}</p>
                  )}
                  
                  {task.type === 'concept' && task.conceptId && (
                    <Link to={`/dashboard/student/concepts/${task.conceptId}`}>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</span>
                  <span className="text-xs flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Link to="/dashboard/student/today">
            <Button className="w-full sm:w-auto">View Complete Plan</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStudyPlan;
