
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
    <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/30 border-purple-200 dark:border-purple-700">
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
            <Target className="h-5 w-5 text-purple-600" />
          </motion.div>
          <motion.span
            animate={{ 
              color: ["#7c3aed", "#8b5cf6", "#7c3aed"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent font-bold"
          >
            NEET Strategy Card
          </motion.span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button 
              variant="outline" 
              className="w-full justify-start bg-white/50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/30"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Adaptive Plan
            </Button>
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Badge className="w-full justify-center bg-gradient-to-r from-purple-500 to-violet-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              Personalized Strategy
            </Badge>
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Current Focus
            </h4>
            <motion.p 
              className="text-xs text-gray-600 dark:text-gray-400 bg-white/70 dark:bg-gray-800/70 p-2 rounded-lg"
              animate={{ 
                borderColor: ["#7c3aed", "#8b5cf6", "#7c3aed"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity
              }}
            >
              {strategy}
            </motion.p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              Subject Status
            </h4>
            {subjects.map((subject, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between text-xs bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-medium">{subject.name}</span>
                {getSubjectBadge(subject)}
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              Key Objectives
            </h4>
            {objectives.map((objective, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 text-xs bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pt-2"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Study Plan
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
