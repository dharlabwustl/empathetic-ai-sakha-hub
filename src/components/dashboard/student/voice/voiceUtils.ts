
import { VoiceSettings } from '@/types/voice';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1,
  rate: 1,
  pitch: 1,
  language: 'en-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Find the best voice match for the selected language
export const findBestVoice = (language: string, availableVoices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // First try to find a perfect match
  const exactMatch = availableVoices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;

  // Try to find a voice with the same language code (first 2 chars)
  const langCode = language.split('-')[0];
  const partialMatch = availableVoices.find(voice => voice.lang.startsWith(langCode));
  if (partialMatch) return partialMatch;

  // Default to first available voice or null
  return availableVoices[0] || null;
};

// Fix pronunciation for better speech
export const fixPronunciation = (text: string, language: string): string => {
  if (!text) return '';
  
  // Language-specific pronunciation fixes
  if (language === 'hi-IN') {
    // No need to convert Hindi text - it should be provided directly in Hindi
    return text;
  }
  
  return text;
};

// Speak a message with the given settings
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (!message || !window.speechSynthesis) return;
  
  // Create custom event for tracking speech
  const speakingStartedEvent = new CustomEvent('voice-speaking-started', {
    detail: { message }
  });
  
  // Clear any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Set voice if available
  if (settings.voice) {
    utterance.voice = settings.voice;
  } else {
    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = findBestVoice(settings.language, voices);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  }
  
  // Fix pronunciation based on language
  utterance.text = fixPronunciation(message, settings.language);
  
  // Use Hindi text for Hindi language
  if (settings.language === 'hi-IN') {
    // Convert the message to a Hindi equivalent if possible
    const hindiText = getHindiTranslation(message);
    utterance.text = hindiText;
  }
  
  // Event handlers
  utterance.onstart = () => {
    document.documentElement.classList.add('voice-speaking');
    document.dispatchEvent(speakingStartedEvent);
  };
  
  utterance.onend = () => {
    document.documentElement.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    document.documentElement.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Get Hindi translation of common messages
export const getHindiTranslation = (englishText: string): string => {
  // Common translations for welcome messages
  const translations: Record<string, string> = {
    // Greetings
    "Welcome to PREPZR": "प्रेपज़र में आपका स्वागत है",
    "Good morning": "सुप्रभात",
    "Good afternoon": "नमस्कार",
    "Good evening": "शुभ संध्या",
    
    // Dashboard related
    "dashboard": "डैशबोर्ड",
    "study plan": "अध्ययन योजना",
    "daily tasks": "दैनिक कार्य",
    "concept cards": "कॉन्सेप्ट कार्ड्स",
    "practice exams": "अभ्यास परीक्षा",
    "flashcards": "फ्लैशकार्ड",
    
    // Common phrases
    "How can I help you today": "आज मैं आपकी कैसे सहायता कर सकता हूँ",
    "Is there anything specific you'd like to learn": "क्या कोई विशेष विषय है जिसके बारे में आप जानना चाहते हैं",
    "I'm here to help with your studies": "मैं आपके अध्ययन में सहायता के लिए यहां हूँ",
    
    // Encouragement
    "Good luck with your exam preparation": "आपकी परीक्षा की तैयारी के लिए शुभकामनाएं",
    "You're making good progress": "आप अच्छी प्रगति कर रहे हैं",
    "Keep up the great work": "अच्छा काम जारी रखें"
  };
  
  // Check for direct translations
  if (translations[englishText]) {
    return translations[englishText];
  }
  
  // Check for partial matches and replace them
  let hindiText = englishText;
  Object.keys(translations).forEach(key => {
    if (englishText.includes(key)) {
      hindiText = hindiText.replace(new RegExp(key, 'gi'), translations[key]);
    }
  });
  
  // If no matches found, return the original text
  // In a real implementation, you would use a proper translation API
  return hindiText;
};

// Generate a greeting based on time of day
export const getGreeting = (
  name: string, 
  mood?: string, 
  isFirstTimeUser = false,
  language = 'en-IN'
): string => {
  const hour = new Date().getHours();
  let timeGreeting = "";
  
  if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 18) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }
  
  // Basic greeting
  let greeting = `${timeGreeting}, ${name}!`;
  
  // Add mood-specific greeting if available
  if (mood) {
    switch (mood.toLowerCase()) {
      case 'motivated':
        greeting += " I'm glad to see you're feeling motivated today!";
        break;
      case 'happy':
        greeting += " Your positive energy will make today's study session great!";
        break;
      case 'focused':
        greeting += " I see you're focused and ready to learn today.";
        break;
      case 'neutral':
        greeting += " Ready for another productive study session?";
        break;
      case 'stressed':
        greeting += " I notice you're feeling stressed. Let's break your tasks into manageable steps.";
        break;
      case 'tired':
        greeting += " I understand you're feeling tired. Let's focus on review sessions today.";
        break;
    }
  }
  
  // Add first-time user welcome
  if (isFirstTimeUser) {
    greeting = `Welcome to PREPZR, ${name}! I'm your voice assistant. Your dashboard shows your personalized study plan and daily tasks. You can ask me questions anytime by clicking the microphone icon. PREPZR is committed to supporting you at every step of your exam preparation journey. Good luck with your studies!`;
  }
  
  return greeting;
};
