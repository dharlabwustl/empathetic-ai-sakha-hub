
import { SpeechSynthesisVoice } from '@/types/voice/types';

export type SupportedLanguage = 'en-GB' | 'en-US' | 'en-IN' | 'hi-IN' | 'fr-FR' | 'es-ES' | 'de-DE';

export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: SupportedLanguage;
  voice: SpeechSynthesisVoice | null;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-GB', // Default to UK English
  voice: null
};

export const LANGUAGE_OPTIONS = [
  { value: 'en-GB', label: 'UK English' },
  { value: 'en-US', label: 'US English' },
  { value: 'en-IN', label: 'Indian English' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'fr-FR', label: 'French' },
  { value: 'es-ES', label: 'Spanish' },
  { value: 'de-DE', label: 'German' }
];

export const getPreferredAccent = (): SupportedLanguage => {
  const savedAccent = localStorage.getItem('preferred_voice_accent');
  if (savedAccent && ['en-GB', 'en-US', 'en-IN', 'hi-IN', 'fr-FR', 'es-ES', 'de-DE'].includes(savedAccent)) {
    return savedAccent as SupportedLanguage;
  }
  return 'en-GB'; // Default to UK English
};

export const savePreferredAccent = (accent: SupportedLanguage): void => {
  localStorage.setItem('preferred_voice_accent', accent);
};

// Helper to get the best voice for a particular language
export const getBestVoiceForLanguage = (
  voices: SpeechSynthesisVoice[], 
  language: SupportedLanguage
): SpeechSynthesisVoice | null => {
  // Try to find a matching voice
  const languageVoices = voices.filter(voice => voice.lang?.startsWith(language));
  
  if (languageVoices.length === 0) {
    return null;
  }
  
  // Prefer higher quality voices if available
  const preferredVoiceTypes = [
    // UK English preferences
    ...(language === 'en-GB' ? [
      'Google UK English Female',
      'Microsoft Susan',
      'Daniel',
    ] : []),
    
    // US English preferences  
    ...(language === 'en-US' ? [
      'Google US English Female',
      'Microsoft Zira', 
      'Samantha'
    ] : []),
    
    // Indian English preferences
    ...(language === 'en-IN' ? [
      'Google हिन्दी',
      'Veena'
    ] : []),
    
    // Hindi preferences
    ...(language === 'hi-IN' ? [
      'Google हिन्दी',
      'Hindi India'
    ] : []),

    // French preferences
    ...(language === 'fr-FR' ? [
      'Google français',
      'Thomas',
      'Amelie'
    ] : []),

    // Spanish preferences
    ...(language === 'es-ES' ? [
      'Google español',
      'Monica',
      'Juan'
    ] : []),

    // German preferences
    ...(language === 'de-DE' ? [
      'Google Deutsch',
      'Anna',
      'Stefan'
    ] : [])
  ];
  
  // Try to find preferred voice by name
  for (const preferredType of preferredVoiceTypes) {
    const found = languageVoices.find(voice => 
      voice.name?.includes(preferredType)
    );
    if (found) return found;
  }
  
  // If no preferred voice found, return the first voice for the language
  return languageVoices[0];
};

// Get voice assistant messages for different screens
export const getVoiceAssistantMessages = (screen: string, language: SupportedLanguage = 'en-GB'): string => {
  // Default to English if language not supported for a particular message
  if (screen === 'dashboard') {
    if (language === 'hi-IN') {
      return "यह आपका डैशबोर्ड है जहां आप अपनी प्रगति देख सकते हैं और अपना अध्ययन योजना प्रबंधित कर सकते हैं।";
    } else if (language === 'en-IN') {
      return "This is your dashboard where you can view your progress and manage your study plan. Click on different sections to explore more.";
    } else {
      return "Welcome to your dashboard. Here you can monitor your progress, manage your study plan, and access all learning resources.";
    }
  }
  
  if (screen === 'concepts') {
    if (language === 'hi-IN') {
      return "यहां आप सभी विषयों के महत्वपूर्ण अवधारणाओं का अध्ययन कर सकते हैं। प्रत्येक अवधारणा में विस्तृत जानकारी, उदाहरण और अभ्यास प्रश्न शामिल हैं।";
    } else {
      return "Here you can study all the important concepts for your subjects. Each concept includes detailed explanations, examples, and practice questions.";
    }
  }
  
  if (screen === 'practice-exam') {
    if (language === 'hi-IN') {
      return "अभ्यास परीक्षाएँ आपको वास्तविक परीक्षा के लिए तैयार करेंगी। आप विषय-वार या पूर्ण परीक्षाएँ ले सकते हैं।";
    } else {
      return "Practice exams will prepare you for the real test. You can take subject-wise or full exams to assess your readiness.";
    }
  }
  
  if (screen === 'today-plan') {
    if (language === 'hi-IN') {
      return "यह आज का अध्ययन योजना है, जिसमें आपके लिए अनुकूलित अध्ययन कार्य हैं। इन्हें पूरा करने से आपकी परीक्षा की तैयारी बेहतर होगी।";
    } else {
      return "This is your today's study plan with tasks customized for you. Completing these will improve your exam preparation.";
    }
  }
  
  return "How can I help you today?";
};

