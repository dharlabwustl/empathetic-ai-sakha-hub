
import React, { useEffect, useState } from 'react';
import { VoiceAnnouncerProvider, useVoiceAnnouncerContext } from "./voice/VoiceAnnouncer";
import { useToast } from '@/components/ui/use-toast';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const VoiceWrapper = ({ children }: { children: React.ReactNode }) => {
  // Initialize voice announcer
  const voiceAnnouncer = useVoiceAnnouncerContext();
  const { toast } = useToast();
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  
  // Set up voice settings for immediate use
  useEffect(() => {
    // Pre-load and initialize voices
    const initializeVoices = async () => {
      try {
        // Force voice list to load
        window.speechSynthesis.getVoices();
        
        // Test if speech synthesis is available
        if (!window.speechSynthesis) {
          console.error("Speech synthesis not available");
          toast({
            title: "Voice System Unavailable",
            description: "Your browser doesn't support voice features. Some functionality may be limited.",
            variant: "destructive",
          });
          return;
        }
        
        // Test voice is ready (silently)
        const testUtterance = new SpeechSynthesisUtterance("");
        testUtterance.volume = 0; // Silent test
        testUtterance.onend = () => {
          console.log("Voice system ready");
          setVoiceInitialized(true);
        };
        testUtterance.onerror = (event) => {
          console.error("Voice system error:", event);
          toast({
            title: "Voice System Issue",
            description: "There was a problem initializing the voice system. Try refreshing the page.",
            variant: "destructive",
          });
        };
        
        window.speechSynthesis.speak(testUtterance);
        
        // Safety timeout - mark as initialized after 3 seconds even if onend doesn't fire
        setTimeout(() => {
          if (!voiceInitialized) {
            console.log("Voice initialization timeout - marking as initialized anyway");
            setVoiceInitialized(true);
          }
        }, 3000);
      } catch (error) {
        console.error("Error initializing voice system:", error);
        toast({
          title: "Voice System Error",
          description: "An error occurred while setting up the voice assistant.",
          variant: "destructive",
        });
      }
    };
    
    initializeVoices();
    
    // Clean up on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);
  
  return <>{children}</>;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  return (
    <VoiceAnnouncerProvider>
      <VoiceWrapper>
        {children}
      </VoiceWrapper>
    </VoiceAnnouncerProvider>
  );
};

export default DashboardWrapper;
