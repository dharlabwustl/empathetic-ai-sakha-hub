
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Brain, Target, TrendingUp, Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FlashcardVoiceAssistantProps {
  deckName?: string;
  cardsRemaining?: number;
  accuracy?: number;
  isEnabled?: boolean;
  userName?: string;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  deckName = "Physics Formulas",
  cardsRemaining = 8,
  accuracy = 75,
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
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      speakMessage(`You're doing great with ${deckName}! Your current accuracy is ${accuracy}%. You have ${cardsRemaining} cards remaining in this session. ${accuracy >= 80 ? 'Excellent work!' : accuracy >= 60 ? 'Good progress, keep it up!' : 'Keep practicing, you\'re improving!'}`);
      return;
    }
    
    if (lowerCommand.includes('tips') || lowerCommand.includes('study better')) {
      speakMessage(`Here are flashcard study tips: Use spaced repetition - review cards at increasing intervals. Focus more on cards you get wrong. Try to understand concepts, not just memorize. Use mnemonics for difficult formulas. Practice regularly for best results.`);
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('hard cards')) {
      speakMessage(`For difficult cards, try breaking them into smaller parts. Create mental associations or stories. Practice the hard ones more frequently. Don't worry if you get them wrong initially - that's how you learn!`);
      return;
    }
    
    if (lowerCommand.includes('next') || lowerCommand.includes('continue')) {
      speakMessage(`Ready for the next card! Take your time to think through the answer. Remember, it's better to understand than to rush. You've got this!`);
      return;
    }
    
    if (lowerCommand.includes('break') || lowerCommand.includes('rest')) {
      speakMessage(`Good idea to take a break! Your brain needs time to process information. A 5-10 minute break can actually improve your retention. Come back refreshed!`);
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage')) {
      speakMessage(`You're making excellent progress! Every card you review builds your knowledge. Remember, even experts were beginners once. Your dedication to studying will pay off. Keep going, ${userName}!`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to help with your flashcard review of ${deckName}. Ask about your progress, study tips, or just say 'next' when you're ready to continue!`);
  };
  
  const suggestions = [
    "How am I doing?",
    "Give me study tips",
    "Help with difficult cards",
    "I need motivation",
    "Should I take a break?"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-purple-50 dark:bg-purple-900/20`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-purple-800 dark:text-purple-200">
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
            <div className="text-xs text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50 p-2 rounded">
              <div className="flex justify-between">
                <span>Deck: <strong>{deckName}</strong></span>
                <span>{cardsRemaining} left</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Accuracy: {accuracy}%</span>
                <span className={accuracy >= 75 ? 'text-green-600' : 'text-yellow-600'}>
                  {accuracy >= 75 ? '🎯' : '📈'}
                </span>
              </div>
            </div>
            
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
                {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-md text-sm">
                <p className="font-semibold text-purple-800 dark:text-purple-200">You said:</p>
                <p className="text-purple-700 dark:text-purple-300">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-1">
                <Target className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50"
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
              className="w-full text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Study Guide
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
