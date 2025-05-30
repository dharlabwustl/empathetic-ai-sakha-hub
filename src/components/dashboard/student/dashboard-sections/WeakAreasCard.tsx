
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, BookOpen, Brain, Target, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HighlightArrow from './HighlightArrow';

const WeakAreasCard: React.FC = () => {
  const weakAreas = [
    {
      subject: "Chemistry",
      topic: "Organic Chemistry",
      score: 45,
      priority: "High",
      timeToImprove: "2 weeks",
      route: "/dashboard/student/concepts/chemistry"
    },
    {
      subject: "Physics",
      topic: "Electromagnetic Waves",
      score: 52,
      priority: "Medium",
      timeToImprove: "1.5 weeks",
      route: "/dashboard/student/concepts/physics"
    },
    {
      subject: "Biology",
      topic: "Genetics & Evolution",
      score: 58,
      priority: "Medium",
      timeToImprove: "1 week",
      route: "/dashboard/student/concepts/biology"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 50) return 'text-red-600';
    if (score < 70) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Focus on these areas for improvement!"
        position="top"
        variant="urgent"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 pb-3">
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
              Weak Areas to Focus
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weakAreas.map((area, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-red-50/50 to-orange-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-red-500" />
                    <h4 className="text-sm font-medium text-red-900 dark:text-red-100">
                      {area.subject} - {area.topic}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <TrendingDown className="h-3 w-3" />
                    <span className={`font-medium ${getScoreColor(area.score)}`}>
                      {area.score}% accuracy
                    </span>
                    <span>•</span>
                    <span>Est. {area.timeToImprove}</span>
                  </div>
                </div>
                <Badge className={getPriorityColor(area.priority)}>
                  {area.priority}
                </Badge>
              </div>
              
              <div className="flex justify-end">
                <Link to={area.route}>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    <Brain className="h-3 w-3 mr-1" />
                    Study Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/analytics">
              <Button 
                size="sm" 
                variant="outline"
                className="hover:bg-red-50"
              >
                <Target className="h-4 w-4 mr-2" />
                Detailed Analysis
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeakAreasCard;
