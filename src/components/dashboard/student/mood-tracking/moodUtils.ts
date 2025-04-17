
import { MoodType } from "@/types/user/base";

export const saveMoodToLocalStorage = (mood: MoodType) => {
  localStorage.setItem('currentMood', JSON.stringify({
    mood,
    timestamp: new Date().toISOString()
  }));
};

export const applyMoodTheme = (mood: MoodType) => {
  // Remove any existing mood classes
  document.documentElement.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.documentElement.classList.remove(className);
    }
  });
  
  // Apply new mood class
  document.documentElement.classList.add(`mood-${mood}`);
};

interface ToastContent {
  message: string;
  description: string;
}

export const getMoodToastContent = (mood: MoodType): ToastContent => {
  const moodMessages: Record<MoodType, ToastContent> = {
    happy: {
      message: "That's wonderful!",
      description: "We're glad you're feeling happy. Let's keep that energy going!"
    },
    sad: {
      message: "Hang in there",
      description: "It's okay to feel down sometimes. Would you like to see something uplifting?"
    },
    stressed: {
      message: "Taking a breather",
      description: "Remember to take breaks and practice self-care. You've got this!"
    },
    focused: {
      message: "In the zone!",
      description: "Great! We'll help you make the most of your focus time."
    },
    tired: {
      message: "Rest is important",
      description: "Would you like a lighter study schedule today?"
    },
    motivated: {
      message: "Ready to achieve!",
      description: "Let's make the most of your motivation with some productive tasks."
    },
    curious: {
      message: "Curiosity leads to growth",
      description: "We've got plenty of interesting content ready for you to explore!"
    },
    neutral: {
      message: "Ready for the day",
      description: "Let us know if there's anything specific you'd like to work on today."
    },
    overwhelmed: {
      message: "One step at a time",
      description: "Let's break down your tasks into manageable chunks."
    },
    okay: {
      message: "Steady progress",
      description: "Sometimes 'okay' is the perfect place to be. Let's make progress together."
    }
  };
  
  return moodMessages[mood] || {
    message: "Thanks for sharing",
    description: "We'll adjust our recommendations based on your mood."
  };
};
