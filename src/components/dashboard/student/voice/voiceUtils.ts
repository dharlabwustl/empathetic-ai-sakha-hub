
import { MoodType } from "@/types/user/base";

// Get appropriate greeting based on time of day and user's mood
export const getGreeting = (name: string, mood?: string, isFirstTime = false): string => {
  const hour = new Date().getHours();
  let timeGreeting = "Hello";
  
  if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 17) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }
  
  // Base greeting with name
  let greeting = `${timeGreeting}, ${name}`;
  
  // Add welcome back for returning users or welcome for first time users
  if (isFirstTime) {
    greeting += ". Welcome to Prepzr! I'm your voice assistant, and I'm here to help you with your preparation.";
  } else {
    greeting += ". Welcome back to Prepzr.";
  }
  
  // Add mood-specific message if available
  if (mood) {
    switch (mood.toUpperCase()) {
      case MoodType.HAPPY:
        greeting += " I'm glad to see you're in a good mood today. Let's make the most of your study session!";
        break;
      case MoodType.MOTIVATED:
        greeting += " Your motivated attitude will help you make great progress today.";
        break;
      case MoodType.FOCUSED:
        greeting += " Your focus will help you absorb more information during today's study session.";
        break;
      case MoodType.TIRED:
        greeting += " I notice you're feeling tired. Remember to take short breaks to maintain your energy.";
        break;
      case MoodType.STRESSED:
        greeting += " I see you're feeling stressed. Let's work together to break down your tasks into manageable parts.";
        break;
      case MoodType.OVERWHELMED:
        greeting += " Feeling overwhelmed is normal during exam preparation. Let's prioritize your tasks for today.";
        break;
      case MoodType.ANXIOUS:
        greeting += " I understand you're feeling anxious. Remember that preparation is the best way to build confidence.";
        break;
      default:
        // No mood-specific message
        break;
    }
  }
  
  return greeting;
};

// Generate encouraging message based on progress
export const getEncouragementMessage = (userName: string, completedTasks: number): string => {
  if (completedTasks === 0) {
    return `${userName}, let's start working on your tasks for today. You can do this!`;
  } else if (completedTasks < 3) {
    return `Great start, ${userName}! You've completed ${completedTasks} ${completedTasks === 1 ? 'task' : 'tasks'}. Keep going!`;
  } else {
    return `Impressive work, ${userName}! You've completed ${completedTasks} tasks today. You're making excellent progress!`;
  }
};

// Generate study tips based on subject area
export const getStudyTip = (subject?: string): string => {
  const generalTips = [
    "Remember to take short breaks every 45 minutes to maintain focus.",
    "Try explaining concepts out loud to improve understanding and retention.",
    "Review your notes before bedtime to strengthen memory consolidation during sleep.",
    "Use active recall instead of passive reading for better retention.",
    "Try the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break."
  ];
  
  const subjectTips: Record<string, string[]> = {
    physics: [
      "For physics problems, always draw diagrams to visualize the scenario.",
      "Focus on understanding the core formulas and when to apply them.",
      "Practice solving problems with different variations to strengthen your understanding."
    ],
    chemistry: [
      "Use flashcards to memorize periodic table elements and their properties.",
      "Create mind maps to visualize chemical reactions and their relationships.",
      "Relate chemical concepts to real-world applications to improve understanding."
    ],
    biology: [
      "Use diagrams and visual aids to understand complex biological processes.",
      "Create mnemonics to remember biological taxonomies and classifications.",
      "Study biological concepts in hierarchical order from cells to organisms."
    ],
    mathematics: [
      "Practice a variety of problem types for each mathematical concept.",
      "Focus on understanding the concepts rather than memorizing formulas.",
      "Work through examples step by step before attempting similar problems."
    ]
  };
  
  if (subject && subject.toLowerCase() in subjectTips) {
    const specificTips = subjectTips[subject.toLowerCase()];
    return specificTips[Math.floor(Math.random() * specificTips.length)];
  }
  
  return generalTips[Math.floor(Math.random() * generalTips.length)];
};

// Get progress feedback based on score
export const getProgressFeedback = (score: number, previousScore?: number): string => {
  const scoreDifference = previousScore ? score - previousScore : 0;
  
  if (score >= 80) {
    return "Excellent work! Your readiness score shows you're well-prepared. Focus on maintaining this level and fine-tuning your knowledge.";
  } else if (score >= 60) {
    if (scoreDifference > 5) {
      return "Good progress! You've improved significantly. Keep building on your strengths and working on your weaker areas.";
    } else {
      return "You're doing well. Your readiness score shows good preparation. Continue focusing on understanding core concepts thoroughly.";
    }
  } else if (score >= 40) {
    if (scoreDifference > 5) {
      return "You're making progress! Focus on strengthening your foundation and practice regularly to continue improving.";
    } else {
      return "You're on the right track. Consistent study and more practice will help you improve your readiness score.";
    }
  } else {
    if (scoreDifference > 0) {
      return "You've started improving, which is great! Focus on mastering basic concepts before moving to advanced topics.";
    } else {
      return "Don't worry about your current score. With consistent effort and focus on fundamentals, you'll see improvement soon.";
    }
  }
};
