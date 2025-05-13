
import { VoiceSettings } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1,
  rate: 1,
  pitch: 1,
  language: 'en-US',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'es-ES', label: 'Spanish' },
  { value: 'fr-FR', label: 'French' },
  { value: 'de-DE', label: 'German' },
];

// Find the best voice for a given language
export const findBestVoice = (language: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // First try to find an exact match
  let matchingVoices = voices.filter(voice => voice.lang === language);
  
  // If no exact match, try to find a voice for the same primary language
  if (matchingVoices.length === 0) {
    const primaryLanguage = language.split('-')[0];
    matchingVoices = voices.filter(voice => voice.lang.startsWith(primaryLanguage));
  }
  
  // If we found matching voices, prefer non-default ones as they're often higher quality
  if (matchingVoices.length > 0) {
    const nonDefaultVoices = matchingVoices.filter(voice => !voice.default);
    return nonDefaultVoices.length > 0 ? nonDefaultVoices[0] : matchingVoices[0];
  }
  
  return null;
};

// Speak a message with proper PREPZR pronunciation
export const speakMessage = (
  message: string, 
  voiceSettings: VoiceSettings
): void => {
  if (!voiceSettings.enabled || voiceSettings.muted) return;
  
  // Improved pronunciation for PREPZR with proper pause
  message = fixPronunciation(message);
  
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.volume = voiceSettings.volume;
  utterance.rate = voiceSettings.rate;
  utterance.pitch = voiceSettings.pitch;
  utterance.lang = voiceSettings.language;
  
  // Use selected voice if available
  if (voiceSettings.voice) {
    utterance.voice = voiceSettings.voice;
  } else {
    // Try to find a good voice for the selected language
    const voices = speechSynthesis.getVoices();
    const bestVoice = findBestVoice(voiceSettings.language, voices);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  }
  
  // Add custom events for tracking speech status
  utterance.onstart = () => {
    document.body.classList.add('voice-speaking');
    document.dispatchEvent(new CustomEvent('voice-speaking-started', {
      detail: { message }
    }));
  };
  
  utterance.onend = () => {
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  };
  
  utterance.onerror = (event) => {
    document.body.classList.remove('voice-speaking');
    console.error('Speech synthesis error:', event);
    document.dispatchEvent(new CustomEvent('voice-speaking-error', {
      detail: { error: event }
    }));
  };
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Fix pronunciation for specific words
export const fixPronunciation = (text: string): string => {
  // Handle PREPZR pronunciation - add slight pause between syllables
  return text
    .replace(/PREPZR/gi, 'Prep, zer')
    .replace(/prepzr/gi, 'Prep, zer');
};
