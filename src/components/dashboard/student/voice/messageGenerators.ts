
import { MoodType } from '@/types/user/base';

// Helper to get greeting based on time of day and mood - more focused on exam preparation
export const getGreeting = (mood?: MoodType, examGoal?: string): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  const examContext = examGoal ? ` ${examGoal}` : '';
  
  // Add mood-specific additions with exam-focused advice
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! With your motivated energy, it's perfect timing for${examContext} practice tests today.`;
      case 'tired':
        return `${timeGreeting}. When tired, focus on revision rather than new${examContext} concepts. Short bursts are more effective.`;
      case 'focused':
        return `${timeGreeting}! Your focused state is ideal for tackling difficult${examContext} topics. Consider advanced problems today.`;
      case 'anxious':
        return `${timeGreeting}. For${examContext} anxiety, breaking topics into smaller sections helps. Let's plan your day step by step.`;
      case 'stressed':
        return `${timeGreeting}. To manage${examContext} stress, let's organize your priority topics and tackle them one by one.`;
      default:
        return `${timeGreeting}! Ready to make progress on your${examContext} preparation today?`;
    }
  }

  // More concise generic greetings focused on exams
  const genericGreetings = [
    `${timeGreeting}! Let's focus on your${examContext} weak areas today.`,
    `${timeGreeting}! Have you reviewed yesterday's${examContext} concepts yet?`,
    `${timeGreeting}! Your${examContext} practice test results suggest focusing on calculations today.`,
    `${timeGreeting}! Remember to include timed${examContext} practice in today's session.`,
    `${timeGreeting}! Your consistency with${examContext} prep is building strong foundations.`
  ];
  
  return genericGreetings[Math.floor(Math.random() * genericGreetings.length)];
};

// Generate a task announcement with more targeted language
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `Priority task: ${task.title}. ${timeStr} This topic frequently appears in exams.`;
  }
  
  return `Next task: ${task.title}. ${timeStr}`;
};

// More concise reminder announcement
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Reminder for ${event.title} at ${event.time}. Your practice tests indicate you're well prepared.`;
  }
  
  return `${event.title} scheduled for ${event.time}.`;
};

// Exam-specific idle time responses
export const getIdleTimeResponse = (examGoal?: string): string => {
  const examContext = examGoal || "exam";
  
  const responses = [
    `Need help with a difficult ${examContext} concept?`,
    `Would you like me to suggest high-yield ${examContext} topics to study next?`,
    `Have you attempted timed ${examContext} practice today?`,
    `Need help creating flashcards for ${examContext} formulas?`,
    `Would you like to review your weak areas in ${examContext}?`,
    `Ready to tackle some ${examContext} practice questions?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// First-time user guidance with exam focus
export const getFirstTimeUserGuidance = (examGoal?: string): string => {
  const examContext = examGoal || "competitive exam";
  
  const guidanceMessages = [
    `For ${examContext} preparation, start by assessing your baseline knowledge through the diagnostic tests.`,
    `Set up daily study goals specifically for ${examContext} topics and track your consistency.`,
    `The AI tutor can explain difficult ${examContext} concepts - just ask your specific questions.`,
    `Remember to practice ${examContext} questions under timed conditions to build exam temperament.`,
    `Creating a study schedule with balanced focus across all ${examContext} subjects is essential.`
  ];
  
  return guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
};

// Exam-specific progress updates
export const getDailyProgressUpdate = (completedTasks: number, totalTasks: number, examGoal?: string): string => {
  const examContext = examGoal ? ` for ${examGoal}` : '';
  
  if (completedTasks === 0) {
    return `Time to begin your study sessions${examContext}. What topic would you like to start with?`;
  } else if (completedTasks === totalTasks) {
    return `Excellent! All${examContext} tasks completed. Consider taking a practice test to measure progress.`;
  } else {
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    return `You've completed ${completedTasks} of ${totalTasks}${examContext} tasks - ${percentage}% done. Keep going!`;
  }
};

// Subject-specific progress feedback
export const getSubjectProgressUpdate = (subject: string, progress: number, examGoal?: string): string => {
  const examContext = examGoal ? ` for ${examGoal}` : '';
  
  if (progress < 30) {
    return `Your ${subject}${examContext} is at ${progress}%. Focus on fundamentals before advanced topics.`;
  } else if (progress < 70) {
    return `${progress}% progress in ${subject}${examContext}. Time to start solving complex problems.`;
  } else {
    return `At ${progress}% in ${subject}${examContext}. Now focus on timed practice and revision.`;
  }
};
