
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedHighlight from './dashboard-sections/AnimatedHighlight';

const NEETStrategyCard: React.FC = () => {
  const navigate = useNavigate();
  const [showSubjects, setShowSubjects] = useState(true);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <AnimatedHighlight
        text="Your dynamic plan based on your profile - it will keep changing based on your learning performance"
        storageKey="has_seen_strategy_highlight"
      >
        <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubjects(!showSubjects)}
                className="h-6 w-6 p-0"
              >
                {showSubjects ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-4">
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/dashboard/student/study-plan">
                  <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-blue-200 hover:border-purple-300 transition-all">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Adaptive Plan
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                animate={{ 
                  backgroundColor: ["rgb(239 246 255)", "rgb(245 243 255)", "rgb(239 246 255)"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Badge className="w-full justify-center bg-blue-100 text-blue-800 py-2">
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
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-4 w-4 text-purple-600" />
                  </motion.div>
                  Current Focus
                </h4>
                <motion.p 
                  className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                  animate={{ 
                    borderColor: ["rgb(147 51 234)", "rgb(59 130 246)", "rgb(147 51 234)"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                  style={{ border: "2px solid" }}
                >
                  {strategy}
                </motion.p>
              </div>
              
              {/* Subject Status with hide option */}
              {showSubjects && (
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-sm font-medium">Subject Status</h4>
                  {subjects.map((subject, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: subject.status === "weak" ? "rgb(254 242 242)" : "rgb(240 253 244)" }}
                    >
                      <span className="font-medium">{subject.name}</span>
                      {getSubjectBadge(subject)}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium mb-2">Key Objectives</h4>
                {objectives.map((objective, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-2 text-xs p-2 rounded-lg bg-green-50 dark:bg-green-900/20"
                    initial={{ opacity: 0, scale: 0.8 }}
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
                        ease: "linear",
                        delay: index * 0.2
                      }}
                    >
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </motion.div>
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link to="/dashboard/student/study-plan">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      View Plan
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/dashboard/student/academic-advisor">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full hover:bg-purple-50 border-purple-300"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Optimize
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedHighlight>
    </motion.div>
  );
};

export default NEETStrategyCard;
