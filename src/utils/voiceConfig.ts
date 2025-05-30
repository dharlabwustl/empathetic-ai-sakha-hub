
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

// Session-based message tracking with 60-second minimum intervals
const SESSION_ID = Date.now().toString();
const spokenMessages = new Map<string, { timestamp: number; sessionId: string }>();
const MIN_MESSAGE_INTERVAL = 60000; // 60 seconds minimum between messages

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Fix PREPZR pronunciation as specified
  const correctedText = text
    .replace(/PREPZR/gi, 'Prep-Zer')
    .replace(/prepzr/gi, 'prep-zer')
    .replace(/Prepzr/g, 'Prep-Zer');
  
  utterance.text = correctedText;
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
): boolean => {
  if (!('speechSynthesis' in window)) return false;
  
  // Enhanced anti-repetition with 60-second minimum interval
  const messageKey = text.toLowerCase().trim().substring(0, 50);
  const now = Date.now();
  const messageInfo = spokenMessages.get(messageKey);
  
  if (messageInfo && 
      messageInfo.sessionId === SESSION_ID && 
      (now - messageInfo.timestamp) < MIN_MESSAGE_INTERVAL) {
    console.log('🔇 Voice: 60-second interval not met for message:', text.substring(0, 30) + '...');
    return false;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = createFemaleUtterance(text, config);
  
  if (onStart) {
    utterance.onstart = onStart;
  }
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  // Store the timestamp when we start speaking
  spokenMessages.set(messageKey, { timestamp: now, sessionId: SESSION_ID });
  
  window.speechSynthesis.speak(utterance);
  return true;
};

// User activity detection for pausing voice
export const createUserActivityDetector = (onActivity: () => void) => {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  const activityHandler = () => {
    onActivity();
  };
  
  events.forEach(event => {
    document.addEventListener(event, activityHandler, { passive: true });
  });
  
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, activityHandler);
    });
  };
};

// Page navigation cleanup
export const createNavigationCleanup = () => {
  const cleanup = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  
  window.addEventListener('beforeunload', cleanup);
  window.addEventListener('popstate', cleanup);
  
  return () => {
    window.removeEventListener('beforeunload', cleanup);
    window.removeEventListener('popstate', cleanup);
  };
};

export const createIntelligentPause = (duration: number = 60000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
