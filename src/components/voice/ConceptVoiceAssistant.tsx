
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, BookOpen, Lightbulb, Target } from 'lucide-react';

interface ConceptVoiceAssistantProps {
  conceptTitle: string;
  conceptSubject: string;
  isEnabled: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptTitle,
  conceptSubject,
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
    setCurrentMessage(`You asked: "${command}"`);
    
    let response = '';
    
    if (command.includes('explain') || command.includes('what is')) {
      response = `Let me explain ${conceptTitle}. This ${conceptSubject} concept is fundamental to understanding the subject. The key idea is that it describes the relationship between different variables and helps you solve related problems.`;
    } else if (command.includes('example') || command.includes('give me an example')) {
      response = `Here's a practical example of ${conceptTitle}: Think of it in real-world terms. For instance, you can see this concept in everyday situations like when objects move or interact. This helps make the abstract concept more concrete.`;
    } else if (command.includes('formula') || command.includes('equation')) {
      response = `The main formula for ${conceptTitle} involves several key variables. Remember to identify what you're given and what you need to find. Practice substituting values step by step to build confidence.`;
    } else if (command.includes('remember') || command.includes('memorize') || command.includes('study tip')) {
      response = `Great study tip for ${conceptTitle}: Use mnemonics or create visual associations. Try teaching this concept to someone else - it's one of the best ways to reinforce your understanding!`;
    } else if (command.includes('difficult') || command.includes('hard') || command.includes('confused')) {
      response = `Don't worry! ${conceptTitle} can be challenging at first. Break it down into smaller parts, focus on understanding the underlying principles, and practice with simple examples before moving to complex problems.`;
    } else if (command.includes('application') || command.includes('use') || command.includes('real life')) {
      response = `${conceptTitle} has many real-world applications! You'll find this concept useful in solving exam problems and understanding how ${conceptSubject} works in everyday situations.`;
    } else {
      response = `I'm here to help you understand ${conceptTitle}! You can ask me to explain the concept, give examples, share study tips, or discuss its applications. What specific aspect would you like to explore?`;
    }
    
    speak(response);
  };

  const quickActions = [
    {
      label: 'Explain Concept',
      action: () => speak(`${conceptTitle} is a key concept in ${conceptSubject}. It helps you understand the fundamental principles and solve related problems effectively.`)
    },
    {
      label: 'Give Example',
      action: () => speak(`Here's how ${conceptTitle} works in practice: Think of real-world situations where you can observe this concept in action.`)
    },
    {
      label: 'Study Tips',
      action: () => speak(`To master ${conceptTitle}, try these techniques: Create visual diagrams, practice with different examples, and explain it in your own words.`)
    },
    {
      label: 'Memory Technique',
      action: () => speak(`Here's a memory tip for ${conceptTitle}: Create acronyms or visual associations to remember key points. Connect it to concepts you already know well.`)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-100 dark:border-blue-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  Concept Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get help understanding {conceptTitle}
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
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask Question'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speak(`Welcome to the concept assistant for ${conceptTitle}. I'm here to help you understand this ${conceptSubject} concept with explanations, examples, and study tips.`)}
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

export default ConceptVoiceAssistant;
