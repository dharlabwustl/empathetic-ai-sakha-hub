
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, CheckCircle, Target, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    { subject: "Chemistry", topic: "Organic Compounds", time: "9:00 AM", status: "completed", duration: "1.5h" },
    { subject: "Physics", topic: "Wave Optics", time: "11:00 AM", status: "current", duration: "2h" },
    { subject: "Biology", topic: "Genetics", time: "2:00 PM", status: "pending", duration: "1.5h" },
    { subject: "Mathematics", topic: "Integration", time: "4:00 PM", status: "pending", duration: "1h" }
  ];

  const getMoodEmoji = () => {
    switch (currentMood) {
      case MoodType.MOTIVATED: return "🚀";
      case MoodType.FOCUSED: return "🎯";
      case MoodType.STRESSED: return "😰";
      case MoodType.CONFUSED: return "🤔";
      case MoodType.CONFIDENT: return "💪";
      case MoodType.TIRED: return "😴";
      default: return "📚";
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
      {/* Animated arrow pointing down */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <div className="text-blue-500 text-2xl">↓</div>
      </motion.div>

      {/* Priority badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      >
        <Badge className="bg-blue-500 text-white font-bold px-3 py-1 shadow-lg">
          ACTIVE!
        </Badge>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400 text-lg"
          style={{
            top: `${15 + index * 25}%`,
            left: `${15 + index * 70}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      ))}

      <Card className="relative shadow-lg border-2 border-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 overflow-hidden">
        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 border-4 border-blue-400 rounded-lg opacity-50"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
        />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="h-5 w-5 text-blue-600" />
              </motion.div>
              Today's NEET Study Plan
              <span className="text-xl ml-2">{getMoodEmoji()}</span>
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
          {/* Progress overview */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
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
          </div>

          {/* Study sessions */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-3">Study Sessions</h4>
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  session.status === 'completed' 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                    : session.status === 'current'
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {session.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {session.status === 'current' && <Clock className="h-4 w-4 text-blue-600" />}
                    {session.status === 'pending' && <BookOpen className="h-4 w-4 text-gray-500" />}
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {session.subject}: {session.topic}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {session.time} • {session.duration}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={`text-xs ${
                      session.status === 'completed' 
                        ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300'
                        : session.status === 'current'
                        ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {session.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/dashboard/student/study-plan')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Full Plan
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
