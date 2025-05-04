
// Voice utility functions
import { VoiceSettings } from '@/types/voice';

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'es-ES', label: 'Spanish' },
  { value: 'fr-FR', label: 'French' },
  { value: 'de-DE', label: 'German' },
  { value: 'it-IT', label: 'Italian' },
  { value: 'ja-JP', label: 'Japanese' },
  { value: 'ko-KR', label: 'Korean' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'ru-RU', label: 'Russian' }
];

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 1,
  rate: 1,
  pitch: 1,
  language: 'en-US',
  voiceURI: '',
  preferredVoice: null,
};

// Find the best voice for a given language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    return null;
  }

  // First try to find an exact match
  let exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;

  // Try to find a voice that starts with the language code
  const langCode = language.split('-')[0];
  const partialMatch = voices.find(voice => voice.lang.startsWith(langCode));
  if (partialMatch) return partialMatch;

  // Fallback to English
  const englishVoice = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB');
  return englishVoice || voices[0]; // Last resort: return the first available voice
};

// List of known Hindi words and their correct pronunciations (for better Hindi speech)
const hindiPronunciationMap: Record<string, string> = {
  // Common Hindi greetings and phrases
  'नमस्ते': 'namaste',
  'आप कैसे हैं': 'aap kaise hain',
  'धन्यवाद': 'dhanyavaad',
  'स्वागत है': 'svaagat hai',
  'शुभकामनाएं': 'shubhkaamnaayein',
  // NEET/JEE related Hindi terms
  'भौतिकी': 'bhautiki',
  'रसायन विज्ञान': 'rasaayan vigyaan',
  'जीव विज्ञान': 'jeev vigyaan',
  'गणित': 'ganit',
  'परीक्षा': 'pareeksha',
  'अध्ययन': 'adhyayan',
  'सफलता': 'safalta',
  'तैयारी': 'taiyari',
  'अभ्यास': 'abhyaas',
  'प्रगति': 'pragati',
  // Common study phrases
  'आपकी प्रगति अच्छी है': 'aapki pragati acchi hai',
  'आज का लक्ष्य': 'aaj ka lakshya',
  'आपका टाइम टेबल': 'aapka time table',
  'अगला चैप्टर': 'agla chapter',
  'महत्वपूर्ण सवाल': 'mahatvapurn savaal',
  // Academic Advisor related
  'आपका अध्ययन योजना': 'aapka adhyayan yojana',
  'नई योजना बनाएं': 'nayi yojana banayen',
  'सप्ताह का लक्ष्य': 'saptaah ka lakshya',
  'दैनिक प्रगति': 'dainik pragati',
  // Additional phrases
  'प्रेप्ज़र': 'prepzr',
  'आपका सहायक': 'aapka sahaayak',
  'आवाज सहायक': 'aawaaz sahaayak',
  'स्वागत है': 'swaagat hai',
  'शुभकामनाएँ': 'shubhkaamnaayein',
  'मैं आपकी कैसे मदद कर सकता हूँ': 'main aapki kaise madad kar sakta hoon',
  'क्या आप कुछ पूछना चाहते हैं': 'kya aap kuchh poochhna chaahte hain',
  'अपना अध्ययन जारी रखें': 'apna adhyayan jaari rakhen',
  'अपनी प्रगति देखें': 'apni pragati dekhen',
  'दैनिक चुनौतियाँ': 'dainik chunautiyaan',
  'अभ्यास परीक्षा': 'abhyaas pareeksha'
};

// Enhanced Hindi text preprocessing
export const preprocessHindiText = (text: string): string => {
  let processedText = text;
  
  // Replace Hindi terms with their phonetic pronunciations
  Object.keys(hindiPronunciationMap).forEach(hindiWord => {
    const regex = new RegExp(hindiWord, 'g');
    processedText = processedText.replace(regex, hindiPronunciationMap[hindiWord]);
  });
  
  // Add pauses after sentences for better speech rhythm
  processedText = processedText.replace(/।/g, '. ');
  processedText = processedText.replace(/\?/g, '? <break time="0.5s"/>');
  processedText = processedText.replace(/!/g, '! <break time="0.5s"/>');
  
  return processedText;
};

// Fix pronunciation for better speech
export const fixPronunciation = (text: string, language: string): string => {
  let processedText = text;
  
  if (language === 'hi-IN') {
    processedText = preprocessHindiText(text);
  } else if (language === 'en-IN') {
    // Specific Indian English pronunciation adjustments if needed
    processedText = text;
  }
  
  return processedText;
};

// Main function to speak a message
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }
  
  // Don't speak if muted
  if (settings.muted) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance();
  
  // Preprocess the text based on language
  const processedMessage = fixPronunciation(message, settings.language);
  utterance.text = processedMessage;
  
  // Set voice parameters
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Try to set the preferred voice
  const voices = window.speechSynthesis.getVoices();
  
  if (settings.preferredVoice && voices.length > 0) {
    const voice = voices.find(v => v.voiceURI === settings.preferredVoice);
    if (voice) {
      utterance.voice = voice;
    }
  }
  
  // If no preferred voice is set or found, find the best matching voice
  if (!utterance.voice) {
    const bestVoice = findBestVoice(settings.language);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
  }
  
  // Event handlers
  utterance.onstart = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { 
      detail: { message: processedMessage } 
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
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
};

// Hindi welcome messages for dashboard
export const getHindiWelcomeMessage = (userName: string): string => {
  return `नमस्ते ${userName}! प्रेप्ज़र में आपका स्वागत है। मैं आपका आवाज सहायक हूँ। आज की तैयारी के लिए आपके पास एक अध्ययन योजना तैयार है। आप अपनी दैनिक चुनौतियां और प्रगति देख सकते हैं। किसी भी सहायता के लिए, बस मुझसे पूछें। आपकी परीक्षा की तैयारी के लिए शुभकामनाएँ!`;
};

// English welcome message for dashboard
export const getEnglishWelcomeMessage = (userName: string): string => {
  return `Hello ${userName}! Welcome to PREPZR. I'm your voice assistant. You have a study plan ready for today's preparation. You can check your daily challenges and track your progress. For any help, just ask me. Best wishes for your exam preparation!`;
};

// Get welcome message based on language
export const getWelcomeMessage = (userName: string, language: string): string => {
  switch (language) {
    case 'hi-IN':
      return getHindiWelcomeMessage(userName);
    case 'en-IN':
      return `Hello ${userName}! Welcome to PREPZR. I'm your voice assistant with an Indian accent. You have a study plan ready for today's preparation. You can check your daily challenges and track your progress. For any help, just ask me. Best wishes for your exam preparation!`;
    default:
      return getEnglishWelcomeMessage(userName);
  }
};
