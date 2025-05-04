import { MoodType } from '@/types/user/base';
import { VoiceSpeakingStartedEvent } from '@/types/voice';

// Default voice settings with Indian female voice preference
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 1.0,
  pitch: 1.1,  // Higher pitch for female voice
  rate: 0.92,  // Slightly slower for better clarity and calmer delivery
  voice: null, // This will be set dynamically
  language: 'en-IN',
  autoGreet: true
};

/**
 * Find the best voice for a specific language
 */
export const findBestVoice = (preferredLang: string = 'en-IN'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  
  // First, look for female Indian voices
  const femaleIndianVoice = voices.find(voice => 
    voice.lang.includes(preferredLang) && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleIndianVoice) {
    return femaleIndianVoice;
  }
  
  // Next, look for any Indian voice
  const indianVoice = voices.find(voice => voice.lang.includes(preferredLang));
  if (indianVoice) {
    return indianVoice;
  }
  
  // As a fallback, try to find any English female voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.includes('en') && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleEnglishVoice) {
    return femaleEnglishVoice;
  }
  
  // Last resort, just pick the first English voice we can find
  return voices.find(voice => voice.lang.includes('en')) || voices[0];
};

// Helper function to speak a message
export const speakMessage = (
  message: string, 
  settings: VoiceSettings = DEFAULT_VOICE_SETTINGS
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  
  if (!settings.enabled || settings.muted) {
    console.log('Voice is disabled or muted', { enabled: settings.enabled, muted: settings.muted });
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Try to find the best voice
  const bestVoice = findBestVoice(settings.language);
  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log('Using voice:', bestVoice.name);
  }
  
  // Track speaking status with events
  utterance.onstart = () => {
    document.dispatchEvent(
      new CustomEvent('voice-speaking-started', { detail: { message } })
    );
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Get greeting based on user state with a calmer, more pleasant tone
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
    return `${timeGreeting} and a warm welcome to PREP-EZER. I'm your friendly AI study assistant here to help you prepare for your exams more effectively. Let me show you around at your pace.`;
  }
  
  // For returning users
  const name = userName ? `, ${userName}` : '';
  let moodResponse = '';
  
  if (mood) {
    switch(mood.toLowerCase()) {
      case 'motivated':
        moodResponse = " I'm happy to see you're feeling motivated today. Let's channel that positive energy into productive study time.";
        break;
      case 'anxious':
        moodResponse = " I notice you're feeling anxious. Don't worry, we'll take things one step at a time and make steady progress together.";
        break;
      case 'tired':
        moodResponse = " I see you're feeling tired. We can focus on lighter review topics or take breaks between study sessions today.";
        break;
      case 'focused':
        moodResponse = " You're feeling focused today. That's wonderful! This is a perfect opportunity to tackle some of the more challenging concepts.";
        break;
    }
  }
  
  return `${timeGreeting}${name}. Welcome back to PREP-EZER${moodResponse} How may I assist you with your studies today?`;
}

// Get announcement for reminders with a more pleasant tone
export function getReminderAnnouncement(pendingTasks: Array<{title: string, due?: string}> = []): string {
  if (!pendingTasks || pendingTasks.length === 0) {
    return "You don't have any pending tasks at the moment. Well done on staying organized with your studies!";
  }
  
  const taskCount = pendingTasks.length;
  let announcement = `You have ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} waiting for your attention. `;
  
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
    announcement += "The most important ones are: ";
    for (let i = 0; i < 2; i++) {
      if (i > 0) announcement += " and ";
      announcement += pendingTasks[i].title;
      if (pendingTasks[i].due) {
        announcement += ` due ${pendingTasks[i].due}`;
      }
    }
    announcement += `. And ${taskCount - 2} more tasks to review when you're ready.`;
  }
  
  return announcement;
}

// Get motivational message with a calmer, more pleasant tone
export function getMotivationalMessage(examGoal?: string): string {
  const messages = [
    "Remember, consistent, steady progress is the key to success. You're doing wonderfully!",
    "Every moment you spend studying brings you one step closer to achieving your goals. Keep going at your pace.",
    "The difference between ordinary and extraordinary is that little extra effort. And I can see you putting in that effort.",
    "Success is built through small efforts repeated day after day. Your dedication is truly inspiring.",
    "Your hard work today is preparing you for a brighter tomorrow. I'm here to support you every step of the way."
  ];
  
  // Exam specific messages
  if (examGoal) {
    const examName = examGoal.toUpperCase();
    const examSpecificMessages = [
      `Take a moment to appreciate how far you've come with your ${examName} preparation. Every concept you master is a victory.`,
      `Remember why you started preparing for ${examName}. Your determination will carry you through to success.`,
      `Your dedication to ${examName} is opening doors to wonderful opportunities for your future.`
    ];
    
    // Add exam specific messages to the general pool
    messages.push(...examSpecificMessages);
  }
  
  // Return a random message
  return messages[Math.floor(Math.random() * messages.length)];
}

// Process user speech command - keep functionality but improve responses to be calmer and more pleasant
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
    return "I'm the PREP-EZER voice assistant. I'm here to help you with your exam preparation and navigate through the platform. What would you like to learn more about?";
  }
  
  if (lowerQuery.includes('tell me about') || lowerQuery.includes('what is prepzr') || lowerQuery.includes('about prepzr')) {
    return "PREP-EZER is an emotionally intelligent study partner designed to help students crack competitive exams like NEET and IIT-JEE. We offer personalized study plans, adaptive learning, and AI-powered assistance tailored to your unique learning style and emotional state.";
  }
  
  // Fallback response
  return "How can I help you with your studies today? You can ask me about your study plan, practice tests, or how to use specific features of PREP-EZER.";
}
