
import { VoiceSettings } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' }
];

// Find the best matching voice based on language
export const findBestVoice = (language: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) {
    console.log('No voices available');
    return null;
  }

  // First, try to find an exact match for the language
  let matchingVoice = voices.find(v => v.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!matchingVoice) {
    const langPrefix = language.split('-')[0];
    matchingVoice = voices.find(v => v.lang.startsWith(`${langPrefix}-`));
  }
  
  // If still no match, use any voice
  if (!matchingVoice) {
    console.log(`No matching voice found for ${language}, using default voice`);
    return voices[0]; // Default to first available voice
  }
  
  return matchingVoice;
};

// Function to fix pronunciation of certain words for better speech quality
export const fixPronunciation = (text: string, language: string): string => {
  let fixedText = text;
  
  if (language.startsWith('en')) {
    // Fix English pronunciations
    fixedText = fixedText
      .replace(/PREPZR/gi, 'prep zee are')
      .replace(/NEET/gi, 'neet')
      .replace(/JEE/gi, 'J E E')
      .replace(/AI/g, 'A I');
  } else if (language === 'hi-IN') {
    // Fix Hindi pronunciations if needed
    fixedText = fixedText
      .replace(/PREPZR/gi, 'प्रेप ज़ेड आर')
      .replace(/NEET/gi, 'नीट')
      .replace(/JEE/gi, 'जे ई ई');
  }
  
  return fixedText;
};

// Function to speak a message with proper event dispatching
export const speakMessage = (message: string, settingsOrForceFlag: VoiceSettings | boolean = DEFAULT_VOICE_SETTINGS): void => {
  if (!message || message.trim() === '') return;
  
  // Handle case when second parameter is just a boolean (force flag)
  let settings: VoiceSettings = DEFAULT_VOICE_SETTINGS;
  let forceSpeak = false;
  
  if (typeof settingsOrForceFlag === 'boolean') {
    forceSpeak = settingsOrForceFlag;
  } else {
    settings = settingsOrForceFlag;
  }
  
  // Check if speech synthesis is available
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Don't speak if voice is disabled and not forced
  if (!settings.enabled && !forceSpeak) return;
  if (settings.muted && !forceSpeak) return;
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance();
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Fix pronunciation based on language
  const fixedMessage = fixPronunciation(message, settings.language);
  
  // Set utterance properties
  utterance.text = fixedMessage;
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Get available voices and set the best matching one
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = settings.voice || findBestVoice(settings.language, voices);
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  // Dispatch an event when speech starts
  const startEvent = new CustomEvent('voice-speaking-started', { 
    detail: { message: fixedMessage }
  });
  
  document.dispatchEvent(startEvent);
  document.body.classList.add('voice-speaking');
  
  // Speak the utterance
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  window.speechSynthesis.speak(utterance);
};

// Get appropriate greeting based on time of day, user's name, and mood
export const getGreeting = (userName?: string, mood?: string, isFirstTime?: boolean): string => {
  const hour = new Date().getHours();
  let timeGreeting = "Hello";
  
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";
  
  const name = userName ? `, ${userName}` : '';
  
  if (isFirstTime) {
    return `${timeGreeting}${name}! Welcome to PREPZR. I'm your voice assistant. I can help you navigate the platform, answer questions, and provide study recommendations.`;
  }
  
  // General greeting
  return `${timeGreeting}${name}! How can I help you with your studies today?`;
};

// Get announcement for pending tasks and reminders
export const getReminderAnnouncement = (pendingTasks: Array<{title: string, due?: string}> = []): string => {
  if (pendingTasks.length === 0) {
    return "You have no pending tasks for today. Great job staying on top of your work!";
  }
  
  const taskCount = pendingTasks.length;
  let announcement = `You have ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} pending. `;
  
  if (taskCount <= 3) {
    // List the tasks if there are only a few
    announcement += "These include: ";
    pendingTasks.forEach((task, index) => {
      if (index > 0) {
        announcement += (index === taskCount - 1) ? " and " : ", ";
      }
      announcement += task.title;
      if (task.due) {
        announcement += ` due ${task.due}`;
      }
    });
  } else {
    // Just mention the first couple if there are many
    announcement += `Including ${pendingTasks[0].title} and ${pendingTasks[1].title}, among others.`;
  }
  
  return announcement;
};

// Get motivational message based on context
export const getMotivationalMessage = (examGoal?: string): string => {
  const messages = [
    "Remember, consistent study leads to success. You're doing great!",
    "Small daily improvements lead to outstanding results over time.",
    "Every study session brings you one step closer to your goal.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your future self will thank you for the hard work you're putting in today."
  ];
  
  // Exam-specific motivational messages
  const examSpecificMessages: Record<string, string[]> = {
    'NEET': [
      "Stay focused on your NEET preparation. Your dedication will pay off!",
      "The NEET exam requires consistent practice. You're on the right track!",
      "Your NEET journey is a marathon, not a sprint. Keep building your knowledge daily."
    ],
    'JEE': [
      "JEE preparation demands persistence. You've got this!",
      "Every JEE problem you solve strengthens your understanding.",
      "Your JEE success story is being written with every study session."
    ]
  };
  
  // If we have an exam goal and specific messages for it, include them in the possible messages
  let possibleMessages = [...messages];
  if (examGoal && examSpecificMessages[examGoal]) {
    possibleMessages = [...possibleMessages, ...examSpecificMessages[examGoal]];
  }
  
  // Return a random message
  return possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
};

// Process user voice input and provide appropriate response
export const processUserQuery = (
  query: string,
  navigate: any,
  options: {
    startTest?: () => void,
    showFlashcards?: () => void,
    examGoal?: string
  } = {}
): string => {
  const lowerQuery = query.toLowerCase();
  
  // Handle navigation commands
  if (lowerQuery.includes('dashboard') || lowerQuery.includes('home')) {
    if (navigate) navigate('/dashboard/student');
    return "Taking you to the student dashboard.";
  }
  
  if (lowerQuery.includes('study plan') || lowerQuery.includes('schedule')) {
    if (navigate) navigate('/dashboard/student/study-plan');
    return "Opening your study plan now.";
  }
  
  if (lowerQuery.includes('practice') || lowerQuery.includes('test') || lowerQuery.includes('exam')) {
    if (options.startTest) {
      options.startTest();
      return "Starting a practice test for you now.";
    }
    if (navigate) navigate('/dashboard/student/practice');
    return "Opening the practice test section.";
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
    if (options.showFlashcards) {
      options.showFlashcards();
      return "Opening your flashcards now.";
    }
    if (navigate) navigate('/dashboard/student/flashcards');
    return "Taking you to your flashcards.";
  }
  
  if (lowerQuery.includes('profile') || lowerQuery.includes('account') || lowerQuery.includes('settings')) {
    if (navigate) navigate('/dashboard/student/profile');
    return "Opening your profile settings.";
  }
  
  // Handle voice control commands
  if (lowerQuery.includes('mute') || lowerQuery.includes('stop talking') || lowerQuery.includes('be quiet')) {
    return "MUTE_COMMAND";
  }
  
  if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking') || lowerQuery.includes('speak again')) {
    return "UNMUTE_COMMAND";
  }
  
  // Handle language switch commands
  if (lowerQuery.includes('speak hindi') || lowerQuery.includes('hindi mode') || lowerQuery.includes('in hindi')) {
    return "मैं अब हिंदी में बात करूंगा। मैं आपकी किस प्रकार सहायता कर सकता हूँ?";
  }
  
  if (lowerQuery.includes('speak english') || lowerQuery.includes('english mode') || lowerQuery.includes('in english')) {
    return "I'll speak English now. How can I help you with your studies?";
  }
  
  // Handle informational queries
  if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
    return "I can help you navigate the dashboard, access your study materials, open practice tests, check your schedule, and provide motivational support. Just ask me what you need!";
  }
  
  if (lowerQuery.includes('motivation') || lowerQuery.includes('motivate me')) {
    return getMotivationalMessage(options.examGoal);
  }
  
  // Default response if nothing specific matched
  return "I didn't quite catch that. You can ask me to navigate to different sections, start a practice test, or help with your study plan.";
};
