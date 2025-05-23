
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
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'features' | 'cta' | 'explore' | 'benefits' | 'idle'>('welcome');
  const [phaseCount, setPhaseCount] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);

  // Enhanced welcome scripts with correct pronunciation and intelligent phases
  const getWelcomeScript = () => {
    const scripts = {
      welcome: `Welcome to PREP ZR! I'm your AI learning companion. PREP ZR is the world's first emotionally aware exam preparation platform that understands not just what you study, but how you feel while studying.`,
      
      features: `Our AI technology adapts to your unique learning style and emotional state. We offer personalized study plans, real-time performance analysis, and instant feedback. You get access to thousands of practice questions, interactive simulations, and video tutorials designed specifically for competitive exams.`,
      
      benefits: `With PREP ZR, you'll experience stress-free learning, build unshakeable confidence, save valuable time with efficient study methods, and enjoy a happier learning journey. Our platform is designed to make exam preparation feel less overwhelming and more achievable.`,
      
      explore: `You can explore different features like our AI exam readiness analyzer, which creates a personalized study plan based on your current knowledge level. We also have interactive concept cards, 3D simulations, and a supportive community of fellow students.`,
      
      cta: `Ready to transform your exam preparation? You can start your 7-day free trial right now to experience everything PREP ZR has to offer. Just say "start free trial", "sign up", or "analyze my readiness" and I'll help you get started immediately.`,
      
      idle: `I'm here to help you explore PREP ZR. You can ask me about specific features, start your free trial, analyze your exam readiness, or learn more about how our AI can help you succeed. What would you like to know?`
    };
    
    return scripts[currentPhase];
  };

  // Intelligent phase progression
  const getNextPhase = () => {
    const phaseOrder = ['welcome', 'features', 'benefits', 'explore', 'cta', 'idle'];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      return phaseOrder[currentIndex + 1] as typeof currentPhase;
    }
    
    // After completing all phases, cycle through key messages
    const cyclicPhases = ['features', 'cta', 'benefits'];
    return cyclicPhases[phaseCount % cyclicPhases.length] as typeof currentPhase;
  };

  // Voice commands handler with improved responses
  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('start free trial') || command.includes('free trial') || command.includes('sign up') || command.includes('signup')) {
      speak("Excellent choice! Let me take you to the sign-up page where you can start your 7-day free trial and experience the full power of PREP ZR.");
      setTimeout(() => navigate('/signup'), 2000);
      return true;
    }
    
    if (command.includes('analyze') || command.includes('exam readiness') || command.includes('readiness') || command.includes('assessment')) {
      speak("Great decision! I'll open our AI-powered exam readiness analyzer. This will evaluate your current knowledge and create a personalized study plan just for you.");
      setTimeout(() => {
        const event = new CustomEvent('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 2000);
      return true;
    }
    
    if (command.includes('features') || command.includes('what can') || command.includes('tell me more') || command.includes('how does')) {
      setCurrentPhase('features');
      speak("Let me tell you about PREP ZR's amazing features. " + getWelcomeScript());
      return true;
    }
    
    if (command.includes('benefits') || command.includes('why prep') || command.includes('advantages')) {
      setCurrentPhase('benefits');
      speak("Here are the key benefits of using PREP ZR. " + getWelcomeScript());
      return true;
    }
    
    if (command.includes('login') || command.includes('log in')) {
      speak("Taking you to the login page. You can use your existing account or try our demo login to explore PREP ZR.");
      setTimeout(() => navigate('/login'), 2000);
      return true;
    }
    
    if (command.includes('stop') || command.includes('quiet') || command.includes('mute') || command.includes('silence')) {
      setIsMuted(true);
      stopSpeaking();
      speak("I'll be quiet now. Click the volume button whenever you want me to speak again.");
      return true;
    }
    
    if (command.includes('repeat') || command.includes('say again') || command.includes('once more')) {
      speak(getWelcomeScript());
      return true;
    }
    
    if (command.includes('help') || command.includes('commands') || command.includes('what can you do')) {
      speak("I can help you start a free trial, analyze your exam readiness, explain PREP ZR features, or take you to the login page. Just speak naturally and I'll understand!");
      return true;
    }
    
    return false;
  };

  // Enhanced speech synthesis with correct pronunciation
  const speak = (text: string) => {
    if (isMuted || location.pathname !== '/') return;
    
    // Stop any current speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Create new utterance with correct PREPZR pronunciation
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
      (voice.lang.includes('en-US') && voice.name.includes('Female'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    utterance.lang = language;
    
    // Event handlers for intelligent phase progression
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      
      // Intelligent phase progression with proper timing
      if (location.pathname === '/' && !isMuted) {
        const nextPhase = getNextPhase();
        const delay = currentPhase === 'welcome' ? 4000 : 
                     currentPhase === 'features' ? 6000 : 
                     currentPhase === 'benefits' ? 5000 : 
                     currentPhase === 'explore' ? 7000 : 
                     currentPhase === 'cta' ? 15000 : 30000; // Longer delay for idle phase
        
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted && isActive) {
            setCurrentPhase(nextPhase);
            setPhaseCount(prev => prev + 1);
            
            // Don't immediately speak the next phase if we're in idle
            if (nextPhase !== 'idle') {
              setTimeout(() => speak(getWelcomeScript()), 1000);
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
        if (currentPhase === 'idle') {
          speak("I didn't quite understand that. You can ask me about PREP ZR features, start a free trial, analyze your exam readiness, or just say 'help' to see what I can do.");
        } else {
          speak("I'm listening! You can ask me about features, start a trial, or analyze your readiness anytime.");
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
    setCurrentPhase('welcome');
    setPhaseCount(0);
    
    // Initialize recognition
    const recognition = initializeRecognition();
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
    
    // Start with welcome message after a short delay
    timeoutRef.current = window.setTimeout(() => {
      if (!isMuted && location.pathname === '/') {
        speak(getWelcomeScript());
      }
    }, 2000);
  };

  // Stop the voice assistant
  const stopAssistant = () => {
    setIsActive(false);
    setIsSpeaking(false);
    setIsListening(false);
    setCurrentPhase('welcome');
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

  // Auto-start after page load with delay
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
          
          {/* Speech indicator */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            >
              Speaking about PREP ZR...
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
