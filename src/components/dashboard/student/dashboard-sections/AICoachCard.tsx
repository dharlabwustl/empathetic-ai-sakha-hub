
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Lightbulb, TrendingUp, Zap, Brain, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AICoachCard: React.FC = () => {
  const coachInsights = [
    {
      type: "Study Tip",
      message: "Try the Feynman Technique for Chemistry concepts",
      priority: "High",
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      type: "Performance",
      message: "Your Physics accuracy improved by 12% this week",
      priority: "Medium",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      type: "Motivation", 
      message: "You're 78% ready for NEET - keep pushing!",
      priority: "High",
      icon: <Zap className="h-4 w-4" />
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bot className="h-5 w-5 text-indigo-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#4f46e5", "#7c3aed", "#4f46e5"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              AI Coach Insights
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Coach Insights */}
          {coachInsights.map((insight, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {insight.icon}
                  <span className="text-sm font-medium text-indigo-700">{insight.type}</span>
                </div>
                <Badge className={getPriorityColor(insight.priority)} size="sm">
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{insight.message}</p>
            </motion.div>
          ))}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link to="/dashboard/student/tutor">
              <Button 
                size="sm" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Chat with AI Coach
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/dashboard/student/tutor">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-indigo-50"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  Get Study Tips
                </Button>
              </Link>
              <Link to="/dashboard/student/tutor">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full hover:bg-purple-50"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Ask Question
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AICoachCard;
