
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
  const [interactionCount, setInteractionCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for cleanup
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
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

  // Get intelligent, contextual greeting based on page and interaction count
  const getIntelligentGreeting = (pathname: string, interactionNum: number): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      if (interactionNum === 0) {
        return `${timeGreeting}! Welcome to PREPZR, the world's first emotionally intelligent exam preparation platform. Unlike traditional coaching institutes that follow one-size-fits-all approaches, PREPZR adapts to your unique learning style, emotional state, and preparation needs. Our AI understands not just what you study, but how you feel while studying. Ready to experience personalized learning? Try saying "Start free trial", "Analyze my readiness", or ask "Why is PREPZR better?"`;
      } else if (interactionNum === 1) {
        return `PREPZR revolutionizes exam preparation through emotional intelligence. While other platforms focus only on content delivery, we understand your stress levels, confidence patterns, and learning preferences. Our adaptive AI creates personalized study paths that evolve with your progress. Want to see how? Say "Show features", "Take demo", or "Tell me about NEET prep".`;
      } else {
        return `Ready to transform your exam preparation journey? PREPZR's unique approach combines AI-powered personalization with emotional support - something no other platform offers. Our students report 40% less stress and 60% better retention. Interested? Say "Sign up now", "Free trial", or ask about specific exams like JEE or NEET.`;
      }
    } else if (pathname.includes('/signup')) {
      return `${timeGreeting}! I'll help you join PREPZR's revolutionary exam preparation platform. Our signup process is designed to understand your unique needs. I can guide you through each step or answer questions about our features. Say "Help with signup", "Tell me about plans", or "What makes PREPZR special?"`;
    } else if (pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREPZR. Ready to access your personalized learning dashboard? I can help you log in or provide a demo experience. Say "Demo login", "Forgot password", or "Show me features" to get started.`;
    }
    
    return `${timeGreeting}! I'm here to help you navigate PREPZR's intelligent exam preparation platform.`;
  };

  // Speak with enhanced voice settings
  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-ZER');
    speech.lang = language;
    speech.rate = 1.1; // Slightly faster for efficiency
    speech.pitch = 1.2; // Confident, engaging tone
    speech.volume = 0.8;

    // Find best voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      'Google US English Female',
      'Microsoft Zira',
      'Samantha',
      'Karen'
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

    speech.onend = () => {
      // Start listening after speaking with appropriate delay
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 1000);
    };

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  // Enhanced voice recognition with intelligent responses
  const startVoiceRecognition = () => {
    if (!shouldActivate || isMuted || recognitionRef.current) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
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
        recognitionRef.current = null;
        
        // Smart restart with longer intervals to avoid repetition
        if (!isMuted && shouldActivate && document.visibilityState === 'visible') {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 5000); // 5 second break
        }
      };
      
      recognition.onerror = (event) => {
        setIsListening(false);
        recognitionRef.current = null;
        
        if (event.error !== 'aborted' && !isMuted && shouldActivate) {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 8000); // Longer delay on error
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        
        // Prevent rapid commands
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 3000) return;
        lastCommandTimeRef.current = now;
        
        handleIntelligentCommand(transcript);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  };

  // Intelligent command handling with contextual responses
  const handleIntelligentCommand = (command: string) => {
    setInteractionCount(prev => prev + 1);

    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register') || command.includes('start free trial')) {
      window.location.href = '/signup';
      speakMessage('Taking you to our signup page where you can start your personalized learning journey.');
    } else if (command.includes('login') || command.includes('log in')) {
      window.location.href = '/login';
      speakMessage('Opening the login page. You can also try our demo to see PREPZR in action.');
    } else if (command.includes('demo') || command.includes('try demo')) {
      window.location.href = '/login';
      speakMessage('Loading our demo experience. You\'ll see how PREPZR adapts to your learning style.');
    } else if (command.includes('neet')) {
      window.location.href = '/signup?exam=neet';
      speakMessage('Excellent choice! NEET 2026 preparation is now live. Our AI will create a personalized study plan based on your strengths and areas for improvement.');
    } else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment')) {
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your personalized exam readiness analysis. This will help identify your preparation gaps and create a targeted study plan.');
    } 
    // Feature inquiry commands
    else if (command.includes('features') || command.includes('what can') || command.includes('show features')) {
      const featuresMessage = `PREPZR offers unique features no other platform has: Emotional intelligence that adapts to your mood, personalized study paths that evolve with your progress, stress-free learning environments, and AI tutors that understand your learning style. We also provide real-time performance analytics and exam-ready preparation tools.`;
      speakMessage(featuresMessage);
    } else if (command.includes('why') && (command.includes('better') || command.includes('different'))) {
      const whyBetterMessage = `Unlike traditional coaching that treats all students the same, PREPZR understands YOU. Our AI recognizes when you're stressed, confident, or struggling, and adapts accordingly. We don't just teach subjects - we build study habits, reduce exam anxiety, and create personalized learning experiences. That's why our students achieve 95% success rates with 40% less stress.`;
      speakMessage(whyBetterMessage);
    } else if (command.includes('free trial') || command.includes('trial')) {
      const trialMessage = `Our 7-day free trial gives you complete access to PREPZR's AI-powered features. You'll experience personalized study plans, emotional intelligence support, and adaptive learning paths. No commitments - just pure, intelligent exam preparation. Ready to start?`;
      speakMessage(trialMessage);
    } else if (command.includes('help') || command.includes('commands')) {
      const helpMessage = `I can help you with: "Sign up" for registration, "Demo" to try PREPZR, "Analyze readiness" for assessment, "Why is PREPZR better" to learn our advantages, "Free trial" for trial info, or "NEET prep" for NEET 2026 preparation.`;
      speakMessage(helpMessage);
    } else if (command.includes('mute') || command.includes('stop') || command.includes('quiet')) {
      setIsMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanup();
      speakMessage('Voice assistant muted. You can reactivate it anytime from settings.');
    } else {
      // Smart contextual responses based on interaction count
      const responses = [
        "I'm here to help you discover PREPZR's unique advantages. Try asking 'Why is PREPZR better?' or 'Show me features'.",
        "Interested in experiencing personalized learning? Say 'Free trial' or 'Demo' to get started.",
        "Ready to transform your exam preparation? Say 'Sign up', 'NEET prep', or 'Analyze readiness'."
      ];
      const contextResponse = responses[interactionCount % responses.length];
      speakMessage(contextResponse);
    }
  };

  // Enhanced initialization with smart timing
  useEffect(() => {
    cleanup();
    setHasGreeted(false);
    setIsListening(false);
    setInteractionCount(0);

    // Check mute preference
    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    if (!shouldActivate) return;

    // Smart initialization with voice loading detection
    const initializeVoice = () => {
      if (window.speechSynthesis && !hasGreeted && !isMuted) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          setHasGreeted(true);
          const greeting = getIntelligentGreeting(location.pathname, interactionCount);
          
          // Immediate, engaging greeting
          timeoutRef.current = window.setTimeout(() => {
            speakMessage(greeting);
            
            toast({
              title: "PREPZR Voice Assistant Active",
              description: "Say 'Help' for available commands or ask about our features",
              duration: 4000,
            });
          }, 800); // Quick start for immediate engagement
        }
      }
    };

    // Voice loading and initialization
    if (window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          initializeVoice();
        } else {
          setTimeout(loadVoices, 100);
        }
      };

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        initializeVoice();
      };
      
      loadVoices();
    }

    return cleanup;
  }, [location.pathname, shouldActivate, hasGreeted, isMuted]);

  // Handle mute/unmute events
  useEffect(() => {
    const handleMute = () => {
      setIsMuted(true);
      cleanup();
    };
    
    const handleUnmute = () => {
      setIsMuted(false);
      if (shouldActivate && hasGreeted) {
        setTimeout(() => startVoiceRecognition(), 1000);
      }
    };

    document.addEventListener('voice-assistant-mute', handleMute);
    document.addEventListener('voice-assistant-unmute', handleUnmute);

    return () => {
      document.removeEventListener('voice-assistant-mute', handleMute);
      document.removeEventListener('voice-assistant-unmute', handleUnmute);
    };
  }, [shouldActivate, hasGreeted]);

  // Page visibility management
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanup();
      } else if (document.visibilityState === 'visible' && shouldActivate && !isMuted && hasGreeted) {
        setTimeout(() => {
          if (!recognitionRef.current) {
            startVoiceRecognition();
          }
        }, 1500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldActivate, isMuted, hasGreeted]);

  return null; // This component renders no UI
};

export default EnhancedHomePageVoiceAssistant;
