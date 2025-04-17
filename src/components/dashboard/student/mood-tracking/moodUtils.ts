
import { MoodType } from "@/types/user/base";

// Sanitize mood for CSS class names
export const sanitizeMoodClass = (mood?: MoodType): string => {
  if (!mood) return '';
  return mood.toLowerCase().replace(/\s+/g, '-');
};

// Get toast content based on mood
export const getMoodToastContent = (mood: MoodType): { message: string; description: string } => {
  switch (mood) {
    case 'motivated':
      return {
        message: "You're on fire today!",
        description: "Let's channel this energy into something amazing."
      };
    case 'curious':
      return {
        message: "Curiosity is your superpower.",
        description: "Want to explore something new?"
      };
    case 'neutral':
      return {
        message: "It's okay to just be.",
        description: "Small steps still count."
      };
    case 'tired':
      return {
        message: "Rest is part of growth.",
        description: "Take it slow, you're doing just fine."
      };
    case 'stressed':
      return {
        message: "It's okay to feel overwhelmed.",
        description: "Let's take a moment together."
      };
    case 'focused':
      return {
        message: "Your concentration is impressive!",
        description: "Let's make the most of this clarity."
      };
    case 'happy':
      return {
        message: "That smile looks great on you!",
        description: "Let's make this energy count."
      };
    case 'okay':
      return {
        message: "You're doing fine.",
        description: "One step at a time."
      };
    case 'overwhelmed':
      return {
        message: "It's okay to feel overwhelmed.",
        description: "We can break things down into smaller steps."
      };
    case 'sad':
      return {
        message: "It's okay to not be okay.",
        description: "Let's find something to brighten your day."
      };
    default:
      return {
        message: "Thanks for sharing how you feel.",
        description: "We'll tailor your experience accordingly."
      };
  }
};

// Get valid mood CSS classes
export const getValidMoodClasses = (): string[] => {
  return [
    'mood-motivated', 'mood-curious', 'mood-neutral', 
    'mood-tired', 'mood-stressed', 'mood-focused', 
    'mood-happy', 'mood-okay', 'mood-overwhelmed', 'mood-sad'
  ];
};

// Apply mood theme to document
export const applyMoodTheme = (mood?: MoodType): void => {
  if (!mood) return;
  
  // Get all valid mood classes
  const validMoodClasses = getValidMoodClasses();
  
  // Remove all mood classes first
  document.body.classList.remove(...validMoodClasses);
  
  // Add only the current valid mood class
  const sanitizedMoodClass = `mood-${sanitizeMoodClass(mood)}`;
  document.body.classList.add(sanitizedMoodClass);
};

// Save mood to localStorage
export const saveMoodToLocalStorage = (mood: MoodType): void => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    parsedData.mood = mood;
    localStorage.setItem("userData", JSON.stringify(parsedData));
  } else {
    localStorage.setItem("userData", JSON.stringify({ mood }));
  }
};
