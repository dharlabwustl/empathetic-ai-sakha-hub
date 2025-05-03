
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
  
  // Process a text query and respond with voice - with more enthusiastic responses
  const processQuery = useCallback((query: string): string => {
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
    
    // Default response
    return "I'm not sure how to help with that specific query, but I'm eager to assist you! You can ask me about your schedule, for motivation, or for help with your studies!";
  }, []);
  
  // Get welcome message for first time or returning users - with more enthusiasm
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    if (isFirstTime) {
      return `Namaste and a very warm welcome to prep-eez-er, ${userName}! I am your personal voice assistant with a friendly Indian accent! prep-eez-er is your complete exam preparation platform that will help you ace competitive exams like JEE, NEET, and more! I'm so excited to start this journey with you! To get started, I recommend exploring the Academic Advisor to create your personalized study plan, checking out the AI Tutor for any doubts, and setting up your profile with your goals. Would you like me to guide you through any specific feature?`;
    } else {
      // For returning users - more enthusiastic
      const welcomeBack = `Welcome back to prep-eez-er, ${userName}! This is your ${getOrdinal(loginCount)} login! I'm thrilled to see you again!`;
      
      // Suggestions based on login count
      if (loginCount < 5) {
        return `${welcomeBack} I'd love to suggest exploring the Academic Advisor to set up or update your study plan today! Remember to use the AI Tutor whenever you have questions about concepts!`;
      } else if (loginCount < 10) {
        return `${welcomeBack} You might want to check your progress in the dashboard and continue with today's scheduled tasks. Don't forget to take short breaks between study sessions for maximum effectiveness!`;
      } else {
        return `${welcomeBack} It's great to see your amazing consistency! Your scheduled tasks for today are ready and waiting. Would you like me to remind you of your current focus areas?`;
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
    speak("Namaste! I'm your friendly study companion with a pleasant Indian female voice! I'm absolutely delighted to make your learning journey with prep-eez-er joyful and successful!", true);
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
