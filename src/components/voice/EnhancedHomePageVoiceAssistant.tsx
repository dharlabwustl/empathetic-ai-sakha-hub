
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, Pause, Play, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US' 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'greeting' | 'features' | 'benefits' | 'cta' | 'navigation' | 'idle'>('greeting');
  const [phaseCount, setPhaseCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);
  const interactionTimerRef = useRef<number | null>(null);

  // Enhanced welcome scripts with intelligent phases and correct PREPZR pronunciation
  const getPhaseScript = () => {
    const scripts = {
      greeting: `Welcome to PREPZR! I'm your AI learning companion. PREPZR is the world's first emotionally aware exam preparation platform that understands not just what you study, but how you feel while studying. We're here to make your exam journey successful and stress-free.`,
      
      features: `Let me tell you about PREPZR's amazing features. Our AI technology creates personalized study plans that adapt to your learning style and emotional state. You get access to thousands of practice questions, interactive simulations, and real-time performance analysis designed specifically for competitive exams like NEET, JEE, and UPSC.`,
      
      benefits: `With PREPZR, you'll experience five key benefits: build unshakeable confidence, achieve exam success, save valuable time with efficient study methods, enjoy stress-free learning, and discover the joy in preparation. Our platform transforms overwhelming exam preparation into an achievable and enjoyable journey.`,
      
      cta: `Ready to start your success journey? You can begin your 7-day free trial right now to experience everything PREPZR has to offer. Just say "start free trial" or "sign up", and I'll take you there immediately. You can also try our AI exam readiness analyzer by saying "analyze my readiness".`,
      
      navigation: `I can help you navigate PREPZR easily. You can say commands like "sign up", "login", "start trial", "analyze readiness", or "go home". I'm here to make your experience smooth and intuitive. What would you like to explore?`,
      
      idle: `I'm still here to help you explore PREPZR. You can ask me about our features, start your free trial, check your exam readiness, or simply tell me what you'd like to know. I'm listening for your commands whenever you're ready.`
    };
    
    return scripts[currentPhase];
  };

  // Intelligent phase progression with smart timing
  const getNextPhase = () => {
    const timeSinceLastInteraction = Date.now() - lastInteraction;
    
    // If user hasn't interacted recently, cycle through different content
    if (timeSinceLastInteraction > 30000) { // 30 seconds
      const engagementPhases = ['benefits', 'cta', 'navigation'];
      return engagementPhases[phaseCount % engagementPhases.length] as typeof currentPhase;
    }
    
    // Normal progression for active users
    const phaseOrder = ['greeting', 'features', 'benefits', 'cta', 'navigation', 'idle'];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      return phaseOrder[currentIndex + 1] as typeof currentPhase;
    }
    
    return 'idle';
  };

  // Enhanced voice commands handler with more intelligent responses
  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    setLastInteraction(Date.now());
    
    if (command.includes('start free trial') || command.includes('free trial') || command.includes('sign up') || command.includes('signup') || command.includes('register')) {
      speak("Excellent choice! Taking you to the sign-up page where you can start your 7-day free trial and experience the full power of PREPZR's emotionally intelligent platform.");
      setTimeout(() => navigate('/signup'), 2000);
      return true;
    }
    
    if (command.includes('analyze') || command.includes('exam readiness') || command.includes('readiness') || command.includes('assessment') || command.includes('test my knowledge')) {
      speak("Great decision! Opening our AI-powered exam readiness analyzer. This will evaluate your current knowledge and create a personalized study plan tailored to your learning style and emotional needs.");
      setTimeout(() => {
        const event = new CustomEvent('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 2000);
      return true;
    }
    
    if (command.includes('features') || command.includes('what can') || command.includes('tell me more') || command.includes('how does') || command.includes('capabilities')) {
      setCurrentPhase('features');
      speak("Let me explain PREPZR's powerful features. " + getPhaseScript());
      return true;
    }
    
    if (command.includes('benefits') || command.includes('why prepzr') || command.includes('advantages') || command.includes('help me')) {
      setCurrentPhase('benefits');
      speak("Here are the amazing benefits you'll get with PREPZR. " + getPhaseScript());
      return true;
    }
    
    if (command.includes('login') || command.includes('log in') || command.includes('sign in')) {
      speak("Taking you to the login page. You can access your existing account or try our demo to explore PREPZR's features.");
      setTimeout(() => navigate('/login'), 2000);
      return true;
    }
    
    if (command.includes('stop') || command.includes('quiet') || command.includes('mute') || command.includes('silence') || command.includes('shut up')) {
      setIsMuted(true);
      stopSpeaking();
      speak("I'll be quiet now. Click the volume button whenever you want me to speak again.");
      return true;
    }
    
    if (command.includes('repeat') || command.includes('say again') || command.includes('once more') || command.includes('what did you say')) {
      speak(getPhaseScript());
      return true;
    }
    
    if (command.includes('help') || command.includes('commands') || command.includes('what can you do') || command.includes('assist')) {
      setCurrentPhase('navigation');
      speak("I can help you start a free trial, analyze your exam readiness, explain PREPZR features, take you to login, or answer questions about our platform. Just speak naturally and I'll understand!");
      return true;
    }
    
    if (command.includes('neet') || command.includes('jee') || command.includes('upsc') || command.includes('cat') || command.includes('exam')) {
      speak("PREPZR supports all major competitive exams including NEET, JEE, UPSC, CAT and many more. Our AI adapts to the specific requirements of your target exam. Would you like to start your free trial or analyze your readiness?");
      return true;
    }
    
    return false;
  };

  // Enhanced speech synthesis with correct PREPZR pronunciation
  const speak = (text: string) => {
    if (isMuted || location.pathname !== '/') return;
    
    // Stop any current speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Ensure correct PREPZR pronunciation - use "PREP ZR" for natural pronunciation
    const correctedText = text
      .replace(/PREPZR/gi, 'PREP ZR')
      .replace(/Prepzr/gi, 'PREP ZR')
      .replace(/prep-zr/gi, 'PREP ZR')
      .replace(/prepzr/gi, 'PREP ZR');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Configure voice settings for clarity and engagement
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') ||
      voice.name.includes('Microsoft') ||
      voice.name.includes('Natural') ||
      (voice.lang.includes('en-US') && (voice.name.includes('Female') || voice.name.includes('Zira')))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    utterance.lang = language;
    
    // Event handlers for intelligent phase progression
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      
      // Intelligent phase progression with smart timing
      if (location.pathname === '/' && !isMuted) {
        const nextPhase = getNextPhase();
        
        // Smart delay based on phase and user engagement
        let delay;
        switch (currentPhase) {
          case 'greeting':
            delay = 6000; // Give time to process welcome
            break;
          case 'features':
            delay = 8000; // Allow time to understand features
            break;
          case 'benefits':
            delay = 7000; // Time to consider benefits
            break;
          case 'cta':
            delay = 12000; // Longer pause before next interaction
            break;
          case 'navigation':
            delay = 10000; // Allow time for user to try commands
            break;
          default:
            delay = 20000; // Long pause for idle state
        }
        
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted && isActive) {
            setCurrentPhase(nextPhase);
            setPhaseCount(prev => prev + 1);
            
            // Only speak if not in idle or if it's been a while
            const timeSinceLastInteraction = Date.now() - lastInteraction;
            if (nextPhase !== 'idle' || timeSinceLastInteraction > 45000) {
              setTimeout(() => speak(getPhaseScript()), 1000);
            }
          }
        }, delay);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Initialize speech recognition with better error handling
  const initializeRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = language;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      // Restart recognition if still on home page and not muted
      if (location.pathname === '/' && !isMuted && isActive) {
        setTimeout(() => {
          if (recognitionRef.current && location.pathname === '/') {
            try {
              recognitionRef.current.start();
            } catch (error) {
              // Ignore errors if recognition is already starting
            }
          }
        }, 1000);
      }
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Voice command:', transcript);
      
      const handled = handleVoiceCommand(transcript);
      if (!handled) {
        // Smart response based on current phase
        if (currentPhase === 'idle') {
          speak("I'm here to help! You can say 'start free trial', 'analyze my readiness', 'tell me about features', or 'help' to see what I can do for you.");
        } else {
          speak("I'm listening! You can ask me about PREPZR features, start your trial, or get your readiness analyzed anytime.");
        }
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      // Don't restart immediately after certain errors
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setTimeout(() => {
          if (location.pathname === '/' && !isMuted && isActive) {
            initializeRecognition();
          }
        }, 3000);
      }
    };
    
    recognitionRef.current = recognition;
    return recognition;
  };

  // Start the voice assistant
  const startAssistant = () => {
    if (location.pathname !== '/') return;
    
    setIsActive(true);
    setHasSpoken(true);
    setCurrentPhase('greeting');
    setPhaseCount(0);
    setLastInteraction(Date.now());
    
    // Initialize recognition
    const recognition = initializeRecognition();
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
    
    // Start with greeting after a short delay
    timeoutRef.current = window.setTimeout(() => {
      if (!isMuted && location.pathname === '/') {
        speak(getPhaseScript());
      }
    }, 2000);
  };

  // Stop the voice assistant
  const stopAssistant = () => {
    setIsActive(false);
    setIsSpeaking(false);
    setIsListening(false);
    setCurrentPhase('greeting');
    setPhaseCount(0);
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
    }
    
    stopSpeaking();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
    }
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
  };

  // Handle page changes - stop immediately when leaving home page
  useEffect(() => {
    if (location.pathname !== '/') {
      stopAssistant();
    }
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAssistant();
    };
  }, []);

  // Auto-start after page load with intelligent delay
  useEffect(() => {
    if (location.pathname === '/' && !hasSpoken && !isMuted) {
      const autoStartTimer = setTimeout(() => {
        if (location.pathname === '/') { // Double check we're still on homepage
          startAssistant();
        }
      }, 3000);
      
      return () => clearTimeout(autoStartTimer);
    }
  }, [location.pathname, hasSpoken, isMuted]);

  // Track user interactions to adjust timing
  useEffect(() => {
    const handleUserInteraction = () => {
      setLastInteraction(Date.now());
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  if (location.pathname !== '/') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <div className="relative">
          {/* Main control button */}
          <motion.div
            className={`relative rounded-full p-4 shadow-lg cursor-pointer transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isActive ? stopAssistant() : startAssistant()}
          >
            {isSpeaking ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Volume2 className="w-6 h-6" />
              </motion.div>
            ) : isListening ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic className="w-6 h-6 text-red-500" />
              </motion.div>
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
            
            {/* Status indicator */}
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {/* Control panel */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-1"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
              
              {isSpeaking && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={stopSpeaking}
                  className="flex items-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </Button>
              )}
            </motion.div>
          )}
          
          {/* Speech indicator with phase info */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            >
              Speaking about PREPZR ({currentPhase})...
            </motion.div>
          )}
          
          {/* Listening indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            >
              Listening for commands...
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedHomePageVoiceAssistant;
