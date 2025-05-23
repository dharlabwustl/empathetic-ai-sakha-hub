
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, Pause, Settings } from 'lucide-react';
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
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'features' | 'benefits' | 'cta' | 'idle'>('welcome');
  const [lastPhaseTime, setLastPhaseTime] = useState<number>(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);

  // Intelligent content script with proper PREPZR pronunciation
  const getIntelligentScript = () => {
    const scripts = {
      welcome: `Welcome to PREP ZR! I'm Sakha AI, your intelligent learning companion. PREP ZR is the world's first emotionally aware exam preparation platform that understands not just what you study, but how you feel while studying.`,
      
      features: `Let me highlight our unique features: We offer personalized study plans that adapt to your mood and learning style. Our AI provides real-time performance analysis with instant feedback. You get access to thousands of practice questions, interactive simulations, and stress-free learning approaches.`,
      
      benefits: `Here's how PREP ZR transforms your preparation: Build unshakeable confidence with our emotional support system. Save precious time with AI-driven personalized paths. Achieve exam success through our proven methodology. Experience stress-free learning that adapts to your emotional state.`,
      
      cta: `Ready to begin your success journey? You can start your 7-day free trial right now, or let me analyze your exam readiness to create your personalized study plan. Just say "start free trial", "analyze readiness", or "sign up" and I'll guide you through the process.`,
      
      idle: `I'm here to help you discover PREP ZR's powerful features. You can ask me about our AI-driven personalization, start your free trial, or analyze your exam readiness. What would you like to explore?`
    };
    
    return scripts[currentPhase];
  };

  // Enhanced voice commands handler
  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('start free trial') || command.includes('free trial') || command.includes('sign up')) {
      speak("Excellent choice! Taking you to our sign-up page where you can start your 7-day free trial and experience PREP ZR's intelligent learning system.");
      setTimeout(() => navigate('/signup'), 2000);
      return true;
    }
    
    if (command.includes('analyze') || command.includes('exam readiness') || command.includes('readiness')) {
      speak("Great decision! I'll open our advanced exam readiness analyzer to assess your current preparation level and create your personalized study roadmap.");
      setTimeout(() => {
        const event = new CustomEvent('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 2000);
      return true;
    }
    
    if (command.includes('features') || command.includes('what can') || command.includes('tell me more')) {
      setCurrentPhase('features');
      speak(getIntelligentScript());
      return true;
    }
    
    if (command.includes('benefits') || command.includes('how does') || command.includes('help me')) {
      setCurrentPhase('benefits');
      speak(getIntelligentScript());
      return true;
    }
    
    if (command.includes('login') || command.includes('log in')) {
      speak("Taking you to the login page. You can access your existing account or try our demo to experience PREP ZR instantly.");
      setTimeout(() => navigate('/login'), 2000);
      return true;
    }
    
    if (command.includes('stop') || command.includes('quiet') || command.includes('mute')) {
      setIsMuted(true);
      stopSpeaking();
      speak("I'll be quiet now. Click the volume button anytime to reactivate me.");
      return true;
    }
    
    if (command.includes('repeat') || command.includes('say again')) {
      speak(getIntelligentScript());
      return true;
    }
    
    return false;
  };

  // Enhanced speech synthesis with proper pronunciation
  const speak = (text: string) => {
    if (isMuted || location.pathname !== '/') return;
    
    // Stop any current speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Create new utterance with proper PREPZR pronunciation
    const utterance = new SpeechSynthesisUtterance(
      text.replace(/PREPZR/gi, 'PREP ZR').replace(/Prepzr/g, 'PREP ZR')
    );
    
    // Configure voice settings for clarity
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Samantha') ||
      voice.lang.includes('en-US')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.85; // Slightly slower for clarity
    utterance.pitch = 1.0;  // Natural pitch
    utterance.volume = 0.8;
    utterance.lang = language;
    
    // Event handlers for intelligent phase progression
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setLastPhaseTime(Date.now());
      
      // Intelligent phase progression with delays
      if (currentPhase === 'welcome') {
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted && Date.now() - lastPhaseTime > 8000) {
            setCurrentPhase('features');
            setTimeout(() => speak(getIntelligentScript()), 1500);
          }
        }, 5000);
      } else if (currentPhase === 'features') {
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted && Date.now() - lastPhaseTime > 10000) {
            setCurrentPhase('benefits');
            setTimeout(() => speak(getIntelligentScript()), 2000);
          }
        }, 6000);
      } else if (currentPhase === 'benefits') {
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted && Date.now() - lastPhaseTime > 12000) {
            setCurrentPhase('cta');
            setTimeout(() => speak(getIntelligentScript()), 2500);
          }
        }, 8000);
      } else if (currentPhase === 'cta') {
        setCurrentPhase('idle');
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

  // Initialize speech recognition
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
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 1500);
      }
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Voice command:', transcript);
      
      const handled = handleVoiceCommand(transcript);
      if (!handled && currentPhase === 'idle') {
        speak("I didn't quite catch that. You can ask me about PREP ZR features, start a free trial, or analyze your exam readiness. How can I assist you?");
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    return recognition;
  };

  // Start the voice assistant
  const startAssistant = () => {
    if (location.pathname !== '/') return;
    
    setIsActive(true);
    setHasSpoken(true);
    
    // Initialize recognition
    const recognition = initializeRecognition();
    if (recognition) {
      recognition.start();
    }
    
    // Start with welcome message
    timeoutRef.current = window.setTimeout(() => {
      if (!isMuted && location.pathname === '/') {
        speak(getIntelligentScript());
      }
    }, 1500);
  };

  // Stop the voice assistant
  const stopAssistant = () => {
    setIsActive(false);
    setIsSpeaking(false);
    setIsListening(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    stopSpeaking();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
    }
  };

  // Handle page changes
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

  // Auto-start after page load
  useEffect(() => {
    if (location.pathname === '/' && !hasSpoken && !isMuted) {
      const autoStartTimer = setTimeout(() => {
        startAssistant();
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
              className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded"
            >
              Speaking about PREP-ZR...
            </motion.div>
          )}
          
          {/* Listening indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded"
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
