
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
  
  // Priority order for female voices (confident, warm female voice)
  const femaleVoicePreferences = [
    'Google US English Female',
    'Microsoft Zira Desktop',
    'Microsoft Hazel Desktop',
    'Samantha',
    'Karen',
    'Moira',
    'Tessa',
    'Victoria',
    'Fiona',
    'Alex (Female)',
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
  
  // Then try to find voices that are clearly female
  const englishFemaleVoices = voices.filter(voice => 
    voice.lang.includes('en') && 
    !voice.name.toLowerCase().includes('male') &&
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('zira') ||
     voice.name.toLowerCase().includes('hazel') ||
     voice.name.toLowerCase().includes('cortana') ||
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
    rate: 0.95, // Slightly slower for clarity
    pitch: 1.1, // Slightly higher for female voice
    volume: 0.8, // Comfortable volume
    language: 'en-US'
  };
};

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Fixed pronunciation of PREPZR as "Prep Zer" throughout the app
  const processedText = text
    .replace(/PREPZR/gi, 'Prep Zer')
    .replace(/Sakha AI/gi, 'Prep Zer AI')
    .replace(/PrepZR/gi, 'Prep Zer')
    .replace(/Prepzr/gi, 'Prep Zer');
  
  utterance.text = processedText;
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
  
  // Cancel any ongoing speech to prevent overlap
  window.speechSynthesis.cancel();
  
  const utterance = createFemaleUtterance(text, config);
  
  if (onStart) {
    utterance.onstart = onStart;
  }
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
  };
  
  window.speechSynthesis.speak(utterance);
};

// Helper function to check if voice is available
export const isVoiceAvailable = (): boolean => {
  return 'speechSynthesis' in window && window.speechSynthesis.getVoices().length > 0;
};

// Helper function to wait for voices to load
export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};
