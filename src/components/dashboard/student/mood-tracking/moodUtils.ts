
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Log Mood";
  
  // Convert from enum to display name
  switch (mood) {
    case MoodType.Energetic:
      return "Energetic";
    case MoodType.Balanced:
      return "Balanced";
    case MoodType.Distracted:
      return "Distracted";
    case MoodType.Tired:
      return "Tired";
    case MoodType.Anxious:
      return "Anxious";
    case MoodType.Happy:
      return "Happy";
    case MoodType.Okay:
      return "Okay";
    case MoodType.Focused:
      return "Focused";
    case MoodType.Overwhelmed:
      return "Overwhelmed";
    case MoodType.Sad:
      return "Sad";
    case MoodType.Motivated:
      return "Motivated";
    case MoodType.Curious:
      return "Curious";
    case MoodType.Neutral:
      return "Neutral";
    case MoodType.Stressed:
      return "Stressed";
    default:
      return "Unknown";
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-50 text-gray-500";
  
  switch (mood) {
    case MoodType.Energetic:
    case MoodType.Happy:
    case MoodType.Motivated:
      return "bg-green-50 text-green-600";
    case MoodType.Balanced:
    case MoodType.Focused:
    case MoodType.Okay:
      return "bg-blue-50 text-blue-600";
    case MoodType.Distracted:
    case MoodType.Neutral:
      return "bg-yellow-50 text-yellow-600";
    case MoodType.Tired:
    case MoodType.Anxious:
    case MoodType.Stressed:
      return "bg-orange-50 text-orange-600";
    case MoodType.Overwhelmed:
    case MoodType.Sad:
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-500";
  }
};

export const getMoodToastContent = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Energetic:
    case MoodType.Happy:
    case MoodType.Motivated:
      return "Great mood! This is a perfect time to tackle challenging topics.";
    case MoodType.Balanced:
    case MoodType.Focused:
      return "You're in a balanced state. Good time for steady progress on your tasks.";
    case MoodType.Okay:
    case MoodType.Neutral:
      return "You're feeling neutral. Consider starting with something interesting to boost your mood.";
    case MoodType.Distracted:
      return "Feeling distracted? Try the Pomodoro technique - 25 minutes of focus followed by a 5-minute break.";
    case MoodType.Tired:
      return "You seem tired. Consider a short 15-minute power nap or a brief walk outside.";
    case MoodType.Anxious:
    case MoodType.Stressed:
    case MoodType.Overwhelmed:
      return "Take a few deep breaths. Start with something simple to build momentum.";
    case MoodType.Sad:
      return "It's okay to not feel your best. Take care of yourself first - maybe try a mood-boosting activity.";
    default:
      return "Mood logged! We'll personalize your experience based on how you're feeling.";
  }
};

export const applyMoodTheme = (mood: MoodType): void => {
  // This function would apply CSS variables or theme changes based on user mood
  console.log(`Applying theme for mood: ${mood}`);
  // Implementation would depend on your theming system
};

export const saveMoodToLocalStorage = (mood: MoodType): void => {
  localStorage.setItem('currentMood', mood);
  
  // Also save to userData if it exists
  const userData = localStorage.getItem('userData');
  if (userData) {
    const parsedData = JSON.parse(userData);
    parsedData.mood = mood;
    localStorage.setItem('userData', JSON.stringify(parsedData));
  }
};
