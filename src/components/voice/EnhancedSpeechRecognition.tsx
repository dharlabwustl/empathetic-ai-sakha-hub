
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
    
    // Features
    'exam readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'exam readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'test readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    'analyze readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
    
    // Free trial
    'free trial': () => navigate('/signup?trial=true'),
    'start trial': () => navigate('/signup?trial=true'),
    'try free': () => navigate('/signup?trial=true'),
    
    // Navigation
    'go to dashboard': () => navigate('/dashboard/student'),
    'dashboard': () => navigate('/dashboard/student'),
    'home': () => navigate('/'),
    'back to home': () => navigate('/'),
  };
  
  // Dashboard commands
  const dashboardCommands = {
    // Main dashboard sections
    'dashboard': () => navigate('/dashboard/student'),
    'overview': () => navigate('/dashboard/student'),
    'today plan': () => navigate('/dashboard/student'),
    'daily plan': () => navigate('/dashboard/student'),
    
    // Study plan
    'study plan': () => navigate('/dashboard/student/study-plan'),
    'my study plan': () => navigate('/dashboard/student/study-plan'),
    'weekly plan': () => navigate('/dashboard/student/study-plan'),
    'schedule': () => navigate('/dashboard/student/study-plan'),
    
    // Academic advisor
    'academic advisor': () => navigate('/dashboard/student/academic-advisor'),
    'advisor': () => navigate('/dashboard/student/academic-advisor'),
    'ai advisor': () => navigate('/dashboard/student/academic-advisor'),
    
    // Exam syllabus
    'exam syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'syllabus': () => navigate('/dashboard/student/exam-syllabus'),
    'curriculum': () => navigate('/dashboard/student/exam-syllabus'),
    
    // Previous year papers
    'previous year papers': () => navigate('/dashboard/student/previous-year-papers'),
    'previous papers': () => navigate('/dashboard/student/previous-year-papers'),
    'past papers': () => navigate('/dashboard/student/previous-year-papers'),
    'old papers': () => navigate('/dashboard/student/previous-year-papers'),
    
    // Concept cards
    'concept cards': () => navigate('/dashboard/student/concept-cards'),
    'concepts': () => navigate('/dashboard/student/concept-cards'),
    'concept card': () => navigate('/dashboard/student/concept-cards'),
    
    // Specific concept card detail
    'physics concepts': () => navigate('/dashboard/student/concept-cards/physics'),
    'chemistry concepts': () => navigate('/dashboard/student/concept-cards/chemistry'),
    'biology concepts': () => navigate('/dashboard/student/concept-cards/biology'),
    'mathematics concepts': () => navigate('/dashboard/student/concept-cards/mathematics'),
    'math concepts': () => navigate('/dashboard/student/concept-cards/mathematics'),
    
    // Flashcards
    'flashcards': () => navigate('/dashboard/student/flashcards'),
    'flash cards': () => navigate('/dashboard/student/flashcards'),
    'interactive flashcards': () => navigate('/dashboard/student/flashcards'),
    
    // Specific flashcard topics
    'physics flashcards': () => navigate('/dashboard/student/flashcards/physics'),
    'chemistry flashcards': () => navigate('/dashboard/student/flashcards/chemistry'),
    'biology flashcards': () => navigate('/dashboard/student/flashcards/biology'),
    'math flashcards': () => navigate('/dashboard/student/flashcards/mathematics'),
    
    // Practice exams
    'practice exam': () => navigate('/dashboard/student/practice-exams'),
    'practice exams': () => navigate('/dashboard/student/practice-exams'),
    'mock test': () => navigate('/dashboard/student/practice-exams'),
    'mock tests': () => navigate('/dashboard/student/practice-exams'),
    'test exam': () => navigate('/dashboard/student/practice-exams'),
    
    // Exam taking pages
    'take exam': () => navigate('/dashboard/student/practice-exams/take'),
    'start exam': () => navigate('/dashboard/student/practice-exams/take'),
    'physics exam': () => navigate('/dashboard/student/practice-exams/take/physics'),
    'chemistry exam': () => navigate('/dashboard/student/practice-exams/take/chemistry'),
    'biology exam': () => navigate('/dashboard/student/practice-exams/take/biology'),
    'math exam': () => navigate('/dashboard/student/practice-exams/take/mathematics'),
    
    // Feel good corner
    'feel good corner': () => navigate('/dashboard/student/feel-good-corner'),
    'wellness': () => navigate('/dashboard/student/feel-good-corner'),
    'mental health': () => navigate('/dashboard/student/feel-good-corner'),
    'stress relief': () => navigate('/dashboard/student/feel-good-corner'),
    
    // AI Tutor
    'ai tutor': () => navigate('/dashboard/student/ai-tutor'),
    'tutor': () => navigate('/dashboard/student/ai-tutor'),
    'personal tutor': () => navigate('/dashboard/student/ai-tutor'),
    'chat tutor': () => navigate('/dashboard/student/ai-tutor'),
    
    // Profile
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
    'plans': () => navigate('/dashboard/student/subscription'),
    
    // Navigation
    'go home': () => navigate('/'),
    'home page': () => navigate('/'),
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
    
    // Enhanced settings for faster response
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 3; // Get multiple alternatives for better accuracy
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎤 Speech recognition started');
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🎤 Speech recognition ended');
      
      // Auto-restart for continuous listening
      if (continuous) {
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
      
      // Restart on error with delay
      if (continuous && event.error !== 'aborted') {
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
      
      // Process both interim and final results for faster response
      for (let i = event.resultIndex; i < results.length; i++) {
        const result = results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        // Process final results with high confidence immediately
        if (result.isFinal && confidence > 0.7) {
          processCommand(transcript);
          setLastCommand(transcript);
        }
        // Process interim results if confidence is very high for quick response
        else if (!result.isFinal && confidence > 0.9 && transcript.length > 3) {
          processCommand(transcript);
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
    
    // Try exact match first
    if (commandMap[command]) {
      console.log('✅ Executing exact command:', command);
      commandMap[command]();
      
      toast({
        title: "Voice Command Executed",
        description: `Executing: ${command}`,
        duration: 2000,
      });
      
      if (onCommand) onCommand(command);
      return;
    }
    
    // Try partial matches for better flexibility
    for (const [key, action] of Object.entries(commandMap)) {
      if (command.includes(key) || key.includes(command)) {
        console.log('✅ Executing partial command match:', key);
        action();
        
        toast({
          title: "Voice Command Executed",
          description: `Executing: ${key}`,
          duration: 2000,
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
    
    // Start listening immediately if continuous mode
    if (continuous) {
      setTimeout(startListening, 1000);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, continuous]);

  // Restart recognition when page changes
  useEffect(() => {
    if (recognitionRef.current && continuous) {
      recognitionRef.current.abort();
      setTimeout(() => {
        initSpeechRecognition();
        startListening();
      }, 500);
    }
  }, [location.pathname]);

  return null;
};

export default EnhancedSpeechRecognition;
