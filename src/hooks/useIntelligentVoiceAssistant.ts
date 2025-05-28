
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface UseIntelligentVoiceAssistantProps {
  userName?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  inactivityTimeout?: number;
}

export const useIntelligentVoiceAssistant = ({
  userName = 'Student',
  language = 'en-US',
  onSpeakingChange,
  inactivityTimeout = 30000
}: UseIntelligentVoiceAssistantProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  
  const { toast } = useToast();
  const pauseTimeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  // Intelligent pause management
  const createIntelligentPause = useCallback((duration: number = 30000): Promise<void> => {
    return new Promise(resolve => {
      pauseTimeoutRef.current = window.setTimeout(resolve, duration);
    });
  }, []);

  // Enhanced speak function with intelligent breaks
  const speakWithIntelligentBreaks = useCallback(async (
    text: string,
    options?: { 
      priority?: 'high' | 'medium' | 'low';
      preventRepeat?: boolean;
      pauseAfter?: number;
    }
  ) => {
    const { priority = 'medium', preventRepeat = true, pauseAfter = 30000 } = options || {};
    
    if (!('speechSynthesis' in window)) return;
    
    // Prevent repetition if enabled
    if (preventRepeat && spokenMessagesRef.current.has(text.toLowerCase())) {
      console.log('🔇 Voice: Preventing repetition of message:', text);
      return;
    }
    
    // Check cooldown for non-high priority messages
    const now = Date.now();
    if (priority !== 'high' && (now - lastMessageTime) < 5000) {
      console.log('🔇 Voice: Cooldown active, skipping message');
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Update speaking state
    setIsSpeaking(true);
    if (onSpeakingChange) onSpeakingChange(true);
    
    // Track message to prevent repetition
    if (preventRepeat) {
      spokenMessagesRef.current.add(text.toLowerCase());
    }
    
    setLastMessageTime(now);
    setHasSpoken(true);
    
    try {
      await speakWithFemaleVoice(
        text,
        { language },
        () => console.log('🔊 Voice: Speaking:', text),
        async () => {
          console.log('🔇 Voice: Finished speaking');
          setIsSpeaking(false);
          if (onSpeakingChange) onSpeakingChange(false);
          
          // Intelligent pause after speaking
          if (pauseAfter > 0) {
            console.log(`⏸️ Voice: Taking ${pauseAfter/1000}s intelligent break`);
            await createIntelligentPause(pauseAfter);
          }
        }
      );
    } catch (error) {
      console.error('Voice synthesis error:', error);
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    }
  }, [language, onSpeakingChange, lastMessageTime, createIntelligentPause]);

  // Play initial greeting with intelligent timing
  const playInitialGreeting = useCallback(async (message: string) => {
    if (hasSpoken) return;
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before greeting
    
    await speakWithIntelligentBreaks(message, {
      priority: 'high',
      preventRepeat: true,
      pauseAfter: 45000 // 45 second pause after greeting
    });
  }, [hasSpoken, speakWithIntelligentBreaks]);

  // Smart activity tracking to prevent over-assistance
  const trackActivity = useCallback(() => {
    const now = Date.now();
    setLastMessageTime(now);
    
    // Clear repeated messages cache periodically
    if (spokenMessagesRef.current.size > 10) {
      spokenMessagesRef.current.clear();
    }
  }, []);

  // Provide helpful guidance without being annoying
  const offerHelpfulGuidance = useCallback(async (context: string) => {
    const helpMessages = {
      'dashboard': "Need help navigating? I can guide you to study materials or practice tests.",
      'study': "Ready for your study session? I can help you focus on your weak areas.",
      'practice': "Want to test your knowledge? I can suggest practice questions for your exam.",
      'break': "Taking a break is important! Would you like some motivation or study tips?"
    };
    
    const message = helpMessages[context as keyof typeof helpMessages] || 
                   "I'm here to help with your exam preparation. What would you like to focus on?";
    
    await speakWithIntelligentBreaks(message, {
      priority: 'low',
      preventRepeat: true,
      pauseAfter: 60000 // 1 minute pause after help offer
    });
  }, [speakWithIntelligentBreaks]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return {
    isSpeaking,
    hasSpoken,
    playInitialGreeting,
    speakWithIntelligentBreaks,
    offerHelpfulGuidance,
    trackActivity,
    // Helper methods
    isOnCooldown: () => (Date.now() - lastMessageTime) < 5000,
    clearMessageCache: () => spokenMessagesRef.current.clear()
  };
};
