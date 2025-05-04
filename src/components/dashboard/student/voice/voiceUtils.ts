
import { MoodType } from '@/types/user/base';

export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  pitch: number;
  rate: number;
  voice: SpeechSynthesisVoice | null;
  language: string;
  autoGreet: boolean;
  muted: boolean;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 1.0,
  pitch: 1.1,
  rate: 0.98,
  voice: null, // Will be set dynamically
  language: 'en-US',
  autoGreet: true,
  muted: false
};

// Function to speak a message with specific settings
export const speakMessage = (
  message: string, 
  settings: Partial<VoiceSettings> = {}, 
  force: boolean = false
): void => {
  const mergedSettings: VoiceSettings = { ...DEFAULT_VOICE_SETTINGS, ...settings };
  
  // Don't speak if muted or disabled and not forced
  if ((mergedSettings.muted || !mergedSettings.enabled) && !force) {
    console.log('Voice is muted or disabled:', message);
    return;
  }
  
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Format message for better pronunciation of PREPZR
    const formattedMessage = message.replace(/PREP-ZR/g, "PREP EEZER")
                                    .replace(/PREPZR/g, "PREP EEZER");
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(formattedMessage);
    
    // Apply settings
    utterance.volume = mergedSettings.volume;
    utterance.pitch = mergedSettings.pitch;
    utterance.rate = mergedSettings.rate;
    utterance.lang = mergedSettings.language;
    
    // If a specific voice is set, use it
    if (mergedSettings.voice) {
      utterance.voice = mergedSettings.voice;
    } else {
      // Otherwise, try to find an Indian female voice
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English female voice first
      const indianVoice = voices.find(voice => 
        (voice.name.includes('Indian') || voice.lang === 'en-IN' || voice.lang === 'hi-IN') && 
        voice.name.includes('Female')
      );
      
      // Fall back to any female voice
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
        console.log('Using Indian female voice:', indianVoice.name);
      } else if (femaleVoice) {
        utterance.voice = femaleVoice;
        console.log('Using female voice:', femaleVoice.name);
      }
    }
    
    // Set up events
    utterance.onstart = () => {
      console.log('Speaking started:', formattedMessage);
      document.dispatchEvent(new CustomEvent('voice-speaking-started', { 
        detail: { message } 
      }));
    };
    
    utterance.onend = () => {
      console.log('Speaking ended');
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser');
  }
};

// Initialize speech synthesis and get available voices
export const initSpeechSynthesis = async (): Promise<SpeechSynthesisVoice[]> => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Chrome requires user interaction before audio can play
    // Create a dummy utterance to initialize the speech synthesis
    const dummyUtterance = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(dummyUtterance);
    window.speechSynthesis.cancel();
    
    // Wait for voices to be loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      await new Promise<void>((resolve) => {
        window.speechSynthesis.onvoiceschanged = () => resolve();
      });
    }
    
    return window.speechSynthesis.getVoices();
  }
  
  return [];
};

// Get appropriate greeting based on user state
export const getGreeting = (
  userName?: string, 
  mood?: string, 
  isFirstTimeUser: boolean = false
): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  let greeting = `${timeGreeting}${userName ? ', ' + userName : ''}`;
  
  if (isFirstTimeUser) {
    greeting += ". Welcome to PREP-ZR! I'm your AI study assistant. I'll help guide you through our platform and optimize your exam preparation journey. Let me know if you need any help getting started.";
  } else {
    greeting += ". Welcome back to PREP-ZR! Let's continue with your exam preparation.";
    
    // Add mood-based message if applicable
    if (mood) {
      greeting += ' ' + getMoodBasedGreeting(mood);
    }
  }
  
  return greeting;
};

// Get mood-based greeting component
const getMoodBasedGreeting = (mood: string): string => {
  switch(mood.toLowerCase()) {
    case 'motivated':
      return "I can see you're feeling motivated today! Let's channel that energy into some productive study sessions.";
    case 'focused':
      return "I notice you're feeling focused. That's perfect for tackling challenging topics.";
    case 'tired':
      return "You seem tired today. Let's adjust your study plan with shorter sessions and more breaks.";
    case 'anxious':
      return "I understand you're feeling anxious. We'll start with some confidence-building review topics.";
    case 'happy':
      return "Your positive mood will make learning more enjoyable today!";
    case 'stressed':
      return "I see you're feeling stressed. Remember to take deep breaths between study sessions.";
    case 'sad':
      return "It's okay to feel down sometimes. Let's focus on topics you enjoy today.";
    default:
      return "How would you like to approach your studies today?";
  }
};

// Get announcement for pending tasks/reminders
export const getReminderAnnouncement = (tasks: Array<{title: string, due?: string}> = []): string => {
  if (tasks.length === 0) {
    return "You don't have any pending tasks for today. Would you like to create a new study plan?";
  }
  
  let announcement = `You have ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} on your schedule. `;
  
  if (tasks.length <= 3) {
    announcement += "These include: " + tasks.map(task => task.title).join(", ");
  } else {
    announcement += `Including ${tasks[0].title} and ${tasks[1].title} and ${tasks.length - 2} more.`;
  }
  
  return announcement;
};

// Get motivational message
export const getMotivationalMessage = (mood?: MoodType): string => {
  const generalMessages = [
    "Consistency is key to exam success. Even small daily progress adds up to big results.",
    "Each study session brings you one step closer to your goals. Keep going!",
    "Your hard work today is an investment in your future success.",
    "The effort you put in now will be reflected in your results later.",
    "Remember: great achievements require time, dedication and consistent effort.",
    "Every question you practice strengthens your understanding.",
    "Learning is not a sprint but a marathon. Pace yourself for long-term success.",
    "Mistakes are stepping stones to deeper understanding. Learn from them!",
    "Your preparation journey matters as much as the destination. Enjoy the process.",
    "Take pride in your progress, no matter how small it may seem."
  ];
  
  if (!mood) {
    // Return random general message if no mood is provided
    return generalMessages[Math.floor(Math.random() * generalMessages.length)];
  }
  
  // Return mood-specific message
  switch(mood) {
    case MoodType.Motivated:
      return "Your motivation is inspiring! Channel this energy into your most challenging topics today.";
    case MoodType.Focused:
      return "Your focused state is perfect for deep learning. Let's maximize this concentration!";
    case MoodType.Tired:
      return "It's okay to feel tired. Consider shorter study sessions with more frequent breaks today.";
    case MoodType.Anxious:
      return "Take a deep breath. Break down your study goals into smaller, manageable tasks to reduce anxiety.";
    case MoodType.Happy:
      return "Your positive mood creates the perfect learning environment. Knowledge sticks better when you're happy!";
    case MoodType.Neutral:
      return "A balanced mindset is great for consistent learning. Let's maintain this steady progress!";
    case MoodType.Stressed:
      return "When feeling stressed, remember to pause and breathe. Tackle one concept at a time.";
    case MoodType.Sad:
      return "On difficult days, be kind to yourself. Even small progress is still progress.";
    default:
      return generalMessages[Math.floor(Math.random() * generalMessages.length)];
  }
};

// Process user query and respond appropriately
export const processUserQuery = (
  query: string,
  navigate: any,
  actions: {
    startTest?: () => void;
    switchLanguage?: (lang: string) => void;
    showFlashcards?: () => void;
    examGoal?: string;
  } = {}
): string => {
  const lowerQuery = query.toLowerCase();
  
  // Handle mute/unmute commands
  if (lowerQuery.includes('mute') || lowerQuery.includes('be quiet') || lowerQuery.includes('stop talking')) {
    return "MUTE_COMMAND";
  }
  
  if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking') || lowerQuery.includes('resume voice')) {
    return "UNMUTE_COMMAND";
  }
  
  // Handle navigation requests
  if (lowerQuery.includes('dashboard') || lowerQuery.includes('home')) {
    navigate('/dashboard/student');
    return "Taking you to the dashboard.";
  }
  
  if (lowerQuery.includes('profile') || lowerQuery.includes('my account')) {
    navigate('/dashboard/student/profile');
    return "Opening your profile settings.";
  }
  
  if (lowerQuery.includes('study plan') || lowerQuery.includes('schedule')) {
    navigate('/dashboard/student/study-plan');
    return "Let's check your study plan.";
  }
  
  if (lowerQuery.includes('test') || lowerQuery.includes('exam') || lowerQuery.includes('quiz')) {
    if (actions.startTest) {
      actions.startTest();
      return "Starting a practice test for you.";
    } else {
      navigate('/dashboard/student/practice-exam');
      return "Let's practice with some exam questions.";
    }
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
    if (actions.showFlashcards) {
      actions.showFlashcards();
      return "Opening your flashcards for review.";
    } else {
      navigate('/dashboard/student/flashcards');
      return "Let's review your flashcards.";
    }
  }
  
  // Handle language switch requests
  if (lowerQuery.includes('speak in hindi') || lowerQuery.includes('hindi language')) {
    if (actions.switchLanguage) {
      actions.switchLanguage('hi-IN');
      return "मैं अब हिंदी में बात करूंगा।"; // I'll now speak in Hindi
    }
    return "I'll try to speak in Hindi, but I might need to improve my Hindi pronunciation.";
  }
  
  if (lowerQuery.includes('speak in english') || lowerQuery.includes('english language')) {
    if (actions.switchLanguage) {
      actions.switchLanguage('en-US');
    }
    return "I'll speak in English from now on.";
  }
  
  // Generic responses
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery === 'hi') {
    return "Hello! How can I assist with your studies today?";
  }
  
  if (lowerQuery.includes('how are you')) {
    return "I'm doing well, thank you! More importantly, how are your studies progressing?";
  }
  
  if (lowerQuery.includes('thank you') || lowerQuery.includes('thanks')) {
    return "You're welcome! I'm here to help you succeed.";
  }
  
  if (lowerQuery.includes('help') || lowerQuery.includes('assistance')) {
    return "I can help you navigate PREP-ZR, find study materials, schedule your studies, or answer questions about your exams. What would you like help with?";
  }
  
  // Default response
  return "I'm not sure how to help with that. You can ask me about your study plan, practice tests, or navigating PREP-ZR.";
};
