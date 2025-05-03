
import React, { useEffect, useState } from 'react';
import { VoiceAnnouncerProvider, useVoiceAnnouncerContext } from "./voice/VoiceAnnouncer";
import { initializeVoices, fixVoiceSystem } from "./voice/voiceUtils";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface DashboardWrapperProps {
  children: React.ReactNode;
  onOpenTour?: () => void;
}

const VoiceWrapper = ({ children, onOpenTour }: { children: React.ReactNode; onOpenTour?: () => void }) => {
  // Initialize voice announcer
  const voiceAnnouncer = useVoiceAnnouncerContext();
  const [voiceError, setVoiceError] = useState(false);
  
  // Set up voice settings for immediate use
  useEffect(() => {
    const setupVoiceSystem = async () => {
      try {
        console.log("Setting up voice system...");
        
        // Pre-load and initialize voices
        const initialized = await initializeVoices();
        
        if (!initialized) {
          console.warn("Voice initialization failed, attempting fix...");
          const fixed = await fixVoiceSystem();
          
          if (!fixed) {
            setVoiceError(true);
            toast.error("Voice system couldn't initialize. Click the voice icon to fix.", {
              duration: 5000
            });
          }
        }
        
        // Test voice by speaking silently
        const testUtterance = new SpeechSynthesisUtterance("");
        testUtterance.volume = 0; // Silent test
        testUtterance.onend = () => {
          console.log("Voice system ready");
        };
        testUtterance.onerror = (err) => {
          console.error("Voice system test failed:", err);
          setVoiceError(true);
        };
        
        window.speechSynthesis.speak(testUtterance);
      } catch (err) {
        console.error("Error setting up voice system:", err);
        setVoiceError(true);
      }
    };
    
    setupVoiceSystem();
    
    // Periodically check and fix voice system
    const intervalId = setInterval(() => {
      fixVoiceSystem().then(fixed => {
        if (fixed) {
          console.log("Voice system refreshed");
          setVoiceError(false);
        }
      });
    }, 30000); // Check every 30 seconds
    
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
  
  // Add the Tour Guide button at the top
  const [showTourButton, setShowTourButton] = useState(true);
  
  // Hide the tour button after a few days of usage
  useEffect(() => {
    const loginCount = parseInt(localStorage.getItem('loginCount') || '0', 10);
    setShowTourButton(loginCount < 10); // Show for the first 10 logins
  }, []);
  
  return (
    <>
      {showTourButton && onOpenTour && (
        <div className="fixed top-16 right-4 z-50 animate-bounce">
          <Button 
            onClick={onOpenTour}
            variant="default"
            className="rounded-full bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Take a Tour
          </Button>
        </div>
      )}
      {voiceError && (
        <div className="fixed top-28 right-4 z-50">
          <Button
            onClick={() => fixVoiceSystem().then(() => setVoiceError(false))}
            variant="destructive"
            size="sm"
            className="flex items-center gap-1 shadow-lg"
          >
            <AlertTriangle className="h-4 w-4" />
            Fix Voice System
          </Button>
        </div>
      )}
      {children}
    </>
  );
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children, onOpenTour }) => {
  return (
    <VoiceAnnouncerProvider>
      <VoiceWrapper onOpenTour={onOpenTour}>
        {children}
      </VoiceWrapper>
    </VoiceAnnouncerProvider>
  );
};

export default DashboardWrapper;
