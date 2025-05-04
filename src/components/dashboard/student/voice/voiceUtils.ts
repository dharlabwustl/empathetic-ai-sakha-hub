
import { MoodType } from '@/types/user/base';
import { VoiceSpeakingStartedEvent } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  volume: 1.0,
  pitch: 1.05,  // Slightly higher pitch for a pleasant female voice
  rate: 0.90,   // Slightly slower rate for a calmer delivery
  voice: null,
  language: 'en-US',
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

// Helper to find the best voice to use - prioritizing Indian female voice
export function findBestVoice(preferredLanguage: string = 'en-US'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return null;
  }
  
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // First priority: Indian English female voice
  const indianEnglishFemaleVoice = voices.find(
    voice => (voice.name.includes('Indian') || voice.lang === 'en-IN') && 
             voice.name.toLowerCase().includes('female')
  );
  
  if (indianEnglishFemaleVoice) {
    console.log("Using Indian English female voice:", indianEnglishFemaleVoice.name);
    return indianEnglishFemaleVoice;
  }
  
  // Second priority: Hindi female voice
  const hindiFemaleVoice = voices.find(
    voice => voice.lang === 'hi-IN' && voice.name.toLowerCase().includes('female')
  );
  
  if (hindiFemaleVoice) {
    console.log("Using Hindi female voice:", hindiFemaleVoice.name);
    return hindiFemaleVoice;
  }
  
  // Third priority: Any Indian voice
  const indianVoice = voices.find(
    voice => voice.name.includes('Indian') || voice.lang === 'en-IN' || voice.lang === 'hi-IN'
  );
  
  if (indianVoice) {
    console.log("Using Indian voice:", indianVoice.name);
    return indianVoice;
  }
  
  // Fourth priority: Any female voice in the preferred language
  const femaleVoice = voices.find(
    voice => voice.lang.includes(preferredLanguage) && 
             voice.name.toLowerCase().includes('female')
  );
  
  if (femaleVoice) {
    console.log("Using female voice:", femaleVoice.name);
    return femaleVoice;
  }
  
  // Fifth priority: Any voice in the preferred language
  const languageVoice = voices.find(voice => voice.lang.includes(preferredLanguage));
  if (languageVoice) {
    console.log("Using language voice:", languageVoice.name);
    return languageVoice;
  }
  
  // Fallback: Use the first available voice
  console.log("Using fallback first voice:", voices[0]?.name);
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
      .replace(/PREPZR/gi, "PREH-p-zur")
      .replace(/PREP-ZR/gi, "PREH-p-zur")
      .replace(/Prepzr/g, "PREH-p-zur");
    
    // Create and configure speech utterance
    const utterance = new SpeechSynthesisUtterance(processedMessage);
    utterance.volume = settings.volume;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.lang = settings.language;
    
    // Find the best voice to use - prioritize Indian female voice
    const voice = findBestVoice(settings.language);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Dispatch custom events for speech start/end
    utterance.onstart = () => {
      document.dispatchEvent(
        new CustomEvent('voice-speaking-started', { 
          detail: { message } // Use original message for subtitles
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
    return `${timeGreeting} and a warm welcome to PREPZR. I'm your friendly AI study assistant here to help you prepare for your exams more effectively. Let me show you around at your pace.`;
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
  
  return `${timeGreeting}${name}. It's lovely to welcome you back to PREPZR${moodResponse} How may I assist you with your studies today?`;
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
    return "I'm the PREPZR voice assistant. I'm here to help you with your exam preparation and navigate through the platform. What would you like to learn more about?";
  }
  
  if (lowerQuery.includes('tell me about') || lowerQuery.includes('what is prepzr') || lowerQuery.includes('about prepzr')) {
    return "PREPZR is an emotionally intelligent study partner designed to help students crack competitive exams like NEET and IIT-JEE. We offer personalized study plans, adaptive learning, and AI-powered assistance tailored to your unique learning style and emotional state.";
  }
  
  // Fallback response
  return "How can I help you with your studies today? You can ask me about your study plan, practice tests, or how to use specific features of PREPZR.";
}
