
import { useState, useEffect, useCallback } from 'react';
import { MoodType } from '@/types/user/base';
import { getVoiceSettings, speakMessage } from '../../voice/voiceUtils';
import { createMoodConfig } from './MoodConfig';

export const useMoodState = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const moodConfig = createMoodConfig();
  
  // Load mood from localStorage on init
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);
  
  const handleMoodSelect = useCallback((mood: MoodType) => {
    setCurrentMood(mood);
    
    // Save to local storage for persistence across the app
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // Voice announcement for the selected mood
    if (moodConfig[mood]) {
      const settings = getVoiceSettings();
      if (settings.enabled && settings.announceReminders) {
        speakMessage(moodConfig[mood].voiceMessage);
      }
    }
  }, [moodConfig]);
  
  return {
    currentMood,
    setMood: handleMoodSelect
  };
};
