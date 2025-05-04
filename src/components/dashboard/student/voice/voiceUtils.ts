
// Voice utility functions for PREPZR voice announcer

export type VoiceSettings = {
  volume: number;
  rate: number;
  pitch: number;
  language: 'en-IN' | 'hi-IN';
  enabled: boolean;
};

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1,
  rate: 1,
  pitch: 1.3, // Vibrant young female tone as requested
  language: 'en-IN',
  enabled: true,
};

// Voice cache to prevent repeating messages
let lastSpokenMessage = '';
let lastSpokenTimestamp = 0;

// Initialize speech synthesis
export const initSpeechSynthesis = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
};

// Select the appropriate voice based on language preference
export const selectVoice = (language: string): SpeechSynthesisVoice | null => {
  if (!initSpeechSynthesis()) return null;
  
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
  
  // Try to find an Indian female voice first
  let voice = voices.find(v => 
    v.lang.startsWith(language) && 
    v.name.toLowerCase().includes('female') &&
    (v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('indian'))
  );
  
  // If no specific Indian female voice, try any female voice for that language
  if (!voice) {
    voice = voices.find(v => 
      v.lang.startsWith(language) && 
      v.name.toLowerCase().includes('female')
    );
  }
  
  // As fallback, use any voice for that language
  if (!voice) {
    voice = voices.find(v => v.lang.startsWith(language));
  }
  
  // Last resort - just use the first voice available
  if (!voice && voices.length > 0) {
    voice = voices[0];
  }
  
  return voice;
};

// Format the PREPZR name for better pronunciation
export const formatPrepzrName = (text: string): string => {
  return text.replace(/PREPZR/g, 'prep-eez-er');
};

// Speak a message with the given settings
export const speakMessage = (
  message: string, 
  settings: VoiceSettings = DEFAULT_VOICE_SETTINGS,
  forceSpeak: boolean = false
): void => {
  if (!initSpeechSynthesis() || !settings.enabled) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Don't repeat the same message within 30 seconds unless forced
  const now = Date.now();
  if (!forceSpeak && 
      message === lastSpokenMessage && 
      now - lastSpokenTimestamp < 30000) {
    console.log('Preventing repeated message:', message);
    return;
  }
  
  lastSpokenMessage = message;
  lastSpokenTimestamp = now;
  
  // Format PREPZR name for better pronunciation
  const formattedMessage = formatPrepzrName(message);
  
  // Create and configure speech utterance
  const utterance = new SpeechSynthesisUtterance(formattedMessage);
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Select the appropriate voice
  const voice = selectVoice(settings.language);
  if (voice) {
    utterance.voice = voice;
  }
  
  // Add event listeners for debugging
  utterance.onstart = () => {
    console.log('Voice started speaking');
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { 
      detail: { message: formattedMessage } 
    }));
  };
  
  utterance.onend = () => {
    console.log('Voice finished speaking');
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
  };
  
  // Speak the message
  try {
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Failed to speak:', error);
  }
};

// Generate a greeting based on time of day and user mood
export const getGreeting = (
  userName?: string, 
  mood?: string, 
  isFirstTimeUser: boolean = false
): string => {
  const hour = new Date().getHours();
  let timeGreeting = '';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  // First time user greeting
  if (isFirstTimeUser) {
    return `Hi there! Welcome to PREPZR – your study partner! Let's get started when you're ready. Just tap the icon above to chat with me!`;
  }
  
  // Returning user greeting
  const userNameText = userName ? `, ${userName}` : '';
  
  // Base greeting
  let greeting = `${timeGreeting}${userNameText}! Welcome back to PREPZR!`;
  
  // Add mood-based suggestions
  if (mood) {
    switch(mood.toLowerCase()) {
      case 'tired':
        return `${greeting} I see you're feeling tired. How about a short 5-minute flashcard session to keep momentum?`;
      case 'anxious':
        return `${greeting} Feeling anxious? Let's try some focused breathing before jumping into today's study plan.`;
      case 'distracted':
        return `${greeting} Finding it hard to focus? Let's break down your study plan into smaller, manageable chunks today.`;
      case 'motivated':
        return `${greeting} You're motivated today! Let's make the most of it with a practice exam session!`;
      case 'confident':
        return `${greeting} Feeling confident! Great! Let's challenge yourself with some advanced problems today!`;
      case 'focused':
        return `${greeting} You're in the zone today! Perfect time to tackle those challenging concepts!`;
      default:
        return `${greeting} Ready to continue your prep? Let's aim high today!`;
    }
  }
  
  return `${greeting} Ready to continue your prep? Let's aim high today!`;
};

// Generate notifications for pending tasks
export const getReminderAnnouncement = (
  pendingTasks: Array<{title: string, due?: string}> = []
): string => {
  if (!pendingTasks.length) return '';
  
  if (pendingTasks.length === 1) {
    return `Don't forget, you have a pending ${pendingTasks[0].title} ${pendingTasks[0].due ? 'scheduled ' + pendingTasks[0].due : 'today'}.`;
  }
  
  return `You have ${pendingTasks.length} pending tasks, including ${pendingTasks[0].title} and ${pendingTasks[1].title}. Check your dashboard for details.`;
};

// Process user voice queries
export const processUserQuery = (
  query: string,
  navigate: (path: string) => void,
  callbacks: {
    startTest?: () => void;
    switchLanguage?: (lang: 'en-IN' | 'hi-IN') => void;
    showFlashcards?: () => void;
  } = {}
): string => {
  const lowerQuery = query.toLowerCase().trim();
  
  // Navigation commands
  if (lowerQuery.includes('go to') || lowerQuery.includes('open') || lowerQuery.includes('show')) {
    if (lowerQuery.includes('dashboard') || lowerQuery.includes('home')) {
      navigate('/dashboard/student');
      return "Opening your dashboard";
    } else if (lowerQuery.includes('profile')) {
      navigate('/dashboard/student/profile');
      return "Opening your profile page";
    } else if (lowerQuery.includes('today') || lowerQuery.includes('plan')) {
      navigate('/dashboard/student/today');
      return "Opening your today's plan";
    } else if (lowerQuery.includes('practice') || lowerQuery.includes('exam') || lowerQuery.includes('test')) {
      navigate('/dashboard/student/practice-exam');
      return "Opening practice exams";
    } else if (lowerQuery.includes('flash') || lowerQuery.includes('card')) {
      if (callbacks.showFlashcards) callbacks.showFlashcards();
      navigate('/dashboard/student/flashcards');
      return "Opening flashcards";
    } else if (lowerQuery.includes('concept')) {
      navigate('/dashboard/student/concepts');
      return "Opening concept cards";
    } else if (lowerQuery.includes('academic') || lowerQuery.includes('advisor')) {
      navigate('/dashboard/student/academic');
      return "Opening academic advisor";
    } else if (lowerQuery.includes('mood') || lowerQuery.includes('feel')) {
      navigate('/dashboard/student/feel-good-corner');
      return "Opening feel good corner";
    }
  }
  
  // Action commands
  if (lowerQuery.includes('start') || lowerQuery.includes('begin')) {
    if (lowerQuery.includes('test') || lowerQuery.includes('mock') || lowerQuery.includes('exam')) {
      if (callbacks.startTest) callbacks.startTest();
      return "Starting a new mock test for you";
    }
  }
  
  // Language commands
  if (lowerQuery.includes('switch') || lowerQuery.includes('change')) {
    if (lowerQuery.includes('hindi')) {
      if (callbacks.switchLanguage) callbacks.switchLanguage('hi-IN');
      return "भाषा को हिंदी में बदल रहा हूँ";
    } else if (lowerQuery.includes('english')) {
      if (callbacks.switchLanguage) callbacks.switchLanguage('en-IN');
      return "Switching language to English";
    }
  }
  
  // Study recommendations
  if (lowerQuery.includes('what should i') || lowerQuery.includes('recommend')) {
    if (lowerQuery.includes('study') || lowerQuery.includes('revise')) {
      return "Based on your recent progress, I recommend focusing on Physics concepts today, particularly the topics you flagged last week.";
    }
  }
  
  // Help commands
  if (lowerQuery.includes('help') || lowerQuery.includes('how to')) {
    if (lowerQuery.includes('flash') || lowerQuery.includes('card')) {
      return "To use flashcards, navigate to the Flashcards section from your dashboard. You can study cards by subject, create your own, or use our AI-generated cards based on your weak areas.";
    } else if (lowerQuery.includes('exam') || lowerQuery.includes('test')) {
      return "Our practice exams simulate real test conditions. You can take full-length tests or focus on specific subjects. Each test includes detailed explanations and performance analytics.";
    } else {
      return "You can ask me about your study plan, request to start a practice test, get help with features like flashcards, or navigate to different sections of the app.";
    }
  }
  
  // Default response
  return "I'm not sure how to help with that. You can ask me about your study plan, starting a test, using flashcards, or navigating the app.";
};
