
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AICoachCard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
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
            <Bot className="h-5 w-5 text-purple-600" />
          </motion.div>
          AI Coach Sakha
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-sm">24/7 Personal Tutor</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Get instant help with any concept
              </p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Available now</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Personalized explanations</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Step-by-step solutions</span>
            </div>
          </div>
          
          <Link to="/dashboard/student/tutor" className="w-full">
            <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <MessageSquare className="h-3 w-3 mr-2" />
              Start Learning Session
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Quick Actions
          </p>
          <div className="flex gap-2">
            <Link to="/dashboard/student/tutor" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Ask Question
              </Button>
            </Link>
            <Link to="/dashboard/student/tutor" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Bot className="h-3 w-3 mr-1" />
                Get Help
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICoachCard;
