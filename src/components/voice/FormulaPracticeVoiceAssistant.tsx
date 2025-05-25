
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Calculator, Lightbulb } from 'lucide-react';

interface FormulaPracticeVoiceAssistantProps {
  currentFormula?: { name: string; category: string; formula: string } | null;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  currentFormula,
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
    if (lowerCommand.includes('explain') || lowerCommand.includes('what does')) {
      if (currentFormula) {
        speak(`${currentFormula.name} is a fundamental formula in ${currentFormula.category}. This formula helps you calculate specific values by understanding the relationship between different variables. Let me break down each component for you.`);
      } else {
        speak("I can explain any formula you're working with. Just let me know which formula you'd like to understand better.");
      }
    }
    
    // Memory technique commands
    else if (lowerCommand.includes('remember') || lowerCommand.includes('memorize') || lowerCommand.includes('memory')) {
      speak("Here are effective formula memory techniques: Create acronyms for variable names, use visual associations, practice writing the formula repeatedly, understand the logic behind it rather than just memorizing, and create stories connecting the variables.");
    }
    
    // Application commands
    else if (lowerCommand.includes('when to use') || lowerCommand.includes('application') || lowerCommand.includes('apply')) {
      if (currentFormula) {
        speak(`You'll use ${currentFormula.name} when solving problems involving ${currentFormula.category}. Look for key indicators in problem statements that signal when this formula is needed. Practice identifying these patterns in different types of questions.`);
      }
    }
    
    // Variable explanation commands
    else if (lowerCommand.includes('variable') || lowerCommand.includes('meaning') || lowerCommand.includes('symbol')) {
      speak("Understanding variables is crucial! Each symbol in a formula represents a specific quantity. Make sure you know what each variable means, its units of measurement, and how it relates to the physical or mathematical concept.");
    }
    
    // Units and dimensions commands
    else if (lowerCommand.includes('unit') || lowerCommand.includes('dimension') || lowerCommand.includes('measurement')) {
      speak("Always pay attention to units! Check that your formula gives the correct units for the answer. This is a great way to verify your work. Practice dimensional analysis to ensure your calculations are correct.");
    }
    
    // Practice strategy commands
    else if (lowerCommand.includes('practice') || lowerCommand.includes('study') || lowerCommand.includes('master')) {
      speak("To master formulas: Start with simple problems, gradually increase complexity, practice derivation if possible, solve problems step by step, and always check your answers. Regular practice builds confidence and speed.");
    }
    
    // Common mistakes commands
    else if (lowerCommand.includes('mistake') || lowerCommand.includes('error') || lowerCommand.includes('wrong')) {
      speak("Common formula mistakes include: confusing similar formulas, incorrect variable substitution, unit conversion errors, and sign mistakes. Always double-check your variable assignments and unit consistency.");
    }
    
    // Derivation commands
    else if (lowerCommand.includes('derive') || lowerCommand.includes('proof') || lowerCommand.includes('where does')) {
      if (currentFormula) {
        speak(`Understanding how ${currentFormula.name} is derived helps with deeper comprehension. The derivation shows the logical steps and assumptions that lead to this formula. This understanding makes it easier to remember and apply correctly.`);
      }
    }
    
    // Problem-solving commands
    else if (lowerCommand.includes('solve') || lowerCommand.includes('problem') || lowerCommand.includes('calculate')) {
      speak("When solving problems: First identify the known values, determine what you need to find, choose the appropriate formula, substitute values carefully, solve step by step, and always check if your answer makes sense.");
    }
    
    // Quick tips commands
    else if (lowerCommand.includes('tip') || lowerCommand.includes('advice') || lowerCommand.includes('suggestion')) {
      speak("Quick formula tips: Write down the formula before starting, identify all given values, be careful with signs and units, use consistent notation, and practice regularly. Understanding beats memorization every time!");
    }
    
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('assist') || lowerCommand.includes('guide')) {
      speak("I'm here to help with formula practice! I can explain formulas, provide memory techniques, discuss applications, help with problem-solving strategies, or clarify variables and units. What would you like to work on?");
    }
    
    // Default response
    else {
      speak("I'm your formula practice assistant! I can help you understand formulas, learn memory techniques, practice applications, and solve problems. Try asking about memory tips, formula explanations, or problem-solving strategies.");
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
      const greeting = "Welcome to formula practice! I'm here to help you understand, memorize, and apply formulas effectively. Ask me anything about the formulas you're studying!";
      setTimeout(() => speak(greeting), 1000);
    }
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-sm">Formula Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            AI Helper
          </Badge>
        </div>
        
        <div className="space-y-3">
          {currentFormula && (
            <div className="text-xs text-gray-600 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <div className="font-medium">{currentFormula.name}</div>
              <div className="text-gray-500">{currentFormula.category}</div>
            </div>
          )}
          
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
            <div className="flex items-center gap-1 mb-1">
              <Lightbulb className="h-3 w-3" />
              <span>Try saying:</span>
            </div>
            <div className="space-y-1 ml-4">
              <div>"Explain this formula"</div>
              <div>"Memory techniques"</div>
              <div>"When to use this?"</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaPracticeVoiceAssistant;
