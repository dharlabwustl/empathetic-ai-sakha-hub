
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX, Mic, MicOff, Settings } from 'lucide-react';
import { MoodType } from "@/types/user/base";

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = "Student",
  language = "en-US",
  userMood
}) => {
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const hasSpokenRef = useRef(false);

  // Speak welcome message only once when component mounts
  useEffect(() => {
    if (!hasSpokenRef.current && !isMuted) {
      const welcomeMessage = `Hello ${userName}! I'm PREPZR AI, your personal study assistant. I'm here to help you with your exam preparation. How can I assist you today?`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        utterance.lang = language;
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        
        speechSynthesis.speak(utterance);
        hasSpokenRef.current = true;
        setHasSpoken(true);
      }
    }
  }, [userName, language, isMuted]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      speechSynthesis.cancel();
    }
  };

  const handleListenToggle = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">PREPZR AI</span>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMuteToggle}
                className="h-8 w-8 p-0"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-gray-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-blue-600" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleListenToggle}
                className="h-8 w-8 p-0"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="h-4 w-4 text-green-600" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardVoiceAssistant;
