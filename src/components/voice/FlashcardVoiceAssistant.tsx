
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Brain, Target } from 'lucide-react';

interface FlashcardVoiceAssistantProps {
  currentCard?: { front: string; back: string; subject: string } | null;
  totalCards?: number;
  currentCardIndex?: number;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  currentCard,
  totalCards = 0,
  currentCardIndex = 0,
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to flashcard review
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Progress tracking commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('how many')) {
      speak(`You're currently on card ${currentCardIndex + 1} out of ${totalCards} total cards. That's ${Math.round(((currentCardIndex + 1) / totalCards) * 100)}% progress through this deck.`);
    }
    
    // Card navigation commands
    else if (lowerCommand.includes('next card') || lowerCommand.includes('skip')) {
      speak("Moving to the next card. Take your time to review it thoroughly.");
    }
    
    else if (lowerCommand.includes('previous card') || lowerCommand.includes('go back')) {
      speak("Going back to the previous card. Let's review it once more.");
    }
    
    // Answer checking commands
    else if (lowerCommand.includes('reveal') || lowerCommand.includes('show answer') || lowerCommand.includes('flip')) {
      if (currentCard) {
        speak(`The answer is: ${currentCard.back}. Did you get it right? This helps reinforce your memory.`);
      }
    }
    
    // Study guidance commands
    else if (lowerCommand.includes('study tip') || lowerCommand.includes('how to remember')) {
      speak("For effective flashcard study: Read the question aloud, try to answer before flipping, use spaced repetition, and focus on cards you find difficult. Create mental associations or mnemonics for better retention.");
    }
    
    // Difficulty assessment commands
    else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard') || lowerCommand.includes('struggling')) {
      speak("For difficult cards, try these strategies: Break down complex concepts, create visual associations, practice more frequently, or relate the concept to something familiar. Mark difficult cards for extra review.");
    }
    
    // Review strategy commands
    else if (lowerCommand.includes('strategy') || lowerCommand.includes('method') || lowerCommand.includes('technique')) {
      speak("Effective flashcard strategies: Use active recall, practice spaced repetition, shuffle your deck regularly, focus on weak areas, and review consistently. The key is regular, focused practice sessions.");
    }
    
    // Confidence tracking commands
    else if (lowerCommand.includes('confident') || lowerCommand.includes('easy') || lowerCommand.includes('know this')) {
      speak("Great! When you're confident with a card, you can review it less frequently. This is the power of spaced repetition - focus more time on challenging material.");
    }
    
    // Motivation commands
    else if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage') || lowerCommand.includes('tired')) {
      speak("You're doing great! Flashcard review builds strong neural pathways. Each repetition makes the knowledge more permanent. Keep going - consistency is key to mastery!");
    }
    
    // Card content commands
    else if (lowerCommand.includes('repeat') || lowerCommand.includes('read again')) {
      if (currentCard) {
        speak(`Current question: ${currentCard.front}. Take your time to think about the answer.`);
      }
    }
    
    // Session management commands
    else if (lowerCommand.includes('session') || lowerCommand.includes('stats') || lowerCommand.includes('performance')) {
      speak(`In this study session, you're reviewing ${totalCards} cards. Remember to mark cards as easy, medium, or hard based on your confidence level.`);
    }
    
    // Quick help
    else if (lowerCommand.includes('help') || lowerCommand.includes('commands')) {
      speak("I can help with your flashcard review! Try saying 'show progress', 'reveal answer', 'study tips', 'next card', or 'mark as difficult'. What do you need help with?");
    }
    
    // Default response
    else {
      speak("I'm your flashcard study assistant! I can help track your progress, provide study tips, or guide your review session. Try asking about your progress or study strategies.");
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
    if (isEnabled && totalCards > 0) {
      const greeting = `Ready for flashcard review! You have ${totalCards} cards to study. Let's start your focused review session.`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [isEnabled, totalCards]);

  if (!isEnabled) return null;

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-sm">Review Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            AI Tutor
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 bg-gray-100 dark:bg-gray-800 p-2 rounded">
            <div className="flex items-center justify-between">
              <span>Card {currentCardIndex + 1} of {totalCards}</span>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>{Math.round(((currentCardIndex + 1) / totalCards) * 100)}%</span>
              </div>
            </div>
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
              You: "{lastCommand}"
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Try: "Show progress", "Reveal answer", "Study tips", "Next card"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
