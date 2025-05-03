
import { MoodType } from '@/types/user/base';

// Voice settings type
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  speed: number;
  voice: string;
  announceGreetings: boolean;
  announceReminders: boolean;
  announceTasks: boolean;
}

// Default voice settings
export const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  volume: 1.0, // Loud voice by default
  speed: 1.0,
  voice: 'en-IN',
  announceGreetings: true,
  announceReminders: true,
  announceTasks: true,
};

// Cache for already spoken messages to avoid repetition
const spokenMessages: Set<string> = new Set();

// Get voice settings from local storage or use defaults
export const getVoiceSettings = (): VoiceSettings => {
  const savedSettings = localStorage.getItem('voiceSettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error('Error parsing voice settings:', e);
      return defaultVoiceSettings;
    }
  }
  return defaultVoiceSettings;
};

// Save voice settings to local storage
export const saveVoiceSettings = (settings: VoiceSettings): void => {
  localStorage.setItem('voiceSettings', JSON.stringify(settings));
};

// Helper to get the best voice for Indian English
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  
  // Priority for voice selection:
  // 1. Female Indian English voice
  // 2. Any voice with "Indian" in the name (preferring female)
  // 3. Any voice with "Hindi" in the name (preferring female)
  // 4. Any English voice (preferring female)
  
  // First try: Find female Indian English voice
  const femaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang.startsWith('hi-')) && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Second try: Find female voice with "Indian" in name
  const femaleVoiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Third try: Find female voice with "Hindi" in name
  const femaleVoiceWithHindi = voices.find(voice => 
    voice.name.toLowerCase().includes('hindi') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Fourth try: Find any Indian English voice
  const indianVoice = voices.find(voice => 
    voice.lang === 'en-IN' ||
    voice.lang.startsWith('hi-')
  );
  
  // Fifth try: Find any voice with "Indian" in name
  const voiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian')
  );
  
  // Sixth try: Find any voice with "Hindi" in name
  const voiceWithHindi = voices.find(voice => 
    voice.name.toLowerCase().includes('hindi')
  );
  
  // Seventh try: Find any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Return the first available voice in priority order
  return femaleIndianVoice || femaleVoiceWithIndian || femaleVoiceWithHindi || 
         indianVoice || voiceWithIndian || voiceWithHindi || femaleEnglishVoice;
};

// Function to speak a message with current settings
export const speakMessage = (message: string, forceSpeak: boolean = false): void => {
  const settings = getVoiceSettings();
  
  // Return early if voice is disabled or we've already spoken this message
  if (!settings.enabled || (!forceSpeak && spokenMessages.has(message))) {
    return;
  }
  
  // Only store non-forced messages in cache
  if (!forceSpeak) {
    spokenMessages.add(message);
  }
  
  // Clear cache if it gets too big
  if (spokenMessages.size > 50) {
    spokenMessages.clear();
  }
  
  // Create and configure speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Try to find the best voice
  const bestVoice = findBestIndianVoice();
  
  if (bestVoice) {
    utterance.voice = bestVoice;
  } else {
    utterance.lang = settings.voice;
  }
  
  utterance.volume = settings.volume;
  utterance.rate = settings.speed;
  
  // Speak the message
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};
