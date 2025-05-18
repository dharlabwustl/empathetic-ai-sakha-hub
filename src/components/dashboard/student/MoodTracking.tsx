
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleCheckBig } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { storeMoodInLocalStorage } from './mood-tracking/moodUtils';
import { useToast } from '@/hooks/use-toast';

interface MoodTrackingProps {
  onMoodChange: (mood: MoodType) => void;
  currentMood?: MoodType;
  compact?: boolean;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({
  onMoodChange,
  currentMood,
  compact = false
}) => {
  const { toast } = useToast();
  const [showExtraMoods, setShowExtraMoods] = useState(false);
  const [isSelectingMood, setIsSelectingMood] = useState(false);

  // Common moods shown initially
  const commonMoods = [
    { emoji: "😊", label: "Happy", value: MoodType.HAPPY },
    { emoji: "💪", label: "Motivated", value: MoodType.MOTIVATED },
    { emoji: "🎯", label: "Focused", value: MoodType.FOCUSED },
    { emoji: "😐", label: "Neutral", value: MoodType.NEUTRAL }
  ];

  // Additional moods shown when expanded
  const extraMoods = [
    { emoji: "😴", label: "Tired", value: MoodType.TIRED },
    { emoji: "😰", label: "Anxious", value: MoodType.ANXIOUS },
    { emoji: "😫", label: "Stressed", value: MoodType.STRESSED },
    { emoji: "😢", label: "Sad", value: MoodType.SAD }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    onMoodChange(mood);
    storeMoodInLocalStorage(mood);
    setIsSelectingMood(false);
    
    toast({
      title: "Mood updated",
      description: `Your mood has been set to ${getMoodLabel(mood)}.`,
    });
  };

  const getMoodLabel = (mood: MoodType) => {
    const allMoods = [...commonMoods, ...extraMoods];
    const foundMood = allMoods.find(m => m.value === mood);
    return foundMood ? foundMood.label : "Unknown";
  };

  const getMoodEmoji = (mood: MoodType) => {
    const allMoods = [...commonMoods, ...extraMoods];
    const foundMood = allMoods.find(m => m.value === mood);
    return foundMood ? foundMood.emoji : "😐";
  };

  // For compact mode, show only the current mood with emoji
  if (compact && currentMood && !isSelectingMood) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSelectingMood(true)}
              className="relative h-9 w-9 rounded-full"
            >
              <span className="text-lg">{getMoodEmoji(currentMood)}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Current mood: {getMoodLabel(currentMood)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // For compact mode when selecting
  if (compact && isSelectingMood) {
    return (
      <Card className="w-72 absolute right-0 top-full mt-2 z-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {commonMoods.map(mood => (
              <Button
                key={mood.value}
                variant="ghost"
                size="sm"
                className={`flex flex-col p-2 h-16 ${currentMood === mood.value ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="text-xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
                {currentMood === mood.value && (
                  <CircleCheckBig className="h-4 w-4 text-blue-500 absolute top-1 right-1" />
                )}
              </Button>
            ))}
          </div>
          
          {showExtraMoods && (
            <div className="grid grid-cols-4 gap-2 mb-2">
              {extraMoods.map(mood => (
                <Button
                  key={mood.value}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col p-2 h-16 ${currentMood === mood.value ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                  onClick={() => handleMoodSelect(mood.value)}
                >
                  <span className="text-xl mb-1">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                  {currentMood === mood.value && (
                    <CircleCheckBig className="h-4 w-4 text-blue-500 absolute top-1 right-1" />
                  )}
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowExtraMoods(!showExtraMoods)}
            >
              {showExtraMoods ? "Show Less" : "More Options"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSelectingMood(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full version for normal display
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>
          Your mood helps us tailor your study experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {commonMoods.map(mood => (
            <Button
              key={mood.value}
              variant="ghost"
              className={`flex flex-col p-2 h-20 ${currentMood === mood.value ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
              {currentMood === mood.value && (
                <CircleCheckBig className="h-5 w-5 text-blue-500 absolute top-2 right-2" />
              )}
            </Button>
          ))}
        </div>
        
        {showExtraMoods && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {extraMoods.map(mood => (
              <Button
                key={mood.value}
                variant="ghost"
                className={`flex flex-col p-2 h-20 ${currentMood === mood.value ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
                {currentMood === mood.value && (
                  <CircleCheckBig className="h-5 w-5 text-blue-500 absolute top-2 right-2" />
                )}
              </Button>
            ))}
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2"
          onClick={() => setShowExtraMoods(!showExtraMoods)}
        >
          {showExtraMoods ? "Show Less" : "More Options"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
