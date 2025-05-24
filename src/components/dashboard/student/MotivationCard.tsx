
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Clock, TrendingUp } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MotivationCardProps {
  mood?: MoodType;
  studyStreak?: number;
  todayProgress?: number;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ 
  mood, 
  studyStreak = 0, 
  todayProgress = 0 
}) => {
  const getMotivationMessage = (currentMood?: MoodType) => {
    if (!currentMood) return { message: "Ready to learn something new today?", color: "bg-blue-100 text-blue-800" };
    
    switch (currentMood) {
      case MoodType.Happy:
        return { 
          message: "Your positive energy is perfect for tackling challenging concepts!", 
          color: "bg-yellow-100 text-yellow-800" 
        };
      case MoodType.Motivated:
        return { 
          message: "Fantastic! Channel this motivation into focused study sessions.", 
          color: "bg-green-100 text-green-800" 
        };
      case MoodType.Focused:
        return { 
          message: "Excellent focus! This is the perfect time for complex problem-solving.", 
          color: "bg-blue-100 text-blue-800" 
        };
      case MoodType.Neutral:
        return { 
          message: "A steady mind leads to steady progress. Let's build momentum!", 
          color: "bg-gray-100 text-gray-800" 
        };
      case MoodType.Tired:
        return { 
          message: "Feeling tired? Try some light revision or take a refreshing break.", 
          color: "bg-orange-100 text-orange-800" 
        };
      case MoodType.Anxious:
        return { 
          message: "Take deep breaths. Start with easier topics to build confidence.", 
          color: "bg-purple-100 text-purple-800" 
        };
      case MoodType.Stressed:
        return { 
          message: "Break your study goals into smaller, manageable chunks today.", 
          color: "bg-red-100 text-red-800" 
        };
      case MoodType.Sad:
        return { 
          message: "It's okay to feel this way. Small steps forward still count!", 
          color: "bg-indigo-100 text-indigo-800" 
        };
      default:
        return { 
          message: "Every step forward is progress. You've got this!", 
          color: "bg-blue-100 text-blue-800" 
        };
    }
  };

  const motivation = getMotivationMessage(mood);

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Daily Motivation</h3>
          </div>
          {mood && (
            <Badge className={motivation.color}>
              {mood}
            </Badge>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {motivation.message}
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 mx-auto mb-2">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-600">{studyStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 mx-auto mb-2">
              <Clock className="h-5 w-5 text-pink-600" />
            </div>
            <div className="text-lg font-bold text-pink-600">{todayProgress}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Today's Goal</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">+{Math.floor(studyStreak * 1.2)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">XP Earned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
