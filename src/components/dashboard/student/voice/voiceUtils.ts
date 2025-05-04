
// Voice settings type definition
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: 'en-IN' | 'hi-IN';
  voice?: SpeechSynthesisVoice | null;
}

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN',
  voice: null
};

// Function to initialize speech synthesis
export function initSpeechSynthesis(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

// Check if speech synthesis is supported by the browser
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Speak a message using the provided settings
export function speakMessage(message: string, settings: VoiceSettings, force: boolean = false): void {
  if (!isSpeechSynthesisSupported()) {
    console.error("Speech synthesis is not supported in this browser");
    return;
  }

  if (!settings.enabled && !force) {
    console.log("Voice is disabled, not speaking:", message);
    return;
  }
  
  try {
    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Apply settings
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = settings.language;
    
    // Try to get a voice that matches the language
    if (!settings.voice) {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices);
      
      if (voices.length > 0) {
        // Find a voice that matches the language or use the first available one
        const matchingVoice = voices.find(voice => voice.lang.includes(settings.language)) || voices[0];
        utterance.voice = matchingVoice;
        console.log("Selected voice:", matchingVoice);
      }
    } else {
      utterance.voice = settings.voice;
    }
    
    // Event handling
    utterance.onstart = () => {
      console.log("Started speaking:", message);
      document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
    };
    
    utterance.onend = () => {
      console.log("Finished speaking");
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error("Error speaking:", event);
    };
    
    // Force reload voices if none available yet
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = function() {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const matchingVoice = voices.find(voice => voice.lang.includes(settings.language)) || voices[0];
          utterance.voice = matchingVoice;
          console.log("Loaded voices after onvoiceschanged:", voices);
          console.log("Selected voice:", matchingVoice);
          window.speechSynthesis.speak(utterance);
        }
      };
    } else {
      // Speak the message
      window.speechSynthesis.speak(utterance);
    }
    
    // Fix for Chrome issues where speech can get cut off
    if (window.navigator.userAgent.includes('Chrome')) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  } catch (error) {
    console.error("Error speaking message:", error);
  }
}

// Get appropriate greeting based on user state
export function getGreeting(userName?: string, mood?: string, isFirstTimeUser: boolean = false): string {
  const hour = new Date().getHours();
  let timeBasedGreeting = "Hello";
  
  if (hour < 12) {
    timeBasedGreeting = "Good morning";
  } else if (hour < 18) {
    timeBasedGreeting = "Good afternoon";
  } else {
    timeBasedGreeting = "Good evening";
  }
  
  const nameGreeting = userName ? `, ${userName}` : "";
  
  // First-time user welcome
  if (isFirstTimeUser) {
    return `${timeBasedGreeting}${nameGreeting}! Welcome to PREPZR. I'm your virtual assistant and I'll help you navigate the platform. Feel free to ask me anything about your study plan or exams.`;
  }
  
  // Mood-based greeting
  if (mood) {
    switch (mood.toLowerCase()) {
      case 'motivated':
        return `${timeBasedGreeting}${nameGreeting}! I see you're feeling motivated today. That's great! Let's make the most of your study session.`;
      case 'focused':
        return `${timeBasedGreeting}${nameGreeting}! You're feeling focused - perfect time to tackle those challenging topics.`;
      case 'tired':
        return `${timeBasedGreeting}${nameGreeting}. I see you're feeling tired. Would you like to try a shorter study session today?`;
      case 'anxious':
        return `${timeBasedGreeting}${nameGreeting}. I understand you're feeling anxious. Let's focus on reviewing material you're already comfortable with to build confidence.`;
      default:
        break;
    }
  }
  
  // Default greeting
  return `${timeBasedGreeting}${nameGreeting}! How can I assist with your studies today?`;
}

// Generate reminder announcement
export function getReminderAnnouncement(
  pendingTasks: Array<{title: string, due?: string}> = [], 
  examGoal?: string
): string {
  if (pendingTasks.length === 0) return '';
  
  let message = '';
  
  if (pendingTasks.length === 1) {
    message = `You have a pending task: ${pendingTasks[0].title}`;
    if (pendingTasks[0].due) {
      message += ` due ${pendingTasks[0].due}`;
    }
  } else {
    message = `You have ${pendingTasks.length} pending tasks. The most urgent is: ${pendingTasks[0].title}`;
    if (pendingTasks[0].due) {
      message += ` due ${pendingTasks[0].due}`;
    }
  }
  
  if (examGoal) {
    message += `. Remember, your goal is to prepare for ${examGoal}.`;
  }
  
  return message;
}

// Process user voice input
export function processUserQuery(
  query: string,
  navigate: any,
  actions: {
    startTest?: () => void,
    switchLanguage?: (lang: 'en-IN' | 'hi-IN') => void,
    showFlashcards?: () => void,
    examGoal?: string
  } = {}
): string {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Navigation commands
  if (normalizedQuery.includes('go to dashboard') || normalizedQuery.includes('show dashboard')) {
    navigate('/dashboard/student');
    return 'Navigating to dashboard.';
  }
  
  if (normalizedQuery.includes('go to flashcards') || normalizedQuery.includes('show flashcards')) {
    navigate('/dashboard/student/flashcards');
    return 'Navigating to flashcards.';
  }
  
  if (normalizedQuery.includes('go to practice') || normalizedQuery.includes('start practice test')) {
    if (actions.startTest) {
      actions.startTest();
      return 'Starting practice test.';
    }
    
    navigate('/dashboard/student/practice-exam');
    return 'Navigating to practice exams.';
  }
  
  // Study plan commands
  if (normalizedQuery.includes('study plan') || normalizedQuery.includes('my plan')) {
    navigate('/dashboard/student/academic');
    return 'Here is your study plan. You can view your progress and upcoming topics.';
  }
  
  // Language commands
  if (normalizedQuery.includes('switch to hindi') || normalizedQuery.includes('speak hindi')) {
    if (actions.switchLanguage) {
      actions.switchLanguage('hi-IN');
      return 'भाषा हिंदी में बदली गई है।'; // Language has been changed to Hindi
    }
    return 'I cannot switch languages right now.';
  }
  
  if (normalizedQuery.includes('switch to english') || normalizedQuery.includes('speak english')) {
    if (actions.switchLanguage) {
      actions.switchLanguage('en-IN');
      return 'Language has been changed to English.';
    }
    return 'I cannot switch languages right now.';
  }
  
  // Information about exam
  if ((normalizedQuery.includes('exam') || normalizedQuery.includes('test')) && 
      (normalizedQuery.includes('when') || normalizedQuery.includes('date'))) {
    const examGoal = actions.examGoal || 'your exam';
    return `Your ${examGoal} preparation is ongoing. You should review your study plan to see the suggested timeline.`;
  }
  
  // Fallback response
  return 'I understand you said: "' + query + '". How can I help you with your studies today?';
}
