
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood?: MoodType): string => {
  switch (mood) {
    case 'happy': return 'Happy';
    case 'sad': return 'Sad';
    case 'neutral': return 'Neutral';
    case 'motivated': return 'Motivated';
    case 'tired': return 'Tired';
    case 'stressed': return 'Stressed';
    case 'focused': return 'Focused';
    case 'curious': return 'Curious';
    case 'overwhelmed': return 'Overwhelmed';
    case 'okay': return 'Okay';
    default: return 'How are you feeling?';
  }
};

export const getMoodColor = (mood?: MoodType): string => {
  switch (mood) {
    case 'happy': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'sad': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'neutral': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'motivated': return 'bg-green-100 text-green-700 border-green-200';
    case 'tired': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'stressed': return 'bg-red-100 text-red-700 border-red-200';
    case 'focused': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'curious': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'overwhelmed': return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'okay': return 'bg-sky-100 text-sky-700 border-sky-200';
    default: return 'bg-violet-100 text-violet-700 border-violet-200';
  }
};

export const getMoodIcon = (mood?: MoodType) => {
  // You can return different icons based on mood if needed
  return mood;
};

// Adding the missing functions that were causing errors
export const getMoodToastContent = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return 'Feeling happy! We\'ll show you content to maintain your positive energy.';
    case 'sad': return 'Sorry you\'re feeling down. We\'ll show some mood-lifting content.';
    case 'neutral': return 'Feeling neutral today. We\'ll keep things balanced for you.';
    case 'motivated': return 'Great to see you motivated! Let\'s make the most of this energy.';
    case 'tired': return 'Feeling tired? We\'ll suggest shorter, focused study activities.';
    case 'stressed': return 'Noticing you\'re stressed. Let\'s take things one step at a time.';
    case 'focused': return 'You\'re in the zone! We\'ll help maintain your focus.';
    case 'curious': return 'Curiosity leads to discovery! We\'ll feed your inquisitive mind.';
    case 'overwhelmed': return 'Feeling overwhelmed? We\'ll break things down into manageable parts.';
    case 'okay': return 'Feeling okay today. Let\'s work on making progress steadily.';
    default: return 'Thanks for sharing how you feel. We\'ll adjust your experience accordingly.';
  }
};

export const applyMoodTheme = (mood: MoodType): void => {
  // Remove all existing mood classes
  document.body.classList.remove(
    'mood-happy', 'mood-sad', 'mood-neutral', 'mood-motivated', 
    'mood-tired', 'mood-stressed', 'mood-focused', 'mood-curious', 
    'mood-overwhelmed', 'mood-okay'
  );
  
  // Apply the new mood class
  document.body.classList.add(`mood-${mood}`);
};

export const saveMoodToLocalStorage = (mood: MoodType): void => {
  // Save mood to localStorage
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      parsedData.moodTimestamp = new Date().toISOString();
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } catch (e) {
      console.error("Error updating mood:", e);
      localStorage.setItem("userData", JSON.stringify({ 
        mood, 
        moodTimestamp: new Date().toISOString() 
      }));
    }
  } else {
    localStorage.setItem("userData", JSON.stringify({ 
      mood, 
      moodTimestamp: new Date().toISOString() 
    }));
  }
};
