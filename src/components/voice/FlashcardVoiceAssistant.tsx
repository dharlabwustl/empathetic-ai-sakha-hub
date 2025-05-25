
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Brain, TrendingUp, RotateCcw } from 'lucide-react';

interface FlashcardVoiceAssistantProps {
  flashcardTitle: string;
  progress: number;
  isEnabled: boolean;
}

const FlashcardVoiceAssistant: React.FC<FlashcardVoiceAssistantProps> = ({
  flashcardTitle,
  progress,
  isEnabled
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = 'en-US';
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setCurrentMessage('Listening for your question...');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setCurrentMessage('Sorry, I couldn\'t hear you clearly.');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const handleVoiceCommand = (command: string) => {
    setCurrentMessage(`You said: "${command}"`);
    
    let response = '';
    
    if (command.includes('progress') || command.includes('how am i doing')) {
      response = `You've made excellent progress! You're ${progress}% through the ${flashcardTitle} flashcard set. Keep up the great work!`;
    } else if (command.includes('hint') || command.includes('help me remember')) {
      response = `Here's a memory tip: Try creating a mental image or story that connects to this concept. Visual associations help strengthen memory retention!`;
    } else if (command.includes('repeat') || command.includes('again')) {
      response = `Let me repeat that for you. Take your time to think through the answer before flipping the card.`;
    } else if (command.includes('difficult') || command.includes('hard') || command.includes('struggling')) {
      response = `Don't worry if this feels challenging! That means your brain is actively learning. Try breaking down complex concepts into smaller parts.`;
    } else if (command.includes('study tip') || command.includes('technique')) {
      response = `Here's a study technique: Use active recall - try to remember the answer before looking. Also, space out your review sessions for better retention.`;
    } else if (command.includes('next') || command.includes('continue')) {
      response = `Great! You're ready for the next card. Remember, consistent practice is key to mastering these concepts.`;
    } else {
      response = `I'm here to help with your flashcard practice! You can ask me about your progress, study tips, memory techniques, or if you need encouragement. What would you like to know?`;
    }
    
    speak(response);
  };

  const quickActions = [
    {
      label: 'Progress Update',
      action: () => speak(`You're doing great! You've completed ${progress}% of the ${flashcardTitle} flashcard set. Each review session strengthens your memory.`)
    },
    {
      label: 'Memory Tip',
      action: () => speak('Try the method of loci - associate each concept with a specific location in a familiar place. This ancient technique is very effective for memorization.')
    },
    {
      label: 'Study Strategy',
      action: () => speak('Use spaced repetition: review cards you find difficult more frequently, and space out easier cards over longer intervals.')
    },
    {
      label: 'Encouragement',
      action: () => speak('You\'re building strong neural pathways with each review! Consistency beats intensity - regular practice will lead to mastery.')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-100 dark:border-green-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Flashcard Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get help with your flashcard study session
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={startListening}
              disabled={isListening || isSpeaking || !isEnabled}
              className={`flex items-center gap-2 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask Assistant'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speak(`Welcome to your flashcard study session for ${flashcardTitle}. I'm here to help you with study tips, progress tracking, and encouragement!`)}
              disabled={isSpeaking}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Introduction
            </Button>
          </div>

          {currentMessage && (
            <div className="mb-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">{currentMessage}</p>
            </div>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Quick Help:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      disabled={isSpeaking}
                      className="text-left justify-start"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlashcardVoiceAssistant;
