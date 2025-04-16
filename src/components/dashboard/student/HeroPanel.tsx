
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmojiHappy, Calendar, Star, AlertCircle, Clock } from "lucide-react";
import { motion } from 'framer-motion';
import { MoodType } from '@/types/user';

interface HeroPanelProps {
  userName: string;
  primaryGoal: string;
  streak: number;
  lastActivity?: string;
  suggestedAction?: string | null;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
}

const HeroPanel: React.FC<HeroPanelProps> = ({
  userName,
  primaryGoal,
  streak,
  lastActivity,
  suggestedAction,
  onViewStudyPlan,
  currentMood,
  onMoodSelect
}) => {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-indigo-100/50 dark:border-indigo-800/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* User greeting and goal information */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold">
                  {getGreeting()}, <span className="text-indigo-600 dark:text-indigo-400">{userName.split(' ')[0]}!</span>
                </h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="font-medium">{streak}-day streak</span>
                  </div>
                  <div className="mx-2">•</div>
                  <div>
                    Target: <span className="font-medium">{primaryGoal}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  onClick={onViewStudyPlan}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Study Plan
                </Button>
                
                <Button
                  variant="outline"
                  className="border-indigo-200 hover:border-indigo-300 dark:border-indigo-700 dark:hover:border-indigo-600"
                  onClick={() => onMoodSelect && onMoodSelect('motivated')}
                >
                  <EmojiHappy className="mr-2 h-4 w-4" />
                  Log Today's Mood
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Last activity */}
              {lastActivity && (
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Latest Activity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{lastActivity}</p>
                  </div>
                </div>
              )}

              {/* Suggested next action */}
              {suggestedAction && (
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <AlertCircle className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Suggested Next</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{suggestedAction}</p>
                  </div>
                </div>
              )}
              
              {/* Current mood indicator */}
              {currentMood && (
                <div className="bg-white/60 dark:bg-gray-800/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        currentMood === 'motivated' ? 'bg-orange-500' :
                        currentMood === 'curious' ? 'bg-blue-500' :
                        currentMood === 'happy' ? 'bg-yellow-500' :
                        currentMood === 'neutral' ? 'bg-gray-500' :
                        currentMood === 'tired' ? 'bg-teal-500' :
                        'bg-purple-500'
                      }`} />
                      <span className="text-sm font-medium">{currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => onMoodSelect && onMoodSelect('motivated')}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroPanel;
