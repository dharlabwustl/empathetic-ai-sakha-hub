
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, TrendingUp, Target, BookOpen, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AICoachArrow from './AICoachArrow';

const AICoachCard: React.FC = () => {
  const [showNewUserArrow, setShowNewUserArrow] = useState(false);

  useEffect(() => {
    // Check if user just completed onboarding
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const hasSeenAICoachPrompt = localStorage.getItem('hasSeenAICoachPrompt') === 'true';
    
    if (isNewUser && !hasSeenAICoachPrompt) {
      setShowNewUserArrow(true);
    }
  }, []);

  const handleCloseArrow = () => {
    setShowNewUserArrow(false);
    localStorage.setItem('hasSeenAICoachPrompt', 'true');
  };

  const coachInsights = [
    {
      type: "Weakness Analysis",
      message: "Focus more on Organic Chemistry - your weakest area",
      priority: "High",
      action: "Study Now"
    },
    {
      type: "Study Pattern",
      message: "You perform better in morning sessions",
      priority: "Medium",
      action: "Optimize Schedule"
    },
    {
      type: "Exam Prep",
      message: "Take a practice test to identify knowledge gaps",
      priority: "High",
      action: "Take Test"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      {/* AI Coach Arrow for new users */}
      <AICoachArrow 
        isVisible={showNewUserArrow}
        onClose={handleCloseArrow}
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-5 w-5 text-purple-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#7c3aed", "#ec4899", "#7c3aed"]
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
        <CardContent className="space-y-3">
          {coachInsights.map((insight, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {insight.type}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {insight.message}
                  </p>
                </div>
                <Badge className={getPriorityColor(insight.priority)}>
                  {insight.priority}
                </Badge>
              </div>
              
              <div className="flex justify-end">
                {insight.type === "Exam Prep" ? (
                  <Link to="/dashboard/student/practice-exam/2/start">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Target className="h-3 w-3 mr-1" />
                      {insight.action}
                    </Button>
                  </Link>
                ) : (
                  <Link to="/dashboard/student/ai-tutor">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:bg-purple-50"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      {insight.action}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/ai-tutor">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with AI Coach
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AICoachCard;
