
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
    rate: 0.9,
    pitch: 1.0,
    volume: 0.7, // Reduced volume to prevent echo
    language: 'en-US'
  };
};

// Enhanced message tracking with session-based prevention and echo prevention
const spokenMessages = new Map<string, { timestamp: number; sessionId: string }>();
const SESSION_ID = Date.now().toString();
const MESSAGE_COOLDOWN = 180000; // 3 minutes cooldown for same message
const SPEECH_DELAY = 500; // Delay before speaking to prevent echo

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Enhanced pronunciation fixes for PREPZR
  let processedText = text
    .replace(/PREPZR/gi, 'Prep-Zer')
    .replace(/Sakha AI/gi, 'Prep-Zer AI')
    .replace(/PrepZR/gi, 'Prep-Zer')
    .replace(/prep zr/gi, 'Prep-Zer')
    .replace(/prepzr/gi, 'Prep-Zer');
    
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
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(false);
      return;
    }
    
    // Enhanced repetition prevention
    const messageKey = text.toLowerCase().trim().substring(0, 50);
    const now = Date.now();
    const messageInfo = spokenMessages.get(messageKey);
    
    if (messageInfo && 
        messageInfo.sessionId === SESSION_ID && 
        (now - messageInfo.timestamp) < MESSAGE_COOLDOWN) {
      console.log('🔇 Voice: Preventing repetition of message:', text.substring(0, 50) + '...');
      resolve(false);
      return;
    }
    
    // Add delay to prevent echo
    setTimeout(() => {
      // Cancel any ongoing speech to prevent overlap
      window.speechSynthesis.cancel();
      
      const utterance = createFemaleUtterance(text, config);
      
      utterance.onstart = () => {
        console.log('🎙️ Voice: Speaking:', text.substring(0, 50) + '...');
        if (onStart) onStart();
      };
      
      utterance.onend = () => {
        console.log('✅ Voice: Finished speaking');
        if (onEnd) onEnd();
        resolve(true);
      };
      
      utterance.onerror = (error) => {
        console.error('❌ Voice: Error:', error);
        if (onEnd) onEnd();
        resolve(false);
      };
      
      // Store the timestamp and session when we start speaking
      spokenMessages.set(messageKey, { timestamp: now, sessionId: SESSION_ID });
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('❌ Voice: Speech synthesis error:', error);
        resolve(false);
      }
    }, SPEECH_DELAY);
  });
};

// Smart breaks between messages
export const createIntelligentPause = (duration: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// Stop all speech synthesis to prevent echo
export const stopAllSpeech = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
