
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

// Default voice settings - louder by default
export const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  volume: 1.0, // Maximum volume for clarity
  speed: 1.0,
  voice: 'en-IN',
  announceGreetings: true,
  announceReminders: true,
  announceTasks: true,
};

// Cache for already spoken messages to avoid repetition
const spokenMessages: Set<string> = new Set();
// Track when user last heard a greeting
let lastGreetingTime: number = 0;

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

// Helper to get the best voice for Indian English - improved algorithm for finding Indian female voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // Specific Indian female voices to look for
  const preferredVoiceNames = [
    'Raveena', 'Aditi', 'Kajal', 'Aishwarya', 'Deepa', 'Indira', 'Leela',
    'Nandini', 'Dhvani', 'Ananya', 'Priya', 'Divya', 'Heera', 'Lekha'
  ];
  
  // Try to find specific Indian female voices by name
  for (const name of preferredVoiceNames) {
    const voice = voices.find(v => 
      v.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (voice) {
      console.log(`Found preferred Indian female voice: ${voice.name}`);
      return voice;
    }
  }
  
  // HIGHEST priority: Find female Indian English voice with certain keywords
  const idealFemaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('girl') ||
     voice.name.toLowerCase().includes('f')) && // Some voices are labeled with (F) for female
    !voice.name.toLowerCase().includes('male')
  );
  
  if (idealFemaleIndianVoice) {
    console.log("Found ideal female Indian voice:", idealFemaleIndianVoice.name);
    return idealFemaleIndianVoice;
  }
  
  // Second priority: Any voice that is likely Indian female
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
  
  // Fourth priority: Any English voice with a name that might be Indian
  const indianNameVoice = voices.find(voice => {
    const name = voice.name.toLowerCase();
    return voice.lang.startsWith('en') && 
      (name.includes('rav') || name.includes('priy') || 
       name.includes('indi') || name.includes('adi') ||
       name.includes('sun') || name.includes('div'));
  });
  
  if (indianNameVoice) {
    console.log("Found voice with possible Indian name:", indianNameVoice.name);
    return indianNameVoice;
  }
  
  // Fifth priority: Any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('girl') ||
     voice.name.toLowerCase().includes('f')) &&
    !voice.name.toLowerCase().includes('male')
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

// Improve pronunciation of specific words for Indian English accent
const improvePronunciation = (text: string): string => {
  // Replace "PREPZR" with a phonetic spelling that sounds better ("prep-EEZ-er")
  return text
    .replace(/PREPZR|Prepzr|prepzr/g, 'prep-eez-er')
    .replace(/studying/g, 'study ing') // Better pronunciation of "studying"
    .replace(/efficient/g, 'ef fish ent') // Clearer pronunciation
    .replace(/congratulations/g, 'con grat you lay shuns') // Clearer pronunciation
    .replace(/exam/g, 'egg zam') // Better pronunciation of "exam"
    .replace(/focus/g, 'foh kus') // Better pronunciation of "focus"
    .replace(/concept/g, 'kon sept') // Better pronunciation of "concept"
    .replace(/revision/g, 'ree viz shun'); // Better pronunciation of "revision"
};

// Enhanced function to check if we should speak a greeting based on context
export const shouldSpeakGreeting = (): boolean => {
  const now = Date.now();
  
  // Don't speak greetings too frequently (minimum 5 minutes between greetings)
  if (now - lastGreetingTime < 5 * 60 * 1000) {
    return false;
  }
  
  // Update last greeting time
  lastGreetingTime = now;
  return true;
};

// Function to speak a message with current settings - optimized for clear, loud Indian female voice
export const speakMessage = (message: string, forceSpeak: boolean = false): void => {
  const settings = getVoiceSettings();
  
  // Return early if voice is disabled or we've already spoken this message
  if (!settings.enabled && !forceSpeak) {
    return;
  }
  
  // Skip if message is empty
  if (!message || message.trim() === '') {
    return;
  }
  
  // Only store non-forced messages in cache
  if (!forceSpeak) {
    // Check if we've already said this exact message recently
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
  
  // Set rate slightly faster for more clarity - adjust based on user settings
  utterance.rate = settings.speed;
  
  // Add a pitch increase for more pleasant, clear Indian female voice sound
  utterance.pitch = 1.2; // Slightly higher pitch for more distinctly female voice
  
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
  
  // Add mood-specific additions with more direct, clear tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting} I see you're motivated. Let's maintain this energy for your studies.`;
      case 'tired':
        return `${timeGreeting} Since you're tired, I suggest shorter study sessions with more breaks.`;
      case 'focused':
        return `${timeGreeting} With your focus today, tackle the challenging topics first.`;
      case 'anxious':
        return `${timeGreeting} For your anxiety, let's break tasks into small steps.`;
      case 'stressed':
        return `${timeGreeting} To manage stress, prioritize one task at a time.`;
      default:
        return `${timeGreeting} Ready for your study session?`;
    }
  }
  
  return `${timeGreeting} Ready for your study session?`;
};
