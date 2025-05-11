
import { VoiceSettings } from '@/types/voice';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US'
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Fixes common pronunciation issues
export const fixPronunciation = (text: string): string => {
  // Replace common abbreviations and symbols
  return text
    .replace(/NEET/g, 'neet')
    .replace(/JEE/g, 'J E E')
    .replace(/IIT/g, 'I I T')
    .replace(/MBBS/g, 'M B B S')
    .replace(/pH/g, 'p H')
    .replace(/H\+/g, 'H plus')
    .replace(/CO2/g, 'C O 2')
    .replace(/O2/g, 'O 2')
    .replace(/\*/g, ' times ')
    .replace(/\//g, ' divided by ')
    .replace(/\+/g, ' plus ')
    .replace(/-/g, ' minus ')
    .replace(/=/g, ' equals ')
    .replace(/PrepZR/gi, 'Prep Z R');
};

// Find best voice for the selected language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // First try to find a voice that exactly matches the language
  const exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;
  
  // Next, try to find a voice that starts with the language code
  const partialMatch = voices.find(voice => voice.lang.startsWith(language.split('-')[0]));
  if (partialMatch) return partialMatch;
  
  // If no match, use the first available voice or null
  return voices[0] || null;
};

// Main speech function
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (!window.speechSynthesis || settings.muted) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(fixPronunciation(message));
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Find best voice
  const voice = findBestVoice(settings.language);
  if (voice) utterance.voice = voice;
  
  // Add events for tracking speaking state
  utterance.onstart = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
    document.body.classList.add('voice-speaking');
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  // Start speaking
  window.speechSynthesis.speak(utterance);
};

// Get a greeting based on mood and time of day
export const getMoodBasedGreeting = (
  name: string, 
  mood?: string, 
  time?: Date
): string => {
  const currentTime = time || new Date();
  const hour = currentTime.getHours();
  
  // Time-based greeting
  let greeting = '';
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  // Basic greeting
  let message = `${greeting}, ${name}. Welcome to PrepZR.`;
  
  // Add mood-specific message
  if (mood) {
    switch (mood.toLowerCase()) {
      case 'happy':
        message += " I'm glad you're feeling happy today! This is a great time to tackle challenging topics.";
        break;
      case 'motivated':
        message += " Your motivated mood is perfect for making progress on your study goals today.";
        break;
      case 'focused':
        message += " Since you're feeling focused, let's dive into some deep learning today.";
        break;
      case 'tired':
        message += " I notice you're feeling tired. Let's focus on shorter study sessions with more breaks today.";
        break;
      case 'stressed':
        message += " I see you're feeling stressed. We can start with some easier review topics to build confidence.";
        break;
    }
  }
  
  return message;
};
