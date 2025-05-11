
import { MoodType } from '@/types/user/base';

// Get emoji for a mood
export const getMoodEmoji = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.FOCUSED:
      return '🧐';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.TIRED:
      return '😴';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.CONFUSED:
      return '🤔';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.OKAY:
      return '👍';
    case MoodType.OVERWHELMED:
      return '😩';
    case MoodType.CURIOUS:
      return '🤓';
    case MoodType.SAD:
      return '😔';
    default:
      return '😐';
  }
};

// Get label for a mood
export const getMoodLabel = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.CONFUSED:
      return 'Confused';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.OKAY:
      return 'Okay';
    case MoodType.OVERWHELMED:
      return 'Overwhelmed';
    case MoodType.CURIOUS:
      return 'Curious';
    case MoodType.SAD:
      return 'Sad';
    default:
      return 'Neutral';
  }
};

// Store current mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Store directly
    localStorage.setItem('user_mood', mood);
    
    // Also update in userData if available
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    }
    
    // Track mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString()
    };
    
    // Get existing history
    let moodHistory = [];
    try {
      const storedHistory = localStorage.getItem('mood_history');
      if (storedHistory) {
        moodHistory = JSON.parse(storedHistory);
      }
    } catch (e) {
      console.error('Error parsing mood history:', e);
    }
    
    // Add new entry and store
    moodHistory.push(moodEntry);
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
    
    console.log(`Mood set to ${mood} and saved to storage`);
  } catch (e) {
    console.error('Error saving mood to localStorage:', e);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    // First check direct mood storage
    const storedMood = localStorage.getItem('user_mood') as MoodType | null;
    if (storedMood) {
      return storedMood;
    }
    
    // If not found, check userData
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        return parsedData.mood as MoodType;
      }
    }
    
    // Default fallback
    return MoodType.MOTIVATED;
  } catch (e) {
    console.error('Error retrieving mood from localStorage:', e);
    return MoodType.MOTIVATED;
  }
};

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = () => {
  try {
    const storedHistory = localStorage.getItem('mood_history');
    if (storedHistory) {
      return JSON.parse(storedHistory);
    }
    return [];
  } catch (e) {
    console.error('Error retrieving mood history from localStorage:', e);
    return [];
  }
};

// Get CSS class for mood color
export const getMoodColorClass = (mood?: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return 'bg-green-100 text-green-800';
    case MoodType.FOCUSED:
      return 'bg-blue-100 text-blue-800';
    case MoodType.MOTIVATED:
      return 'bg-purple-100 text-purple-800';
    case MoodType.TIRED:
      return 'bg-gray-100 text-gray-800';
    case MoodType.STRESSED:
      return 'bg-red-100 text-red-800';
    case MoodType.CONFUSED:
      return 'bg-yellow-100 text-yellow-800';
    case MoodType.ANXIOUS:
      return 'bg-orange-100 text-orange-800';
    case MoodType.NEUTRAL:
      return 'bg-gray-100 text-gray-800';
    case MoodType.OKAY:
      return 'bg-teal-100 text-teal-800';
    case MoodType.OVERWHELMED:
      return 'bg-pink-100 text-pink-800';
    case MoodType.CURIOUS:
      return 'bg-indigo-100 text-indigo-800';
    case MoodType.SAD:
      return 'bg-slate-100 text-slate-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get mood recommendations based on current mood
export const getMoodRecommendations = (mood?: MoodType) => {
  switch (mood) {
    case MoodType.STRESSED:
    case MoodType.ANXIOUS:
    case MoodType.OVERWHELMED:
      return {
        activities: ['Take a 5-minute breathing break', 'Go for a short walk', 'Listen to calming music'],
        studyTips: ['Break tasks into smaller chunks', 'Use the Pomodoro technique', 'Focus on one topic at a time'],
        message: 'Remember to take breaks and be kind to yourself. You're doing great!'
      };
    case MoodType.TIRED:
      return {
        activities: ['Take a power nap (20 mins)', 'Have a healthy snack', 'Do some light stretching'],
        studyTips: ['Work on easier topics', 'Use active learning methods', 'Study in intervals'],
        message: 'Rest is important for effective learning. Listen to your body.'
      };
    case MoodType.SAD:
      return {
        activities: ['Talk to a friend', 'Write in a journal', 'Do something you enjoy'],
        studyTips: ['Start with subjects you enjoy', 'Set smaller, achievable goals', 'Reward yourself for progress'],
        message: 'Your feelings are valid. Consider reaching out to someone you trust.'
      };
    case MoodType.CONFUSED:
      return {
        activities: ['Watch an explanatory video', 'Try to explain the concept to yourself', 'Look for alternative resources'],
        studyTips: ['Break down complex topics', 'Use diagrams or mind maps', 'Find real-world examples'],
        message: 'Confusion is a natural part of learning. Be patient with yourself.'
      };
    case MoodType.HAPPY:
    case MoodType.MOTIVATED:
    case MoodType.FOCUSED:
      return {
        activities: ['Tackle challenging topics', 'Work on long-term projects', 'Help peers with difficult concepts'],
        studyTips: ['Aim for deep learning', 'Connect concepts across subjects', 'Test yourself with practice questions'],
        message: 'Great! Use this positive energy to make significant progress!'
      };
    default:
      return {
        activities: ['Set clear goals for today', 'Try a new study method', 'Take regular short breaks'],
        studyTips: ['Mix up your study topics', 'Use active recall techniques', 'Review recent material'],
        message: 'Remember that progress is more important than perfection!'
      };
  }
};
