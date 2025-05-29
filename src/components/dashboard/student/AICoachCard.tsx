
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Lightbulb, Clock, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AICoachCard: React.FC = () => {
  const recentQuestions = [
    "How do I solve this chemical equation?",
    "Explain the process of photosynthesis",
    "Newton's laws application problems"
  ];

  return (
    <Card className="shadow-md border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <Brain className="h-5 w-5 text-blue-600" />
            </motion.div>
            AI Tutor
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
            24/7 Support
          </Badge>
        </div>
        <CardDescription>
          Your personal AI assistant for any subject
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Ask any question, anytime
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Get instant help with difficult concepts, problem-solving, and exam preparation
            </p>

            <Link to="/dashboard/student/tutor">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Chat with Tutor <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Recent Questions
            </h4>
            <div className="space-y-1">
              {recentQuestions.map((question, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                    {question}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link to="/dashboard/student/tutor" className="no-underline">
              <Button variant="outline" size="sm" className="w-full">
                View Conversation History
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICoachCard;
