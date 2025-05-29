
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

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
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
            <Target className="h-5 w-5 text-blue-600" />
          </motion.div>
          NEET Strategy Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Link to="/dashboard/student/study-plan">
            <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
              <BookOpen className="h-4 w-4 mr-2" />
              Adaptive Plan
            </Button>
          </Link>
          
          <motion.div
            animate={{ 
              backgroundColor: ["#dbeafe", "#e0e7ff", "#dbeafe"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full justify-center bg-blue-100 text-blue-800 p-2 rounded-md text-center"
          >
            <motion.span
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-medium"
            >
              Personalized Strategy
            </motion.span>
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="h-4 w-4 text-purple-600" />
              </motion.div>
              Current Focus
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{strategy}</p>
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
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </motion.div>
            ))}
          </div>
          
          <Link to="/dashboard/student/study-plan" className="w-full block mt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Target className="h-3 w-3 mr-2" />
                View Complete Strategy
              </Button>
            </motion.div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
