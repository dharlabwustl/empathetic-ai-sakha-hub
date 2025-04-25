
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

const TodayStudyPlan = () => {
  // Mock data for study tasks
  const studyTasks = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      duration: '45 min',
      completed: false,
    },
    {
      id: '2',
      title: 'Integration by Parts',
      subject: 'Mathematics',
      duration: '30 min',
      completed: true,
    },
    {
      id: '3',
      title: 'Organic Chemistry Revision',
      subject: 'Chemistry',
      duration: '60 min',
      completed: false,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5" />
          Today's Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studyTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className="mt-1">
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{task.subject}</span>
                  <span className="text-sm text-gray-500">{task.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button className="w-full sm:w-auto">View Complete Plan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStudyPlan;
