
import { MoodType } from '@/types/user/base';

export interface VoiceSettings {
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2
  volume?: number; // 0 to 1
  voice?: SpeechSynthesisVoice | null;
  lang?: string;
  muted?: boolean;
  language?: string;
}

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  rate: 1, 
  pitch: 1,
  volume: 0.8,
  voice: null,
  lang: 'en-US',
  muted: false
};

// Speech synthesis function
export function speakMessage(message: string, settings: VoiceSettings = DEFAULT_VOICE_SETTINGS): void {
  if (settings.muted || typeof window === 'undefined' || !window.speechSynthesis) {
    // If muted or speech synthesis not available, just dispatch the message for UI display
    document.dispatchEvent(
      new CustomEvent('voice-speaking-started', { detail: { message } })
    );
    
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    }, Math.min(message.length * 70, 8000)); // Simulate speech duration based on length
    
    return;
  }
  
  try {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Apply settings
    utterance.rate = settings.rate || 1;
    utterance.pitch = settings.pitch || 1;
    utterance.volume = settings.volume || 1;
    utterance.lang = settings.language || settings.lang || 'en-US';
    
    // Set voice if specified
    if (settings.voice) {
      utterance.voice = settings.voice;
    } else {
      // Try to get a female voice for Indian English if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === (settings.language || 'en-IN') && voice.name.includes('Female')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }
    
    // Dispatch events for the UI to update
    utterance.onstart = () => {
      document.dispatchEvent(
        new CustomEvent('voice-speaking-started', { detail: { message } })
      );
    };
    
    utterance.onend = () => {
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error in speech synthesis:', error);
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
  }
}

// Get contextual greeting based on time of day and user state
export function getGreeting(
  userName: string = 'Student',
  mood?: string,
  isFirstTimeUser: boolean = false
): string {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) timeGreeting = 'Good morning';
  else if (hour < 18) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';
  
  // First time user gets a special welcome
  if (isFirstTimeUser) {
    return `${timeGreeting}, ${userName}! Welcome to Prepzr. I'm your personal study assistant. I can help you navigate, answer questions, and give study tips. Click the microphone to ask me anything!`;
  }
  
  // Returning user with mood
  if (mood) {
    switch (mood.toLowerCase()) {
      case 'motivated':
      case 'focused':
        return `${timeGreeting}, ${userName}! Great to see you're feeling ${mood}. Let's make the most of your energy today!`;
      case 'tired':
        return `${timeGreeting}, ${userName}. I see you're feeling tired. I've adjusted your study plan to focus on lighter topics today.`;
      case 'stressed':
        return `${timeGreeting}, ${userName}. I notice you're feeling stressed. Remember to take regular breaks today. Let me know if you need relaxation tips.`;
      default:
        return `${timeGreeting}, ${userName}! How can I help with your studies today?`;
    }
  }
  
  // Default greeting
  return `${timeGreeting}, ${userName}! How can I help with your studies today?`;
}

// Get reminder announcement based on pending tasks
export function getReminderAnnouncement(pendingTasks: Array<{title: string, due?: string}> = []): string {
  if (pendingTasks.length === 0) {
    return "You're all caught up with your tasks! Would you like me to suggest something to study?";
  }
  
  if (pendingTasks.length === 1) {
    const task = pendingTasks[0];
    const dueText = task.due ? ` due ${task.due}` : '';
    return `You have one pending task: ${task.title}${dueText}. Would you like to work on it now?`;
  }
  
  return `You have ${pendingTasks.length} pending tasks. The next one is: ${pendingTasks[0].title}. Would you like to see your full task list?`;
}

// Get motivational message based on study goal
export function getMotivationalMessage(examGoal?: string): string {
  const messages = [
    "Remember, consistent practice is the key to success!",
    "You're making progress every day. Keep going!",
    "Break large topics into smaller chunks for better understanding.",
    "Don't forget to take regular breaks to maintain focus.",
    "Reviewing concepts regularly helps cement your understanding."
  ];
  
  if (examGoal) {
    messages.push(
      `Your ${examGoal} preparation is on track. Keep up the great work!`,
      `Every study session brings you closer to acing the ${examGoal}.`,
      `Remember your goal: ${examGoal}. Stay focused and you'll succeed!`
    );
  }
  
  // Return random message
  return messages[Math.floor(Math.random() * messages.length)];
}

// Fix pronunciation of technical terms
export function fixPronunciation(text: string): string {
  // Dictionary of terms and their phonetic pronunciations
  const pronunciationMap: Record<string, string> = {
    "pH": "p H",
    "H2O": "H 2 O",
    "CO2": "C O 2",
    "NaCl": "N a C l",
    "NEET": "neet",
    "IIT-JEE": "I I T J E E",
    "DNA": "D N A",
    "RNA": "R N A",
    "ATP": "A T P",
    "CaOH2": "calcium hydroxide",
  };
  
  let correctedText = text;
  
  // Replace technical terms with their phonetic versions
  Object.entries(pronunciationMap).forEach(([term, phonetic]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'g');
    correctedText = correctedText.replace(regex, phonetic);
  });
  
  return correctedText;
}

// Process user query and provide a response
export async function processUserQuery(query: string): Promise<{
  message?: string;
  action?: string;
  destination?: string;
  mood?: MoodType;
}> {
  const lowerQuery = query.toLowerCase();
  
  // Navigation commands
  if (lowerQuery.includes('study plan') || lowerQuery.includes('today\'s plan')) {
    return { 
      message: "Opening your study plan for today", 
      action: 'navigate',
      destination: '/dashboard/student/today'
    };
  }
  
  if (lowerQuery.includes('concept') || lowerQuery.includes('concepts')) {
    return { 
      message: "Taking you to concept cards", 
      action: 'navigate',
      destination: '/dashboard/student/concepts'
    };
  }
  
  if (lowerQuery.includes('formula lab') || lowerQuery.includes('formulas')) {
    return { 
      message: "Opening the formula lab", 
      action: 'navigate',
      destination: '/dashboard/student/concepts/1/formula-lab'
    };
  }
  
  if (lowerQuery.includes('flashcard') || lowerQuery.includes('flashcards')) {
    return { 
      message: "Let's practice with flashcards", 
      action: 'navigate',
      destination: '/dashboard/student/flashcards'
    };
  }
  
  if (lowerQuery.includes('practice exam') || lowerQuery.includes('test')) {
    return { 
      message: "Taking you to practice exams", 
      action: 'navigate',
      destination: '/dashboard/student/practice-exam'
    };
  }
  
  // Mood logging commands
  if (lowerQuery.includes('feeling') || lowerQuery.includes('mood')) {
    // Extract mood
    let detectedMood: MoodType | undefined;
    
    if (lowerQuery.includes('motivated')) detectedMood = MoodType.Motivated;
    else if (lowerQuery.includes('focused')) detectedMood = MoodType.Focused;
    else if (lowerQuery.includes('tired')) detectedMood = MoodType.Tired;
    else if (lowerQuery.includes('stressed')) detectedMood = MoodType.Stressed;
    
    if (detectedMood) {
      return {
        message: `I've logged that you're feeling ${detectedMood}. I'll adjust your recommendations accordingly.`,
        action: 'mood',
        mood: detectedMood
      };
    }
  }
  
  // Questions about study progress
  if (lowerQuery.includes('progress') || lowerQuery.includes('how am i doing')) {
    return {
      message: "You're making good progress! You've completed 65% of your weekly study goals and your practice test scores are improving. Keep up the great work!"
    };
  }
  
  // Questions about study tips
  if (lowerQuery.includes('tip') || lowerQuery.includes('advice') || lowerQuery.includes('help me')) {
    return {
      message: "Here's a study tip: Try the Pomodoro technique - study for 25 minutes, then take a 5-minute break. This helps maintain focus while preventing burnout."
    };
  }
  
  // Questions about what to study
  if (lowerQuery.includes('what should i study') || lowerQuery.includes('recommend') || lowerQuery.includes('suggestion')) {
    return {
      message: "Based on your recent activity, I recommend focusing on Newton's Laws of Motion in Physics. This concept appears frequently in exams and connects to many other topics."
    };
  }
  
  // Hello/greeting response
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return {
      message: "Hello! I'm your Prepzr study assistant. How can I help you today?"
    };
  }
  
  // General help
  return {
    message: "I'm your study assistant. I can help navigate the app, log your mood, give study tips, or answer questions about your progress. What would you like to do?"
  };
}
