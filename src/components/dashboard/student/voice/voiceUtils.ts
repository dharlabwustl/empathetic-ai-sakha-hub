
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
  volume: 1.0, // Maximum volume by default
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

// Set of voice names that are likely to be Indian female voices
const likelyIndianFemaleVoiceNames = new Set([
  'lekha', 'veena', 'kalpana', 'meena', 'priya', 'ananya', 'aditi', 'isha', 'deepa',
  'kavya', 'anjali', 'divya', 'sonia', 'indira', 'tara', 'nandini', 'lakshmi',
  'female indian', 'indian female', 'indian english female', 'hindi female'
]);

// Helper to get the best voice for Indian English - strictly prioritizing female Indian voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // HIGHEST priority: Find female Indian English voice with known Indian female names
  for (const voice of voices) {
    const nameLower = voice.name.toLowerCase();
    if ((voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
        (nameLower.includes('female') || Array.from(likelyIndianFemaleVoiceNames).some(name => nameLower.includes(name)))
       ) {
      console.log("Found ideal female Indian voice:", voice.name);
      return voice;
    }
  }
  
  // Second priority: Any female voice with Indian language code
  for (const voice of voices) {
    if ((voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
        !voice.name.toLowerCase().includes('male') &&
        !voice.name.toLowerCase().includes('man')) {
      console.log("Found likely female Indian voice:", voice.name);
      return voice;
    }
  }
  
  // Third priority: Any Indian language code
  for (const voice of voices) {
    if (voice.lang === 'en-IN' || voice.lang === 'hi-IN') {
      console.log("Found Indian voice:", voice.name);
      return voice;
    }
  }
  
  // Fourth priority: Voice with "Indian" in name
  for (const voice of voices) {
    if (voice.name.toLowerCase().includes('indian')) {
      console.log("Found voice with Indian in name:", voice.name);
      return voice;
    }
  }
  
  // Fifth priority: Female English voice
  for (const voice of voices) {
    if (voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('girl'))) {
      console.log("Falling back to female English voice:", voice.name);
      return voice;
    }
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
  // Replace common exam names with better pronunciation
  return text
    .replace(/PREPZR|Prepzr|prepzr/g, 'prep-eez-er')
    .replace(/NEET/g, 'neet')
    .replace(/JEE/g, 'J E E')
    .replace(/AIIMS/g, 'aims')
    .replace(/UPSC/g, 'U P S C')
    .replace(/CAT exam/g, 'C A T exam')
    .replace(/GATE/g, 'gate')
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
  
  // Error handling
  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event);
  };

  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Helper function to get greeting based on time of day and user's mood
export const getGreeting = (mood?: MoodType, examGoal?: string): string => {
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
  
  const examContext = examGoal ? ` for your ${examGoal} preparation` : '';
  
  // Add mood-specific additions with more energetic and exam-focused tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting} Great energy${examContext}! Focus on hard topics today.`;
      case 'tired':
        return `${timeGreeting} When tired${examContext}, revision is better than new concepts.`;
      case 'focused':
        return `${timeGreeting} Your focus is perfect${examContext}. Try advanced problems.`;
      case 'anxious':
        return `${timeGreeting} For exam anxiety, break${examContext} into small goals.`;
      case 'stressed':
        return `${timeGreeting} To manage stress${examContext}, prioritize topics systematically.`;
      default:
        return `${timeGreeting} Ready for today's${examContext} study session?`;
    }
  }
  
  return `${timeGreeting} Ready for today's${examContext} study session?`;
};

// Helper function for task count announcements
export const getTaskCountAnnouncement = (count: number, examGoal?: string) => {
  const examContext = examGoal ? ` for ${examGoal}` : '';
  
  if (count === 0) return `You have no tasks${examContext} today. Good time for revision!`;
  return `You have ${count} task${count === 1 ? '' : 's'}${examContext} scheduled today.`;
};

// Helper function for specific task announcements
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `Priority task: ${task.title}. ${timeStr} This topic frequently appears in exams.`;
  }
  
  return `Next task: ${task.title}. ${timeStr}`;
};

export const getReminderAnnouncement = (subject: string, time: string) => {
  return `Reminder: ${subject} session at ${time}.`;
};
