// Define speech synthesis types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    speechSynthesis: SpeechSynthesis;
  }
}

export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  pitch: number;
  rate: number;
  voice: string | null;
  language: string;
  autoGreet: boolean;
  muted: boolean; // New property for mute functionality
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 1.0,
  pitch: 1.0,
  rate: 1.0,
  voice: null, // Will be selected automatically
  language: 'en-US',
  autoGreet: true,
  muted: false // Default to unmuted
};

// Initialize speech synthesis and check browser support
export function initSpeechSynthesis(): boolean {
  try {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return false;
    }
    
    console.log('Speech synthesis initialized with', window.speechSynthesis.getVoices().length, 'voices');
    return true;
  } catch (error) {
    console.error('Error initializing speech synthesis:', error);
    return false;
  }
}

// Get available voices for the current language
export function getVoicesForLanguage(language: string = 'en-US'): SpeechSynthesisVoice[] {
  if (!window.speechSynthesis) return [];
  
  const voices = window.speechSynthesis.getVoices();
  console.log('Available voices:', voices.length);
  
  // Filter by language if specified
  if (language) {
    const langVoices = voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));
    console.log(`Found ${langVoices.length} voices for language ${language}`);
    return langVoices.length > 0 ? langVoices : voices;
  }
  
  return voices;
}

// Get a specific voice by name or the first available one
export function getVoice(voiceName: string | null, language: string = 'en-US'): SpeechSynthesisVoice | null {
  if (!window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    console.warn('No voices available');
    return null;
  }
  
  // If a specific voice is requested, try to find it
  if (voiceName) {
    const voice = voices.find(v => v.name === voiceName);
    if (voice) return voice;
  }
  
  // Fall back to a language-specific voice
  const langVoices = voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));
  if (langVoices.length > 0) {
    // Prefer Google voices if available
    const googleVoice = langVoices.find(v => v.name.includes('Google'));
    return googleVoice || langVoices[0];
  }
  
  // Last resort: return any voice
  return voices[0];
}

// Speak a message with the specified settings
export function speakMessage(message: string, settings: VoiceSettings, force: boolean = false): void {
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Don't speak if voice is disabled, muted, or not forced
  if ((!settings.enabled || settings.muted) && !force) {
    console.log('Voice is disabled or muted, not speaking:', message);
    return;
  }
  
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Apply settings
    utterance.volume = settings.volume;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.lang = settings.language;
    
    // Get the voice to use
    const voice = getVoice(settings.voice, settings.language);
    if (voice) {
      utterance.voice = voice;
      console.log(`Using voice: ${voice.name} (${voice.lang})`);
    }
    
    // Add event listeners for speaking status
    utterance.onstart = () => {
      console.log('Speaking started:', message);
      document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
    };
    
    utterance.onend = () => {
      console.log('Speaking ended:', message);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error('Speaking error:', event);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    // Speak the message
    console.log('Speaking message:', message);
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error speaking message:', error);
  }
}

// Generate a personalized greeting message based on user state - more casual and friendly
export function getGreeting(userName?: string, mood?: string, isFirstTimeUser?: boolean): string {
  const hour = new Date().getHours();
  let timeOfDay = '';
  
  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';
  
  let greeting = '';
  
  if (isFirstTimeUser) {
    greeting = `Hi${userName ? ' ' + userName : ''}! I'm your study assistant. I'll help you stay on track with your goals!`;
  } else {
    greeting = `Hey${userName ? ' ' + userName : ''}! `;
    
    if (mood) {
      switch (mood.toLowerCase()) {
        case 'focused':
          greeting += "I see you're focused today. Let's make the most of your study time!";
          break;
        case 'tired':
          greeting += "You seem tired today. We'll take it easy but still make progress!";
          break;
        case 'confident':
          greeting += "Your confidence is inspiring! Let's tackle some challenging material today.";
          break;
        case 'anxious':
          greeting += "No need to worry! We'll break things down into manageable steps today.";
          break;
        case 'distracted':
          greeting += "Let's find your focus together. I'm here to help you concentrate.";
          break;
        default:
          greeting += `Good ${timeOfDay}! Ready for a productive study session?`;
      }
    } else {
      const greetings = [
        `Good ${timeOfDay}! Let's achieve your study goals today!`,
        "Ready to make progress on your studies?",
        "It's great to see you! Let's focus on your learning today.",
        "I'm here to support your studies! What would you like to work on?"
      ];
      greeting = greetings[Math.floor(Math.random() * greetings.length)];
    }
  }
  
  return greeting;
}

// Get reminder announcement - more concise and friendly
export function getReminderAnnouncement(
  pendingTasks: Array<{title: string, due?: string}> = [], 
  examGoal?: string
): string {
  if (!pendingTasks || pendingTasks.length === 0) {
    return '';
  }

  let announcement = '';
  
  if (pendingTasks.length === 1) {
    const task = pendingTasks[0];
    announcement = `Just a quick reminder about "${task.title}"`;
    if (task.due) {
      announcement += ` coming up on ${task.due}`;
    }
    announcement += '.';
  } else {
    announcement = `You have ${pendingTasks.length} tasks on your list. `;
    announcement += `Including "${pendingTasks[0].title}"`;
  }
  
  if (examGoal) {
    const motivationalPhrases = [
      `You're making great progress toward your ${examGoal}!`,
      `Keep this momentum going with your ${examGoal} preparation!`,
      `I believe in your ability to ace your ${examGoal}!`
    ];
    announcement += ` ${motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}`;
  }
  
  return announcement;
}

// Get motivational messages based on user's mood
export function getMotivationalMessage(mood?: string): string {
  if (!mood) {
    const generalMotivation = [
      "Remember, consistency is key to success!",
      "Small steps each day add up to big results.",
      "You're making progress, even if you don't see it yet.",
      "Your future self will thank you for the work you're putting in today."
    ];
    return generalMotivation[Math.floor(Math.random() * generalMotivation.length)];
  }
  
  switch(mood.toLowerCase()) {
    case 'focused':
      return "You're in the zone! This focused energy will help you achieve great things today.";
    case 'tired':
      return "It's okay to feel tired. Even a small study session counts. Remember to rest when needed.";
    case 'confident':
      return "Your confidence will carry you through challenges. Trust your preparation and knowledge!";
    case 'anxious':
      return "Take a deep breath. Breaking tasks into smaller steps can help manage anxiety. You've got this!";
    case 'distracted':
      return "Try the Pomodoro technique - just 25 minutes of focus, then a short break. It works wonders!";
    default:
      return "Every minute spent studying brings you closer to your goals. Keep going!";
  }
}

// Get voice feedback for flashcard session
export function getFlashcardFeedback(correct: number, total: number): string {
  const percentage = (correct / total) * 100;
  
  if (percentage >= 90) {
    return "Excellent work! You've mastered these cards. Ready to try a more challenging set?";
  } else if (percentage >= 70) {
    return "Good job! You're making solid progress with these flashcards.";
  } else if (percentage >= 50) {
    return "You're doing well. With a bit more practice, you'll master these concepts.";
  } else {
    return "Don't worry about the score. Each review helps build your memory. Let's keep practicing!";
  }
}

// Get voice announcement for exam practice
export function getExamPracticeFeedback(score: number, totalQuestions: number): string {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage >= 90) {
    return "Outstanding result! You're well-prepared for the actual exam.";
  } else if (percentage >= 75) {
    return "Great job! Review the few questions you missed and you'll be in excellent shape.";
  } else if (percentage >= 60) {
    return "Good effort! This practice helps identify the areas where you can improve.";
  } else {
    return "This practice test has highlighted some areas to focus on. Don't get discouraged - it's all part of the learning process!";
  }
}

// Get voice feedback for concept card learning
export function getConceptCardFeedback(conceptName: string): string {
  const responses = [
    `Great job reviewing the ${conceptName} concept! Understanding core principles builds a strong foundation.`,
    `You've just strengthened your knowledge of ${conceptName}. This will help connect ideas across your subject.`,
    `Excellent work studying ${conceptName}! Regular review of key concepts leads to deeper understanding.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Process a user voice query and provide a helpful, supportive response
export function processUserQuery(
  query: string, 
  navigate: any,
  actions?: {
    startTest?: () => void,
    switchLanguage?: (lang: string) => void,
    showFlashcards?: () => void,
    examGoal?: string
  }
): string {
  const lowerQuery = query.toLowerCase();
  
  // Language setting commands - now with Hindi support
  if (lowerQuery.includes('speak in hindi') || lowerQuery.includes('switch to hindi') || 
      lowerQuery.includes('hindi me bolo') || lowerQuery.includes('hindi में बोलो')) {
    if (actions?.switchLanguage) actions.switchLanguage('hi-IN');
    return "अब मैं हिंदी में बात करूंगा।"; // "Now I will speak in Hindi"
  }
  
  if (lowerQuery.includes('speak in english') || lowerQuery.includes('switch to english') || 
      lowerQuery.includes('english me bolo') || lowerQuery.includes('अंग्रेज़ी में बोलो')) {
    if (actions?.switchLanguage) actions.switchLanguage('en-US');
    return "I'll speak in English now.";
  }
  
  // Mute/unmute commands
  if (lowerQuery.includes('mute') || lowerQuery.includes('be quiet') || lowerQuery.includes('stop talking')) {
    return "MUTE_COMMAND";
  }
  
  if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking') || lowerQuery.includes('speak again')) {
    return "UNMUTE_COMMAND";
  }
  
  // Navigation commands
  if (lowerQuery.includes('go to dashboard') || lowerQuery.includes('show dashboard')) {
    navigate('/dashboard/student/overview');
    return "Taking you to your dashboard. Let's see your overall progress!";
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
    navigate('/dashboard/student/flashcards');
    if (actions?.showFlashcards) actions.showFlashcards();
    return "Opening flashcards to help strengthen your memory. These are great for quick review sessions!";
  }
  
  if (lowerQuery.includes('concept') || lowerQuery.includes('concepts')) {
    navigate('/dashboard/student/concepts');
    return "Let's explore key concepts that will help build your understanding.";
  }
  
  if (lowerQuery.includes('practice exam') || lowerQuery.includes('test') || lowerQuery.includes('quiz')) {
    navigate('/dashboard/student/practice-exam');
    if (actions?.startTest) actions.startTest();
    return "Let's practice with an exam to help you prepare for the real thing! This will help identify areas to focus on.";
  }
  
  if (lowerQuery.includes('today') || lowerQuery.includes("today's plan") || lowerQuery.includes('schedule')) {
    navigate('/dashboard/student/today');
    return "Here's your plan for today. I've organized your tasks to maximize your learning efficiency!";
  }
  
  if (lowerQuery.includes('tutor') || lowerQuery.includes('help me') || lowerQuery.includes('explain')) {
    navigate('/dashboard/student/tutor');
    return "I'm here to help with any concepts you're struggling with. What would you like me to explain?";
  }
  
  if (lowerQuery.includes('feel good') || lowerQuery.includes('break') || lowerQuery.includes('relax')) {
    navigate('/dashboard/student/feel-good-corner');
    return "Taking a moment to relax is important! Your mental wellbeing directly impacts your ability to learn effectively.";
  }
  
  // Information queries
  if (lowerQuery.includes('what exam') || lowerQuery.includes('which test') || lowerQuery.includes('goal')) {
    const examGoal = actions?.examGoal || "your upcoming exam";
    return `You're preparing for ${examGoal}. I'm confident that with consistent effort, you'll do great!`;
  }
  
  if (lowerQuery.includes('who are you') || lowerQuery.includes('what are you') || lowerQuery.includes('your name')) {
    return "I'm your AI study assistant, dedicated to helping you achieve academic success through personalized guidance and encouragement.";
  }
  
  if (lowerQuery.includes('motivate') || lowerQuery.includes('inspire') || lowerQuery.includes('encourage')) {
    return getMotivationalMessage();
  }
  
  // Default response for unrecognized queries - more friendly
  const defaultResponses = [
    "I'm here to help you succeed! Would you like to practice with flashcards, review concepts, or take a practice test?",
    "Your success is my priority. Can I help you with flashcards, concept reviews, or setting up a study plan?",
    "I'm your personal study companion! Let me know if you want to review concepts, practice with flashcards, or prepare for an exam."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
