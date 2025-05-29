
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, BookOpen, TrendingUp, AlertTriangle, Sparkles, X, RotateCcw, Zap, ArrowRight, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

interface TodaysTopPrioritySectionProps {
  onClose?: () => void;
}

const TodaysTopPrioritySection: React.FC<TodaysTopPrioritySectionProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const priorityTopics = [
    {
      subject: "Chemistry",
      topic: "Chemical Bonding & Molecular Structure",
      progress: 45,
      timeRequired: "2 hours",
      difficulty: "High",
      urgency: "Critical",
      daysLeft: 5,
      accuracy: 62
    },
    {
      subject: "Physics", 
      topic: "Thermodynamics Laws",
      progress: 38,
      timeRequired: "1.5 hours",
      difficulty: "High", 
      urgency: "High",
      daysLeft: 7,
      accuracy: 58
    },
    {
      subject: "Biology",
      topic: "Ecology & Environment", 
      progress: 42,
      timeRequired: "1 hour",
      difficulty: "Medium",
      urgency: "High", 
      daysLeft: 6,
      accuracy: 65
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      data-tour="top-priority"
    >
      <Card className="relative shadow-xl border-2 bg-gradient-to-br from-red-50/90 via-white to-orange-100/70 dark:from-red-950/40 dark:via-gray-900 dark:to-orange-900/30 border-red-200/60 dark:border-red-800/40 overflow-hidden">
        {/* Urgent animated background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <CardHeader className="pb-3 relative z-10 border-b border-red-100/50 dark:border-red-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Target className="h-6 w-6 text-red-600" />
              </motion.div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                  <motion.span
                    animate={{ 
                      color: ["#dc2626", "#ea580c", "#dc2626"]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="font-bold"
                  >
                    Today's Top Priority
                  </motion.span>
                  <motion.div
                    animate={{ 
                      x: [0, 5, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold animate-pulse">
                      URGENT
                    </Badge>
                  </motion.div>
                </CardTitle>
                <motion.p 
                  className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2"
                  animate={{ 
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity
                  }}
                >
                  <Bell className="h-4 w-4" />
                  <span className="font-medium">Take Action Now!</span>
                  <motion.div
                    animate={{ 
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="h-4 w-4 text-red-600" />
                  </motion.div>
                </motion.p>
              </div>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10 p-4">
          {priorityTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="border-2 rounded-lg p-4 bg-white/95 dark:bg-gray-800/95 shadow-md border-red-100/60 dark:border-red-800/40"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-red-900 dark:text-red-100">
                    {topic.subject}: {topic.topic}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getUrgencyColor(topic.urgency)}>
                      {topic.urgency}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300">
                      Accuracy: {topic.accuracy}%
                    </Badge>
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    borderColor: ["#dc2626", "#ea580c", "#dc2626"],
                    boxShadow: ["0 0 5px rgba(220, 38, 38, 0.3)", "0 0 15px rgba(234, 88, 12, 0.5)", "0 0 5px rgba(220, 38, 38, 0.3)"]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity
                  }}
                  className="text-right border-2 rounded-lg p-2 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/50 dark:to-orange-950/50"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
                  <p className="font-bold text-red-900 dark:text-red-100 text-lg">{topic.daysLeft}</p>
                </motion.div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-gray-700 dark:text-gray-300">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Link to={`/dashboard/student/concepts/${topic.subject.toLowerCase()}`} className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Study Concept
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full hover:bg-green-50 border-green-200 hover:border-green-300"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Practice Recall
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            className="text-center mt-4"
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
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold shadow-lg"
              onClick={() => navigate('/dashboard/student/concepts')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Start Improving Now!
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
