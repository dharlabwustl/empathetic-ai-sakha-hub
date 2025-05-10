
import { MoodType } from '@/types/user/base';

// Function to store the current mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({ mood }));
    }
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

// Function to get the current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | null => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        return parsedData.mood as MoodType;
      }
    }
    return null;
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
    return null;
  }
};

// Function to get emoji based on mood
export const getMoodEmoji = (mood: MoodType | null): string => {
  switch (mood) {
    case MoodType.Happy:
      return '😊';
    case MoodType.Motivated:
      return '💪';
    case MoodType.Focused:
      return '🧠';
    case MoodType.Confused:
      return '🤔';
    case MoodType.Stressed:
      return '😓';
    case MoodType.Tired:
      return '😴';
    case MoodType.Confident:
      return '😎';
    case MoodType.Anxious:
      return '😰';
    case MoodType.Calm:
      return '😌';
    default:
      return '😐';
  }
};

// Get a color based on the mood
export const getMoodColor = (mood: MoodType | null): string => {
  switch (mood) {
    case MoodType.Happy:
      return '#4CAF50';
    case MoodType.Motivated:
      return '#2196F3';
    case MoodType.Focused:
      return '#9C27B0';
    case MoodType.Confused:
      return '#FF9800';
    case MoodType.Stressed:
      return '#F44336';
    case MoodType.Tired:
      return '#795548';
    case MoodType.Confident:
      return '#673AB7';
    case MoodType.Anxious:
      return '#FF5722';
    case MoodType.Calm:
      return '#00BCD4';
    default:
      return '#9E9E9E';
  }
};
