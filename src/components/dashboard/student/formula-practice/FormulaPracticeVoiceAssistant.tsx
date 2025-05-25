
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Calculator } from 'lucide-react';

interface FormulaPracticeVoiceAssistantProps {
  currentFormula?: string;
  subject?: string;
  practiceMode?: string;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  currentFormula,
  subject = 'Mathematics',
  practiceMode = 'practice',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to formula practice
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Formula explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      if (currentFormula) {
        speak(`This formula is used in ${subject}. Let me explain its components and when to use it in problem solving.`);
      } else {
        speak(`Formula practice helps you memorize and understand key mathematical relationships. Each formula has specific applications and variables.`);
      }
    }
    
    // Variables explanation commands
    else if (lowerCommand.includes('variables') || lowerCommand.includes('symbols')) {
      speak(`Each symbol in the formula represents a specific variable or constant. Understanding what each variable means is crucial for applying the formula correctly in problems.`);
    }
    
    // Application commands
    else if (lowerCommand.includes('when to use') || lowerCommand.includes('application')) {
      speak(`This formula is typically used when you encounter problems involving specific types of calculations in ${subject}. Look for key words in the problem that indicate which formula to use.`);
    }
    
    // Practice tips commands
    else if (lowerCommand.includes('tips') || lowerCommand.includes('how to practice')) {
      speak(`Here are some formula practice tips: First, understand what each variable represents. Then, practice rearranging the formula. Finally, solve example problems using the formula. Repetition is key!`);
    }
    
    // Memory techniques commands
    else if (lowerCommand.includes('remember') || lowerCommand.includes('memorize')) {
      speak(`To memorize formulas effectively: Create mnemonics for complex formulas. Practice writing them daily. Understand the logic behind each formula. And connect formulas to real-world applications.`);
    }
    
    // Problem solving commands
    else if (lowerCommand.includes('solve') || lowerCommand.includes('problem')) {
      speak(`When solving problems: First, identify which formula to use. Then, list the given values. Substitute the values into the formula. Finally, solve for the unknown variable. Always check your answer!`);
    }
    
    // Common mistakes commands
    else if (lowerCommand.includes('mistakes') || lowerCommand.includes('errors')) {
      speak(`Common formula mistakes include: Mixing up similar formulas, forgetting to square or cube values, using wrong units, and arithmetic errors. Double-check your work and verify units match.`);
    }
    
    // Units and dimensions commands
    else if (lowerCommand.includes('units') || lowerCommand.includes('dimensions')) {
      speak(`Pay attention to units! Each variable has specific units, and your final answer should have the correct units. Dimensional analysis can help verify if your formula application is correct.`);
    }
    
    // Study strategy commands
    else if (lowerCommand.includes('strategy') || lowerCommand.includes('method')) {
      speak(`Effective formula study strategy: Start with understanding, not memorization. Practice with different problem types. Create a formula sheet with explanations. Review regularly using spaced repetition.`);
    }
    
    // Default response
    else {
      speak(`I'm here to help you master formulas in ${subject}! You can ask me to explain formulas, provide practice tips, help with problem solving, or discuss memory techniques. How can I assist you?`);
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
      const greeting = `Welcome to formula practice in ${subject}! I'm here to help you understand, memorize, and apply formulas effectively. Let's master these formulas together!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [subject, isEnabled]);

  if (!isEnabled) return null;

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-green-600" />
            <h3 className="font-semibold text-sm">Formula Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Math Coach
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Subject: <span className="font-medium text-green-600">{subject}</span>
            {currentFormula && (
              <div className="mt-1">Formula: <span className="font-mono text-xs">{currentFormula}</span></div>
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
            Try: "Explain this formula", "Practice tips", "When to use", "Memory techniques"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaPracticeVoiceAssistant;
