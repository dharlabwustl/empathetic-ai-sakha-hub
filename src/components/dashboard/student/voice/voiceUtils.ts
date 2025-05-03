
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

// Helper to get the best voice for Indian English - strictly prioritizing female Indian voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  
  // First priority: Find female Indian English voice
  const femaleIndianVoice = voices.find(voice => 
    voice.lang === 'en-IN' && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleIndianVoice) {
    console.log("Found ideal female Indian voice:", femaleIndianVoice.name);
    return femaleIndianVoice;
  }
  
  // Second priority: Find any Indian English voice
  const indianVoice = voices.find(voice => voice.lang === 'en-IN');
  
  if (indianVoice) {
    console.log("Found Indian voice:", indianVoice.name);
    return indianVoice;
  }
  
  // Third priority: Find any voice with "Indian" in name
  const voiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian')
  );
  
  if (voiceWithIndian) {
    console.log("Found voice with Indian in name:", voiceWithIndian.name);
    return voiceWithIndian;
  }
  
  // Fourth priority: Find any Hindi voice
  const hindiVoice = voices.find(voice => 
    voice.lang.startsWith('hi-')
  );
  
  if (hindiVoice) {
    console.log("Found Hindi voice as fallback:", hindiVoice.name);
    return hindiVoice;
  }
  
  // Last resort: Any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    voice.name.toLowerCase().includes('female')
  );
  
  if (femaleEnglishVoice) {
    console.log("Falling back to female English voice:", femaleEnglishVoice.name);
    return femaleEnglishVoice;
  }
  
  // Very last resort: Any English voice
  const anyEnglishVoice = voices.find(voice => voice.lang.startsWith('en'));
  if (anyEnglishVoice) {
    console.log("Last resort: using any English voice:", anyEnglishVoice.name);
    return anyEnglishVoice;
  }
  
  return undefined;
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
  
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
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
  
  // Add a pitch increase for more pleasant, energetic Indian female voice sound
  utterance.pitch = 1.2;
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};
