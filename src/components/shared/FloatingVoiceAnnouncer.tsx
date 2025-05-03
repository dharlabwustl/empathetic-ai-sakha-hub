
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const FloatingVoiceAnnouncer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceMessageIndex = useRef(0);
  
  const voiceMessages = [
    "Namaste! I am Sakha, India's first emotionally intelligent study partner. I'm here to help you crack your competitive exams!",
    "Try our free exam readiness analysis to see how prepared you are for your JEE or NEET exams.",
    "Our personalized study plans are designed specifically for Indian competitive exams, with AI-driven insights.",
    "Sign up for a 7-day free trial today and experience how PREPZR can boost your exam preparation journey.",
    "We've helped thousands of students improve their scores. Join them with our affordable subscription plans."
  ];
  
  const speakMessage = (message: string) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    speechRef.current = utterance;
    
    // Try to select an Indian-English voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      voice.name.includes('Indian') || 
      voice.name.includes('Hindi')
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
    }
    
    // Set up properties for Indian accent if no specific voice found
    utterance.rate = 0.9; // Slightly slower for better understanding
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    
    // Set up event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Cycle to next message after a delay
      setTimeout(() => {
        if (isActive) {
          voiceMessageIndex.current = (voiceMessageIndex.current + 1) % voiceMessages.length;
          speakMessage(voiceMessages[voiceMessageIndex.current]);
        }
      }, 5000); // 5 second pause between messages
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      console.error("Speech synthesis error");
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
  };
  
  const toggleVoice = () => {
    if (isActive) {
      // Stop speaking
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsActive(false);
      setIsSpeaking(false);
    } else {
      // Start speaking
      setIsActive(true);
      speakMessage(voiceMessages[voiceMessageIndex.current]);
      
      // Save that user has heard the assistant
      localStorage.setItem('hasHeardVoiceAssistant', 'true');
    }
  };
  
  // Initialize voices when component mounts
  useEffect(() => {
    if (!window.speechSynthesis) return;
    
    // Some browsers need a manual trigger to get voices
    const getVoices = () => {
      return window.speechSynthesis.getVoices();
    };
    
    getVoices();
    
    window.speechSynthesis.onvoiceschanged = getVoices;
    
    // Listen for trigger events from the header button
    const handleTriggerEvent = () => {
      toggleVoice();
    };
    
    window.addEventListener('trigger-voice-assistant', handleTriggerEvent);
    
    // Don't auto-start for returning visitors
    const hasHeard = localStorage.getItem('hasHeardVoiceAssistant') === 'true';
    if (!hasHeard) {
      // Auto-start after 3 seconds for new visitors
      const timer = setTimeout(() => {
        setIsActive(true);
        speakMessage("Namaste! I am Sakha, your AI study partner. Click to learn how I can help you crack your exams!");
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('trigger-voice-assistant', handleTriggerEvent);
      };
    }
    
    return () => {
      window.speechSynthesis.cancel();
      window.removeEventListener('trigger-voice-assistant', handleTriggerEvent);
    };
  }, []);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isActive && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs animate-fade-in border border-primary/20">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-1 rounded-full">
                <Volume2 className={`h-4 w-4 text-primary ${isSpeaking ? 'animate-pulse' : ''}`} />
              </div>
              <span className="font-medium text-sm">Sakha AI</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setIsActive(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {isSpeaking ? "Speaking to you..." : "Learn why students choose PREPZR for exam preparation"}
          </p>
          <div className="flex justify-center">
            <Button 
              size="sm" 
              variant="default" 
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600" 
              asChild
            >
              <a href="/signup">Sign Up for Free Trial</a>
            </Button>
          </div>
        </div>
      )}
      
      <Button
        variant={isActive ? "default" : "outline"} 
        size="icon"
        className={`rounded-full h-12 w-12 shadow-lg ${isActive ? 'bg-primary' : 'bg-white dark:bg-gray-800'}`}
        onClick={toggleVoice}
      >
        {isActive ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
        )}
      </Button>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
