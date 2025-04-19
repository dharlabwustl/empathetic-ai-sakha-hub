import { MoodType } from "@/types/user/base";

// Utility function to get a CSS class name from a mood
export const getMoodClassName = (mood?: MoodType): string => {
  if (!mood) return '';
  
  // Make sure we only use valid CSS class names (no spaces, no emojis)
  return `mood-${mood}`;
};

// Get display name for mood
export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Log Today's Mood";
  
  const moodMap: Record<string, string> = {
    motivated: "Motivated",
    curious: "Curious",
    neutral: "Neutral",
    tired: "Tired",
    stressed: "Stressed",
    focused: "Focused",
    happy: "Happy",
    okay: "Okay",
    overwhelmed: "Overwhelmed",
    sad: "Sad"
  };
  
  return moodMap[mood] || "Log Today's Mood";
};

// Get mood color based on mood type
export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
  
  const moodColorMap: Record<string, string> = {
    motivated: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
    curious: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
    neutral: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
    tired: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    stressed: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300",
    focused: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
    happy: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300",
    okay: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
    overwhelmed: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
    sad: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300"
  };
  
  return moodColorMap[mood] || "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
};

// Get energy level based on mood
export const getMoodEnergyLevel = (mood?: MoodType): number => {
  if (!mood) return 5; // Default neutral energy
  
  const energyMap: Record<string, number> = {
    motivated: 9,
    focused: 8,
    happy: 8,
    curious: 7,
    okay: 6,
    neutral: 5,
    tired: 3,
    stressed: 4,
    overwhelmed: 2,
    sad: 2
  };
  
  return energyMap[mood] || 5;
};

// Get study session recommendations based on energy level
export const getStudyRecommendations = (energyLevel: number): {
  sessionLength: string;
  sessionType: string;
  breakFrequency: string;
} => {
  // High energy (7-10)
  if (energyLevel >= 7) {
    return {
      sessionLength: "60-90 minutes",
      sessionType: "Deep focus on challenging topics, new concepts, or practice tests",
      breakFrequency: "Every 45-50 minutes"
    };
  }
  // Medium energy (4-6)
  else if (energyLevel >= 4) {
    return {
      sessionLength: "40-60 minutes",
      sessionType: "Balanced mix of review and new material",
      breakFrequency: "Every 30 minutes"
    };
  } 
  // Low energy (1-3)
  else {
    return {
      sessionLength: "15-30 minutes",
      sessionType: "Light review, flashcards, or conceptual understanding",
      breakFrequency: "Every 15-20 minutes"
    };
  }
};

// Apply theme based on mood (for Chill Mode)
export const applyMoodTheme = (mood?: MoodType): void => {
  const root = document.documentElement;
  const needsChillMode = mood === 'tired' || mood === 'stressed' || mood === 'overwhelmed' || mood === 'sad';
  
  // Remove any existing mood classes
  const currentClasses = document.body.className.split(' ').filter(cls => !cls.startsWith('mood-'));
  document.body.className = currentClasses.join(' ');
  
  // Add the appropriate mood class
  if (mood) {
    document.body.classList.add(`mood-${mood}`);
  }
  
  // Apply Chill Mode if needed
  if (needsChillMode) {
    root.style.setProperty('--background', 'hsl(210, 40%, 98%)');
    root.style.setProperty('--primary', 'hsl(199, 89%, 48%)');
    root.style.setProperty('--primary-foreground', 'hsl(0, 0%, 98%)');
    root.style.setProperty('--secondary', 'hsl(196, 100%, 94%)');
    document.body.classList.add('chill-mode');
    
    // Play soft background music if enabled in user preferences
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    if (userPreferences.playChillModeAudio) {
      // Implement audio playing logic if needed
    }
  } else {
    // Reset to default theme
    root.style.removeProperty('--background');
    root.style.removeProperty('--primary');
    root.style.removeProperty('--primary-foreground');
    root.style.removeProperty('--secondary');
    document.body.classList.remove('chill-mode');
  }
  
  // Log for debugging
  console.log(`Applied mood theme for: ${mood}, chill mode: ${needsChillMode}`);
};

// Get toast content for mood logging
export const getMoodToastContent = (mood?: MoodType): string => {
  if (!mood) return "Mood logged successfully";
  
  const moodMessages: Record<string, string> = {
    motivated: "You're feeling motivated! Great time to tackle challenging tasks.",
    curious: "Curiosity leads to discovery! Explore new concepts today.",
    neutral: "You're feeling neutral. A good time to review what you've learned.",
    tired: "It's okay to be tired. Consider shorter study sessions today.",
    stressed: "You're feeling stressed. Remember to breathe and take breaks.",
    focused: "You're in the zone! Great time for deep learning.",
    happy: "Your positive mood can boost learning. Make the most of it!",
    okay: "You're feeling okay. Steady progress is still progress.",
    overwhelmed: "Feeling overwhelmed? Break tasks into smaller chunks today.",
    sad: "It's okay to feel sad. Be kind to yourself today."
  };
  
  return moodMessages[mood] || `Your mood has been set to ${getMoodDisplayName(mood)}`;
};

// Save mood to localStorage with timestamp
export const saveMoodToLocalStorage = (mood: MoodType): void => {
  // Save current mood
  localStorage.setItem('currentMood', mood);
  
  // Save to mood history
  const now = new Date();
  const moodEntry = {
    mood: mood,
    timestamp: now.toISOString(),
    energyLevel: getMoodEnergyLevel(mood)
  };
  
  // Get existing history or initialize new array
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  moodHistory.push(moodEntry);
  
  // Keep only the last 30 entries
  if (moodHistory.length > 30) {
    moodHistory.shift();
  }
  
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  
  // Update user data with mood information
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userData.mood = mood;
  userData.lastMoodUpdate = now.toISOString();
  
  // Track consecutive low mood days for personalized encouragement
  const lowMoodTypes: MoodType[] = ['sad', 'overwhelmed', 'stressed', 'tired'];
  if (lowMoodTypes.includes(mood)) {
    userData.consecutiveLowMoodDays = (userData.consecutiveLowMoodDays || 0) + 1;
  } else {
    userData.consecutiveLowMoodDays = 0;
  }
  
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Check if user needs personalized encouragement (after 3+ days of low mood)
export const checkNeedsEncouragement = (): boolean => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  return (userData.consecutiveLowMoodDays || 0) >= 3;
};

// Get personalized encouragement content based on user profile
export const getPersonalizedEncouragement = (): {
  title: string;
  message: string;
  videoUrl?: string;
  tipSource?: string;
} => {
  return {
    title: "A message just for you",
    message: "We've noticed you've been feeling low for a few days. Remember that progress isn't always linear, and it's okay to have tough days. Many successful students faced similar challenges on their journey.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example URL - would be replaced with actual content
    tipSource: "Aman Dhattarwal, JEE AIR-1 2018"
  };
};
