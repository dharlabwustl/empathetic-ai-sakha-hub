
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage } from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  
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
  
  // Process a text query and respond with voice
  const processQuery = useCallback((query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Basic intent detection
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return "Namaste! I'm here to assist you with your studies. How may I help you today?";
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return "I am your AI voice assistant with a pleasant Indian accent. I'm here to help you with your studies, provide reminders, and motivate you to achieve your academic goals.";
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm functioning perfectly well, thank you! Ready to assist you with your academic journey.";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can announce your daily tasks, read important information, motivate you when you're feeling down, and answer basic questions about your studies. Just ask away!";
    }
    
    if (lowerQuery.includes("what is prepzr") || lowerQuery.includes("about prepzr") || lowerQuery.includes("tell me about prepzr")) {
      return "Prep-Z-R is your complete preparation platform designed to help students excel in competitive exams like JEE, NEET, and other entrance tests. With AI-powered learning tools, personalized study plans, and interactive content, Prep-Z-R makes your academic journey smoother and more effective.";
    }
    
    if (lowerQuery.includes("how to start") || lowerQuery.includes("getting started") || lowerQuery.includes("begin") || lowerQuery.includes("first time")) {
      return "Welcome to Prep-Z-R! To get started, first take a moment to set your study goals in the profile section. Then explore the academic advisor to create a personalized study plan. Use the AI tutor whenever you have questions about concepts. Don't forget to track your mood so we can customize your experience. Would you like me to guide you to any specific feature?";
    }
    
    if (lowerQuery.includes("time") || lowerQuery.includes("what time")) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}`;
    }
    
    if (lowerQuery.includes("date") || lowerQuery.includes("what day")) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "Education is the most powerful weapon which you can use to change the world.",
        "The beautiful thing about learning is that no one can take it away from you.",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        "Believe you can and you're halfway there.",
        "Your education is a dress rehearsal for a life that is yours to lead."
      ];
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    if (lowerQuery.includes("joke") || lowerQuery.includes("funny")) {
      const jokes = [
        "Why did the student eat his homework? Because the teacher told him it was a piece of cake!",
        "What do you call a boomerang that doesn't come back? A stick!",
        "Why don't scientists trust atoms? Because they make up everything!",
        "What's the best thing about Switzerland? I don't know, but their flag is a big plus!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised!"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Default response
    return "I'm not sure how to help with that specific query. You can ask me about your schedule, for motivation, or for help with your studies.";
  }, []);
  
  // Get welcome message for first time or returning users
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    if (isFirstTime) {
      return `Namaste and a warm welcome to Prep-Z-R, ${userName}! I am your personal voice assistant with a friendly Indian accent. Prep-Z-R is your complete exam preparation platform that will help you ace competitive exams like JEE, NEET, and more. To get started, I recommend exploring the Academic Advisor to create your personalized study plan, checking out the AI Tutor for any doubts, and setting up your profile with your goals. Would you like me to guide you through any specific feature?`;
    } else {
      // For returning users
      const welcomeBack = `Welcome back to Prep-Z-R, ${userName}! This is your ${getOrdinal(loginCount)} login.`;
      
      // Suggestions based on login count
      if (loginCount < 5) {
        return `${welcomeBack} I suggest exploring the Academic Advisor to set up or update your study plan today. Remember to use the AI Tutor whenever you have questions about concepts.`;
      } else if (loginCount < 10) {
        return `${welcomeBack} You might want to check your progress in the dashboard and continue with today's scheduled tasks. Don't forget to take short breaks between study sessions!`;
      } else {
        return `${welcomeBack} It's great to see your consistency! Your scheduled tasks for today are ready. Would you like me to remind you of your current focus areas?`;
      }
    }
  }, []);
  
  // Helper function to get ordinal suffix
  const getOrdinal = (n: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };
  
  // Speak with current settings
  const speak = useCallback((message: string, force: boolean = false) => {
    if (!settings.enabled && !force) return;
    
    // If we want to process a query instead of just announcing
    if (force && message.trim().endsWith("?")) {
      const response = processQuery(message);
      speakMessage(response, true);
      return;
    }
    
    speakMessage(message, force);
  }, [settings.enabled, processQuery]);
  
  // Test the current voice settings with a pleasant, energetic Indian voice message
  const testVoice = useCallback(() => {
    speak("Namaste! I'm your friendly study companion with a pleasant Indian female voice. I'm here to make your learning journey with Prep-Z-R joyful and successful!", true);
  }, [speak]);
  
  // Stop any ongoing speech
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);
  
  return {
    settings,
    updateSettings,
    speak,
    testVoice,
    stopSpeaking,
    isSpeaking,
    processQuery,
    getWelcomeMessage,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};
