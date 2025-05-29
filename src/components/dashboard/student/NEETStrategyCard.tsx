
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NEETStrategyCard: React.FC = () => {
  const navigate = useNavigate();
  const urgencyLevel = "MODERATE";
  const strategy = "Foundation Building + Practice";
  
  const subjects = [
    { name: "Physics", progress: 75, status: "strong", color: "blue" },
    { name: "Chemistry", progress: 45, status: "weak", color: "red" },
    { name: "Biology", progress: 55, status: "weak", color: "orange" }
  ];

  const objectives = [
    "Complete syllabus",
    "Concept clarity", 
    "Regular practice"
  ];

  const getSubjectBadge = (subject: any) => {
    if (subject.status === "weak") {
      return (
        <div className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3 text-orange-600" />
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
            Needs Focus
          </Badge>
        </div>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
        Strong
      </Badge>
    );
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Target className="h-5 w-5 text-blue-600" />
          </motion.div>
          <motion.span
            animate={{ 
              color: ["#2563eb", "#7c3aed", "#2563eb"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-bold"
          >
            NEET Strategy Card
          </motion.span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100"
            onClick={() => navigate('/dashboard/student/study-plan')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Adaptive Plan
          </Button>
          
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(59, 130, 246, 0)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Badge className="w-full justify-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
              <motion.span
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-semibold"
              >
                🔥 HIGH PRIORITY - Personalized Strategy
              </motion.span>
            </Badge>
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Focus</h4>
            <motion.p 
              className="text-xs text-gray-600 dark:text-gray-400"
              animate={{ 
                color: ["#6b7280", "#3b82f6", "#6b7280"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {strategy}
            </motion.p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Subject Status</h4>
            {subjects.map((subject, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between text-xs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <span>{subject.name}</span>
                {getSubjectBadge(subject)}
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-1">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 text-xs"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold mt-3"
              onClick={() => navigate('/dashboard/student/study-plan')}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
              </motion.div>
              View Complete Strategy
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
