
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, BookOpen, Zap, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const TodaysTopPrioritySection: React.FC = () => {
  const priorities = [
    {
      subject: "Chemistry",
      topic: "Organic Chemistry - Carbonyl Compounds",
      urgency: "High",
      timeLeft: "2 days",
      progress: 15,
      action: "Study Now"
    },
    {
      subject: "Physics", 
      topic: "Thermodynamics - Heat Engines",
      urgency: "Medium",
      timeLeft: "4 days",
      progress: 35,
      action: "Practice"
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
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Animated Highlight */}
      <AnimatedHighlight 
        message="URGENT - Take Action!" 
        position="top-center"
        arrowDirection="down"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#dc2626", "#ea580c", "#dc2626"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Today's Top Priority
              </motion.span>
            </div>
            <Link to="/dashboard/student/today">
              <Button size="sm" variant="outline" className="hover:bg-red-50">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorities.map((priority, index) => (
            <motion.div
              key={index}
              className="border-2 rounded-lg p-4 bg-red-50/50 dark:bg-red-900/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                    {priority.subject}: {priority.topic}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Time left: {priority.timeLeft}
                  </p>
                </div>
                <Badge className={getUrgencyColor(priority.urgency)}>
                  {priority.urgency}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{priority.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${priority.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
                
                <Link to={`/dashboard/student/concepts/${priority.subject.toLowerCase()}`}>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    {priority.action}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
