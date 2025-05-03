
import React from 'react';
import { VoiceAnnouncerProvider, useVoiceAnnouncerContext } from "./voice/VoiceAnnouncer";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const VoiceWrapper = ({ children }: { children: React.ReactNode }) => {
  // Initialize voice announcer
  const voiceAnnouncer = useVoiceAnnouncerContext();
  
  // Set up voice settings for immediate use
  React.useEffect(() => {
    // Pre-load and initialize voices
    const voices = window.speechSynthesis.getVoices();
    console.log("Pre-loading available voices:", voices.length);
    
    // Test voice is ready (silently)
    // This can help browsers initialize the voice engine
    const testUtterance = new SpeechSynthesisUtterance("");
    testUtterance.volume = 0; // Silent test
    testUtterance.onend = () => {
      console.log("Voice system ready");
    };
    window.speechSynthesis.speak(testUtterance);
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
