
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
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'features' | 'cta' | 'idle'>('welcome');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);

  // Enhanced welcome script with PREPZR features
  const getWelcomeScript = () => {
    const scripts = {
      welcome: `Welcome to PREP-ZR! I'm your AI learning companion. PREP-ZR is the world's first emotionally aware exam preparation platform that understands not just what you study, but how you feel while studying.`,
      
      features: `Let me tell you about our key features: We offer personalized study plans that adapt to your mood and learning style. Our AI analyzes your performance in real-time and provides instant feedback. You get access to thousands of practice questions, video tutorials, and interactive simulations. Plus, our stress-free learning approach helps you build confidence while preparing for exams like NEET, JEE, UPSC, and CAT.`,
      
      cta: `Ready to transform your exam preparation? You can start your 7-day free trial right now, or let me analyze your exam readiness to create a personalized study plan. Just say "start free trial", "analyze readiness", or "sign up" and I'll help you get started. You can also ask me about any specific features you'd like to know more about.`,
      
      idle: `I'm here whenever you need help. You can ask me about PREP-ZR features, start your free trial, or analyze your exam readiness. Just speak to me anytime!`
    };
    
    return scripts[currentPhase];
  };

  // Voice commands handler
  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('start free trial') || command.includes('free trial') || command.includes('sign up')) {
      speak("Perfect! Let me take you to the sign-up page where you can start your 7-day free trial.");
      setTimeout(() => navigate('/signup'), 2000);
      return true;
    }
    
    if (command.includes('analyze') || command.includes('exam readiness') || command.includes('readiness')) {
      speak("Excellent choice! I'll open the exam readiness analyzer to create your personalized study plan.");
      setTimeout(() => {
        const event = new CustomEvent('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 2000);
      return true;
    }
    
    if (command.includes('features') || command.includes('what can') || command.includes('tell me more')) {
      setCurrentPhase('features');
      speak(getWelcomeScript());
      return true;
    }
    
    if (command.includes('login') || command.includes('log in')) {
      speak("Taking you to the login page. You can use your existing account or try our demo login.");
      setTimeout(() => navigate('/login'), 2000);
      return true;
    }
    
    if (command.includes('stop') || command.includes('quiet') || command.includes('mute')) {
      setIsMuted(true);
      stopSpeaking();
      speak("I'll be quiet now. Click the volume button if you want me to speak again.");
      return true;
    }
    
    if (command.includes('repeat') || command.includes('say again')) {
      speak(getWelcomeScript());
      return true;
    }
    
    return false;
  };

  // Enhanced speech synthesis
  const speak = (text: string) => {
    if (isMuted || location.pathname !== '/') return;
    
    // Stop any current speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Create new utterance with PREPZR pronunciation fix
    const utterance = new SpeechSynthesisUtterance(
      text.replace(/PREPZR/gi, 'PREP-ZR').replace(/Prepzr/g, 'PREP-ZR')
    );
    
    // Configure voice settings
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Zira') ||
      voice.lang.includes('en-US')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    utterance.lang = language;
    
    // Event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (currentPhase === 'welcome') {
        // Move to features phase after welcome
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted) {
            setCurrentPhase('features');
            setTimeout(() => speak(getWelcomeScript()), 1000);
          }
        }, 3000);
      } else if (currentPhase === 'features') {
        // Move to CTA phase after features
        phaseTimeoutRef.current = window.setTimeout(() => {
          if (location.pathname === '/' && !isMuted) {
            setCurrentPhase('cta');
            setTimeout(() => speak(getWelcomeScript()), 2000);
          }
        }, 4000);
      } else if (currentPhase === 'cta') {
        // Go to idle after CTA
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
        }, 1000);
      }
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log('Voice command:', transcript);
      
      const handled = handleVoiceCommand(transcript);
      if (!handled && currentPhase === 'idle') {
        speak("I didn't quite understand that. You can ask me about PREP-ZR features, start a free trial, or analyze your exam readiness.");
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
              Speaking about PREPZR...
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
