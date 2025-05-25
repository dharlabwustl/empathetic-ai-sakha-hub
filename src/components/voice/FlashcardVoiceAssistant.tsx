
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Brain, Target, RotateCcw } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FlashcardVoiceAssistantProps {
  flashcardData?: any;
  userName?: string;
  isEnabled?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onFlip?: () => void;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  flashcardData,
  userName = "Student",
  isEnabled = true,
  onNext,
  onPrevious,
  onFlip
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceAnnouncer({ userName });
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('next') || lowerCommand.includes('skip')) {
      speakMessage("Moving to the next flashcard.");
      onNext?.();
      return;
    }
    
    if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
      speakMessage("Going back to the previous flashcard.");
      onPrevious?.();
      return;
    }
    
    if (lowerCommand.includes('flip') || lowerCommand.includes('show answer') || lowerCommand.includes('reveal')) {
      speakMessage("Flipping the card to show the answer.");
      onFlip?.();
      return;
    }
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      speakMessage("You're making great progress with your flashcard review. Keep practicing to strengthen your memory.");
      return;
    }
    
    if (lowerCommand.includes('study tips') || lowerCommand.includes('help')) {
      speakMessage("For effective flashcard study, try to recall the answer before flipping. Review difficult cards more frequently, and space out your practice sessions.");
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
      speakMessage("Mark this card for extra review. Don't worry, challenging concepts become easier with repeated practice.");
      return;
    }
    
    // Default response
    speakMessage("I can help you navigate flashcards. Say 'next', 'previous', 'flip', or ask for study tips.");
  };
  
  const suggestions = [
    "Next card",
    "Flip card",
    "How am I doing?",
    "Study tips",
    "This is difficult"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-purple-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-purple-800">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Flashcard Assistant</span>
          </div>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-purple-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-purple-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-purple-800">You said:</p>
                <p className="text-purple-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-purple-600 mb-2 flex items-center gap-1">
                <Target className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-purple-700 hover:bg-purple-100"
                    onClick={() => {
                      processVoiceCommand(suggestion);
                    }}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full text-purple-700 hover:bg-purple-100"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Flashcard Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
