
import { VoiceSettings } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  muted: false,
  volume: 0.8,
  rate: 0.9,
  pitch: 1.0,
  voice: null,
  language: 'en-US'
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' },
];

/**
 * Find best matching voice for a given language
 */
export const findBestVoice = (language: string) => {
  if (!('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  
  // Try to find exact match
  let voice = voices.find(v => v.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!voice) {
    const langPrefix = language.split('-')[0];
    voice = voices.find(v => v.lang.startsWith(`${langPrefix}-`));
  }
  
  // Default to first voice if nothing found
  if (!voice && voices.length > 0) {
    voice = voices.find(v => v.lang.includes('en')) || voices[0];
  }
  
  return voice;
};

/**
 * Fix common pronunciation issues
 */
export const fixPronunciation = (text: string): string => {
  // Fix for PREPZR
  let fixedText = text.replace(/PREPZR/g, 'prep-zee-are');
  
  // Fix for UI terms
  fixedText = fixedText.replace(/UI/g, 'U I');
  fixedText = fixedText.replace(/KPI/g, 'K P I');
  
  // Fix for subject names
  fixedText = fixedText.replace(/PhysX/g, 'Physics');
  
  return fixedText;
};

/**
 * Speak a message using the browser's speech synthesis API
 */
export const speakMessage = (message: string, settings: VoiceSettings) => {
  if (!('speechSynthesis' in window) || settings.muted) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Prepare the utterance
  const utterance = new SpeechSynthesisUtterance(fixPronunciation(message));
  
  // Apply voice settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Find appropriate voice
  const voice = settings.voice || findBestVoice(settings.language);
  if (voice) utterance.voice = voice;
  
  // Track speaking state with custom events
  document.dispatchEvent(
    new CustomEvent('voice-speaking-started', { detail: { message } })
  );
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

/**
 * Process user voice query and return response
 */
export const processUserQuery = (query: string, userProfile: any) => {
  const queryLower = query.toLowerCase();
  
  // Dashboard navigation queries
  if (queryLower.includes('go to dashboard') || queryLower.includes('show dashboard')) {
    return {
      response: "Taking you to the dashboard overview.",
      action: 'navigate',
      destination: '/dashboard/student'
    };
  }
  
  // Academic advisor queries
  if (queryLower.includes('academic advisor') || queryLower.includes('study plan') || queryLower.includes('create plan')) {
    return {
      response: "Opening the academic advisor where you can manage your study plans.",
      action: 'navigate',
      destination: '/dashboard/student/academic-advisor'
    };
  }
  
  // Practice test queries
  if (queryLower.includes('practice test') || queryLower.includes('practice exam')) {
    return {
      response: "Taking you to the practice exam section.",
      action: 'navigate',
      destination: '/dashboard/student/practice-exams'
    };
  }
  
  // Concept cards queries
  if (queryLower.includes('concept') || queryLower.includes('cards') || queryLower.includes('flashcards')) {
    return {
      response: "Opening concept cards for your subjects.",
      action: 'navigate',
      destination: '/dashboard/student/concepts'
    };
  }
  
  // Progress and analytics queries
  if (queryLower.includes('progress') || queryLower.includes('analytics') || queryLower.includes('report')) {
    return {
      response: "Let me show you your academic progress and analytics.",
      action: 'navigate',
      destination: '/dashboard/student/analytics'
    };
  }
  
  // Exam goal related queries
  if (queryLower.includes('exam goal') || queryLower.includes('my goal')) {
    const examGoal = userProfile?.examPreparation || userProfile?.goals?.[0]?.title || 'NEET';
    return {
      response: `Your current exam goal is ${examGoal}. You can update this in your academic advisor.`,
      action: 'speak'
    };
  }
  
  // Study plan queries
  if (queryLower.includes('my plan') || queryLower.includes('show plan') || queryLower.includes('today\'s plan')) {
    return {
      response: "Here's your current study plan. You can view details or make changes as needed.",
      action: 'showStudyPlan'
    };
  }
  
  // Help queries
  if (queryLower.includes('help') || queryLower.includes('how to') || queryLower.includes('tutorial')) {
    return {
      response: "I'll show you a quick tour of PREPZR to help you get started.",
      action: 'showTour'
    };
  }
  
  // Generic fallback
  return {
    response: "I'm your PREPZR assistant. You can ask me about your study plans, practice tests, or how to navigate the dashboard.",
    action: 'speak'
  };
};

/**
 * Get a random motivational message based on context
 */
export const getMotivationalMessage = (context?: string, userName?: string) => {
  const greeting = userName ? `, ${userName}` : '';
  
  const generalMessages = [
    `You're making great progress${greeting}! Keep up the good work.`,
    `Remember${greeting}, small steps every day lead to big results.`,
    `You've got this${greeting}! Stay focused on your goals.`,
    `Learning is a journey${greeting}, not a destination. Enjoy the process!`,
    `Your consistent effort will pay off${greeting}. I believe in you!`
  ];
  
  const studyMessages = [
    `Great job on your study session${greeting}! Your dedication is admirable.`,
    `Remember to take short breaks${greeting} to maintain peak productivity.`,
    `You're building knowledge that will last a lifetime${greeting}.`,
    `Every minute you study brings you closer to your goals${greeting}.`,
    `Your focus and determination are impressive${greeting}!`
  ];
  
  const examMessages = [
    `You're well-prepared${greeting}. Trust your knowledge and stay calm.`,
    `Deep breaths${greeting}. You've put in the work, now show what you know.`,
    `Approach each question methodically${greeting}. You've got this!`,
    `Remember your strategies${greeting}. You're ready for this exam.`,
    `Stay confident${greeting}! Your preparation will carry you through.`
  ];
  
  const specificMessages = {
    'study': studyMessages,
    'exam': examMessages,
    'test': examMessages,
    'default': generalMessages
  };
  
  const messageList = context && specificMessages[context] 
    ? specificMessages[context] 
    : generalMessages;
    
  return messageList[Math.floor(Math.random() * messageList.length)];
};

/**
 * Check if welcome voice should play for a user
 */
export const shouldPlayWelcomeVoice = () => {
  // Check if it's a first-time user
  const isNewUser = localStorage.getItem('new_user_signup') === 'true';
  
  // Check if the welcome voice has already been played
  const voicePlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
  
  // Check if voice welcome is explicitly requested
  const showVoiceWelcome = localStorage.getItem('show_voice_welcome') === 'true';
  
  return (isNewUser || showVoiceWelcome) && !voicePlayed;
};
