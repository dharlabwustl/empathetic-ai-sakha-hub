
import { MoodType } from "@/types/user/base";

/**
 * Get the display name for a mood
 * @param mood The mood type
 * @returns A human-readable display name
 */
export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "How are you feeling?";
  
  switch (mood) {
    case "happy": return "Happy";
    case "sad": return "Sad";
    case "tired": return "Tired";
    case "motivated": return "Motivated";
    case "focused": return "Focused";
    case "stressed": return "Stressed";
    case "overwhelmed": return "Overwhelmed";
    case "curious": return "Curious";
    case "neutral": return "Neutral";
    case "okay": return "Okay";
    default: return "How are you feeling?";
  }
};

/**
 * Get the color scheme for a mood
 * @param mood The mood type
 * @returns CSS class string for the mood's color
 */
export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-100 text-gray-800 border-gray-200";
  
  switch (mood) {
    case "happy": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "sad": return "bg-blue-100 text-blue-800 border-blue-200";
    case "tired": return "bg-orange-100 text-orange-800 border-orange-200";
    case "motivated": return "bg-purple-100 text-purple-800 border-purple-200";
    case "focused": return "bg-green-100 text-green-800 border-green-200";
    case "stressed": return "bg-red-100 text-red-800 border-red-200";
    case "overwhelmed": return "bg-pink-100 text-pink-800 border-pink-200";
    case "curious": return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "neutral": return "bg-gray-100 text-gray-800 border-gray-200";
    case "okay": return "bg-teal-100 text-teal-800 border-teal-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Get toast message content based on the selected mood
 * @param mood The mood type
 * @returns An object with toast title and description
 */
export const getMoodToastContent = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return {
        title: "Great to hear you're happy!",
        description: "Your positive energy will help you learn better today."
      };
    case "sad":
      return {
        title: "Sorry to hear you're feeling sad",
        description: "Take some time for yourself today. Learning can wait."
      };
    case "tired":
      return {
        title: "Feeling tired is normal",
        description: "Consider taking short breaks between study sessions."
      };
    case "motivated":
      return {
        title: "You're feeling motivated!",
        description: "This is a great time to tackle challenging topics."
      };
    case "focused":
      return {
        title: "You're in the zone!",
        description: "Make the most of your focus with deep work sessions."
      };
    case "stressed":
      return {
        title: "Feeling stressed",
        description: "Try some breathing exercises before continuing your studies."
      };
    case "overwhelmed":
      return {
        title: "It's okay to feel overwhelmed",
        description: "Break down your tasks into smaller steps."
      };
    case "curious":
      return {
        title: "Curiosity drives learning!",
        description: "Explore new topics that interest you today."
      };
    case "neutral":
      return {
        title: "Feeling neutral",
        description: "A balanced state can be good for consistent study."
      };
    case "okay":
      return {
        title: "Feeling okay",
        description: "Even on average days, you can make progress."
      };
    default:
      return {
        title: "Mood updated",
        description: "We've recorded your current mood."
      };
  }
};

/**
 * Save the current mood to local storage
 * @param mood The mood to save
 */
export const saveMoodToLocalStorage = (mood: MoodType) => {
  try {
    // Get existing user data or create new object
    const userData = localStorage.getItem('userData');
    const parsedData = userData ? JSON.parse(userData) : {};
    
    // Update mood and timestamp
    parsedData.mood = mood;
    parsedData.moodTimestamp = new Date().toISOString();
    
    // Save back to localStorage
    localStorage.setItem('userData', JSON.stringify(parsedData));
    
    return true;
  } catch (error) {
    console.error('Error saving mood to localStorage:', error);
    return false;
  }
};

/**
 * Apply theme changes based on the user's mood
 * @param mood The current mood
 */
export const applyMoodTheme = (mood: MoodType) => {
  // Remove all mood classes
  document.documentElement.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.documentElement.classList.remove(className);
    }
  });
  
  // Add the new mood class
  document.documentElement.classList.add(`mood-${mood}`);
};

/**
 * Get personalized content based on the user's mood
 * @param mood The current mood
 * @returns Content object with title and message
 */
export const getMoodSpecificContent = (mood: MoodType) => {
  switch (mood) {
    case "happy":
      return {
        title: "Keep the positive energy!",
        message: "Your happy mood enhances creativity and learning. Great time to tackle challenging subjects."
      };
    case "sad":
      return {
        title: "We're here for you",
        message: "It's okay to feel down sometimes. Try some light review instead of new material today."
      };
    case "tired":
      return {
        title: "Need a break?",
        message: "Try the Pomodoro technique with shorter study sessions and longer breaks today."
      };
    case "motivated":
      return {
        title: "Channel that motivation!",
        message: "This is the perfect time to work on your most challenging topics."
      };
    case "focused":
      return {
        title: "You're in the zone!",
        message: "Minimize distractions and make the most of your focused state."
      };
    case "stressed":
      return {
        title: "Let's manage that stress",
        message: "Try a 5-minute breathing exercise before your next study session."
      };
    case "overwhelmed":
      return {
        title: "One step at a time",
        message: "Break your work into smaller chunks and celebrate small wins today."
      };
    case "curious":
      return {
        title: "Feed your curiosity!",
        message: "Explore connections between topics you're learning about today."
      };
    case "neutral":
      return {
        title: "Steady progress",
        message: "A neutral state can be perfect for consistent, methodical learning."
      };
    case "okay":
      return {
        title: "You're doing fine",
        message: "Every study session counts, even when you're just feeling okay."
      };
    default:
      return {
        title: "Ready to learn",
        message: "Every study session brings you closer to your goals."
      };
  }
};
