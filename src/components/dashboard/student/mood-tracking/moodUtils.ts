import { MoodType } from '@/types/user/base';

// Mood emoji mappings
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return '😊';
  
  switch (mood) {
    case MoodType.HAPPY: return '😊';
    case MoodType.MOTIVATED: return '🚀';
    case MoodType.FOCUSED: return '🎯';
    case MoodType.NEUTRAL: return '😐';
    case MoodType.TIRED: return '😴';
    case MoodType.ANXIOUS: return '😰';
    case MoodType.STRESSED: return '😫';
    case MoodType.SAD: return '😢';
    case MoodType.CONFUSED: return '😕';
    case MoodType.OVERWHELMED: return '🤯';
    case MoodType.CURIOUS: return '🤔';
    case MoodType.OKAY: return '👍';
    case MoodType.CALM: return '😌';
    default: return '😊';
  }
};

// Mood label mappings
export const getMoodLabel = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY: return 'Happy';
    case MoodType.MOTIVATED: return 'Motivated';
    case MoodType.FOCUSED: return 'Focused';
    case MoodType.NEUTRAL: return 'Neutral';
    case MoodType.TIRED: return 'Tired';
    case MoodType.ANXIOUS: return 'Anxious';
    case MoodType.STRESSED: return 'Stressed';
    case MoodType.SAD: return 'Sad';
    case MoodType.CONFUSED: return 'Confused';
    case MoodType.OVERWHELMED: return 'Overwhelmed';
    case MoodType.CURIOUS: return 'Curious';
    case MoodType.OKAY: return 'Okay';
    case MoodType.CALM: return 'Calm';
    default: return 'Unknown';
  }
};

// Get study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "You're in a great mood! This is perfect for tackling challenging topics or group study sessions.";
    case MoodType.MOTIVATED:
      return "Your motivation is high! Set ambitious goals and dive into complex subjects.";
    case MoodType.FOCUSED:
      return "Excellent focus! Use this time for deep learning and concentrated study sessions.";
    case MoodType.TIRED:
      return "Take it easy with light review or consider a short break to recharge.";
    case MoodType.STRESSED:
      return "Break down tasks into smaller chunks and try some breathing exercises first.";
    case MoodType.ANXIOUS:
      return "Start with familiar topics to build confidence, then gradually tackle new material.";
    case MoodType.OVERWHELMED:
      return "Focus on just one subject at a time and prioritize the most important tasks.";
    case MoodType.CONFUSED:
      return "Revisit fundamentals and seek clarification on difficult concepts.";
    case MoodType.SAD:
      return "Try engaging with your favorite subjects or use creative study methods.";
    case MoodType.CURIOUS:
      return "Perfect time to explore new topics and dive deeper into interesting concepts!";
    case MoodType.CALM:
      return "Use this peaceful state for thoughtful analysis and connecting concepts.";
    default:
      return "Continue with your planned study schedule.";
  }
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType) => {
  const moodData = {
    mood,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('currentMood', JSON.stringify(moodData));
  
  // Store in mood history
  const moodHistory = getMoodHistory();
  moodHistory.push(moodData);
  // Keep only last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.splice(0, moodHistory.length - 30);
  }
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const stored = localStorage.getItem('currentMood');
    if (stored) {
      const data = JSON.parse(stored);
      return data.mood;
    }
  } catch (error) {
    console.error('Error reading mood from localStorage:', error);
  }
  return undefined;
};

// Get mood history
export const getMoodHistory = (): Array<{ mood: MoodType; timestamp: string }> => {
  try {
    const stored = localStorage.getItem('moodHistory');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading mood history:', error);
    return [];
  }
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  const history = getMoodHistory();
  const recentMoods = history.slice(-7); // Last 7 entries
  
  const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
  const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
  
  const recentStressCount = recentMoods.filter(entry => 
    stressfulMoods.includes(entry.mood)
  ).length;
  
  const recentPositiveCount = recentMoods.filter(entry => 
    positiveMoods.includes(entry.mood)
  ).length;
  
  return {
    stressSignals: recentStressCount >= 3,
    improved: recentPositiveCount > recentStressCount,
    trend: recentPositiveCount > recentStressCount ? 'improving' : 
           recentStressCount > recentPositiveCount ? 'declining' : 'stable'
  };
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const baseAllocations = {
    "Physics": 60,
    "Chemistry": 60, 
    "Biology": 60,
    "Mathematics": 60
  };
  
  let adjustedAllocations = { ...baseAllocations };
  
  switch (mood) {
    case MoodType.FOCUSED:
    case MoodType.MOTIVATED:
      // Increase time for challenging subjects
      adjustedAllocations.Physics += 15;
      adjustedAllocations.Mathematics += 15;
      break;
      
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier review
      Object.keys(adjustedAllocations).forEach(subject => {
        adjustedAllocations[subject] = Math.max(30, adjustedAllocations[subject] - 20);
      });
      adjustedAllocations.Biology += 10; // Biology often easier to review
      break;
      
    case MoodType.ANXIOUS:
    case MoodType.OVERWHELMED:
      // Focus on one subject at a time, reduce total load
      Object.keys(adjustedAllocations).forEach(subject => {
        adjustedAllocations[subject] = Math.max(25, adjustedAllocations[subject] - 25);
      });
      break;
      
    case MoodType.CURIOUS:
    case MoodType.HAPPY:
      // Balanced approach with slight increase
      Object.keys(adjustedAllocations).forEach(subject => {
        adjustedAllocations[subject] += 5;
      });
      break;
  }
  
  localStorage.setItem('moodAdjustedAllocations', JSON.stringify({
    allocations: adjustedAllocations,
    mood,
    timestamp: new Date().toISOString()
  }));
  
  return adjustedAllocations;
};

// Get mood recommendation for study plan
export const getMoodRecommendation = (mood: MoodType): string => {
  return getStudyRecommendationForMood(mood);
};
