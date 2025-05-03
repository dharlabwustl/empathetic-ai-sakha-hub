
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { getVoiceSettings, speakMessage } from '../voice/voiceUtils';
import MoodButton from './mood/MoodButton';
import MoodSuggestionPanel from './mood/MoodSuggestionPanel';
import { createMoodConfig } from './mood/MoodConfig';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const MoodBasedSuggestions: React.FC<MoodBasedSuggestionsProps> = ({ 
  currentMood, 
  onMoodSelect 
}) => {
  const moodConfig = createMoodConfig();
  const moodTypes = Object.keys(moodConfig) as MoodType[];
  
  // Announce mood-specific suggestions when component mounts with an existing mood
  useEffect(() => {
    if (currentMood && moodConfig[currentMood]) {
      const settings = getVoiceSettings();
      if (settings.enabled && settings.announceReminders) {
        // Add a small delay to let other announcements finish
        setTimeout(() => {
          speakMessage(moodConfig[currentMood].voiceMessage);
        }, 2000);
      }
    }
  }, [currentMood]);
  
  const handleMoodSelect = (mood: MoodType) => {
    onMoodSelect(mood);
    
    // Voice announcement for the selected mood
    if (moodConfig[mood]) {
      const settings = getVoiceSettings();
      if (settings.enabled && settings.announceReminders) {
        speakMessage(moodConfig[mood].voiceMessage);
      }
    }
  };
  
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
            {moodTypes.map((mood) => (
              <MoodButton 
                key={mood}
                mood={mood}
                currentMood={currentMood}
                onSelect={handleMoodSelect}
              />
            ))}
          </div>
          
          {currentMood && moodConfig[currentMood] && (
            <MoodSuggestionPanel currentMood={currentMood} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedSuggestions;
