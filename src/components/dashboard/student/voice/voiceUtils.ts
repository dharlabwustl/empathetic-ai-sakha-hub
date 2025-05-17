
import { VoiceSettings } from '@/types/voice';

// Default voice settings
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
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' }
];

// Function to find the best matching voice
export const findBestVoice = (settings: VoiceSettings): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  
  // Try to find a voice matching the language
  // For Indian English, prefer female voices
  if (settings.language === 'en-IN') {
    const indianFemaleVoice = voices.find(v => 
      (v.lang === 'en-IN' || v.name.includes('Indian')) && 
      (v.name.toLowerCase().includes('female') || v.name.includes('Kajal') || v.name.includes('Kalpana'))
    );
    if (indianFemaleVoice) return indianFemaleVoice;
  }
  
  // For Hindi
  if (settings.language === 'hi-IN') {
    const hindiVoice = voices.find(v => 
      v.lang === 'hi-IN' || v.name.includes('हिन्दी') || v.name.includes('Hindi')
    );
    if (hindiVoice) return hindiVoice;
  }
  
  // Try to find any voice that matches the language code
  const languageVoice = voices.find(v => v.lang.startsWith(settings.language));
  if (languageVoice) return languageVoice;
  
  // Fallback to any voice
  return voices[0];
};

// Fix pronunciation of specific words
export const fixPronunciation = (text: string): string => {
  // Replace PREPZR with Prep-zer (with a pause) for better pronunciation
  return text
    .replace(/PREPZR/gi, 'Prep-zer')
    .replace(/prepzr/gi, 'Prep-zer')
    .replace(/PrepZR/g, 'Prep-zer')
    .replace(/Prepzr/g, 'Prep-zer');
};

// Main function to speak a message
export const speakMessage = (text: string, settings: VoiceSettings, forceSpeech: boolean = false): void => {
  if (!window.speechSynthesis) return;
  
  // Don't speak if muted and not forced
  if (settings.muted && !forceSpeech) return;
  
  // Don't speak if voice is disabled and not forced
  if (!settings.enabled && !forceSpeech) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Fix pronunciation
  const correctedText = fixPronunciation(text);
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(correctedText);
  
  // Set voice if specified
  const voice = settings.voice || findBestVoice(settings);
  if (voice) {
    utterance.voice = voice;
  }
  
  // Set properties
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Dispatch event when speaking starts
  document.dispatchEvent(new CustomEvent('voice-speaking-started', {
    detail: { message: correctedText }
  }));
  
  // Add end event handler
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};
