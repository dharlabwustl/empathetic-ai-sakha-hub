
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UltraFastSpeechRecognitionProps {
  onCommand?: (command: string) => void;
  onMicrophoneClick?: () => void;
  language?: string;
  isActive?: boolean;
}

const UltraFastSpeechRecognition: React.FC<UltraFastSpeechRecognitionProps> = ({
  onCommand,
  onMicrophoneClick,
  language = 'en-US',
  isActive = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const commandBufferRef = useRef<string>('');
  const lastProcessedRef = useRef<string>('');
  const processingTimeoutRef = useRef<number | null>(null);
  
  // Homepage commands for conversion focus
  const homepageCommands = {
    // Primary conversion actions
    'signup': () => navigate('/signup'),
    'sign up': () => navigate('/signup'),
    'register': () => navigate('/signup'),
    'create account': () => navigate('/signup'),
    'join': () => navigate('/signup'),
    'get started': () => navigate('/signup'),
    
    'login': () => navigate('/login'),
    'log in': () => navigate('/login'),
    'sign in': () => navigate('/login'),
    
    // Free trial and tests
    'free trial': () => navigate('/signup?trial=true'),
    'trial': () => navigate('/signup?trial=true'),
    'try free': () => navigate('/signup?trial=true'),
    'start trial': () => navigate('/signup?trial=true'),
    
    'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'test readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'analyze readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'exam test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    
    'scholarship': () => navigate('/scholarship'),
    'scholarship test': () => navigate('/scholarship'),
    'discount': () => navigate('/scholarship'),
    
    // Information requests
    'what is prepzr': () => onCommand?.('explain-prepzr'),
    'tell me about prepzr': () => onCommand?.('explain-prepzr'),
    'how does prepzr work': () => onCommand?.('explain-prepzr'),
    'prepzr benefits': () => onCommand?.('explain-benefits'),
    'why prepzr': () => onCommand?.('explain-benefits'),
    'features': () => onCommand?.('explain-features'),
    'plans': () => onCommand?.('explain-plans'),
    'pricing': () => onCommand?.('explain-plans')
  };
  
  // Dashboard commands for comprehensive navigation
  const dashboardCommands = {
    // Main sections
    'dashboard': () => navigate('/dashboard/student'),
    'overview': () => navigate('/dashboard/student'),
    'home': () => navigate('/dashboard/student'),
    
    // Study planning
    'study plan': () => navigate('/dashboard/student/study-plan'),
    'my study plan': () => navigate('/dashboard/student/study-plan'),
    'daily plan': () => navigate('/dashboard/student/study-plan'),
    'weekly plan': () => navigate('/dashboard/student/study-plan'),
    'schedule': () => navigate('/dashboard/student/study-plan'),
    'plan': () => navigate('/dashboard/student/study-plan'),
    
    // Academic guidance
    'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
    'advisor': () => navigate('/dashboard/student/academic-advisor'),
    'ai advisor': () => navigate('/dashboard/student/academic-advisor'),
    'guidance': () => navigate('/dashboard/student/academic-advisor'),
    
    // Syllabus and curriculum
    'exam syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'curriculum': () => navigate('/dashboard/student/exam-syllabus'),
    'topics': () => navigate('/dashboard/student/exam-syllabus'),
    
    // Previous papers
    'previous year papers': () => navigate('/dashboard/student/previous-year-papers'),
    'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
    'past papers': () => navigate('/dashboard/student/previous-year-papers'),
    'old papers': () => navigate('/dashboard/student/previous-year-papers'),
    'papers': () => navigate('/dashboard/student/previous-year-papers'),
    
    // Concept cards
    'concept cards': () => navigate('/dashboard/student/concept-cards'),
    'concepts': () => navigate('/dashboard/student/concept-cards'),
    'concept card': () => navigate('/dashboard/student/concept-cards'),
    
    // Subject-specific concepts
    'physics concepts': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry concepts': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology concepts': () => navigate('/dashboard/student/concept-cards/biology'),
    'math concepts': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'physics': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology': () => navigate('/dashboard/student/concept-cards/biology'),
    'mathematics': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'maths': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Flashcards
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'flash cards': () => navigate('/dashboard/student/flashcards'),
    'interactive flashcards': () => navigate('/dashboard/student/flashcards'),
    'cards': () => navigate('/dashboard/student/flashcards'),
    
    // Subject flashcards
    'physics flashcards': () => navigate('/dashboard/student/flashcards/physics'),
    'chemistry flashcards': () => navigate('/dashboard/student/flashcards/chemistry'),
    'biology flashcards': () => navigate('/dashboard/student/flashcards/biology'),
    'math flashcards': () => navigate('/dashboard/student/flashcards/mathematics'),
    
    // Practice exams
    'practice exam': () => navigate('/dashboard/student/practice-exams'),
    'practice exams': () => navigate('/dashboard/student/practice-exams'),
    'mock test': () => navigate('/dashboard/student/practice-exams'),
    'mock tests': () => navigate('/dashboard/student/practice-exams'),
    'test': () => navigate('/dashboard/student/practice-exams'),
    'tests': () => navigate('/dashboard/student/practice-exams'),
    'exam': () => navigate('/dashboard/student/practice-exams'),
    'exams': () => navigate('/dashboard/student/practice-exams'),
    
    // Exam taking
    'take exam': () => navigate('/dashboard/student/practice-exams/take'),
    'start exam': () => navigate('/dashboard/student/practice-exams/take'),
    'physics exam': () => navigate('/dashboard/student/practice-exams/take/physics'),
    'chemistry exam': () => navigate('/dashboard/student/practice-exams/take/chemistry'),
    'biology exam': () => navigate('/dashboard/student/practice-exams/take/biology'),
    'math exam': () => navigate('/dashboard/student/practice-exams/take/mathematics'),
    
    // Wellness and support
    'feel good corner': () => navigate('/dashboard/student/feel-good-corner'),
    'wellness': () => navigate('/dashboard/student/feel-good-corner'),
    'mental health': () => navigate('/dashboard/student/feel-good-corner'),
    'stress relief': () => navigate('/dashboard/student/feel-good-corner'),
    'meditation': () => navigate('/dashboard/student/feel-good-corner'),
    'relax': () => navigate('/dashboard/student/feel-good-corner'),
    
    // AI Tutor
    'ai tutor': () => navigate('/dashboard/student/ai-tutor'),
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'personal tutor': () => navigate('/dashboard/student/ai-tutor'),
    'chat tutor': () => navigate('/dashboard/student/ai-tutor'),
    'help': () => navigate('/dashboard/student/ai-tutor'),
    
    // Profile and settings
    'profile': () => navigate('/dashboard/student/profile'),
    'my profile': () => navigate('/dashboard/student/profile'),
    'account': () => navigate('/dashboard/student/profile'),
    'settings': () => navigate('/dashboard/student/profile'),
    
    // Notifications
    'notifications': () => navigate('/dashboard/student/notifications'),
    'alerts': () => navigate('/dashboard/student/notifications'),
    'messages': () => navigate('/dashboard/student/notifications'),
    
    // Subscription
    'subscription': () => navigate('/dashboard/student/subscription'),
    'subscription plan': () => navigate('/dashboard/student/subscription'),
    'billing': () => navigate('/dashboard/student/subscription'),
    'upgrade': () => navigate('/dashboard/student/subscription'),
    'plan': () => navigate('/dashboard/student/subscription'),
    
    // Quick actions
    'logout': () => {
      localStorage.clear();
      navigate('/');
    },
    'log out': () => {
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
    
    // Ultra-fast settings for immediate response
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Ultra-fast speech recognition started');
      
      // Stop voice assistant when user starts talking
      if (onMicrophoneClick) {
        onMicrophoneClick();
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🎤 Speech recognition ended');
      
      // Auto-restart if still active
      if (isActive) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
          }
        }, 100);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      // Quick restart on error
      if (isActive && event.error !== 'aborted') {
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
      let transcript = '';
      
      // Process all results for fastest response
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result[0].confidence > 0.3) { // Lower threshold for faster response
          transcript += result[0].transcript.toLowerCase().trim();
        }
      }
      
      if (transcript.length > 2) {
        commandBufferRef.current = transcript;
        
        // Clear existing timeout
        if (processingTimeoutRef.current) {
          clearTimeout(processingTimeoutRef.current);
        }
        
        // Process immediately for ultra-fast response (100ms batch)
        processingTimeoutRef.current = window.setTimeout(() => {
          processCommand(commandBufferRef.current);
        }, 100);
      }
    };

    recognitionRef.current = recognition;
  };

  const processCommand = (transcript: string) => {
    const command = transcript.toLowerCase().trim();
    
    // Prevent processing the same command repeatedly
    if (command === lastProcessedRef.current || command.length < 2) {
      return;
    }
    
    console.log('⚡ Ultra-fast processing command:', command);
    
    // Get current page commands
    const isHomePage = location.pathname === '/';
    const commandMap = isHomePage ? homepageCommands : dashboardCommands;
    
    // Try exact match first (fastest)
    if (commandMap[command]) {
      console.log('✅ Exact match found:', command);
      commandMap[command]();
      lastProcessedRef.current = command;
      
      toast({
        title: "Voice Command",
        description: `Executing: ${command}`,
        duration: 1500,
      });
      
      if (onCommand) onCommand(command);
      return;
    }
    
    // Smart partial matching for faster responses
    for (const [key, action] of Object.entries(commandMap)) {
      if (command.includes(key) || key.includes(command)) {
        console.log('✅ Partial match found:', key);
        action();
        lastProcessedRef.current = command;
        
        toast({
          title: "Voice Command",
          description: `Executing: ${key}`,
          duration: 1500,
        });
        
        if (onCommand) onCommand(key);
        return;
      }
    }
    
    // Intelligent word-based matching for complex commands
    const commandWords = command.split(' ');
    for (const [key, action] of Object.entries(commandMap)) {
      const keyWords = key.split(' ');
      const matchingWords = commandWords.filter(word => 
        keyWords.some(keyWord => keyWord.includes(word) || word.includes(keyWord))
      );
      
      if (matchingWords.length >= Math.min(keyWords.length, 2)) {
        console.log('✅ Word-based match found:', key);
        action();
        lastProcessedRef.current = command;
        
        toast({
          title: "Voice Command",
          description: `Executing: ${key}`,
          duration: 1500,
        });
        
        if (onCommand) onCommand(key);
        return;
      }
    }
    
    console.log('❌ No command match found for:', command);
    if (onCommand) onCommand(command);
  };

  const startListening = () => {
    if (!isActive) return;
    
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
        // Reinitialize and try again
        initSpeechRecognition();
        try {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        } catch (error) {
          console.error('Failed to restart speech recognition:', error);
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
    
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
  };

  useEffect(() => {
    if (isActive) {
      initSpeechRecognition();
      setTimeout(startListening, 500);
    } else {
      stopListening();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, [isActive, language]);

  // Restart recognition when page changes
  useEffect(() => {
    if (recognitionRef.current && isActive) {
      recognitionRef.current.abort();
      setTimeout(() => {
        initSpeechRecognition();
        startListening();
      }, 300);
    }
  }, [location.pathname]);

  return null;
};

export default UltraFastSpeechRecognition;
