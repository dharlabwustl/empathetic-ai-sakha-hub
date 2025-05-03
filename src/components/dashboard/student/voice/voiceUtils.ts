
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

// Indian voice name patterns to prioritize (expanded list)
const indianVoicePatterns = [
  'kalpana', 'veena', 'meena', 'tara', 'raveena', 'aditi',
  'priya', 'neha', 'sundar', 'arun', 'anjali', 'deepa',
  'divya', 'isha', 'kavita', 'lakshmi', 'madhur', 'nandini',
  'pooja', 'rashmi', 'sangeeta', 'shreya', 'tanvi'
];

// Helper to get the best voice for Indian English - strictly prioritizing Indian voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // First priority: Look for voices specifically labeled as Indian English (en-IN)
  const indianEnglishVoice = voices.find(voice => voice.lang === 'en-IN');
  if (indianEnglishVoice) {
    console.log("Found dedicated Indian English (en-IN) voice:", indianEnglishVoice.name);
    return indianEnglishVoice;
  }
  
  // Second priority: Look for Hindi voices (can often speak English with Indian accent)
  const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
  if (hindiVoice) {
    console.log("Found Hindi (hi-IN) voice:", hindiVoice.name);
    return hindiVoice;
  }
  
  // Third priority: Search for voices with Indian names
  for (const pattern of indianVoicePatterns) {
    const namedIndianVoice = voices.find(voice => 
      voice.name.toLowerCase().includes(pattern)
    );
    
    if (namedIndianVoice) {
      console.log(`Found voice with Indian name pattern "${pattern}":`, namedIndianVoice.name);
      return namedIndianVoice;
    }
  }
  
  // Fourth priority: Any voice with "India" or "Indian" in its name
  const indianDescriptorVoice = voices.find(voice => 
    voice.name.toLowerCase().includes('india') || 
    voice.name.toLowerCase().includes('indian')
  );
  
  if (indianDescriptorVoice) {
    console.log("Found voice with India/Indian in name:", indianDescriptorVoice.name);
    return indianDescriptorVoice;
  }
  
  // Fifth priority: Look for any South Asian or Asian labeled voices
  const asianVoice = voices.find(voice => 
    voice.name.toLowerCase().includes('asian') || 
    voice.name.toLowerCase().includes('south asian')
  );
  
  if (asianVoice) {
    console.log("Found Asian/South Asian voice:", asianVoice.name);
    return asianVoice;
  }
  
  // Last resort: Any female English voice (preferably not U.S. accent)
  const nonUSFemaleVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    voice.lang !== 'en-US' &&
    (voice.name.toLowerCase().includes('female') || 
     !voice.name.toLowerCase().includes('male'))
  );
  
  if (nonUSFemaleVoice) {
    console.log("Using non-US female English voice:", nonUSFemaleVoice.name);
    return nonUSFemaleVoice;
  }
  
  // Absolute fallback: Any English voice
  const anyEnglishVoice = voices.find(voice => voice.lang.startsWith('en'));
  if (anyEnglishVoice) {
    console.log("Using fallback English voice:", anyEnglishVoice.name);
    return anyEnglishVoice;
  }
  
  console.warn("No suitable voice found, using system default");
  return voices[0]; // Return first available voice as last resort
};

// Improve pronunciation for Indian accent
const improvePronunciation = (text: string): string => {
  return text
    // Improve pronunciation of the app name
    .replace(/PREPZR|Prepzr|prepzr/g, 'prep-z-r')
    
    // Improve pronunciation of common exam names
    .replace(/\bNEET\b/gi, 'N E E T')
    .replace(/\bJEE\b/gi, 'J E E')
    .replace(/\bUPSC\b/gi, 'U P S C')
    .replace(/\bIAS\b/gi, 'I A S')
    .replace(/\bCAT\b/gi, 'C A T')
    
    // Better pronunciation of common English word endings
    .replace(/(\w+)ing\b/g, '$1 ing') 
    .replace(/\b(\w+)tion\b/g, '$1 shun')
    
    // Common Indian English pronunciations
    .replace(/\bstudy\b/gi, 'stuh-dee')
    .replace(/\bexam\b/gi, 'egg-zam')
    .replace(/\b(im)portant\b/gi, '$1-por-tent')
    .replace(/\bfocus\b/gi, 'fo-kus')
    .replace(/\bquestions\b/gi, 'kwe-schuns')
    .replace(/\bconcepts?\b/gi, 'kon-sept$1')
    
    // Improve numerals pronunciation
    .replace(/(\d)(\d{3})\b/g, '$1 thousand $2')
    .replace(/(\d)(\d{2})\b/g, '$1 hundred $2');
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

// Function to test if voice system is working
export const testVoiceSystem = (): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const testUtterance = new SpeechSynthesisUtterance("Test");
      testUtterance.volume = 0; // Silent test
      testUtterance.onend = () => resolve(true);
      testUtterance.onerror = () => resolve(false);
      
      const timeout = setTimeout(() => resolve(false), 3000);
      testUtterance.onend = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      
      window.speechSynthesis.speak(testUtterance);
    } catch (e) {
      console.error("Error testing voice system:", e);
      resolve(false);
    }
  });
};
