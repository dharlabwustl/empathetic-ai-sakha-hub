
import { MoodType } from '@/types/user/base';

// Get emoji for a specific mood
export const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.TIRED:
      return '😴';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.ANXIOUS:
      return '😨';
    case MoodType.CONFUSED:
      return '🤔';
    case MoodType.OVERWHELMED:
      return '😰';
    case MoodType.OKAY:
      return '😐';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.SAD:
      return '😔';
    case MoodType.CALM:
      return '😌';
    case MoodType.CURIOUS:
      return '🧐';
    default:
      return '😐';
  }
};

// Get label for a specific mood
export const getMoodLabel = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.CONFUSED:
      return 'Confused';
    case MoodType.OVERWHELMED:
      return 'Overwhelmed';
    case MoodType.OKAY:
      return 'Okay';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.SAD:
      return 'Sad';
    case MoodType.CALM:
      return 'Calm';
    case MoodType.CURIOUS:
      return 'Curious';
    default:
      return 'Select Mood';
  }
};

// Get study recommendation for a specific mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'Great mood for tackling new concepts! Try accelerating your learning today.';
    case MoodType.MOTIVATED:
      return 'Perfect time to work on challenging topics or practice tests.';
    case MoodType.FOCUSED:
      return 'Ideal state for deep work. Consider tackling complex problems.';
    case MoodType.TIRED:
      return 'Try passive learning like watching video lessons or reviewing flashcards.';
    case MoodType.STRESSED:
      return 'Start with a quick mindfulness session, then review known material.';
    case MoodType.ANXIOUS:
      return 'Consider a short break or switch to easier topics for now.';
    case MoodType.CONFUSED:
      return 'Focus on reviewing fundamentals and clarifying concepts.';
    case MoodType.OVERWHELMED:
      return 'Break down your tasks into smaller chunks and tackle one at a time.';
    case MoodType.OKAY:
    case MoodType.NEUTRAL:
      return 'Good time for balanced study - mix review and new content.';
    case MoodType.SAD:
      return 'Start with something you enjoy studying to build momentum.';
    case MoodType.CALM:
      return 'Perfect state for methodical learning and connecting concepts.';
    case MoodType.CURIOUS:
      return 'Great time to explore new topics or dive deeper into interesting concepts.';
    default:
      return 'Selecting your mood helps personalize your study experience.';
  }
};

// Analyze mood trends (mock implementation)
export const analyzeMoodTrends = () => {
  // In a real implementation, this would analyze stored mood data
  // For now, we'll return some mock analysis
  return {
    stressSignals: Math.random() > 0.8, // 20% chance to show stress signals
    improved: Math.random() > 0.5,      // 50% chance to show improvement
    consistent: Math.random() > 0.7     // 30% chance to show consistency
  };
};

// Update study time allocations based on mood (mock implementation)
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  // In a real implementation, this would update study plan time allocations
  console.log(`Updating study time allocations based on mood: ${mood}`);
  
  // Example allocation adjustments based on mood
  const allocations = {
    [MoodType.TIRED]: {
      flashcards: 0.4,
      videos: 0.4,
      practice: 0.2
    },
    [MoodType.MOTIVATED]: {
      flashcards: 0.2,
      videos: 0.2,
      practice: 0.6
    },
    [MoodType.STRESSED]: {
      flashcards: 0.5,
      videos: 0.3,
      practice: 0.2
    }
  };
  
  return allocations[mood] || {
    flashcards: 0.33,
    videos: 0.33,
    practice: 0.34
  };
};

// Get color theme for a specific mood
export const getMoodTheme = (mood?: MoodType) => {
  switch (mood) {
    case MoodType.HAPPY:
      return {
        primary: '#FFD700',
        secondary: '#FFEB3B',
        gradient: 'from-yellow-300 to-amber-200'
      };
    case MoodType.MOTIVATED:
      return {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        gradient: 'from-green-400 to-emerald-300'
      };
    case MoodType.FOCUSED:
      return {
        primary: '#2196F3',
        secondary: '#03A9F4',
        gradient: 'from-blue-400 to-cyan-300'
      };
    case MoodType.CALM:
      return {
        primary: '#009688',
        secondary: '#4DB6AC',
        gradient: 'from-teal-400 to-green-300'
      };
    default:
      return {
        primary: '#9C27B0',
        secondary: '#BA68C8',
        gradient: 'from-purple-400 to-pink-300'
      };
  }
};
