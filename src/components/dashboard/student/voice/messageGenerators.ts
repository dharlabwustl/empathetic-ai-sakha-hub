
import { MoodType } from '@/types/user/base';

// Helper to get greeting based on time of day and mood - more varied and contextual
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
  
  // Add enthusiastic exclamation for all greetings
  timeGreeting += '!';
  
  // Add mood-specific additions with more energetic and happier tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting} I see you're feeling motivated today! That's wonderful energy to bring to your studies. Let's make the most of it!`;
      case 'tired':
        return `${timeGreeting} I understand you're feeling tired today. Let's focus on gentle progress and include some rejuvenating breaks in your schedule.`;
      case 'focused':
        return `${timeGreeting} You're in a focused state today! Perfect for tackling challenging topics. I'll help you maintain that concentration.`;
      case 'anxious':
        return `${timeGreeting} I notice you're feeling anxious. Let's break things down into small, manageable steps and celebrate each little victory today.`;
      case 'stressed':
        return `${timeGreeting} When you're stressed, it helps to prioritize and take things one at a time. Let me help you organize your day for maximum calm and effectiveness.`;
      default:
        return `${timeGreeting} Welcome to your study session! I'm here to support your learning journey today.`;
    }
  }

  // If no mood is specified, use variety of greetings
  const genericGreetings = [
    `${timeGreeting} Welcome back to your study dashboard! What would you like to focus on today?`,
    `${timeGreeting} Ready for another productive session? Let me know if you need any assistance.`,
    `${timeGreeting} I'm here to support your learning journey. Feel free to ask questions using the voice icon above.`,
    `${timeGreeting} I'm your friendly voice assistant. Let me know if you need help with your study plan or have any questions.`,
    `${timeGreeting} Happy to see you! Remember you can ask me anything by clicking the voice icon at the top of the screen.`
  ];
  
  return genericGreetings[Math.floor(Math.random() * genericGreetings.length)];
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important task to complete: ${task.title}. ${timeStr} I believe in you - you can do this!`;
  }
  
  return `Your next task is: ${task.title}. ${timeStr} I'm here to help you with it if needed.`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Friendly reminder! You have ${event.title} at ${event.time}. You've prepared well for this!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}. I'm here to support you through it!`;
};

// New helpers for more varied assistant responses
export const getIdleTimeResponse = (): string => {
  const responses = [
    "Is there anything I can help you with today?",
    "Do you need any guidance with your studies?",
    "Would you like me to explain any features of the platform?",
    "Feel free to ask me questions about your study plan or exam preparation.",
    "Remember you can interact with me anytime by clicking the voice icon at the top of the screen.",
    "Would you like me to help you schedule your study sessions for today?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getFirstTimeUserGuidance = (): string => {
  const guidanceMessages = [
    "Welcome to PREPZR! To get started, I recommend setting up your study goals in the profile section.",
    "As a new user, you might want to explore the Academic Advisor first to create your personalized study plan.",
    "Have you taken a look at the AI tutor feature? It can help answer your subject-specific questions.",
    "Try tracking your mood daily - it helps us personalize your study experience to match your energy levels.",
    "The Feel Good Corner is perfect when you need a study break - it has activities designed to refresh your mind."
  ];
  
  return guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
};

export const getDailyProgressUpdate = (completedTasks: number, totalTasks: number): string => {
  if (completedTasks === 0) {
    return "You haven't completed any tasks yet today. Let's get started with your first one!";
  } else if (completedTasks === totalTasks) {
    return "Amazing job! You've completed all your tasks for today. Would you like to plan for tomorrow?";
  } else {
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    return `You've completed ${completedTasks} out of ${totalTasks} tasks today - that's ${percentage}% progress! Keep up the great work!`;
  }
};

export const getSubjectProgressUpdate = (subject: string, progress: number): string => {
  if (progress < 30) {
    return `You're at the beginning of your ${subject} journey with ${progress}% completion. Every step counts!`;
  } else if (progress < 70) {
    return `You're making solid progress in ${subject} with ${progress}% completion. Keep the momentum going!`;
  } else {
    return `You've made excellent progress in ${subject} with ${progress}% completion. You're getting close to mastery!`;
  }
};
