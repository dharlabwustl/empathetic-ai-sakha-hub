
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage } from './voiceUtils';
import { getContextMessage } from './messageGenerators';
import type { VoiceSettings } from './voiceUtils';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  const [hasShownWelcome, setHasShownWelcome] = useState<boolean>(false);
  
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

  // Listen for user inactivity and provide helpful prompts
  useEffect(() => {
    if (!settings.enabled || !settings.inactivityPrompts) return;
    
    const handleUserActivity = () => {
      setLastInteractionTime(Date.now());
    };
    
    // Track user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    
    // Check for inactivity every 10 minutes
    const inactivityTimer = setInterval(() => {
      const now = Date.now();
      const inactiveTimeMinutes = (now - lastInteractionTime) / (1000 * 60);
      
      // If inactive for more than 10 minutes (and not currently speaking)
      if (inactiveTimeMinutes > 10 && !isSpeaking) {
        const message = getContextMessage('silence_break');
        speakMessage(message);
        setLastInteractionTime(now); // Reset timer
      }
    }, 600000); // 10 minutes
    
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      clearInterval(inactivityTimer);
    };
  }, [settings.enabled, settings.inactivityPrompts, lastInteractionTime, isSpeaking]);
  
  // Process a text query and respond with voice
  const processQuery = useCallback((query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Basic intent detection with helpful responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return "Namaste! How can I assist with your studies today?";
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return "I am your friendly AI voice assistant with a pleasant Indian accent! I'm here to help you with your studies, provide timely reminders, and motivate you throughout your academic journey.";
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm ready to assist you! How is your study going? Is there anything specific you need help with today?";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can announce your daily tasks, read important information, motivate you when you're feeling down, and answer questions about your studies. Look for the voice icon at the top of the screen anytime you need assistance.";
    }
    
    if (lowerQuery.includes("what is prepzr") || lowerQuery.includes("about prepzr") || lowerQuery.includes("tell me about prepzr")) {
      return "PrepEezer is your comprehensive preparation platform designed for competitive exams like JEE, NEET, and other entrance tests. It offers AI-powered learning tools, personalized study plans, and interactive content to make your academic journey more effective.";
    }
    
    if (lowerQuery.includes("how to start") || lowerQuery.includes("getting started") || lowerQuery.includes("begin") || lowerQuery.includes("first time")) {
      return getContextMessage('first_login');
    }
    
    if (lowerQuery.includes("time") || lowerQuery.includes("what time")) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}. Is there a specific time you're planning to study until?`;
    }
    
    if (lowerQuery.includes("date") || lowerQuery.includes("what day")) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Do you have any important deadlines coming up?`;
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        "Success is not final, failure is not fatal: it is the courage to continue that counts! Keep going!",
        "Education is the most powerful weapon which you can use to change the world! Use it wisely.",
        "The beautiful thing about learning is that no one can take it away from you! Every minute of study adds to your knowledge.",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go!",
        "Believe you can and you're halfway there! Keep pushing forward.",
        "Your education is a dress rehearsal for a life that is yours to lead!"
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

    if (lowerQuery.includes("voice settings") || lowerQuery.includes("change voice")) {
      return "To change voice settings, go to Profile and select the Voice Control tab. There you can adjust volume, speed, and other voice preferences.";
    }

    if (lowerQuery.includes("next task") || lowerQuery.includes("todo") || lowerQuery.includes("tasks")) {
      return getContextMessage('daily_tasks', { taskCount: '3' });
    }
    
    if (lowerQuery.includes("notifications") || lowerQuery.includes("alerts")) {
      return getContextMessage('notifications', { count: 2 });
    }
    
    if (lowerQuery.includes("feeling tired") || lowerQuery.includes("need a break")) {
      return "Taking regular breaks is important for effective learning. Consider using the Pomodoro technique - 25 minutes of focused study followed by a 5-minute break.";
    }
    
    if (lowerQuery.includes("schedule") || lowerQuery.includes("plan")) {
      return "Your study plan is available in the Academic Advisor section. Would you like me to take you there?";
    }
    
    // Default response
    return "I'm here to help with your studies. You can ask me about your schedule, daily tasks, or for assistance with specific subjects. The voice icon at the top of the screen is always available when you need me.";
  }, []);
  
  // Get welcome message for first time or returning users - with more practical and varied content
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    setHasShownWelcome(true);
    
    if (isFirstTime) {
      return getContextMessage('first_login');
    } else {
      // For returning users - more varied messages based on login count
      if (loginCount % 5 === 0) {
        // Every 5th login
        return `Welcome back, ${userName}! This is your ${getOrdinal(loginCount)} login. Have you been keeping up with your study schedule? I'm here if you need any assistance today.`;
      } else if (loginCount % 3 === 0) {
        // Every 3rd login
        return `Hello ${userName}! I notice you've been consistent with your studies. Is there any specific topic you're struggling with that I could help with today?`;
      } else {
        // Random welcome messages for variety
        const welcomeMessages = [
          `Welcome back ${userName}! How is your day going? What would you like to focus on today?`,
          `Good to see you again, ${userName}! Your scheduled tasks for today are ready. Need any help getting started?`,
          `Hello ${userName}! Remember you can ask me anything by clicking the voice icon at the top. What can I help you with today?`,
          `Welcome ${userName}! How about we review your progress from yesterday before starting today's tasks?`
        ];
        return welcomeMessages[loginCount % welcomeMessages.length];
      }
    }
  }, [hasShownWelcome]);
  
  // Helper function to get ordinal suffix
  const getOrdinal = (n: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };
  
  // Suggest next action based on user data
  const suggestNextAction = useCallback((userData: any) => {
    if (!settings.enabled || !settings.proactiveSuggestions) return;
    
    // Don't make suggestions if we just showed welcome message
    if (hasShownWelcome) return;
    
    let message = "";
    
    // Check incomplete tasks
    if (userData?.incompleteTasks > 3) {
      message = "I notice you have several incomplete tasks. Would you like me to help you prioritize them?";
    } 
    // Check upcoming exams
    else if (userData?.upcomingExam && userData.daysTillExam < 7) {
      message = `You have ${userData.upcomingExam} in ${userData.daysTillExam} days. Would you like to focus on revision for that today?`;
    }
    // Check low progress areas
    else if (userData?.lowProgressSubjects?.length > 0) {
      message = `I notice you've made less progress in ${userData.lowProgressSubjects[0]}. Would you like to focus on that today?`;
    }
    
    if (message) {
      setTimeout(() => {
        speakMessage(message);
      }, 10000); // Delay by 10s to not overlap with welcome
    }
  }, [settings.enabled, settings.proactiveSuggestions, hasShownWelcome]);
  
  // Remind about voice assistant icon
  const remindAboutVoiceIcon = useCallback(() => {
    if (!settings.enabled || !settings.helpTips) return;
    
    // Remind once per session, after some time
    setTimeout(() => {
      if (!hasShownWelcome) {
        speakMessage(getContextMessage('help_tip'));
      }
    }, 300000); // After 5 minutes
  }, [settings.enabled, settings.helpTips, hasShownWelcome]);
  
  // Speak with current settings
  const speak = useCallback((message: string, force: boolean = false) => {
    if (!settings.enabled && !force) return;
    setLastInteractionTime(Date.now()); // Reset inactivity timer
    
    // If we want to process a query instead of just announcing
    if (force && message.trim().endsWith("?")) {
      const response = processQuery(message);
      speakMessage(response, force);
      return;
    }
    
    speakMessage(message, force);
  }, [settings.enabled, processQuery]);
  
  // Test the current voice settings with a pleasant, energetic Indian voice message
  const testVoice = useCallback(() => {
    speak("Namaste! I'm your friendly study companion with a pleasant Indian female voice! I'm here to help you succeed in your studies. Remember, you can always interact with me using the voice icon at the top of the screen.", true);
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
    suggestNextAction,
    remindAboutVoiceIcon
  };
};
