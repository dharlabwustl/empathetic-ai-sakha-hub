
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

// Global reference to available voices
let cachedVoices: SpeechSynthesisVoice[] | null = null;

// Refresh cached voices
export const refreshVoices = (): SpeechSynthesisVoice[] => {
  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      cachedVoices = voices;
      console.log("Voice system refreshed - found", voices.length, "voices");
      return voices;
    }
    console.warn("Voice system returned empty voices array");
    return [];
  } catch (err) {
    console.error("Error refreshing voices:", err);
    return [];
  }
};

// Helper to get the best voice for Indian English - strictly prioritizing Indian voices
export const findBestIndianVoice = (): SpeechSynthesisVoice | undefined => {
  try {
    // Try to get fresh voices or use cached ones
    let voices = window.speechSynthesis.getVoices();
    
    if (!voices || voices.length === 0) {
      console.log("No voices available immediately, using cached voices or waiting...");
      
      if (cachedVoices && cachedVoices.length > 0) {
        voices = cachedVoices;
      } else {
        // Force a refresh and try again
        voices = refreshVoices();
      }
    }
    
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
    
    // Last desperate fallback: Any voice at all
    if (voices.length > 0) {
      console.warn("No suitable voice found, using first available voice:", voices[0].name);
      return voices[0];
    }
    
    console.warn("No voices available at all");
    return undefined;
    
  } catch (err) {
    console.error("Error finding best voice:", err);
    return undefined;
  }
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

// Check if speech synthesis is ready and available
export const isSpeechSynthesisAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.speechSynthesis !== undefined;
  } catch (err) {
    console.error("Error checking speech synthesis availability:", err);
    return false;
  }
};

// Speech synthesis with better error handling and diagnostics
export const speakMessage = (message: string, forceSpeak: boolean = false): boolean => {
  try {
    const settings = getVoiceSettings();
    
    if (!settings.enabled && !forceSpeak) {
      console.log("Voice disabled in settings, skipping speech");
      return false;
    }

    // Check if speech synthesis is available
    if (!isSpeechSynthesisAvailable()) {
      console.error("Speech synthesis is not available in this browser");
      return false;
    }
    
    // Skip duplicate non-forced messages
    if (!forceSpeak && spokenMessages.has(message)) {
      console.log("Skipping duplicate message:", message);
      return false;
    }
    
    // Add to spoken messages cache
    spokenMessages.add(message);
    
    // Clear cache if too large
    if (spokenMessages.size > 20) {
      spokenMessages.clear();
    }
    
    // Try to cancel any ongoing speech
    try {
      window.speechSynthesis.cancel();
    } catch (err) {
      console.warn("Could not cancel ongoing speech:", err);
    }
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(improvePronunciation(message));
    
    // Find the best voice
    const bestVoice = findBestIndianVoice();
    
    if (bestVoice) {
      utterance.voice = bestVoice;
      console.log("Using voice:", bestVoice.name);
    } else {
      // If no voice is found, try setting the language at least
      utterance.lang = 'en-IN';
      console.log("No specific voice found, using default with en-IN language");
    }
    
    // Set very high volume for clarity - this is critical
    utterance.volume = settings.volume * 1.5 > 1.0 ? 1.0 : settings.volume * 1.5;
    
    // Set speech rate (speed)
    utterance.rate = settings.speed;
    
    // Higher pitch for female voice
    utterance.pitch = 1.2;
    
    // Debug voice settings
    console.log(`Speaking with: volume=${utterance.volume}, rate=${utterance.rate}, pitch=${utterance.pitch}`);
    console.log("Message to speak:", message);
    
    // Add detailed error handling for speech synthesis
    utterance.onstart = (event) => {
      console.log("Speech started successfully");
    };
    
    utterance.onend = (event) => {
      console.log("Speech completed successfully");
    };
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      console.error("Error details:", event);
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
    
    return true;
  } catch (error) {
    console.error("Critical error in speech synthesis:", error);
    return false;
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
      case MoodType.Motivated:
        return `${timeGreeting} Great to see you motivated! ${examFocus} Start with the hardest topics first.`;
      case MoodType.Tired:
        return `${timeGreeting} Feeling tired? ${examFocus} Try shorter, focused study sessions today.`;
      case MoodType.Focused:
        return `${timeGreeting} You're focused! ${examFocus} Perfect time for solving difficult problems.`;
      case MoodType.Anxious:
        return `${timeGreeting} I understand you're anxious. ${examFocus} Let's break topics into smaller parts.`;
      case MoodType.Stressed:
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
      if (!isSpeechSynthesisAvailable()) {
        console.error("Speech synthesis is not available");
        resolve(false);
        return;
      }
      
      // Initialize voices
      refreshVoices();
      
      const testUtterance = new SpeechSynthesisUtterance("Testing voice system");
      testUtterance.volume = 1.0; // Use full volume for testing
      
      const timeout = setTimeout(() => {
        console.warn("Voice test timed out");
        resolve(false);
      }, 3000);
      
      testUtterance.onend = () => {
        clearTimeout(timeout);
        console.log("Voice test succeeded");
        resolve(true);
      };
      
      testUtterance.onerror = (err) => {
        clearTimeout(timeout);
        console.error("Voice test failed with error:", err);
        resolve(false);
      };
      
      window.speechSynthesis.speak(testUtterance);
    } catch (e) {
      console.error("Error testing voice system:", e);
      resolve(false);
    }
  });
};

// Function to debug voice system and get diagnostics
export const getVoiceDiagnostics = async (): Promise<{
  available: boolean;
  voiceCount: number;
  hasIndianVoice: boolean;
  bestVoiceName: string | null;
  currentVolume: number;
  supported: boolean;
  errorMessage?: string;
}> => {
  try {
    // Check if speech synthesis is available
    const available = isSpeechSynthesisAvailable();
    if (!available) {
      return {
        available: false,
        voiceCount: 0,
        hasIndianVoice: false,
        bestVoiceName: null,
        currentVolume: 0,
        supported: false,
        errorMessage: "Speech synthesis not supported in this browser"
      };
    }
    
    // Get all voices
    const voices = window.speechSynthesis.getVoices() || [];
    
    // Find best Indian voice
    const bestVoice = findBestIndianVoice();
    
    // Check if we have an Indian voice
    const hasIndianVoice = !!voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN');
    
    // Get current settings
    const settings = getVoiceSettings();
    
    // Test if voice system works
    const supported = await testVoiceSystem();
    
    return {
      available: true,
      voiceCount: voices.length,
      hasIndianVoice,
      bestVoiceName: bestVoice?.name || null,
      currentVolume: settings.volume,
      supported
    };
    
  } catch (err) {
    console.error("Error getting voice diagnostics:", err);
    return {
      available: false,
      voiceCount: 0,
      hasIndianVoice: false,
      bestVoiceName: null,
      currentVolume: 0,
      supported: false,
      errorMessage: `Error: ${err instanceof Error ? err.message : String(err)}`
    };
  }
};

// Set up voices for better browser compatibility
export const initializeVoices = (): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      if (!isSpeechSynthesisAvailable()) {
        console.error("Speech synthesis not available");
        resolve(false);
        return;
      }
      
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          cachedVoices = voices;
          console.log("Voices loaded:", voices.length);
          
          // Remove event listener if we got voices
          window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
          resolve(true);
        }
      };
      
      // Try to get voices immediately
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
        console.log("Voices available immediately:", voices.length);
        resolve(true);
        return;
      }
      
      // If no voices yet, wait for voiceschanged event
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      // Set timeout to resolve anyway
      setTimeout(() => {
        // Try one more time
        const lastChanceVoices = window.speechSynthesis.getVoices();
        if (lastChanceVoices && lastChanceVoices.length > 0) {
          cachedVoices = lastChanceVoices;
          resolve(true);
        } else {
          console.warn("Voice initialization timed out");
          resolve(false);
        }
      }, 3000);
      
    } catch (err) {
      console.error("Error initializing voices:", err);
      resolve(false);
    }
  });
};

// Fix voice system issues in certain browsers
export const fixVoiceSystem = async (): Promise<boolean> => {
  try {
    if (!isSpeechSynthesisAvailable()) {
      return false;
    }
    
    // Cancel any pending speech
    window.speechSynthesis.cancel();
    
    // Some browsers need a reset
    const silentUtterance = new SpeechSynthesisUtterance("");
    silentUtterance.volume = 0;
    window.speechSynthesis.speak(silentUtterance);
    
    // Initialize voices
    const initialized = await initializeVoices();
    
    return initialized;
  } catch (err) {
    console.error("Error fixing voice system:", err);
    return false;
  }
};

