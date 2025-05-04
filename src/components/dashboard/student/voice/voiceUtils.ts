
import { MoodType } from "@/types/user/base";

// Function to get time-appropriate greeting
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// Function to generate personalized greeting 
export const getGreeting = (
  name: string = "student", 
  mood?: string, 
  isFirstTimeUser: boolean = false
): string => {
  const timeGreeting = getTimeBasedGreeting();
  
  if (isFirstTimeUser) {
    return `${timeGreeting} and welcome to PREPZR, ${name}! I'm your AI assistant and I'm here to help you navigate through our platform. PREPZR is designed to help you excel in your exams with personalized study plans, concept cards, and practice tests. Feel free to ask me about any feature or if you need help with your studies.`;
  }
  
  // Regular greeting for returning users
  const baseGreeting = `${timeGreeting}, ${name}! `;
  
  if (mood === "Motivated") {
    return `${baseGreeting}I see you're feeling motivated today! That's great. Let's make the most of your study session.`;
  } else if (mood === "Tired") {
    return `${baseGreeting}I notice you're feeling tired. Would you like me to suggest a shorter, more focused study session today?`;
  } else if (mood === "Confused") {
    return `${baseGreeting}I see you're feeling a bit confused. Let me help you find the right resources to clear things up.`;
  } else if (mood === "Stressed") {
    return `${baseGreeting}I can see you're feeling stressed. Remember to take breaks, and let's focus on priorities today.`;
  }
  
  return `${baseGreeting}How may I assist you with your studies today?`;
};

// Knowledge base for voice assistant about different features
export const featureDescriptions: Record<string, string> = {
  dashboard: "The dashboard gives you an overview of your study progress, upcoming tasks, and personalized recommendations.",
  
  today: "Today's Plan shows your scheduled study sessions, practice tests, and assignments for today.",
  
  tutor: "The 24/7 AI Tutor can answer your questions on any subject, explain concepts, and help solve problems at any time.",
  
  academic: "The Academic Advisor helps you create and manage study plans based on your exam goals and learning preferences.",
  
  concepts: "Concept Cards provide detailed explanations of key topics across all subjects in your curriculum.",
  
  flashcards: "Flashcards help you memorize important facts and information through spaced repetition and active recall.",
  
  "practice-exam": "Practice Exams let you test your knowledge with timed tests that simulate real exam conditions.",
  
  "feel-good-corner": "The Feel Good Corner offers stress-relief activities, motivational content, and mental health resources.",
  
  notifications: "Notifications keep you updated about upcoming deadlines, new content, and important reminders.",
  
  "study-plan": "Study Plans help you organize your preparation with subject-wise schedules and track your progress over time.",
  
  profile: "Your Profile page lets you update your personal information, preferences, and account settings."
};

// Function to get information about a specific feature
export const getFeatureInfo = (featureId: string): string => {
  const info = featureDescriptions[featureId.toLowerCase()];
  if (info) {
    return info;
  }
  return "I don't have specific information about this feature, but I can help you navigate through it or answer any questions you have.";
};

// Handle voice commands and questions
export const handleVoiceCommand = (command: string): string => {
  const lowerCommand = command.toLowerCase();
  
  // Navigation commands
  if (lowerCommand.includes("go to") || lowerCommand.includes("open") || lowerCommand.includes("show")) {
    for (const [feature, description] of Object.entries(featureDescriptions)) {
      if (lowerCommand.includes(feature)) {
        return `Opening the ${feature} page. ${description}`;
      }
    }
  }
  
  // Information requests
  if (lowerCommand.includes("what is") || lowerCommand.includes("tell me about") || lowerCommand.includes("explain")) {
    for (const [feature, description] of Object.entries(featureDescriptions)) {
      if (lowerCommand.includes(feature)) {
        return description;
      }
    }
  }
  
  // Help requests
  if (lowerCommand.includes("help") || lowerCommand.includes("how to")) {
    if (lowerCommand.includes("study plan") || lowerCommand.includes("create plan")) {
      return "To create a study plan, go to the Academic Advisor section and click on 'Create New Plan'. You'll be guided through steps to set up a personalized study schedule.";
    }
    
    if (lowerCommand.includes("practice") || lowerCommand.includes("exam")) {
      return "To take a practice exam, navigate to the Practice Exams section, select an exam from the available options, and click 'Start Exam'.";
    }
    
    if (lowerCommand.includes("flashcard")) {
      return "To use flashcards, go to the Flashcards section, select a deck, and begin your practice session. You can mark cards as known or unknown to track your progress.";
    }
  }
  
  // Default response
  return "I'm here to help you navigate through PREPZR and assist with your studies. You can ask me about any feature or how to perform specific tasks.";
};
