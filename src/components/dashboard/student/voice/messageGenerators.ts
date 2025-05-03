
import { MoodType } from '@/types/user/base';

// Helper to get greeting based on time of day and mood
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
  
  // Add mood-specific additions with more energetic and calmer tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! I'm so excited to see your enthusiasm today! Let's make the most of your energy!`;
      case 'tired':
        return `${timeGreeting}. Don't worry about feeling tired. Let's take gentle steps together today with shorter, relaxed study sessions.`;
      case 'focused':
        return `${timeGreeting}! I'm happy to see you so focused today! Let's channel that concentration into wonderful learning!`;
      case 'anxious':
        return `${timeGreeting}. Let's take a calming breath together. I'm here to help you organize everything one step at a time.`;
      case 'stressed':
        return `${timeGreeting}. I notice you're feeling stressed. Let's work together calmly and organize your priorities to make things easier.`;
      default:
        return `${timeGreeting}! I'm so happy you're here! Ready for an amazing study session?`;
    }
  }
  
  return `${timeGreeting}! I'm so happy you're here! Ready for an amazing study session?`;
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important task to complete: ${task.title}. ${timeStr} I believe you can do this wonderfully!`;
  }
  
  return `Your next exciting task is: ${task.title}. ${timeStr} I'm looking forward to seeing your progress!`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Friendly reminder: You have ${event.title} at ${event.time}. I'm sure you'll do amazingly well with your preparation!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}. I'm here to support you through it!`;
};
