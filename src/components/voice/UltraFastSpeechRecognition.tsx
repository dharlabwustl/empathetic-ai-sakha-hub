
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
  const restartTimeoutRef = useRef<number | null>(null);
  
  // Enhanced homepage commands with more variations
  const homepageCommands = {
    // Authentication - More variations
    'sign up': () => navigate('/signup'),
    'signup': () => navigate('/signup'),
    'register': () => navigate('/signup'),
    'create account': () => navigate('/signup'),
    'join prepzr': () => navigate('/signup'),
    'get started': () => navigate('/signup'),
    'start now': () => navigate('/signup'),
    'login': () => navigate('/login'),
    'log in': () => navigate('/login'),
    'sign in': () => navigate('/login'),
    
    // Features and trials - Enhanced
    'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'test my readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'analyze readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'check readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'free trial': () => navigate('/signup?trial=true'),
    'start trial': () => navigate('/signup?trial=true'),
    'try free': () => navigate('/signup?trial=true'),
    'trial version': () => navigate('/signup?trial=true'),
    'scholarship': () => navigate('/scholarship'),
    'scholarship test': () => navigate('/scholarship'),
    'get scholarship': () => navigate('/scholarship'),
    
    // Navigation - Enhanced
    'dashboard': () => navigate('/dashboard/student'),
    'go to dashboard': () => navigate('/dashboard/student'),
    'home': () => navigate('/'),
    'homepage': () => navigate('/'),
    
    // Learning about PREPZR
    'what is prepzr': () => {
      if (onCommand) onCommand('explain_prepzr');
    },
    'tell me about prepzr': () => {
      if (onCommand) onCommand('explain_prepzr');
    },
    'how does prepzr work': () => {
      if (onCommand) onCommand('explain_how_it_works');
    },
    'pricing': () => {
      if (onCommand) onCommand('explain_pricing');
    },
    'plans': () => {
      if (onCommand) onCommand('explain_pricing');
    }
  };
  
  // Enhanced dashboard commands with more navigation options
  const dashboardCommands = {
    // Main sections - Enhanced
    'overview': () => navigate('/dashboard/student'),
    'dashboard': () => navigate('/dashboard/student'),
    'home dashboard': () => navigate('/dashboard/student'),
    'study plan': () => navigate('/dashboard/student/study-plan'),
    'my study plan': () => navigate('/dashboard/student/study-plan'),
    'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
    'advisor': () => navigate('/dashboard/student/academic-advisor'),
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'exam syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
    'past papers': () => navigate('/dashboard/student/previous-year-papers'),
    'concept cards': () => navigate('/dashboard/student/concept-cards'),
    'concepts': () => navigate('/dashboard/student/concept-cards'),
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'practice exam': () => navigate('/dashboard/student/practice-exams'),
    'practice exams': () => navigate('/dashboard/student/practice-exams'),
    'mock test': () => navigate('/dashboard/student/practice-exams'),
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'ai tutor': () => navigate('/dashboard/student/ai-tutor'),
    'profile': () => navigate('/dashboard/student/profile'),
    'settings': () => navigate('/dashboard/student/profile'),
    'notifications': () => navigate('/dashboard/student/notifications'),
    'subscription': () => navigate('/dashboard/student/subscription'),
    
    // Subjects - Enhanced
    'physics': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology': () => navigate('/dashboard/student/concept-cards/biology'),
    'mathematics': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'math': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'maths': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Study actions - New
    'start studying': () => {
      if (onCommand) onCommand('start_study_session');
    },
    'continue studying': () => {
      if (onCommand) onCommand('continue_study');
    },
    'take a break': () => {
      if (onCommand) onCommand('take_break');
    },
    'show progress': () => {
      if (onCommand) onCommand('show_progress');
    },
    'my progress': () => {
      if (onCommand) onCommand('show_progress');
    },
    
    // Quick actions - Enhanced
    'logout': () => {
      localStorage.clear();
      navigate('/');
    },
    'log out': () => {
      localStorage.clear();
      navigate('/');
    },
    'home page': () => navigate('/'),
    'go home': () => navigate('/'),
  };

  const initSpeechRecognition = () => {
    if (!enabled || (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window))) {
      console.warn('Speech recognition not supported or disabled');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Ultra-smooth settings for instant response
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 5;
    
    // Reduce delays for smoother experience
    recognition.onstart = () => {
      setIsListening(true);
      onListeningChange?.(true);
      
      // Immediately stop any ongoing speech
      if (onStopSpeaking) {
        onStopSpeaking();
      }
      
      console.log('🎤 Ultra-smooth speech recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      onListeningChange?.(false);
      console.log('🎤 Speech recognition ended');
      
      // Smart auto-restart only if continuous mode and not manual
      if (continuous && enabled && !manualActivation) {
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }
        restartTimeoutRef.current = window.setTimeout(() => {
          try {
            if (recognitionRef.current && enabled) {
              recognition.start();
            }
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 300); // Reduced delay for smoother experience
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      onListeningChange?.(false);
      
      // Smart error recovery
      if (continuous && enabled && event.error !== 'aborted' && !manualActivation) {
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }
        restartTimeoutRef.current = window.setTimeout(() => {
          try {
            if (recognitionRef.current && enabled) {
              initSpeechRecognition();
              recognition.start();
            }
          } catch (error) {
            console.log('Recognition restart after error failed:', error);
          }
        }, 1000);
      }
    };

    recognition.onresult = (event: any) => {
      const results = Array.from(event.results);
      
      // Ultra-fast processing with improved confidence thresholds
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        // Process high-confidence interim results for instant response
        if (confidence > 0.85 && transcript.length > 2) {
          processCommand(transcript);
        }
        
        // Process final results with lower confidence threshold
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
    
    // Enhanced debouncing with shorter timeouts
    if (processedCommandsRef.current.has(command) || command.length < 2) {
      return;
    }
    
    // Add to processed commands with shorter cleanup
    processedCommandsRef.current.add(command);
    setTimeout(() => {
      processedCommandsRef.current.delete(command);
    }, 1500); // Reduced from 2000ms
    
    console.log('🗣️ Ultra-smooth processing command:', command);
    
    // Get current page commands
    const isHomePage = location.pathname === '/';
    const commandMap = isHomePage ? homepageCommands : dashboardCommands;
    
    // Try exact match first for instant response
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
    
    // Enhanced fuzzy matching for better flexibility
    for (const [key, action] of Object.entries(commandMap)) {
      // Check if command contains key or key contains main word from command
      const commandWords = command.split(' ');
      const keyWords = key.split(' ');
      
      // Match if any significant word overlaps
      const hasMatch = commandWords.some(word => 
        word.length > 2 && (key.includes(word) || keyWords.some(kw => kw.includes(word)))
      ) || keyWords.some(word => 
        word.length > 2 && command.includes(word)
      );
      
      if (hasMatch) {
        console.log('✅ Executing fuzzy command match:', key);
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
    
    // If no match found, still call the callback for custom handling
    if (onCommand) onCommand(command);
  };

  const startListening = () => {
    if (!enabled || !recognitionRef.current || isListening) {
      return;
    }
    
    // Immediately stop any ongoing speech
    if (onStopSpeaking) {
      onStopSpeaking();
    }
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      // Try to reinitialize and start again
      initSpeechRecognition();
      setTimeout(() => {
        try {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }, 100);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (enabled) {
      initSpeechRecognition();
      
      // Start listening automatically only if continuous and not manual
      if (continuous && !manualActivation) {
        setTimeout(startListening, 500); // Reduced delay
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [language, continuous, enabled, manualActivation]);

  // Smooth page change handling
  useEffect(() => {
    if (recognitionRef.current && continuous && enabled && !manualActivation) {
      recognitionRef.current.abort();
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      
      setTimeout(() => {
        initSpeechRecognition();
        startListening();
      }, 300); // Reduced delay for smoother transitions
    }
  }, [location.pathname]);

  // Enhanced manual control with instant response
  useEffect(() => {
    const handleStartListening = () => {
      console.log('🎤 Manual start listening triggered');
      startListening();
    };
    
    const handleStopListening = () => {
      console.log('🎤 Manual stop listening triggered');
      stopListening();
    };
    
    window.addEventListener('start-voice-recognition', handleStartListening);
    window.addEventListener('stop-voice-recognition', handleStopListening);
    
    return () => {
      window.removeEventListener('start-voice-recognition', handleStartListening);
      window.removeEventListener('stop-voice-recognition', handleStopListening);
    };
  }, []);

  // Expose enhanced control methods
  useEffect(() => {
    (window as any).speechRecognitionControl = {
      start: startListening,
      stop: stopListening,
      isListening,
      restart: () => {
        stopListening();
        setTimeout(startListening, 200);
      }
    };
  }, [isListening]);

  return null;
};

export default UltraFastSpeechRecognition;
