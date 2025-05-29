
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, CheckCircle, Target, Sparkles, X, RotateCcw, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
  onClose?: () => void;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood, onClose }) => {
  const navigate = useNavigate();

  const todaysPlan = {
    totalSessions: 4,
    completedSessions: 1,
    currentSession: "Chemistry - Organic Compounds",
    nextSession: "Physics - Wave Optics",
    studyTime: "6 hours",
    progress: 25
  };

  const sessions = [
    { subject: "Chemistry", topic: "Organic Compounds", time: "9:00 AM", status: "completed", difficulty: "Medium" },
    { subject: "Physics", topic: "Wave Optics", time: "11:00 AM", status: "current", difficulty: "High" },
    { subject: "Biology", topic: "Genetics", time: "2:00 PM", status: "pending", difficulty: "Medium" },
    { subject: "Mathematics", topic: "Integration", time: "4:00 PM", status: "pending", difficulty: "Easy" }
  ];

  const getMoodEmoji = () => {
    switch (currentMood) {
      case MoodType.MOTIVATED: return "🚀";
      case MoodType.FOCUSED: return "🎯";
      case MoodType.STRESSED: return "😰";
      case MoodType.CONFUSED: return "🤔";
      case MoodType.HAPPY: return "😊";
      case MoodType.TIRED: return "😴";
      default: return "📚";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      data-tour="study-plan"
    >
      <Card className="relative shadow-lg border-2 border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 overflow-hidden">
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
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
                <Calendar className="h-5 w-5 text-blue-600" />
              </motion.div>
              <motion.span
                animate={{ 
                  color: ["#2563eb", "#3b82f6", "#2563eb"]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="font-bold"
              >
                Live Daily NEET Plan
              </motion.span>
              <motion.span 
                className="text-xl ml-2"
                animate={{ 
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity
                }}
              >
                {getMoodEmoji()}
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
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-200 dark:border-blue-700"
            animate={{ 
              boxShadow: ["0 0 10px rgba(59, 130, 246, 0.3)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 10px rgba(59, 130, 246, 0.3)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Progress</span>
              <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
                {todaysPlan.completedSessions}/{todaysPlan.totalSessions} sessions
              </span>
            </div>
            <Progress value={todaysPlan.progress} className="h-2 mb-2" />
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{todaysPlan.studyTime} planned</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>On track</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Study Sessions</h4>
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg border ${
                  session.status === 'completed' 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                    : session.status === 'current'
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {session.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {session.status === 'current' && (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity
                        }}
                      >
                        <Clock className="h-4 w-4 text-blue-600" />
                      </motion.div>
                    )}
                    {session.status === 'pending' && <BookOpen className="h-4 w-4 text-gray-500" />}
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {session.subject}: {session.topic}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {session.time} • {session.difficulty} level
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                </div>
                
                {session.status !== 'completed' && (
                  <div className="flex gap-1 mt-2">
                    <Link to={`/dashboard/student/concepts/${session.subject.toLowerCase()}`}>
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                        <BookOpen className="h-2 w-2 mr-1" />
                        Study
                      </Button>
                    </Link>
                    <Link to="/dashboard/student/flashcards/1/interactive">
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                        <RotateCcw className="h-2 w-2 mr-1" />
                        Recall
                      </Button>
                    </Link>
                    <Link to={`/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab`}>
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                        <Zap className="h-2 w-2 mr-1" />
                        Formula
                      </Button>
                    </Link>
                    <Link to="/dashboard/student/practice-exam/2/start">
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                        <Trophy className="h-2 w-2 mr-1" />
                        Exam
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold"
              onClick={() => navigate('/dashboard/student/study-plan')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Continue Live Plan
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
