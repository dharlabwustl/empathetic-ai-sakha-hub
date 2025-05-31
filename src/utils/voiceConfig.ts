
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

// Enhanced message tracking with session-based prevention
const spokenMessages = new Map<string, { timestamp: number; sessionId: string }>();
const SESSION_ID = Date.now().toString();
const MESSAGE_COOLDOWN = 60000; // 60 seconds cooldown for same message

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Enhanced pronunciation fixes for better clarity - FIXED PREPZR pronunciation
  const correctedText = text
    .replace(/PREPZR/gi, 'Prep Zer')  // Main brand pronunciation - FIXED
    .replace(/prepzr/gi, 'prep zer')
    .replace(/Prepzr/g, 'Prep Zer')
    .replace(/NEET/gi, 'N-E-E-T')    // Spell out NEET for clarity
    .replace(/JEE/gi, 'J-E-E')       // Spell out JEE for clarity
    .replace(/AI/gi, 'A-I');         // Spell out AI for clarity
  
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
  
  // Check if muted
  const savedMuteState = localStorage.getItem('prepzr_voice_muted');
  if (savedMuteState && JSON.parse(savedMuteState)) {
    console.log('🔇 Voice: Assistant is muted');
    return false;
  }
  
  // Enhanced repetition prevention with 60-second minimum
  const messageKey = text.toLowerCase().trim().substring(0, 50);
  const now = Date.now();
  const messageInfo = spokenMessages.get(messageKey);
  
  if (messageInfo && 
      messageInfo.sessionId === SESSION_ID && 
      (now - messageInfo.timestamp) < MESSAGE_COOLDOWN) {
    console.log('🔇 Voice: Preventing repetition (60s cooldown):', text.substring(0, 50) + '...');
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
  
  // Store the timestamp and session when we start speaking
  spokenMessages.set(messageKey, { timestamp: now, sessionId: SESSION_ID });
  
  window.speechSynthesis.speak(utterance);
  return true;
};

// Smart breaks between messages
export const createIntelligentPause = (duration: number = 3000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
