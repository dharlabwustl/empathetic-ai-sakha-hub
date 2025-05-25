
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Brain } from 'lucide-react';

interface FlashcardVoiceAssistantProps {
  deckName: string;
  currentCard?: string;
  totalCards?: number;
  completedCards?: number;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  deckName,
  currentCard,
  totalCards = 0,
  completedCards = 0,
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to flashcard study
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Progress commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('how many')) {
      speak(`You've completed ${completedCards} out of ${totalCards} flashcards in the ${deckName} deck. That's ${Math.round((completedCards / totalCards) * 100)}% complete! Keep going!`);
    }
    
    // Current card commands
    else if (lowerCommand.includes('current') || lowerCommand.includes('this card')) {
      if (currentCard) {
        speak(`You're currently studying: ${currentCard}. Take your time to understand it thoroughly.`);
      } else {
        speak(`No card is currently selected. Let's start reviewing your flashcards!`);
      }
    }
    
    // Next card commands
    else if (lowerCommand.includes('next') || lowerCommand.includes('continue')) {
      speak(`Ready for the next card! Remember, active recall is key to effective learning. Try to answer before flipping the card.`);
    }
    
    // Study tips commands
    else if (lowerCommand.includes('tips') || lowerCommand.includes('how to study')) {
      speak(`Here are some flashcard study tips: Use active recall by trying to answer before flipping. Space out your reviews. Mark difficult cards for extra practice. And don't rush - understanding is more important than speed.`);
    }
    
    // Difficulty commands
    else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
      speak(`If a card seems difficult, don't worry! Mark it for review and come back to it later. Breaking down complex concepts into smaller parts can help.`);
    }
    
    // Motivation commands
    else if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage')) {
      const motivationalMessages = [
        `You're doing great with your ${deckName} flashcards! Each card you review strengthens your memory.`,
        `Flashcard review is one of the most effective study methods. You're building lasting knowledge!`,
        `Every card you complete brings you closer to mastering this topic. Keep up the excellent work!`
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speak(randomMessage);
    }
    
    // Review strategy commands
    else if (lowerCommand.includes('strategy') || lowerCommand.includes('method')) {
      speak(`For effective flashcard review: First, read the question carefully. Try to recall the answer from memory. Then flip to check. If correct, mark as easy. If incorrect, mark for review and try again later.`);
    }
    
    // Time commands
    else if (lowerCommand.includes('time') || lowerCommand.includes('how long')) {
      const remainingCards = totalCards - completedCards;
      const estimatedTime = Math.ceil(remainingCards * 1.5); // 1.5 minutes per card
      speak(`You have ${remainingCards} cards remaining. At a steady pace, this should take about ${estimatedTime} minutes to complete.`);
    }
    
    // Default response
    else {
      speak(`I'm here to help you with your ${deckName} flashcard review! You can ask about your progress, get study tips, or ask for motivation. How can I assist you?`);
    }
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Speech recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        handleVoiceCommand(command);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Auto-greet when component mounts
  useEffect(() => {
    if (isEnabled) {
      const greeting = `Ready to review your ${deckName} flashcards? I'm here to help you study effectively and stay motivated!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [deckName, isEnabled]);

  if (!isEnabled) return null;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            <h3 className="font-semibold text-sm">Flashcard Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Study Coach
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Reviewing: <span className="font-medium text-purple-600">{deckName}</span>
            {totalCards > 0 && (
              <span className="ml-2">({completedCards}/{totalCards})</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={isListening ? "default" : "outline"}
              onClick={startListening}
              disabled={isSpeaking}
              className="flex-1"
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask me'}
            </Button>
            
            <Button
              size="sm"
              variant={isSpeaking ? "default" : "outline"}
              onClick={isSpeaking ? stopSpeaking : () => {}}
              disabled={!isSpeaking}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          
          {lastCommand && (
            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              Last: "{lastCommand}"
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Try: "Check progress", "Study tips", "Motivate me", "How much time left?"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
