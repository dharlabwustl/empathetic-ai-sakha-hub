import { VoiceSettings } from '@/types/voice';
import { MoodType } from '@/types/user/base';
import { NavigateFunction } from 'react-router-dom';

// Default voice settings
export interface VoiceSettings {
  muted?: boolean;
  pitch?: number;
  rate?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
  language?: string;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  muted: false,
  pitch: 1.0,
  rate: 1.0,
  volume: 1.0,
  voice: null,
  language: 'en-IN' // Default to Indian English
};

// Get appropriate greeting based on time of day and user state
export const getGreeting = (
  userName?: string,
  mood?: string,
  isFirstTimeUser?: boolean
): string => {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  
  if (isFirstTimeUser) {
    return `Welcome to PREPZR, ${userName || 'student'}! I'm your voice assistant. How can I help you prepare for your exams today?`;
  }
  
  const greetingBase = `Good ${timeOfDay}, ${userName || 'student'}! `;
  
  if (mood) {
    const normalizedMood = mood.toLowerCase();
    
    if (normalizedMood === 'motivated' || normalizedMood === 'focused') {
      return `${greetingBase}Great to see you're feeling ${normalizedMood}! Let's make the most of your study session today.`;
    } 
    else if (normalizedMood === 'tired' || normalizedMood === 'stressed') {
      return `${greetingBase}I see you're feeling ${normalizedMood}. Let me suggest some lighter study activities today, or perhaps a short break?`;
    }
    else if (normalizedMood === 'confused') {
      return `${greetingBase}I notice you're feeling confused. Would you like me to explain a concept or help you find resources?`;
    }
    else if (normalizedMood === 'bored') {
      return `${greetingBase}Feeling bored? Let's try something more engaging. How about a quiz or some interactive content?`;
    }
  }
  
  return `${greetingBase}How can I assist with your studies today?`;
};

// Get a reminder announcement
export const getReminderAnnouncement = (upcomingTasks: Array<{title: string, due?: string}> = []): string => {
  if (upcomingTasks.length === 0) {
    return "You don't have any upcoming tasks or tests scheduled. Would you like to create a study plan?";
  }
  
  if (upcomingTasks.length === 1) {
    const task = upcomingTasks[0];
    return `Just a reminder: you have "${task.title}" ${task.due ? `due ${task.due}` : "coming up"}. Would you like to work on it now?`;
  }
  
  return `You have ${upcomingTasks.length} upcoming tasks. The most urgent is "${upcomingTasks[0].title}" ${upcomingTasks[0].due ? `due ${upcomingTasks[0].due}` : "coming up"}.`;
};

// Get motivational message based on progress or mood
export const getMotivationalMessage = (
  progress?: number,
  mood?: string
): string => {
  if (progress !== undefined) {
    if (progress < 25) {
      return "You're just getting started, but every journey begins with a single step. Keep going!";
    } else if (progress < 50) {
      return "You're making steady progress. Keep up the momentum!";
    } else if (progress < 75) {
      return "You're over halfway there! Your dedication is really showing.";
    } else {
      return "You're in the final stretch! Stay focused and you'll achieve your goals.";
    }
  }
  
  if (mood) {
    const normalizedMood = mood.toLowerCase();
    
    if (normalizedMood === 'stressed' || normalizedMood === 'tired') {
      return "Remember that taking breaks is part of effective studying. Your wellbeing matters as much as your grades.";
    }
    else if (normalizedMood === 'motivated') {
      return "That's the spirit! Motivation is what gets you started, habit is what keeps you going.";
    }
  }
  
  // Default motivational messages
  const motivationalMessages = [
    "Small daily improvements lead to outstanding results.",
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Your potential is limitless. Keep learning, keep growing.",
    "Every challenge you overcome makes the next one easier."
  ];
  
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

// Fix pronunciation for certain technical terms
export const fixPronunciation = (text: string): string => {
  // Replace technical terms with phonetic spellings for better pronunciation
  const replacements: {[key: string]: string} = {
    'pH': 'p H',
    'mRNA': 'm R N A',
    'DNA': 'D N A',
    'RNA': 'R N A',
    'LaTeX': 'Lay Tech',
    'dx/dt': 'd x by d t',
    'f(x)': 'f of x',
    '∫': 'integral',
    '∑': 'sum of',
    'π': 'pi',
    '→': 'arrow',
    '≈': 'approximately equal to',
    '≠': 'not equal to',
    '≤': 'less than or equal to',
    '≥': 'greater than or equal to',
    '±': 'plus or minus',
    '∞': 'infinity',
    '∂': 'partial',
    'Δ': 'delta',
    'λ': 'lambda',
    'μ': 'mu',
    'σ': 'sigma',
    'θ': 'theta',
    'Ω': 'omega'
  };
  
  let modifiedText = text;
  
  // Apply all replacements
  Object.entries(replacements).forEach(([symbol, pronunciation]) => {
    modifiedText = modifiedText.replace(new RegExp(symbol, 'g'), pronunciation);
  });
  
  return modifiedText;
};

// Speak a message with optional voice settings
export const speakMessage = (
  message: string,
  settings: VoiceSettings = DEFAULT_VOICE_SETTINGS
): void => {
  if (!message || settings.muted) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create a new speech object
  const speech = new SpeechSynthesisUtterance();
  
  // Apply settings
  speech.text = fixPronunciation(message);
  speech.volume = settings.volume || 1;
  speech.rate = settings.rate || 1;
  speech.pitch = settings.pitch || 1;
  
  // Set language if specified
  if (settings.language) {
    speech.lang = settings.language;
  }
  
  // If a specific voice is requested, try to use it
  if (settings.voice) {
    speech.voice = settings.voice;
  } else {
    // Otherwise, try to find a good voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voicesForLanguage = voices.filter(voice => 
      voice.lang.startsWith(speech.lang.split('-')[0])
    );
    
    // Prefer female voices if available
    const femaleVoice = voicesForLanguage.find(voice => 
      voice.name.includes('female') || 
      voice.name.includes('Female') || 
      voice.name.includes('woman') ||
      voice.name.includes('Woman') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('samantha')
    );
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    } else if (voicesForLanguage.length > 0) {
      speech.voice = voicesForLanguage[0];
    }
  }
  
  // Add event listeners for speech start and end
  speech.addEventListener('start', () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { 
      detail: { message } 
    }));
  });
  
  speech.addEventListener('end', () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  });
  
  // Speak the text
  window.speechSynthesis.speak(speech);
};

// Process user voice commands
export interface VoiceCommandHandlers {
  startTest?: () => void;
  showFlashcards?: () => void;
  examGoal?: string;
}

// Process user voice commands
export const processUserQuery = (
  query: string,
  navigate: NavigateFunction,
  handlers: VoiceCommandHandlers = {}
): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check for mute/unmute commands
  if (lowerQuery.includes('mute') || lowerQuery.includes('stop talking')) {
    return "MUTE_COMMAND";
  }
  
  if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking')) {
    return "UNMUTE_COMMAND";
  }
  
  // Navigation commands
  if (lowerQuery.includes('go to dashboard') || lowerQuery.includes('show dashboard') || lowerQuery.includes('open dashboard')) {
    navigate('/dashboard/student');
    return "Opening the dashboard for you.";
  }
  
  if (lowerQuery.includes('go to profile') || lowerQuery.includes('show profile') || lowerQuery.includes('open profile')) {
    navigate('/dashboard/student/profile');
    return "Taking you to your profile page.";
  }
  
  if (lowerQuery.includes('go to concepts') || lowerQuery.includes('show concepts') || lowerQuery.includes('open concepts')) {
    navigate('/dashboard/student/concepts');
    return "Opening the concepts page where you can explore different topics.";
  }
  
  if (lowerQuery.includes('go to flashcards') || lowerQuery.includes('show flashcards') || lowerQuery.includes('open flashcards')) {
    if (handlers.showFlashcards) {
      handlers.showFlashcards();
    } else {
      navigate('/dashboard/student/flashcards');
    }
    return "Here are your flashcards. You can review them to reinforce your knowledge.";
  }
  
  if (lowerQuery.includes('go to academic advisor') || lowerQuery.includes('show academic advisor') || lowerQuery.includes('open academic advisor')) {
    navigate('/dashboard/student/academic');
    return "Opening your academic advisor page with personalized study recommendations.";
  }
  
  if (lowerQuery.includes('go to today') || lowerQuery.includes('show today') || lowerQuery.includes('today\'s plan') || lowerQuery.includes('daily plan')) {
    navigate('/dashboard/student/today');
    return "Here's your study plan for today. Let's make progress together!";
  }
  
  // Study actions
  if (lowerQuery.includes('start test') || lowerQuery.includes('take test') || lowerQuery.includes('begin test')) {
    if (handlers.startTest) {
      handlers.startTest();
    } else {
      navigate('/dashboard/student/practice-exam');
    }
    return "Starting a practice test for you. Good luck!";
  }
  
  // Mood-based queries
  if (lowerQuery.includes('feeling stressed') || lowerQuery.includes('i am stressed') || lowerQuery.includes('stress')) {
    navigate('/dashboard/student/feel-good-corner');
    return "I'm sorry to hear that you're feeling stressed. I've opened the Feel Good Corner where you can find relaxation exercises and resources to help manage stress.";
  }
  
  if (lowerQuery.includes('feeling tired') || lowerQuery.includes('i am tired') || lowerQuery.includes('too tired')) {
    return "It sounds like you need a break. Remember, effective studying includes rest periods. Consider taking a 15-minute break to refresh your mind, or try doing a shorter, high-impact study session with our flashcards.";
  }
  
  // Information queries
  if (lowerQuery.includes('what is my exam') || lowerQuery.includes('when is my exam') || lowerQuery.includes('exam date')) {
    const examGoal = handlers.examGoal || "your target exam";
    return `You're currently preparing for ${examGoal}. To see exact dates and more details, check your academic advisor page.`;
  }
  
  if (lowerQuery.includes('help') || lowerQuery.includes('what can you do') || lowerQuery.includes('what can i ask')) {
    return "I'm your PREPZR voice assistant. You can ask me to navigate through different sections like 'go to flashcards' or 'open today's plan'. I can help with actions like 'start a practice test', answer questions about your progress, or provide study tips. Just speak naturally and I'll do my best to help!";
  }
  
  if (lowerQuery.includes('how am i doing') || lowerQuery.includes('my progress') || lowerQuery.includes('how is my progress')) {
    navigate('/dashboard/student/academic');
    return "I've opened your academic advisor page where you can see detailed information about your progress. You've been making steady improvements!";
  }
  
  // Study tips
  if (lowerQuery.includes('study tip') || lowerQuery.includes('how to study better') || lowerQuery.includes('study advice')) {
    const studyTips = [
      "Break your study sessions into 25-minute focused periods with 5-minute breaks, known as the Pomodoro Technique.",
      "Review your notes within 24 hours of taking them to significantly improve retention.",
      "Use practice tests to identify knowledge gaps and focus your efforts more effectively.",
      "Teaching concepts to others, even imaginary students, can help solidify your understanding.",
      "Create mind maps to visualize connections between different concepts.",
      "Alternate between different subjects rather than studying one subject for too long."
    ];
    
    return studyTips[Math.floor(Math.random() * studyTips.length)];
  }
  
  // Mood management
  if (lowerQuery.includes('motivate me') || lowerQuery.includes('need motivation') || lowerQuery.includes('feel motivated')) {
    return getMotivationalMessage();
  }
  
  // Language preference
  if (lowerQuery.includes('speak hindi') || lowerQuery.includes('talk in hindi') || lowerQuery.includes('hindi mode')) {
    return "मैं अब हिंदी में बात करूंगा। आप मुझसे अपनी पढ़ाई के बारे में कुछ भी पूछ सकते हैं।";
  }
  
  if (lowerQuery.includes('speak english') || lowerQuery.includes('talk in english') || lowerQuery.includes('english mode')) {
    return "I'm now speaking in English. How can I help with your studies?";
  }
  
  // Default responses
  const defaultResponses = [
    "I'm not sure I understood that. Try asking about your study plan, concepts, or how to navigate to different parts of the app.",
    "Could you rephrase that? You can ask me to help you navigate the app, start a practice test, or provide study tips.",
    "I didn't quite catch that. I can help you with your studies by showing your daily plan, concepts, or flashcards.",
    "I'm still learning. Could you try asking me to help with something specific like opening your study plan or providing a study tip?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
