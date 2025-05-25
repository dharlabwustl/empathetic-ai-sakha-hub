
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, CreditCard, Brain, RotateCcw, Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FlashcardVoiceAssistantProps {
  currentCard?: string;
  deckName?: string;
  isEnabled?: boolean;
  userName?: string;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  currentCard = "Flashcard",
  deckName = "Study Deck",
  isEnabled = true,
  userName = "Student"
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
    
    if (lowerCommand.includes('next') || lowerCommand.includes('next card')) {
      speakMessage(`Moving to the next flashcard. Take your time to read and understand each card. Active recall is key to effective memorization.`);
      return;
    }
    
    if (lowerCommand.includes('previous') || lowerCommand.includes('go back')) {
      speakMessage(`Going back to the previous card. Reviewing cards you've already seen helps reinforce your memory and identify areas that need more practice.`);
      return;
    }
    
    if (lowerCommand.includes('flip') || lowerCommand.includes('show answer')) {
      speakMessage(`Flipping the card to reveal the answer. Before looking, try to recall the answer from memory. This active recall strengthens your learning.`);
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('mark difficult') || lowerCommand.includes('hard')) {
      speakMessage(`Marking this card as difficult. These cards will appear more frequently in your review sessions. Don't worry - repeated exposure will help you master them.`);
      return;
    }
    
    if (lowerCommand.includes('easy') || lowerCommand.includes('got it') || lowerCommand.includes('know this')) {
      speakMessage(`Great! Marking this as easy. This card will appear less frequently. Keep up the excellent work with your studies!`);
      return;
    }
    
    if (lowerCommand.includes('study tips') || lowerCommand.includes('how to study') || lowerCommand.includes('advice')) {
      speakMessage(`Here are effective flashcard study tips: Use spaced repetition, study in short sessions, test yourself before flipping, create mental associations, and review difficult cards more often. Consistency is more important than long study sessions.`);
      return;
    }
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      speakMessage(`You're making great progress with ${deckName}! Regular flashcard review improves long-term retention significantly. Keep tracking your performance and focus extra time on cards you find challenging.`);
      return;
    }
    
    if (lowerCommand.includes('break') || lowerCommand.includes('rest') || lowerCommand.includes('pause')) {
      speakMessage(`Good idea to take a break! Your brain needs time to process and consolidate what you've learned. Take 5-10 minutes, then come back refreshed for better retention.`);
      return;
    }
    
    if (lowerCommand.includes('shuffle') || lowerCommand.includes('random order')) {
      speakMessage(`Shuffling the deck for random order. This prevents you from memorizing the sequence and ensures you truly understand each concept independently.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help you study with ${deckName}. You can ask me to go to the next card, flip cards, mark difficulty levels, get study tips, or check your progress. What would you like to do?`);
  };
  
  const suggestions = [
    "Next card please",
    "Flip this card",
    "Mark as difficult",
    "Give me study tips",
    "How's my progress?",
    "Shuffle the deck"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-indigo-800 dark:text-indigo-200">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
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
            <div className="text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-800/50 p-2 rounded">
              Studying: <strong>{deckName}</strong>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-indigo-500 hover:bg-indigo-600' : 'border-indigo-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-indigo-200"
              >
                {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-indigo-100 dark:bg-indigo-800/50 p-2 rounded-md text-sm">
                <p className="font-semibold text-indigo-800 dark:text-indigo-200">You said:</p>
                <p className="text-indigo-700 dark:text-indigo-300">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1">
                <Brain className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50"
                    onClick={() => processVoiceCommand(suggestion)}
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
              className="w-full text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Study Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
