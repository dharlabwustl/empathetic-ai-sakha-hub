
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  isFirstTimeUser?: boolean;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = '',
  currentMood,
  onMoodChange,
  isFirstTimeUser = false
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [lastPagePath, setLastPagePath] = useState<string | null>(null);
  const location = useLocation();
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [pageContext, setPageContext] = useState('');
  const [sessionStorage] = useState(() => {
    return {
      welcomeMessagePlayed: Boolean(localStorage.getItem('dashboard_welcome_played'))
    };
  });
  
  // Track user interaction to avoid annoying users with too many messages
  useEffect(() => {
    const handleUserInteraction = () => {
      setLastInteractionTime(Date.now());
    };
    
    // Track user interactions
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);
  
  // Extract current page context
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/student/overview')) setPageContext('overview');
    else if (path.includes('/dashboard/student/concepts')) setPageContext('concepts');
    else if (path.includes('/dashboard/student/study-plan')) setPageContext('study-plan');
    else if (path.includes('/dashboard/student/practice')) setPageContext('practice');
    else if (path.includes('/dashboard/student/analytics')) setPageContext('analytics');
    else if (path.includes('/dashboard/student/subscription')) setPageContext('subscription');
    else setPageContext('dashboard');
    
    // Check if we've moved to a new page
    if (path !== lastPagePath) {
      // Cancel any ongoing speech when changing pages
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      // Save this path so we can detect page changes
      setLastPagePath(path);
      
      // Reset greeting flag if changing pages
      if (lastPagePath) {
        setGreetingPlayed(false);
      }
    }
  }, [location.pathname, lastPagePath]);
  
  useEffect(() => {
    // Only play welcome message once per session, and only on dashboard
    if (
      'speechSynthesis' in window &&
      !greetingPlayed && 
      !sessionStorage.welcomeMessagePlayed &&
      location.pathname.includes('/dashboard')
    ) {
      const timer = setTimeout(() => {
        // Different message for first-time users vs returning users
        let message = '';
        
        if (isFirstTimeUser) {
          // First-time user welcome - improved with proper PREPZR pronunciation
          message = `Congratulations ${userName} for joining Prep-zer! You've made an excellent decision in choosing us for your exam preparation journey. Our personalized dashboard adapts to your learning style and progress to help you achieve your goals efficiently. I'm your AI study assistant and will guide you through our powerful features including your Exam Readiness Score, personalized study plan, and adaptive practice tests. You can take a tour of the dashboard to learn more about all our features.`;
        } else {
          // Returning user welcome - confident and enthusiastic tone
          message = `Welcome back to your Prep-zer dashboard, ${userName}. Your study plan has been updated based on your recent activity and progress. Let's continue your exam preparation journey with confidence!`;
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
          localStorage.setItem('dashboard_welcome_played', 'true');
        }
      }, 1500);
      
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
    
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, [location.pathname, userName, greetingPlayed, isFirstTimeUser, sessionStorage.welcomeMessagePlayed]);
  
  // Handle context-specific messages based on dashboard section
  useEffect(() => {
    // Only provide context hints if user has already seen the welcome message
    if (greetingPlayed && location.pathname.includes('/dashboard')) {
      // Extract the specific dashboard section from the URL
      const dashboardSection = location.pathname.split('/').pop();
      
      let contextMessage = '';
      
      // Provide context-specific guidance based on which section they're viewing
      switch(dashboardSection) {
        case 'overview':
          contextMessage = `This is your dashboard overview. Here you can see your Exam Readiness Score, upcoming events, and performance trends. The score reflects how prepared you are for your exams based on your engagement and performance.`;
          break;
        case 'study-plan':
          contextMessage = `This is your personalized study plan. It adjusts based on your learning pace and performance to optimize your exam preparation. You can track your progress for each concept and see what's scheduled next.`;
          break;
        case 'concepts':
          contextMessage = `Here you can explore all concepts you need to master. Click on any concept card to access detailed explanations, notes, practice questions, and use features like read-aloud or AI tutoring.`;
          break;
        case 'practice':
          contextMessage = `Test your knowledge with practice exams. They simulate real exam conditions and provide detailed analytics on your performance to identify areas that need improvement.`;
          break;
        case 'analytics':
          contextMessage = `Your analytics show your progress over time. Use these insights to identify areas that need more focus and adjust your study plan accordingly.`;
          break;
        case 'subscription':
          contextMessage = `This is the subscription management page. You can upgrade your plan to access premium features or manage your current subscription. Remember, 5% of all subscription revenue goes toward providing free access to underprivileged students.`;
          break;
      }
      
      if (contextMessage) {
        // Set a delay so it doesn't speak immediately after the welcome message
        messageTimerRef.current = setTimeout(() => {
          speakMessage(contextMessage);
        }, 5000);
      }
    }
    
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, [greetingPlayed, location.pathname]);
  
  // Speak with proper PREPZR pronunciation
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation
      // Use phonetic syllable breaks for better pronunciation: "Prep" + "zer"
      const correctedText = text
        .replace(/PREPZR/gi, 'Prep-zer')
        .replace(/prepzr/gi, 'Prep-zer')
        .replace(/Prepzr/g, 'Prep-zer');
      
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an appropriate voice
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English female voice first (for consistency)
      let selectedVoice = voices.find(v => 
        (v.lang === 'en-IN' || v.name.includes('Indian')) && 
        (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
      );
      
      // If no Indian voice, try to find any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          v.lang.includes('en') && v.name.toLowerCase().includes('female')
        );
      }
      
      // If still no match, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties for a confident, pleasant voice
      utterance.lang = 'en-IN';
      utterance.rate = 0.95; // Slightly slower for better clarity
      utterance.pitch = 1.1; // Slightly higher for female voice
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default DashboardVoiceAssistant;
