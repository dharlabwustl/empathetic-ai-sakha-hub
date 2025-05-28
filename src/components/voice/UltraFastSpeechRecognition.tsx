
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UltraFastSpeechRecognitionProps {
  onCommand?: (command: string) => void;
  onListeningChange?: (isListening: boolean) => void;
  onStopSpeaking?: () => void;
  language?: string;
  continuous?: boolean;
  enabled?: boolean;
  manualActivation?: boolean;
}

const UltraFastSpeechRecognition: React.FC<UltraFastSpeechRecognitionProps> = ({
  onCommand,
  onListeningChange,
  onStopSpeaking,
  language = 'en-US',
  continuous = true,
  enabled = true,
  manualActivation = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const processedCommandsRef = useRef<Set<string>>(new Set());
  
  // Homepage commands
  const homepageCommands = {
    // Authentication
    'sign up': () => navigate('/signup'),
    'signup': () => navigate('/signup'),
    'register': () => navigate('/signup'),
    'create account': () => navigate('/signup'),
    'login': () => navigate('/login'),
    'log in': () => navigate('/login'),
    'sign in': () => navigate('/sign-in'),
    
    // Features and trials
    'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'free trial': () => navigate('/signup?trial=true'),
    'start trial': () => navigate('/signup?trial=true'),
    'try free': () => navigate('/signup?trial=true'),
    'scholarship': () => navigate('/scholarship'),
    
    // Navigation
    'dashboard': () => navigate('/dashboard/student'),
    'home': () => navigate('/'),
  };
  
  // Dashboard commands
  const dashboardCommands = {
    // Main sections
    'overview': () => navigate('/dashboard/student'),
    'study plan': () => navigate('/dashboard/student/study-plan'),
    'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
    'concept cards': () => navigate('/dashboard/student/concept-cards'),
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'practice exam': () => navigate('/dashboard/student/practice-exams'),
    'mock test': () => navigate('/dashboard/student/practice-exams'),
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'profile': () => navigate('/dashboard/student/profile'),
    'notifications': () => navigate('/dashboard/student/notifications'),
    'subscription': () => navigate('/dashboard/student/subscription'),
    
    // Subjects
    'physics': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology': () => navigate('/dashboard/student/concept-cards/biology'),
    'mathematics': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'math': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Quick actions
    'logout': () => {
      localStorage.clear();
      navigate('/');
    },
    'home page': () => navigate('/'),
  };

  const initSpeechRecognition = () => {
    if (!enabled || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Ultra-fast settings for quick response
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 5;
    
    recognition.onstart = () => {
      setIsListening(true);
      onListeningChange?.(true);
      
      // Stop any ongoing speech when user starts speaking
      if (onStopSpeaking) {
        onStopSpeaking();
      }
      
      console.log('🎤 Ultra-fast speech recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      onListeningChange?.(false);
      console.log('🎤 Speech recognition ended');
      
      // Only auto-restart if continuous mode and not manual activation
      if (continuous && enabled && !manualActivation) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 500);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      onListeningChange?.(false);
      
      // Restart on error only if not manual activation
      if (continuous && enabled && event.error !== 'aborted' && !manualActivation) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart after error failed:', error);
          }
        }, 1000);
      }
    };

    recognition.onresult = (event: any) => {
      const results = Array.from(event.results);
      
      // Process results with ultra-fast 100ms batch processing
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        // Ultra-fast processing: Process high-confidence interim results immediately
        if (confidence > 0.8 && transcript.length > 2) {
          processCommand(transcript);
        }
        
        // Also process final results
        if (result.isFinal && confidence > 0.6) {
          processCommand(transcript);
          setLastCommand(transcript);
        }
      }
    };

    recognitionRef.current = recognition;
  };

  const processCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    
    // Prevent processing the same command repeatedly with debouncing
    if (processedCommandsRef.current.has(command) || command.length < 2) {
      return;
    }
    
    // Add to processed commands with timeout cleanup
    processedCommandsRef.current.add(command);
    setTimeout(() => {
      processedCommandsRef.current.delete(command);
    }, 2000);
    
    console.log('🗣️ Ultra-fast processing command:', command);
    
    // Get current page commands
    const isHomePage = location.pathname === '/';
    const commandMap = isHomePage ? homepageCommands : dashboardCommands;
    
    // Try exact match first for ultra-fast response
    if (commandMap[command]) {
      console.log('✅ Executing exact command:', command);
      commandMap[command]();
      
      toast({
        title: "Voice Command Executed",
        description: `Executing: ${command}`,
        duration: 1500,
      });
      
      if (onCommand) onCommand(command);
      return;
    }
    
    // Intelligent partial matching for faster responses
    for (const [key, action] of Object.entries(commandMap)) {
      if (command.includes(key) || key.includes(command.split(' ')[0])) {
        console.log('✅ Executing partial command match:', key);
        action();
        
        toast({
          title: "Voice Command Executed",
          description: `Executing: ${key}`,
          duration: 1500,
        });
        
        if (onCommand) onCommand(key);
        return;
      }
    }
    
    // If no match found, still call the callback
    if (onCommand) onCommand(command);
  };

  const startListening = () => {
    if (!enabled || !recognitionRef.current || isListening) {
      return;
    }
    
    // Stop any ongoing speech before starting to listen
    if (onStopSpeaking) {
      onStopSpeaking();
    }
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    if (enabled) {
      initSpeechRecognition();
      
      // Only start listening automatically if not manual activation and continuous mode
      if (continuous && !manualActivation) {
        setTimeout(startListening, 1000);
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, continuous, enabled, manualActivation]);

  // Restart recognition when page changes (only for continuous mode)
  useEffect(() => {
    if (recognitionRef.current && continuous && enabled && !manualActivation) {
      recognitionRef.current.abort();
      setTimeout(() => {
        initSpeechRecognition();
        startListening();
      }, 500);
    }
  }, [location.pathname]);

  // Expose start/stop methods
  useEffect(() => {
    const handleStartListening = () => startListening();
    const handleStopListening = () => stopListening();
    
    window.addEventListener('start-voice-recognition', handleStartListening);
    window.addEventListener('stop-voice-recognition', handleStopListening);
    
    return () => {
      window.removeEventListener('start-voice-recognition', handleStartListening);
      window.removeEventListener('stop-voice-recognition', handleStopListening);
    };
  }, []);

  // Expose manual control methods
  useEffect(() => {
    (window as any).speechRecognitionControl = {
      start: startListening,
      stop: stopListening,
      isListening
    };
  }, [isListening]);

  return null;
};

export default UltraFastSpeechRecognition;
