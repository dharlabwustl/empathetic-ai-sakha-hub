
import { useState, useEffect } from 'react';
import { MoodType } from '@/types/user/base';
import { 
  getCurrentMoodFromLocalStorage, 
  storeMoodInLocalStorage,
  getMoodBasedStudyPlan,
  getStudyRecommendationForMood,
  getMoodTheme
} from '@/components/dashboard/student/mood-tracking/moodUtils';

export const useMoodIntegration = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(
    getCurrentMoodFromLocalStorage()
  );

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
    
    // Update study plan based on mood
    const newPlan = getMoodBasedStudyPlan(mood);
    localStorage.setItem('current_study_plan', JSON.stringify(newPlan));
    
    // Trigger custom event for other components to react
    const event = new CustomEvent('moodChanged', { 
      detail: { 
        mood, 
        studyPlan: newPlan,
        recommendation: getStudyRecommendationForMood(mood),
        theme: getMoodTheme(mood)
      } 
    });
    window.dispatchEvent(event);
  };

  const getMoodThemeClasses = () => {
    return getMoodTheme(currentMood);
  };

  const getCurrentStudyPlan = () => {
    try {
      const stored = localStorage.getItem('current_study_plan');
      return stored ? JSON.parse(stored) : getMoodBasedStudyPlan(currentMood || MoodType.NEUTRAL);
    } catch (error) {
      return getMoodBasedStudyPlan(currentMood || MoodType.NEUTRAL);
    }
  };

  return {
    currentMood,
    handleMoodChange,
    getMoodThemeClasses,
    getCurrentStudyPlan,
    recommendation: currentMood ? getStudyRecommendationForMood(currentMood) : undefined
  };
};
