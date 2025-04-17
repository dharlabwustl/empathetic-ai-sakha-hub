
import { MoodType } from "@/types/user/base";

// Apply theme changes based on mood
export const applyMoodTheme = (mood: MoodType) => {
  // Remove any existing mood classes
  document.body.classList.forEach(cls => {
    if (cls.startsWith('mood-')) {
      document.body.classList.remove(cls);
    }
  });
  
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
};

// Save mood to localStorage for persistence
export const saveMoodToLocalStorage = (mood: MoodType) => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  } catch (error) {
    console.error("Failed to save mood to localStorage:", error);
  }
};

// Get toast content based on selected mood
export const getMoodToastContent = (mood: MoodType): { message: string, description: string } => {
  switch (mood) {
    case 'happy':
      return {
        message: "You're feeling happy!",
        description: "Great mood! This is the perfect time for challenging tasks."
      };
    case 'motivated':
      return {
        message: "You're feeling motivated!",
        description: "Excellent! We'll suggest some productive study activities."
      };
    case 'curious':
      return {
        message: "You're feeling curious!",
        description: "Perfect time to explore new concepts and ideas."
      };
    case 'focused':
      return {
        message: "You're feeling focused!",
        description: "Great time for deep work and problem-solving."
      };
    case 'okay':
      return {
        message: "You're feeling okay",
        description: "A balanced mood. Good for steady progress."
      };
    case 'neutral':
      return {
        message: "You're feeling neutral",
        description: "A good time for review and consolidation."
      };
    case 'tired':
      return {
        message: "You're feeling tired",
        description: "We'll suggest lighter study activities and breaks."
      };
    case 'stressed':
      return {
        message: "You're feeling stressed",
        description: "Let's focus on manageable tasks and relaxation techniques."
      };
    case 'overwhelmed':
      return {
        message: "You're feeling overwhelmed",
        description: "We'll help you break down tasks and manage your workload."
      };
    case 'sad':
      return {
        message: "You're feeling sad",
        description: "Consider taking a short break or try some mood-lifting activities."
      };
    default:
      return {
        message: "Mood logged successfully",
        description: "Your study recommendations will adjust accordingly."
      };
  }
};
