
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
  volume: 1.0, // Maximum volume for clarity
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
  
  // Try to find a voice with "Kalpana" which is a common Indian female voice name in browsers
  const kalpanaVoice = voices.find(voice => 
    voice.name.toLowerCase().includes('kalpana')
  );
  
  if (kalpanaVoice) {
    console.log("Found Kalpana Indian female voice:", kalpanaVoice.name);
    return kalpanaVoice;
  }
  
  // Try to find another Indian female voice
  const indianFemaleVoiceNames = ['veena', 'meena', 'tara', 'raveena', 'aditi'];
  const namedIndianVoice = voices.find(voice => 
    indianFemaleVoiceNames.some(name => voice.name.toLowerCase().includes(name))
  );
  
  if (namedIndianVoice) {
    console.log("Found named Indian female voice:", namedIndianVoice.name);
    return namedIndianVoice;
  }
  
  // Try to find any female Indian voice
  const femaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
    (voice.name.toLowerCase().includes('female') || 
     !voice.name.toLowerCase().includes('male'))
  );
  
  if (femaleIndianVoice) {
    console.log("Found female Indian voice:", femaleIndianVoice.name);
    return femaleIndianVoice;
  }
  
  // Find any Indian English voice
  const indianVoice = voices.find(voice => 
    voice.lang === 'en-IN' || 
    voice.lang === 'hi-IN'
  );
  
  if (indianVoice) {
    console.log("Found Indian voice:", indianVoice.name);
    return indianVoice;
  }
  
  // Any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    (voice.name.toLowerCase().includes('female') || 
     voice.name.toLowerCase().includes('woman') ||
     voice.name.toLowerCase().includes('girl'))
  );
  
  if (femaleEnglishVoice) {
    console.log("Using female English voice:", femaleEnglishVoice.name);
    return femaleEnglishVoice;
  }
  
  // Last resort: Any English voice
  return voices.find(voice => voice.lang.startsWith('en'));
};

// Improve pronunciation for Indian accent
const improvePronunciation = (text: string): string => {
  return text
    .replace(/PREPZR|Prepzr|prepzr/g, 'prep-z-r')
    .replace(/(\w+)ing\b/g, '$1 ing') // Better pronunciation of words ending with "ing"
    .replace(/\b(\w+)tion\b/g, '$1 shun') // Better pronunciation of words ending with "tion"
    .replace(/\bNEET\b/gi, 'N E E T')
    .replace(/\bJEE\b/gi, 'J E E');
};

// Speech synthesis with better error handling
export const speakMessage = (message: string, forceSpeak: boolean = false): void => {
  const settings = getVoiceSettings();
  
  if (!settings.enabled && !forceSpeak) {
    return;
  }
  
  // Skip duplicate non-forced messages
  if (!forceSpeak && spokenMessages.has(message)) {
    console.log("Skipping duplicate message:", message);
    return;
  }
  
  // Add to spoken messages cache
  spokenMessages.add(message);
  
  // Clear cache if too large
  if (spokenMessages.size > 20) {
    spokenMessages.clear();
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(improvePronunciation(message));
    
    // Find the best voice
    const bestVoice = findBestIndianVoice();
    
    if (bestVoice) {
      utterance.voice = bestVoice;
      console.log("Using voice:", bestVoice.name);
    } else {
      utterance.lang = 'en-IN';
      console.log("No specific voice found, using default with en-IN language");
    }
    
    // Set maximum volume for clarity
    utterance.volume = settings.volume;
    
    // Set speech rate (speed)
    utterance.rate = settings.speed;
    
    // Higher pitch for female voice
    utterance.pitch = 1.2;
    
    // Debug voice settings
    console.log(`Speaking with: volume=${utterance.volume}, rate=${utterance.rate}, pitch=${utterance.pitch}`);
    
    // Add error handling for speech synthesis
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
    
  } catch (error) {
    console.error("Error in speech synthesis:", error);
  }
};

// Helper function to get greeting based on time of day and user's mood with exam focus
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
  
  // Add exclamation
  timeGreeting += '!';
  
  // Exam-focused greeting
  const examFocus = examGoal 
    ? ` Your ${examGoal} preparation needs daily practice. `
    : ' Focus on regular practice tests for better results. ';
  
  // Add mood-specific, brief, exam-focused additions
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting} Great to see you motivated! ${examFocus} Start with the hardest topics first.`;
      case 'tired':
        return `${timeGreeting} Feeling tired? ${examFocus} Try shorter, focused study sessions today.`;
      case 'focused':
        return `${timeGreeting} You're focused! ${examFocus} Perfect time for solving difficult problems.`;
      case 'anxious':
        return `${timeGreeting} I understand you're anxious. ${examFocus} Let's break topics into smaller parts.`;
      case 'stressed':
        return `${timeGreeting} When stressed, prioritize. ${examFocus} Focus on high-yield topics first.`;
      default:
        return `${timeGreeting} ${examFocus} Let's make progress today!`;
    }
  }
  
  return `${timeGreeting} ${examFocus} Let's achieve your goals today!`;
};
