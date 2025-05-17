
import { VoiceSettings } from '@/types/voice';

// Default voice settings with Hindi as the default language
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 0.8,
  rate: 0.9,
  pitch: 1.0,
  language: 'hi-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options available in the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' }
];

// Finds the best voice for a given language preference
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // Priority matches based on language
  const exactLanguageMatch = voices.find(voice => voice.lang === language);
  if (exactLanguageMatch) return exactLanguageMatch;
  
  // For Hindi, look for any Hindi voice
  if (language === 'hi-IN') {
    const anyHindiVoice = voices.find(voice => voice.lang.includes('hi'));
    if (anyHindiVoice) return anyHindiVoice;
  }
  
  // For Indian English, try to find Indian female voice
  if (language === 'en-IN') {
    const indianFemaleVoice = voices.find(v => 
      v.lang === 'en-IN' && 
      (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana'))
    );
    if (indianFemaleVoice) return indianFemaleVoice;
  }
  
  // Fallback to any voice for the language
  const languagePrefixMatch = voices.find(voice => voice.lang.startsWith(language.split('-')[0]));
  if (languagePrefixMatch) return languagePrefixMatch;
  
  // Last resort: just return any voice
  return voices[0] || null;
};

// Fix pronunciation for special terms and provide multilingual support
export const fixPronunciation = (text: string, language: string): string => {
  let corrected = text;
  
  // Fix PREPZR pronunciation in all languages
  corrected = corrected.replace(/PREPZR/gi, 'Prep zer').replace(/prepzr/gi, 'Prep zer');
  
  // Language-specific corrections
  if (language === 'hi-IN') {
    // Add Hindi-specific pronunciations
    corrected = corrected
      .replace(/exam/gi, 'परीक्षा')
      .replace(/study/gi, 'अध्ययन')
      .replace(/NEET/g, 'नीट')
      .replace(/AI/gi, 'ए आई');
  }
  
  return corrected;
};

// Central function to speak messages with proper settings
export const speakMessage = (message: string, settings: VoiceSettings) => {
  if (!message || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Apply pronunciation fixes based on language
  const correctedMessage = fixPronunciation(message, settings.language);
  
  // Create and configure utterance
  const utterance = new SpeechSynthesisUtterance(correctedMessage);
  
  // Find the best voice based on language preference
  const bestVoice = findBestVoice(settings.language);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }
  
  // Apply voice settings
  utterance.lang = settings.language;
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
  
  // Dispatch event for UI indicators
  document.dispatchEvent(new CustomEvent('voice-speaking-started', {
    detail: { message: correctedMessage }
  }));
  
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  return utterance;
};

// Helper function to get multilingual greeting based on time and language
export const getTimeBasedGreeting = (language: string): string => {
  const hour = new Date().getHours();
  
  if (language === 'hi-IN') {
    if (hour < 12) return 'नमस्ते, सुप्रभात!';
    if (hour < 17) return 'नमस्ते, शुभ दोपहर!';
    return 'नमस्ते, शुभ संध्या!';
  } 
  
  if (language === 'en-IN') {
    if (hour < 12) return 'Namaste, Good morning!';
    if (hour < 17) return 'Namaste, Good afternoon!';
    return 'Namaste, Good evening!';
  }
  
  // Default English
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
};

// Generate voice commands for mood tracking
export const getMoodVoiceCommands = (): string[] => [
  "I'm feeling happy today",
  "I'm feeling tired",
  "I'm feeling motivated",
  "I'm feeling stressed",
  "I'm feeling anxious",
  "I'm feeling focused"
];

// Helper to get study-related voice commands
export const getStudyVoiceCommands = (): string[] => [
  "Show my study plan",
  "What should I study today?",
  "Create a new flashcard",
  "Open concept cards",
  "Help me prepare for NEET",
  "How to improve my score?"
];
