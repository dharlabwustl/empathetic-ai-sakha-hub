import { VoiceSettings } from '@/types/voice';

// Default settings for voice
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'en-US', label: 'English (American)' },
  { value: 'en-GB', label: 'English (British)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Function to find the best voice for a given language preference
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // First try to find exact match
  let exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;
  
  // Then try to find a voice that starts with the language code
  const langPrefix = language.split('-')[0];
  let prefixMatch = voices.find(voice => voice.lang.startsWith(langPrefix));
  if (prefixMatch) return prefixMatch;
  
  // Otherwise return first voice or null
  return voices.length > 0 ? voices[0] : null;
};

// Function to fix pronunciation of specific words
export const fixPronunciation = (text: string): string => {
  // Replace "PREPZR" with "Prep zer" for better pronunciation
  let correctedText = text.replace(/PREPZR/gi, 'Prep-zer');
  
  // Add more pronunciation rules as needed
  // correctedText = correctedText.replace(/other word/gi, 'correct pronunciation');
  
  return correctedText;
};

// Function to speak a message using Web Speech API
export const speakMessage = (
  message: string,
  settings: VoiceSettings
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(fixPronunciation(message));
  
  // Set voice based on language preference
  if (!settings.voice) {
    const bestVoice = findBestVoice(settings.language);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  } else {
    utterance.voice = settings.voice;
  }
  
  // Set other parameters
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Fire custom event when speech starts
  document.dispatchEvent(new CustomEvent('voice-speaking-started', {
    detail: { message }
  }));
  
  // Set up event listener for when speech ends
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Start speaking
  window.speechSynthesis.speak(utterance);
};
