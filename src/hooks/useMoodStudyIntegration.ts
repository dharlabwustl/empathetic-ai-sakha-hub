
import { useState, useEffect, useCallback } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { useToast } from './use-toast';
import { getMoodRecommendation, storeMoodInLocalStorage, getCurrentMoodFromLocalStorage } from '@/components/dashboard/student/mood-tracking/moodUtils';

interface StudyRecommendation {
  message: string;
  activityType: 'revision' | 'concept_quiz' | 'practice' | 'break' | 'mindfulness';
  studyDuration: number; // in minutes
}

export const useMoodStudyIntegration = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [studyRecommendation, setStudyRecommendation] = useState<StudyRecommendation | null>(null);
  const { speakMessage } = useVoiceAnnouncer();
  const { toast } = useToast();

  // Load current mood from localStorage on initial mount
  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);

  // Function to update mood and get study recommendations
  const updateMood = useCallback((mood: MoodType) => {
    setCurrentMood(mood);
    
    // Store in localStorage
    storeMoodInLocalStorage(mood);
    
    // Get recommendation based on mood
    const recommendationMessage = getMoodRecommendation(mood);
    
    // Create a recommendation object
    let newRecommendation: StudyRecommendation = {
      message: recommendationMessage,
      activityType: 'concept_quiz', // default
      studyDuration: 30 // default
    };
    
    // Adjust study recommendations based on mood
    switch(mood) {
      case MoodType.Happy:
      case MoodType.Motivated:
      case MoodType.Focused:
        newRecommendation.activityType = 'concept_quiz';
        newRecommendation.studyDuration = 45;
        break;
      case MoodType.Tired:
      case MoodType.Stressed:
        newRecommendation.activityType = 'revision';
        newRecommendation.studyDuration = 20;
        break;
      case MoodType.Anxious:
        newRecommendation.activityType = 'revision';
        newRecommendation.studyDuration = 30;
        break;
      case MoodType.Confused:
        newRecommendation.activityType = 'revision';
        newRecommendation.studyDuration = 35;
        break;
      default:
        newRecommendation.activityType = 'practice';
        newRecommendation.studyDuration = 30;
    }
    
    setStudyRecommendation(newRecommendation);
    
    // Show toast notification
    toast({
      title: `Current mood: ${mood}`,
      description: recommendationMessage,
      duration: 5000
    });
    
    // Voice announcement with personalized acknowledgment
    let acknowledgment = "";
    
    switch(mood) {
      case MoodType.Happy:
        acknowledgment = "Great to hear you're feeling happy today! ";
        break;
      case MoodType.Motivated:
        acknowledgment = "Excellent! You're feeling motivated today! ";
        break;
      case MoodType.Focused:
        acknowledgment = "Noted you're feeling focused today. Let's keep up the pace! ";
        break;
      case MoodType.Tired:
        acknowledgment = "I understand you're feeling tired today. ";
        break;
      case MoodType.Stressed:
        acknowledgment = "I notice you're feeling stressed. ";
        break;
      case MoodType.Anxious:
        acknowledgment = "I understand you're feeling anxious. ";
        break;
      case MoodType.Confused:
        acknowledgment = "It's okay to feel confused sometimes. ";
        break;
      case MoodType.Neutral:
        acknowledgment = "You're feeling neutral today. That's completely fine. ";
        break;
      default:
        acknowledgment = `I've recorded that you're feeling ${mood.toLowerCase()}. `;
    }
    
    // Combine acknowledgment with recommendation for personalized response
    const moodMessage = `${acknowledgment}${recommendationMessage}`;
    speakMessage(moodMessage);
    
  }, [speakMessage, toast]);

  return {
    currentMood,
    updateMood,
    studyRecommendation
  };
};

export default useMoodStudyIntegration;
