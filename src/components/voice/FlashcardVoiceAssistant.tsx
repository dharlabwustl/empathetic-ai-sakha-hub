
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Brain } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';

interface FlashcardVoiceAssistantProps {
  deckName?: string;
  currentCardIndex?: number;
  totalCards?: number;
  correctAnswers?: number;
  isEnabled?: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  deckName = "Study Deck",
  currentCardIndex = 0,
  totalCards = 0,
  correctAnswers = 0,
  isEnabled = true
}) => {
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    speakText,
    startListening,
    stopListening,
    processCommand,
    toggleMute,
    toggleEnabled
  } = useVoiceAssistant({
    userName: 'student',
    initialSettings: { enabled: isEnabled }
  });

  // Voice commands specific to flashcard review
  const flashcardCommands = {
    'next card': () => {
      const response = `Moving to the next flashcard. Card ${currentCardIndex + 2} of ${totalCards}.`;
      speakText(response);
    },
    'previous card': () => {
      const response = `Going back to the previous card. Card ${currentCardIndex} of ${totalCards}.`;
      speakText(response);
    },
    'flip card': () => {
      const response = `Flipping the card to show the answer.`;
      speakText(response);
    },
    'show progress': () => {
      const percentage = totalCards > 0 ? Math.round((correctAnswers / totalCards) * 100) : 0;
      const response = `Your progress: You've answered ${correctAnswers} out of ${totalCards} cards correctly. That's ${percentage}% accuracy. Keep going!`;
      speakText(response);
    },
    'study tips': () => {
      const tips = `Here are flashcard study tips: Use active recall by trying to answer before flipping. Space out your reviews over time. Focus more on cards you get wrong. Use both sides effectively - question and answer. Review regularly for best retention.`;
      speakText(tips);
    },
    'memory techniques': () => {
      const techniques = `Try these memory techniques: Create visual associations, use the method of loci, make acronyms, connect new information to what you already know, and use emotional connections to make facts more memorable.`;
      speakText(techniques);
    },
    'take break': () => {
      const response = `Good idea to take a break! Studies show that spaced learning improves retention. Take 10-15 minutes, then come back refreshed. Your brain will thank you!`;
      speakText(response);
    },
    'restart deck': () => {
      const response = `Restarting the ${deckName} deck. This is great for reinforcing your learning. Let's go through all the cards again!`;
      speakText(response);
    },
    'help': () => {
      const help = `I'm your flashcard study assistant. I can help you navigate cards, track progress, provide study tips, suggest memory techniques, or give encouragement. Say "next card", "flip card", "show progress", or ask for study tips!`;
      speakText(help);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(flashcardCommands, true);
      if (!commandProcessed) {
        // If no specific command matched, provide general help
        const response = `I heard "${transcript}". I can help you navigate flashcards, track progress, or provide study guidance. Try saying "next card", "flip card", "show progress", or "study tips".`;
        speakText(response);
      }
    }
  }, [transcript]);

  // Welcome message when component loads
  useEffect(() => {
    if (settings.enabled && !settings.muted) {
      const welcomeMessage = `Hi! I'm your flashcard study assistant. I'm here to help you review ${deckName}. I can help you navigate cards, track your progress, and provide study guidance. Just speak to me when you need help!`;
      setTimeout(() => speakText(welcomeMessage), 1000);
    }
  }, [deckName]);

  if (!settings.enabled) return null;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          Flashcard Voice Assistant
          {(isListening || isSpeaking) && (
            <Badge variant="secondary" className={
              isListening ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
            }>
              {isListening ? "Listening..." : "Speaking..."}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Reviewing: <span className="font-medium text-purple-600 dark:text-purple-400">{deckName}</span>
          <br />
          Progress: <span className="font-medium">{currentCardIndex + 1} of {totalCards}</span>
          {totalCards > 0 && (
            <>
              <br />
              Accuracy: <span className="font-medium text-green-600">
                {Math.round((correctAnswers / totalCards) * 100)}%
              </span>
            </>
          )}
        </div>

        {transcript && (
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm">
              <span className="font-medium">You said:</span> "{transcript}"
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={isListening ? stopListening : startListening}
            className="flex items-center gap-2"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? "Stop" : "Talk"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className="flex items-center gap-2"
          >
            {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {settings.muted ? "Unmute" : "Mute"}
          </Button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p><strong>Try saying:</strong></p>
          <p>• "Next card" - Move to next flashcard</p>
          <p>• "Flip card" - Show the answer</p>
          <p>• "Show progress" - Check your accuracy</p>
          <p>• "Study tips" - Get review strategies</p>
          <p>• "Memory techniques" - Learn memorization tricks</p>
          <p>• "Take break" - Pause your session</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashcardVoiceAssistant;
