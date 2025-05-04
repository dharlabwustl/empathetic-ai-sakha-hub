import { MoodType } from '@/types/user/base';
import { VoiceSpeakingStartedEvent } from '@/types/voice';

// Default voice settings with Indian female voice preference
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 1.0,
  pitch: 1.1,  // Higher pitch for female voice
  rate: 0.92,  // Slightly slower for better clarity and calmer delivery
  voice: null, // This will be set dynamically
  language: 'en-IN',
  autoGreet: true
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'hi-IN', label: 'हिंदी (Hindi)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' }
];

/**
 * Find the best voice for a specific language
 */
export const findBestVoice = (preferredLang: string = 'en-IN'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  
  console.log(`Finding voice for language: ${preferredLang}, available voices:`, voices.map(v => `${v.name} (${v.lang})`).join(', '));
  
  // First, look for female voices in the preferred language
  const femaleVoice = voices.find(voice => 
    voice.lang.includes(preferredLang) && 
    (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('girl'))
  );
  
  if (femaleVoice) {
    console.log(`Found female voice for ${preferredLang}: ${femaleVoice.name}`);
    return femaleVoice;
  }
  
  // Next, look for any voice in the preferred language
  const langVoice = voices.find(voice => voice.lang.includes(preferredLang));
  if (langVoice) {
    console.log(`Found voice for ${preferredLang}: ${langVoice.name}`);
    return langVoice;
  }
  
  // Special handling for Hindi - fall back to en-IN if no Hindi voice found
  if (preferredLang === 'hi-IN') {
    console.log('No Hindi voice found, trying to find Indian English voice as fallback');
    const indianVoice = voices.find(voice => voice.lang.includes('en-IN'));
    if (indianVoice) return indianVoice;
  }
  
  // As a fallback, try to find any English female voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.includes('en') && 
    (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('girl'))
  );
  
  if (femaleEnglishVoice) {
    console.log(`No match for ${preferredLang}, using English female voice: ${femaleEnglishVoice.name}`);
    return femaleEnglishVoice;
  }
  
  // Last resort, just pick the first English voice we can find
  const anyEnglishVoice = voices.find(voice => voice.lang.includes('en'));
  if (anyEnglishVoice) {
    console.log(`Using default English voice: ${anyEnglishVoice.name}`);
    return anyEnglishVoice;
  }
  
  console.log('No suitable voice found, using first available voice');
  return voices[0];
};

/**
 * Fix pronunciation of certain words while preserving display text
 * This function is used internally by the speech system and doesn't affect displayed text
 */
export const fixPronunciation = (text: string, language: string = 'en-IN'): string => {
  // Only apply pronunciation fixes to English
  if (language.startsWith('en')) {
    // Replace PREPZR for speech pronunciation only - not for display text
    return text
      .replace(/PREPZR/g, "prep-ezer")
      .replace(/NEET/g, "neat") // Ensure NEET is pronounced properly
      .replace(/IIT-JEE/g, "I I T jay e e"); // Fix IIT-JEE pronunciation
  }
  return text;
};

// Helper function to translate greeting text to Hindi
const translateToHindi = (message: string): string => {
  // Simple translation map for common messages
  const translations: Record<string, string> = {
    "Hello": "नमस्ते",
    "Good morning": "सुप्रभात",
    "Good afternoon": "नमस्कार",
    "Good evening": "शुभ संध्या",
    "Welcome": "स्वागत है",
    "Welcome to prep-ezer": "प्रेप-एज़र में आपका स्वागत है",
    "How can I help you": "मैं आपकी कैसे सहायता कर सकता हूं",
    "with your studies today": "आज आपके अध्ययन में",
    "I'm thrilled": "मुझे बहुत खुशी है",
    "Don't worry": "चिंता मत कीजिए",
    "I see you're feeling": "मुझे लगता है कि आप महसूस कर रहे हैं",
    "You're doing": "आप कर रहे हैं",
    "amazing work": "अद्भुत काम",
    "Let's focus": "आइए ध्यान केंद्रित करें",
    "Welcome back": "वापसी पर स्वागत है",
    "I'm your friendly AI study assistant": "मैं आपका मित्रतापूर्ण एआई अध्ययन सहायक हूं",
    "Let me show you around": "मुझे आपको दिखाने दीजिए",
    "Welcome back to prep-ezer": "प्रेप-एज़र में आपका फिर से स्वागत है",
  };
  
  // Simple word-by-word translation for demo purposes
  // In a real app, you would use a proper translation API
  let hindiMessage = message;
  Object.keys(translations).forEach(englishWord => {
    hindiMessage = hindiMessage.replace(new RegExp(englishWord, 'gi'), translations[englishWord]);
  });
  
  // If no translation happened, return a default Hindi message
  if (hindiMessage === message) {
    return "नमस्ते, मैं आपका प्रेप-एज़र एआई सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?";
  }
  
  return hindiMessage;
};

// Helper function to speak a message
export const speakMessage = (
  message: string, 
  settings: VoiceSettings = DEFAULT_VOICE_SETTINGS
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  
  if (!settings.enabled || settings.muted) {
    console.log('Voice is disabled or muted', { enabled: settings.enabled, muted: settings.muted });
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Check if we need to translate to Hindi
  let processedMessage = message;
  if (settings.language === 'hi-IN') {
    processedMessage = translateToHindi(message);
  }
  
  // Fix pronunciation before creating the utterance - but don't modify the display text
  processedMessage = fixPronunciation(processedMessage, settings.language);
  const utterance = new SpeechSynthesisUtterance(processedMessage);
  
  utterance.volume = settings.volume;
  utterance.rate = settings.rate; 
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Try to find the best voice
  const bestVoice = findBestVoice(settings.language);
  if (bestVoice) {
    utterance.voice = bestVoice;
    console.log('Using voice:', bestVoice.name);
  }
  
  // Add visual indicator for speaking
  document.body.classList.add('voice-speaking');
  
  // Pass the original message (not the pronunciation-fixed version) for subtitles
  const originalMessage = settings.language === 'hi-IN' ? processedMessage : message;
  
  // Track speaking status with events
  utterance.onstart = () => {
    document.dispatchEvent(
      new CustomEvent('voice-speaking-started', { detail: { message: originalMessage } })
    );
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  // Add a slight pause to make speech more natural
  if (processedMessage.includes('.') || processedMessage.includes('!') || processedMessage.includes('?')) {
    utterance.text = processedMessage
      .replace(/\./g, '.<break time="0.5s"/>')
      .replace(/\!/g, '!<break time="0.5s"/>')
      .replace(/\?/g, '?<break time="0.5s"/>');
  }
  
  // Speak the message
  window.speechSynthesis.speak(utterance);
};

// Get greeting based on user state with a happier, more energetic tone
export function getGreeting(userName?: string, mood?: string, isFirstTimeUser: boolean = false, language: string = 'en-IN'): string {
  const hour = new Date().getHours();
  let timeGreeting;
  
  if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 17) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }
  
  // Different greeting for first time users - more energetic
  if (isFirstTimeUser) {
    const greeting = `${timeGreeting} and a warm welcome to prep-ezer! I'm your friendly AI study assistant here to help you prepare for your exams more effectively. Let me show you around at your pace!`;
    return language === 'hi-IN' ? translateToHindi(greeting) : greeting;
  }
  
  // For returning users - happier tone
  const name = userName ? `, ${userName}` : '';
  let moodResponse = '';
  
  if (mood) {
    switch(mood.toLowerCase()) {
      case 'motivated':
        moodResponse = " I'm thrilled to see you're feeling motivated today! Let's channel that amazing energy into productive study time!";
        break;
      case 'anxious':
        moodResponse = " I notice you're feeling anxious. Don't worry, we'll tackle things one step at a time and make fantastic progress together!";
        break;
      case 'tired':
        moodResponse = " I see you're feeling tired. We can focus on lighter topics or take plenty of breaks today to keep you refreshed!";
        break;
      case 'focused':
        moodResponse = " You're feeling focused today. That's wonderful! This is the perfect opportunity to tackle those challenging concepts!";
        break;
    }
  }
  
  const greeting = `${timeGreeting}${name}! Welcome back to prep-ezer${moodResponse} How can I assist you with your studies today?`;
  return language === 'hi-IN' ? translateToHindi(greeting) : greeting;
}

// Get announcement for reminders with a more pleasant, energetic tone
export function getReminderAnnouncement(pendingTasks: Array<{title: string, due?: string}> = [], language: string = 'en-IN'): string {
  let announcement;
  
  if (!pendingTasks || pendingTasks.length === 0) {
    announcement = "You don't have any pending tasks right now. Excellent job staying on top of your studies!";
    return language === 'hi-IN' ? translateToHindi(announcement) : announcement;
  }
  
  const taskCount = pendingTasks.length;
  announcement = `You have ${taskCount} ${taskCount === 1 ? 'exciting task' : 'exciting tasks'} waiting for you! `;
  
  if (taskCount <= 3) {
    // List all tasks if there are 3 or fewer
    announcement += "These include: ";
    pendingTasks.forEach((task, index) => {
      if (index > 0) {
        announcement += index === taskCount - 1 ? " and " : ", ";
      }
      announcement += task.title;
      if (task.due) {
        announcement += ` due ${task.due}`;
      }
    });
  } else {
    // Just mention the most important ones if there are many
    announcement += "The top priorities are: ";
    for (let i = 0; i < 2; i++) {
      if (i > 0) announcement += " and ";
      announcement += pendingTasks[i].title;
      if (pendingTasks[i].due) {
        announcement += ` due ${pendingTasks[i].due}`;
      }
    }
    announcement += `. Plus ${taskCount - 2} more exciting challenges to tackle when you're ready!`;
  }
  
  return language === 'hi-IN' ? translateToHindi(announcement) : announcement;
}

// Get motivational message with a happier, more energetic tone
export function getMotivationalMessage(examGoal?: string, language: string = 'en-IN'): string {
  const messages = [
    "Remember, consistent progress is the key to success. You're doing amazing work!",
    "Every minute you spend studying brings you one step closer to your dreams. Keep that fantastic momentum going!",
    "The difference between ordinary and extraordinary is that little extra effort. And wow, your dedication is truly inspiring!",
    "Success is built through small efforts repeated day after day. Your commitment is absolutely incredible!",
    "Your hard work today is preparing you for a brilliant tomorrow. I'm here cheering you on every step of the way!"
  ];
  
  // Exam specific messages with more energy
  if (examGoal) {
    const examName = examGoal.toUpperCase();
    const examSpecificMessages = [
      `Look at how far you've come with your ${examName} preparation! Every concept you master is a wonderful victory!`,
      `Remember why you started preparing for ${examName}. Your amazing determination will carry you straight to success!`,
      `Your dedication to ${examName} is opening doors to fantastic opportunities for your future!`
    ];
    
    // Add exam specific messages to the general pool
    messages.push(...examSpecificMessages);
  }
  
  // Return a random message, translated if needed
  const message = messages[Math.floor(Math.random() * messages.length)];
  return language === 'hi-IN' ? translateToHindi(message) : message;
}

// Process user speech command - keep functionality but improve responses to be calmer and more pleasant
export function processUserQuery(
  query: string,
  navigate: Function,
  options: {
    startTest?: Function,
    switchLanguage?: Function,
    showFlashcards?: Function,
    examGoal?: string,
    currentLanguage?: string
  } = {}
): string {
  const lowerQuery = query.toLowerCase();
  const currentLanguage = options.currentLanguage || 'en-IN';
  const isHindi = currentLanguage === 'hi-IN';
  
  // Handle mute/unmute commands
  if (
    lowerQuery.includes('mute') || 
    lowerQuery.includes('be quiet') || 
    lowerQuery.includes('stop talking') ||
    lowerQuery.includes('चुप') ||
    lowerQuery.includes('शांत')
  ) {
    return "MUTE_COMMAND";
  }
  
  if (
    lowerQuery.includes('unmute') || 
    lowerQuery.includes('start talking') || 
    lowerQuery.includes('speak again') ||
    lowerQuery.includes('बात करो') ||
    lowerQuery.includes('शुरू')
  ) {
    return "UNMUTE_COMMAND";
  }
  
  // Handle language switch
  if (lowerQuery.includes('speak hindi') || lowerQuery.includes('switch to hindi') || lowerQuery.includes('hindi')) {
    if (options.switchLanguage) {
      options.switchLanguage('hi-IN');
    }
    return "अब मैं हिंदी में बात करूंगा। कैसे मदद कर सकता हूँ?"; // "I'll now speak in Hindi. How can I help you?"
  }
  
  if (
    lowerQuery.includes('speak english') || 
    lowerQuery.includes('switch to english') || 
    lowerQuery.includes('english') ||
    lowerQuery.includes('अंग्रेज़ी')
  ) {
    if (options.switchLanguage) {
      options.switchLanguage('en-IN');
    }
    return "I'll now speak in English. How can I help you?";
  }
  
  // Navigation commands
  if (
    lowerQuery.includes('go to dashboard') || 
    lowerQuery.includes('show dashboard') ||
    lowerQuery.includes('डैशबोर्ड')
  ) {
    navigate('/dashboard/student');
    return isHindi ? "डैशबोर्ड पर जा रहा हूँ।" : "Navigating to the dashboard.";
  }
  
  if (
    lowerQuery.includes('go to study plan') || 
    lowerQuery.includes('show study plan') || 
    lowerQuery.includes('my study plan') ||
    lowerQuery.includes('अध्ययन योजना')
  ) {
    navigate('/dashboard/student/study-plan');
    return isHindi ? "आपकी अध्ययन योजना खोल रहा हूँ।" : "Opening your study plan.";
  }
  
  // Specific features
  if (
    lowerQuery.includes('start test') || 
    lowerQuery.includes('take test') || 
    lowerQuery.includes('practice test') ||
    lowerQuery.includes('परीक्षण शुरू')
  ) {
    if (options.startTest) {
      options.startTest();
      return isHindi ? "आपके लिए अभ्यास परीक्षा शुरू कर रहा हूं।" : "Starting a practice test for you.";
    } else {
      navigate('/dashboard/student/practice-exam');
      return isHindi ? "अभ्यास परीक्षा अनुभाग पर जा रहा हूँ।" : "Navigating to the practice test section.";
    }
  }
  
  if (
    lowerQuery.includes('flashcard') || 
    lowerQuery.includes('flash card') ||
    lowerQuery.includes('फ्लैशकार्ड')
  ) {
    if (options.showFlashcards) {
      options.showFlashcards();
      return isHindi ? "आपके फ्लैशकार्ड खोल रहा हूँ।" : "Opening your flashcards.";
    } else {
      navigate('/dashboard/student/flashcards');
      return isHindi ? "फ्लैशकार्ड अनुभाग पर जा रहा हूँ।" : "Navigating to the flashcards section.";
    }
  }
  
  // Information requests
  if (
    lowerQuery.includes('who are you') || 
    lowerQuery.includes('what are you') || 
    lowerQuery.includes('your name') ||
    lowerQuery.includes('आप कौन हैं') ||
    lowerQuery.includes('तुम्हारा नाम')
  ) {
    return isHindi 
      ? "मैं प्रेप-एज़र वॉइस असिस्टेंट हूं। मैं आपकी परीक्षा की तैयारी में मदद करने और प्लेटफॉर्म के माध्यम से नेविगेट करने के लिए यहां हूं। आप और क्या जानना चाहेंगे?"
      : "I'm the PREP-EZER voice assistant. I'm here to help you with your exam preparation and navigate through the platform. What would you like to learn more about?";
  }
  
  if (
    lowerQuery.includes('tell me about') || 
    lowerQuery.includes('what is prepzr') || 
    lowerQuery.includes('about prepzr') ||
    lowerQuery.includes('प्रेप्ज़र के बारे में')
  ) {
    return isHindi
      ? "प्रेप-एज़र एक भावनात्मक रूप से बुद्धिमान अध्ययन साथी है जिसे नीट और आईआईटी-जेईई जैसी प्रतिस्पर्धी परीक्षाओं को क्रैक करने के लिए छात्रों की मदद करने के लिए डिज़ाइन किया गया है। हम आपकी अद्वितीय सीखने की शैली और भावनात्मक स्थिति के अनुरूप व्यक्तिगत अध्ययन योजनाएँ, अनुकूली सीखने और एआई-संचालित सहायता प्रदान करते हैं।"
      : "PREP-EZER is an emotionally intelligent study partner designed to help students crack competitive exams like NEET and IIT-JEE. We offer personalized study plans, adaptive learning, and AI-powered assistance tailored to your unique learning style and emotional state.";
  }
  
  // Fallback response
  return isHindi
    ? "मैं आज आपके अध्ययन में कैसे मदद कर सकता हूं? आप अपनी अध्ययन योजना, अभ्यास परीक्षणों, या प्रेप-एज़र के विशिष्ट विशेषताओं का उपयोग करने के बारे में मुझसे पूछ सकते हैं।"
    : "How can I help you with your studies today? You can ask me about your study plan, practice tests, or how to use specific features of PREP-EZER.";
}
