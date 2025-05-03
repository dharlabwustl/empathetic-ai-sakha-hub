
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage, getGreeting } from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';
import { MoodType } from '@/types/user/base';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  
  // Update settings locally and in storage
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(current => {
      const updated = { ...current, ...newSettings };
      saveVoiceSettings(updated);
      return updated;
    });
  }, []);
  
  // Initialize voices when component mounts
  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`).join(', '));
    };
    
    // Try loading voices immediately
    loadVoices();
    
    // Some browsers need this event to get voices
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Set default to loud volume if not already set
    setSettings(current => {
      if (current.volume < 0.8) {
        const updated = { ...current, volume: 0.9 };
        saveVoiceSettings(updated);
        return updated;
      }
      return current;
    });
    
    // Track speech status
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    
    window.speechSynthesis.addEventListener('start', handleSpeechStart);
    window.speechSynthesis.addEventListener('end', handleSpeechEnd);
    window.speechSynthesis.addEventListener('pause', handleSpeechEnd);
    window.speechSynthesis.addEventListener('resume', handleSpeechStart);
    
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.removeEventListener('start', handleSpeechStart);
      window.speechSynthesis.removeEventListener('end', handleSpeechEnd);
      window.speechSynthesis.removeEventListener('pause', handleSpeechEnd);
      window.speechSynthesis.removeEventListener('resume', handleSpeechStart);
    };
  }, []);

  // Check for period of inactivity and provide helpful prompts
  useEffect(() => {
    // Only proceed if voice is enabled
    if (!settings.enabled) return;

    const inactivityTimer = setInterval(() => {
      const now = new Date();
      const minutesSinceLastActivity = (now.getTime() - lastInteraction.getTime()) / (1000 * 60);

      // After 5 minutes of inactivity, offer assistance
      if (minutesSinceLastActivity > 5) {
        const inactivityPrompts = [
          "It's been a while since your last activity. Is there anything I can help you with?",
          "Do you need any help finding study materials or planning your sessions?",
          "Feel free to ask me any questions about your study plan or upcoming tasks.",
          "If you need assistance navigating the platform, you can click the voice icon at the top of the screen.",
          "Would you like to review your upcoming tasks or check your progress on any subjects?"
        ];
        
        // Randomly select a prompt
        const randomPrompt = inactivityPrompts[Math.floor(Math.random() * inactivityPrompts.length)];
        speakMessage(randomPrompt);
        
        // Reset the timer after speaking
        setLastInteraction(new Date());
      }
    }, 300000); // Check every 5 minutes
    
    return () => clearInterval(inactivityTimer);
  }, [settings.enabled, lastInteraction]);

  // Update last interaction time when user interacts with the app
  const updateInteractionTime = useCallback(() => {
    setLastInteraction(new Date());
  }, []);
  
  // Process a text query and respond with voice - with more enthusiastic responses
  const processQuery = useCallback((query: string): string => {
    // Mark that user interacted
    updateInteractionTime();
    
    const lowerQuery = query.toLowerCase();
    
    // Basic intent detection with more enthusiastic responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return "Namaste! I'm so excited to be your study assistant today! How may I help you with your learning journey?";
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return "I am your friendly AI voice assistant with a pleasant Indian accent! I'm here to help you with your studies, provide cheerful reminders, and motivate you to achieve your academic goals with prep-eez-er!";
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm feeling absolutely wonderful today, thank you for asking! I'm ready and excited to assist you with your academic journey!";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I'd be delighted to help you! I can announce your daily tasks with enthusiasm, read important information, motivate you when you're feeling down, and answer questions about your studies. Just ask me anything!";
    }
    
    if (lowerQuery.includes("what is prepzr") || lowerQuery.includes("about prepzr") || lowerQuery.includes("tell me about prepzr")) {
      return "prep-eez-er is your amazing preparation platform designed to help students excel in competitive exams like JEE, NEET, and other entrance tests! With AI-powered learning tools, personalized study plans, and interactive content, prep-eez-er makes your academic journey smoother and more effective!";
    }
    
    if (lowerQuery.includes("how to start") || lowerQuery.includes("getting started") || lowerQuery.includes("begin") || lowerQuery.includes("first time")) {
      return "Welcome to prep-eez-er! I'm so excited you're here! To get started, first take a moment to set your study goals in the profile section. Then explore the academic advisor to create a personalized study plan. Use the AI tutor whenever you have questions about concepts. Don't forget to track your mood so we can customize your experience. Would you like me to guide you to any specific feature?";
    }
    
    if (lowerQuery.includes("time") || lowerQuery.includes("what time")) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}! Hope you're having a productive day!`;
    }
    
    if (lowerQuery.includes("date") || lowerQuery.includes("what day")) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}! A perfect day for learning something new!`;
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        "Success is not final, failure is not fatal: it is the courage to continue that counts! You've got this!",
        "Education is the most powerful weapon which you can use to change the world! And you're doing amazingly well!",
        "The beautiful thing about learning is that no one can take it away from you! Keep shining bright!",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go! Your journey is incredible!",
        "Believe you can and you're halfway there! I know you'll achieve great things today!",
        "Your education is a dress rehearsal for a life that is yours to lead! And you're performing brilliantly!"
      ];
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    if (lowerQuery.includes("joke") || lowerQuery.includes("funny")) {
      const jokes = [
        "Why did the student eat his homework? Because the teacher told him it was a piece of cake! Haha!",
        "What do you call a boomerang that doesn't come back? A stick! That always makes me laugh!",
        "Why don't scientists trust atoms? Because they make up everything! Isn't that clever?",
        "What's the best thing about Switzerland? I don't know, but their flag is a big plus! Hehe!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised! Wasn't that funny?"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    if (lowerQuery.includes("voice settings") || lowerQuery.includes("change voice")) {
      return "To change voice settings, go to Profile and select the Voice Control tab. There you can adjust volume, speed, and other voice preferences. I'm happy to help you customize my voice to your liking!";
    }

    if (lowerQuery.includes("next task") || lowerQuery.includes("todo")) {
      return "Your next scheduled task is a Physics revision session at 4 PM today! I'm excited for you to master those concepts! Would you like me to remind you when it's time?";
    }

    if (lowerQuery.includes("study plan") || lowerQuery.includes("calendar")) {
      return "Your study plan for today includes 2 hours of Physics focused on kinematics, 1 hour of Chemistry covering chemical bonding, and a 30-minute quiz on Biology. Would you like me to help you get started with the first subject?";
    }
    
    // Default response
    return "I'm not sure how to help with that specific query, but I'm eager to assist you! You can ask me about your schedule, for motivation, or for help with your studies!";
  }, [updateInteractionTime]);
  
  // Get welcome message for first time or returning users - with more varied greetings
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    // Update interaction time whenever welcome message is shown
    updateInteractionTime();

    if (isFirstTime) {
      return `Namaste ${userName}! Welcome to prep-eez-er! I'm your personal voice assistant. To get started, I recommend creating your personalized study plan in the Academic Advisor section. You can always ask me for help by clicking the voice icon at the top of the screen. Would you like me to explain any specific feature?`;
    } 
    
    // For returning users - more varied messages based on login count
    if (loginCount < 5) {
      const messages = [
        `Welcome back ${userName}! To make the most of prep-eez-er today, try exploring the Academic Advisor to set up your study plan.`,
        `Hello again ${userName}! Have you checked your notifications today? There might be important updates waiting for you.`,
        `Great to see you ${userName}! Feel free to use the voice assistant anytime by clicking the icon at the top of the screen.`,
        `Welcome back to prep-eez-er! Remember you can adjust your study preferences in the profile section for a more personalized experience.`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else if (loginCount < 10) {
      const messages = [
        `Welcome back ${userName}! Your consistency is impressive. Today's tasks are ready in your dashboard.`,
        `Hello ${userName}! Did you know you can track your progress in the analytics section? It's a great way to stay motivated!`,
        `Good to see you again ${userName}! Remember to take short breaks between study sessions for maximum effectiveness.`,
        `Welcome back! You've been making great progress. Consider trying the Feel Good Corner when you need a study break.`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        `Welcome back ${userName}! You're doing great with your consistent study habits!`,
        `Hello again ${userName}! Your dedication to learning is truly admirable.`,
        `Great to see you ${userName}! Your scheduled tasks for today are ready and waiting.`,
        `Welcome back! Have you checked your exam readiness score lately? You might be surprised by your progress!`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  }, [updateInteractionTime]);
  
  // Helper function to get ordinal suffix
  const getOrdinal = (n: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };
  
  // Speak with current settings
  const speak = useCallback((message: string, force: boolean = false) => {
    if (!settings.enabled && !force) return;
    
    // Update interaction time whenever something is spoken
    updateInteractionTime();
    
    // If we want to process a query instead of just announcing
    if (force && message.trim().endsWith("?")) {
      const response = processQuery(message);
      speakMessage(response, true);
      return;
    }
    
    speakMessage(message, force);
  }, [settings.enabled, processQuery, updateInteractionTime]);
  
  // Test the current voice settings with a pleasant, energetic Indian voice message
  const testVoice = useCallback(() => {
    speak("Namaste! I'm your friendly study companion with a pleasant Indian female voice! I'm absolutely delighted to make your learning journey with prep-eez-er joyful and successful!", true);
    updateInteractionTime();
  }, [speak, updateInteractionTime]);
  
  // Stop any ongoing speech
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    updateInteractionTime();
  }, [updateInteractionTime]);
  
  return {
    settings,
    updateSettings,
    speak,
    testVoice,
    stopSpeaking,
    isSpeaking,
    processQuery,
    getWelcomeMessage,
    getGreeting,
    updateInteractionTime,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};
