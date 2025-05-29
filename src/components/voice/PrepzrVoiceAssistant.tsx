
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  speakWithFemaleVoice, 
  isUserCurrentlyActive, 
  initializeActivityDetection,
  cleanupOnNavigation 
} from '@/utils/voiceConfig';

interface PrepzrVoiceAssistantProps {
  userName?: string;
  language?: string;
}

const PrepzrVoiceAssistant: React.FC<PrepzrVoiceAssistantProps> = ({ 
  userName = 'there',
  language = 'en-US'
}) => {
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [hasSpokenSuggestion, setHasSpokenSuggestion] = useState(false);
  const location = useLocation();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Only active on home page for non-logged-in users
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isHomePage = location.pathname === '/';
  const shouldBeActive = isHomePage && !isUserLoggedIn;

  // Initialize activity detection
  useEffect(() => {
    initializeActivityDetection();
    
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  // Handle intro message on home page
  useEffect(() => {
    if (!shouldBeActive || hasSpokenIntro) {
      return;
    }

    const speakIntroMessage = () => {
      if (isUserCurrentlyActive()) {
        console.log('🔇 Voice: User is active, not speaking intro');
        return;
      }

      const introMessage = `Hi ${userName}! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence.`;
      
      const success = speakWithFemaleVoice(introMessage, { language }, 'home-intro');
      
      if (success) {
        setHasSpokenIntro(true);
        
        // Schedule suggestion after 60 seconds if user is still inactive
        messageTimeoutRef.current = setTimeout(() => {
          if (shouldBeActive && !isUserCurrentlyActive() && !hasSpokenSuggestion) {
            const suggestionMessage = "Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.";
            const suggestionSuccess = speakWithFemaleVoice(suggestionMessage, { language }, 'home-suggestion');
            
            if (suggestionSuccess) {
              setHasSpokenSuggestion(true);
            }
          }
        }, 60000);
      }
    };

    // Delay initial message slightly
    const introTimeout = setTimeout(speakIntroMessage, 2000);
    
    return () => {
      clearTimeout(introTimeout);
    };
  }, [shouldBeActive, hasSpokenIntro, userName, language, hasSpokenSuggestion]);

  // Reset state when page changes
  useEffect(() => {
    setHasSpokenIntro(false);
    setHasSpokenSuggestion(false);
    
    // Cleanup speech on navigation
    cleanupOnNavigation();
    
    // Clear timeouts
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
  }, [location.pathname]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupOnNavigation();
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
