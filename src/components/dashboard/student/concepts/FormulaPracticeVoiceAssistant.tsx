
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Calculator, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormulaPracticeVoiceAssistantProps {
  formulaName: string;
  subject?: string;
  difficulty?: string;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  formulaName,
  subject = 'Physics',
  difficulty = 'Medium',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Context-aware voice commands for formula practice
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Formula explanation
    if (lowerCommand.includes('explain') || lowerCommand.includes('what does')) {
      speak(`Let me explain the ${formulaName} formula. This ${difficulty.toLowerCase()} level formula in ${subject} helps you calculate specific relationships between variables. Each symbol represents a physical quantity with specific units.`);
    }
    
    // Variables explanation
    else if (lowerCommand.includes('variables') || lowerCommand.includes('what are the variables')) {
      speak(`In the ${formulaName} formula, each variable has a specific meaning and unit. Let me break down each symbol and explain what it represents and how to identify it in problems.`);
    }
    
    // Units explanation
    else if (lowerCommand.includes('units') || lowerCommand.includes('what are the units')) {
      speak(`The units for ${formulaName} are important for dimensional analysis. Make sure you convert all quantities to the correct units before substituting into the formula. This prevents calculation errors.`);
    }
    
    // Memory techniques
    else if (lowerCommand.includes('remember') || lowerCommand.includes('memorize')) {
      speak(`Great question! To memorize ${formulaName}: Create a memorable phrase using the first letters of each variable, visualize the formula structure, practice writing it multiple times, and connect it to the physical meaning.`);
    }
    
    // Derivation help
    else if (lowerCommand.includes('derive') || lowerCommand.includes('derivation')) {
      speak(`Understanding how ${formulaName} is derived helps with memorization and application. Start with the basic principles, follow logical steps, and see how each transformation leads to the final formula.`);
    }
    
    // Problem solving tips
    else if (lowerCommand.includes('solve') || lowerCommand.includes('problem')) {
      speak(`For solving problems with ${formulaName}: First, identify what's given and what you need to find. Then, check which variables you have and which formula variation to use. Finally, substitute carefully and check your units.`);
    }
    
    // Common mistakes
    else if (lowerCommand.includes('mistakes') || lowerCommand.includes('errors')) {
      speak(`Common mistakes with ${formulaName} include: mixing up similar variables, forgetting unit conversions, using wrong formula variations, and sign errors. Always double-check your substitutions and units.`);
    }
    
    // Practice suggestions
    else if (lowerCommand.includes('practice') || lowerCommand.includes('exercise')) {
      speak(`To practice ${formulaName} effectively: Start with simple numerical problems, gradually increase complexity, try problems with different given variables, and practice until you can apply it automatically.`);
    }
    
    // Applications
    else if (lowerCommand.includes('application') || lowerCommand.includes('when to use')) {
      speak(`${formulaName} is used when you need to solve problems involving these specific physical relationships. Look for keywords in problems that signal when to use this formula versus similar ones.`);
    }
    
    // Tips for exam
    else if (lowerCommand.includes('exam') || lowerCommand.includes('test')) {
      speak(`For exams: Write down ${formulaName} immediately when you see related problems, identify given variables clearly, show all substitution steps, and always include units in your final answer.`);
    }
    
    // Default response
    else {
      speak(`I'm your formula practice assistant! I can help you understand ${formulaName}, explain variables and units, share memory techniques, or guide you through problem-solving. What would you like to know?`);
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
      const greeting = `Welcome to formula practice! I'm here to help you master ${formulaName}. This is a ${difficulty.toLowerCase()} level formula in ${subject}. Ask me anything about it!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [formulaName, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${isExpanded ? 'w-80' : 'w-auto'} bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white border-0 shadow-2xl transition-all duration-300`}>
        {isExpanded ? (
          <>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Formula Assistant
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
                {formulaName}
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
                    <p className="font-medium opacity-90">You asked:</p>
                    <p className="opacity-80">"{lastCommand}"</p>
                  </div>
                )}
                
                <div className="text-xs opacity-80">
                  <p className="font-medium mb-2">Try asking:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "Explain this formula"</li>
                    <li>• "What are the variables?"</li>
                    <li>• "How do I remember this?"</li>
                    <li>• "Show me the derivation"</li>
                    <li>• "Common mistakes?"</li>
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
              <Calculator className="h-5 w-5 mr-2" />
              Formula Help
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default FormulaPracticeVoiceAssistant;
