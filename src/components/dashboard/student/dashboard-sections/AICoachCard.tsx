
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Lightbulb, TrendingUp, Zap, ArrowRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const AICoachCard: React.FC = () => {
  const recommendations = [
    {
      type: "Exam Prep",
      message: "Take exam prep to find knowledge gaps - Start here!",
      action: "Take Exam",
      priority: "high",
      link: "/dashboard/student/practice-exam/2/start",
      highlighted: true
    },
    {
      type: "Study Strategy",
      message: "Focus on Chemistry - you've shown 23% improvement this week!",
      action: "Continue Plan",
      priority: "high",
      link: "/dashboard/student/today"
    },
    {
      type: "Time Management", 
      message: "Consider shorter study sessions (25 min) for better retention",
      action: "Adjust Schedule",
      priority: "medium",
      link: "/dashboard/student/academic-advisor"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Animated Highlight */}
      <AnimatedHighlight
        id="ai-coach"
        text="Take exam prep to find knowledge gaps - Start here!"
        position="top"
        icon={<Target className="h-4 w-4" />}
        className="mb-2"
      />

      <Card className="shadow-lg border-2 border-gradient-to-r from-purple-200 to-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            AI Coach Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className={`border rounded-lg p-4 ${
                rec.highlighted 
                  ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
                  : 'bg-gradient-to-r from-purple-50 to-blue-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-sm text-purple-900">{rec.type}</span>
                </div>
                <Badge className={getPriorityColor(rec.priority)}>
                  {rec.priority}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{rec.message}</p>
              
              <Link to={rec.link}>
                <Button 
                  size="sm" 
                  className={`w-full ${
                    rec.highlighted 
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  } text-white`}
                >
                  {rec.highlighted && <Target className="h-3 w-3 mr-2" />}
                  <TrendingUp className="h-3 w-3 mr-2" />
                  {rec.action}
                  <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ))}

          <motion.div
            className="text-center pt-2"
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Link to="/dashboard/student/tutor">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <Zap className="h-4 w-4 mr-2" />
                Chat with AI Coach
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AICoachCard;
