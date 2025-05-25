
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Brain, RotateCcw, Target } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FlashcardVoiceAssistantProps {
  currentCard?: number;
  totalCards?: number;
  subject?: string;
  userName?: string;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  currentCard = 1,
  totalCards = 10,
  subject = "General",
  userName = "Student",
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
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how many')) {
      const percentage = Math.round((currentCard / totalCards) * 100);
      speakMessage(`You're on card ${currentCard} of ${totalCards}. That's ${percentage}% complete! You're making great progress with your ${subject} flashcards.`);
      return;
    }
    
    if (lowerCommand.includes('tip') || lowerCommand.includes('study better')) {
      speakMessage(`Here are some flashcard study tips: Space out your reviews over several days. Focus on cards you find difficult. Try to explain the answer in your own words, and use active recall instead of just reading.`);
      return;
    }
    
    if (lowerCommand.includes('difficult') || lowerCommand.includes('hard cards')) {
      speakMessage(`For difficult cards, try these strategies: Break complex concepts into smaller parts. Create visual associations. Practice them more frequently. Don't worry - repetition is key to mastery!`);
      return;
    }
    
    if (lowerCommand.includes('next') || lowerCommand.includes('continue')) {
      speakMessage(`Ready for the next card! Remember to think about your answer before flipping. This active recall helps strengthen your memory pathways.`);
      return;
    }
    
    if (lowerCommand.includes('review') || lowerCommand.includes('go back')) {
      speakMessage(`Reviewing previous cards is a great strategy! Focus on the ones you found challenging. Spaced repetition will help move information to your long-term memory.`);
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage')) {
      speakMessage(`You're doing fantastic! Every flashcard you review is building stronger neural pathways. Keep up the consistent practice - it's the key to long-term retention and exam success.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm here to guide your flashcard study session! Ask me about your progress, study tips, or just say 'next' when you're ready to continue.`);
  };
  
  const suggestions = [
    "How's my progress?",
    "Give me study tips",
    "Help with difficult cards",
    "Motivate me",
    "Next card please"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-purple-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-purple-800">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            <span>Flashcard Coach</span>
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
              <Brain className="h-4 w-4 mr-2" />
              Study Coach
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
