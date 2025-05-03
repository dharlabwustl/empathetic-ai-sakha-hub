
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
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // HIGHEST priority: Find female Indian English voice with certain keywords
  const idealFemaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('girl') ||
     voice.name.toLowerCase().includes('lekha') ||  // Common Indian female voice name
     voice.name.toLowerCase().includes('kalpana') ||
     voice.name.toLowerCase().includes('veena') ||
     voice.name.toLowerCase().includes('meena'))
  );
  
  if (idealFemaleIndianVoice) {
    console.log("Found ideal female Indian voice:", idealFemaleIndianVoice.name);
    return idealFemaleIndianVoice;
  }
  
  // Second priority: Any female Indian English voice
  const femaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
    !voice.name.toLowerCase().includes('male') &&
    !voice.name.toLowerCase().includes('man')
  );
  
  if (femaleIndianVoice) {
    console.log("Found likely female Indian voice:", femaleIndianVoice.name);
    return femaleIndianVoice;
  }
  
  // Third priority: Find any Indian English voice
  const indianVoice = voices.find(voice => 
    voice.lang === 'en-IN' || 
    voice.lang === 'hi-IN' || 
    voice.name.toLowerCase().includes('indian')
  );
  
  if (indianVoice) {
    console.log("Found Indian voice:", indianVoice.name);
    return indianVoice;
  }
  
  // Fourth priority: Find any voice with "Indian" in name
  const voiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian')
  );
  
  if (voiceWithIndian) {
    console.log("Found voice with Indian in name:", voiceWithIndian.name);
    return voiceWithIndian;
  }
  
  // Fifth priority: Any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('girl'))
  );
  
  if (femaleEnglishVoice) {
    console.log("Falling back to female English voice:", femaleEnglishVoice.name);
    return femaleEnglishVoice;
  }
  
  // Last resort: Any English voice
  const anyEnglishVoice = voices.find(voice => voice.lang.startsWith('en'));
  if (anyEnglishVoice) {
    console.log("Last resort: using any English voice:", anyEnglishVoice.name);
    return anyEnglishVoice;
  }
  
  return undefined;
};

// Improve pronunciation of specific words
const improvePronunciation = (text: string): string => {
  // Replace "PREPZR" with a phonetic spelling that sounds better ("prep-EEZ-er")
  return text
    .replace(/PREPZR|Prepzr|prepzr/g, 'prep-eez-er')
    .replace(/studying/g, 'study ing') // Better pronunciation of "studying"
    .replace(/efficient/g, 'ef fish ent') // Clearer pronunciation
    .replace(/congratulations/g, 'con grat you lay shuns'); // Clearer pronunciation
};

// Function to speak a message with current settings - optimized for happy, energetic Indian female voice
export const speakMessage = (message: string, forceSpeak: boolean = false): void => {
  const settings = getVoiceSettings();
  
  // Return early if voice is disabled or we've already spoken this message
  if (!settings.enabled && !forceSpeak) {
    return;
  }
  
  // Only store non-forced messages in cache
  if (!forceSpeak) {
    // Check if we've already said this exact message
    if (spokenMessages.has(message)) {
      console.log("Skipping already spoken message:", message);
      return;
    }
    spokenMessages.add(message);
  }
  
  // Clear cache if it gets too big
  if (spokenMessages.size > 50) {
    spokenMessages.clear();
  }
  
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
  // Create and configure speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(improvePronunciation(message));
  
  // Find the best Indian female voice
  const bestVoice = findBestIndianVoice();
  
  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log("Using voice:", bestVoice.name, bestVoice.lang);
  } else {
    utterance.lang = 'en-IN'; // Fallback to Indian English locale
    console.log("No best voice found, using language: en-IN");
  }
  
  // Set volume to maximum for loudness and clarity
  utterance.volume = Math.min(settings.volume * 1.2, 1.0); // Boost volume but cap at 1.0
  
  // Set rate slightly faster for more energetic sound
  utterance.rate = settings.speed > 1.0 ? settings.speed : Math.max(settings.speed, 1.0);
  
  // Add a pitch increase for more pleasant, energetic Indian female voice sound
  utterance.pitch = 1.4; // Higher pitch for more distinctly female and energetic voice
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Helper function to get greeting based on time of day and user's mood
export const getGreeting = (mood?: MoodType): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  // Add enthusiastic exclamation for all greetings
  timeGreeting += '!';
  
  // Add mood-specific additions with more energetic and happier tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting} I'm absolutely thrilled to see your wonderful enthusiasm today! Let's make something amazing happen together!`;
      case 'tired':
        return `${timeGreeting} I understand you're feeling a bit tired. Let's take some gentle steps today with calming study sessions. You'll feel refreshed very soon!`;
      case 'focused':
        return `${timeGreeting} I'm so happy to see you so wonderfully focused today! Let's channel that fantastic concentration into brilliant learning experiences!`;
      case 'anxious':
        return `${timeGreeting} Let's take a nice, calming breath together. I'm right here to help you organize everything step by step. You're doing amazingly well!`;
      case 'stressed':
        return `${timeGreeting} I notice you're feeling stressed. Let's work together with positive energy and organize your priorities. Everything will feel much better soon!`;
      default:
        return `${timeGreeting} I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully today!`;
    }
  }
  
  return `${timeGreeting} I'm absolutely delighted you're here! Ready for an amazing study session? I know you'll do wonderfully today!`;
};

