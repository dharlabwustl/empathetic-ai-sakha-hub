
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationState, setConversationState] = useState('greeting'); // greeting, listening, responding
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for cleanup
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  const interactionCountRef = useRef<number>(0);
  
  // Check if current page should have voice assistant
  const shouldActivate = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/login') ||
                        location.pathname.includes('/exam-readiness');

  // Cleanup function
  const cleanup = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore cleanup errors
      }
      recognitionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  };

  // Intelligent greeting based on page and interaction count
  const getIntelligentGreeting = (pathname: string): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      return `${timeGreeting}! Welcome to PREPZR, India's first emotionally intelligent exam preparation platform. I'm Sakha AI, your adaptive learning companion. We understand your mindset, not just the exam. Our platform combines AI-powered personalization with emotional intelligence to create the most effective exam prep experience. Unlike traditional coaching or EdTech platforms, we adapt to your learning style, mood, and pace in real-time. You can start your free 7-day trial, take our exam readiness test, or learn more about how PREPZR will transform your preparation journey. How can I assist you today?`;
    } else if (pathname.includes('/signup')) {
      return `${timeGreeting}! Welcome to PREPZR signup. I'm Sakha AI. You're about to join thousands of students who've transformed their exam preparation with our emotionally intelligent platform. I can guide you through the registration process or answer any questions about what you'll get after signing up.`;
    } else if (pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREPZR. Access your personalized learning dashboard where our AI adapts to your unique learning style and emotional state.`;
    } else if (pathname.includes('/exam-readiness')) {
      return `${timeGreeting}! Our AI-powered exam readiness analyzer will evaluate your preparation level across multiple dimensions and create a personalized study roadmap based on your strengths and areas for improvement.`;
    }
    
    return `${timeGreeting}! Welcome to PREPZR, your intelligent exam preparation assistant.`;
  };

  // Smart response system with context awareness
  const getContextualResponse = (interactionCount: number): string => {
    const responses = [
      "PREPZR stands out because we're the only platform that truly understands your emotions and adapts accordingly. While others focus just on content delivery, we create a personalized learning experience that responds to how you feel and learn best.",
      "Our adaptive AI technology sets us apart from traditional coaching institutes and EdTech platforms. We provide real-time feedback, mood-based content adjustment, and personalized study plans that evolve with your progress.",
      "What makes PREPZR unique is our emotional intelligence combined with academic excellence. We don't just teach concepts - we understand your learning patterns, stress levels, and motivation to create the most effective study experience.",
      "Ready to experience the future of exam preparation? Start your free 7-day trial to access personalized study plans, adaptive practice tests, and our 24/7 AI tutor that understands your learning style."
    ];
    
    return responses[Math.min(interactionCount, responses.length - 1)];
  };

  // Speak with enhanced female voice and intelligent pausing
  const speakMessage = (message: string, isFollowUp: boolean = false) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance with enhanced pronunciation
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
    speech.lang = language;
    speech.rate = 0.95; // Slightly slower for clarity
    speech.pitch = 1.1; // Pleasant, confident tone
    speech.volume = 0.85;

    // Enhanced voice selection
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      'Google US English Female',
      'Microsoft Zira Desktop',
      'Samantha',
      'Karen',
      'Victoria'
    ];

    let selectedVoice = null;
    for (const voiceName of preferredVoices) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(voiceName.toLowerCase())
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    // Event handlers
    speech.onstart = () => {
      setConversationState('responding');
      console.log('AI speaking...');
    };
    
    speech.onend = () => {
      console.log('AI finished speaking');
      setConversationState('listening');
      
      // Smart listening restart with appropriate delay
      const delay = isFollowUp ? 2000 : 3000;
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, delay);
    };
    
    speech.onerror = (e) => {
      console.error('Speech error:', e);
      setConversationState('listening');
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 2000);
    };

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  // Enhanced voice recognition with intelligent breaks
  const startVoiceRecognition = () => {
    if (!shouldActivate || isMuted || recognitionRef.current || conversationState === 'responding') return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
        setConversationState('listening');
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
        
        // Intelligent restart with break management
        if (!isMuted && shouldActivate && document.visibilityState === 'visible') {
          const timeSinceLastInteraction = Date.now() - lastInteractionTime;
          const breakDuration = timeSinceLastInteraction > 30000 ? 8000 : 5000; // Longer breaks after inactivity
          
          retryTimeoutRef.current = window.setTimeout(() => {
            if (conversationState !== 'responding') {
              startVoiceRecognition();
            }
          }, breakDuration);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        
        const retryDelay = event.error === 'network' ? 10000 : 6000;
        
        if (event.error !== 'aborted' && !isMuted && shouldActivate) {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, retryDelay);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log('Voice command:', transcript);
        
        // Prevent rapid commands
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 3000) {
          return;
        }
        lastCommandTimeRef.current = now;
        setLastInteractionTime(now);
        
        handleIntelligentVoiceCommand(transcript);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
      retryTimeoutRef.current = window.setTimeout(() => {
        startVoiceRecognition();
      }, 8000);
    }
  };

  // Enhanced voice command handling with contextual intelligence
  const handleIntelligentVoiceCommand = (command: string) => {
    interactionCountRef.current += 1;
    
    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register') || command.includes('free trial')) {
      window.location.href = '/signup';
      speakMessage('Excellent choice! Taking you to start your free 7-day trial. You\'ll get access to personalized study plans, adaptive practice tests, and our AI tutor that understands your learning style.', true);
    } 
    else if (command.includes('login') || command.includes('log in')) {
      window.location.href = '/login';
      speakMessage('Taking you to login. Access your personalized dashboard where our AI adapts to your unique learning needs.', true);
    } 
    else if (command.includes('demo') || command.includes('try demo')) {
      window.location.href = '/login';
      speakMessage('Opening demo access so you can experience PREPZR\'s adaptive learning technology.', true);
    } 
    else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment') || command.includes('test')) {
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your comprehensive exam readiness analysis. Our AI will evaluate your preparation across multiple subjects and create a personalized improvement plan.', true);
    } 
    else if (command.includes('features') || command.includes('what is prepzr') || command.includes('about prepzr')) {
      speakMessage('PREPZR is India\'s first emotionally intelligent exam platform. We combine AI-powered personalization with emotional intelligence to adapt to your learning style, mood, and pace. Unlike traditional coaching that follows a one-size-fits-all approach, we create a unique learning experience for each student, leading to better retention and exam performance.', true);
    } 
    else if (command.includes('why better') || command.includes('why choose') || command.includes('better than others')) {
      speakMessage('PREPZR revolutionizes exam preparation by understanding not just what you study, but how you learn best. Our emotional AI adapts content difficulty, pacing, and teaching methods based on your current mood and learning state. This personalized approach leads to 3x better retention compared to traditional methods.', true);
    }
    else if (command.includes('subscription') || command.includes('plans') || command.includes('pricing') || command.includes('cost')) {
      speakMessage('We offer flexible plans: Start with our free 7-day trial, then choose from monthly pro at 499 rupees or annual pro at 2999 rupees. Pro users get unlimited access to adaptive practice tests, personalized study plans, and priority AI tutor support.', true);
    }
    else if (command.includes('after signup') || command.includes('what will i get') || command.includes('benefits')) {
      speakMessage('After signing up, you\'ll get a personalized onboarding assessment, adaptive daily study plans, concept mastery tracking, practice exams that adapt to your skill level, emotional support features, and 24/7 access to our AI tutor Sakha who understands your learning style.', true);
    }
    else if (command.includes('help') || command.includes('what can you do')) {
      speakMessage('I can help you start your free trial, take the exam readiness test, learn about PREPZR\'s unique features, or explain our subscription plans. Try saying: "Start free trial", "Exam readiness test", "Why is PREPZR better", or "What will I get after signup".', true);
    }
    else if (command.includes('mute') || command.includes('stop') || command.includes('quiet')) {
      setIsMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanup();
      speakMessage('Voice assistant muted. You can unmute me anytime from the settings.', true);
    }
    else {
      // Contextual smart responses
      const contextualResponse = getContextualResponse(interactionCountRef.current);
      speakMessage(contextualResponse, true);
    }
  };

  // Initialize voices
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          console.log("Voices loaded:", window.speechSynthesis.getVoices().length);
        };
      }
    }
  }, []);

  // Main effect for intelligent greeting and conversation management
  useEffect(() => {
    cleanup();
    setHasGreeted(false);
    setIsListening(false);
    setConversationState('greeting');

    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    if (!shouldActivate) return;

    const initializeIntelligentVoice = () => {
      if (window.speechSynthesis && !hasGreeted && !isMuted) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          setHasGreeted(true);
          const greeting = getIntelligentGreeting(location.pathname);
          
          timeoutRef.current = window.setTimeout(() => {
            speakMessage(greeting);
            
            toast({
              title: "Sakha AI Voice Assistant Active",
              description: "I'm here to guide you through PREPZR's features",
              duration: 4000,
            });
          }, 1000);
        }
      }
    };

    if (window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          initializeIntelligentVoice();
        } else {
          setTimeout(loadVoices, 100);
        }
      };

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        initializeIntelligentVoice();
      };
      
      loadVoices();
    }

    return cleanup;
  }, [location.pathname, shouldActivate, hasGreeted, isMuted]);

  // Handle visibility changes for intelligent pause/resume
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanup();
      } else if (document.visibilityState === 'visible' && shouldActivate && !isMuted) {
        setTimeout(() => {
          if (!recognitionRef.current && hasGreeted && conversationState !== 'responding') {
            startVoiceRecognition();
          }
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldActivate, isMuted, hasGreeted, conversationState]);

  return null;
};

export default EnhancedHomePageVoiceAssistant;
