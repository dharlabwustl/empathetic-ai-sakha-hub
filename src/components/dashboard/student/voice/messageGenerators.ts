
import { MoodType } from '@/types/user/base';

// Helper to get greeting based on time of day and mood - more energetic and happier
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
        return `${timeGreeting} I'm absolutely thrilled to see your wonderful enthusiasm today! Let's make something amazing happen together!`;
      case 'tired':
        return `${timeGreeting} I understand you're feeling a bit tired. Let's take some gentle steps today with calming study sessions. You'll feel refreshed very soon!`;
      case 'focused':
        return `${timeGreeting} I'm so happy to see you so wonderfully focused today! Let's channel that fantastic concentration into brilliant learning experiences!`;
      case 'anxious':
        return `${timeGreeting} Let's take a nice, calming breath together. I'm right here to help you organize everything step by step. You're doing amazingly well!`;
      case 'stressed':
        return `${timeGreeting} I notice you're feeling stressed. Let's work together with positive energy and organize your priorities. Everything will feel much better soon!`;
      default:
        return `${timeGreeting} I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully today!`;
    }
  }
  
  return `${timeGreeting} I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully today!`;
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important and exciting task to complete: ${task.title}! ${timeStr} I believe in you completely, and I know you'll do this magnificently!`;
  }
  
  return `Your next wonderful task is: ${task.title}! ${timeStr} I'm really looking forward to seeing your brilliant progress today!`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Friendly reminder! You have ${event.title} at ${event.time}. I'm certain you'll do amazingly well with your preparation! You've got this!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}! I'm right here to support you through it with all my enthusiasm!`;
};
