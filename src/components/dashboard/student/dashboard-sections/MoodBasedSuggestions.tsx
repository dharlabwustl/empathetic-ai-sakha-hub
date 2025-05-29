
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getStudyRecommendationForMood } from '../mood-tracking/moodUtils';
import MoodLogButton from '../mood-tracking/MoodLogButton';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
}

export default function MoodBasedSuggestions({ currentMood, onMoodSelect }: MoodBasedSuggestionsProps) {
  // Get recommendations based on current mood
  const recommendation = currentMood ? getStudyRecommendationForMood(currentMood) : "";
  
  // Get study action based on mood
  const getStudyAction = () => {
    if (!currentMood) return { text: "Start Today's Plan", link: "/dashboard/student/today" };
    
    switch (currentMood) {
      case MoodType.HAPPY:
        return { 
          text: "Take on a Challenge", 
          link: "/dashboard/student/practice-exam/2/start",
          color: "bg-gradient-to-r from-yellow-400 to-amber-500"
        };
      case MoodType.MOTIVATED:
        return { 
          text: "Master New Concepts", 
          link: "/dashboard/student/concepts",
          color: "bg-gradient-to-r from-green-500 to-emerald-600"
        };
      case MoodType.FOCUSED:
        return { 
          text: "Complete Practice Exam", 
          link: "/dashboard/student/practice-exam/2/start",
          color: "bg-gradient-to-r from-blue-500 to-indigo-600"
        };
      case MoodType.NEUTRAL:
        return { 
          text: "Follow Today's Plan", 
          link: "/dashboard/student/today",
          color: "bg-gradient-to-r from-gray-500 to-slate-600"
        };
      case MoodType.TIRED:
        return { 
          text: "Review Simple Flashcards", 
          link: "/dashboard/student/flashcards/1/interactive",
          color: "bg-gradient-to-r from-orange-400 to-amber-500"
        };
      case MoodType.ANXIOUS:
        return { 
          text: "Try Guided Relaxation", 
          link: "/dashboard/student/feel-good-corner",
          color: "bg-gradient-to-r from-purple-500 to-violet-600"
        };
      case MoodType.STRESSED:
        return { 
          text: "Take a Mindful Break", 
          link: "/dashboard/student/feel-good-corner",
          color: "bg-gradient-to-r from-red-500 to-rose-600"
        };
      case MoodType.SAD:
        return { 
          text: "Visit Feel Good Corner", 
          link: "/dashboard/student/feel-good-corner",
          color: "bg-gradient-to-r from-indigo-500 to-blue-600"
        };
      default:
        return { 
          text: "Follow Today's Plan", 
          link: "/dashboard/student/today",
          color: "bg-gradient-to-r from-blue-500 to-purple-600"
        };
    }
  };
  
  const studyAction = getStudyAction();
  
  // Get mood-specific background styling
  const getMoodBackground = () => {
    if (!currentMood) return "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20";
    
    switch (currentMood) {
      case MoodType.HAPPY:
        return "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20";
      case MoodType.MOTIVATED:
        return "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20";
      case MoodType.FOCUSED:
        return "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20";
      case MoodType.NEUTRAL:
        return "from-gray-50 to-slate-50 dark:from-gray-800/30 dark:to-slate-800/30";
      case MoodType.TIRED:
        return "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20";
      case MoodType.ANXIOUS:
        return "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20";
      case MoodType.STRESSED:
        return "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20";
      case MoodType.SAD:
        return "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20";
      default:
        return "from-gray-50 to-blue-50 dark:from-gray-800/30 dark:to-blue-900/20";
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className={`bg-gradient-to-r ${getMoodBackground()} pb-2`}>
        <CardTitle className="text-lg flex items-center gap-2">
          <motion.span 
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentMood ? getMoodEmoji(currentMood) : "🌟"}
          </motion.span>
          Mood-based Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {!currentMood ? (
            <motion.div 
              className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium mb-3">How are you feeling today?</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                Log your mood to get personalized study recommendations
              </p>
              {onMoodSelect && (
                <div className="flex justify-center">
                  <MoodLogButton 
                    currentMood={currentMood} 
                    onMoodChange={onMoodSelect} 
                    size="default"
                    showLabel={true}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-inner">
                    <span className="text-2xl">{getMoodEmoji(currentMood)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      You're feeling <span className="font-semibold">{getMoodLabel(currentMood)}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated just now
                    </p>
                  </div>
                </div>
                
                {onMoodSelect && (
                  <MoodLogButton 
                    currentMood={currentMood} 
                    onMoodChange={onMoodSelect} 
                    size="sm" 
                    showLabel={false}
                  />
                )}
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-sm font-medium mb-2">Study Recommendation</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {recommendation}
                </p>
                
                <Link to={studyAction.link} className="no-underline">
                  <Button 
                    className={`w-full text-white ${studyAction.color || 'bg-gradient-to-r from-blue-500 to-purple-600'} hover:scale-105 transition-transform`}
                  >
                    {studyAction.text} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <motion.div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs font-medium mb-1 text-green-700 dark:text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Performance
              </p>
              <p className="text-lg font-bold">87%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs font-medium mb-1 text-purple-700 dark:text-purple-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Focus Time
              </p>
              <p className="text-lg font-bold">5.2 hrs</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">This week</p>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
