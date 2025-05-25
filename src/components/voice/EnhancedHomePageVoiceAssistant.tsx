
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Home, Users, Sparkles, Star } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
  userName?: string;
  isEnabled?: boolean;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({
  language = "en-US",
  userName = "Student",
  isEnabled = true
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
  } = useVoiceAnnouncer({ userName, language });
  
  // Auto-greet when component mounts
  useEffect(() => {
    if (!hasGreeted && isVoiceSupported && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const greeting = getWelcomeGreeting();
        speakMessage(greeting);
        setHasGreeted(true);
      }, 2000); // Wait 2 seconds after page load
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, isVoiceSupported, voiceSettings.muted, speakMessage]);
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const getWelcomeGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    
    if (hour < 12) {
      timeGreeting = "Good morning";
    } else if (hour < 17) {
      timeGreeting = "Good afternoon";
    } else {
      timeGreeting = "Good evening";
    }
    
    return `${timeGreeting}! Welcome to PREPZR, your AI-powered exam preparation platform. I'm your intelligent voice assistant, here to guide you through your learning journey. PREPZR transforms how students prepare for competitive exams like NEET with personalized study plans, interactive learning, and comprehensive analytics. You can ask me about our features, sign up for free, check exam readiness, or get started with your preparation. Would you like me to tell you more about what makes PREPZR special?`;
  };
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('features') || lowerCommand.includes('what can prepzr do')) {
      speakMessage(`PREPZR offers amazing features: AI-powered personalized study plans that adapt to your learning style, interactive concept cards with visual explanations, smart flashcards for quick revision, practice exams with detailed analytics, 24/7 AI tutor support, mood tracking for optimal study sessions, and progress monitoring with predictive insights. Everything is designed to make your exam preparation more effective and less stressful.`);
      return;
    }
    
    if (lowerCommand.includes('sign up') || lowerCommand.includes('register') || lowerCommand.includes('create account')) {
      speakMessage(`Great! You can sign up for PREPZR absolutely free. Just click the Get Started button on the homepage or navigate to the sign-up page. Registration is quick and easy - just provide your basic details and you'll have access to our comprehensive exam preparation tools. Start your journey to exam success today!`);
      return;
    }
    
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness analysis')) {
      speakMessage(`Our Exam Readiness Analyzer is a powerful tool that evaluates your preparation level across different subjects and topics. It provides personalized insights, identifies knowledge gaps, and suggests improvement strategies. You can access this feature after signing up, and it will help you understand exactly where you stand in your exam preparation journey.`);
      return;
    }
    
    if (lowerCommand.includes('pricing') || lowerCommand.includes('cost') || lowerCommand.includes('free')) {
      speakMessage(`PREPZR offers flexible pricing options! You can start completely free with access to basic features. Our premium plans unlock advanced AI tutoring, unlimited practice exams, detailed analytics, and priority support. We believe quality education should be accessible, so we've designed our pricing to be student-friendly.`);
      return;
    }
    
    if (lowerCommand.includes('neet') || lowerCommand.includes('medical exam')) {
      speakMessage(`PREPZR specializes in NEET preparation! Our platform is specifically designed for medical entrance exams with comprehensive coverage of Physics, Chemistry, and Biology. We provide NEET-specific study materials, previous year question analysis, subject-wise breakdowns, and targeted practice sessions to maximize your NEET score.`);
      return;
    }
    
    if (lowerCommand.includes('ai tutor') || lowerCommand.includes('artificial intelligence')) {
      speakMessage(`Our 24/7 AI Tutor is like having a personal teacher available anytime! It can explain complex concepts, solve problems step by step, provide instant feedback, and adapt to your learning pace. The AI tutor uses advanced machine learning to understand your strengths and weaknesses, providing personalized guidance for optimal learning outcomes.`);
      return;
    }
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('personalized plan')) {
      speakMessage(`PREPZR creates dynamic, personalized study plans based on your goals, current level, available time, and learning preferences. These plans automatically adjust based on your progress, ensuring you're always on the optimal path to success. The AI considers your strengths, weaknesses, and exam timeline to create the most effective study schedule.`);
      return;
    }
    
    if (lowerCommand.includes('analytics') || lowerCommand.includes('progress tracking')) {
      speakMessage(`Our advanced analytics provide deep insights into your learning journey. Track your progress across subjects, identify improvement trends, see time allocation patterns, and get predictive insights about your exam readiness. The analytics help you make data-driven decisions to optimize your study strategy.`);
      return;
    }
    
    if (lowerCommand.includes('demo') || lowerCommand.includes('how does it work')) {
      speakMessage(`I'd love to show you how PREPZR works! After signing up, you'll complete a quick assessment to personalize your experience. Then you'll get access to your dashboard with today's study plan, concept cards, practice tests, and your AI tutor. Everything is designed to be intuitive and engaging. Would you like to start with a free account?`);
      return;
    }
    
    if (lowerCommand.includes('help') || lowerCommand.includes('support')) {
      speakMessage(`I'm here to help! You can ask me about PREPZR features, pricing, exam preparation strategies, or how to get started. Our platform also provides comprehensive support through documentation, tutorials, and direct assistance. What specific information would you like to know about PREPZR?`);
      return;
    }
    
    // Default response
    speakMessage(`Welcome to PREPZR! I can help you learn about our AI-powered exam preparation platform. Ask me about our features, pricing, NEET preparation, AI tutoring, study plans, or how to get started. What would you like to know?`);
  };
  
  const suggestions = [
    "Tell me about PREPZR features",
    "How do I sign up?",
    "What is exam readiness analysis?",
    "NEET preparation support",
    "Pricing and plans",
    "How does the AI tutor work?"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <div className="fixed bottom-20 left-6 z-40">
      <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg`}>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm flex justify-between items-center text-purple-800 dark:text-purple-200">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>PREPZR Assistant</span>
              {isSpeaking && (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                </div>
              )}
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
                👋 Welcome to PREPZR! Ask me anything about our platform.
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Button 
                  variant={isListening ? "default" : "outline"}
                  size="sm" 
                  onClick={isListening ? stopListening : startListening}
                  className={`${isListening ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200'}`}
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Stop' : 'Start'} Listening
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
                  <p className="font-semibold text-purple-800 dark:text-purple-200">You said:</p>
                  <p className="text-purple-700 dark:text-purple-300">{transcript}</p>
                </div>
              )}
              
              <div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Try saying:
                </p>
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
                className="w-full text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800/50 flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                Voice Guide
                {isSpeaking && (
                  <div className="flex gap-1 ml-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                  </div>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedHomePageVoiceAssistant;
