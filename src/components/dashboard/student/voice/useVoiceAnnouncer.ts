
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage, getGreeting } from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';
import { MoodType } from '@/types/user/base';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  const [hasSentWelcomeMessage, setHasSentWelcomeMessage] = useState<boolean>(false);
  
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
          "Do you need any help with your studies?",
          "Need assistance finding study materials?",
          "Any questions about your upcoming exams?",
          "Need help navigating the platform?",
          "Would you like to review your progress?"
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
  
  // Process a text query and respond with voice
  const processQuery = useCallback((query: string): string => {
    // Mark that user interacted
    updateInteractionTime();
    
    const lowerQuery = query.toLowerCase();
    
    // Exam-focused responses
    if (lowerQuery.includes("exam") || lowerQuery.includes("test") || lowerQuery.includes("neet") || lowerQuery.includes("jee")) {
      const examResponses = [
        "Focus on practice tests to improve your exam readiness. The more questions you solve, the better your performance will be.",
        "For exam preparation, I recommend creating flashcards for quick concept review before your test.",
        "Studies show that taking mock tests improves actual exam scores by up to 15%. Have you taken your practice test today?",
        "To excel in your exams, review your weak areas identified in previous practice tests."
      ];
      return examResponses[Math.floor(Math.random() * examResponses.length)];
    }
    
    // Flashcard-focused responses
    if (lowerQuery.includes("flashcard") || lowerQuery.includes("remember") || lowerQuery.includes("memorize")) {
      const flashcardResponses = [
        "Flashcards are excellent for quick recall of key concepts before exams. Consider reviewing them daily.",
        "Try the spaced repetition technique with your flashcards - review them at increasing intervals for better retention.",
        "Combine visual elements with text in your flashcards for better memory retention.",
        "Did you know creating your own flashcards improves understanding by 70%? Try creating some today."
      ];
      return flashcardResponses[Math.floor(Math.random() * flashcardResponses.length)];
    }
    
    // Basic intent detection
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return "Namaste! How may I help with your studies today?";
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return "I am your voice assistant with an Indian accent. I'm here to help with your exam preparation.";
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm ready to help you achieve your academic goals! What would you like to focus on today?";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can help with your study plan, remind you of tasks, provide exam tips, and answer questions about your studies.";
    }
    
    if (lowerQuery.includes("what is prepzr") || lowerQuery.includes("about prepzr")) {
      return "PREPZR is your preparation platform for competitive exams like JEE and NEET with AI-powered learning tools and personalized study plans.";
    }
    
    if (lowerQuery.includes("how to start")) {
      return "To get started, set your study goals in the profile section, then use the academic advisor to create a personalized study plan. Use flashcards for quick revision and take practice tests regularly.";
    }
    
    if (lowerQuery.includes("time")) {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}.`;
    }
    
    if (lowerQuery.includes("date")) {
      const now = new Date();
      return `Today is ${now.toLocaleDateString()}.`;
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        "Success comes to those who work hard and stays with those who don't rest on their past laurels.",
        "Your NEET/JEE rank is determined by what you do today, not tomorrow.",
        "The difference between ordinary and extraordinary is practice.",
        "Every hour of focused study brings you closer to your dream college.",
        "Remember why you started when you feel like giving up."
      ];
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    if (lowerQuery.includes("study plan") || lowerQuery.includes("calendar")) {
      return "Your study plan today focuses on high-yield topics for your upcoming exams. Remember to balance theory with practice questions.";
    }
    
    // Default response
    return "I'm here to help with your exam preparation. You can ask me about your study plan, flashcards, or practice tests.";
  }, [updateInteractionTime]);
  
  // Get welcome message with appropriate context
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0, examGoal?: string): string => {
    // Update interaction time whenever welcome message is shown
    updateInteractionTime();
    setHasSentWelcomeMessage(true);
    
    const goalText = examGoal ? ` for your ${examGoal} preparation` : '';

    if (isFirstTime) {
      return `Welcome ${userName}! I'm your study assistant${goalText}. Click the voice icon when you need help.`;
    } 
    
    // For returning users - shorter, goal-focused messages
    if (loginCount < 5) {
      return `Welcome back ${userName}! Ready to continue${goalText}? Remember to check your notifications.`;
    } else {
      return `Welcome back ${userName}! Your study plan${goalText} is ready. Focus on practice tests today for better results.`;
    }
  }, [updateInteractionTime]);
  
  // Speak with current settings, but only when appropriate
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
    speak("Namaste! I'm your study companion. I'm here to help you achieve excellent results in your exams!", true);
    updateInteractionTime();
  }, [speak, updateInteractionTime]);
  
  // Stop any ongoing speech
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    updateInteractionTime();
  }, [updateInteractionTime]);
  
  // Check if it's appropriate to send a welcome message (used by components)
  const shouldSendWelcomeMessage = useCallback(() => {
    return settings.enabled && settings.announceGreetings && !hasSentWelcomeMessage;
  }, [settings.enabled, settings.announceGreetings, hasSentWelcomeMessage]);
  
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
    shouldSendWelcomeMessage,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};
