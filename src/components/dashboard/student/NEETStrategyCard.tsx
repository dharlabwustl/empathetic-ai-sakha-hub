
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
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
    <Card className="bg-gradient-to-br from-purple-50/80 via-white to-blue-100/60 dark:from-purple-950/30 dark:via-gray-900 dark:to-blue-900/20 border border-purple-200/50 dark:border-purple-800/30 shadow-lg">
      <CardHeader className="border-b border-purple-100/50 dark:border-purple-800/30">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          <motion.span
            animate={{ 
              color: ["#7c3aed", "#2563eb", "#7c3aed"]
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
          <motion.div
            animate={{ 
              x: [0, 5, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold animate-pulse">
              PRIORITY
            </Badge>
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <motion.div
            className="bg-gradient-to-r from-purple-100/80 to-blue-100/60 dark:from-purple-900/30 dark:to-blue-900/20 p-3 rounded-lg border border-purple-200/50 dark:border-purple-800/30"
            animate={{ 
              boxShadow: ["0 0 10px rgba(139, 92, 246, 0.3)", "0 0 20px rgba(139, 92, 246, 0.5)", "0 0 10px rgba(139, 92, 246, 0.3)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Link to="/dashboard/student/study-plan">
              <Button variant="outline" className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors border-purple-200 dark:border-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                <motion.span
                  animate={{ 
                    color: ["#1d4ed8", "#7c2d12", "#1d4ed8"]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Adaptive Plan
                </motion.span>
                <motion.div
                  animate={{ 
                    x: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="ml-auto"
                >
                  <ArrowRight className="h-4 w-4 text-purple-600" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            animate={{ 
              backgroundColor: ["#e0e7ff", "#ddd6fe", "#e0e7ff"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-3 rounded-lg"
          >
            <Badge className="w-full justify-center text-purple-800 dark:text-purple-200 bg-purple-100/80 dark:bg-purple-900/30">
              <motion.span
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Personalized Strategy
              </motion.span>
            </Badge>
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Focus</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{strategy}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Subject Status</h4>
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span>{subject.name}</span>
                {getSubjectBadge(subject)}
              </div>
            ))}
          </div>
          
          <div className="space-y-1">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-purple-100/50 dark:border-purple-800/30">
            <Link to="/dashboard/student/study-plan">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold shadow-lg"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                  </motion.div>
                  <motion.span
                    animate={{ 
                      color: ["#ffffff", "#fef3c7", "#ffffff"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    View Study Plan
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
