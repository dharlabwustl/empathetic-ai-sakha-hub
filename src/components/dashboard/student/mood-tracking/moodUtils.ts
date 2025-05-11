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

// Function to get label for mood
export const getMoodLabel = (mood: MoodType): string => {
  return mood || 'Neutral';
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

// Get study recommendation for mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
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

// Added explicitly for useMoodStudyIntegration.ts
export const getMoodRecommendation = (mood: MoodType): string => {
  return getStudyRecommendationForMood(mood);
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    localStorage.setItem('currentMood', mood);
    localStorage.setItem('moodTimestamp', new Date().toISOString());
    
    // Store in mood history
    const moodHistory = getMoodHistoryFromLocalStorage();
    moodHistory.push({
      mood,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 30 entries
    if (moodHistory.length > 30) {
      moodHistory.shift();
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
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

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = () => {
  try {
    const history = localStorage.getItem('mood_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting mood history:', error);
    return [];
  }
};

// Analyze mood trends from history
export const analyzeMoodTrends = () => {
  const moodHistory = getMoodHistoryFromLocalStorage();
  
  if (moodHistory.length < 3) {
    return {
      improved: false,
      stressSignals: false,
      consistent: false,
      recommendation: "Keep logging your mood to get personalized insights."
    };
  }
  
  const lastThreeMoods = moodHistory.slice(-3);
  
  // Check for stress patterns
  const stressRelatedMoods = [MoodType.Stressed, MoodType.Anxious, MoodType.Tired];
  const stressCount = lastThreeMoods.filter(entry => 
    stressRelatedMoods.includes(entry.mood as MoodType)
  ).length;
  
  // Check for improvement patterns
  const positiveRelatedMoods = [MoodType.Happy, MoodType.Motivated, MoodType.Focused];
  const lastMood = lastThreeMoods[lastThreeMoods.length - 1].mood;
  
  const isCurrentMoodPositive = positiveRelatedMoods.includes(lastMood as MoodType);
  const wasLastMoodNegative = stressRelatedMoods.includes(lastThreeMoods[lastThreeMoods.length - 2].mood as MoodType);
  
  return {
    improved: isCurrentMoodPositive && wasLastMoodNegative,
    stressSignals: stressCount >= 2,
    consistent: lastThreeMoods.every(entry => entry.mood === lastMood),
    recommendation: getRecommendationFromTrend(lastMood as MoodType, stressCount >= 2)
  };
};

// Get recommendation based on mood trend
const getRecommendationFromTrend = (currentMood: MoodType, isStressed: boolean) => {
  if (isStressed) {
    return "Consider taking a break or practicing mindfulness. Your wellbeing is just as important as your studies.";
  }
  
  return getStudyRecommendationForMood(currentMood);
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  try {
    // Get current allocations or create default
    let allocations = localStorage.getItem('study_time_allocations');
    const timeAllocations = allocations ? JSON.parse(allocations) : {
      revision: 30,
      newConcepts: 30,
      practiceProblems: 30,
      breaks: 10
    };
    
    // Adjust based on mood
    switch(mood) {
      case MoodType.Happy:
      case MoodType.Motivated:
        timeAllocations.newConcepts = 40;
        timeAllocations.practiceProblems = 40;
        timeAllocations.revision = 15;
        timeAllocations.breaks = 5;
        break;
      case MoodType.Focused:
        timeAllocations.newConcepts = 45;
        timeAllocations.practiceProblems = 45;
        timeAllocations.revision = 5;
        timeAllocations.breaks = 5;
        break;
      case MoodType.Tired:
      case MoodType.Stressed:
      case MoodType.Anxious:
        timeAllocations.revision = 40;
        timeAllocations.newConcepts = 15;
        timeAllocations.practiceProblems = 20;
        timeAllocations.breaks = 25;
        break;
      case MoodType.Confused:
        timeAllocations.revision = 60;
        timeAllocations.newConcepts = 10;
        timeAllocations.practiceProblems = 10;
        timeAllocations.breaks = 20;
        break;
      case MoodType.Neutral:
      default:
        timeAllocations.revision = 30;
        timeAllocations.newConcepts = 30;
        timeAllocations.practiceProblems = 30;
        timeAllocations.breaks = 10;
    }
    
    // Save updated allocations
    localStorage.setItem('study_time_allocations', JSON.stringify(timeAllocations));
    
    // Dispatch an event so other components can react to this change
    const event = new CustomEvent('study-time-updated', { 
      detail: { allocations: timeAllocations, mood } 
    });
    document.dispatchEvent(event);
    
    return timeAllocations;
  } catch (error) {
    console.error('Error updating study allocations:', error);
    return null;
  }
};

// Fix pronunciation for voice assistant
export const fixPronunciation = (text: string): string => {
  // Replace PREPZR with a phonetic spelling that pronounces it correctly
  // Add a small pause between "Prep" and "zer" using SSML-like approach
  return text.replace(/PREPZR/gi, 'Prep-zer');
};
