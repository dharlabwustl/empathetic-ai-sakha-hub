
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Brain, HelpCircle } from 'lucide-react';

interface ConceptVoiceAssistantProps {
  conceptTitle?: string;
  conceptSubject?: string;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptTitle = 'Current Concept',
  conceptSubject = 'Subject',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to concept learning
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speak(`${conceptTitle} is a fundamental concept in ${conceptSubject}. Let me break it down for you. This concept involves understanding key principles and applying them to solve problems. Would you like me to provide specific examples?`);
    }
    
    // Example commands
    else if (lowerCommand.includes('example') || lowerCommand.includes('show me')) {
      speak(`Here's a practical example of ${conceptTitle}: This concept is commonly seen in real-world applications. For instance, you might encounter this when solving numerical problems or understanding theoretical frameworks in ${conceptSubject}.`);
    }
    
    // Study tips commands
    else if (lowerCommand.includes('study tip') || lowerCommand.includes('how to study') || lowerCommand.includes('remember')) {
      speak(`Great study tips for ${conceptTitle}: First, create visual diagrams or mind maps. Second, practice with multiple examples. Third, explain the concept to someone else. Fourth, connect it to what you already know in ${conceptSubject}.`);
    }
    
    // Difficulty commands
    else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard') || lowerCommand.includes('confused')) {
      speak(`I understand ${conceptTitle} can be challenging. Let's break it down into smaller parts. Start with the basic definition, then look at simple examples before moving to complex applications. Take your time and don't hesitate to ask for clarification.`);
    }
    
    // Practice commands
    else if (lowerCommand.includes('practice') || lowerCommand.includes('test') || lowerCommand.includes('quiz')) {
      speak(`Ready to practice ${conceptTitle}? I recommend starting with basic problems, then progressing to intermediate and advanced levels. You can find practice questions in your study materials or I can suggest some problem-solving strategies.`);
    }
    
    // Memory techniques
    else if (lowerCommand.includes('memorize') || lowerCommand.includes('remember') || lowerCommand.includes('forget')) {
      speak(`To better remember ${conceptTitle}, try these memory techniques: Create acronyms, use the method of loci, make connections to familiar concepts, or create a story around the concept. Repetition and active recall are also very effective.`);
    }
    
    // Quick help
    else if (lowerCommand.includes('help') || lowerCommand.includes('assist')) {
      speak(`I'm here to help with ${conceptTitle}! You can ask me to explain the concept, provide examples, give study tips, suggest practice methods, or help with memory techniques. What would you like to know?`);
    }
    
    // Default response
    else {
      speak(`I'm your concept learning assistant! I can help explain ${conceptTitle}, provide examples, give study tips, or suggest practice methods. Try asking "explain this concept" or "give me an example".`);
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
      const greeting = `Hello! I'm here to help you learn ${conceptTitle} in ${conceptSubject}. Ask me anything about this concept!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [isEnabled, conceptTitle, conceptSubject]);

  if (!isEnabled) return null;

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-sm">Concept Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            AI Helper
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 bg-gray-100 dark:bg-gray-800 p-2 rounded">
            Learning: <span className="font-medium">{conceptTitle}</span>
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
            <div className="flex items-center gap-1 mb-1">
              <HelpCircle className="h-3 w-3" />
              <span>Try saying:</span>
            </div>
            <div className="space-y-1 ml-4">
              <div>"Explain this concept"</div>
              <div>"Give me an example"</div>
              <div>"How should I study this?"</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
