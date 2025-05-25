
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, BookOpen } from 'lucide-react';

interface ConceptVoiceAssistantProps {
  conceptName: string;
  conceptSubject: string;
  conceptTopic?: string;
  masteryLevel?: number;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName,
  conceptSubject,
  conceptTopic,
  masteryLevel = 0,
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to concept learning
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Concept explanation commands
    if (lowerCommand.includes('explain') || lowerCommand.includes('what is')) {
      speak(`${conceptName} is a key concept in ${conceptSubject}. Let me break it down for you. This concept helps you understand the fundamental principles and their real-world applications.`);
    }
    
    // Definition commands
    else if (lowerCommand.includes('define') || lowerCommand.includes('definition')) {
      speak(`The definition of ${conceptName}: This is an important concept in ${conceptSubject} that you need to master for your exams.`);
    }
    
    // Examples commands
    else if (lowerCommand.includes('example') || lowerCommand.includes('give me an example')) {
      speak(`Here's a practical example of ${conceptName}: This concept is commonly seen in real-world scenarios and exam questions.`);
    }
    
    // Mastery level commands
    else if (lowerCommand.includes('progress') || lowerCommand.includes('mastery')) {
      speak(`Your current mastery level for ${conceptName} is ${masteryLevel}%. ${
        masteryLevel > 80 ? 'Excellent progress! You\'re almost ready for the exam.' :
        masteryLevel > 60 ? 'Good progress! Keep practicing to improve your understanding.' :
        'You\'re making progress. Focus on understanding the core concepts and practice more.'
      }`);
    }
    
    // Study tips commands
    else if (lowerCommand.includes('tips') || lowerCommand.includes('how to study')) {
      speak(`Here are some tips for studying ${conceptName}: First, understand the basic definition. Then, look at examples and practice problems. Finally, try to explain the concept in your own words.`);
    }
    
    // Related concepts commands
    else if (lowerCommand.includes('related') || lowerCommand.includes('connected')) {
      speak(`${conceptName} is connected to several other concepts in ${conceptSubject}. Understanding these connections will help you see the bigger picture and perform better in exams.`);
    }
    
    // Difficulty commands
    else if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
      speak(`If you find ${conceptName} challenging, try breaking it down into smaller parts. Focus on one aspect at a time, and don't hesitate to review the basics.`);
    }
    
    // Quiz commands
    else if (lowerCommand.includes('quiz') || lowerCommand.includes('test me')) {
      speak(`Great idea! Testing yourself is an excellent way to learn ${conceptName}. You can use the quick recall section or practice problems to test your understanding.`);
    }
    
    // Default response
    else {
      speak(`I'm here to help you master ${conceptName}! You can ask me to explain the concept, give examples, check your progress, or provide study tips. How can I assist you today?`);
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
      const greeting = `Welcome to ${conceptName} in ${conceptSubject}! I'm here to help you understand this concept better. Ask me anything!`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [conceptName, conceptSubject, isEnabled]);

  if (!isEnabled) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-sm">Concept Assistant</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            AI Tutor
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Currently helping with: <span className="font-medium text-blue-600">{conceptName}</span>
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
            Try: "Explain this concept", "Give me an example", "Check my progress", "Study tips"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
