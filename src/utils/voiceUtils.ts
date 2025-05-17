
/**
 * Fixes pronunciation of special words like PREPZR
 */
export const fixPronunciation = (text: string): string => {
  // Replace PREPZR with Prep-zer for better pronunciation
  return text.replace(/PREPZR/gi, 'Prep-zer');
};

/**
 * Find the best voice for the given language preference
 */
export const findBestVoice = (preferredLang: string = 'en-IN'): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  
  // First, try to match the exact language preference
  const exactMatch = voices.find(voice => voice.lang === preferredLang);
  if (exactMatch) return exactMatch;
  
  // Try to find an Indian English female voice
  if (preferredLang.includes('en-IN')) {
    const indianFemaleVoice = voices.find(voice => 
      (voice.lang === 'en-IN' || voice.name.includes('Indian')) && 
      (voice.name.toLowerCase().includes('female'))
    );
    if (indianFemaleVoice) return indianFemaleVoice;
  }
  
  // Try to find a Hindi voice
  if (preferredLang.includes('hi')) {
    const hindiVoice = voices.find(voice => voice.lang.includes('hi-'));
    if (hindiVoice) return hindiVoice;
  }
  
  // Try to match the language group (e.g., 'en' for 'en-US', 'en-GB', etc.)
  const languageGroup = preferredLang.split('-')[0];
  const languageGroupMatch = voices.find(voice => voice.lang.startsWith(`${languageGroup}-`));
  if (languageGroupMatch) return languageGroupMatch;
  
  // Default to the first voice as a fallback
  return voices[0];
};

// Define the supported languages for the voice assistant
export const SUPPORTED_LANGUAGES = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  muted: false,
  language: 'en-IN',
  rate: 1,
  pitch: 1.1,
  volume: 0.8
};
