
import { MoodType } from '@/types/user/base';

export function getMoodEmoji(mood?: MoodType): string {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.CALM:
      return '😌';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.OKAY:
      return '🙂';
    case MoodType.CURIOUS:
      return '🤔';
    case MoodType.TIRED:
      return '😴';
    case MoodType.CONFUSED:
      return '😕';
    case MoodType.SAD:
      return '😢';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.OVERWHELMED:
      return '😫';
    default:
      return '😐';
  }
}

export function getCurrentMoodFromLocalStorage(): MoodType | undefined {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood;
    }
  } catch (e) {
    console.error('Error reading mood from localStorage:', e);
  }
  return undefined;
}

export function storeMoodInLocalStorage(mood: MoodType): void {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({ mood }));
    }
  } catch (e) {
    console.error('Error storing mood in localStorage:', e);
  }
}

// Mood-based study recommendations
export function getMoodBasedStudyRecommendations(mood: MoodType) {
  switch (mood) {
    case MoodType.HAPPY:
      return {
        title: 'Happy Mood',
        description: 'Great mood! This is a perfect time to tackle challenging concepts.',
        recommendations: [
          'Take on challenging problems',
          'Work on difficult concepts',
          'Help peers with tough questions',
          'Try timed practice tests'
        ]
      };
    case MoodType.MOTIVATED:
      return {
        title: 'Motivated Mood',
        description: 'You\'re in peak condition for productive study sessions!',
        recommendations: [
          'Set ambitious goals for today',
          'Tackle difficult subjects',
          'Create comprehensive notes',
          'Complete practice problems'
        ]
      };
    case MoodType.FOCUSED:
      return {
        title: 'Focused Mood',
        description: 'Excellent! Your concentration is high, ideal for deep learning.',
        recommendations: [
          'Work on complex topics',
          'Do deep reading sessions',
          'Practice problem-solving',
          'Create mind maps of concepts'
        ]
      };
    case MoodType.TIRED:
      return {
        title: 'Tired Mood',
        description: 'Consider shorter study sessions with more frequent breaks today.',
        recommendations: [
          'Review familiar material',
          'Take a 10-minute break every 25 minutes',
          'Do light review of flashcards',
          'Listen to educational podcasts or videos'
        ]
      };
    case MoodType.ANXIOUS:
      return {
        title: 'Anxious Mood',
        description: 'Try some breathing exercises before starting your studies.',
        recommendations: [
          'Start with easy topics to build confidence',
          'Do 5 minutes of breathing exercises',
          'Work on organizing notes',
          'Review material you already know well'
        ]
      };
    case MoodType.STRESSED:
      return {
        title: 'Stressed Mood',
        description: 'Focus on review rather than new concepts today.',
        recommendations: [
          'Review familiar topics',
          'Take frequent breaks',
          'Try some light physical exercise',
          'Use visualizations and diagrams'
        ]
      };
    default:
      return {
        title: 'Current Mood',
        description: 'Here are some general study recommendations.',
        recommendations: [
          'Balance new and review material',
          'Take short breaks every 45-60 minutes',
          'Drink water and stay hydrated',
          'Vary your study techniques'
        ]
      };
  }
}
