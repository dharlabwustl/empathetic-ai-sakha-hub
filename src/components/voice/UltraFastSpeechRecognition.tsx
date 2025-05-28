
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UltraFastSpeechRecognitionProps {
  onCommand?: (command: string) => void;
  language?: string;
  continuous?: boolean;
  onMicrophoneClick?: () => void;
}

const UltraFastSpeechRecognition: React.FC<UltraFastSpeechRecognitionProps> = ({
  onCommand,
  language = 'en-US',
  continuous = true,
  onMicrophoneClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const batchTimeoutRef = useRef<number | null>(null);
  const commandBufferRef = useRef<string>('');
  
  // Homepage commands with ultra-fast partial matching
  const homepageCommands = {
    // Authentication - quick triggers
    'sign': () => navigate('/signup'),
    'signup': () => navigate('/signup'),
    'register': () => navigate('/signup'),
    'create': () => navigate('/signup'),
    'login': () => navigate('/login'),
    'log': () => navigate('/login'),
    
    // Features - immediate response
    'exam': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'analyze': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    
    // Free trial - instant trigger
    'free': () => navigate('/signup?trial=true'),
    'trial': () => navigate('/signup?trial=true'),
    
    // Navigation - fast response
    'dashboard': () => navigate('/dashboard/student'),
    'home': () => navigate('/'),
  };
  
  // Dashboard commands with comprehensive coverage
  const dashboardCommands = {
    // Main sections
    'overview': () => navigate('/dashboard/student'),
    'today': () => navigate('/dashboard/student'),
    'daily': () => navigate('/dashboard/student'),
    'plan': () => navigate('/dashboard/student/study-plan'),
    'study': () => navigate('/dashboard/student/study-plan'),
    'schedule': () => navigate('/dashboard/student/study-plan'),
    
    // Academic features
    'advisor': () => navigate('/dashboard/student/academic-advisor'),
    'academic': () => navigate('/dashboard/student/academic-advisor'),
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'curriculum': () => navigate('/dashboard/student/exam-syllabus'),
    
    // Papers and tests
    'previous': () => navigate('/dashboard/student/previous-year-papers'),
    'papers': () => navigate('/dashboard/student/previous-year-papers'),
    'past': () => navigate('/dashboard/student/previous-year-papers'),
    'practice': () => navigate('/dashboard/student/practice-exams'),
    'mock': () => navigate('/dashboard/student/practice-exams'),
    'exam': () => navigate('/dashboard/student/practice-exams'),
    
    // Concept learning
    'concept': () => navigate('/dashboard/student/concept-cards'),
    'concepts': () => navigate('/dashboard/student/concept-cards'),
    'flashcard': () => navigate('/dashboard/student/flashcards'),
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'flash': () => navigate('/dashboard/student/flashcards'),
    
    // Subject-specific navigation
    'physics': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology': () => navigate('/dashboard/student/concept-cards/biology'),
    'math': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'mathematics': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Wellness and support
    'feel': () => navigate('/dashboard/student/feel-good-corner'),
    'wellness': () => navigate('/dashboard/student/feel-good-corner'),
    'mental': () => navigate('/dashboard/student/feel-good-corner'),
    'stress': () => navigate('/dashboard/student/feel-good-corner'),
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'ai': () => navigate('/dashboard/student/ai-tutor'),
    
    // Account management
    'profile': () => navigate('/dashboard/student/profile'),
    'account': () => navigate('/dashboard/student/profile'),
    'settings': () => navigate('/dashboard/student/profile'),
    'notification': () => navigate('/dashboard/student/notifications'),
    'notifications': () => navigate('/dashboard/student/notifications'),
    'subscription': () => navigate('/dashboard/student/subscription'),
    'billing': () => navigate('/dashboard/student/subscription'),
    'upgrade': () => navigate('/dashboard/student/subscription'),
    
    // Quick actions
    'logout': () => {
      localStorage.clear();
      navigate('/');
    },
    'home': () => navigate('/'),
  };

  const initUltraFastRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Ultra-fast settings for immediate response
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1; // Focus on best result for speed
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Ultra-fast recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🎤 Ultra-fast recognition ended');
      
      // Auto-restart for continuous listening
      if (continuous) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 100); // Very quick restart
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      // Quick restart on error
      if (continuous && event.error !== 'aborted') {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart after error failed:', error);
          }
        }, 500);
      }
    };

    recognition.onresult = (event: any) => {
      const results = Array.from(event.results);
      
      // Process all results for ultra-fast response
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        // Ultra-fast processing with batch recognition
        if (transcript.length > 2) {
          commandBufferRef.current = transcript;
          
          // Clear existing timeout
          if (batchTimeoutRef.current) {
            clearTimeout(batchTimeoutRef.current);
          }
          
          // Process command with minimal delay for ultra-fast response
          batchTimeoutRef.current = window.setTimeout(() => {
            processUltraFastCommand(commandBufferRef.current);
          }, 100); // 100ms batch processing for speed
        }
      }
    };

    recognitionRef.current = recognition;
  };

  const processUltraFastCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    
    // Prevent processing same command repeatedly
    if (command === lastCommand || command.length < 2) {
      return;
    }
    
    console.log('⚡ Ultra-fast command processing:', command);
    
    // Get current page commands
    const isHomePage = location.pathname === '/';
    const commandMap = isHomePage ? homepageCommands : dashboardCommands;
    
    // Ultra-fast partial matching - match on first few characters
    for (const [key, action] of Object.entries(commandMap)) {
      if (command.includes(key) || key.includes(command.substring(0, 4))) {
        console.log('⚡ Executing ultra-fast command:', key);
        action();
        
        toast({
          title: "Voice Command Executed",
          description: `⚡ ${key}`,
          duration: 1500, // Shorter duration for speed
        });
        
        setLastCommand(command);
        if (onCommand) onCommand(key);
        return;
      }
    }
    
    // Fallback for unmatched commands
    console.log('❌ No ultra-fast match found for:', command);
    if (onCommand) onCommand(command);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        
        // Dispatch microphone click event
        if (onMicrophoneClick) {
          document.dispatchEvent(new Event('microphone-click'));
        }
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    initUltraFastRecognition();
    
    // Start listening immediately for continuous mode
    if (continuous) {
      setTimeout(startListening, 500);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
    };
  }, [language, continuous]);

  // Ultra-fast restart on page changes
  useEffect(() => {
    if (recognitionRef.current && continuous) {
      recognitionRef.current.abort();
      setTimeout(() => {
        initUltraFastRecognition();
        startListening();
      }, 200); // Quick restart
    }
  }, [location.pathname]);

  return null;
};

export default UltraFastSpeechRecognition;
