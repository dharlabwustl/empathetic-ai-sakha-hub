import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Brain, FileText, Zap, Sparkles, X } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { motion } from 'framer-motion';

interface StudyPlan {
  date: string;
  dailyGoal: string;
  progress: number;
  tasks: StudyTask[];
}

interface StudyTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  completed: boolean;
}

interface TodaysPlanSectionProps {
  studyPlan?: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ studyPlan, currentMood }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  
  // Create mood-based study plans
  const getMoodBasedStudyPlan = (mood?: MoodType): StudyPlan => {
    const basePlan: StudyPlan = {
      date: new Date().toLocaleDateString(),
      dailyGoal: '4 hours',
      progress: 35,
      tasks: [
        {
          id: 'concept-1',
          title: "Newton's Laws of Motion",
          type: 'concept',
          difficulty: 'medium',
          timeEstimate: 30,
          completed: false
        },
        {
          id: 'flashcard-1',
          title: "Chemical Bonds Flashcards",
          type: 'flashcard',
          difficulty: 'medium',
          timeEstimate: 20,
          completed: false
        },
        {
          id: 'quiz-1',
          title: "Algebra Practice Problems",
          type: 'quiz',
          difficulty: 'medium',
          timeEstimate: 25,
          completed: false
        }
      ]
    };

    // Adjust plan based on mood
    if (mood) {
      switch (mood) {
        case MoodType.MOTIVATED:
          return {
            ...basePlan,
            dailyGoal: '5 hours',
            tasks: [
              ...basePlan.tasks,
              {
                id: 'revision-1',
                title: "Full Physics Revision",
                type: 'revision',
                difficulty: 'hard',
                timeEstimate: 45,
                completed: false
              }
            ]
          };
        case MoodType.FOCUSED:
          return {
            ...basePlan,
            dailyGoal: '4.5 hours',
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'hard' as const
            }))
          };
        case MoodType.TIRED:
          return {
            ...basePlan,
            dailyGoal: '2.5 hours',
            tasks: basePlan.tasks.slice(0, 2).map(task => ({
              ...task,
              difficulty: 'easy' as const,
              timeEstimate: Math.max(15, task.timeEstimate - 10)
            }))
          };
        case MoodType.ANXIOUS:
          return {
            ...basePlan,
            dailyGoal: '3 hours',
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'easy' as const
            }))
          };
        case MoodType.STRESSED:
          return {
            ...basePlan,
            dailyGoal: '2 hours',
            tasks: [
              {
                id: 'revision-2',
                title: "Quick Recap of Key Concepts",
                type: 'revision',
                difficulty: 'easy',
                timeEstimate: 20,
                completed: false
              },
              {
                id: 'flashcard-2',
                title: "Basic Formula Review",
                type: 'flashcard',
                difficulty: 'easy',
                timeEstimate: 15,
                completed: false
              }
            ]
          };
        default:
          return basePlan;
      }
    }
    
    return basePlan;
  };

  const plan = getMoodBasedStudyPlan(currentMood);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      case 'flashcard':
        return <Brain className="h-4 w-4" />;
      case 'quiz':
      case 'revision':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };
  
  const getTotalTime = (tasks: StudyTask[]) => {
    return tasks.reduce((total, task) => total + task.timeEstimate, 0);
  };

  const handleTaskClick = (task: StudyTask) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (task.type === 'quiz') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      id="todays-plan-section"
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated arrow pointing down */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-blue-500 text-2xl">↓</div>
      </motion.div>

      {/* Priority badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Badge className="bg-blue-500 text-white font-bold px-3 py-1 shadow-lg">
          LIVE PLAN
        </Badge>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-yellow-400 text-lg"
          style={{
            top: `${20 + index * 30}%`,
            left: `${10 + index * 80}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      ))}

      <Card className="relative shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 overflow-hidden">
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
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <CardHeader className="pb-2 relative z-10">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-5 w-5 text-blue-600" />
              </motion.div>
              Today's NEET Study Plan
            </CardTitle>
            <div className="flex items-center gap-2">
              {currentMood && (
                <Badge variant="outline" className="capitalize">
                  {currentMood.toLowerCase()} mood
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{plan.date}</span>
              </div>
              <div className="text-sm text-gray-900 dark:text-gray-100">
                Goal: <span className="font-medium">{plan.dailyGoal}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Daily progress</span>
                <span className="text-gray-900 dark:text-gray-100">{plan.progress}%</span>
              </div>
              <Progress value={plan.progress} className="h-2" />
            </div>
            
            <div className="space-y-3 pt-2">
              {plan.tasks.map((task, idx) => (
                <motion.div 
                  key={idx}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  onClick={() => handleTaskClick(task)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${
                        task.type === 'concept' ? 'bg-blue-100 text-blue-600' :
                        task.type === 'flashcard' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{task.title}</span>
                    </div>
                    {getDifficultyBadge(task.difficulty)}
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{task.timeEstimate} min</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm pt-1">
              <div className="text-gray-700 dark:text-gray-300">
                Total time: <span className="font-medium text-gray-900 dark:text-gray-100">{getTotalTime(plan.tasks)} min</span>
              </div>
              <Button size="sm" onClick={() => navigate('/dashboard/student/today')}>
                View Full Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
