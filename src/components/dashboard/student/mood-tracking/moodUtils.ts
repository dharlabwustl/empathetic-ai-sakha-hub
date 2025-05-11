import { MoodType } from '@/types/user/base';

// Get emoji for each mood type
export const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Focused:
      return '🧐';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Tired:
      return '😴';
    case MoodType.Stressed:
      return '😰';
    case MoodType.Confused:
      return '😕';
    case MoodType.Anxious:
      return '😟';
    case MoodType.Neutral:
      return '😐';
    case MoodType.Sad:
      return '😢';
    default:
      return '😐';
  }
};

// Get label for each mood type
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Neutral';
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Store current mood
    localStorage.setItem('current_mood', mood);
    
    // Store in history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString()
    };
    
    const moodHistoryString = localStorage.getItem('mood_history') || '[]';
    const moodHistory = JSON.parse(moodHistoryString);
    
    // Add new entry and limit to last 30 entries
    moodHistory.push(moodEntry);
    if (moodHistory.length > 30) {
      moodHistory.shift();
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
    
    // Update study time allocations based on mood
    updateStudyTimeAllocationsByMood(mood);
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('mood-updated', { 
      detail: { mood, timestamp: now.toISOString() } 
    }));
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const mood = localStorage.getItem('current_mood') as MoodType | null;
    return mood || undefined;
  } catch (error) {
    console.error('Error getting mood from localStorage:', error);
    return undefined;
  }
};

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = () => {
  try {
    const moodHistoryString = localStorage.getItem('mood_history') || '[]';
    return JSON.parse(moodHistoryString);
  } catch (error) {
    console.error('Error getting mood history from localStorage:', error);
    return [];
  }
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "Great mood! This is an excellent time to tackle challenging topics or try some interactive practice questions.";
    case MoodType.Focused:
      return "You're in the zone! Focus on deep learning, complex problems, and concept connections now.";
    case MoodType.Motivated:
      return "Channel your motivation into tackling difficult subjects or reviewing material you've been struggling with.";
    case MoodType.Tired:
      return "Consider shorter study sessions with more frequent breaks. Focus on review rather than new material.";
    case MoodType.Stressed:
      return "Take a few minutes for a breathing exercise, then try some easier review material to build confidence.";
    case MoodType.Confused:
      return "Let's focus on foundational concepts. Try using the AI tutor to explain difficult topics step by step.";
    case MoodType.Anxious:
      return "Practice some test questions under untimed conditions to build confidence, and remember to take breaks.";
    case MoodType.Neutral:
      return "This is a good time for balanced study - mix review with new material and theoretical with practical.";
    case MoodType.Sad:
      return "Consider visiting the Feel Good Corner before studying, or choose topics you enjoy to help lift your mood.";
    default:
      return "Focus on your regular study plan and adjust as needed based on how you feel.";
  }
};

// Analyze mood trends from history
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = getMoodHistoryFromLocalStorage();
    
    if (moodHistory.length < 3) {
      return { stressSignals: false, improved: false };
    }
    
    // Get the last 5 entries or all if fewer
    const recentMoods = moodHistory.slice(-5);
    
    // Check for stress signals (multiple stressed, anxious entries)
    const stressfulMoods = recentMoods.filter(entry => 
      entry.mood === MoodType.Stressed || 
      entry.mood === MoodType.Anxious
    );
    
    // Check for improvement (stressed/anxious to motivated/happy)
    const oldestTwo = recentMoods.slice(0, 2);
    const newestTwo = recentMoods.slice(-2);
    
    const oldestWereNegative = oldestTwo.some(entry => 
      entry.mood === MoodType.Stressed || 
      entry.mood === MoodType.Anxious ||
      entry.mood === MoodType.Tired ||
      entry.mood === MoodType.Sad
    );
    
    const newestArePositive = newestTwo.some(entry => 
      entry.mood === MoodType.Happy || 
      entry.mood === MoodType.Motivated ||
      entry.mood === MoodType.Focused
    );
    
    return {
      stressSignals: stressfulMoods.length >= 2,
      improved: oldestWereNegative && newestArePositive
    };
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
    return { stressSignals: false, improved: false };
  }
};

// Get voice commands for moods
export const getMoodVoiceCommands = (): string[] => {
  return [
    "I'm feeling happy today",
    "I'm tired right now",
    "I feel motivated",
    "I'm stressed about the exam",
    "I'm feeling anxious",
    "I'm focused and ready to study"
  ];
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  try {
    // Get current allocations or set defaults
    const allocationsString = localStorage.getItem('study_time_allocations') || JSON.stringify({
      newConcepts: 30,
      review: 30,
      practice: 40
    });
    
    let allocations = JSON.parse(allocationsString);
    
    // Adjust based on mood
    switch (mood) {
      case MoodType.Tired:
        // Less new content, more review when tired
        allocations = {
          newConcepts: 15,
          review: 50,
          practice: 35
        };
        break;
      case MoodType.Motivated:
      case MoodType.Focused:
        // More new content and practice when motivated or focused
        allocations = {
          newConcepts: 35,
          review: 20,
          practice: 45
        };
        break;
      case MoodType.Stressed:
      case MoodType.Anxious:
        // More review, less new content when stressed
        allocations = {
          newConcepts: 10,
          review: 50,
          practice: 40
        };
        break;
      case MoodType.Confused:
        // Much more review, focused on fundamentals
        allocations = {
          newConcepts: 5,
          review: 65,
          practice: 30
        };
        break;
      case MoodType.Happy:
        // Balanced approach when happy
        allocations = {
          newConcepts: 30,
          review: 30,
          practice: 40
        };
        break;
      default:
        // Keep existing allocations for other moods
        break;
    }
    
    // Store updated allocations
    localStorage.setItem('study_time_allocations', JSON.stringify(allocations));
  } catch (error) {
    console.error('Error updating study time allocations:', error);
  }
};

// Add manifest.json to enable mobile app-like installation
export const setupWebAppManifest = () => {
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = '/manifest.json';
  document.head.appendChild(manifestLink);
  
  // Also add apple-specific meta tags
  const appleMetaTag = document.createElement('meta');
  appleMetaTag.name = 'apple-mobile-web-app-capable';
  appleMetaTag.content = 'yes';
  document.head.appendChild(appleMetaTag);
};
