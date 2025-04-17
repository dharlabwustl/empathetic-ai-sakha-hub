
import { MoodType } from "@/types/user/base";

export const getMoodDisplayName = (mood: MoodType): string => {
  const moodNames: Record<MoodType, string> = {
    happy: "Happy",
    motivated: "Motivated",
    focused: "Focused",
    curious: "Curious",
    neutral: "Neutral",
    tired: "Tired",
    stressed: "Stressed",
    sad: "Sad",
    overwhelmed: "Overwhelmed",
    okay: "Okay"
  };
  
  return moodNames[mood] || "Unknown";
};

export const getMoodIcon = (mood: MoodType) => {
  // Return appropriate icon based on mood
  const className = "h-5 w-5 text-muted-foreground";
  
  switch (mood) {
    case "happy":
      return <span role="img" aria-label="happy" className={className}>😊</span>;
    case "motivated":
      return <span role="img" aria-label="motivated" className={className}>🚀</span>;
    case "focused":
      return <span role="img" aria-label="focused" className={className}>🎯</span>;
    case "curious":
      return <span role="img" aria-label="curious" className={className}>🤔</span>;
    case "neutral":
      return <span role="img" aria-label="neutral" className={className}>😐</span>;
    case "tired":
      return <span role="img" aria-label="tired" className={className}>😴</span>;
    case "stressed":
      return <span role="img" aria-label="stressed" className={className}>😰</span>;
    case "sad":
      return <span role="img" aria-label="sad" className={className}>😢</span>;
    case "overwhelmed":
      return <span role="img" aria-label="overwhelmed" className={className}>😩</span>;
    case "okay":
      return <span role="img" aria-label="okay" className={className}>👌</span>;
    default:
      return <span role="img" aria-label="default" className={className}>😐</span>;
  }
};

export const getMoodMotivationalQuote = (mood: MoodType): string => {
  const quotes: Record<MoodType, string[]> = {
    happy: [
      "Great to see you in high spirits! Use this positive energy to tackle challenging tasks.",
      "Your happiness is contagious. Share it with others in your study group!",
      "A happy mind learns better. You're set for productive studying today!"
    ],
    motivated: [
      "You're on fire today! Channel this motivation into your most important tasks.",
      "Motivation is what gets you started. Habit is what keeps you going.",
      "Your drive today will bring you closer to your goals. Keep pushing!"
    ],
    focused: [
      "Great focus leads to great achievements. You're in the zone!",
      "One hour of focused study beats three hours of distracted effort.",
      "Your laser focus today will help you break through difficult concepts."
    ],
    curious: [
      "Curiosity is the engine of achievement. Explore and discover!",
      "Questions are the birthplace of discovery. Keep asking them!",
      "Your curiosity will lead you to knowledge others might miss."
    ],
    neutral: [
      "A balanced mind is ready for learning. You've got this!",
      "Sometimes neutral is the perfect state for objective thinking.",
      "Today is a clean slate with potential for great progress."
    ],
    tired: [
      "Remember that rest is part of the learning process too.",
      "Consider taking strategic breaks to recharge your mental energy.",
      "It's okay to adjust your study plan when your energy is low."
    ],
    stressed: [
      "Take a moment to breathe deeply. Stress narrows thinking.",
      "Break your work into smaller chunks to make progress without overwhelm.",
      "Consider a short mindfulness exercise to reset your nervous system."
    ],
    sad: [
      "It's okay not to be okay sometimes. Be gentle with yourself today.",
      "Small progress is still progress, especially on difficult days.",
      "Consider reaching out to someone - connection often helps lift our spirits."
    ],
    overwhelmed: [
      "Focus on just the next small step. You don't have to solve everything at once.",
      "Break down your work into the smallest possible tasks and tackle just one.",
      "Sometimes stepping back helps us see the clearer path forward."
    ],
    okay: [
      "You're in a good place to make steady progress today.",
      "An 'okay' mood is actually perfect for consistent work.",
      "Stability is underrated - use this balanced state wisely!"
    ]
  };
  
  const moodQuotes = quotes[mood] || quotes.neutral;
  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
};

export const getMoodToastContent = (mood: MoodType) => {
  const moodMessages: Record<MoodType, string> = {
    happy: "Great to see you in such good spirits!",
    motivated: "Your motivation will help you achieve great things today!",
    focused: "With this focus, you'll make excellent progress!",
    curious: "Your curiosity will lead to fascinating discoveries!",
    neutral: "Ready for a productive day of learning.",
    tired: "Remember to take breaks when needed.",
    stressed: "Consider some deep breathing exercises to center yourself.",
    sad: "It's okay to have down days. Be kind to yourself.",
    overwhelmed: "Break tasks into smaller steps to manage better.",
    okay: "You're in a good place to make steady progress."
  };
  
  return moodMessages[mood] || "Your mood has been updated.";
};

export const applyMoodTheme = (mood: MoodType): void => {
  // First remove any existing mood classes
  document.body.classList.forEach(className => {
    if (className.startsWith('mood-')) {
      document.body.classList.remove(className);
    }
  });
  
  // Add the new mood class
  document.body.classList.add(`mood-${mood}`);
};

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
    // Also save directly for simpler access
    localStorage.setItem('currentMood', mood);
  } catch (error) {
    console.error("Error saving mood to localStorage", error);
  }
};
