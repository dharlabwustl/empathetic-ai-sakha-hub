
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice, getPreferredFemaleVoice } from '@/utils/voiceConfig';

interface EnhancedHomePageAssistantProps {
  language?: string;
}

const EnhancedHomePageAssistant: React.FC<EnhancedHomePageAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [offerCycle, setOfferCycle] = useState(0);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  const lastOfferTimeRef = useRef<number>(0);
  
  // Track spoken messages to prevent repetition
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness') ||
                            location.pathname.includes('/scholarship');
  
  // Enhanced greeting messages for different pages
  const getContextMessage = (path: string) => {
    if (path === '/') {
      return "Welcome to PREPZR, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm your PREPZR AI assistant, your learning companion. PREPZR uses advanced AI to understand your emotional state and learning patterns, creating a truly personalized study experience. Unlike traditional coaching institutes, we adapt to you in real-time.";
    } else if (path.includes('/signup')) {
      return "Welcome to PREPZR signup! I'm your PREPZR AI assistant. I can help you navigate the registration process. You can say 'help me sign up', 'tell me about plans', or 'start free trial' to get assistance.";
    } else if (path.includes('/free-trial')) {
      return "Welcome to PREPZR's free trial! Experience our emotionally intelligent exam preparation platform. I can guide you through our features like personalized study plans, adaptive learning, and real-time progress tracking.";
    } else if (path.includes('/exam-readiness')) {
      return "Our exam readiness analyzer will evaluate your current preparation level and identify areas for improvement. Unlike other platforms, PREPZR considers your emotional state and learning patterns to provide truly personalized recommendations.";
    } else if (path.includes('/scholarship')) {
      return "Explore PREPZR's scholarship opportunities! We believe in making quality education accessible. Our scholarship tests are designed to identify talented students and provide them with premium access to our platform.";
    }
    
    return "Welcome to PREPZR, where AI meets empathy in exam preparation. I'm your PREPZR AI assistant, ready to help you explore our platform.";
  };

  // Smart assistance offers that cycle through different topics
  const getSmartOffer = () => {
    const offers = [
      "Would you like to start a free trial to experience our AI-powered learning? Just say 'free trial'.",
      "Curious about how PREPZR is better than traditional coaching institutes? Ask me 'why PREPZR better'.",
      "Want to test your current exam readiness? Say 'exam readiness test' to get started.",
      "Interested in our scholarship opportunities? Say 'scholarship test' to learn more.",
      "Need to know more about PREPZR's features? Just ask 'what can PREPZR do'.",
      "Ready to sign up and start your personalized learning journey? Say 'sign up' to begin."
    ];
    
    const currentOffer = offers[offerCycle % offers.length];
    setOfferCycle(prev => prev + 1);
    return currentOffer;
  };

  // Enhanced command processing for home page
  const processVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    // Prevent rapid commands
    const now = Date.now();
    if (now - lastCommandTimeRef.current < 2000) return;
    lastCommandTimeRef.current = now;

    // Features and information commands
    if (command.includes('features') || command.includes('what can prepzr do')) {
      speak("PREPZR offers emotionally aware learning with personalized study plans, adaptive flashcards, AI tutoring, practice exams, and real-time progress tracking. We understand not just what you learn, but how you feel while learning.");
    }
    else if (command.includes('why prepzr') || command.includes('better than coaching')) {
      speak("PREPZR is better than traditional coaching institutes because we provide 24/7 availability, personalized attention for every student, emotional intelligence integration, adaptive learning paths, and cost-effective premium education. We scale personal attention that physical institutes cannot match.");
    }
    else if (command.includes('free trial') || command.includes('try free')) {
      speak("Starting your free trial! You'll get access to our core features including personalized study plans and AI tutoring.");
      navigate('/signup?trial=true');
    }
    else if (command.includes('exam readiness') || command.includes('readiness test')) {
      speak("Let's analyze your exam readiness! Our AI will evaluate your preparation and create a personalized improvement plan.");
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
    else if (command.includes('scholarship') || command.includes('scholarship test')) {
      speak("Exploring scholarship opportunities! PREPZR offers merit-based scholarships to deserving students.");
      navigate('/scholarship');
    }
    else if (command.includes('signup') || command.includes('sign up') || command.includes('register')) {
      speak("Taking you to the signup page! I'll help you create your account.");
      navigate('/signup');
    }
    else if (command.includes('login') || command.includes('log in')) {
      speak("Redirecting to login page.");
      navigate('/login');
    }
    else if (command.includes('subscription') || command.includes('plans') || command.includes('pricing')) {
      speak("Let me show you our subscription plans designed for different learning needs.");
      navigate('/signup#plans');
    }
    else if (command.includes('about prepzr') || command.includes('more about')) {
      speak("PREPZR revolutionizes exam preparation by combining artificial intelligence with emotional intelligence. We create adaptive learning experiences that respond to your mood, stress levels, and learning preferences in real-time.");
    }
    else if (command.includes('help') || command.includes('guide me')) {
      speak("I can help you with signing up, exploring features, starting a free trial, taking readiness tests, or learning about scholarships. What would you like to know?");
      showHelpToast();
    }
    else {
      speak("I can help you explore PREPZR's features, start a free trial, take an exam readiness test, or learn about our scholarship programs. What interests you?");
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window) || audioMuted) return;
    
    // Check if message was already spoken (prevent repetition)
    const messageKey = text.toLowerCase().trim();
    if (spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Voice: Message already spoken, skipping:', text);
      return;
    }
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        // Add to spoken messages to prevent repetition
        spokenMessagesRef.current.add(messageKey);
        console.log('🔊 Voice: Speaking:', text);
      },
      () => {
        console.log('🔇 Voice: Finished speaking');
      }
    );
  };

  const offerSmartAssistance = () => {
    const now = Date.now();
    if (now - lastOfferTimeRef.current < 45000) return; // Wait 45 seconds between offers
    
    const offer = getSmartOffer();
    speak(offer);
    lastOfferTimeRef.current = now;
  };

  const showHelpToast = () => {
    toast({
      title: "PREPZR AI Voice Commands",
      description: "Try: 'Features', 'Free trial', 'Exam readiness', 'Scholarship test', 'Sign up', 'Why PREPZR better'",
      duration: 8000,
    });
  };

  const setupVoiceRecognition = () => {
    if (recognitionRef.current || audioMuted || !shouldPlayGreeting) return;
    
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
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
            
            // Offer smart assistance periodically
            if (Math.random() > 0.7) { // 30% chance to offer help
              setTimeout(offerSmartAssistance, 2000);
            }
          }, 5000);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Voice command:", transcript);
        processVoiceCommand(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        if (shouldPlayGreeting && !audioMuted) {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, 5000);
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Failed to setup recognition:", error);
    }
  };

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
    setIsListening(false);
  };

  const setupVoiceGreeting = () => {
    if (greetingPlayed || audioMuted || !shouldPlayGreeting) return;
    
    const message = getContextMessage(location.pathname);
    speak(message);
    setGreetingPlayed(true);
    
    setTimeout(() => {
      if (!audioMuted) {
        setupVoiceRecognition();
        showHelpToast();
        
        // Schedule first smart assistance offer
        setTimeout(offerSmartAssistance, 15000);
      }
    }, 500);
  };

  useEffect(() => {
    cleanupVoiceResources();
    setGreetingPlayed(false);
    // Clear spoken messages cache when navigating to new page
    spokenMessagesRef.current.clear();
    setOfferCycle(0);
    
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    } else if (shouldPlayGreeting) {
      const timer = setTimeout(setupVoiceGreeting, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleMute = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanupVoiceResources();
    };
    
    const handleUnmute = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
      if (!greetingPlayed) {
        setupVoiceGreeting();
      } else {
        setupVoiceRecognition();
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanupVoiceResources();
      } else if (document.visibilityState === 'visible' && !audioMuted) {
        setTimeout(() => {
          if (!greetingPlayed) {
            setupVoiceGreeting();
          } else {
            setupVoiceRecognition();
          }
        }, 1000);
      }
    };
    
    document.addEventListener('voice-assistant-mute', handleMute);
    document.addEventListener('voice-assistant-unmute', handleUnmute);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMute);
      document.removeEventListener('voice-assistant-unmute', handleUnmute);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cleanupVoiceResources();
    };
  }, [greetingPlayed, shouldPlayGreeting, audioMuted]);

  // Clear spoken messages periodically to allow re-speaking after some time
  useEffect(() => {
    const interval = setInterval(() => {
      spokenMessagesRef.current.clear();
      console.log('🔄 Voice: Cleared spoken messages cache');
    }, 300000); // Clear every 5 minutes

    return () => clearInterval(interval);
  }, []);
  
  return null;
};

export default EnhancedHomePageAssistant;
