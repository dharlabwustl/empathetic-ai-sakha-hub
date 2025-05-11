import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Focused:
      return '🧐';
    case MoodType.Tired:
      return '😴';
    case MoodType.Stressed:
      return '😓';
    case MoodType.Curious:
      return '🤓';
    case MoodType.Okay:
      return '👍';
    case MoodType.Overwhelmed:
      return '😩';
    case MoodType.Anxious:
      return '😰';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Confused:
      return '🤔';
    case MoodType.Neutral:
      return '😐';
    case MoodType.Sad:
      return '😔';
    case MoodType.Calm:
      return '😌';
    default:
      return '😊';
  }
};

export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Select your mood';
  
  // Convert enum value to title case
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};

export const storeMoodInLocalStorage = (mood: MoodType): void => {
  localStorage.setItem('current_mood', mood);
  
  // Add to mood history
  const currentDate = new Date().toISOString();
  const moodHistory = getMoodHistoryFromLocalStorage();
  
  moodHistory.push({
    mood,
    timestamp: currentDate,
    notes: ''
  });
  
  // Keep only the last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.shift();
  }
  
  localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  
  // Trigger custom event for mood change
  const moodChangeEvent = new CustomEvent('mood-changed', { 
    detail: { mood, timestamp: currentDate } 
  });
  document.dispatchEvent(moodChangeEvent);
};

export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const savedMood = localStorage.getItem('current_mood');
  return savedMood as MoodType || undefined;
};

interface MoodHistoryEntry {
  mood: MoodType;
  timestamp: string;
  notes?: string;
}

export const getMoodHistoryFromLocalStorage = (): MoodHistoryEntry[] => {
  const savedHistory = localStorage.getItem('mood_history');
  return savedHistory ? JSON.parse(savedHistory) : [];
};

export const addMoodNote = (timestamp: string, note: string): void => {
  const moodHistory = getMoodHistoryFromLocalStorage();
  const updatedHistory = moodHistory.map(entry => {
    if (entry.timestamp === timestamp) {
      return { ...entry, notes: note };
    }
    return entry;
  });
  
  localStorage.setItem('mood_history', JSON.stringify(updatedHistory));
};

// Get recommended study plan adjustments based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "Great mood! Perfect time for challenging topics or creative problem-solving.";
    case MoodType.Focused:
      return "Your focus is sharp today. Tackle difficult concepts or exam-style questions.";
    case MoodType.Tired:
      return "You seem tired. Try shorter study sessions with more breaks, or review familiar material.";
    case MoodType.Stressed:
      return "Take it easy today. Start with simple topics and build confidence gradually.";
    case MoodType.Curious:
      return "Channel your curiosity into exploring new topics or diving deeper into concepts.";
    case MoodType.Okay:
      return "Steady mood. Follow your regular study plan with standard intervals.";
    case MoodType.Overwhelmed:
      return "Break tasks into smaller chunks and focus on one concept at a time.";
    case MoodType.Anxious:
      return "Try some breathing exercises first, then start with topics you're confident in.";
    case MoodType.Motivated:
      return "Great energy! Perfect day to tackle challenging material or catch up on backlog.";
    case MoodType.Confused:
      return "Focus on clarifying fundamentals before moving to complex topics.";
    case MoodType.Neutral:
      return "Follow your standard study routine - mix review with new material.";
    case MoodType.Sad:
      return "Consider a lighter study load today, focusing on topics you enjoy.";
    case MoodType.Calm:
      return "Your calm state is perfect for deep learning and comprehension tasks.";
    default:
      return "Follow your regular study plan with standard intervals.";
  }
};

// Get mood trends over time
export const analyzeMoodTrends = (): { 
  dominant: MoodType | null, 
  improved: boolean, 
  stressSignals: boolean 
} => {
  const moodHistory = getMoodHistoryFromLocalStorage();
  
  if (moodHistory.length < 3) {
    return { dominant: null, improved: false, stressSignals: false };
  }
  
  // Count occurrences of each mood
  const moodCounts: Record<string, number> = {};
  moodHistory.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  // Find dominant mood
  let dominant: MoodType | null = null;
  let maxCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominant = mood as MoodType;
    }
  });
  
  // Check if mood has improved recently (last 3 entries)
  const recentMoods = moodHistory.slice(-3).map(entry => entry.mood);
  const positiveShift = hasMoodImproved(recentMoods);
  
  // Check for stress signals
  const stressSignals = hasStressSignals(moodHistory.slice(-7));
  
  return {
    dominant,
    improved: positiveShift,
    stressSignals
  };
};

// Helper functions for mood analysis
const hasMoodImproved = (moods: MoodType[]): boolean => {
  const positiveStates = [
    MoodType.Happy, 
    MoodType.Focused, 
    MoodType.Motivated, 
    MoodType.Calm
  ];
  
  const negativeStates = [
    MoodType.Stressed, 
    MoodType.Tired, 
    MoodType.Overwhelmed, 
    MoodType.Anxious,
    MoodType.Sad
  ];
  
  // If latest mood is positive and previous was negative, that's an improvement
  const latestIsPositive = positiveStates.includes(moods[moods.length - 1]);
  const previousWasNegative = negativeStates.includes(moods[moods.length - 2]);
  
  return latestIsPositive && previousWasNegative;
};

const hasStressSignals = (moods: { mood: MoodType }[]): boolean => {
  const stressIndicators = [
    MoodType.Stressed, 
    MoodType.Overwhelmed, 
    MoodType.Anxious
  ];
  
  // If 3 or more of the last 7 moods are stress indicators
  let stressCount = 0;
  
  moods.forEach(entry => {
    if (stressIndicators.includes(entry.mood)) {
      stressCount++;
    }
  });
  
  return stressCount >= 3;
};
