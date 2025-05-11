
import { MoodType } from "@/types/user/base";

export interface VoiceSettings {
  volume: number;
  rate: number;
  pitch: number;
  language: SupportedLanguage;
  enabled: boolean;
  muted: boolean;
  voice: SpeechSynthesisVoice | null;
  autoGreet?: boolean;
}

export type SupportedLanguage = 'en-US' | 'en-IN' | 'hi-IN' | 'en-GB';

export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi (India)' }
];

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1,
  rate: 0.95,
  pitch: 1.1,
  language: 'en-US',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// List of voice commands for the system
export const VOICE_COMMANDS = {
  // Navigation commands
  NAVIGATE: {
    HOME: ['go home', 'go to home', 'show home', 'home page'],
    DASHBOARD: ['go to dashboard', 'show dashboard', 'open dashboard'],
    STUDY_PLAN: ['go to study plan', 'show study plan', 'open study plan', 'view study plan'],
    TODAY_PLAN: ['go to today\'s plan', 'show today\'s plan', 'open today\'s plan', 'what\'s my plan for today'],
    CONCEPTS: ['go to concepts', 'show concepts', 'open concepts', 'view concepts'],
    FLASHCARDS: ['go to flashcards', 'show flashcards', 'open flashcards', 'practice flashcards'],
    FORMULA_LAB: ['go to formula lab', 'show formula lab', 'open formula lab', 'practice formulas'],
    PROFILE: ['go to profile', 'show profile', 'open profile', 'view profile'],
    SETTINGS: ['go to settings', 'show settings', 'open settings']
  },
  // Action commands
  ACTION: {
    START_STUDY: ['start studying', 'begin study session', 'let\'s study', 'start session'],
    TAKE_BREAK: ['take a break', 'pause studying', 'break time', 'rest for a while'],
    RESUME_STUDY: ['resume studying', 'continue studying', 'back to work'],
    FINISH_STUDY: ['finish studying', 'end study session', 'stop studying'],
    LOG_MOOD: ['log my mood', 'update mood', 'change my mood', 'how am I feeling', 'set my mood'],
    START_TIMER: ['start timer', 'set timer', 'start pomodoro', 'begin timer'],
    HELP: ['help me', 'what can you do', 'show commands', 'voice commands', 'available commands']
  },
  // Query commands
  QUERY: {
    PROGRESS: ['show my progress', 'how am I doing', 'view progress', 'check progress'],
    NEXT_TASK: ['what\'s next', 'next task', 'what should I study next', 'upcoming task'],
    STUDY_STREAK: ['what\'s my streak', 'study streak', 'how many days streak', 'continuous days'],
    DAILY_GOAL: ['daily goal', 'progress towards goal', 'goal completion', 'today\'s goal'],
    STUDY_TIME: ['how long have I studied', 'study time today', 'total study time', 'study duration'],
    WEAK_AREAS: ['what are my weak areas', 'where should I improve', 'difficult topics', 'improvement areas']
  },
  // Mood commands
  MOOD: {
    HAPPY: ['I feel happy', 'I\'m happy', 'feeling good', 'feeling great'],
    ANXIOUS: ['I feel anxious', 'I\'m anxious', 'feeling nervous', 'I\'m worried'],
    TIRED: ['I feel tired', 'I\'m tired', 'feeling exhausted', 'no energy'],
    MOTIVATED: ['I feel motivated', 'I\'m motivated', 'feeling inspired', 'ready to work'],
    STRESSED: ['I feel stressed', 'I\'m stressed', 'feeling overwhelmed', 'too much pressure'],
    CONFUSED: ['I feel confused', 'I\'m confused', 'don\'t understand', 'need clarity']
  }
};

// Find the best voice for the current language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  
  // Look for exact language match first
  const exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;
  
  // Look for voice that starts with the language code
  const languageCode = language.split('-')[0];
  const partialMatch = voices.find(voice => voice.lang.startsWith(languageCode));
  if (partialMatch) return partialMatch;
  
  // Default to first voice as fallback
  return voices[0];
};

// Function to speak a message
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (!window.speechSynthesis || settings.muted) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create speech utterance
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Find best voice
  const voice = settings.voice || findBestVoice(settings.language);
  if (voice) utterance.voice = voice;
  
  // Track speaking state
  utterance.onstart = () => {
    document.body.classList.add('voice-speaking');
    const startEvent = new CustomEvent('voice-speaking-started', {
      detail: { message }
    });
    document.dispatchEvent(startEvent);
  };
  
  utterance.onend = () => {
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Fix pronunciation for common words
export const fixPronunciation = (text: string): string => {
  // Replace abbreviations and technical terms for better pronunciation
  const replacements: { [key: string]: string } = {
    'IIT-JEE': 'I I T J E E',
    'NEET': 'N E E T',
    'PCM': 'P C M',
    'PCB': 'P C B',
    'CBSE': 'C B S E',
    'AIIMS': 'A I I M S',
    'PREPZR': 'Prep Zed R',
    'e.g.': 'for example',
    'i.e.': 'that is',
    'etc.': 'etcetera',
    'w.r.t.': 'with respect to',
    'w.r.t': 'with respect to',
    'vs.': 'versus',
    'vs': 'versus'
  };
  
  let result = text;
  Object.entries(replacements).forEach(([pattern, replacement]) => {
    result = result.replace(new RegExp(pattern, 'gi'), replacement);
  });
  
  return result;
};

// Get appropriate greeting based on time of day and user mood
export const getGreeting = (name?: string, mood?: string, personalized: boolean = true): string => {
  const hour = new Date().getHours();
  let greeting = '';
  
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  if (personalized && name) {
    greeting += `, ${name}`;
  }
  
  // Add mood-specific greeting
  if (mood) {
    const lowerMood = mood.toLowerCase();
    if (['happy', 'motivated', 'focused'].includes(lowerMood)) {
      greeting += `. I see you're feeling ${lowerMood}. That's great for studying!`;
    } else if (['tired', 'stressed', 'overwhelmed', 'anxious'].includes(lowerMood)) {
      greeting += `. I notice you're feeling ${lowerMood}. Remember to take breaks when needed.`;
    } else if (['confused'].includes(lowerMood)) {
      greeting += `. I see you're feeling ${lowerMood}. Would you like help understanding your study material?`;
    } else {
      greeting += `. How can I assist with your studies today?`;
    }
  } else {
    greeting += `. How can I assist with your studies today?`;
  }
  
  return greeting;
};

// Get study recommendations based on user's mood
export const getStudyRecommendationByMood = (mood?: MoodType): string => {
  if (!mood) return "How can I help with your studies today?";
  
  switch (mood) {
    case MoodType.HAPPY:
      return "Since you're feeling happy, this is a great time to tackle challenging problems or take on new concepts that require creativity.";
    case MoodType.MOTIVATED:
      return "You're motivated today! Perfect time to work on challenging topics or catch up on areas you've been putting off.";
    case MoodType.FOCUSED:
      return "With your focused state, I recommend doing practice exams, difficult problems, or in-depth study of complex topics.";
    case MoodType.CALM:
      return "A calm mind is perfect for understanding difficult concepts. Try working on concepts you've found challenging before.";
    case MoodType.TIRED:
      return "I notice you're feeling tired. Consider shorter study sessions with more breaks, or review familiar material instead of learning new concepts.";
    case MoodType.STRESSED:
      return "When stressed, it helps to break down your study into smaller chunks. Focus on one concept at a time and take regular breaks.";
    case MoodType.OVERWHELMED:
      return "Feeling overwhelmed is common during exam preparation. Let's focus on organizing your study plan and breaking it into manageable parts.";
    case MoodType.ANXIOUS:
      return "Anxiety can affect your focus. Try some breathing exercises before studying, and start with topics you're confident about to build momentum.";
    case MoodType.CONFUSED:
      return "If you're feeling confused, let's focus on clarifying the fundamentals before moving to complex topics. Would you like to review basic concepts?";
    case MoodType.NEUTRAL:
      return "This is a good time for balanced study - mix review sessions with learning new material.";
    case MoodType.CURIOUS:
      return "Your curious state is perfect for exploring new topics or diving deeper into interesting concepts. What would you like to explore today?";
    case MoodType.SAD:
      return "When you're feeling down, gentle review of familiar topics can help. Focus on small achievements and take breaks when needed.";
    case MoodType.OKAY:
      return "Since you're feeling okay, this is a good time for your regular study routine. What topic would you like to focus on today?";
    default:
      return "How can I help with your studies today?";
  }
};

// Generate study progress information
export const getStudyProgressInfo = (username?: string): string => {
  // In a real app, this would pull from actual study data
  const completedTasks = 5;
  const totalTasks = 8;
  const completionPercentage = (completedTasks / totalTasks) * 100;
  const streakDays = 3;
  
  return `${username ? `${username}, here's` : "Here's"} your study progress update: You've completed ${completedTasks} out of ${totalTasks} tasks today (${completionPercentage.toFixed(0)}%). You're on a ${streakDays}-day study streak. Keep up the good work!`;
};

// Generate next task information
export const getNextTaskInfo = (): string => {
  // In a real app, this would pull from the user's actual study plan
  return "Your next task is to review the chapter on Thermodynamics. This is scheduled for 45 minutes. Would you like to start now?";
};

// Parse voice command from text
export const parseVoiceCommand = (text: string): { category: string, command: string } | null => {
  const lowerText = text.toLowerCase();
  
  // Check each command category
  for (const [category, commands] of Object.entries(VOICE_COMMANDS)) {
    for (const [command, phrases] of Object.entries(commands)) {
      if (phrases.some(phrase => lowerText.includes(phrase))) {
        return { category, command };
      }
    }
  }
  
  // No command matched
  return null;
};

// Get mood from text
export const getMoodFromText = (text: string): MoodType | null => {
  const lowerText = text.toLowerCase();
  
  if (VOICE_COMMANDS.MOOD.HAPPY.some(phrase => lowerText.includes(phrase))) {
    return MoodType.HAPPY;
  } else if (VOICE_COMMANDS.MOOD.ANXIOUS.some(phrase => lowerText.includes(phrase))) {
    return MoodType.ANXIOUS;
  } else if (VOICE_COMMANDS.MOOD.TIRED.some(phrase => lowerText.includes(phrase))) {
    return MoodType.TIRED;
  } else if (VOICE_COMMANDS.MOOD.MOTIVATED.some(phrase => lowerText.includes(phrase))) {
    return MoodType.MOTIVATED;
  } else if (VOICE_COMMANDS.MOOD.STRESSED.some(phrase => lowerText.includes(phrase))) {
    return MoodType.STRESSED;
  } else if (VOICE_COMMANDS.MOOD.CONFUSED.some(phrase => lowerText.includes(phrase))) {
    return MoodType.CONFUSED;
  }
  
  return null;
};
