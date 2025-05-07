
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface HomeVoiceAnnouncerProps {
  delay?: number;
}

const HomeVoiceAnnouncer: React.FC<HomeVoiceAnnouncerProps> = ({ delay = 3000 }) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we've already played the announcement in this session
    const hasAnnouncedBefore = sessionStorage.getItem('home_voice_announced') === 'true';
    
    if (!hasAnnouncedBefore && !hasPlayed) {
      // Wait for the specified delay before playing
      const timeoutId = setTimeout(() => {
        playAnnouncement();
        sessionStorage.setItem('home_voice_announced', 'true');
        setHasPlayed(true);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }
  }, [delay]);

  const playAnnouncement = () => {
    // In a real implementation, this would call an API like ElevenLabs
    // For demo, we'll use a toast notification
    
    const welcomeMessage = 
      "Welcome to PrepMaster AI! I'm your AI-powered study assistant. " +
      "I can help you prepare for exams like NEET, JEE, and more with personalized concept cards, " +
      "interactive flashcards, and adaptive practice tests. Sign up now to get started on your learning journey!";
    
    toast({
      title: "AI Assistant",
      description: welcomeMessage,
      duration: 10000, // 10 seconds
    });
  };

  // This component doesn't render anything visible
  return null;
};

export default HomeVoiceAnnouncer;
