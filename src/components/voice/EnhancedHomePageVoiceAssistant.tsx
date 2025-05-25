
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Bot, RotateCcw } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
  isFirstTimeUser?: boolean;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({
  language = "en-US",
  isFirstTimeUser = false
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
  } = useVoiceAnnouncer({ userName: "Visitor" });
  
  // Auto-greet on page load with enhanced greeting
  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled) {
      const timer = setTimeout(() => {
        const greeting = getEnhancedGreeting(isFirstTimeUser);
        speakMessage(greeting);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceSettings.enabled, speakMessage, isFirstTimeUser]);
  
  const getEnhancedGreeting = (isFirstTime: boolean) => {
    if (isFirstTime) {
      return `Welcome to PREPZR! I'm Sakha AI, your intelligent exam preparation companion. Congratulations on taking the first step towards exam success! 

PREPZR is a revolutionary AI-powered platform designed to transform how you prepare for competitive exams. We combine cutting-edge artificial intelligence with proven learning methodologies to give you the ultimate competitive advantage.

Our comprehensive features include: personalized daily study plans that adapt to your unique learning pace and style, concept cards with detailed explanations and practical examples, smart flashcards using spaced repetition for maximum retention, practice exams with real-time analytics and performance insights, 24/7 AI tutoring for instant help, and academic advisor guidance for strategic planning.

What makes PREPZR special is our intelligent assessment system that continuously evaluates your progress and adjusts your study plan accordingly. Our exam readiness analyzer provides accurate preparation level assessment across all subjects.

Take a moment to explore our platform features. Would you like me to guide you through our exam readiness analyzer to assess your current preparation level, or help you sign up to unlock the full potential of AI-powered exam preparation? I'm here to make your exam success journey efficient and effective!`;
    } else {
      return `Welcome back to PREPZR! I'm Sakha AI, your dedicated exam preparation assistant ready to help you excel. 

PREPZR harnesses advanced AI technology combined with proven educational methodologies to maximize your exam performance. Our platform offers personalized study plans, intelligent concept learning, adaptive flashcards, comprehensive practice exams, and real-time progress tracking.

Our smart analytics continuously monitor your learning patterns and adjust recommendations to ensure optimal preparation efficiency. The exam readiness analyzer provides detailed insights into your preparation level across all subjects.

Explore our exam readiness analyzer to get an instant assessment of your current preparation status, or sign up to access our complete suite of AI-powered study tools including personalized study plans, 24/7 AI tutoring, and advanced progress analytics.

I'm here to assist you every step of the way towards exam success. Let's achieve your academic goals together with the power of intelligent preparation!`;
    }
  };
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      speakMessage(`Hello! Welcome to PREPZR. I'm Sakha AI, your intelligent exam preparation assistant. How can I help you succeed today?`);
      return;
    }
    
    if (lowerCommand.includes('features') || lowerCommand.includes('what can you do')) {
      speakMessage(`PREPZR offers revolutionary features: personalized study plans that adapt to your learning style, concept cards with comprehensive explanations, smart flashcards using spaced repetition, practice exams with detailed analytics, 24/7 AI tutoring for instant help, and academic advisor guidance for strategic planning. Would you like to explore any specific feature?`);
      return;
    }
    
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness')) {
      speakMessage(`Our exam readiness analyzer uses advanced AI algorithms to evaluate your preparation level across all subjects. It provides a comprehensive score and identifies specific areas for improvement with actionable recommendations. Would you like to try it now?`);
      // Trigger exam readiness analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
      return;
    }
    
    if (lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
      speakMessage(`Excellent choice! Signing up unlocks personalized study plans, comprehensive progress tracking, unlimited practice tests, 24/7 AI tutoring, and strategic academic advisor guidance. Let me direct you to our registration page.`);
      window.location.href = '/auth/signup';
      return;
    }
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan')) {
      speakMessage(`Our AI creates highly personalized study plans based on your exam date, available time, current strengths, and areas for improvement. The plan continuously adapts as you progress, ensuring optimal learning efficiency and exam readiness. Sign up to get your customized intelligent study plan!`);
      return;
    }
    
    // Default response
    speakMessage(`I'm Sakha AI, your comprehensive exam preparation assistant. I can help you explore PREPZR's advanced features, analyze your exam readiness, guide you through our AI-powered study tools, or assist with any preparation questions. What would you like to know?`);
  };
  
  const suggestions = [
    "What features do you offer?",
    "Check my exam readiness",
    "Help me sign up",
    "Tell me about study plans",
    "How does AI tutoring work?",
    "Show me practice exams"
  ];
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20`}>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm flex justify-between items-center text-purple-800 dark:text-purple-200">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Sakha AI Assistant</span>
            </div>
            {expanded && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(false)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {expanded ? (
            <div className="space-y-3">
              <div className="text-xs text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50 p-2 rounded">
                <strong>PREPZR AI Assistant</strong> - Your exam success companion
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Button 
                  variant={isListening ? "default" : "outline"}
                  size="sm" 
                  onClick={isListening ? stopListening : startListening}
                  className={`${isListening ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200'}`}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Stop' : 'Ask'} AI
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMute()}
                  disabled={isSpeaking}
                  className="border-purple-200"
                >
                  {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              {transcript && (
                <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-md text-sm">
                  <p className="font-semibold text-purple-800 dark:text-purple-200">You asked:</p>
                  <p className="text-purple-700 dark:text-purple-300">{transcript}</p>
                </div>
              )}
              
              <div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">Try asking:</p>
                <div className="grid grid-cols-1 gap-1">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      size="sm"
                      className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50"
                      onClick={() => processVoiceCommand(suggestion)}
                    >
                      "{suggestion}"
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(true)}
                className="w-full text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                AI Help
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedHomePageVoiceAssistant;
