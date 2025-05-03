
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FloatingVoiceAnnouncer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceMessageIndex = useRef(0);
  
  const voiceMessages = [
    "Namaste! I am Sakha, India's first emotionally intelligent study partner. I'm here to help you crack your competitive exams!",
    "Try our free exam readiness analysis to see how prepared you are for your JEE or NEET exams.",
    "Our personalized study plans are designed specifically for Indian competitive exams, with AI-driven insights.",
    "Sign up for a 7-day free trial today and experience how PREPZR can boost your exam preparation journey.",
    "We've helped thousands of students improve their scores. Join them with our affordable subscription plans."
  ];
  
  // Function to fix voice system
  const fixVoiceSystem = async () => {
    try {
      // Cancel any pending speech
      window.speechSynthesis.cancel();
      
      // Force reload voices
      window.speechSynthesis.getVoices();
      
      // Small test to see if it's working
      const testUtterance = new SpeechSynthesisUtterance("Test");
      testUtterance.volume = 0;
      
      return new Promise<boolean>((resolve) => {
        testUtterance.onend = () => {
          console.log("Voice system test successful after fix");
          setVoiceError(false);
          resolve(true);
        };
        
        testUtterance.onerror = () => {
          console.error("Voice system still not working after fix attempt");
          resolve(false);
        };
        
        // Set a timeout in case the speech synthesis is completely broken
        const timeout = setTimeout(() => {
          console.warn("Voice test timed out");
          resolve(false);
        }, 1000);
        
        testUtterance.onend = () => {
          clearTimeout(timeout);
          console.log("Voice system fixed successfully");
          setVoiceError(false);
          resolve(true);
        };
        
        window.speechSynthesis.speak(testUtterance);
      });
    } catch (err) {
      console.error("Error fixing voice system:", err);
      return false;
    }
  };
  
  const speakMessage = (message: string) => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not available");
      setVoiceError(true);
      return;
    }
    
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    speechRef.current = utterance;
    
    // Try to select an Indian-English voice if available
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices.length);
    
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      voice.name.includes('Indian') || 
      voice.name.includes('Hindi')
    );
    
    if (indianVoice) {
      console.log("Found Indian voice:", indianVoice.name);
      utterance.voice = indianVoice;
    } else {
      console.log("No Indian voice found, using default");
    }
    
    // Set up properties for Indian accent if no specific voice found
    utterance.rate = 0.9; // Slightly slower for better understanding
    utterance.pitch = 1.0;
    utterance.volume = 1.0; // Maximum volume for better audibility
    
    // Set up event handlers
    utterance.onstart = () => {
      console.log("Speech started");
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log("Speech ended");
      setIsSpeaking(false);
      
      // Cycle to next message after a delay
      setTimeout(() => {
        if (isActive) {
          voiceMessageIndex.current = (voiceMessageIndex.current + 1) % voiceMessages.length;
          speakMessage(voiceMessages[voiceMessageIndex.current]);
        }
      }, 5000); // 5 second pause between messages
    };
    
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      setIsSpeaking(false);
      setVoiceError(true);
      
      // Try to fix automatically
      fixVoiceSystem().then(fixed => {
        if (fixed) {
          // Try speaking again
          setTimeout(() => {
            if (isActive) {
              speakMessage(message);
            }
          }, 1000);
        } else {
          toast.error("Voice system error. Please try again later.", {
            duration: 3000
          });
        }
      });
    };
    
    // Speak the message
    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Error speaking:", err);
      setVoiceError(true);
    }
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
      
      // First try to fix voice system if there's an error
      if (voiceError) {
        fixVoiceSystem().then(fixed => {
          if (fixed) {
            speakMessage(voiceMessages[voiceMessageIndex.current]);
          } else {
            toast.error("Could not initialize voice system. Please try again.", {
              duration: 3000
            });
          }
        });
      } else {
        speakMessage(voiceMessages[voiceMessageIndex.current]);
      }
      
      // Save that user has heard the assistant
      localStorage.setItem('hasHeardVoiceAssistant', 'true');
    }
  };
  
  // Initialize voices when component mounts
  useEffect(() => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not available");
      setVoiceError(true);
      return;
    }
    
    // Some browsers need a manual trigger to get voices
    const getVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        console.log("Voice system initialized with", voices.length, "voices");
        
        if (voices.length === 0) {
          // No voices available yet, might be a Chrome issue
          console.warn("No voices available yet, will retry");
          setTimeout(getVoices, 1000);
        } else {
          setVoiceError(false);
        }
      } catch (err) {
        console.error("Error getting voices:", err);
        setVoiceError(true);
      }
    };
    
    // Try loading voices immediately
    getVoices();
    
    // Then try again after a short delay (helps in Chrome)
    setTimeout(getVoices, 500);
    
    // Some browsers need this event to get voices
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
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
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
      
      {voiceError && !isActive && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs animate-fade-in border border-red-200">
          <div className="flex items-center gap-2 mb-2 text-red-500">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Voice not working</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs border-red-200 hover:bg-red-50" 
            onClick={() => fixVoiceSystem()}
          >
            Fix Voice System
          </Button>
        </div>
      )}
      
      <Button
        variant={isActive ? "default" : "outline"} 
        size="icon"
        className={`rounded-full h-12 w-12 shadow-lg ${
          isActive ? 'bg-primary' : 'bg-white dark:bg-gray-800'
        } ${voiceError ? 'border-red-300 text-red-500' : ''}`}
        onClick={toggleVoice}
      >
        {isActive ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          voiceError ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
          )
        )}
      </Button>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
