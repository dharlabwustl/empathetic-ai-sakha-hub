
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Target, Moon, Frown, Brain } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const moodConfig = {
  happy: {
    icon: <Smile className="w-5 h-5 text-amber-500" />,
    suggestion: "Perfect day to tackle a challenging concept! Add a bonus practice test today?",
    color: "bg-amber-50 border-amber-200"
  },
  focused: {
    icon: <Target className="w-5 h-5 text-emerald-500" />,
    suggestion: "Maximize this energy! Aim for 10% extra progress today.",
    color: "bg-emerald-50 border-emerald-200"
  },
  tired: {
    icon: <Moon className="w-5 h-5 text-blue-500" />,
    suggestion: "Let's lighten today's plan. Focus only on Flashcards or Quick Revision.",
    color: "bg-blue-50 border-blue-200"
  },
  anxious: {
    icon: <Frown className="w-5 h-5 text-purple-500" />,
    suggestion: "Breathe. Start with 1 simple concept you know well to build confidence.",
    color: "bg-purple-50 border-purple-200"
  },
  stressed: {
    icon: <Brain className="w-5 h-5 text-red-500" />,
    suggestion: "Take it easy. 15 minutes of flashcards only. Tomorrow, we rebuild momentum.",
    color: "bg-red-50 border-red-200"
  }
};

export default function MoodBasedSuggestions({ currentMood, onMoodSelect }: MoodBasedSuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Daily Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(moodConfig).map(([mood, config]) => (
              <Button
                key={mood}
                variant={currentMood === mood ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1.5 ${currentMood === mood ? 'bg-primary' : ''}`}
                onClick={() => onMoodSelect(mood as MoodType)}
              >
                {config.icon}
                <span className="capitalize">{mood}</span>
              </Button>
            ))}
          </div>
          
          {currentMood && (
            <div className={`p-4 rounded-lg ${moodConfig[currentMood].color} mt-4`}>
              <div className="flex items-start gap-3">
                {moodConfig[currentMood].icon}
                <p className="text-sm">{moodConfig[currentMood].suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
