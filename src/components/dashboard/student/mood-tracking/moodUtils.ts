
import { MoodType } from '@/types/user/base';

// Function to get emoji for mood
export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Focused:
      return '🎯';
    case MoodType.Tired:
      return '😴';
    case MoodType.Stressed:
      return '😰';
    case MoodType.Anxious:
      return '😟';
    case MoodType.Confused:
      return '🤔';
    case MoodType.Neutral:
      return '😐';
    case MoodType.Sad:
      return '😢';
    default:
      return '😐';
  }
};

// Get voice commands for moods
export const getMoodVoiceCommands = (): string[] => {
  return [
    "I'm feeling happy today",
    "I'm feeling tired",
    "I'm feeling motivated",
    "I'm feeling stressed",
    "I'm feeling anxious",
    "I'm feeling focused",
    "How should I study when I'm confused?",
    "Update my mood to neutral"
  ];
};

// Get mood recommendation
export const getMoodRecommendation = (mood: MoodType): string => {
  switch(mood) {
    case MoodType.Happy:
      return "This is a great time to tackle challenging topics or try some practice tests.";
    case MoodType.Motivated:
      return "Channel that motivation into focused study sessions on high-priority subjects.";
    case MoodType.Focused:
      return "Perfect time for in-depth concept exploration and difficult problem sets.";
    case MoodType.Tired:
      return "Consider lighter review sessions with breaks, or focusing on easier topics today.";
    case MoodType.Stressed:
      return "Try shorter study sessions with mindfulness breaks, and review familiar material.";
    case MoodType.Anxious:
      return "Start with topics you're confident in, then gradually approach challenging areas.";
    case MoodType.Confused:
      return "Let's go back to basics and review foundational concepts before moving forward.";
    case MoodType.Neutral:
      return "A balanced approach works well - mix review with new material, and take regular breaks.";
    case MoodType.Sad:
      return "Let's focus on building your confidence with topics you enjoy and take it easy today.";
    default:
      return "Let's adjust your study plan based on how you're feeling throughout the day.";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    localStorage.setItem('currentMood', mood);
    localStorage.setItem('moodTimestamp', new Date().toISOString());
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | null => {
  try {
    const mood = localStorage.getItem('currentMood') as MoodType | null;
    const timestamp = localStorage.getItem('moodTimestamp');
    
    // If mood is older than 12 hours, return null
    if (mood && timestamp) {
      const moodTime = new Date(timestamp).getTime();
      const currentTime = new Date().getTime();
      const hoursDiff = (currentTime - moodTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 12) {
        return null;
      }
      
      return mood;
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
    return null;
  }
};
