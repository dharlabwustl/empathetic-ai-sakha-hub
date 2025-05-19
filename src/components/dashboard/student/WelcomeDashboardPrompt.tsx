
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface WelcomeDashboardPromptProps {
  userName?: string;
  onComplete?: () => void;
}

const WelcomeDashboardPrompt: React.FC<WelcomeDashboardPromptProps> = ({ 
  userName = "Student",
  onComplete 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speechCompleted, setSpeechCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if this prompt has been shown before
    const hasSeenDashboardWelcome = localStorage.getItem("hasSeenDashboardWelcome") === "true";
    
    if (!hasSeenDashboardWelcome) {
      // Wait a bit before showing the welcome prompt after tour completes
      const timer = setTimeout(() => {
        setIsOpen(true);
        
        // Speak welcome message
        speakWelcomeMessage();
        
        // Listen for voice greeting completion
        const handleVoiceCompleted = () => {
          setSpeechCompleted(true);
          setIsSpeaking(false);
        };
        
        document.addEventListener('voice-greeting-completed', handleVoiceCompleted);
        
        return () => {
          document.removeEventListener('voice-greeting-completed', handleVoiceCompleted);
        };
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [userName]);
  
  const speakWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      try {
        setIsSpeaking(true);
        
        // Create welcome message
        const welcomeText = `Welcome to your personalized dashboard, ${userName}! I'm Sakha AI, your adaptive learning companion. I've designed this dashboard based on your learning style and exam goals. Let me highlight some key features that will help you excel in your studies. The Today's Plan section shows your optimized study schedule. Your Analytics section tracks your progress over time. And our concept cards help you master difficult topics step by step. I'm here to support your learning journey - just click the voice assistant icon whenever you need help!`;
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Create speech synthesis utterance
        const speech = new SpeechSynthesisUtterance();
        speech.text = welcomeText.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
        speech.rate = 0.95;
        speech.pitch = 1.05;
        speech.volume = 0.9;
        
        // Try to find a good voice
        const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US'];
        let selectedVoice = null;
        
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
        
        if (selectedVoice) {
          speech.voice = selectedVoice;
        }
        
        // Add event listeners
        speech.onend = () => {
          setSpeechCompleted(true);
          setIsSpeaking(false);
          
          // Dispatch event that dashboard welcome speech ended
          document.dispatchEvent(new CustomEvent('dashboard-welcome-completed'));
        };
        
        speech.onerror = () => {
          setSpeechCompleted(true);
          setIsSpeaking(false);
        };
        
        // Speak the message
        window.speechSynthesis.speak(speech);
        
      } catch (error) {
        console.error("Error with welcome speech:", error);
        setSpeechCompleted(true);
        setIsSpeaking(false);
      }
    } else {
      setSpeechCompleted(true);
    }
  };
  
  const handleGotIt = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsOpen(false);
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    
    if (onComplete) {
      onComplete();
    }
    
    toast({
      title: "Welcome to your dashboard!",
      description: "Your personalized study journey begins now."
    });
  };
  
  const handleExploreFeatures = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsOpen(false);
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    
    // Navigate to features overview or today's plan
    navigate('/dashboard/student/today');
    
    toast({
      title: "Let's explore your features",
      description: "Here's your personalized study plan for today"
    });
    
    if (onComplete) {
      onComplete();
    }
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center mb-3">
                <PrepzrLogo width={70} height={70} className="filter drop-shadow-md" />
              </div>
              <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Welcome to Your Dashboard!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${isSpeaking ? 'bg-blue-100 animate-pulse' : 'bg-blue-50'}`}>
                  <Volume2 className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">
                  {isSpeaking ? "Sakha AI is introducing your dashboard..." : "Introduction completed"}
                </p>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm">Personalized study plan based on your goals</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm">Emotionally intelligent learning assistant</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm">Progress tracking and analytics</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm">Voice assistant available anytime</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button 
                className="w-full"
                variant="default"
                disabled={!speechCompleted && isSpeaking}
                onClick={handleExploreFeatures}
              >
                Explore Features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                className="w-full" 
                variant="outline"
                disabled={!speechCompleted && isSpeaking}
                onClick={handleGotIt}
              >
                Got it
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WelcomeDashboardPrompt;
