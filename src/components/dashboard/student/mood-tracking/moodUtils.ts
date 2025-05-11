import { MoodType } from "@/types/user/base";

// Function to get the emoji for a given mood
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.TIRED:
      return '😴';
    case MoodType.STRESSED:
      return '😰';
    case MoodType.CURIOUS:
      return '🤔';
    case MoodType.OKAY:
      return '😐';
    case MoodType.OVERWHELMED:
      return '😵';
    case MoodType.ANXIOUS:
      return '😟';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.CONFUSED:
      return '😕';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.SAD:
      return '😢';
    case MoodType.CALM:
      return '😌';
    default:
      return '😐';
  }
};

// Function to get the readable label for a mood
export const getMoodLabel = (mood: MoodType): string => {
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};

// Function to get a study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood for tackling new, challenging concepts! Your positive energy helps with knowledge retention.";
    case MoodType.FOCUSED:
      return "Perfect time to work on difficult topics requiring deep concentration and problem-solving.";
    case MoodType.TIRED:
      return "Consider reviewing familiar material or taking a short power nap before continuing.";
    case MoodType.STRESSED:
      return "Try starting with easier topics to build confidence, and remember to take regular deep breaths.";
    case MoodType.CURIOUS:
      return "Excellent time to explore new topics or dive deeper into concepts you find intriguing.";
    case MoodType.OKAY:
      return "Good state for steady progress. Mix reviewing known material with moderate challenges.";
    case MoodType.OVERWHELMED:
      return "Break down your tasks into smaller chunks and focus on one thing at a time.";
    case MoodType.ANXIOUS:
      return "Try the 5-10-15 technique: 5 minutes of deep breathing, 10 minutes of light review, then 15 minutes of focused study.";
    case MoodType.MOTIVATED:
      return "Channel your motivation into tackling your most challenging subjects or longest-pending tasks.";
    case MoodType.CONFUSED:
      return "Focus on foundational concepts first and consider reaching out to our AI tutor for help.";
    case MoodType.NEUTRAL:
      return "Good time for balanced study. Mix between reviewing material and learning new concepts.";
    case MoodType.SAD:
      return "Consider light review of favorite subjects or topics you feel confident in to build momentum.";
    case MoodType.CALM:
      return "Excellent state for methodical study. Good time for planning your approach to complex topics.";
    default:
      return "Focus on your priorities for today and remember to take breaks when needed.";
  }
};

// Store current mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType) => {
  // Store current mood
  localStorage.setItem('current_mood', mood);
  
  // Also add to mood history
  const now = new Date().toISOString();
  const newMoodEntry = { mood, timestamp: now };
  
  // Get existing mood history
  let moodHistory = [];
  try {
    const storedHistory = localStorage.getItem('mood_history');
    if (storedHistory) {
      moodHistory = JSON.parse(storedHistory);
      // Ensure it's an array
      if (!Array.isArray(moodHistory)) {
        moodHistory = [];
      }
    }
  } catch (error) {
    console.error('Error parsing mood history:', error);
    moodHistory = [];
  }
  
  // Add new entry and keep only last 30 entries
  moodHistory.push(newMoodEntry);
  if (moodHistory.length > 30) {
    moodHistory = moodHistory.slice(moodHistory.length - 30);
  }
  
  // Store updated history
  localStorage.setItem('mood_history', JSON.stringify(moodHistory));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem('current_mood');
  return mood as MoodType | undefined;
};

// Analyze mood trends from history
export const analyzeMoodTrends = () => {
  const result = {
    stressSignals: false,
    improved: false,
    consistent: false,
    worsening: false
  };
  
  try {
    const storedHistory = localStorage.getItem('mood_history');
    if (!storedHistory) return result;
    
    const moodHistory = JSON.parse(storedHistory);
    if (!Array.isArray(moodHistory) || moodHistory.length < 3) return result;
    
    // Last 5 moods for trend analysis
    const recentMoods = moodHistory.slice(-5).map(entry => entry.mood);
    
    // Check for stress signals (2 or more stressed/anxious/overwhelmed moods in last 5)
    const stressfulMoods = recentMoods.filter(mood => 
      [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED].includes(mood as MoodType)
    );
    
    result.stressSignals = stressfulMoods.length >= 2;
    
    // Check if mood is improving (from negative to positive)
    const firstHalf = recentMoods.slice(0, Math.ceil(recentMoods.length / 2));
    const secondHalf = recentMoods.slice(Math.ceil(recentMoods.length / 2));
    
    const negativeMoods = [MoodType.SAD, MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.CONFUSED, MoodType.TIRED];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
    
    const firstHalfNegativeCount = firstHalf.filter(mood => 
      negativeMoods.includes(mood as MoodType)
    ).length;
    
    const secondHalfPositiveCount = secondHalf.filter(mood => 
      positiveMoods.includes(mood as MoodType)
    ).length;
    
    // If first half had more negative moods and second half has more positive moods
    result.improved = firstHalfNegativeCount > 0 && 
      secondHalfPositiveCount > firstHalfNegativeCount;
    
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
  }
  
  return result;
};
