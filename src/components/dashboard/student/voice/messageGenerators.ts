
import { MoodType } from '@/types/user/base';

// Helper to get greeting based on time of day and mood - shorter, clearer, context-aware
export const getGreeting = (mood?: MoodType): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  // Add mood-specific additions that are shorter and more direct
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! Let's use that motivation for productive study today.`;
      case 'tired':
        return `${timeGreeting}. For your tired state, let's focus on shorter, high-impact study sessions.`;
      case 'focused':
        return `${timeGreeting}. Great focus today! Perfect for tackling difficult concepts.`;
      case 'anxious':
        return `${timeGreeting}. Let's break your work into small steps to ease anxiety.`;
      case 'stressed':
        return `${timeGreeting}. I'll help prioritize tasks to reduce your stress today.`;
      default:
        return `${timeGreeting}! Ready for today's study session?`;
    }
  }

  // If no mood is specified, use variety of short, focused greetings
  const genericGreetings = [
    `${timeGreeting}! What's your study focus today?`,
    `${timeGreeting}! Ready for a productive session?`,
    `${timeGreeting}! Need help with your study plan?`,
    `${timeGreeting}! Ask questions using the voice icon above.`,
    `${timeGreeting}! Let me know if you need study assistance.`
  ];
  
  return genericGreetings[Math.floor(Math.random() * genericGreetings.length)];
};

// Generate a task announcement with more direct, focused tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `${task.timeEstimate} min.` : '';
  
  if (task.priority === 'high') {
    return `Important: ${task.title}. ${timeStr}`;
  }
  
  return `Next: ${task.title}. ${timeStr}`;
};

// Generate a reminder announcement - shorter, clearer
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Reminder: ${event.title} at ${event.time}.`;
  }
  
  return `${event.title} at ${event.time}.`;
};

// New helpers for context-aware assistant responses
export const getIdleTimeResponse = (): string => {
  const responses = [
    "Need help with your studies?",
    "Do you have questions about your study plan?",
    "Would you like recommendations for your exam preparation?",
    "Ask me to explain concepts or create flashcards for you.",
    "Need help prioritizing your study topics?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getFirstTimeUserGuidance = (): string => {
  const guidanceMessages = [
    "To start, set study goals in your profile and check the Academic Advisor for a personalized plan.",
    "Create flashcards for key concepts to improve recall during exam preparation.",
    "Take regular practice tests to identify knowledge gaps and track improvement.",
    "Record your mood daily to help personalize your study experience.",
    "Use the AI tutor to get help with challenging concepts."
  ];
  
  return guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
};

export const getDailyProgressUpdate = (completedTasks: number, totalTasks: number): string => {
  if (completedTasks === 0) {
    return "No tasks completed yet today. Let's begin.";
  } else if (completedTasks === totalTasks) {
    return "All tasks completed! Well done.";
  } else {
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    return `${completedTasks}/${totalTasks} tasks complete: ${percentage}% progress.`;
  }
};

export const getSubjectProgressUpdate = (subject: string, progress: number): string => {
  if (progress < 30) {
    return `${subject}: ${progress}% complete. Focus here to improve.`;
  } else if (progress < 70) {
    return `${subject}: ${progress}% progress. Good momentum.`;
  } else {
    return `${subject}: ${progress}% mastered. Almost there!`;
  }
};

// Exam-focused recommendations
export const getExamStrategy = (examName: string, daysLeft?: number): string => {
  if (daysLeft && daysLeft < 7) {
    return `${daysLeft} days to ${examName}. Focus on practice tests and reviewing weak areas.`;
  } else if (daysLeft && daysLeft < 30) {
    return `${daysLeft} days to ${examName}. Balance content review with practice questions.`;
  } else {
    return `For ${examName}, build a strong foundation with concept mastery now.`;
  }
};

// Subject-specific recommendations
export const getSubjectRecommendation = (subject: string, weakness: boolean = false): string => {
  if (weakness) {
    return `Your ${subject} needs improvement. Focus on flashcards and practice problems.`;
  }
  return `${subject} is progressing well. Move to advanced concepts.`;
};

// Learning style based tips
export const getLearningStyleTip = (style: string): string => {
  switch(style.toLowerCase()) {
    case 'visual':
      return "Try mind maps and diagrams to understand complex topics.";
    case 'auditory':
      return "Record key concepts and listen to them while reviewing.";
    case 'reading/writing':
      return "Take concise notes and rewrite key formulas to strengthen memory.";
    case 'kinesthetic':
      return "Use physical models or practical experiments to reinforce learning.";
    default:
      return "Mix different study methods for better retention.";
  }
};
