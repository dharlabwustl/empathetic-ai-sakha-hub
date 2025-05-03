
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

// Helper to get the best voice for Indian English - prioritizing female voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  
  // First priority: Find female Indian English voice
  const femaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang.startsWith('hi-')) && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleIndianVoice) {
    return femaleIndianVoice;
  }
  
  // Second priority: Find any voice with "Indian" in name and "female"
  const femaleWithIndianName = voices.find(voice => 
    voice.name.toLowerCase().includes('indian') && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleWithIndianName) {
    return femaleWithIndianName;
  }
  
  // Third priority: Find any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleEnglishVoice) {
    return femaleEnglishVoice;
  }
  
  // Fourth priority: Any Indian English voice
  const indianVoice = voices.find(voice => 
    voice.lang === 'en-IN' || 
    voice.name.toLowerCase().includes('indian')
  );
  
  if (indianVoice) {
    return indianVoice;
  }
  
  // Last resort: Any English voice
  return voices.find(voice => voice.lang.startsWith('en'));
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
  
  // Find the best Indian female voice
  const bestVoice = findBestIndianVoice();
  
  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log("Using voice:", bestVoice.name, bestVoice.lang);
  } else {
    utterance.lang = settings.voice;
    console.log("No best voice found, using language:", settings.voice);
  }
  
  utterance.volume = settings.volume;
  utterance.rate = settings.speed;
  
  // Add a slight pitch increase for more pleasant, energetic sound
  utterance.pitch = 1.1;
  
  // Speak the message
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};
