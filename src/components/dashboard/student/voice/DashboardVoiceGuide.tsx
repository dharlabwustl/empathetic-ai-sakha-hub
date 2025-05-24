
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface DashboardVoiceGuideProps {
  userName: string;
  isFirstTimeUser?: boolean;
  currentPage?: string;
  language?: string;
}

const DashboardVoiceGuide: React.FC<DashboardVoiceGuideProps> = ({
  userName,
  isFirstTimeUser = false,
  currentPage = 'dashboard',
  language = 'en-US'
}) => {
  const location = useLocation();
  const hasSpokenRef = useRef(false);
  const [currentRoute, setCurrentRoute] = useState(currentPage);
  
  // Reset speech flag when route changes
  useEffect(() => {
    if (location.pathname !== currentRoute) {
      setCurrentRoute(location.pathname);
      hasSpokenRef.current = false;
      
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [location.pathname, currentRoute]);

  useEffect(() => {
    if (hasSpokenRef.current) return;
    
    const speakGuide = () => {
      if (!('speechSynthesis' in window)) return;
      
      window.speechSynthesis.cancel();
      
      let guideText = '';
      
      // Route-specific guidance
      if (location.pathname.includes('/dashboard/student')) {
        if (isFirstTimeUser) {
          guideText = `Welcome to your personalized PREPZR dashboard, ${userName}! Here you can see your exam readiness score, today's study plan, and upcoming milestones. You can access concept cards for visual learning, practice exams to test your knowledge, and your academic advisor for personalized guidance. Your progress is tracked in real-time to help you stay on track for exam success.`;
        } else {
          guideText = `Welcome back to your dashboard, ${userName}! Your latest progress is displayed here. You can continue with today's study plan, review your exam readiness score, or explore new learning tools. Everything is designed to help you achieve your academic goals efficiently.`;
        }
      } else if (location.pathname.includes('/concept-cards')) {
        guideText = `You're now in the concept cards section, ${userName}. Here you can explore visual learning materials, interactive diagrams, and key concepts for your subjects. Use the search and filter options to find specific topics you want to study.`;
      } else if (location.pathname.includes('/practice-exams')) {
        guideText = `Welcome to the practice exams section, ${userName}. Here you can take mock tests, review your performance, and identify areas for improvement. Choose from different difficulty levels and exam formats to match your preparation needs.`;
      } else if (location.pathname.includes('/study-plan')) {
        guideText = `This is your personalized study plan, ${userName}. Here you can see your daily tasks, weekly goals, and long-term preparation strategy. You can modify your plan based on your progress and preferences.`;
      } else if (location.pathname.includes('/academic-advisor')) {
        guideText = `Welcome to your academic advisor, ${userName}. Here you can get personalized recommendations, ask questions about your study strategy, and receive guidance on exam preparation techniques.`;
      }
      
      if (guideText) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = guideText.replace(/PREPZR/gi, 'PREP-zer');
        speech.lang = language;
        speech.rate = 0.9;
        speech.pitch = 1.1;
        speech.volume = 0.7;
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        const femaleVoices = voices.filter(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('zira') ||
          (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
        );
        
        if (femaleVoices.length > 0) {
          speech.voice = femaleVoices[0];
        }
        
        speech.onend = () => {
          hasSpokenRef.current = true;
        };
        
        setTimeout(() => {
          window.speechSynthesis.speak(speech);
        }, 1500);
      }
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakGuide, { once: true });
    } else {
      speakGuide();
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location.pathname, userName, isFirstTimeUser, language]);

  return null;
};

export default DashboardVoiceGuide;
