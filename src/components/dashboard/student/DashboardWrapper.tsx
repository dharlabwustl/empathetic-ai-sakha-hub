
import React, { useEffect } from 'react';
import { VoiceAnnouncerProvider, useVoiceAnnouncerContext } from "./voice/VoiceAnnouncer";
import { initializeVoices, fixVoiceSystem } from "./voice/voiceUtils";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const VoiceWrapper = ({ children }: { children: React.ReactNode }) => {
  // Initialize voice announcer
  const voiceAnnouncer = useVoiceAnnouncerContext();
  
  // Set up voice settings for immediate use
  useEffect(() => {
    const setupVoiceSystem = async () => {
      try {
        console.log("Setting up voice system...");
        
        // Pre-load and initialize voices
        const initialized = await initializeVoices();
        
        if (!initialized) {
          console.warn("Voice initialization failed, attempting fix...");
          await fixVoiceSystem();
        }
        
        // Test voice by speaking silently
        const testUtterance = new SpeechSynthesisUtterance("");
        testUtterance.volume = 0; // Silent test
        testUtterance.onend = () => {
          console.log("Voice system ready");
        };
        testUtterance.onerror = (err) => {
          console.error("Voice system test failed:", err);
        };
        
        window.speechSynthesis.speak(testUtterance);
      } catch (err) {
        console.error("Error setting up voice system:", err);
      }
    };
    
    setupVoiceSystem();
    
    // Periodically check and fix voice system
    const intervalId = setInterval(() => {
      fixVoiceSystem().then(fixed => {
        if (fixed) {
          console.log("Voice system refreshed");
        }
      });
    }, 60000); // Check every minute
    
    return () => {
      clearInterval(intervalId);
      // Make sure to cancel any ongoing speech
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.error("Error canceling speech:", err);
      }
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
