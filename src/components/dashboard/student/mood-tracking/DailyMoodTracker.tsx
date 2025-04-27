
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";

interface DailyMoodTrackerProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DailyMoodTracker: React.FC<DailyMoodTrackerProps> = ({
  currentMood = 'okay',
  onMoodChange
}) => {
  const handleMoodChange = (value: string) => {
    if (onMoodChange) {
      onMoodChange(value as MoodType);
    }
  };

  const moods: { value: MoodType; label: string; emoji: string }[] = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'motivated', label: 'Motivated', emoji: '💪' },
    { value: 'focused', label: 'Focused', emoji: '🧠' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'tired', label: 'Tired', emoji: '😴' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'stressed', label: 'Stressed', emoji: '😓' },
    { value: 'sad', label: 'Sad', emoji: '😢' }
  ];

  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          defaultValue={currentMood} 
          className="grid grid-cols-4 gap-2"
          onValueChange={handleMoodChange}
        >
          {moods.map((mood) => (
            <div key={mood.value} className="flex flex-col items-center">
              <div className="space-y-2">
                <RadioGroupItem 
                  value={mood.value} 
                  id={`mood-${mood.value}`}
                  className="peer hidden"
                />
                <Label
                  htmlFor={`mood-${mood.value}`}
                  className="flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer border-2 border-muted 
                    hover:bg-muted/20 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="mt-1 text-xs font-medium">{mood.label}</span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default DailyMoodTracker;
