
import { SpeechSynthesisVoice } from '@/types/voice/types';

export type SupportedLanguage = 'en-GB' | 'en-US' | 'en-IN' | 'hi-IN';

export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: SupportedLanguage;
  voice: SpeechSynthesisVoice | null;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-GB', // Default to UK English
  voice: null
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-GB', label: 'UK English' },
  { value: 'en-US', label: 'US English' },
  { value: 'en-IN', label: 'Indian English' },
  { value: 'hi-IN', label: 'Hindi' }
];

export const getPreferredAccent = (): SupportedLanguage => {
  const savedAccent = localStorage.getItem('preferred_voice_accent');
  if (savedAccent && ['en-GB', 'en-US', 'en-IN', 'hi-IN'].includes(savedAccent)) {
    return savedAccent as SupportedLanguage;
  }
  return 'en-GB'; // Default to UK English
};

export const savePreferredAccent = (accent: SupportedLanguage): void => {
  localStorage.setItem('preferred_voice_accent', accent);
};

// Helper to get the best voice for a particular language
export const getBestVoiceForLanguage = (
  voices: SpeechSynthesisVoice[], 
  language: SupportedLanguage
): SpeechSynthesisVoice | null => {
  // Try to find a matching voice
  const languageVoices = voices.filter(voice => voice.lang?.startsWith(language));
  
  if (languageVoices.length === 0) {
    return null;
  }
  
  // Prefer higher quality voices if available
  const preferredVoiceTypes = [
    // UK English preferences
    ...(language === 'en-GB' ? [
      'Google UK English Female',
      'Microsoft Susan',
      'Daniel',
    ] : []),
    
    // US English preferences  
    ...(language === 'en-US' ? [
      'Google US English Female',
      'Microsoft Zira', 
      'Samantha'
    ] : []),
    
    // Indian English preferences
    ...(language === 'en-IN' ? [
      'Google हिन्दी',
      'Veena'
    ] : []),
    
    // Hindi preferences
    ...(language === 'hi-IN' ? [
      'Google हिन्दी',
      'Hindi India'
    ] : [])
  ];
  
  // Try to find preferred voice by name
  for (const preferredType of preferredVoiceTypes) {
    const found = languageVoices.find(voice => 
      voice.name?.includes(preferredType)
    );
    if (found) return found;
  }
  
  // If no preferred voice found, return the first voice for the language
  return languageVoices[0];
};
