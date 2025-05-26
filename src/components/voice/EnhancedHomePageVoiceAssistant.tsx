
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const [conversationContext, setConversationContext] = useState<string>('welcome');
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
  const shouldPlayGreeting = location.pathname === '/';
  
  // Intelligent context-aware responses
  const getContextualResponse = (transcript: string, context: string) => {
    const lowerTranscript = transcript.toLowerCase();
    
    // Free trial related
    if (lowerTranscript.includes('free') || lowerTranscript.includes('trial') || lowerTranscript.includes('start')) {
      setConversationContext('free-trial');
      return "Perfect! PREPZR offers a comprehensive 7-day free trial. You'll get access to our AI-powered study plans, concept mastery tools, practice exams, and emotional intelligence features. Ready to transform your exam preparation journey?";
    }
    
    // About PREPZR and features
    if (lowerTranscript.includes('about') || lowerTranscript.includes('features') || lowerTranscript.includes('what is')) {
      setConversationContext('features');
      return "PREPZR is the world's first emotionally intelligent exam platform. Unlike traditional coaching or EdTech platforms, we understand your mindset, not just the exam content. Our AI adapts to your learning style, mood, and progress in real-time. We offer personalized study plans, interactive concept mastery, mood-based learning adjustments, and comprehensive analytics.";
    }
    
    // Why PREPZR is better
    if (lowerTranscript.includes('why') || lowerTranscript.includes('better') || lowerTranscript.includes('different') || lowerTranscript.includes('unique')) {
      setConversationContext('advantages');
      return "Here's what makes PREPZR revolutionary: We're the only platform that combines academic excellence with emotional intelligence. While others focus just on content delivery, we understand your stress, motivation levels, and learning patterns. Our AI creates truly personalized experiences that traditional coaching institutes and EdTech platforms simply cannot match.";
    }
    
    // Exam readiness
    if (lowerTranscript.includes('exam') || lowerTranscript.includes('readiness') || lowerTranscript.includes('test') || lowerTranscript.includes('analyze')) {
      setConversationContext('exam-readiness');
      return "Our exam readiness analyzer is a game-changer! It evaluates your current preparation level across all subjects, identifies knowledge gaps, and provides detailed insights about your strengths and improvement areas. This helps create a laser-focused study strategy tailored just for you.";
    }
    
    // Signup process
    if (lowerTranscript.includes('signup') || lowerTranscript.includes('join') || lowerTranscript.includes('register')) {
      setConversationContext('signup');
      return "Excellent choice! Signing up with PREPZR gives you access to adaptive learning technology, personalized study plans, emotional support systems, practice exams, flashcards, formula practice, and our AI tutor. You'll experience a completely new way of exam preparation that understands both your academic and emotional needs.";
    }
    
    // After signup benefits
    if (lowerTranscript.includes('after signup') || lowerTranscript.includes('what will i get') || lowerTranscript.includes('benefits')) {
      setConversationContext('benefits');
      return "After joining PREPZR, you'll get a personalized dashboard with adaptive daily study plans, concept mastery tools, interactive flashcards, comprehensive practice exams, formula practice sessions, mood-based learning adjustments, progress analytics, and access to our AI tutor for instant doubt resolution. Everything adapts to your unique learning profile!";
    }
    
    // Default contextual response based on current context
    switch (context) {
      case 'welcome':
        return "I'm here to help you discover how PREPZR can transform your exam preparation. You can ask me about our free trial, unique features, exam readiness test, or why we're different from traditional coaching platforms.";
      case 'free-trial':
        return "The free trial includes full access to our adaptive learning system. Would you like me to help you get started, or do you have questions about our features?";
      case 'features':
        return "Our key features include emotional intelligence integration, adaptive study plans, and personalized learning paths. Would you like to know more about any specific feature or start your free trial?";
      default:
        return "I can help you with information about PREPZR's features, free trial, exam readiness test, or guide you through getting started. What interests you most?";
    }
  };
  
  // Initial intelligent greeting
  const getIntelligentGreeting = () => {
    const currentHour = new Date().getHours();
    let timeGreeting = '';
    
    if (currentHour < 12) timeGreeting = 'Good morning';
    else if (currentHour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    return `${timeGreeting}! Welcome to PREPZR, India's first emotionally intelligent exam preparation platform. I'm your AI guide. Unlike traditional coaching or EdTech platforms, PREPZR understands your mindset and adapts to your unique learning style. We're here to revolutionize how you prepare for competitive exams like NEET, JEE, and UPSC. How can I help you explore our transformative approach today?`;
  };
  
  // Cleanup function
  const cleanupVoiceResources = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onstart = null;
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore cleanup errors
      } finally {
        recognitionRef.current = null;
      }
    }
  };
  
  // Setup voice recognition with intelligent responses
  const setupVoiceRecognition = () => {
    if (recognitionRef.current || audioMuted || !shouldPlayGreeting) {
      return;
    }
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      return;
    }
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice command recognized:", transcript);
        
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 3000) {
          return;
        }
        lastCommandTimeRef.current = now;
        setLastInteractionTime(now);
        
        // Get intelligent response
        const response = getContextualResponse(transcript, conversationContext);
        speakIntelligently(response);
        
        // Handle navigation commands
        if (transcript.includes('signup') || transcript.includes('sign up') || transcript.includes('register')) {
          setTimeout(() => navigate('/signup'), 2000);
        } else if (transcript.includes('login') || transcript.includes('log in')) {
          setTimeout(() => navigate('/login'), 2000);
        } else if (transcript.includes('analyze') || transcript.includes('readiness') || transcript.includes('test')) {
          setTimeout(() => {
            window.dispatchEvent(new Event('open-exam-analyzer'));
          }, 2000);
        } else if (transcript.includes('free trial') || transcript.includes('start trial')) {
          setTimeout(() => navigate('/signup'), 2000);
        }
      };
      
      recognition.onend = () => {
        // Intelligent restart based on recent interaction
        const timeSinceLastInteraction = Date.now() - lastInteractionTime;
        
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible' && timeSinceLastInteraction > 10000) {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, 5000);
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, 8000);
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Error setting up recognition:", error);
    }
  };
  
  // Intelligent speech function
  const speakIntelligently = (message: string) => {
    if (!('speechSynthesis' in window) || audioMuted) {
      return;
    }
    
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'prep zer');
    speech.lang = language;
    speech.rate = 0.95;
    speech.pitch = 1.05;
    speech.volume = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name?.toLowerCase().includes('google') && 
      v.lang?.toLowerCase().includes('en')
    ) || voices[0];
    
    if (preferredVoice) {
      speech.voice = preferredVoice;
    }
    
    speech.onend = () => {
      setTimeout(() => {
        if (!audioMuted) {
          setupVoiceRecognition();
        }
      }, 1000);
    };
    
    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };
  
  // Setup initial greeting
  const setupVoiceGreeting = () => {
    if (greetingPlayed || audioMuted || !shouldPlayGreeting) {
      return;
    }
    
    const message = getIntelligentGreeting();
    speakIntelligently(message);
    setGreetingPlayed(true);
    setConversationContext('welcome');
    setLastInteractionTime(Date.now());
    
    toast({
      title: "PREPZR Voice Assistant",
      description: "Ask about features, free trial, exam readiness, or why PREPZR is better!",
      duration: 6000,
    });
  };
  
  // Route change handler
  useEffect(() => {
    cleanupVoiceResources();
    
    if (shouldPlayGreeting && !audioMuted) {
      const setupTimer = setTimeout(() => {
        setupVoiceGreeting();
      }, 2000);
      
      return () => clearTimeout(setupTimer);
    }
  }, [location.pathname]);
  
  // Load mute preference
  useEffect(() => {
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    }
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanupVoiceResources();
      } else if (document.visibilityState === 'visible' && !audioMuted && shouldPlayGreeting) {
        setTimeout(() => {
          if (!greetingPlayed) {
            setupVoiceGreeting();
          } else {
            setupVoiceRecognition();
          }
        }, 1000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cleanupVoiceResources();
    };
  }, []);
  
  return null;
};

export default EnhancedHomePageVoiceAssistant;
