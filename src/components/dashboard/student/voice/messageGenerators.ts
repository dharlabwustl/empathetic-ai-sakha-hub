
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
        return `${timeGreeting} I notice you're feeling motivated today! Let's channel that energy into something productive.`;
      case 'tired':
        return `${timeGreeting} I see you're feeling a bit tired. Let's focus on lighter tasks today and take breaks when needed.`;
      case 'focused':
        return `${timeGreeting} You're in a focused state today! Let's make the most of this concentration.`;
      case 'anxious':
        return `${timeGreeting} Let's take a calming breath together. I'm here to help you organize everything step by step.`;
      case 'stressed':
        return `${timeGreeting} I notice you're feeling stressed. Let's prioritize your tasks and tackle them one by one.`;
      default:
        return `${timeGreeting} How can I assist with your studies today?`;
    }
  }
  
  return `${timeGreeting} How can I assist with your studies today?`;
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important task to complete: ${task.title}. ${timeStr} Let me know if you need any help with this.`;
  }
  
  return `Your next task is: ${task.title}. ${timeStr} Would you like me to set a reminder for you?`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Reminder! You have ${event.title} at ${event.time}. Have you completed your revision for this exam?`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}. Is there anything you need help with to prepare?`;
};

// Generate context-aware messages for different situations
export const getContextMessage = (context: string, data?: any): string => {
  switch(context) {
    case 'silence_break':
      return "I notice you've been quiet for a while. Would you like any assistance with your studies or schedule?";
    
    case 'first_login':
      return "Welcome to PrepEezer! To get started, I recommend setting up your study goals in the profile section, checking your notifications for important updates, and exploring the academic advisor for personalized study plans. Feel free to ask me any questions using the voice icon at the top.";
    
    case 'daily_tasks':
      const taskCount = data?.taskCount || 'several';
      return `You have ${taskCount} tasks scheduled for today. Would you like me to go through them with you?`;
    
    case 'notifications':
      const notifCount = data?.count || 0;
      return notifCount > 0 ? `You have ${notifCount} new notifications waiting for your attention. Would you like me to read them for you?` : '';
    
    case 'inactivity':
      return "I notice you haven't interacted with any study materials recently. Would you like suggestions for what to study next?";
    
    case 'session_complete':
      return "Well done on completing your study session! Would you like to take a break or continue with the next topic?";
    
    case 'help_tip':
      return "Remember, you can always ask me questions by clicking the voice icon at the top of the screen. I'm here to assist you with anything related to your studies.";
    
    case 'low_progress':
      return "I notice your progress has been a bit slow this week. Would you like me to suggest some study techniques that might help?";
    
    default:
      return "How can I assist you today? Feel free to ask me anything about your studies or schedule.";
  }
};
