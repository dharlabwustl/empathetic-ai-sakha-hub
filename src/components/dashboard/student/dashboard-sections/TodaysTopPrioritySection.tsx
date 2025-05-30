
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, CheckCircle, Book, Calculator, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HighlightArrow from './HighlightArrow';

const TodaysTopPrioritySection: React.FC = () => {
  const priorities = [
    {
      id: 1,
      title: "Physics - Mechanics Revision",
      description: "Complete pendulum and oscillation concepts",
      timeRequired: "45 min",
      difficulty: "High",
      type: "Revision",
      urgencyLevel: "Critical",
      dueTime: "Before 2 PM",
      route: "/dashboard/student/concepts/physics"
    },
    {
      id: 2,
      title: "Chemistry Practice Test",
      description: "Organic chemistry mock questions",
      timeRequired: "30 min",
      difficulty: "Medium",
      type: "Practice",
      urgencyLevel: "High",
      dueTime: "Before 4 PM",
      route: "/dashboard/student/practice-exam/1/start"
    },
    {
      id: 3,
      title: "Biology Formula Review",
      description: "Photosynthesis equations and cycles",
      timeRequired: "20 min",
      difficulty: "Low",
      type: "Formula",
      urgencyLevel: "Medium",
      dueTime: "Evening",
      route: "/dashboard/student/concepts/biology"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Medium': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Revision': return <Book className="h-4 w-4" />;
      case 'Practice': return <Calculator className="h-4 w-4" />;
      case 'Formula': return <Zap className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Urgent - Take Action!"
        position="top"
        variant="urgent"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
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
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#ea580c", "#dc2626", "#ea580c"]
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
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {priorities.map((priority, index) => (
            <motion.div
              key={priority.id}
              className="border rounded-lg p-3 bg-gradient-to-r from-orange-50/50 to-red-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(priority.type)}
                    <h4 className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      {priority.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {priority.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{priority.timeRequired}</span>
                    <span>•</span>
                    <span>{priority.dueTime}</span>
                    {getDifficultyIcon(priority.difficulty)}
                  </div>
                </div>
                <Badge className={getUrgencyColor(priority.urgencyLevel)}>
                  {priority.urgencyLevel}
                </Badge>
              </div>
              
              <div className="flex justify-end">
                <Link to={priority.route}>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Start Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/academic">
              <Button 
                size="sm" 
                variant="outline"
                className="hover:bg-orange-50"
              >
                View All Tasks
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
