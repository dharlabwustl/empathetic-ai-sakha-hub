
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptDetailVoiceAssistantProps {
  conceptName: string;
  subject?: string;
  difficulty?: string;
  isEnabled?: boolean;
}

const ConceptDetailVoiceAssistant: React.FC<ConceptDetailVoiceAssistantProps> = ({
  conceptName,
  subject = 'Physics',
  difficulty = 'Medium',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Context-aware voice commands for concept study
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speak(`Let me explain ${conceptName}. This is a ${difficulty.toLowerCase()} level concept in ${subject}. ${conceptName} involves understanding the fundamental principles and applications. Would you like me to break it down into simpler parts?`);
    }
    
    // Example commands
    else if (lowerCommand.includes('example') || lowerCommand.includes('give me an example')) {
      speak(`Here's a practical example of ${conceptName}: Think of it in real-world scenarios where this concept applies. For instance, in everyday situations, you can observe this principle working. Would you like more detailed examples?`);
    }
    
    // Memory techniques
    else if (lowerCommand.includes('remember') || lowerCommand.includes('memorize') || lowerCommand.includes('memory')) {
      speak(`Great question! For memorizing ${conceptName}, try these techniques: Create acronyms, use visual associations, practice active recall, and connect it to concepts you already know. Repetition is key - review this concept in different contexts.`);
    }
    
    // Study tips
    else if (lowerCommand.includes('study tips') || lowerCommand.includes('how to study')) {
      speak(`For studying ${conceptName} effectively: First, understand the basic definition. Then, work through examples step by step. Practice problems regularly, and try to explain the concept to someone else. This ${difficulty.toLowerCase()} level topic requires consistent practice.`);
    }
    
    // Formula related
    else if (lowerCommand.includes('formula') || lowerCommand.includes('equation')) {
      speak(`The key formulas for ${conceptName} are fundamental to understanding this concept. Let me help you understand each variable and how they relate to each other. Practice deriving the formula from first principles.`);
    }
    
    // Difficulty help
    else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard') || lowerCommand.includes('confused')) {
      speak(`I understand ${conceptName} can be challenging! Since this is a ${difficulty.toLowerCase()} level topic, let's break it down: Start with the basics, use visual aids, practice similar problems, and don't hesitate to review prerequisites. You've got this!`);
    }
    
    // Quick test
    else if (lowerCommand.includes('test me') || lowerCommand.includes('quiz')) {
      speak(`Let's test your understanding of ${conceptName}! I'll ask you some questions: Can you define the key terms? Can you explain the main principles? Try to solve a simple problem related to this concept.`);
    }
    
    // Application commands
    else if (lowerCommand.includes('application') || lowerCommand.includes('real world')) {
      speak(`${conceptName} has many real-world applications! In ${subject}, this concept is used in various fields and technologies. Understanding these applications helps you see why this concept is important and how it connects to other topics.`);
    }
    
    // Default response
    else {
      speak(`I'm your concept study assistant! I can help you understand ${conceptName} better. Ask me to explain concepts, give examples, share study tips, or test your knowledge. How can I help you master this topic?`);
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
      const greeting = `Hi! I'm here to help you understand ${conceptName}. This is a ${difficulty.toLowerCase()} level concept in ${subject}. Feel free to ask me questions!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [conceptName, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${isExpanded ? 'w-80' : 'w-auto'} bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl transition-all duration-300`}>
        {isExpanded ? (
          <>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Concept Assistant
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
                {conceptName}
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
                    <li>• "Explain this concept"</li>
                    <li>• "Give me an example"</li>
                    <li>• "How do I memorize this?"</li>
                    <li>• "Test my knowledge"</li>
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
              <Brain className="h-5 w-5 mr-2" />
              Concept Help
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default ConceptDetailVoiceAssistant;
