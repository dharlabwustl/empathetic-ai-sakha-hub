
import { MoodType } from '@/types/user/base';

// Function to get a study recommendation based on the current mood
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
    default:
      return "Let's adjust your study plan based on how you're feeling throughout the day.";
  }
};

// Function to get emoji for a mood
export const getMoodEmoji = (mood: MoodType): string => {
  switch(mood) {
    case MoodType.Happy:
      return "😊";
    case MoodType.Motivated:
      return "🔥";
    case MoodType.Focused:
      return "🎯";
    case MoodType.Tired:
      return "😴";
    case MoodType.Stressed:
      return "😰";
    case MoodType.Anxious:
      return "😟";
    case MoodType.Confused:
      return "🤔";
    case MoodType.Neutral:
      return "😐";
    default:
      return "🙂";
  }
};

// Function to get display label for a mood
export const getMoodLabel = (mood: MoodType): string => {
  return mood.toString();
};

// Function to store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Store current mood
    localStorage.setItem('current_mood', mood);
    
    // Store in mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString()
    };
    
    const moodHistoryString = localStorage.getItem('mood_history');
    const moodHistory = moodHistoryString ? JSON.parse(moodHistoryString) : [];
    
    // Add new entry to the beginning of the array
    moodHistory.unshift(moodEntry);
    
    // Keep only the last 30 entries
    const trimmedHistory = moodHistory.slice(0, 30);
    
    localStorage.setItem('mood_history', JSON.stringify(trimmedHistory));
    
    console.log("Mood stored:", mood);
  } catch (error) {
    console.error("Error storing mood:", error);
  }
};

// Function to get the current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | null => {
  try {
    const mood = localStorage.getItem('current_mood') as MoodType;
    return mood;
  } catch (error) {
    console.error("Error retrieving mood:", error);
    return null;
  }
};

// Function to get mood history from localStorage
export const getMoodHistoryFromLocalStorage = () => {
  try {
    const moodHistoryString = localStorage.getItem('mood_history');
    return moodHistoryString ? JSON.parse(moodHistoryString) : [];
  } catch (error) {
    console.error("Error retrieving mood history:", error);
    return [];
  }
};

// Function to analyze mood trends
export const analyzeMoodTrends = () => {
  const moodHistory = getMoodHistoryFromLocalStorage();
  if (moodHistory.length < 3) return null;
  
  // Count mood occurrences
  const moodCounts = moodHistory.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Find the most common mood
  let mostCommonMood = null;
  let highestCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > highestCount) {
      mostCommonMood = mood;
      highestCount = count;
    }
  });
  
  return {
    mostCommonMood,
    moodCounts,
    totalEntries: moodHistory.length
  };
};

// Function to get voice commands for moods
export const getMoodVoiceCommands = (): string[] => {
  return [
    "I'm feeling happy today",
    "I'm feeling tired",
    "I'm feeling stressed",
    "I'm feeling motivated",
    "I'm feeling confused",
    "I'm feeling anxious"
  ];
};
