
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Calculator, Lightbulb, Target } from 'lucide-react';

interface FormulaPracticeVoiceAssistantProps {
  formulaName: string;
  isEnabled: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  formulaName,
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
    
    if (command.includes('explain') || command.includes('what does')) {
      response = `Let me explain ${formulaName}. This formula shows the mathematical relationship between different variables and helps you solve problems systematically.`;
    } else if (command.includes('remember') || command.includes('memorize')) {
      response = `To remember ${formulaName}, try creating a memorable phrase or acronym using the variable names. Visual associations also work great!`;
    } else if (command.includes('units') || command.includes('dimension')) {
      response = `Always check your units! Make sure the units on both sides of the equation match. This is crucial for getting correct answers.`;
    } else if (command.includes('solve') || command.includes('calculate')) {
      response = `When solving with ${formulaName}, first identify what you're given and what you need to find. Then rearrange the formula to isolate the unknown variable.`;
    } else if (command.includes('practice') || command.includes('example')) {
      response = `Great idea! Practice makes perfect. Try substituting different values and work through step-by-step. Start with simple numbers first.`;
    } else if (command.includes('mistake') || command.includes('error') || command.includes('wrong')) {
      response = `Common mistakes include forgetting to convert units, mixing up variables, or calculation errors. Double-check each step carefully.`;
    } else if (command.includes('tip') || command.includes('technique')) {
      response = `Pro tip: Write down what each variable represents before substituting values. This helps prevent mix-ups and makes your work clearer.`;
    } else {
      response = `I'm here to help you master ${formulaName}! You can ask me about explanations, memory techniques, solving steps, or common mistakes. What would you like to know?`;
    }
    
    speak(response);
  };

  const quickActions = [
    {
      label: 'Formula Explanation',
      action: () => speak(`${formulaName} is a fundamental formula that describes the relationship between its variables. Understanding this relationship is key to solving related problems.`)
    },
    {
      label: 'Memory Technique',
      action: () => speak(`To remember ${formulaName}, try creating a story or visual image that connects the variables. Acronyms and rhymes also work well for memorization.`)
    },
    {
      label: 'Solving Steps',
      action: () => speak('Follow these steps: 1) Identify given values, 2) Determine what to find, 3) Rearrange the formula, 4) Substitute values, 5) Calculate and check units.')
    },
    {
      label: 'Common Mistakes',
      action: () => speak('Watch out for unit conversion errors, sign mistakes, and calculation slip-ups. Always double-check your work and verify that your answer makes sense.')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-950/30 dark:to-red-950/30 border-2 border-orange-100 dark:border-orange-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Calculator className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                  Formula Practice Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Master {formulaName} with guided practice
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
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask Question'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speak(`Welcome to formula practice for ${formulaName}. I'm here to help you understand, memorize, and master this important formula!`)}
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

export default FormulaPracticeVoiceAssistant;
