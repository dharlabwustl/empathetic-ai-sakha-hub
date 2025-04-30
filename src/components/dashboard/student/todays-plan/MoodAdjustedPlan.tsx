
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Heart, Brain, Coffee, Award, Meh } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MoodAdjustedPlanProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

export function MoodAdjustedPlan({ currentMood, onMoodChange }: MoodAdjustedPlanProps) {
  // Mood options with their icons and descriptions
  const moodOptions: { type: MoodType; icon: React.ReactNode; label: string; description: string }[] = [
    { 
      type: 'happy', 
      icon: <Smile className="h-5 w-5 text-amber-500" />, 
      label: 'Happy',
      description: 'Feeling great! Ready to challenge yourself with extra topics.'
    },
    { 
      type: 'motivated', 
      icon: <Award className="h-5 w-5 text-emerald-500" />, 
      label: 'Motivated',
      description: 'Determined and ready to achieve your goals!'
    },
    { 
      type: 'focused', 
      icon: <Brain className="h-5 w-5 text-blue-500" />, 
      label: 'Focused',
      description: 'Deep concentration mode. Perfect for difficult concepts.'
    },
    { 
      type: 'neutral', 
      icon: <Meh className="h-5 w-5 text-gray-500" />, 
      label: 'Neutral',
      description: 'Standard study plan - balanced approach to your learning.'
    },
    { 
      type: 'tired', 
      icon: <Coffee className="h-5 w-5 text-orange-500" />, 
      label: 'Tired',
      description: 'Need rest? Your plan will focus on easier concepts today.'
    },
    { 
      type: 'anxious', 
      icon: <Heart className="h-5 w-5 text-purple-500" />, 
      label: 'Anxious',
      description: 'Simple tasks and confidence-building exercises recommended.'
    },
    { 
      type: 'stressed', 
      icon: <Frown className="h-5 w-5 text-red-500" />, 
      label: 'Stressed',
      description: 'Light workload with more breaks to reduce stress.'
    }
  ];

  // Find the current mood data
  const currentMoodData = moodOptions.find(m => m.type === currentMood) || moodOptions[1]; // Default to motivated

  return (
    <Card className="border-t-4 border-t-indigo-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="text-indigo-500" size={18} />
          Today's Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${
            currentMood === 'happy' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700/50' :
            currentMood === 'motivated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700/50' :
            currentMood === 'focused' ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700/50' :
            currentMood === 'neutral' ? 'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700/50' :
            currentMood === 'tired' ? 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700/50' :
            currentMood === 'anxious' ? 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700/50' :
            currentMood === 'stressed' ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700/50' :
            'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700/50'
          }`}>
            <div className="flex items-center gap-2">
              {currentMoodData.icon}
              <span className="font-medium">{currentMoodData.label}</span>
            </div>
            <p className="text-sm mt-1">{currentMoodData.description}</p>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {moodOptions.map((mood) => (
              <Button
                key={mood.type}
                size="sm"
                variant={currentMood === mood.type ? "default" : "outline"}
                className={`p-2 h-auto flex flex-col items-center justify-center ${
                  currentMood === mood.type ? "bg-indigo-600" : ""
                }`}
                onClick={() => onMoodChange(mood.type)}
                title={mood.label}
              >
                {mood.icon}
                <span className="text-xs mt-1">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MoodAdjustedPlan;
