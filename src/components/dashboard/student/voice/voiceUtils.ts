
// Define speech synthesis types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    speechSynthesis: SpeechSynthesis;
  }
}

export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  pitch: number;
  rate: number;
  voice: string | null;
  language: string;
  autoGreet: boolean;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 1.0,
  pitch: 1.0,
  rate: 1.0,
  voice: null, // Will be selected automatically
  language: 'en-US',
  autoGreet: true
};

// Initialize speech synthesis and check browser support
export function initSpeechSynthesis(): boolean {
  try {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return false;
    }
    
    console.log('Speech synthesis initialized with', window.speechSynthesis.getVoices().length, 'voices');
    return true;
  } catch (error) {
    console.error('Error initializing speech synthesis:', error);
    return false;
  }
}

// Get available voices for the current language
export function getVoicesForLanguage(language: string = 'en-US'): SpeechSynthesisVoice[] {
  if (!window.speechSynthesis) return [];
  
  const voices = window.speechSynthesis.getVoices();
  console.log('Available voices:', voices.length);
  
  // Filter by language if specified
  if (language) {
    const langVoices = voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));
    console.log(`Found ${langVoices.length} voices for language ${language}`);
    return langVoices.length > 0 ? langVoices : voices;
  }
  
  return voices;
}

// Get a specific voice by name or the first available one
export function getVoice(voiceName: string | null, language: string = 'en-US'): SpeechSynthesisVoice | null {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    console.warn('No voices available');
    return null;
  }
  
  // If a specific voice is requested, try to find it
  if (voiceName) {
    const voice = voices.find(v => v.name === voiceName);
    if (voice) return voice;
  }
  
  // Fall back to a language-specific voice
  const langVoices = voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));
  if (langVoices.length > 0) {
    // Prefer Google voices if available
    const googleVoice = langVoices.find(v => v.name.includes('Google'));
    return googleVoice || langVoices[0];
  }
  
  // Last resort: return any voice
  return voices[0];
}

// Speak a message with the specified settings
export function speakMessage(message: string, settings: VoiceSettings, force: boolean = false): void {
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Don't speak if voice is disabled and not forced
  if (!settings.enabled && !force) {
    console.log('Voice is disabled, not speaking:', message);
    return;
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Apply settings
    utterance.volume = settings.volume;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.lang = settings.language;
    
    // Get the voice to use
    const voice = getVoice(settings.voice, settings.language);
    if (voice) {
      utterance.voice = voice;
      console.log(`Using voice: ${voice.name} (${voice.lang})`);
    }
    
    // Add event listeners for speaking status
    utterance.onstart = () => {
      console.log('Speaking started:', message);
      document.dispatchEvent(new CustomEvent('voice-speaking-started'));
    };
    
    utterance.onend = () => {
      console.log('Speaking ended:', message);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error('Speaking error:', event);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    // Speak the message
    console.log('Speaking message:', message);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error speaking message:', error);
  }
}

// Generate a greeting message based on user state
export function getGreeting(userName?: string, mood?: string, isFirstTimeUser?: boolean): string {
  const hour = new Date().getHours();
  let timeOfDay = '';
  
  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';
  
  let greeting = '';
  
  if (isFirstTimeUser) {
    greeting = `Welcome to Prepzr${userName ? ', ' + userName : ''}! I'm your AI assistant and I'm here to help you with your studies. Feel free to ask me anything about your courses or how to navigate the app.`;
  } else {
    greeting = `Good ${timeOfDay}${userName ? ', ' + userName : ''}! Welcome back to Prepzr. `;
    
    if (mood) {
      switch (mood.toLowerCase()) {
        case 'focused':
          greeting += "I see you're feeling focused today. That's great! Let's make the most of this productive energy.";
          break;
        case 'tired':
          greeting += "I notice you're feeling tired. Don't worry, we can focus on lighter tasks today.";
          break;
        case 'confident':
          greeting += "You're feeling confident today! Perfect time to tackle some challenging topics.";
          break;
        case 'anxious':
          greeting += "I understand you're feeling anxious. Let's start with something easy to build momentum.";
          break;
        case 'distracted':
          greeting += "Feeling distracted? Let me help you focus on one thing at a time.";
          break;
        default:
          greeting += "How can I help you with your studies today?";
      }
    } else {
      greeting += "How can I help you with your studies today?";
    }
  }
  
  return greeting;
}

// Process a user voice query and provide a response
export function processUserQuery(
  query: string, 
  navigate: any,
  actions?: {
    startTest?: () => void,
    switchLanguage?: (lang: string) => void,
    showFlashcards?: () => void,
    examGoal?: string
  }
): string {
  const lowerQuery = query.toLowerCase();
  
  // Navigation commands
  if (lowerQuery.includes('go to dashboard') || lowerQuery.includes('show dashboard')) {
    navigate('/dashboard/student/overview');
    return "Taking you to the dashboard.";
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
    navigate('/dashboard/student/flashcards');
    if (actions?.showFlashcards) actions.showFlashcards();
    return "Opening the flashcards section.";
  }
  
  if (lowerQuery.includes('practice exam') || lowerQuery.includes('test')) {
    navigate('/dashboard/student/exams');
    if (actions?.startTest) actions.startTest();
    return "Let's practice with some exams.";
  }
  
  if (lowerQuery.includes('today') || lowerQuery.includes("today's plan")) {
    navigate('/dashboard/student/today');
    return "Here's your plan for today.";
  }
  
  if (lowerQuery.includes('tutor') || lowerQuery.includes('help me')) {
    navigate('/dashboard/student/tutor');
    return "I'm here to help. What would you like to learn about?";
  }
  
  if (lowerQuery.includes('feel good') || lowerQuery.includes('break') || lowerQuery.includes('relax')) {
    navigate('/dashboard/student/feel-good-corner');
    return "Let's take a short break in the Feel Good Corner.";
  }
  
  // Language setting commands
  if (lowerQuery.includes('speak in english') || lowerQuery.includes('switch to english')) {
    if (actions?.switchLanguage) actions.switchLanguage('en-US');
    return "I'll speak in English now.";
  }
  
  if (lowerQuery.includes('speak in spanish') || lowerQuery.includes('switch to spanish')) {
    if (actions?.switchLanguage) actions.switchLanguage('es-ES');
    return "Ahora hablaré en español.";
  }
  
  if (lowerQuery.includes('speak in french') || lowerQuery.includes('switch to french')) {
    if (actions?.switchLanguage) actions.switchLanguage('fr-FR');
    return "Je parlerai français maintenant.";
  }
  
  // Information queries
  if (lowerQuery.includes('what exam') || lowerQuery.includes('which test')) {
    const examGoal = actions?.examGoal || "No specific exam goal set";
    return `You're currently preparing for ${examGoal}.`;
  }
  
  if (lowerQuery.includes('who are you') || lowerQuery.includes('what are you')) {
    return "I'm Prepzr's AI assistant, designed to help you study more effectively and achieve your academic goals.";
  }
  
  // Default response for unrecognized queries
  return "I'm not sure how to help with that. You can ask me to navigate to different sections, start a practice test, or show your flashcards.";
}
