
// Voice utilities for the voice assistant

export interface VoiceSettings {
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  enabled: boolean;
  muted: boolean;
  voice: SpeechSynthesisVoice | null;
  autoGreet?: boolean;
}

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN', // Default to Indian English
  enabled: true,
  muted: false,
  voice: null
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'hi-IN', label: 'Hindi' },
];

// Find the best voice for the current language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  
  // Try to find an exact match
  let exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;
  
  // Try to find a voice with matching language code
  const langCode = language.split('-')[0];
  let partialMatch = voices.find(voice => voice.lang.startsWith(`${langCode}-`));
  if (partialMatch) return partialMatch;
  
  // Default to first available voice
  return voices[0];
};

// Improved pronunciation mappings for PREPZR and technical terms
const pronunciationMap: Record<string, string> = {
  'PREPZR': 'prep zer',
  'PrepZR': 'prep zer',
  'Prepzr': 'prep zer',
  'prepzr': 'prep zer',
  'NEET': 'neet',
  'JEE': 'J E E',
  'MCQ': 'M C Q',
  'IIT': 'I I T',
};

// Fix pronunciation of specific words
export const fixPronunciation = (text: string): string => {
  let result = text;
  
  // Replace all instances of words that need pronunciation fixes
  Object.entries(pronunciationMap).forEach(([word, pronunciation]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    result = result.replace(regex, pronunciation);
  });
  
  return result;
};

// Handle speaking a message with proper pronunciation
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance();
  
  // Fix pronunciation
  utterance.text = fixPronunciation(message);
  
  // Set language
  utterance.lang = settings.language;
  
  // Apply voice settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  
  // Find best voice for language
  const voice = findBestVoice(settings.language);
  if (voice) {
    utterance.voice = voice;
  }
  
  // Add events for tracking speaking status
  utterance.onstart = () => {
    document.body.classList.add('voice-speaking');
    const event = new CustomEvent('voice-speaking-started', { 
      detail: { message: utterance.text }
    });
    document.dispatchEvent(event);
  };
  
  utterance.onend = () => {
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Speech recognition commands for different features
export const getVoiceCommands = () => {
  return {
    navigation: [
      "Go to dashboard",
      "Show me my flashcards",
      "Open concepts",
      "Take me to practice tests",
      "Show my profile",
      "Navigate to study plan"
    ],
    mood: [
      "I'm feeling happy",
      "I'm tired today",
      "I feel motivated",
      "I'm stressed about the exam",
      "I'm anxious about my progress",
      "I'm feeling neutral"
    ],
    study: [
      "What should I study today?",
      "Show me my pending topics",
      "I need help with chemistry",
      "Create a study plan for physics",
      "How much time should I spend on biology?",
      "What are my weak areas?"
    ],
    general: [
      "What's my progress so far?",
      "Set a reminder for 5 PM",
      "Create a new note",
      "Search for organic chemistry",
      "How does this feature work?",
      "Tell me about my account"
    ]
  };
};

// Get mood-related voice commands
export const getMoodVoiceCommands = (): string[] => {
  return [
    "I'm feeling happy",
    "I'm tired today",
    "I feel motivated",
    "I'm stressed about the exam",
    "I'm anxious about my progress",
    "I'm feeling neutral"
  ];
};

// Get voice greeting based on the time of day and user status
export const getVoiceGreeting = (name: string, isFirstTimeUser: boolean, language: string = 'en'): string => {
  const hour = new Date().getHours();
  let timeGreeting = '';
  
  if (language === 'hi-IN' || language === 'hi') {
    // Hindi greetings
    if (hour < 12) {
      timeGreeting = `नमस्ते ${name}, सुप्रभात!`;
    } else if (hour < 17) {
      timeGreeting = `नमस्ते ${name}, शुभ दोपहर!`;
    } else {
      timeGreeting = `नमस्ते ${name}, शुभ संध्या!`;
    }
    
    if (isFirstTimeUser) {
      return `${timeGreeting} मैं आपका प्रेप-ज़ेड-आर वॉइस असिस्टेंट हूं। मैं आपकी पढ़ाई के लिए मदद कर सकता हूं। बस मुझसे पूछें!`;
    } else {
      return `${timeGreeting} आपकी पढ़ाई में मदद के लिए मैं यहां हूं। क्या आप कुछ पूछना चाहते हैं?`;
    }
  } else {
    // English greetings
    if (hour < 12) {
      timeGreeting = `Good morning, ${name}!`;
    } else if (hour < 17) {
      timeGreeting = `Good afternoon, ${name}!`;
    } else {
      timeGreeting = `Good evening, ${name}!`;
    }
    
    if (isFirstTimeUser) {
      return `${timeGreeting} I'm your PREPZR voice assistant. I can help you with your studies. Just ask me anything!`;
    } else {
      return `${timeGreeting} I'm here to help with your studies today. What would you like to know?`;
    }
  }
};
