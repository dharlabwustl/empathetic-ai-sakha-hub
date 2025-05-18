
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = 'Student', 
  currentMood,
  onMoodChange
}) => {
  const [lastSpokenContext, setLastSpokenContext] = useState<string | null>(null);
  const location = useLocation();
  const { toast } = useToast();
  
  // Only play context-specific messages when the page changes
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only speak if this is a different context than what was last spoken
    if (currentPath !== lastSpokenContext) {
      const contextInfo = getContextInfo(currentPath);
      
      if (contextInfo) {
        // Add a short delay to allow page rendering
        setTimeout(() => {
          speakMessage(contextInfo);
          setLastSpokenContext(currentPath);
        }, 1200);
      }
    }
    
    // Reset last spoken context when component unmounts
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [location.pathname, lastSpokenContext]);

  const getContextInfo = (pathname: string): string | null => {
    // Don't speak on these pages (they have their own greeting)
    if (pathname.includes('/welcome-flow') || pathname === '/') {
      return getWelcomeFlowContext();
    }
    
    if (pathname.includes('/dashboard/student/today')) {
      return `Here's today's personalized study plan, ${userName}. I've prioritized your most important topics based on your progress and goals. Click on any concept or task to begin studying in detail.`;
    }
    
    if (pathname.includes('/dashboard/student/overview')) {
      return `Welcome to your dashboard overview, ${userName}. Here you can track your exam readiness score, weekly progress, and upcoming tasks. I recommend focusing on improving your weakest areas first.`;
    }
    
    if (pathname.includes('/dashboard/student/concepts/study')) {
      return `I've loaded the concept details for you. You can read the material, take notes, and use the read aloud feature if you prefer listening. Links to related flashcards and practice questions are available below. Flag it for revision if you need to review it again later.`;
    }
    
    if (pathname.includes('/dashboard/student/concepts')) {
      return `Here are all your study concepts, organized by subject. Click on any concept to study in detail or mark it for revision. The color coding shows your proficiency level in each topic.`;
    }
    
    if (pathname.includes('/dashboard/student/flashcards')) {
      return `These flashcards are designed to help you memorize key facts and formulas. Use the spaced repetition system for better retention. Regular practice with these cards will significantly improve your exam readiness score.`;
    }
    
    if (pathname.includes('/dashboard/student/practice-exam')) {
      return `Practice exams simulate real test conditions and help identify your weak areas. Complete these regularly to track your exam readiness. Our AI provides personalized feedback on each question to help you improve.`;
    }
    
    if (pathname.includes('/dashboard/student/analytics')) {
      return `Your analytics dashboard shows your progress over time. I've highlighted areas where you're excelling and where you might need more focus. Use these insights to adjust your study plan for maximum efficiency.`;
    }
    
    if (pathname.includes('/dashboard/student/profile')) {
      return `This is your profile page where you can update your personal information, preferences, and subscription details. Make sure to keep your exam goals updated so we can customize your learning experience accordingly.`;
    }
    
    // Default message for other dashboard pages
    if (pathname.includes('/dashboard')) {
      return `Welcome to your PREPZR dashboard, ${userName}. I'm here to help with your exam preparation. Remember, consistent daily practice is the key to success in your exams.`;
    }
    
    return null;
  };

  const getWelcomeFlowContext = (): string => {
    return `Welcome to PREPZR! We're thrilled you've joined us. Our AI-powered platform is designed specifically for NEET exam preparation. With personalized study plans, adaptive learning algorithms, and comprehensive performance tracking, you've made the best choice for your exam success. Here's what makes PREPZR unique: First, we analyze your learning style and create a customized study plan. Second, our spaced repetition system optimizes memorization. Third, our practice exams simulate real test conditions to build your confidence. Let me guide you through the platform features to help you get started.`;
  };
  
  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Load voices
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    
    // Try to find an Indian English voice
    const preferredVoiceNames = [
      'Google English India', 'Microsoft Kajal', 'en-IN',
      'Indian', 'India'
    ];
    
    // Try to find a preferred voice
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(name.toLowerCase()) || 
        v.lang?.toLowerCase().includes(name.toLowerCase())
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If still no voice selected, try to find any female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name?.toLowerCase().includes('female')
      );
    }
    
    // If still nothing, use any available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Set properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    utterance.lang = 'en-IN';
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
    
    // Show toast notification
    toast({
      title: "Voice Assistant",
      description: "Speaking about this page..."
    });
  };

  // This component doesn't render anything visible
  return null;
};

export default DashboardVoiceAssistant;
