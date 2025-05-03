
import { toast } from "sonner";

// Voice settings type
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  speed: number;
  announceGreetings: boolean;
  announceReminders: boolean;
  announceTasks: boolean;
  voice?: SpeechSynthesisVoice | null;
}

// Default voice settings
export const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  volume: 1.0, // Maximum volume
  speed: 1.0,
  announceGreetings: true,
  announceReminders: true,
  announceTasks: true,
  voice: null
};

// Get voice settings from local storage
export const getVoiceSettings = (): VoiceSettings => {
  try {
    const savedSettings = localStorage.getItem('voiceSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      return {
        ...defaultVoiceSettings,
        ...parsedSettings
      };
    }
  } catch (err) {
    console.error("Error loading voice settings:", err);
  }
  
  return defaultVoiceSettings;
};

// Save voice settings to local storage
export const saveVoiceSettings = (settings: VoiceSettings): void => {
  try {
    const settingsToSave = { ...settings };
    delete settingsToSave.voice; // Can't serialize the voice object
    localStorage.setItem('voiceSettings', JSON.stringify(settingsToSave));
  } catch (err) {
    console.error("Error saving voice settings:", err);
  }
};

// Function to initialize voices
export const initializeVoices = async (): Promise<boolean> => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not available");
    return false;
  }
  
  try {
    // Force Chrome to load voices
    let voices = window.speechSynthesis.getVoices();
    
    // If no voices, try to wait a bit and check again
    if (voices.length === 0) {
      return new Promise((resolve) => {
        // Try up to 3 times
        let attempts = 0;
        
        const checkVoices = () => {
          voices = window.speechSynthesis.getVoices();
          console.log(`Voice initialization attempt ${attempts+1}: ${voices.length} voices`);
          
          if (voices.length > 0) {
            resolve(true);
          } else if (attempts < 2) {
            attempts++;
            setTimeout(checkVoices, 500);
          } else {
            resolve(false);
          }
        };
        
        window.speechSynthesis.onvoiceschanged = checkVoices;
        setTimeout(checkVoices, 100);
      });
    }
    
    return voices.length > 0;
  } catch (err) {
    console.error("Error initializing voices:", err);
    return false;
  }
};

// Function to fix voice system
export const fixVoiceSystem = async (): Promise<boolean> => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not available");
    return false;
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Force loading voices
    const voices = window.speechSynthesis.getVoices();
    
    // Test with a simple utterance
    const testUtterance = new SpeechSynthesisUtterance("Test");
    testUtterance.volume = 0; // Silent test
    
    return new Promise<boolean>((resolve) => {
      const timeout = setTimeout(() => {
        console.warn("Voice test timed out");
        resolve(false);
      }, 2000);
      
      testUtterance.onend = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      
      testUtterance.onerror = (err) => {
        clearTimeout(timeout);
        console.error("Voice test failed:", err);
        resolve(false);
      };
      
      window.speechSynthesis.speak(testUtterance);
    });
  } catch (err) {
    console.error("Error fixing voice system:", err);
    return false;
  }
};

// Find best Indian voice
export const findBestIndianVoice = (): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  try {
    const voices = window.speechSynthesis.getVoices();
    
    // First try: find Indian English voice
    const indianVoice = voices.find(voice => 
      voice.lang === "en-IN" || 
      voice.name.includes("Indian")
    );
    
    if (indianVoice) return indianVoice;
    
    // Second try: find any English voice with India in the name
    const indiaVoice = voices.find(voice => 
      voice.name.includes("India") && 
      voice.lang.startsWith("en")
    );
    
    if (indiaVoice) return indiaVoice;
    
    // Third try: any English voice
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith("en")
    );
    
    if (englishVoice) return englishVoice;
    
    // Last resort: use the first available voice
    return voices.length > 0 ? voices[0] : null;
  } catch (err) {
    console.error("Error finding Indian voice:", err);
    return null;
  }
};

// Test if voice system is working
export const testVoiceSystem = async (): Promise<boolean> => {
  if (!window.speechSynthesis) return false;
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Test with a simple utterance
    const testUtterance = new SpeechSynthesisUtterance("Test");
    testUtterance.volume = 0; // Silent test
    
    return new Promise<boolean>((resolve) => {
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1000);
      
      testUtterance.onend = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      
      testUtterance.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      
      window.speechSynthesis.speak(testUtterance);
    });
  } catch (err) {
    return false;
  }
};

// Get comprehensive voice system diagnostics
export const getVoiceDiagnostics = async (): Promise<any> => {
  const result = {
    available: false,
    supported: false,
    voiceCount: 0,
    hasIndianVoice: false,
    bestVoiceName: '',
    bestVoiceLang: '',
    speechSynthesisExists: false,
    browserName: getBrowserName(),
    isMobile: isMobileDevice(),
    muted: false
  };
  
  try {
    result.speechSynthesisExists = typeof window.speechSynthesis !== 'undefined';
    
    if (result.speechSynthesisExists) {
      result.available = true;
      
      const voices = window.speechSynthesis.getVoices();
      result.voiceCount = voices.length;
      
      const bestVoice = findBestIndianVoice();
      if (bestVoice) {
        result.bestVoiceName = bestVoice.name;
        result.bestVoiceLang = bestVoice.lang;
      }
      
      result.hasIndianVoice = !!voices.find(voice => 
        voice.lang === "en-IN" || 
        voice.name.includes("Indian") || 
        voice.name.includes("India")
      );
      
      // Test if voice synthesis actually works
      result.supported = await testVoiceSystem();
    }
  } catch (err) {
    console.error("Error getting voice diagnostics:", err);
  }
  
  return result;
};

// Helper function to get browser name
function getBrowserName(): string {
  const agent = window.navigator.userAgent.toLowerCase();
  
  if (agent.indexOf("edge") > -1) {
    return "Edge";
  } else if (agent.indexOf("edg") > -1) {
    return "Edge Chromium";
  } else if (agent.indexOf("opr") > -1) {
    return "Opera";
  } else if (agent.indexOf("chrome") > -1) {
    return "Chrome";
  } else if (agent.indexOf("firefox") > -1) {
    return "Firefox";
  } else if (agent.indexOf("safari") > -1) {
    return "Safari";
  } else {
    return "Unknown";
  }
}

// Helper function to detect mobile devices
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Speak a message with current settings
export const speakMessage = (
  message: string, 
  force: boolean = false,
  options: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  } = {}
): void => {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not available");
    if (options.onError) options.onError("Speech synthesis not available");
    return;
  }
  
  try {
    // Get current settings
    const settings = getVoiceSettings();
    
    // Don't speak if voice is disabled and not forced
    if (!settings.enabled && !force) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Find best voice
    const bestVoice = findBestIndianVoice();
    if (bestVoice) utterance.voice = bestVoice;
    
    // Set properties
    utterance.rate = settings.speed;
    utterance.pitch = 1.0;
    utterance.volume = settings.volume;
    
    // Special handling for Indian accent
    message = enhanceIndianAccent(message);
    
    // Set up callbacks
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    
    utterance.onerror = (err) => {
      console.error("Speech error:", err);
      if (options.onError) options.onError(err);
      
      // Try to fix and retry
      fixVoiceSystem().then(fixed => {
        if (fixed) {
          console.log("Voice system fixed after error, retrying speech");
          setTimeout(() => speakMessage(message, force, options), 500);
        } else {
          toast.error("Voice system error. Please try again.", {
            duration: 3000
          });
        }
      });
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
    
  } catch (err) {
    console.error("Error speaking message:", err);
    if (options.onError) options.onError(err);
  }
};

// Function to enhance Indian accent pronunciation
function enhanceIndianAccent(text: string): string {
  // Replace specific words with phonetic spellings for better Indian accent
  return text
    .replace(/JEE/g, "jay ee ee")
    .replace(/NEET/g, "neet")
    .replace(/UPSC/g, "you pee ess see")
    .replace(/IIT/g, "eye eye tee")
    .replace(/NIT/g, "en eye tee")
    .replace(/AIIMS/g, "aims");
}

// Get a greeting based on time of day
export const getGreeting = (name?: string): string => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" :
                  hour < 17 ? "Good afternoon" : 
                  "Good evening";
                  
  return `${greeting}${name ? `, ${name}` : ''}!`;
};
