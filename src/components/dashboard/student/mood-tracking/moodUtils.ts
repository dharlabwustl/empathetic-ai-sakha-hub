import { MoodType } from '@/types/mood';

// Emoji mappings for different moods
const moodEmojiMap: Record<MoodType, string> = {
  [MoodType.HAPPY]: '😊',
  [MoodType.FOCUSED]: '🧠',
  [MoodType.TIRED]: '😴',
  [MoodType.STRESSED]: '😓',
  [MoodType.CURIOUS]: '🤔',
  [MoodType.OKAY]: '😐',
  [MoodType.OVERWHELMED]: '😵',
  [MoodType.ANXIOUS]: '😰',
  [MoodType.MOTIVATED]: '💪',
  [MoodType.CONFUSED]: '😕',
  [MoodType.NEUTRAL]: '😶',
  [MoodType.SAD]: '😢'
};

// Label mappings for different moods
const moodLabelMap: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'Happy',
  [MoodType.FOCUSED]: 'Focused',
  [MoodType.TIRED]: 'Tired',
  [MoodType.STRESSED]: 'Stressed',
  [MoodType.CURIOUS]: 'Curious',
  [MoodType.OKAY]: 'Okay',
  [MoodType.OVERWHELMED]: 'Overwhelmed',
  [MoodType.ANXIOUS]: 'Anxious',
  [MoodType.MOTIVATED]: 'Motivated',
  [MoodType.CONFUSED]: 'Confused',
  [MoodType.NEUTRAL]: 'Neutral',
  [MoodType.SAD]: 'Sad'
};

// Get emoji for a mood type
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  return moodEmojiMap[mood] || '😊';
};

// Get label for a mood type
export const getMoodLabel = (mood?: MoodType): string => {
  if (!mood) return 'Happy';
  return moodLabelMap[mood] || 'Happy';
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood! This is perfect for tackling challenging concepts and new topics.";
    case MoodType.MOTIVATED:
      return "You're fired up! Channel this energy into your most important study goals.";
    case MoodType.FOCUSED:
      return "Excellent focus! This is ideal for deep learning and complex problem-solving.";
    case MoodType.NEUTRAL:
      return "A balanced state - good for steady progress through your study plan.";
    case MoodType.TIRED:
      return "Take it easy with light review sessions and consider taking breaks.";
    case MoodType.ANXIOUS:
      return "Try some breathing exercises and focus on familiar topics to build confidence.";
    case MoodType.STRESSED:
      return "Break down your tasks into smaller chunks and take regular breaks.";
    case MoodType.CONFUSED:
      return "Perfect time to revisit fundamentals and seek clarification on difficult concepts.";
    case MoodType.OVERWHELMED:
      return "Focus on one small task at a time and celebrate small wins.";
    case MoodType.CURIOUS:
      return "Great mindset for exploring new topics and diving deeper into subjects.";
    case MoodType.SAD:
      return "Be gentle with yourself. Try lighter study activities and consider some self-care.";
    case MoodType.OKAY:
      return "A steady mood for consistent progress. Follow your regular study routine.";
    default:
      return "Keep up the good work with your studies!";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem("userData");
    const parsedData = userData ? JSON.parse(userData) : {};
    parsedData.mood = mood;
    parsedData.moodTimestamp = new Date().toISOString();
    localStorage.setItem("userData", JSON.stringify(parsedData));
  } catch (error) {
    console.error("Error storing mood in localStorage:", error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood;
    }
  } catch (error) {
    console.error("Error getting mood from localStorage:", error);
  }
  return undefined;
};

// Analyze mood trends (simplified version)
export const analyzeMoodTrends = () => {
  // This is a simplified implementation
  // In a real app, you'd analyze historical mood data
  return {
    stressSignals: false,
    improved: false
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  try {
    const currentAllocations = localStorage.getItem('study_time_allocations');
    if (currentAllocations) {
      const allocations = JSON.parse(currentAllocations);
      
      // Adjust allocations based on mood
      switch (mood) {
        case MoodType.FOCUSED:
        case MoodType.MOTIVATED:
          // Increase time for challenging subjects
          allocations.forEach((allocation: any) => {
            if (allocation.subject === 'Mathematics' || allocation.subject === 'Physics') {
              allocation.percentage = Math.min(allocation.percentage + 5, 40);
            }
          });
          break;
        case MoodType.TIRED:
        case MoodType.STRESSED:
          // Reduce overall study intensity
          allocations.forEach((allocation: any) => {
            allocation.percentage = Math.max(allocation.percentage - 3, 15);
          });
          break;
        default:
          // Keep current allocations
          break;
      }
      
      localStorage.setItem('study_time_allocations', JSON.stringify(allocations));
    }
  } catch (error) {
    console.error("Error updating study time allocations:", error);
  }
};

// Get mood recommendation (alias for compatibility)
export const getMoodRecommendation = getStudyRecommendationForMood;
