
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, BookOpen, TrendingUp, AlertTriangle, Sparkles, X, RotateCcw, Zap, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

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
      <AnimatedHighlight
        text="Urgent - Take Action!"
        storageKey="has_seen_priority_highlight"
        isUrgent={true}
      >
        <Card className="premium-card relative shadow-lg border-2 border-gradient-to-r from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 overflow-hidden">
          {/* Animated background pulse */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
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
                  <Target className="h-5 w-5 text-red-600" />
                </motion.div>
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
              </CardTitle>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {priorityTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="border-2 rounded-lg p-4 bg-white/90 dark:bg-gray-800/90"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: topic.urgency === 'Critical' ? '0 0 20px rgba(239, 68, 68, 0.3)' : '0 0 15px rgba(249, 115, 22, 0.2)'
                }}
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
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity
                    }}
                    className="text-right border-2 rounded-lg p-2"
                  >
                    <p className="text-xs text-gray-600 dark:text-gray-400">Days Left</p>
                    <p className="font-bold text-red-900 dark:text-red-100">{topic.daysLeft}</p>
                  </motion.div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-gray-700 dark:text-gray-300">{topic.progress}%</span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Link to={`/dashboard/student/concepts/${topic.subject.toLowerCase()}`}>
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Study
                    </Button>
                  </Link>
                  <Link to="/dashboard/student/flashcards/1/interactive">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full hover:bg-green-50"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Practice
                    </Button>
                  </Link>
                  <Link to="/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full hover:bg-purple-50"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Formula
                    </Button>
                  </Link>
                  <Link to="/dashboard/student/practice-exam/2/start">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full hover:bg-yellow-50"
                    >
                      <Trophy className="h-3 w-3 mr-1" />
                      Test
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
      </AnimatedHighlight>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
