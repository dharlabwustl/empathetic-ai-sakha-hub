
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
  
  // Add mood-specific additions with more energetic and happier tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! I'm absolutely thrilled to see your enthusiasm today! Let's make something wonderful happen together!`;
      case 'tired':
        return `${timeGreeting}. I understand you're feeling tired. Let's take gentle steps today with calm, relaxed study sessions. You'll feel refreshed in no time!`;
      case 'focused':
        return `${timeGreeting}! I'm so happy to see you so focused today! Let's channel that amazing concentration into wonderful learning experiences!`;
      case 'anxious':
        return `${timeGreeting}. Let's take a nice, calming breath together. I'm right here to help you organize everything step by step. You're doing brilliantly!`;
      case 'stressed':
        return `${timeGreeting}. I notice you're feeling stressed. Let's work together with a smile and organize your priorities. Everything will feel much easier soon!`;
      default:
        return `${timeGreeting}! I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully!`;
    }
  }
  
  return `${timeGreeting}! I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully!`;
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important and exciting task to complete: ${task.title}. ${timeStr} I believe in you completely, and I know you'll do this magnificently!`;
  }
  
  return `Your next wonderful task is: ${task.title}. ${timeStr} I'm really looking forward to seeing your brilliant progress!`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Friendly reminder: You have ${event.title} at ${event.time}. I'm certain you'll do amazingly well with your preparation! You've got this!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}. I'm right here to support you through it with all my enthusiasm!`;
};
