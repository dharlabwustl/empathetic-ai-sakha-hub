
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSpeechRecognitionProps {
  onCommand?: (command: string) => void;
  language?: string;
  continuous?: boolean;
}

const EnhancedSpeechRecognition: React.FC<EnhancedSpeechRecognitionProps> = ({
  onCommand,
  language = 'en-US',
  continuous = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const commandTimeoutRef = useRef<number | null>(null);
  
  // Enhanced homepage commands with quick action words
  const homepageCommands = {
    // Quick action commands
    'trial': () => navigate('/signup?trial=true'),
    'free trial': () => navigate('/signup?trial=true'),
    'start trial': () => navigate('/signup?trial=true'),
    'try free': () => navigate('/signup?trial=true'),
    'get started': () => navigate('/signup'),
    
    // Authentication
    'sign up': () => navigate('/signup'),
    'signup': () => navigate('/signup'),
    'register': () => navigate('/signup'),
    'create account': () => navigate('/signup'),
    'join': () => navigate('/signup'),
    'login': () => navigate('/login'),
    'log in': () => navigate('/login'),
    'sign in': () => navigate('/login'),
    
    // Exam readiness and scholarship
    'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'test readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'analyze': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'scholarship': () => navigate('/scholarship'),
    'scholarship test': () => navigate('/scholarship'),
    'free scholarship': () => navigate('/scholarship'),
    
    // Navigation
    'dashboard': () => navigate('/dashboard/student'),
    'home': () => navigate('/'),
  };
  
  // Comprehensive dashboard commands with quick navigation
  const dashboardCommands = {
    // Main sections - quick commands
    'overview': () => navigate('/dashboard/student'),
    'dashboard': () => navigate('/dashboard/student'),
    'today': () => navigate('/dashboard/student'),
    'home': () => navigate('/dashboard/student'),
    
    // Study plan
    'study plan': () => navigate('/dashboard/student/study-plan'),
    'plan': () => navigate('/dashboard/student/study-plan'),
    'schedule': () => navigate('/dashboard/student/study-plan'),
    'weekly plan': () => navigate('/dashboard/student/study-plan'),
    'daily plan': () => navigate('/dashboard/student/study-plan'),
    
    // Academic advisor
    'advisor': () => navigate('/dashboard/student/academic-advisor'),
    'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
    'ai advisor': () => navigate('/dashboard/student/academic-advisor'),
    'guidance': () => navigate('/dashboard/student/academic-advisor'),
    
    // Exam syllabus
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'exam syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'curriculum': () => navigate('/dashboard/student/exam-syllabus'),
    'topics': () => navigate('/dashboard/student/exam-syllabus'),
    
    // Previous year papers
    'papers': () => navigate('/dashboard/student/previous-year-papers'),
    'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
    'past papers': () => navigate('/dashboard/student/previous-year-papers'),
    'old papers': () => navigate('/dashboard/student/previous-year-papers'),
    'question papers': () => navigate('/dashboard/student/previous-year-papers'),
    
    // Concept cards
    'concepts': () => navigate('/dashboard/student/concept-cards'),
    'concept cards': () => navigate('/dashboard/student/concept-cards'),
    'theory': () => navigate('/dashboard/student/concept-cards'),
    
    // Subject-specific concept cards
    'physics concepts': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry concepts': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology concepts': () => navigate('/dashboard/student/concept-cards/biology'),
    'math concepts': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'maths concepts': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Flashcards
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'flash cards': () => navigate('/dashboard/student/flashcards'),
    'cards': () => navigate('/dashboard/student/flashcards'),
    'quick review': () => navigate('/dashboard/student/flashcards'),
    
    // Subject-specific flashcards
    'physics flashcards': () => navigate('/dashboard/student/flashcards/physics'),
    'chemistry flashcards': () => navigate('/dashboard/student/flashcards/chemistry'),
    'biology flashcards': () => navigate('/dashboard/student/flashcards/biology'),
    'math flashcards': () => navigate('/dashboard/student/flashcards/mathematics'),
    'maths flashcards': () => navigate('/dashboard/student/flashcards/mathematics'),
    
    // Practice exams
    'practice': () => navigate('/dashboard/student/practice-exams'),
    'practice exam': () => navigate('/dashboard/student/practice-exams'),
    'practice exams': () => navigate('/dashboard/student/practice-exams'),
    'mock test': () => navigate('/dashboard/student/practice-exams'),
    'mock tests': () => navigate('/dashboard/student/practice-exams'),
    'test': () => navigate('/dashboard/student/practice-exams'),
    'exam': () => navigate('/dashboard/student/practice-exams'),
    
    // Taking exams
    'take exam': () => navigate('/dashboard/student/practice-exams/take'),
    'start exam': () => navigate('/dashboard/student/practice-exams/take'),
    'begin test': () => navigate('/dashboard/student/practice-exams/take'),
    'physics exam': () => navigate('/dashboard/student/practice-exams/take/physics'),
    'chemistry exam': () => navigate('/dashboard/student/practice-exams/take/chemistry'),
    'biology exam': () => navigate('/dashboard/student/practice-exams/take/biology'),
    'math exam': () => navigate('/dashboard/student/practice-exams/take/mathematics'),
    'maths exam': () => navigate('/dashboard/student/practice-exams/take/mathematics'),
    
    // Feel good corner
    'wellness': () => navigate('/dashboard/student/feel-good-corner'),
    'feel good': () => navigate('/dashboard/student/feel-good-corner'),
    'mental health': () => navigate('/dashboard/student/feel-good-corner'),
    'stress relief': () => navigate('/dashboard/student/feel-good-corner'),
    'meditation': () => navigate('/dashboard/student/feel-good-corner'),
    'relax': () => navigate('/dashboard/student/feel-good-corner'),
    
    // AI Tutor
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'ai tutor': () => navigate('/dashboard/student/ai-tutor'),
    'chat': () => navigate('/dashboard/student/ai-tutor'),
    'help': () => navigate('/dashboard/student/ai-tutor'),
    'ask question': () => navigate('/dashboard/student/ai-tutor'),
    
    // Profile and settings
    'profile': () => navigate('/dashboard/student/profile'),
    'account': () => navigate('/dashboard/student/profile'),
    'settings': () => navigate('/dashboard/student/profile'),
    'my profile': () => navigate('/dashboard/student/profile'),
    
    // Notifications
    'notifications': () => navigate('/dashboard/student/notifications'),
    'alerts': () => navigate('/dashboard/student/notifications'),
    'messages': () => navigate('/dashboard/student/notifications'),
    'updates': () => navigate('/dashboard/student/notifications'),
    
    // Subscription
    'subscription': () => navigate('/dashboard/student/subscription'),
    'plans': () => navigate('/dashboard/student/subscription'),
    'billing': () => navigate('/dashboard/student/subscription'),
    'upgrade': () => navigate('/dashboard/student/subscription'),
    'premium': () => navigate('/dashboard/student/subscription'),
    
    // Quick actions
    'logout': () => {
      localStorage.clear();
      navigate('/');
    },
    'log out': () => {
      localStorage.clear();
      navigate('/');
    },
    'exit': () => {
      localStorage.clear();
      navigate('/');
    }
  };

  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Optimized settings for faster, more responsive recognition
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1; // Reduced for faster processing
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Speech recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🎤 Speech recognition ended');
      
      // Quick restart for continuous listening
      if (continuous) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 300); // Reduced restart delay
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
      
      // Process results immediately for faster response
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        // Process even interim results with high confidence for instant response
        if (confidence > 0.8 && transcript.length > 2) {
          // Clear any existing timeout
          if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current);
          }
          
          // Set a very short timeout to batch rapid speech
          commandTimeoutRef.current = window.setTimeout(() => {
            processCommand(transcript);
          }, 100); // Very quick processing
        }
        
        // Also process final results
        if (result.isFinal && confidence > 0.7) {
          if (commandTimeoutRef.current) {
            clearTimeout(commandTimeoutRef.current);
          }
          processCommand(transcript);
          setLastCommand(transcript);
        }
      }
    };

    recognitionRef.current = recognition;
  };

  const processCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    
    // Prevent processing the same command repeatedly
    if (command === lastCommand || command.length < 2) {
      return;
    }
    
    console.log('🗣️ Processing command:', command);
    
    // Get current page commands
    const isHomePage = location.pathname === '/';
    const isDashboard = location.pathname.includes('/dashboard');
    
    const commandMap = isHomePage ? homepageCommands : dashboardCommands;
    
    // Try exact match first (fastest)
    if (commandMap[command]) {
      console.log('✅ Executing exact command:', command);
      commandMap[command]();
      
      toast({
        title: "Voice Command Executed",
        description: `Executing: ${command}`,
        duration: 1500, // Shorter toast duration
      });
      
      if (onCommand) onCommand(command);
      return;
    }
    
    // Try partial matches with priority for shorter commands
    const commandKeys = Object.keys(commandMap).sort((a, b) => a.length - b.length);
    for (const key of commandKeys) {
      if (command.includes(key) || key.includes(command)) {
        console.log('✅ Executing partial command match:', key);
        commandMap[key]();
        
        toast({
          title: "Voice Command Executed",
          description: `Executing: ${key}`,
          duration: 1500,
        });
        
        if (onCommand) onCommand(key);
        return;
      }
    }
    
    // If no match found
    console.log('❌ No command match found for:', command);
    if (onCommand) onCommand(command);
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
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    initSpeechRecognition();
    
    // Start listening immediately for faster response
    if (continuous) {
      setTimeout(startListening, 500);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (commandTimeoutRef.current) {
        clearTimeout(commandTimeoutRef.current);
      }
    };
  }, [language, continuous]);

  // Quick restart on page changes
  useEffect(() => {
    if (recognitionRef.current && continuous) {
      recognitionRef.current.abort();
      setTimeout(() => {
        initSpeechRecognition();
        startListening();
      }, 200); // Faster restart
    }
  }, [location.pathname]);

  return null;
};

export default EnhancedSpeechRecognition;
