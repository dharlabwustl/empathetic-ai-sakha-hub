
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface PageVoiceAssistantProps {
  userName?: string;
  pageContext: string;
  isEnabled?: boolean;
}

const PageVoiceAssistant: React.FC<PageVoiceAssistantProps> = ({
  userName = "Student",
  pageContext,
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const location = useLocation();

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = message.replace(/PREPZR/gi, 'PREP-zer');
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(voice => voice.lang.includes('en-US'));
      if (usVoice) utterance.voice = usVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    switch (pageContext) {
      case 'concepts':
        if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
          speakMessage("I can explain any concept in detail. Click on a concept card and I'll provide explanations, examples, and study tips.");
        } else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
          speakMessage("For difficult concepts, I recommend breaking them into smaller parts, using visual aids, and practicing with examples. Which concept would you like help with?");
        }
        break;
        
      case 'today-plan':
        if (lowerCommand.includes('progress') || lowerCommand.includes('status')) {
          speakMessage("I can see your study progress and suggest the best tasks to focus on next. Would you like me to analyze your current progress?");
        } else if (lowerCommand.includes('help') || lowerCommand.includes('suggest')) {
          speakMessage("I can suggest study strategies, help prioritize tasks, and provide motivation. What specific help do you need with your plan?");
        }
        break;
        
      case 'academic':
        if (lowerCommand.includes('plan') || lowerCommand.includes('strategy')) {
          speakMessage("I can help create personalized study plans based on your goals, strengths, and available time. What's your target exam and timeline?");
        } else if (lowerCommand.includes('improve') || lowerCommand.includes('better')) {
          speakMessage("Based on your performance, I can suggest specific areas for improvement and effective study techniques. Shall we analyze your weak areas?");
        }
        break;
        
      default:
        speakMessage(`I'm here to help you with ${pageContext}. Ask me questions about studying, concepts, or need guidance with your preparation.`);
    }
  };

  if (!isEnabled) return null;

  return (
    <Card className={`fixed bottom-4 right-4 z-50 w-80 ${expanded ? 'h-auto' : 'h-16'} transition-all duration-300 shadow-lg`}>
      <CardHeader className="p-3">
        <CardTitle className="text-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>Page Assistant</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="h-6 w-6 p-0"
          >
            {expanded ? '−' : '+'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {expanded && (
        <CardContent className="p-3 pt-0">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant={isListening ? "destructive" : "default"}
                onClick={() => setIsListening(!isListening)}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="p-2 bg-blue-50 rounded text-sm">
                <strong>You said:</strong> {transcript}
              </div>
            )}
            
            <div className="text-xs text-gray-600">
              Try asking: "Explain this topic" or "Give me study tips"
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PageVoiceAssistant;
