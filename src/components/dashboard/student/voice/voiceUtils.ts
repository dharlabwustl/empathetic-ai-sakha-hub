export interface VoiceSettings {
  enabled: boolean;
  voiceName: string;
  rate: number;
  pitch: number;
  volume: number;
  announceGreetings: boolean;
  announceReminders: boolean;
  announceTasks: boolean;
  inactivityPrompts: boolean; // Added new setting for inactivity prompts
  proactiveSuggestions: boolean; // Added for proactive suggestions
  helpTips: boolean; // Added for helpful tips
}

// Get voice settings from local storage or default values
export const getVoiceSettings = (): VoiceSettings => {
  try {
    const savedSettings = localStorage.getItem("voiceSettings");
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (err) {
    console.error("Error parsing voice settings:", err);
  }
  
  // Default settings with higher pitch and moderate rate for happy, energetic Indian female voice
  return {
    enabled: true,
    voiceName: "", // Will use the best available Indian female voice
    rate: 1.05, // Slightly faster than normal for energetic feel
    pitch: 1.1, // Higher pitch for female voice
    volume: 0.9,
    announceGreetings: true,
    announceReminders: true,
    announceTasks: true,
    inactivityPrompts: true,
    proactiveSuggestions: true,
    helpTips: true
  };
};

// Save voice settings to local storage
export const saveVoiceSettings = (settings: VoiceSettings): void => {
  try {
    localStorage.setItem("voiceSettings", JSON.stringify(settings));
  } catch (err) {
    console.error("Error saving voice settings:", err);
  }
};

// Find the best Indian female voice available
// Prioritize Indian English female voices, then any Indian voices, then any English female voices
const findBestIndianFemaleVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  
  // Log available voices for debugging
  console.log("Finding best Indian female voice from:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // Try to find an Indian English female voice
  // Priority: Indian English female > Indian female > English female > Any English > Default
  
  // Look for Google's Indian English voices first (most common)
  let voice = voices.find(v => 
    v.name.toLowerCase().includes('google') && 
    v.name.toLowerCase().includes('female') && 
    (v.lang === 'en-IN' || v.name.toLowerCase().includes('indian'))
  );
  
  // Next, try any Indian English voice
  if (!voice) {
    voice = voices.find(v => v.lang === 'en-IN');
  }
  
  // Next, try any Hindi voice
  if (!voice) {
    voice = voices.find(v => v.lang === 'hi-IN');
  }
  
  // Next, try any English female voice
  if (!voice) {
    voice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('girl'))
    );
  }
  
  // Finally, fall back to any English voice
  if (!voice) {
    voice = voices.find(v => v.lang.startsWith('en'));
  }
  
  return voice || null;
};

// Speak a message with the current voice settings
export const speakMessage = (message: string, force: boolean = false): void => {
  // Don't speak if text is empty
  if (!message || message.trim() === '') return;
  
  const settings = getVoiceSettings();
  if (!settings.enabled && !force) return;
  
  // Get the SpeechSynthesis instance
  const synth = window.speechSynthesis;
  
  // Cancel any ongoing speech
  synth.cancel();
  
  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Set voice properties
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;
  
  // Fix common pronounciation errors
  message = fixPronunciation(message);
  utterance.text = message;
  
  // Find and set the best voice
  const voices = synth.getVoices();
  let selectedVoice: SpeechSynthesisVoice | null = null;
  
  // If a specific voice name is set and exists, use it
  if (settings.voiceName) {
    selectedVoice = voices.find(v => v.name === settings.voiceName) || null;
  }
  
  // If no specific voice or it wasn't found, find the best Indian female voice
  if (!selectedVoice) {
    selectedVoice = findBestIndianFemaleVoice();
  }
  
  // Set the selected voice if found
  if (selectedVoice) {
    utterance.voice = selectedVoice;
    console.log(`Using voice: ${selectedVoice.name} (${selectedVoice.lang})`);
  }
  
  // Speak the utterance
  synth.speak(utterance);
  
  // Log for debugging
  console.log(`Speaking: "${message}" with voice ${utterance.voice?.name || 'default'}`);
};

// Fix common pronunciation issues for Indian accent
const fixPronunciation = (text: string): string => {
  // Fix "PREPZR" to "prep-eez-er"
  text = text.replace(/\bPREPZR\b/g, "prep-eez-er");
  text = text.replace(/\bPrepzr\b/g, "prep-eez-er");
  text = text.replace(/\bprepzr\b/g, "prep-eez-er");
  
  // Other common words that might need pronunciation fixes
  text = text.replace(/\bJEE\b/g, "J E E");
  text = text.replace(/\bNEET\b/g, "NEET");
  text = text.replace(/\bIIT\b/g, "I I T");
  
  return text;
};

// Generate a list of available voices
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis.getVoices();
};
