
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

// Session-based message tracking to prevent repetition
const currentSessionId = Date.now().toString();
const messageHistory = new Map<string, { 
  timestamp: number; 
  sessionId: string; 
  pageContext: string;
}>();

const MESSAGE_COOLDOWN = 60000; // 60 seconds minimum between messages

export const createFemaleUtterance = (text: string, config?: Partial<VoiceConfig>): SpeechSynthesisUtterance => {
  const defaultConfig = getDefaultVoiceConfig();
  const finalConfig = { ...defaultConfig, ...config };
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Enhanced pronunciation fixes - FIXED PREPZR pronunciation
  const correctedText = text
    .replace(/PREPZR/gi, 'Prep-Zer')  // Main brand pronunciation
    .replace(/prepzr/gi, 'prep-zer')
    .replace(/Prepzr/g, 'Prep-Zer')
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
  pageContext?: string,
  onStart?: () => void,
  onEnd?: () => void
): boolean => {
  if (!('speechSynthesis' in window)) return false;
  
  // Check if user is logged in for context-aware messaging
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentPath = window.location.pathname;
  
  // Enhanced context awareness - only speak on designated pages
  const allowedPages = ['/', '/dashboard/student', '/welcome'];
  const isAllowedPage = allowedPages.some(page => currentPath.includes(page));
  
  if (!isAllowedPage) {
    console.log('🔇 Voice: Not allowed on this page:', currentPath);
    return false;
  }
  
  // Message tracking to prevent repetition
  const messageKey = text.toLowerCase().trim().substring(0, 50);
  const now = Date.now();
  const messageInfo = messageHistory.get(messageKey);
  const context = pageContext || currentPath;
  
  // Check if message was recently spoken in same context
  if (messageInfo && 
      messageInfo.sessionId === currentSessionId && 
      messageInfo.pageContext === context &&
      (now - messageInfo.timestamp) < MESSAGE_COOLDOWN) {
    console.log('🔇 Voice: Preventing repetition of message within 60s cooldown');
    return false;
  }
  
  // Cancel any ongoing speech before starting new one
  window.speechSynthesis.cancel();
  
  const utterance = createFemaleUtterance(text, config);
  
  if (onStart) {
    utterance.onstart = onStart;
  }
  
  if (onEnd) {
    utterance.onend = onEnd;
  }
  
  // Store the message info when we start speaking
  messageHistory.set(messageKey, { 
    timestamp: now, 
    sessionId: currentSessionId,
    pageContext: context 
  });
  
  try {
    window.speechSynthesis.speak(utterance);
    console.log('🔊 Voice: Speaking message on', context);
    return true;
  } catch (error) {
    console.error('Speech synthesis error:', error);
    return false;
  }
};

// User activity detection
let isUserActive = false;
let activityTimeout: NodeJS.Timeout;

export const isUserCurrentlyActive = (): boolean => {
  return isUserActive;
};

export const markUserActivity = (): void => {
  isUserActive = true;
  
  // Cancel any ongoing speech immediately
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  // Clear existing timeout
  if (activityTimeout) {
    clearTimeout(activityTimeout);
  }
  
  // Reset activity status after 60 seconds
  activityTimeout = setTimeout(() => {
    isUserActive = false;
  }, 60000);
};

// Initialize activity detection
export const initializeActivityDetection = (): void => {
  const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];
  
  events.forEach(event => {
    document.addEventListener(event, markUserActivity, { passive: true });
  });
};

// Cleanup function
export const cleanupVoice = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  messageHistory.clear();
  isUserActive = false;
  if (activityTimeout) {
    clearTimeout(activityTimeout);
  }
};

// Navigation cleanup
export const cleanupOnNavigation = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  console.log('🔇 Voice: Cleaned up on navigation');
};
