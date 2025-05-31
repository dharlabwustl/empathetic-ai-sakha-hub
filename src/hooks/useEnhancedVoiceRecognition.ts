
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecognitionOptions {
  continuous?: boolean;
  language?: string;
  onCommand?: (command: string) => void;
  onTranscript?: (transcript: string) => void;
}

export const useEnhancedVoiceRecognition = (options: VoiceRecognitionOptions = {}) => {
  const {
    continuous = true,
    language = 'en-US',
    onCommand,
    onTranscript
  } = options;

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Context-aware commands based on current page
  const getContextCommands = () => {
    const currentPath = location.pathname;
    
    // Homepage commands
    if (currentPath === '/') {
      return {
        'sign up': () => navigate('/signup'),
        'login': () => navigate('/login'),
        'start trial': () => navigate('/signup?trial=true'),
        'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
        'features': () => document.querySelector('[data-feature-section]')?.scrollIntoView({ behavior: 'smooth' }),
        'testimonials': () => document.querySelector('[data-testimonials]')?.scrollIntoView({ behavior: 'smooth' }),
        'pricing': () => document.querySelector('[data-pricing]')?.scrollIntoView({ behavior: 'smooth' })
      };
    }

    // Dashboard commands
    if (currentPath.includes('/dashboard')) {
      return {
        // Main navigation
        'dashboard': () => navigate('/dashboard/student'),
        'overview': () => navigate('/dashboard/student'),
        'study plan': () => navigate('/dashboard/student/study-plan'),
        'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
        'exam syllabus': () => navigate('/dashboard/student/exam-syllabus'),
        'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
        'concept cards': () => navigate('/dashboard/student/concept-cards'),
        'flashcards': () => navigate('/dashboard/student/flashcards'),
        'practice exams': () => navigate('/dashboard/student/practice-exams'),
        'ai tutor': () => navigate('/dashboard/student/ai-tutor'),
        'feel good corner': () => navigate('/dashboard/student/feel-good-corner'),
        'profile': () => navigate('/dashboard/student/profile'),
        'notifications': () => navigate('/dashboard/student/notifications'),
        'subscription': () => navigate('/dashboard/student/subscription'),
        
        // Subject-specific commands
        'physics': () => {
          if (currentPath.includes('concept-cards')) navigate('/dashboard/student/concept-cards/physics');
          else if (currentPath.includes('flashcards')) navigate('/dashboard/student/flashcards/physics');
          else if (currentPath.includes('practice-exams')) navigate('/dashboard/student/practice-exams/physics');
          else toast({ title: "Voice Command", description: "Physics section available in concept cards, flashcards, or practice exams" });
        },
        'chemistry': () => {
          if (currentPath.includes('concept-cards')) navigate('/dashboard/student/concept-cards/chemistry');
          else if (currentPath.includes('flashcards')) navigate('/dashboard/student/flashcards/chemistry');
          else if (currentPath.includes('practice-exams')) navigate('/dashboard/student/practice-exams/chemistry');
          else toast({ title: "Voice Command", description: "Chemistry section available in concept cards, flashcards, or practice exams" });
        },
        'biology': () => {
          if (currentPath.includes('concept-cards')) navigate('/dashboard/student/concept-cards/biology');
          else if (currentPath.includes('flashcards')) navigate('/dashboard/student/flashcards/biology');
          else if (currentPath.includes('practice-exams')) navigate('/dashboard/student/practice-exams/biology');
          else toast({ title: "Voice Command", description: "Biology section available in concept cards, flashcards, or practice exams" });
        },
        'mathematics': () => {
          if (currentPath.includes('concept-cards')) navigate('/dashboard/student/concept-cards/mathematics');
          else if (currentPath.includes('flashcards')) navigate('/dashboard/student/flashcards/mathematics');
          else if (currentPath.includes('practice-exams')) navigate('/dashboard/student/practice-exams/mathematics');
          else toast({ title: "Voice Command", description: "Mathematics section available in concept cards, flashcards, or practice exams" });
        },
        
        // Study actions
        'start studying': () => {
          if (currentPath.includes('/dashboard/student')) {
            document.querySelector('[data-study-action]')?.click();
          } else {
            navigate('/dashboard/student');
          }
        },
        'take exam': () => navigate('/dashboard/student/practice-exams/take'),
        'create flashcard': () => {
          if (currentPath.includes('flashcards')) {
            document.querySelector('[data-create-flashcard]')?.click();
          } else {
            navigate('/dashboard/student/flashcards');
          }
        },
        'mood tracker': () => {
          document.querySelector('[data-mood-tracker]')?.click();
        },
        
        // Quick help
        'help': () => toast({ 
          title: "Voice Commands", 
          description: "Try saying: study plan, ai tutor, physics, take exam, mood tracker, or any section name" 
        }),
        'logout': () => {
          localStorage.clear();
          navigate('/');
        }
      };
    }

    return {};
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    const commands = getContextCommands();
    
    // Try exact match first
    if (commands[lowerCommand]) {
      commands[lowerCommand]();
      toast({
        title: "Voice Command Executed",
        description: `Executing: ${lowerCommand}`,
        duration: 2000,
      });
      return true;
    }
    
    // Try partial matches with better scoring
    const matches = Object.keys(commands).filter(key => 
      key.includes(lowerCommand) || 
      lowerCommand.includes(key) ||
      key.split(' ').some(word => lowerCommand.includes(word))
    );
    
    if (matches.length > 0) {
      // Pick the best match (shortest key that contains the command)
      const bestMatch = matches.reduce((best, current) => 
        current.length < best.length ? current : best
      );
      
      commands[bestMatch]();
      toast({
        title: "Voice Command Executed",
        description: `Executing: ${bestMatch}`,
        duration: 2000,
      });
      return true;
    }
    
    // If on AI tutor page, pass command to chat
    if (location.pathname.includes('ai-tutor') && onCommand) {
      onCommand(command);
      return true;
    }
    
    // Fallback suggestions
    const suggestions = Object.keys(commands).slice(0, 3);
    if (suggestions.length > 0) {
      toast({
        title: "Command not recognized",
        description: `Try: ${suggestions.join(', ')}`,
        duration: 3000,
      });
    }
    
    return false;
  };

  const initRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 3;
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Enhanced voice recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🎤 Enhanced voice recognition ended');
      
      // Auto-restart if continuous
      if (continuous) {
        timeoutRef.current = setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 1000);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Enhanced speech recognition error:', event.error);
      setIsListening(false);
      
      if (continuous && event.error !== 'aborted') {
        timeoutRef.current = setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart after error failed:', error);
          }
        }, 2000);
      }
    };

    recognition.onresult = (event: any) => {
      const results = Array.from(event.results);
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        
        if (result.isFinal) {
          finalTranscript += transcript;
          
          // Process command if confidence is high enough
          if (confidence > 0.7) {
            const success = processCommand(transcript);
            if (success && onCommand) {
              onCommand(transcript);
            }
          }
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        if (onTranscript) {
          onTranscript(finalTranscript);
        }
      }
    };

    recognitionRef.current = recognition;
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    initRecognition();
    
    return () => {
      stopListening();
    };
  }, [language, continuous]);

  // Restart recognition when page changes
  useEffect(() => {
    if (recognitionRef.current && continuous) {
      stopListening();
      setTimeout(() => {
        initRecognition();
        if (continuous) startListening();
      }, 500);
    }
  }, [location.pathname]);

  return {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    processCommand
  };
};
