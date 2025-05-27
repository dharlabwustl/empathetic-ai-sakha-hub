
// Centralized voice configuration for consistent female voice across the app
export interface VoiceConfig {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  language: string;
}

export const getPreferredFemaleVoice = (): SpeechSynthesisVoice | null => {
  if (!('speechSynthesis' in window)) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // Priority order for female voices
  const femaleVoicePreferences = [
    'Google US English Female',
    'Microsoft Zira',
    'Microsoft Hazel',
    'Samantha',
    'Karen',
    'Moira',
    'Tessa',
    'Victoria',
    'Fiona',
    'female',
    'woman'
  ];
  
  // First, try to find exact matches
  for (const preference of femaleVoicePreferences) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(preference.toLowerCase())
    );
    if (voice) return voice;
  }
  
  // Then try to find voices that don't contain "male" and are English
  const englishFemaleVoices = voices.filter(voice => 
    voice.lang.includes('en') && 
    !voice.name.toLowerCase().includes('male') &&
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     !voice.name.toLowerCase().includes('man'))
  );
  
  if (englishFemaleVoices.length > 0) {
    return englishFemaleVoices[0];
  }
  
  // Fallback to any English voice
  const englishVoices = voices.filter(voice => voice.lang.includes('en'));
  return englishVoices.length > 0 ? englishVoices[0] : null;
};

export const getDefaultVoiceConfig = (): VoiceConfig => {
  return {
    voice: getPreferredFemaleVoice(),
    rate: 0.95,
    pitch: 1.1,
    volume: 0.8,
    language: 'en-US'
  };
};

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  // Fix pronunciation of PREPZR as requested - "Prep Zer"
  utterance.text = text.replace(/PREPZR/gi, 'Prep Zer');
  utterance.lang = finalConfig.language;
  utterance.rate = finalConfig.rate;
  utterance.pitch = finalConfig.pitch;
  utterance.volume = finalConfig.volume;
  
  if (finalConfig.voice) {
    utterance.voice = finalConfig.voice;
  }
  
  return utterance;
};

export const speakWithFemaleVoice = (
  text: string, 
  config?: Partial<VoiceConfig>,
  onStart?: () => void,
  onEnd?: () => void
): void => {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = createFemaleUtterance(text, config);
  
  if (onStart) {
    utterance.onstart = onStart;
  }
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  window.speechSynthesis.speak(utterance);
};
