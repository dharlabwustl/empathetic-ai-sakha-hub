
import { MoodType } from '@/types/user/base';
import { VoiceSpeakingStartedEvent } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  volume: 1.0,
  pitch: 1.1,  // Slightly higher pitch for female voice
  rate: 0.95,  // Slightly slower for better clarity
  voice: null,
  language: 'en-IN', // Set default to Indian English
  autoGreet: true,
  muted: false
};

export type VoiceSettings = typeof DEFAULT_VOICE_SETTINGS;

// Initialize speech synthesis
export function initSpeechSynthesis(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return false;
  }
  
  // Force trigger voices loading
  window.speechSynthesis.getVoices();
  return true;
}

// Helper to find the best voice to use - prioritize Indian female voice
export function findBestVoice(preferredLanguage: string = 'en-IN'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return null;
  }
  
  // First preference: Indian female voice
  const indianFemaleVoice = voices.find(
    voice => (voice.name.includes('Indian') || voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
             voice.name.toLowerCase().includes('female')
  );
  
  if (indianFemaleVoice) {
    console.log("Found Indian female voice:", indianFemaleVoice.name);
    return indianFemaleVoice;
  }
  
  // Second preference: Any female voice
  const femaleVoice = voices.find(
    voice => voice.name.toLowerCase().includes('female')
  );
  
  if (femaleVoice) {
    console.log("Using female voice as fallback:", femaleVoice.name);
    return femaleVoice;
  }
  
  // Fallback to any voice
  console.log("No suitable female voice found, using default voice");
  return voices[0];
}

// Speak a message with given settings
export function speakMessage(message: string, settings: VoiceSettings = DEFAULT_VOICE_SETTINGS, forceSpeak: boolean = false): void {
  // Don't speak if voice is disabled or muted, unless forced
  if ((!settings.enabled || settings.muted) && !forceSpeak) {
    return;
  }
  
  // Check browser support
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Process message for better pronunciation
    const processedMessage = message
      .replace(/PREPZR/g, "PREP EEZER")
      .replace(/PREP-ZR/g, "PREP EEZER")
      .replace(/Prepzr/g, "Prep eezer");
    
    // Create and configure speech utterance
    const utterance = new SpeechSynthesisUtterance(processedMessage);
    utterance.volume = settings.volume;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.lang = 'en-IN'; // Force Indian English
    
    // Find the best voice to use - prioritize Indian female voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = findBestVoice('en-IN');
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log("Using voice:", preferredVoice.name);
    } else {
      console.log("No preferred voice found, using default");
    }
    
    // Dispatch custom events for speech start/end
    utterance.onstart = () => {
      document.dispatchEvent(
        new CustomEvent('voice-speaking-started', { 
          detail: { message: processedMessage } 
        })
      );
    };
    
    utterance.onend = () => {
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error in speech synthesis:', error);
  }
}

// Get greeting based on user state
export function getGreeting(userName?: string, mood?: string, isFirstTimeUser: boolean = false): string {
  const hour = new Date().getHours();
  let timeGreeting;
  
  if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 17) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }
  
  // Different greeting for first time users
  if (isFirstTimeUser) {
    return `${timeGreeting} and welcome to PREP-EEZER! I'm your AI study assistant. I'll help you prepare for your exams more effectively. Let me show you around.`;
  }
  
  // For returning users
  const name = userName ? `, ${userName}` : '';
  let moodResponse = '';
  
  if (mood) {
    switch(mood.toLowerCase()) {
      case 'motivated':
        moodResponse = " I see you're feeling motivated today. That's great! Let's make the most of that energy.";
        break;
      case 'anxious':
        moodResponse = " I notice you're feeling anxious. Don't worry, we'll take things step by step today.";
        break;
      case 'tired':
        moodResponse = " I see you're feeling tired. Let's focus on some lighter review topics today.";
        break;
      case 'focused':
        moodResponse = " You're feeling focused today. Perfect time to tackle some challenging concepts!";
        break;
    }
  }
  
  return `${timeGreeting}${name}. Welcome back to PREP-EEZER${moodResponse}`;
}

// Get announcement for reminders
export function getReminderAnnouncement(pendingTasks: Array<{title: string, due?: string}> = []): string {
  if (!pendingTasks || pendingTasks.length === 0) {
    return "You don't have any pending tasks at the moment. Great job staying on top of things!";
  }
  
  const taskCount = pendingTasks.length;
  let announcement = `You have ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} pending. `;
  
  if (taskCount <= 3) {
    // List all tasks if there are 3 or fewer
    announcement += "These include: ";
    pendingTasks.forEach((task, index) => {
      if (index > 0) {
        announcement += index === taskCount - 1 ? " and " : ", ";
      }
      announcement += task.title;
      if (task.due) {
        announcement += ` due ${task.due}`;
      }
    });
  } else {
    // Just mention the most important ones if there are many
    announcement += "The most urgent ones are: ";
    for (let i = 0; i < 2; i++) {
      if (i > 0) announcement += " and ";
      announcement += pendingTasks[i].title;
      if (pendingTasks[i].due) {
        announcement += ` due ${pendingTasks[i].due}`;
      }
    }
    announcement += `. And ${taskCount - 2} more.`;
  }
  
  return announcement;
}

// Get motivational message
export function getMotivationalMessage(examGoal?: string): string {
  const messages = [
    "Remember, consistency is key to success. Keep up the good work!",
    "Every minute of study brings you closer to your goal. You're doing great!",
    "The difference between ordinary and extraordinary is that little extra effort you're putting in.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your hard work today will pay off tomorrow. Keep going!"
  ];
  
  // Exam specific messages
  if (examGoal) {
    const examName = examGoal.toUpperCase();
    const examSpecificMessages = [
      `Stay focused on your ${examName} preparation. You're building knowledge every day.`,
      `Remember why you started preparing for ${examName}. You've got this!`,
      `Your dedication to ${examName} will open doors to great opportunities.`
    ];
    
    // Add exam specific messages to the general pool
    messages.push(...examSpecificMessages);
  }
  
  // Return a random message
  return messages[Math.floor(Math.random() * messages.length)];
}

// Process user speech command
export function processUserQuery(
  query: string,
  navigate: Function,
  options: {
    startTest?: Function,
    switchLanguage?: Function,
    showFlashcards?: Function,
    examGoal?: string
  } = {}
): string {
  const lowerQuery = query.toLowerCase();
  
  // Handle mute/unmute commands
  if (lowerQuery.includes('mute') || lowerQuery.includes('be quiet') || lowerQuery.includes('stop talking')) {
    return "MUTE_COMMAND";
  }
  
  if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking') || lowerQuery.includes('speak again')) {
    return "UNMUTE_COMMAND";
  }
  
  // Handle language switch
  if (lowerQuery.includes('speak hindi') || lowerQuery.includes('switch to hindi') || lowerQuery.includes('hindi')) {
    if (options.switchLanguage) {
      options.switchLanguage('hi-IN');
    }
    return "अब मैं हिंदी में बात करूंगी। कैसे मदद कर सकती हूँ?"; // "I'll now speak in Hindi. How can I help you?"
  }
  
  if (lowerQuery.includes('speak english') || lowerQuery.includes('switch to english') || lowerQuery.includes('english')) {
    if (options.switchLanguage) {
      options.switchLanguage('en-US');
    }
    return "I'll now speak in English. How can I help you?";
  }
  
  // Navigation commands
  if (lowerQuery.includes('go to dashboard') || lowerQuery.includes('show dashboard')) {
    navigate('/dashboard/student');
    return "Navigating to the dashboard.";
  }
  
  if (lowerQuery.includes('go to study plan') || lowerQuery.includes('show study plan') || lowerQuery.includes('my study plan')) {
    navigate('/dashboard/student/study-plan');
    return "Opening your study plan.";
  }
  
  // Specific features
  if (lowerQuery.includes('start test') || lowerQuery.includes('take test') || lowerQuery.includes('practice test')) {
    if (options.startTest) {
      options.startTest();
      return "Starting a practice test for you.";
    } else {
      navigate('/dashboard/student/practice-exam');
      return "Navigating to the practice test section.";
    }
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
    if (options.showFlashcards) {
      options.showFlashcards();
      return "Opening your flashcards.";
    } else {
      navigate('/dashboard/student/flashcards');
      return "Navigating to the flashcards section.";
    }
  }
  
  // Information requests
  if (lowerQuery.includes('who are you') || lowerQuery.includes('what are you') || lowerQuery.includes('your name')) {
    return "I'm the PREP-EEZER voice assistant. I'm here to help you with your exam preparation and navigate through the platform. What would you like to learn more about?";
  }
  
  if (lowerQuery.includes('tell me about') || lowerQuery.includes('what is prepzr') || lowerQuery.includes('about prepzr')) {
    return "PREP-EEZER is an emotionally intelligent study partner designed to help students crack competitive exams like NEET and IIT-JEE. We offer personalized study plans, adaptive learning, and AI-powered assistance tailored to your unique learning style and emotional state.";
  }
  
  // Fallback response
  return "How can I help you with your studies today? You can ask me about your study plan, practice tests, or how to use specific features of PREP-EEZER.";
}
