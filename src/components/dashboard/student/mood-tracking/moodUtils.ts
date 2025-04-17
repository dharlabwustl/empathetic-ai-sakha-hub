
import { MoodType } from "@/types/user/base";
import { Smile, Zap, Target, Search, Frown, Battery, AlarmClock, AlertTriangle, Shell, ThumbsUp } from 'lucide-react';

// Function to get a display name for each mood
export const getMoodDisplayName = (mood: MoodType): string => {
  switch (mood) {
    case "happy": return "Happy";
    case "motivated": return "Motivated";
    case "focused": return "Focused";
    case "curious": return "Curious";
    case "neutral": return "Neutral";
    case "tired": return "Tired";
    case "stressed": return "Stressed";
    case "sad": return "Sad";
    case "overwhelmed": return "Overwhelmed";
    case "okay": return "Okay";
    default: return "Neutral";
  }
};

// Function to get motivational quotes based on mood
export const getMoodMotivationalQuote = (mood: MoodType): string => {
  switch (mood) {
    case "happy":
      return "Your positive energy is contagious! Keep sharing that smile!";
    case "motivated":
      return "You're unstoppable when you're motivated like this!";
    case "focused":
      return "Your concentration is your superpower. Use it wisely!";
    case "curious":
      return "Curiosity leads to wonderful discoveries. Keep exploring!";
    case "neutral":
      return "Every day is a new opportunity to grow and learn!";
    case "tired":
      return "Rest is important. Take breaks to come back stronger!";
    case "stressed":
      return "Take a deep breath. You've overcome challenges before!";
    case "sad":
      return "It's okay to feel down sometimes. Better days are coming!";
    case "overwhelmed":
      return "Break it down into small steps. You don't have to do everything at once!";
    case "okay":
      return "You're doing fine! One step at a time.";
    default:
      return "Every moment is a fresh beginning. Make it count!";
  }
};

// Function to get toast content based on mood
export const getMoodToastContent = (mood: MoodType): { title: string; description: string } => {
  switch (mood) {
    case "happy":
      return {
        title: "Happy mood logged!",
        description: "Your positive energy is contagious!"
      };
    case "motivated":
      return {
        title: "Motivated mood logged!",
        description: "You're ready to tackle any challenge!"
      };
    case "focused":
      return {
        title: "Focused mood logged!",
        description: "Your concentration will lead to great results!"
      };
    case "curious":
      return {
        title: "Curious mood logged!",
        description: "Your thirst for knowledge is inspiring!"
      };
    case "neutral":
      return {
        title: "Neutral mood logged",
        description: "Ready for whatever comes your way today."
      };
    case "tired":
      return {
        title: "Tired mood logged",
        description: "Remember to take breaks and rest when needed."
      };
    case "stressed":
      return {
        title: "Stressed mood logged",
        description: "Take a deep breath. You've got this!"
      };
    case "sad":
      return {
        title: "Sad mood logged",
        description: "It's okay to not be okay sometimes."
      };
    case "overwhelmed":
      return {
        title: "Overwhelmed mood logged",
        description: "Break tasks into smaller steps. One at a time."
      };
    case "okay":
      return {
        title: "Okay mood logged",
        description: "Sometimes being okay is just fine."
      };
    default:
      return {
        title: "Mood updated",
        description: "Your mood has been recorded."
      };
  }
};

// Function to get icon based on mood
export const getMoodIcon = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return Smile;
    case "motivated":
      return Zap;
    case "focused":
      return Target;
    case "curious":
      return Search;
    case "neutral":
      return ThumbsUp;
    case "tired":
      return Battery;
    case "stressed":
      return AlarmClock;
    case "sad":
      return Frown;
    case "overwhelmed":
      return AlertTriangle;
    case "okay":
      return Shell;
    default:
      return Smile;
  }
};

// Function to apply mood theme to the document
export const applyMoodTheme = (mood: MoodType): void => {
  // Remove all existing mood classes
  document.body.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.body.classList.remove(className);
    }
  });
  
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
};

// Function to save mood to localStorage
export const saveMoodToLocalStorage = (mood: MoodType): void => {
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
    console.error("Error saving mood to localStorage", error);
  }
};
