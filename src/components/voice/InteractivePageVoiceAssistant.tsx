
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Bot, Minimize2, Maximize2 } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface InteractivePageVoiceAssistantProps {
  pageName: string;
  userName: string;
  context?: string;
  language?: string;
}

const InteractivePageVoiceAssistant: React.FC<InteractivePageVoiceAssistantProps> = ({
  pageName,
  userName,
  context = "",
  language = "en-US"
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceAnnouncer({ 
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: language,
      pitch: 1.0,
      rate: 0.9
    }
  });
  
  // Page-specific greetings and commands
  const getPageGreeting = (page: string, name: string) => {
    const prepzr = "PREP ZAR";
    
    switch (page.toLowerCase()) {
      case 'academic advisor':
        return `Welcome to the Academic Advisor section, ${name}! I'm here to help you create personalized study plans, set learning goals, and provide strategic guidance for your exam preparation. You can ask me about study schedules, subject prioritization, or exam strategies.`;
      
      case 'concept cards':
        return `Welcome to Concept Cards, ${name}! This is where you'll master key concepts with detailed explanations and examples. I can help you understand difficult topics, provide additional explanations, or suggest related concepts to study.`;
      
      case 'today\'s plan':
        return `Welcome to Today's Plan, ${name}! Here's your personalized daily study schedule. I can help you prioritize tasks, manage your time effectively, or provide motivation to complete your goals for today.`;
      
      case 'flashcards':
        return `Welcome to the Flashcards section, ${name}! This interactive spaced repetition system will help you memorize key information efficiently. I can guide you through your flashcard sessions or explain memory techniques.`;
      
      case 'formula practice':
        return `Welcome to Formula Practice, ${name}! Master mathematical formulas with memory techniques and practice problems. I can help you understand derivations, practice applications, or provide memory tricks for complex formulas.`;
      
      default:
        return `Welcome to ${page}, ${name}! I'm Sakha AI, your study assistant. How can I help you with your preparation today?`;
    }
  };
  
  const processPageCommand = (command: string, page: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Common commands for all pages
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage(`I can help you navigate this ${page} section, answer questions about the content, provide study tips, and guide you through the features available here. What would you like to know?`);
      return;
    }
    
    if (lowerCommand.includes('explain') || lowerCommand.includes('tell me about')) {
      speakMessage(`This is the ${page} section of PREP ZAR. ${getPageSpecificHelp(page)}`);
      return;
    }
    
    // Page-specific commands
    switch (page.toLowerCase()) {
      case 'academic advisor':
        if (lowerCommand.includes('study plan') || lowerCommand.includes('plan')) {
          speakMessage("I can help you create a personalized study plan based on your exam date, available time, and current preparation level. Would you like to start creating a new plan or modify your existing one?");
        } else if (lowerCommand.includes('strategy') || lowerCommand.includes('approach')) {
          speakMessage("Let me suggest some proven exam strategies: Focus on high-weightage topics first, practice with time limits, review mistakes regularly, and maintain a consistent study schedule. Which area would you like specific advice on?");
        }
        break;
        
      case 'concept cards':
        if (lowerCommand.includes('difficult') || lowerCommand.includes('hard')) {
          speakMessage("For difficult concepts, try breaking them into smaller parts, use visual aids, create analogies, and practice with examples. Which specific concept are you struggling with?");
        } else if (lowerCommand.includes('remember') || lowerCommand.includes('memorize')) {
          speakMessage("Use active recall, create mental connections, and practice spaced repetition. I can suggest memory techniques for specific topics. What would you like help remembering?");
        }
        break;
        
      case 'today\'s plan':
        if (lowerCommand.includes('prioritize') || lowerCommand.includes('order')) {
          speakMessage("Prioritize based on: deadline urgency, difficulty level, and your energy levels. Start with challenging topics when you're fresh, then move to review tasks. Would you like me to help reorganize your tasks?");
        } else if (lowerCommand.includes('time') || lowerCommand.includes('schedule')) {
          speakMessage("Effective time management: Use the Pomodoro technique, take regular breaks, track your actual study time, and adjust plans based on progress. How much time do you have available today?");
        }
        break;
        
      case 'flashcards':
        if (lowerCommand.includes('review') || lowerCommand.includes('practice')) {
          speakMessage("Ready for flashcard practice! Focus on cards you find difficult, use active recall before checking answers, and mark cards for later review. Shall we start your session?");
        } else if (lowerCommand.includes('memory') || lowerCommand.includes('remember')) {
          speakMessage("Spaced repetition is key! Review new cards frequently, then gradually increase intervals. Create vivid mental images and connect new information to what you already know.");
        }
        break;
        
      case 'formula practice':
        if (lowerCommand.includes('derive') || lowerCommand.includes('derivation')) {
          speakMessage("Understanding derivations helps with retention! I can walk you through step-by-step derivations and explain the logic behind each formula. Which formula would you like to explore?");
        } else if (lowerCommand.includes('application') || lowerCommand.includes('problem')) {
          speakMessage("Practice with varied problem types to master formula applications. Start with basic substitution, then try complex scenarios. Would you like to practice specific formulas?");
        }
        break;
    }
    
    // Default response
    speakMessage(`I'm here to help you succeed in the ${page} section. You can ask me about study strategies, specific topics, or how to use the features available here. What would you like to work on?`);
  };
  
  const getPageSpecificHelp = (page: string) => {
    switch (page.toLowerCase()) {
      case 'academic advisor':
        return "Here you can create personalized study plans, get strategic guidance, and receive recommendations based on your progress and goals.";
      case 'concept cards':
        return "This section provides detailed explanations of key concepts with examples, diagrams, and practice problems to help you master the fundamentals.";
      case 'today\'s plan':
        return "Your daily study schedule is optimized based on your learning patterns, progress, and available time.";
      case 'flashcards':
        return "Use spaced repetition and active recall to memorize key information efficiently and improve long-term retention.";
      case 'formula practice':
        return "Master mathematical formulas through understanding derivations, practicing applications, and using memory techniques.";
      default:
        return "This section is designed to help you excel in your exam preparation.";
    }
  };
  
  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const greeting = getPageGreeting(pageName, userName);
        speakMessage(greeting);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceSettings.enabled, voiceSettings.muted, speakMessage, pageName, userName]);
  
  useEffect(() => {
    if (transcript) {
      processPageCommand(transcript, pageName);
    }
  }, [transcript, pageName]);
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20`}>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm flex justify-between items-center text-blue-800 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Sakha AI - {pageName}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(!expanded)}
              className="h-6 w-6 p-0"
            >
              {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {expanded ? (
            <div className="space-y-3">
              <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/50 p-2 rounded">
                <strong>Interactive Assistant</strong> - Ask me about {pageName}
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Button 
                  variant={isListening ? "default" : "outline"}
                  size="sm" 
                  onClick={isListening ? stopListening : startListening}
                  className={`${isListening ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-200'}`}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Stop' : 'Ask'} AI
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMute()}
                  disabled={isSpeaking}
                  className="border-blue-200"
                >
                  {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              {transcript && (
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-md text-sm">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">You asked:</p>
                  <p className="text-blue-700 dark:text-blue-300">{transcript}</p>
                </div>
              )}
              
              {isSpeaking && (
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-md text-sm">
                  <p className="text-green-700 dark:text-green-300 animate-pulse">Sakha AI is speaking...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(true)}
                className="w-full text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Help
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractivePageVoiceAssistant;
