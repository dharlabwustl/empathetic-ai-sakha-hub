
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Zap, RotateCcw, Trophy, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const todaysPlan = [
    {
      time: "9:00 AM",
      subject: "Chemistry", 
      topic: "Chemical Bonding",
      duration: "90 mins",
      type: "concept-study",
      status: "pending",
      priority: "High"
    },
    {
      time: "11:00 AM",
      subject: "Physics",
      topic: "Thermodynamics Practice",
      duration: "60 mins", 
      type: "practice",
      status: "pending",
      priority: "Medium"
    },
    {
      time: "2:00 PM",
      subject: "Biology",
      topic: "Mock Test - Genetics",
      duration: "45 mins",
      type: "exam",
      status: "pending", 
      priority: "High"
    }
  ];

  const getActionButton = (plan: any) => {
    switch (plan.type) {
      case 'concept-study':
        return (
          <Link to={`/dashboard/student/concepts/${plan.subject.toLowerCase()}`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <BookOpen className="h-3 w-3 mr-1" />
              Study
            </Button>
          </Link>
        );
      case 'practice':
        return (
          <Link to="/dashboard/student/flashcards/1/interactive">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <RotateCcw className="h-3 w-3 mr-1" />
              Practice
            </Button>
          </Link>
        );
      case 'exam':
        return (
          <Link to="/dashboard/student/practice-exam/2/start">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Take Test
            </Button>
          </Link>
        );
      case 'formula':
        return (
          <Link to="/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Zap className="h-3 w-3 mr-1" />
              Formula Lab
            </Button>
          </Link>
        );
      default:
        return (
          <Button size="sm" variant="outline">
            <Play className="h-3 w-3 mr-1" />
            Start
          </Button>
        );
    }
  };

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
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="premium-card relative shadow-lg border-2 border-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 overflow-hidden">
        {/* Active animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <CardHeader className="pb-3 relative z-10">
          <CardTitle className="text-lg flex items-center justify-between text-gray-900 dark:text-white">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Calendar className="h-5 w-5 text-green-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#059669", "#2563eb", "#059669"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Live Daily NEET Plan - Active!
              </motion.span>
              {/* Animated active indicator */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            <Link to="/dashboard/student/today">
              <Button size="sm" variant="outline" className="hover:bg-green-50">
                View Full Plan
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          {todaysPlan.map((plan, index) => (
            <motion.div
              key={index}
              className="border-2 rounded-lg p-3 bg-white/90 dark:bg-gray-800/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                boxShadow: plan.priority === 'High' ? '0 0 15px rgba(34, 197, 94, 0.3)' : '0 0 10px rgba(59, 130, 246, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm font-medium text-green-700">
                    <Clock className="h-3 w-3" />
                    {plan.time}
                  </div>
                  <Badge className={getPriorityColor(plan.priority)}>
                    {plan.priority}
                  </Badge>
                </div>
                <span className="text-xs text-gray-600">{plan.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {plan.subject}: {plan.topic}
                  </h4>
                </div>
                
                <div className="ml-3">
                  {getActionButton(plan)}
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
