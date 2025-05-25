
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Brain } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FlashcardVoiceAssistantProps {
  currentCard?: any;
  totalCards?: number;
  currentIndex?: number;
  userName?: string;
  onNextCard?: () => void;
  onPrevCard?: () => void;
  onFlipCard?: () => void;
  onMarkCorrect?: () => void;
  onMarkIncorrect?: () => void;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  currentCard,
  totalCards = 0,
  currentIndex = 0,
  userName,
  onNextCard,
  onPrevCard,
  onFlipCard,
  onMarkCorrect,
  onMarkIncorrect,
  isEnabled = true
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
    
    // Navigation commands
    if (lowerCommand.includes('next') || lowerCommand.includes('forward')) {
      if (onNextCard) {
        onNextCard();
        speakMessage("Moving to the next flashcard.");
      }
      return;
    }
    
    if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
      if (onPrevCard) {
        onPrevCard();
        speakMessage("Going back to the previous flashcard.");
      }
      return;
    }
    
    if (lowerCommand.includes('flip') || lowerCommand.includes('answer') || lowerCommand.includes('show answer')) {
      if (onFlipCard) {
        onFlipCard();
        speakMessage("Flipping the card to show the answer.");
      }
      return;
    }
    
    // Marking commands
    if (lowerCommand.includes('correct') || lowerCommand.includes('right') || lowerCommand.includes('got it')) {
      if (onMarkCorrect) {
        onMarkCorrect();
        speakMessage("Great! Marking this as correct.");
      }
      return;
    }
    
    if (lowerCommand.includes('incorrect') || lowerCommand.includes('wrong') || lowerCommand.includes('missed')) {
      if (onMarkIncorrect) {
        onMarkIncorrect();
        speakMessage("No worries! Marking this for review.");
      }
      return;
    }
    
    // Reading commands
    if (lowerCommand.includes('read') || lowerCommand.includes('repeat')) {
      if (currentCard) {
        speakMessage(`Here's the question: ${currentCard.question}. ${currentCard.answer ? `And the answer is: ${currentCard.answer}` : 'Think about your answer, then flip the card.'}`);
      }
      return;
    }
    
    // Progress commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('status')) {
      speakMessage(`You're on card ${currentIndex + 1} of ${totalCards}. ${Math.round(((currentIndex + 1) / totalCards) * 100)}% complete.`);
      return;
    }
    
    // Help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('commands')) {
      speakMessage("I can help you navigate flashcards. Say 'next' or 'previous' to move between cards, 'flip' to see the answer, 'correct' or 'incorrect' to mark your response, or 'read' to hear the card again.");
      return;
    }
    
    // Default response
    speakMessage("I'm here to help with your flashcard practice. You can say commands like 'next', 'flip', 'correct', or 'help' for more options.");
  };
  
  const quickCommands = [
    "Read the card",
    "Flip to answer", 
    "Next card",
    "Mark correct",
    "Show progress"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 fixed bottom-4 right-4 z-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            Flashcard Assistant
          </span>
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
            <div className="text-xs text-center text-gray-600">
              Card {currentIndex + 1} of {totalCards}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
              >
                <Speaker className="h-4 w-4" />
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-xs">
                <p className="font-semibold">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="space-y-1">
                {quickCommands.slice(0, 3).map((command, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left w-full"
                    onClick={() => processVoiceCommand(command)}
                  >
                    "{command}"
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
              className="w-full"
            >
              <Brain className="h-4 w-4 mr-2" />
              Voice Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
