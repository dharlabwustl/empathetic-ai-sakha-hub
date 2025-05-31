
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, ArrowRight, Flame, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const TodaysTopPrioritySection: React.FC = () => {
  const priorities = [
    {
      id: 1,
      title: "Complete Chemistry - Organic Chapter",
      subject: "Chemistry",
      dueTime: "3:00 PM",
      urgency: "High",
      progress: 65,
      estimatedTime: "45 mins"
    },
    {
      id: 2,
      title: "Solve Physics Practice Set 12",
      subject: "Physics", 
      dueTime: "4:30 PM",
      urgency: "Medium",
      progress: 0,
      estimatedTime: "60 mins"
    },
    {
      id: 3,
      title: "Biology Mock Test Review",
      subject: "Biology",
      dueTime: "6:00 PM", 
      urgency: "High",
      progress: 30,
      estimatedTime: "30 mins"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <AnimatedHighlight 
        message="URGENT - Take Action!"
        storageKey="priority-highlight-closed"
        className="animate-pulse"
      />
      
      <Card className="premium-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Target className="h-5 w-5" />
            </motion.div>
            Today's Top Priority
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorities.map((priority, index) => (
            <motion.div
              key={priority.id}
              className="border rounded-lg p-4 bg-gradient-to-r from-orange-50/50 to-red-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {priority.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Due: {priority.dueTime}</span>
                    <span>•</span>
                    <span>{priority.estimatedTime}</span>
                  </div>
                </div>
                <Badge className={getUrgencyColor(priority.urgency)}>
                  {priority.urgency === 'High' && <Flame className="h-3 w-3 mr-1" />}
                  {priority.urgency === 'Medium' && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {priority.urgency}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-gray-700 dark:text-gray-300">{priority.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${priority.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Link to="/dashboard/student/concepts/chemistry" className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Start Now
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:bg-orange-50"
                >
                  Later
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
