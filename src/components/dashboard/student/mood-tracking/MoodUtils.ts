
import { MoodType } from "@/types/user/base";

// Function to apply theme changes based on mood
export const applyMoodTheme = (mood: MoodType) => {
  // Remove all existing mood classes from document body
  document.body.classList.remove(
    'mood-motivated',
    'mood-curious',
    'mood-neutral', 
    'mood-tired',
    'mood-stressed',
    'mood-focused',
    'mood-happy',
    'mood-okay',
    'mood-overwhelmed',
    'mood-sad'
  );
  
  // Add new mood class
  document.body.classList.add(`mood-${mood}`);
  
  // Update CSS variables based on mood
  const root = document.documentElement;
  
  // Set mood-specific colors
  const moodColorMap: Record<MoodType, string> = {
    motivated: '#f97316', // orange-500
    curious: '#3b82f6', // blue-500
    neutral: '#6b7280', // gray-500
    tired: '#f59e0b', // amber-500
    stressed: '#ef4444', // red-500
    focused: '#10b981', // emerald-500
    happy: '#22c55e', // green-500
    okay: '#0ea5e9', // sky-500
    overwhelmed: '#a855f7', // purple-500
    sad: '#6366f1' // indigo-500
  };
  
  root.style.setProperty('--mood-color', moodColorMap[mood] || '#6b7280');
};

// Function to get toast content based on mood
export const getMoodToastContent = (mood: MoodType) => {
  const moodMessages: Record<MoodType, { message: string, description: string }> = {
    motivated: {
      message: "You're feeling motivated!",
      description: "We'll focus on challenging content to match your energy."
    },
    curious: {
      message: "Curiosity leads to discovery!",
      description: "We'll show you interesting connections between concepts."
    },
    neutral: {
      message: "Neutral mood noted.",
      description: "We'll present a balanced mix of content types."
    },
    tired: {
      message: "Feeling tired? No problem!",
      description: "We'll suggest shorter study sessions with more breaks."
    },
    stressed: {
      message: "Let's manage that stress.",
      description: "We'll focus on review content and confidence-building exercises."
    },
    focused: {
      message: "In the zone! Great!",
      description: "We'll minimize distractions and help you maintain flow."
    },
    happy: {
      message: "Happiness boosts learning!",
      description: "Let's tackle some challenging concepts while your mood is high."
    },
    okay: {
      message: "Feeling okay is fine!",
      description: "We'll provide a balanced approach to your studies today."
    },
    overwhelmed: {
      message: "Feeling overwhelmed? Let's break it down.",
      description: "We'll focus on small, manageable pieces of content."
    },
    sad: {
      message: "Taking care of your mental health matters.",
      description: "We'll suggest lighter content and well-being activities."
    }
  };
  
  return moodMessages[mood] || { 
    message: "Mood updated", 
    description: "We'll personalize your experience accordingly."
  };
};

// Function to save mood to localStorage
export const saveMoodToLocalStorage = (mood: MoodType) => {
  // Save to userData
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    parsedData.mood = mood;
    localStorage.setItem("userData", JSON.stringify(parsedData));
  }
  
  // Save last mood log with timestamp
  localStorage.setItem('lastMoodLog', JSON.stringify({
    mood,
    timestamp: new Date().toISOString()
  }));
};

// Function to get the appropriate background class based on mood
export const getMoodBackgroundClass = (mood?: MoodType): string => {
  if (!mood) return '';
  
  const moodClassMap: Record<MoodType, string> = {
    motivated: 'bg-orange-50 dark:bg-orange-900/20',
    curious: 'bg-blue-50 dark:bg-blue-900/20',
    neutral: 'bg-gray-50 dark:bg-gray-800/50',
    tired: 'bg-amber-50 dark:bg-amber-900/20',
    stressed: 'bg-red-50 dark:bg-red-900/20',
    focused: 'bg-emerald-50 dark:bg-emerald-900/20',
    happy: 'bg-green-50 dark:bg-green-900/20',
    okay: 'bg-sky-50 dark:bg-sky-900/20',
    overwhelmed: 'bg-purple-50 dark:bg-purple-900/20',
    sad: 'bg-indigo-50 dark:bg-indigo-900/20'
  };
  
  return moodClassMap[mood] || '';
};

// Get button variant based on mood
export const getMoodButtonVariant = (mood?: MoodType): string => {
  if (!mood) return 'outline';
  
  const moodVariantMap: Record<MoodType, string> = {
    motivated: 'orange',
    curious: 'blue',
    neutral: 'ghost',
    tired: 'amber',
    stressed: 'destructive',
    focused: 'emerald',
    happy: 'green',
    okay: 'sky',
    overwhelmed: 'purple',
    sad: 'indigo'
  };
  
  return moodVariantMap[mood] || 'outline';
};

// Get mood display text
export const getMoodDisplayText = (mood?: MoodType): string => {
  if (!mood) return "Log Today's Mood";
  
  const moodDisplay = mood.charAt(0).toUpperCase() + mood.slice(1);
  return `I'm Feeling ${moodDisplay}`;
};
