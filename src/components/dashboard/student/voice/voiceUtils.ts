
// Voice utilities for the student dashboard
import { VoiceSettings } from '@/types/voice';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  language: 'en-US',
  pitch: 1.0,
  rate: 1.0,
  volume: 1.0
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Helper function to find the best matching voice for the selected language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // First try to find an exact match
  let match = voices.find(voice => voice.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!match) {
    const langCode = language.split('-')[0];
    match = voices.find(voice => voice.lang.startsWith(langCode));
  }
  
  // If still no match, use the first available voice
  if (!match && voices.length > 0) {
    console.warn(`No voice found for ${language}, using default`);
    match = voices[0];
  }
  
  return match;
};

// Function to improve pronunciation of certain words
export const fixPronunciation = (text: string, language: string): string => {
  if (language === 'hi-IN') {
    // No modifications needed for Hindi, return as is
    return text;
  }
  
  let fixed = text;
  
  // Improve pronunciation for English languages
  fixed = fixed.replace(/PREPZR/g, 'prep zee are');
  fixed = fixed.replace(/IIT-JEE/g, 'eye eye tee jee');
  fixed = fixed.replace(/NEET/g, 'neet');
  
  return fixed;
};

// Function to speak a message with the given settings
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Don't speak if muted or disabled
  if (settings.muted || !settings.enabled) return;
  
  // Fix any pronunciation issues
  const fixedMessage = fixPronunciation(message, settings.language);
  
  // Create a new speech utterance
  const utterance = new SpeechSynthesisUtterance(fixedMessage);
  
  // Find the best voice for the selected language
  const voice = findBestVoice(settings.language);
  if (voice) {
    utterance.voice = voice;
  }
  
  // Apply other speech settings
  utterance.lang = settings.language;
  utterance.pitch = settings.pitch || 1;
  utterance.rate = settings.rate || 1;
  utterance.volume = settings.volume || 1;
  
  // Add events to track speaking status
  utterance.onstart = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { 
      detail: { message: fixedMessage }
    }));
    document.body.classList.add('voice-speaking');
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    document.body.classList.remove('voice-speaking');
  };
  
  // Cancel any ongoing speech before starting new one
  window.speechSynthesis.cancel();
  
  // Start speaking
  window.speechSynthesis.speak(utterance);
};

// Get appropriate greeting based on time of day
export const getGreeting = (name: string = '', mood: string = '', isFirstLogin: boolean = false): string => {
  const hour = new Date().getHours();
  let greeting = '';
  
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  let message = '';
  
  // Add language-specific greetings
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-US';
  
  if (language === 'hi-IN') {
    if (isFirstLogin) {
      message = `नमस्ते ${name || 'विद्यार्थी'}, प्रेप-ज़ेड-आर में आपका स्वागत है। मैं आपका वॉइस असिस्टेंट हूँ और आपकी पढ़ाई में मदद करूंगा। आपको कोई भी सहायता चाहिए तो मुझसे पूछ सकते हैं। आपकी परीक्षा की तैयारी के लिए शुभकामनाएं!`;
    } else {
      // Regular greeting in Hindi
      message = `नमस्ते ${name || 'विद्यार्थी'}, आपका डैशबोर्ड तैयार है। आप अपना अध्ययन योजना देख सकते हैं और दैनिक कार्यों को पूरा कर सकते हैं। प्रेप-ज़ेड-आर आपकी परीक्षा की तैयारी में हर कदम पर आपका साथ देगा।`;
    }
  } else {
    // English greeting with slight personalization based on mood
    if (isFirstLogin) {
      message = `${greeting} ${name || 'student'}, and welcome to PREPZR! I'm your voice assistant and I'll help guide you through your study journey. You can ask me questions anytime. We're committed to supporting your exam preparation every step of the way. Good luck!`;
    } else {
      let moodText = '';
      
      if (mood === 'MOTIVATED') {
        moodText = "I'm glad to see you're feeling motivated today!";
      } else if (mood === 'TIRED') {
        moodText = "I see you're feeling a bit tired. Remember to take breaks!";
      } else if (mood === 'CONFUSED') {
        moodText = "Feeling confused? Don't worry, I'm here to help!";
      } else if (mood === 'STRESSED') {
        moodText = "Notice you're feeling stressed. Take a deep breath, you're doing great!";
      }
      
      message = `${greeting} ${name || 'there'}. ${moodText} Your dashboard is ready with your study plan and daily tasks. PREPZR is committed to supporting your exam preparation every step of the way.`;
    }
  }
  
  return message;
};

// Get motivational message based on student profile and performance
export const getMotivationalMessage = (name: string = '', performance: number = 0): string => {
  // Get language preference
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-US';
  
  if (language === 'hi-IN') {
    // Hindi motivational messages
    if (performance > 80) {
      return `शानदार प्रदर्शन ${name}! आप अपने लक्ष्य की ओर तेजी से बढ़ रहे हैं।`;
    } else if (performance > 50) {
      return `अच्छा काम ${name}! आप सही दिशा में बढ़ रहे हैं। प्रयास जारी रखें।`;
    } else {
      return `चिंता मत करो ${name}, हम साथ मिलकर आपके प्रदर्शन को बेहतर बनाएंगे।`;
    }
  } else {
    // English motivational messages
    if (performance > 80) {
      return `Excellent progress ${name}! You're advancing quickly toward your goals.`;
    } else if (performance > 50) {
      return `Good work ${name}! You're on the right track. Keep up the effort.`;
    } else {
      return `Don't worry ${name}, we'll work together to improve your performance.`;
    }
  }
};
