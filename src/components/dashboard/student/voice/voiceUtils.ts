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
  
  if (!('speechSynthesis' in window)) {
    console.error("Speech synthesis API is not available in this browser");
    return false;
  }
  
  if (!('SpeechSynthesisUtterance' in window)) {
    console.error("SpeechSynthesisUtterance is not available in this browser");
    return false;
  }
  
  // Try to access voices to ensure API is fully functioning
  try {
    const voices = window.speechSynthesis.getVoices();
    console.log("Initial voices check:", voices);
    
    // Force a reload of voices if none available
    if (voices.length === 0) {
      // Set up a listener for voices loaded
      window.speechSynthesis.onvoiceschanged = () => {
        const loadedVoices = window.speechSynthesis.getVoices();
        console.log("Voices loaded:", loadedVoices.length);
      };
    }
    
    return true;
  } catch (e) {
    console.error("Error initializing speech synthesis:", e);
    return false;
  }
}

// Check if speech synthesis is supported by the browser
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Force browser to allow audio playback
export function primeAudioContext(): void {
  try {
    // Create a short silent sound to activate audio context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0; // Silent
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.001);
      console.log("Audio context primed successfully");
    }
  } catch (e) {
    console.error("Error priming audio context:", e);
  }
}

// Speak a message using the provided settings - improved reliability
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
    // Prime audio context to ensure browser allows audio playback
    primeAudioContext();
    
    // Stop any current speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Apply settings with safe volume range
    utterance.volume = Math.max(0.1, Math.min(1.0, settings.volume)); // Ensure volume is never 0
    utterance.rate = Math.max(0.8, Math.min(1.2, settings.rate));     // Keep rate reasonable for best results
    utterance.pitch = settings.pitch;
    utterance.lang = settings.language;
    
    // Try to get a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices.length);
      
    if (voices.length > 0) {
      // Find a voice that matches the language or use the first available one
      const matchingVoice = voices.find(voice => voice.lang.includes(settings.language)) || voices[0];
      utterance.voice = matchingVoice;
      console.log("Selected voice:", matchingVoice?.name || "default");
    } else {
      console.warn("No voices available yet, using default voice");
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
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    // Chrome workaround
    if (window.navigator.userAgent.includes('Chrome')) {
      // Force resume if needed
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    
    // Speak with increased volume for better audibility
    utterance.volume = Math.min(1.0, settings.volume + 0.2); 
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
    
    // Additional Chrome fix - keep speech synthesis alive
    const intervalId = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(intervalId);
      } else {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 5000);
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
