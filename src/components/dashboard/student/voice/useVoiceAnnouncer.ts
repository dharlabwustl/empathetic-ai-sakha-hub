
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage, getGreeting } from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';
import { MoodType } from '@/types/user/base';
import { getIdleTimeResponse, getFirstTimeUserGuidance } from './messageGenerators';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  const [examGoal, setExamGoal] = useState<string>("");
  
  // Try to get the user's exam goal from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.goals && parsedData.goals.length) {
          setExamGoal(parsedData.goals[0].title || "");
        } else if (parsedData.examGoal) {
          setExamGoal(parsedData.examGoal);
        }
      }
      
      // Fallback to check userProfile in localStorage
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile && !examGoal) {
        const parsedProfile = JSON.parse(userProfile);
        if (parsedProfile.goals && parsedProfile.goals.length) {
          setExamGoal(parsedProfile.goals[0].title || "");
        }
      }
    } catch (e) {
      console.error("Error retrieving exam goal:", e);
    }
  }, []);
  
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
        // Use the exam-specific idle time response
        const idlePrompt = getIdleTimeResponse(examGoal);
        speakMessage(idlePrompt);
        
        // Reset the timer after speaking
        setLastInteraction(new Date());
      }
    }, 300000); // Check every 5 minutes
    
    return () => clearInterval(inactivityTimer);
  }, [settings.enabled, lastInteraction, examGoal]);

  // Update last interaction time when user interacts with the app
  const updateInteractionTime = useCallback(() => {
    setLastInteraction(new Date());
  }, []);
  
  // Process a text query and respond with voice - with more focused exam responses
  const processQuery = useCallback((query: string): string => {
    // Mark that user interacted
    updateInteractionTime();
    
    const lowerQuery = query.toLowerCase();
    
    // Basic intent detection with exam-focused responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return `Namaste! How can I help with your ${examGoal || "exam"} preparation today?`;
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return `I'm your AI study assistant for ${examGoal || "competitive exams"}. I can help with study planning, reminders, and motivation.`;
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm here and ready to assist with your studies. What do you need help with today?";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return `I can announce daily tasks, help manage your ${examGoal || "exam"} preparation schedule, provide study tips, and motivate you to stay consistent.`;
    }
    
    if (lowerQuery.includes("what is prepzr") || lowerQuery.includes("about prepzr")) {
      return `PREPZR is your AI-powered study companion for ${examGoal || "competitive exams"} like JEE, NEET, and others, providing personalized study plans and interactive learning tools.`;
    }
    
    if (lowerQuery.includes("how to start") || lowerQuery.includes("getting started")) {
      return getFirstTimeUserGuidance(examGoal);
    }
    
    if (lowerQuery.includes("time") || lowerQuery.includes("what time")) {
      const now = new Date();
      return `It's ${now.toLocaleTimeString()}. Remember to follow your study schedule for today.`;
    }
    
    if (lowerQuery.includes("date") || lowerQuery.includes("what day")) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}. ${examGoal ? `Every day brings you closer to your ${examGoal} exam.` : "Stay consistent with your studies."}`;
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        `Success in ${examGoal || "exams"} comes from daily preparation, not last-minute efforts.`,
        `Every hour of focused study brings you closer to your ${examGoal || "exam"} success.`,
        `What you learn for ${examGoal || "your exam"} today will serve you tomorrow and beyond.`,
        `Small daily improvements lead to outstanding ${examGoal || "exam"} results.`,
        `The best preparation for ${examGoal || "your exam"} is consistent, focused study.`,
        `Your dedication to ${examGoal || "exam preparation"} today determines your rank tomorrow.`
      ];
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    if (lowerQuery.includes("joke") || lowerQuery.includes("funny")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What did the calculator say to the student? You can count on me.",
        "Why was the math book sad? Because it had too many problems.",
        "What's a physicist's favorite food? Fission chips!",
        "Why did the biology student break up with the chemistry student? There was no reaction."
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    if (lowerQuery.includes("voice settings") || lowerQuery.includes("change voice")) {
      return "To change voice settings, go to Profile and select the Voice Control tab. You can adjust volume, speed, and voice preferences there.";
    }

    if (lowerQuery.includes("next task") || lowerQuery.includes("todo")) {
      return `Your next scheduled task is related to ${examGoal || "your study plan"}. Would you like me to show you the details?`;
    }

    if (lowerQuery.includes("study plan") || lowerQuery.includes("calendar")) {
      return `Your study plan for today includes topics from your ${examGoal || "exam syllabus"}. Would you like to view your schedule?`;
    }

    if (lowerQuery.includes("exam tips") || lowerQuery.includes("study tips")) {
      const examTips = [
        `For ${examGoal || "competitive exams"}, solve previous years' papers to understand the pattern.`,
        `Create formula sheets for quick revision before your ${examGoal || "exam"}.`,
        `Time management is crucial for ${examGoal || "exams"}. Practice with a timer regularly.`,
        `For ${examGoal || "competitive exams"}, focus on accuracy first, then speed.`,
        `Revise high-yield topics for ${examGoal || "your exam"} multiple times.`
      ];
      return examTips[Math.floor(Math.random() * examTips.length)];
    }
    
    // Default response
    return `I'm not sure about that. You can ask me about your ${examGoal || "exam"} preparation, study schedule, or request motivation.`;
  }, [updateInteractionTime, examGoal]);
  
  // Get welcome message for first time or returning users - with more exam focus
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    // Update interaction time whenever welcome message is shown
    updateInteractionTime();

    if (isFirstTime) {
      return `Welcome to PREPZR, ${userName}! I'm your study assistant for ${examGoal || "competitive exam"} preparation. Let's start by creating your personalized study plan.`;
    } 
    
    // For returning users - more focused messages
    if (loginCount < 5) {
      const messages = [
        `Welcome back ${userName}! Ready to continue your ${examGoal || "exam"} preparation?`,
        `Hello ${userName}! Let's make progress on your ${examGoal || "study"} goals today.`,
        `Good to see you ${userName}! Your ${examGoal || "study"} schedule is ready.`,
        `Welcome back! Let's focus on your ${examGoal || "exam"} weak areas today.`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    } else {
      const messages = [
        `Welcome back ${userName}! Your consistency in ${examGoal || "exam"} preparation will pay off.`,
        `Hello ${userName}! You're making good progress with your ${examGoal || "studies"}.`,
        `Good to see you again ${userName}! Today's ${examGoal || "study"} tasks are ready.`,
        `Welcome back! Your regular practice is key to ${examGoal || "exam"} success.`
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  }, [updateInteractionTime, examGoal]);
  
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
  
  // Test the current voice settings
  const testVoice = useCallback(() => {
    speak(`This is a test of your voice assistant for ${examGoal || "exam"} preparation. Is this voice and volume level suitable for you?`, true);
    updateInteractionTime();
  }, [speak, updateInteractionTime, examGoal]);
  
  // Stop any ongoing speech
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    updateInteractionTime();
  }, [updateInteractionTime]);

  // Update the exam goal
  const updateExamGoal = useCallback((goal: string) => {
    setExamGoal(goal);
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
    getGreeting,
    updateInteractionTime,
    examGoal,
    updateExamGoal,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};
