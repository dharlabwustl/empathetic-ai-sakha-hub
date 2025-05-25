
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Brain, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlashcardVoiceAssistantProps {
  deckName: string;
  cardCount?: number;
  currentCard?: number;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  deckName,
  cardCount = 0,
  currentCard = 1,
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Context-aware voice commands for flashcard review
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Navigation commands
    if (lowerCommand.includes('next') || lowerCommand.includes('next card')) {
      speak(`Moving to the next flashcard. Card ${currentCard + 1} of ${cardCount}.`);
    }
    
    // Previous card
    else if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
      speak(`Going back to the previous card. Card ${Math.max(1, currentCard - 1)} of ${cardCount}.`);
    }
    
    // Flip card
    else if (lowerCommand.includes('flip') || lowerCommand.includes('show answer')) {
      speak(`Flipping the card to show the answer. Take your time to review it.`);
    }
    
    // Difficulty assessment
    else if (lowerCommand.includes('easy') || lowerCommand.includes('got it')) {
      speak(`Great! Marking this card as easy. This card will appear less frequently in future reviews.`);
    }
    
    else if (lowerCommand.includes('medium') || lowerCommand.includes('okay')) {
      speak(`Marking this card as medium difficulty. You'll see this card again in a few days.`);
    }
    
    else if (lowerCommand.includes('hard') || lowerCommand.includes('difficult')) {
      speak(`No problem! Marking this card as hard. You'll review this card again soon to reinforce your memory.`);
    }
    
    // Progress inquiry
    else if (lowerCommand.includes('progress') || lowerCommand.includes('how many left')) {
      const remaining = cardCount - currentCard;
      speak(`You're on card ${currentCard} of ${cardCount}. ${remaining} cards remaining in this ${deckName} review session.`);
    }
    
    // Study guidance
    else if (lowerCommand.includes('study tips') || lowerCommand.includes('how to study')) {
      speak(`For effective flashcard study: Read the question carefully, try to recall the answer before flipping, be honest about your knowledge level, and review regularly. Spaced repetition is key to long-term retention.`);
    }
    
    // Memory techniques
    else if (lowerCommand.includes('memory') || lowerCommand.includes('remember')) {
      speak(`To better remember flashcard content: Create mental images, use mnemonics, connect new information to what you already know, and practice active recall. Don't just recognize - truly recall the information.`);
    }
    
    // Motivation
    else if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage')) {
      speak(`You're doing great with your ${deckName} flashcards! Every card you review strengthens your memory. Consistent practice leads to mastery. Keep up the excellent work!`);
    }
    
    // Shuffle cards
    else if (lowerCommand.includes('shuffle') || lowerCommand.includes('randomize')) {
      speak(`Shuffling the deck for more challenging practice. Random order helps prevent pattern memorization and improves retention.`);
    }
    
    // Statistics
    else if (lowerCommand.includes('stats') || lowerCommand.includes('statistics')) {
      speak(`In this ${deckName} session, you've reviewed ${currentCard} out of ${cardCount} cards. Keep going to complete your review session!`);
    }
    
    // Default response
    else {
      speak(`I'm here to help with your flashcard review! I can help you navigate cards, track progress, or provide study guidance. Try saying 'next card', 'flip', or 'how many left'.`);
    }
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
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
      const greeting = `Welcome to your ${deckName} flashcard review! You have ${cardCount} cards to review. I'm here to help guide your study session.`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [deckName, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${isExpanded ? 'w-80' : 'w-auto'} bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 text-white border-0 shadow-2xl transition-all duration-300`}>
        {isExpanded ? (
          <>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Flashcard Guide
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs w-fit">
                {deckName} • {currentCard}/{cardCount}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isListening ? "secondary" : "outline"}
                    onClick={startListening}
                    disabled={isSpeaking}
                    className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-white/30`}
                  >
                    {isListening ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                    {isListening ? 'Listening...' : 'Ask me'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    disabled={!isSpeaking}
                    className="bg-white/20 hover:bg-white/30 border-white/30"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                {lastCommand && (
                  <div className="text-xs bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <p className="font-medium opacity-90">You said:</p>
                    <p className="opacity-80">"{lastCommand}"</p>
                  </div>
                )}
                
                <div className="text-xs opacity-80">
                  <p className="font-medium mb-2">Try saying:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "Next card"</li>
                    <li>• "Flip this card"</li>
                    <li>• "This was easy/hard"</li>
                    <li>• "How many left?"</li>
                    <li>• "Study tips please"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-4">
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-transparent hover:bg-white/20 text-white border-white/30 transition-all duration-200"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Flashcard Guide
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default FlashcardVoiceAssistant;
