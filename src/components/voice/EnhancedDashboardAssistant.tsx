
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedDashboardAssistantProps {
  userName: string;
  isReturningUser?: boolean;
  userPerformance?: {
    streakDays: number;
    completionRate: number;
    examReadiness: number;
  };
  pendingTasks?: string[];
  language?: string;
}

const EnhancedDashboardAssistant: React.FC<EnhancedDashboardAssistantProps> = ({ 
  userName,
  isReturningUser = false,
  userPerformance = { streakDays: 0, completionRate: 0, examReadiness: 0 },
  pendingTasks = [],
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
  const isDashboard = location.pathname.includes('/dashboard');

  const getDashboardGreeting = () => {
    if (isReturningUser) {
      return `Welcome back, ${userName}! Great to see you again. You're doing fantastic with a ${userPerformance.streakDays}-day study streak and ${userPerformance.completionRate}% completion rate! Your exam readiness is at ${userPerformance.examReadiness}%. ${pendingTasks.length > 0 ? `You have ${pendingTasks.length} pending tasks to complete.` : 'You\'re all caught up!'} I'm here to help you navigate your study plan, today's tasks, concept cards, flashcards, practice exams, and track your progress. What would you like to focus on today?`;
    } else {
      return `Hello ${userName}! Welcome to your PREPZR dashboard. I'm Sakha AI, your personal study companion. I can help you with your study plan, today's tasks, concept learning, flashcard reviews, practice exams, academic guidance, and exam readiness tracking. I know about all dashboard features and can guide you smoothly through your learning journey. Where would you like to start?`;
    }
  };

  const processDashboardCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    const now = Date.now();
    if (now - lastCommandTimeRef.current < 2000) return;
    lastCommandTimeRef.current = now;

    // Navigation commands
    if (command.includes('today') || command.includes('daily plan') || command.includes('today\'s plan')) {
      speak("Taking you to today's personalized study plan with your scheduled tasks and goals.");
      navigate('/dashboard/student?tab=today');
    }
    else if (command.includes('concept') || command.includes('concepts')) {
      speak("Opening your concept cards where you can study key topics and strengthen your understanding.");
      navigate('/dashboard/student/concepts');
    }
    else if (command.includes('flashcard') || command.includes('flashcards')) {
      speak("Loading your flashcards for quick review and memorization practice.");
      navigate('/dashboard/student/flashcards');
    }
    else if (command.includes('practice exam') || command.includes('practice test') || command.includes('mock test')) {
      speak("Taking you to practice exams to test your knowledge and track your progress.");
      navigate('/dashboard/student/practice-exam');
    }
    else if (command.includes('academic advisor') || command.includes('advisor')) {
      speak("Connecting you with your academic advisor for personalized guidance and study planning.");
      navigate('/dashboard/student?tab=academic');
    }
    else if (command.includes('tutor') || command.includes('ai tutor')) {
      speak("Opening your 24/7 AI tutor for instant help with any subject or topic.");
      navigate('/dashboard/student?tab=tutor');
    }
    else if (command.includes('formula') || command.includes('formulas')) {
      speak("Loading formula practice section to help you memorize important equations and formulas.");
      // navigate('/dashboard/student/formulas');
    }
    else if (command.includes('progress') || command.includes('analytics')) {
      speak(`Your current progress: ${userPerformance.completionRate}% completion rate, ${userPerformance.streakDays}-day streak, and ${userPerformance.examReadiness}% exam readiness. Great work!`);
    }
    else if (command.includes('pending') || command.includes('backlog') || command.includes('incomplete')) {
      if (pendingTasks.length > 0) {
        speak(`You have ${pendingTasks.length} pending tasks. Let me help you prioritize them. Going to today's plan to see your pending items.`);
        navigate('/dashboard/student?tab=today');
      } else {
        speak("Excellent! You have no pending tasks. You're all caught up with your studies!");
      }
    }
    else if (command.includes('exam readiness') || command.includes('readiness')) {
      speak(`Your exam readiness is currently at ${userPerformance.examReadiness}%. ${userPerformance.examReadiness >= 80 ? 'You\'re well prepared!' : 'Let\'s work on improving this with focused practice.'}`);
    }
    else if (command.includes('study plan') || command.includes('plan')) {
      speak("Your personalized study plan adapts to your learning pace and emotional state. Let me show you today's optimized schedule.");
      navigate('/dashboard/student?tab=today');
    }
    else if (command.includes('motivation') || command.includes('motivate')) {
      speak(`${userName}, you're doing amazing! Your ${userPerformance.streakDays}-day streak shows incredible dedication. Remember, every small step brings you closer to your goals. Keep pushing forward!`);
    }
    else if (command.includes('help') || command.includes('guide')) {
      speak("I can help you navigate today's plan, study concepts, review flashcards, take practice exams, get academic guidance, or track your progress. What would you like to explore?");
      showDashboardHelp();
    }
    else {
      speak("I can help you with today's plan, concept learning, flashcard reviews, practice exams, academic guidance, or progress tracking. What would you like to focus on?");
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window) || audioMuted) return;
    
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = text.replace(/PREPZR/gi, 'PREP-ZER');
    speech.lang = language;
    speech.rate = 0.95;
    speech.pitch = 1.1;
    speech.volume = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('samantha') ||
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    
    if (preferredVoice) {
      speech.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(speech);
  };

  const showDashboardHelp = () => {
    toast({
      title: "Sakha AI Dashboard Commands",
      description: "Try: 'Today's plan', 'Study concepts', 'Practice exam', 'Show progress', 'Academic advisor', 'Pending tasks'",
      duration: 8000,
    });
  };

  const setupVoiceRecognition = () => {
    if (recognitionRef.current || audioMuted || !isDashboard) return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        if (isDashboard && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, 3000);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Dashboard voice command:", transcript);
        processDashboardCommand(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error("Dashboard speech recognition error:", event.error);
        setIsListening(false);
        
        if (isDashboard && !audioMuted) {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, 5000);
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Failed to setup dashboard recognition:", error);
    }
  };

  const cleanupVoiceResources = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onstart = null;
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore cleanup errors
      } finally {
        recognitionRef.current = null;
      }
    }
    setIsListening(false);
  };

  const setupDashboardGreeting = () => {
    if (greetingPlayed || audioMuted || !isDashboard) return;
    
    const message = getDashboardGreeting();
    speak(message);
    setGreetingPlayed(true);
    
    setTimeout(() => {
      if (!audioMuted) {
        setupVoiceRecognition();
        showDashboardHelp();
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isDashboard) {
      cleanupVoiceResources();
      return;
    }
    
    setGreetingPlayed(false);
    
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    } else {
      const timer = setTimeout(setupDashboardGreeting, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, userName]);

  useEffect(() => {
    const handleMute = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanupVoiceResources();
    };
    
    const handleUnmute = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
      if (isDashboard) {
        if (!greetingPlayed) {
          setupDashboardGreeting();
        } else {
          setupVoiceRecognition();
        }
      }
    };
    
    document.addEventListener('voice-assistant-mute', handleMute);
    document.addEventListener('voice-assistant-unmute', handleUnmute);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMute);
      document.removeEventListener('voice-assistant-unmute', handleUnmute);
      cleanupVoiceResources();
    };
  }, [greetingPlayed, isDashboard, audioMuted, userName]);
  
  return null;
};

export default EnhancedDashboardAssistant;
